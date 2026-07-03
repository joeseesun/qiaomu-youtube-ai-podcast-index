# Security Policy

如果你发现安全问题，请不要在公开 issue 中贴出敏感细节。

请通过以下方式联系维护者：

- GitHub: [@joeseesun](https://github.com/joeseesun)
- X: [@vista8](https://x.com/vista8)

## Scope

这个仓库主要是静态网站和数据构建脚本。安全问题通常包括：

- 凭证、token、cookie、私有 note id 或日志被错误提交。
- Markdown 渲染或 HTML 生成引入 XSS 风险。
- 部署脚本可能误删生产目录或上传不该公开的文件。

## Out Of Scope

- 第三方播客平台、YouTube、Apple Podcasts、RSS 源、字幕源或音频 CDN 的安全问题。
- 个人本机环境变量、SSH 配置或未提交到仓库的运行态文件。
