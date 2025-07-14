'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  // 使用 devnet 网络进行开发
  const network = WalletAdapterNetwork.Devnet;

  // 你也可以提供自定义的 RPC 端点
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  // 错误处理函数
  const onError = (error: any) => {
    console.error('钱包错误:', error);
    
    // 更友好的错误提示
    let errorMessage = '钱包连接出错';
    
    if (error.message) {
      if (error.message.includes('User rejected')) {
        errorMessage = '用户取消了连接';
      } else if (error.message.includes('unauthorized')) {
        errorMessage = '钱包未授权此操作';
      } else if (error.message.includes('not installed')) {
        errorMessage = '钱包未安装';
      } else {
        errorMessage = `钱包错误: ${error.message}`;
      }
    }
    
    // 可以选择显示用户友好的错误消息
    // alert(errorMessage);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={onError}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}; 