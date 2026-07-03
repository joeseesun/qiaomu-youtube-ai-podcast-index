# 为什么 Netflix、Uber 和 Spotify 从不卡顿：那款鲜少被提起的数据库 | Aaron Katz

- Podcast: Gradient Dissent
- Episode: Why Netflix, Uber, and Spotify Never Lag: The Database Nobody Talks About | Aaron Katz
- Source: https://wandb.ai/site/resources/podcast
- 获取时间: 2026-07-03T03:57:30.103Z

## 一句话结论
这期的核心判断是：ClickHouse 不是“又一个数据库”，而是为高吞吐分析、可观测性和 agent 时代的数据基础设施做的底层引擎；Aaron Katz 的重点不在讲概念，而在解释为什么真正的壁垒来自性能、数据模型和敢于做出会短期伤客户的产品取舍。

## 这期在讲什么
Lukas Biewald 和 ClickHouse CEO Aaron Katz 主要聊了三件事：ClickHouse 从 Yandex 内部工具成长为独立公司；ClickHouse Cloud 如何成为商业化重心，并完成累计约 $300M 融资；以及他为什么认为面向 agents 的软件栈会改写数据库、可观测性和工作流产品的设计逻辑。  
节目标题里提到 Netflix、Uber、Spotify “never lag”，本质是在说这类公司对实时分析、埋点查询、监控与日志处理的要求极高，而 ClickHouse 正是在这些场景里被频繁采用。介绍里还点到了 Anthropic、OpenAI、Meta、Tesla 等使用者，说明它已经从“开源项目”变成大模型公司和高增长互联网公司都要依赖的基础设施。

## 核心要点

### 1. 从 Yandex 内部工具到 ClickHouse Inc.
ClickHouse 的起点是 Yandex 的内部系统，而不是一开始就面向市场的产品。这种出身决定了它的价值主张：先解决高并发、低延迟分析查询，再谈包装、销售和生态。  
Aaron Katz 讲这条路径时，重点不在“开源如何成功”的励志叙事，而在于：当一个技术项目已经在真实大规模场景里被验证过，商业化的第一步通常不是重写产品，而是把稳定性、云服务和可采购性补齐。

### 2. ClickHouse Cloud 是商业化主战场
节目明确提到 ClickHouse Cloud 与累计约 $300M 融资，这说明公司已经把重心从“卖软件”转向“卖托管服务和企业级体验”。对很多基础设施公司来说，云产品不是附加项，而是把开源使用者转化为稳定收入的关键路径。  
这也意味着竞争不只在功能层面，而在交付、运维、规模化支持和企业采购流程上。基础能力若足够强，真正决定胜负的往往是“能不能让客户少操心”。

### 3. 为 agents 设计的软件，会和为 humans 设计的不一样
节目描述里直接引用了 Aaron 的判断：设计给 agents 而不是 humans 的公司，会获得很大提升。这里的含义是，agent 不像人类一样零散地看页面、点按钮，而是会高频调用接口、读取结构化数据、连续执行任务。  
因此数据库、日志、监控、权限和工作流系统都需要按机器消费方式重新设计：更快的读写、更稳定的查询接口、更细粒度的事件记录，以及更适合程序自动拼接的语义层。

### 4. 为什么 LangFuse 的收购值得关注
简介里特别提到 Aaron 明知收购 LangFuse 可能会失去一部分客户，仍然选择并购。这是一个很典型的基础设施公司决策：不是所有增长都该追求“短期无摩擦”，有时要通过整合关键能力来换取长期平台控制力。  
对外看，这可能影响部分客户的工具选型；对内看，这是在补齐 agents 时代的重要拼图——观察、调试、评估和可追踪性。对基础设施公司而言，围绕“谁能提供完整闭环”竞争，往往比单点功能更重要。

### 5. Snowflake、Datadog、Databricks 都是对照系
简介点名 Snowflake、Datadog、Databricks，说明对话并不只是讲 ClickHouse 自己，而是在比较新旧数据栈的边界。ClickHouse 所处的位置，介于数据仓库、实时分析、可观测性平台之间。  
这类公司竞争的核心不是“有没有 SQL”，而是能否在特定工作负载下以更低成本提供更快查询、更好伸缩和更强的在线分析能力。也正因此，数据库选型本质上是架构选择，而不是简单采购。

## 对 AI 从业者的启发
第一，agent 时代最先被重做的，未必是模型本身，而是模型周边的数据和执行层：trace、eval、event log、权限、审计、查询。谁掌握这些层，谁就更接近“真实工作流”。  
第二，基础设施公司的护城河常常来自“愿不愿意做难而长的取舍”。LangFuse 这种并购思路提示我们：平台化不是把功能堆满，而是把关键链路收回来。  
第三，如果你的产品面对 AI 应用，不能只按“人类 UI”思维设计。要默认未来会有大量机器读写、自动重试和批量调用，这会改变 schema、API 乃至定价模型。

## 值得继续追问
1. Aaron 口中的“为 agents 设计”具体会先落到 ClickHouse 的哪一层：查询、事件模型、实时分析还是权限体系？  
2. ClickHouse Cloud 与开源版的边界如何划分，哪些能力会持续只在云上提供？  
3. 收购 LangFuse 后，ClickHouse 想补齐的是 observability、eval 还是完整 agent platform？  
4. 面对 Snowflake、Datadog、Databricks，ClickHouse 最有胜算的工作负载到底是哪一类？  
5. 如果 agents 成为主要用户，数据库产品的计费方式会不会从“存储/查询”转向“事件/调用/工作流”？
