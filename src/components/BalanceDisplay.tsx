'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const BalanceDisplay: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBalance = useCallback(async () => {
    if (!connection || !publicKey) return;

    setLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('获取余额失败:', error);
      alert('获取余额失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey]);

  if (!mounted) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">钱包余额</h2>
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">钱包余额</h2>
        <p className="text-gray-500">请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">钱包余额</h2>
      <div className="space-y-4">
        <button 
          onClick={getBalance} 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? '查询中...' : '查询余额'}
        </button>
        
        {balance !== null && (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold text-gray-800">
              余额: {balance.toFixed(4)} SOL
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceDisplay; 