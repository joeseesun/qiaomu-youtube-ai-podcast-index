# 记忆与持续学习：Engram 的 Dan Biderman 和 Jessy Lin

- Podcast: Training Data
- Episode: Memory and Continual Learning: Engram's Dan Biderman and Jessy Lin
- Source: https://pscrb.fm/rss/p/traffic.megaphone.fm/CPUAI1349350448.mp3
- 获取时间: 2026-07-03T09:42:44.239Z
- 说明: 本概要基于 RSS 节目简介，不是完整 Transcript 总结。

## 一句话结论
这期围绕 Engram 的 Dan Biderman 和 Jessy Lin，讨论他们如何把“记忆”和“持续学习”视为同一问题：不是继续堆上下文或加 RAG，而是把团队知识写进模型权重里，让模型更像“老员工”。

## 这期可能值得听的原因
如果你关心企业知识如何真正进入模型，而不是停留在检索层，这期会很对口。它直接挑战了“更长上下文 + RAG”这条主流路线，给出的是一条更激进的思路：让模型长期记住组织知识，并在 token 成本上显著下降。对做 AI 产品、企业 Copilot、私有化模型的人来说，这个问题非常现实。

## 简介里的关键信息
- Engram 的定位是一个围绕 memory 和 continual learning 的 “neolab”，他们认为两者是同一枚硬币的两面。这个设定意味着他们关注的不只是模型性能，而是模型如何在时间维度上积累能力。
- 他们的核心主张很反直觉：不要不断把信息塞进 context window，也不要只靠 RAG 作为外接知识层，而是把团队知识直接“烘焙”进 model weights。目标是让模型对公司知识的理解，接近一个在岗多年的员工。
- RSS 简介声称，这种方法能在 matching 或 beating frontier models 的同时，消耗最多少 100x 的 tokens。这里的重点不是单纯提升 benchmark，而是用更低推理成本换取可持续的企业知识能力。
- 团队与 Microsoft、Notion、Harvey 等合作，说明他们的方向并非纯研究玩具，而是有明确的企业场景验证。尤其这类合作通常意味着知识密集型工作流、内部问答、文档理解等任务。
- 他们的技术根基来自 computational neuroscience 和 state-space architectures，暗示其方法论可能更偏“记忆机制”而非传统 transformer 的简单扩展。简介还明确指出，他们认为 AI 的真正瓶颈不是 raw intelligence，而是 memory 和 continual learning。
- 简介末尾提到他们想象的是“每个人都有自己的模型”，且模型是 privately trained。虽然这句后半截被截断，但方向已经很清楚：从通用大模型转向个人/组织专属模型。

## 适合谁听
适合做企业 AI 产品、知识管理、Agent、模型微调/持续训练、以及研究 memory / continual learning / state-space model 的听众。也适合想判断“RAG 到底是不是终局方案”的创业者和工程负责人。

## 后续等 Transcript 核验的问题
- 他们所谓把知识写入 weights，具体是 continual fine-tuning、adapter、还是别的训练范式？
- “100x fewer tokens” 是在什么任务、什么基线、什么评测条件下得到的？
- 他们如何处理遗忘、污染、版本回滚，以及企业知识更新的频率问题？
- 与 Microsoft、Notion、Harvey 的合作是 PoC、正式集成，还是研究合作？
- state-space architectures 在他们系统里扮演什么角色，和 Transformer/RAG 的边界如何划分？
