'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

// 动态导入钱包UI组件以避免SSR问题
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const WalletDisconnectButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
  { ssr: false }
);

const WalletConnection: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">钱包连接</h2>
        <div className="space-y-4">
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">钱包连接</h2>
      <div className="space-y-4">
        {!connected ? (
          <div>
            <p className="text-gray-600 mb-4">请连接您的 Solana 钱包以开始使用</p>
            <WalletMultiButtonDynamic />
          </div>
        ) : (
          <div>
            <p className="text-green-600 mb-2">✓ 钱包已连接</p>
            <p className="text-sm text-gray-600 mb-4 break-all">
              地址: {publicKey?.toString()}
            </p>
            <WalletDisconnectButtonDynamic />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnection; 