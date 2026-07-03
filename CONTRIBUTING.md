# Contributing

谢谢你愿意改进 AI 播客索引。

## 可以贡献什么

- 新增值得长期跟踪的 AI 播客或频道。
- 修正播客官网、Apple Podcasts、YouTube、RSS 等链接。
- 改进中文标题、简介、分类和适合人群标签。
- 修复静态站点构建、Markdown 渲染、移动端布局或无障碍问题。

## 本地检查

```bash
npm install
npm run check
npm run build
npm run serve
```

提交前请至少运行 `npm run check`。涉及页面生成或样式时，也请运行 `npm run build` 并本地预览。

## 数据原则

- 不要提交 API Key、token、cookie、个人日志或运行态状态文件。
- 不要伪造订阅数、播放量、嘉宾身份或来源链接。
- 新增播客时优先使用公开官网、RSS、YouTube、Apple Podcasts 等可验证来源。
- Transcript 和总结内容需尊重原始内容版权和平台条款。

## Pull Request

PR 描述请说明：

- 改了哪些播客、数据或页面。
- 运行过哪些验证命令。
- 是否涉及生成内容、版权边界或外部服务。
