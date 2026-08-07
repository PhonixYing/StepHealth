# StepHealth GitHub Pages 官网

这是不依赖构建工具的静态官网，可直接部署到 GitHub Pages。首页、隐私政策和支持页都使用相对路径，项目页与自定义域名均可正常访问。

## 上线前替换

1. 在 `index.html` 中将两个 `href="#"` 替换成 StepHealth 的 App Store 链接。
2. 在 `support.html` 中将 `hello@example.com` 替换为真实的支持邮箱。
3. 按实际情况核对并更新 `privacy.html` 的隐私政策内容与日期。

## GitHub Pages 部署

1. 在 GitHub 创建仓库，例如 `stephealth-site`，并上传此目录中的全部文件。
2. 打开仓库 **Settings > Pages**。
3. 在 **Build and deployment** 选择 **Deploy from a branch**，分支选择 `main`、文件夹选择 `/ (root)`，然后保存。
4. 等待部署完成，GitHub 会提供类似 `https://<用户名>.github.io/stephealth-site/` 的网址。
5. 将该网址分别填写到 App Store Connect 的“营销 URL”；隐私政策 URL 使用 `https://<用户名>.github.io/stephealth-site/privacy.html`，支持 URL 使用 `https://<用户名>.github.io/stephealth-site/support.html`。

若使用自定义域名，可在同一页面配置。部署完成后请用手机和桌面浏览器各检查一次下载链接、隐私政策和支持邮箱。
