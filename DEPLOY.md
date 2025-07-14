# 部署到 GitHub Pages 指南

## 🚀 快速部署

### 1. 准备 GitHub 仓库

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/hello_solana.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 GitHub
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** 选项卡
3. 滚动到 **Pages** 部分
4. 在 **Source** 选项中选择 **GitHub Actions**
5. 保存设置

### 3. 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

### 4. 访问你的网站

部署完成后，你的网站将在以下地址可用：
```
https://你的用户名.github.io/hello_solana/
```

## 📝 本地测试

在部署之前，你可以在本地测试静态构建：

```bash
# 构建静态文件
npm run export

# 使用任何静态文件服务器测试
npx serve out
# 或者
npx http-server out
```

## 🔧 自定义配置

### 修改项目名称

如果你的仓库名不是 `hello_solana`，需要在 `next.config.js` 中修改：

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/你的仓库名' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '',
```

### 使用自定义域名

如果你有自定义域名，可以在仓库根目录创建 `CNAME` 文件：

```
echo "你的域名.com" > CNAME
```

## 📦 其他部署选项

### Vercel
```bash
npx vercel --prod
```

### Netlify
```bash
npm run export
# 然后将 out 文件夹拖拽到 Netlify 网站
```

### 任何静态托管服务

构建完成后，`out` 文件夹包含了所有静态文件，可以部署到任何静态托管服务。

## 🐛 常见问题

### Q: 部署后页面空白或样式错误？
A: 检查 `next.config.js` 中的 `basePath` 和 `assetPrefix` 配置是否正确。

### Q: GitHub Actions 构建失败？
A: 检查 Node.js 版本是否兼容，建议使用 Node.js 18。

### Q: 钱包连接在部署后不工作？
A: 确保你的域名支持 HTTPS，大多数钱包要求安全连接。

## 🔄 更新部署

要更新你的部署，只需：

```bash
git add .
git commit -m "更新功能"
git push origin main
```

GitHub Actions 会自动重新构建和部署。 