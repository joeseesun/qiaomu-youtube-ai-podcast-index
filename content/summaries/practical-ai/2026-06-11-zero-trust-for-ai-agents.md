# 面向 AI Agent 的零信任

- Podcast: Practical AI
- Episode: Zero Trust for AI Agents
- Source: https://share.transistor.fm/s/5c1a087d
- 获取时间: 2026-07-03T00:35:12.469Z

## 一句话结论
这期的核心不是“AI agents 很危险”这种泛泛提醒，而是：一旦 agent 进入企业环境，安全模型必须从“管人和管应用”升级为“管会行动的系统”，并用 Zero Trust 的思路，把身份、权限、行为、数据、恢复能力都纳入持续控制。

## 这期在讲什么
Daniel 和 Chris 围绕 Anthropic 的《Zero Trust for AI Agents》展开，重点讨论 agentic systems 的新威胁面：prompt injection、tool misuse、identity/privilege abuse、supply chain 风险、memory/RAG poisoning。两人的判断很明确：企业会越来越多地部署 autonomous agents，不只是为了效率，也因为攻击者同样在使用 AI 提升攻击速度和规模，所以防守方也必须引入 agent。

他们的重点不在“是否要用 agent”，而在“如何让 agent 在企业里可控地用”。Anthropic 给出的是一个分层框架：foundation、enterprise、advanced，分别对应从最低可用到高风险环境的安全要求。

## 核心要点

### 1. Agent 不是普通应用，安全边界会动态变化
agent 会调用工具、跨会话保留上下文、彼此通信，还可能在运行时生成新行为。也就是说，安全问题不只发生在输入和输出之间，而是贯穿执行过程。Chris 强调，传统 zero trust 本来就要求“默认不信任”，只是 agent 时代把这个原则推到了更动态、更难静态建模的环境里。

### 2. 最现实的威胁是 prompt injection 和 tool misuse
他们把 prompt injection，尤其是 indirect prompt injection，当作首要风险：攻击可以藏在 email、PDF、附件或其他外部内容里，诱导 agent 违背原始目标。另一类风险来自工具调用，尤其是 MCP 这类模式下，agent 可能接触到比预期更多的接口、schema 或 metadata，从而被诱导滥用权限。

### 3. 身份和权限是 Zero Trust 的地基
Anthropic 把 agent identity/authentication 视为所有后续控制的基础。示例包括：每个 agent instance 使用唯一的 cryptographic identifier、certificate-based authentication、以及 advanced 场景下的 hardware-backed identity 和 attestation。紧接着是 access control：RBAC、deny by default、最小权限，目标是落实 OWASP 提到的 least agency。

### 4. 可观测性不等于安全，但没有它就无法安全
他们区分了 observability、auditing、behavioral monitoring。前者记录 agent 做了什么，后者判断这些动作是否符合预期、是否可疑。Daniel 举例说，企业真正需要的是一条完整链路：谁触发了哪个 agent，它发起了什么 prompt、调用了什么 tool、被什么 policy 拦住、最后如何处置。没有这条链路，就谈不上治理。

### 5. 数据污染和供应链风险会把问题放大
除了模型本身，agent 还会依赖工具、包、MCP server、外部服务和运行时生成的配置，这些都属于供应链。另一方面，memory 和 RAG 也可能被 poisoning：一旦外部或恶意 agent 能写入上下文或向量库，后续检索就可能被系统性污染。Chris 还提醒，传统 cyber 风险如 BIOS、网络、firewall、依赖包漏洞依然全部有效，并不会因为“这是 AI”而消失。

### 6. 真正困难的是恢复，而不是检测
最后一个重点是 integrity and recovery。发现 agent 越界只是开始，更难的是如何 rollback、如何在关键业务不中断的前提下恢复到安全状态。Anthropic 给出的方向包括版本控制配置、immutable infrastructure、文档化回滚流程，以及更高级的自动 remediation。但 Chris 认为，在 agentic 系统里，“怎样把系统拉回来”比以前更棘手，因为 agent 可能直接参与关键业务流。

## 对 AI 从业者的启发
1. 不要把 agent 安全理解成“加个 prompt filter”就够了，它本质上是系统安全、身份安全、数据安全、运行时治理的组合题。  
2. 如果你已经在企业里部署 agent，最先补的不是花哨能力，而是 identity、least privilege、logging、tool boundary、rollback。  
3. 对工程团队来说，agent 安全会把很多原本偏安全团队的工作前移到产品和平台层；平台化会比单点补丁更重要。  
4. 对创业者来说，真正的机会不只是“做 agent”，而是“让 agent 可审计、可限制、可恢复”，这会是企业采纳的门槛。  

## 值得继续追问
- 在真实企业环境里，agent 的 identity 应该绑定到什么粒度：用户、任务、会话，还是硬件？
- 哪些工具调用必须强制 human-in-the-loop，哪些可以自动化放行？
- 如何定义 agent 的“异常行为基线”，让 behavioral monitoring 真正可用？
- 对 memory/RAG poisoning，有没有比事后清理更前置的防护机制？
- 当攻击时间尺度从“天”压缩到“秒”时，哪些安全决策还适合由人来做？
