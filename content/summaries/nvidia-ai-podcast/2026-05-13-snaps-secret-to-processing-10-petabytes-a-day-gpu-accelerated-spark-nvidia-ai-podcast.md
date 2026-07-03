# Snap 每天处理 10 PB 数据的秘密：GPU 加速的 Spark | NVIDIA AI Podcast 第298期

- Podcast: NVIDIA AI Podcast
- Episode: Snap’s Secret to Processing 10 Petabytes a Day: GPU-Accelerated Spark | NVIDIA AI Podcast Ep. 298
- Source: https://cohst.app/pdcst/9V4R8T/traffic.megaphone.fm/NVC2926487857.mp3
- 获取时间: 2026-07-03T09:42:20.805Z
- 说明: 本概要基于 RSS 节目简介，不是完整 Transcript 总结。

## 一句话结论
这期主要讲 Snap 如何把大规模实验数据处理迁到 NVIDIA GPU-accelerated Apache Spark + Google Cloud，在不改业务代码的前提下显著降本增效，并支撑近十亿月活平台的 A/B 测试与数据基础设施现代化。

## 这期可能值得听的原因
如果你关心“GPU 不只做推理，也能做数据处理”，这期很典型：它不是概念讨论，而是 Snap 这种超大规模社交平台把 Spark 管道真正迁到 GPU 后的工程收益。对做数据平台、实验平台、云原生基础设施的人尤其有参考价值。

## 简介里的关键信息
1. Snap 每天早晨处理超过 10 PB 的 experimentation data，说明它的数据链路不是单点优化，而是面向超大吞吐的批处理体系。简介强调的是“every single morning”，意味着这是固定、持续、高压的生产负载，而不是离线 demo。

2. 他们使用的是 NVIDIA GPU-accelerated Apache Spark，部署在 Google Cloud 上，并结合 NVIDIA cuDF plugin（简介里注明 formerly referred to as NVIDIA RAPIDS plugin）用于 Apache Spark on Google Kubernetes Engine。重点在于：通过平台级重构把 Spark 数据处理搬到 GPU 生态里。

3. 最关键的结果是“zero application code changes”下实现了可观收益：作业成本降低 76%，内存占用降 80%，并消除了 120 TB 的 disk spill。这里说明收益不仅来自算力，更来自整体数据管道执行方式的改变。

4. 这期还涉及 Snap 如何做 planetary scale 的 A/B tests，简介点到 heterogeneous treatment effect detection 和 variance reduction 这类统计方法，说明他们关注的不只是跑得快，还要保证大规模实验分析的统计严谨性。

5. 另一个有意思的点是资源调度：Snap 会利用 1–5 a.m. 的闲置 inference GPUs 做 batch data processing。也就是说，他们在做跨工作负载复用，把推理和批处理在时间维度上协调起来，提高 GPU 利用率。

6. 受访者是 Prudhvi Vatala，Snap 的 head of engineering platforms，表明这不是单一算法团队视角，而是偏工程平台/基础设施负责人从系统设计角度总结迁移经验。

## 适合谁听
适合数据平台工程师、Spark/湖仓工程师、云基础设施团队、AI 基础设施从业者，以及正在评估 GPU 加速 ETL/批处理成本收益的创业者和技术负责人。也适合关心大规模实验平台、A/B test 基建和资源复用策略的人。

## 后续等 Transcript 核验的问题
- Snap 具体是如何做 Spark 到 GPU 的迁移评估与上线切换的？
- “zero application code changes”具体覆盖了哪些作业类型，哪些地方仍需配置调整？
- 76% 成本下降主要来自算力、存储、还是集群利用率提升？
- 120 TB disk spill 消除前后，瓶颈主要出现在 shuffle、join 还是聚合阶段？
- 1–5 a.m. 复用 inference GPUs 的调度策略如何避免影响在线推理 SLA？
- heterogeneous treatment effect detection 和 variance reduction 在 Snap 的实验管道里具体怎么落地？
