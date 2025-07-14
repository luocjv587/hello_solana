'use client';

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const TransferForm: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected, connecting, wallet } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 更严格的连接检查
    if (!connected || !publicKey || !wallet) {
      alert('请先连接钱包');
      return;
    }

    if (!recipient || !amount) {
      alert('请填写完整的转账信息');
      return;
    }

    // 检查金额是否有效
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('请输入有效的转账金额');
      return;
    }

    setLoading(true);
    try {
      // 验证接收地址
      let recipientPubKey: PublicKey;
      try {
        recipientPubKey = new PublicKey(recipient);
      } catch (error) {
        alert('接收地址格式无效');
        return;
      }

      // 检查余额是否足够
      const balance = await connection.getBalance(publicKey);
      const lamports = numAmount * LAMPORTS_PER_SOL;
      
      if (balance < lamports) {
        alert('余额不足');
        return;
      }

      // 获取最新的区块哈希
      const { blockhash } = await connection.getLatestBlockhash();

      // 创建转账交易
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      // 发送交易并等待用户确认
      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'processed',
      });
      
      alert(`转账交易已发送！正在等待确认...`);
      
      // 等待交易确认
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error('交易确认失败');
      }
      
      alert(`转账成功！交易签名: ${signature}`);
      setRecipient('');
      setAmount('');
    } catch (error: any) {
      console.error('转账失败:', error);
      
      // 更详细的错误处理
      let errorMessage = '转账失败';
      
      if (error.message) {
        if (error.message.includes('User rejected')) {
          errorMessage = '用户取消了交易';
        } else if (error.message.includes('insufficient funds')) {
          errorMessage = '余额不足';
        } else if (error.message.includes('authorized')) {
          errorMessage = '钱包未授权此操作，请在钱包中确认授权';
        } else if (error.message.includes('blockhash')) {
          errorMessage = '交易过期，请重试';
        } else {
          errorMessage = `转账失败: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">发送 SOL</h2>
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">发送 SOL</h2>
        <p className="text-gray-500">请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">发送 SOL</h2>
      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            接收地址
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="输入接收方的钱包地址"
            className="input-field"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            金额 (SOL)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="输入转账金额"
            step="0.01"
            min="0"
            className="input-field"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || connecting}
          className="btn-primary w-full"
        >
          {loading ? '转账中...' : '发送'}
        </button>
      </form>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          ⚠️ 注意：此应用连接到 Solana Devnet 测试网络。转账使用的是测试代币，不是真实的 SOL。
        </p>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          💡 提示：转账时请在钱包弹窗中确认授权。如果没有弹窗，请检查钱包是否被浏览器阻止。
        </p>
      </div>
    </div>
  );
};

export default TransferForm; 