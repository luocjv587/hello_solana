import Head from 'next/head';
import WalletConnection from '../components/WalletConnection';
import BalanceDisplay from '../components/BalanceDisplay';
import TransferForm from '../components/TransferForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Solana DApp Demo</title>
        <meta name="description" content="一个简单的 Solana DApp 演示应用" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          {/* 标题部分 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Solana DApp Demo
            </h1>
            <p className="text-lg text-gray-600">
              连接钱包、查看余额、发送 SOL - 在 Solana Devnet 上体验
            </p>
          </div>

          {/* 功能卡片网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* 钱包连接卡片 */}
            <div className="lg:col-span-1">
              <WalletConnection />
            </div>

            {/* 余额显示卡片 */}
            <div className="lg:col-span-1">
              <BalanceDisplay />
            </div>

            {/* 转账表单卡片 */}
            <div className="lg:col-span-2 xl:col-span-1">
              <TransferForm />
            </div>
          </div>

          {/* 信息部分 */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">使用说明</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="bg-solana-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                <p>首先点击&quot;连接钱包&quot;按钮，选择并连接您的 Solana 钱包（如 Phantom）</p>
              </div>
              <div className="flex items-start">
                <span className="bg-solana-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                <p>连接成功后，点击&quot;查询余额&quot;查看您在 Devnet 上的 SOL 余额</p>
              </div>
              <div className="flex items-start">
                <span className="bg-solana-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                <p>如果余额不足，可以前往 <a href="https://faucet.solana.com/" target="_blank" rel="noopener noreferrer" className="text-solana-purple hover:underline">Solana Faucet</a> 获取测试代币</p>
              </div>
              <div className="flex items-start">
                <span className="bg-solana-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                <p>在转账表单中输入接收地址和金额，点击&quot;发送&quot;进行转账测试</p>
              </div>
            </div>
          </div>

          {/* 页脚 */}
          <footer className="mt-8 text-center text-gray-500">
            <p>© 2024 Solana DApp Demo - 仅用于学习和演示目的</p>
          </footer>
        </div>
      </div>
    </>
  );
} 