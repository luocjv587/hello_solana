# Solana DApp 演示

一个使用 Next.js 和 Solana 钱包适配器构建的去中心化应用 (DApp) 演示。

## 功能特性

- 🔗 **钱包连接**: 支持 Phantom、Solflare、Torus 等多种钱包
- 💰 **余额查询**: 实时查看 SOL 余额
- 💸 **转账功能**: 安全的 SOL 转账操作
- 🌐 **测试网络**: 连接到 Solana Devnet 进行安全测试
- 📱 **响应式设计**: 现代化的用户界面，支持移动设备

## 快速开始

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/你的用户名/hello_solana.git
cd hello_solana
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

### 静态部署

本项目支持静态导出，可以部署到 GitHub Pages 等静态托管服务。

#### 本地构建静态文件

```bash
npm run export
```

构建完成后，静态文件将在 `out` 文件夹中生成。

#### 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为部署源
4. 每次推送到 `main` 分支时，会自动构建并部署

## 技术栈

- **Next.js 13**: React 框架
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Solana Web3.js**: 区块链交互
- **Solana Wallet Adapter**: 钱包集成

## 使用指南

### 1. 连接钱包

- 点击"连接钱包"按钮
- 选择你的钱包类型（推荐 Phantom）
- 在钱包中确认连接

### 2. 查看余额

- 钱包连接后会自动显示你的 SOL 余额
- 余额会实时更新

### 3. 发送 SOL

- 输入接收地址
- 输入转账金额
- 点击"发送"按钮
- 在钱包中确认交易

## 安全提醒

⚠️ **重要**: 此应用连接到 Solana **Devnet 测试网络**，使用的是测试代币，不是真实的 SOL。

- 测试网络的代币没有实际价值
- 可以从 [Solana 水龙头](https://faucet.solana.com/) 获取测试代币
- 请勿在主网上使用此代码，除非你完全理解其工作原理

## 项目结构

```
src/
├── components/          # React 组件
│   ├── WalletConnection.tsx
│   ├── BalanceDisplay.tsx
│   └── TransferForm.tsx
├── context/            # React Context
│   └── WalletContext.tsx
├── pages/              # Next.js 页面
│   ├── _app.tsx
│   └── index.tsx
└── styles/             # 样式文件
    └── globals.css
```

## 开发

### 添加新的钱包适配器

在 `src/context/WalletContext.tsx` 中添加新的钱包适配器：

```typescript
import { NewWalletAdapter } from '@solana/wallet-adapter-wallets';

const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
    new NewWalletAdapter(), // 添加新钱包
  ],
  [network]
);
```

### 自定义样式

所有样式都在 `src/styles/globals.css` 中使用 Tailwind CSS 定义。

## 部署

### GitHub Pages 部署

1. Fork 此仓库
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为部署源
4. 推送代码到 `main` 分支

### 其他静态托管服务

支持部署到任何静态托管服务，如：
- Vercel
- Netlify
- Surge.sh
- Firebase Hosting

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

---

## 常见问题

**Q: 为什么我的钱包连接不上？**
A: 请确保你安装了对应的钱包扩展，并允许网站访问钱包。

**Q: 转账失败怎么办？**
A: 请检查：
- 钱包是否已连接
- 接收地址是否正确
- 余额是否充足
- 是否在钱包中确认了交易

**Q: 如何获得测试代币？**
A: 访问 [Solana 水龙头](https://faucet.solana.com/) 获取免费的测试代币。

**Q: 可以在主网使用吗？**
A: 需要修改 `src/context/WalletContext.tsx` 中的网络设置，但请谨慎操作。 