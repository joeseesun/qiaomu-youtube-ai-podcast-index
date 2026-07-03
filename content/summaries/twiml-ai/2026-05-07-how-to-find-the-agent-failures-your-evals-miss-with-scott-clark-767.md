# 如何发现你的评测漏掉的 Agent 失败：Scott Clark 访谈 #767

- Podcast: The TWIML AI Podcast
- Episode: How to Find the Agent Failures Your Evals Miss with Scott Clark - #767
- Source: https://twimlai.com/podcast/twimlai/how-find-agent-failures-your-evals-miss
- 获取时间: 2026-07-03T00:32:12.718Z

## 一句话结论

这期的核心观点很直接：**LLM/agent 上线后，不能只靠离线 eval；真正抓住失败，需要把 telemetry、monitoring 和 online analytics 串成一套“可观测性金字塔”**，尤其要识别那些标准评测看不见的“未知未知”。

## 这期在讲什么

Scott Clark 讨论的是如何在生产环境里可靠运营复杂的 LLM 系统和 agents。重点不是“模型准不准”，而是**系统在真实流量里会如何失真、退化、冒出新型失败模式**。节目里给出的例子包括：一些看起来完成了任务、实际上却“偷懒”的 tool-use hallucination，传统 eval 不一定会报错，但在线数据会暴露出来。

他提出一个类似 Maslow hierarchy 的 observability 思路：先有 logging 级别的 telemetry，再有针对已知信号的 monitoring，最后靠 post-production / online analytics 发现未知模式。这里的关键不是堆指标，而是让系统能持续产出可分析的 traces，并把这些 traces 转成可聚类、可检索、可生成新 eval 的数据资产。

## 核心要点

### 1. 离线 eval 只能覆盖“已知失败”
标准 eval 通常验证的是预先定义好的任务和指标，但 agent 在生产里面对的是更开放、更非稳定的环境。Scott 强调，很多问题并不是“模型不会做”，而是**模型在某些上下文里表现出系统性偏差**，离线基准没有覆盖到。

这意味着团队不能把 eval 当终点，而要把它看成一个持续被在线数据反哺的环节。否则，你看到的只是实验室里的能力，而不是真实业务中的失效方式。

### 2. “Lazy” tool-use hallucination 是典型盲区
节目里提到一种很有代表性的失败：模型表面上调用了工具、走完了流程，但其实是“懒惰式”地编造了工具结果，或者用不充分的方式绕过真正的检索/计算。这类问题在文本输出上未必显著异常，所以**简单的结果对错 eval 很容易漏掉**。

这类失败特别适合说明为什么 agent 不能只测最终答案，还要测中间过程：是否真的发起了 tool call、调用顺序是否合理、结果是否被正确消费、有没有跳步或伪造中间状态。

### 3. 可观测性要从 trace 进入“行为分析”
Scott 提到把 traces 映射成 vector fingerprints，再做 clustering 和 topic discovery。这个思路的重点是：不要只把 trace 当日志看，而要把它当成**行为样本**。一旦向量化，就能把看似零散的失败聚成模式，识别出新出现的行为簇。

对团队来说，这意味着分析对象从单条请求升级为“请求族群”和“异常主题”。你不再只回答“这次为什么错”，而是能回答“最近出现了哪几类新失败”。

### 4. Analytics 不是报表，而是 data flywheel
这期反复强调，online analytics 的价值不只是可视化，而是要反哺系统：自动生成 eval、生成 guardrails、筛选 training data。也就是说，分析层应当直接进入产品迭代闭环。

如果没有这层飞轮，系统就会停留在“看到了问题，但不知道怎么系统性修复”。而有了飞轮，失败样本会变成评测集、规则和训练集，持续推动质量提升。

### 5. 非平稳模型要求在线、适应式方法
节目里提到 non-stationary models：模型、提示词、工具、业务分布都在变，今天有效的阈值明天可能失效。Scott 的观点是，**静态评测和静态告警不足以应对这种变化**，必须有在线、可调整的分析与监控机制。

这也解释了为什么“生产中的 agent 质量管理”更像运维问题，而不是一次性建模问题。

### 6. OpenTelemetry 和 GenAI semantic conventions 是落地起点
在实践层面，节目提到 instrumentation 可以从 OpenTelemetry 入手，并结合 GenAI semantic conventions 统一记录结构化信息。这个建议的价值在于：先把数据采集标准化，后面的分析、聚类、异常发现才有基础。

换句话说，先解决“有没有足够好的 traces”，再谈“怎么做更高级的智能分析”。

## 对 AI 从业者的启发

- **不要把 eval 当作生产质量的全部答案**：它更像第一道筛子，真正的失败模式往往要靠在线数据发现。
- **agent 设计要同时考虑中间过程和最终输出**：尤其是 tool-use、routing、retrieval 这类链路，过程正确性本身就是质量指标。
- **把 observability 当成产品能力，不只是工程成本**：可观测性越好，越容易形成数据飞轮，减少“看见问题但修不动”的情况。
- **先标准化 trace，再做智能分析**：没有高质量 instrumentation，后面的 clustering、topic discovery、自动生成 eval 都会失真。
- **面对非平稳系统，要接受质量管理是持续战**：模型、提示、工具和业务都在变化，静态规则很快过期。

## 值得继续追问

1. 如何定义“lazy” tool-use hallucination 的可操作指标，避免只看最终答案？
2. traces 向量化后，哪些特征最能区分 agent 的失败簇？
3. 自动生成 eval 和 guardrails 时，如何避免把偶发模式过度固化成规则？
4. OpenTelemetry 在 GenAI 场景里哪些字段是最小必需集？
5. 在线 analytics 如何与人工 review 分工，才能兼顾效率和误报控制？
