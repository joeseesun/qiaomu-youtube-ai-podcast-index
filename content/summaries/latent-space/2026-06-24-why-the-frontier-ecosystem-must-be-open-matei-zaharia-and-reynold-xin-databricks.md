# 为什么前沿生态必须开放——Matei Zaharia 与 Reynold Xin，Databricks

- Podcast: Latent Space: The AI Engineer Podcast
- Episode: Why the Frontier Ecosystem must be Open — Matei Zaharia and Reynold Xin, Databricks
- Source: https://www.latent.space/p/databricks
- 获取时间: 2026-07-03T00:28:04.000Z

## 一句话结论
Databricks 这期的核心判断很明确：当 AI agents 开始“真正做事”时，决定胜负的不是单个模型，而是数据、权限、状态、成本控制和数据库架构；因此 Databricks 正在把自己推进成 enterprise agents 的 operating system。

## 这期在讲什么
这期主要围绕两个新方向展开：一是 Omnigent，Databricks 开源的 agent meta-harness，想把 Claude Code、Codex、Cursor、Pi 和自定义 agent 统一到一层共同 API 之上；二是 LTAP / Lakebase，试图把传统 OLTP/OLAP 分裂的数据库栈重新收敛到面向 agent 的“活数据”架构上。  
Matei Zaharia 和 Reynold Xin 的共同观点是：模型能力会越来越像 commodity，但企业真正的壁垒在于业务上下文、治理能力、实时数据和系统整合。Databricks 过去解决的是 lakehouse 问题，现在要解决的是“agents 如何安全、可协作、可审计地接触业务系统”。

## 核心要点

### 1. Omnigent 的定位不是“又一个 agent 框架”
Matei 反复强调，Omnigent 不是要取代所有 harness，而是提供一层 common API：agent session、message、file、stream、tool call、cancel turn 等统一抽象。它把 Claude Code、Codex、Pi、OpenAI SDK 等映射到同一接口上，避免团队每次切换模型或 harness 都重写一套集成。

这个设计背后的经验来自 Databricks 内部：不同团队已经在各自造轮子，做出很多“只能自己用”的 agent app。Omnigent 的价值不是多一个 UI，而是让 agent 变成可共享、可协作、可替换的系统组件。

### 2. 共享、历史、协作，比“能跑”更重要
Matei 认为 agent 真正可用的前提，不是能否生成代码，而是能否保留 session history、支持 search、允许多人共享和协作。否则 agent 只能是个人临时工具，无法进入团队工作流。  
这也是他为什么强调 server 端：只有把 agent 放进一个有状态的服务里，才可能实现日志、权限、协作和安全控制；否则一切都困在 laptop 上，体验像“把生产力带回黑暗时代”。

### 3. 安全不该是简单的 yes/no
Matei 对 agent security 的重点是 contextual policies，而不是传统的 allow/deny 列表。原因很现实：同一个 agent 可能被允许读某些文档、安装某些 npm 包、发布某些网页，但这些能力组合起来就可能触发 prompt injection 或数据泄漏。  
所以 Omnigent 需要跟踪 session state：比如是否安装过可疑包、是否访问过大量敏感文档、是否已经接近风险边界。政策不再只看“这个动作能不能做”，而是看“这个 session 到目前为止做了什么”。

### 4. 成本控制会成为 agent 基础设施的一部分
他们明确提到，agent 可能会为了 debug 一个问题狂读日志，轻松烧掉 $500 tokens；所以 spend control 不能是事后看账单，而要在 session 内实时限制。Databricks 已经把 spending 作为状态的一部分，允许设置上限，超了就请求用户确认。  
这意味着未来的 coding-agent 产品，不只是 IDE 或聊天框，而会多出一层 management plane：看质量、看能力、看任务类型、看花费分布。

### 5. LTAP 的问题意识：CDC 太脆，HTAP 太难
Reynold 把数据库世界分成 OLTP 和 OLAP：前者服务交易，后者服务分析。传统做法是通过 CDC 把 OLTP 的 binlog 同步到分析系统，但这个链路非常脆弱，schema change、管道故障、凌晨 3 点报警都是常态，他们甚至半开玩笑把 CDC 叫做“continuous data corruption”。  
Databricks 的 LTAP 思路是：不要执着于把所有引擎塞成一个 HTAP，而是统一存储层，在 object store 上重构数据库能力，让 transactional data 直接以更适合分析的方式存在，减少复制和同步带来的复杂性。

### 6. 更大的赌注：传统软件会被“数据 + agent”重写
他们的长期判断是：如果数据已经在正确的位置上，agent 再站到上层，很多传统软件就会被重写。原因不是 agent 比人聪明，而是它能在正确权限下调用 live business data、workflow 和治理规则，自动完成过去靠人工操作的流程。  
这也解释了 Databricks 为什么同时推进 Genie、Mosaic、AI Runtime、RL fine-tuning 等：模型只是入口，真正的护城河是把企业数据、计算和治理连成一个可编排系统。

## 对 AI 从业者的启发
1. 做 agent 产品，不要只盯着模型选择；最容易形成壁垒的是权限、状态、协作、审计和成本控制。  
2. 企业级 agent 的关键不是“会不会回答”，而是“能不能安全地调用真实系统”。  
3. 如果你的产品要进入团队协作场景，server、session、history、policy 这些能力会比单机体验更重要。  
4. 数据基础设施公司正在把竞争焦点从“存数据”转向“让 agent 在数据上做事”。这会重塑数据库、治理、BI 和开发工具的边界。  

## 值得继续追问
- Omnigent 的 common API 会不会成为事实标准，还是只是 Databricks 生态内的兼容层？
- contextual policies 要怎么定义、测试和调试，才能既安全又不把用户体验搞得太烦？
- LTAP 相比传统 HTAP 到底少了哪些能力、换来了哪些复杂度？
- 对于 coding-agent analytics、quality、skills、spend 这类“管理平面”产品，真正的 PMF 会先出现在什么类型的公司？
