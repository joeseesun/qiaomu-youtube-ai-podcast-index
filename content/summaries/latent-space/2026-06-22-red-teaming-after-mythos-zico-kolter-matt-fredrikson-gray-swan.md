# Mythos 之后的红队测试——Zico Kolter 与 Matt Fredrikson，Gray Swan

- Podcast: Latent Space: The AI Engineer Podcast
- Episode: Red-Teaming after Mythos — Zico Kolter & Matt Fredrikson, Gray Swan
- Source: https://www.latent.space/p/gray-swan
- 获取时间: 2026-07-03T00:28:23.412Z

## 一句话结论

这期把 AI 安全从“给软件加一层防火墙”重新定义为：**面对一种会被诱导、会误判、会在工具链里执行动作的“新型智能体”时，必须同时做红队、做防护、还要做持续评估**。Zico Kolter 和 Matt Fredrikson 的核心判断是：AI 领域最危险的事件往往不是完全不可预见，而是“灰天鹅”——大家其实都看得到它会来。

## 这期在讲什么

节目围绕 Gray Swan 的两条主线展开：一条是自动化 red teaming 系统 **Shade**，一条是防护/守卫模型 **Cygnal**。他们讨论了 **prompt injection**、**jailbreak**、agent 的工具调用风险、企业场景里的权限与数据边界，以及为什么 frontier model 变大并不会自动变得更“安全”。

更重要的是，他们把问题从“模型会不会说错话”推进到“模型会不会在真实工作流里做错事”。当 AI 进入 browser use、computer use、代码执行和私有数据访问场景后，安全问题就不再只是内容安全，而是端到端的操作安全。

## 核心要点

### 1. AI 安全不是传统 cybersecurity 的简单延伸

Zico 强调，AI 系统不是普通软件加上一个模型，而是“会被欺骗的系统”。它们不仅能帮助发现软件漏洞，也会引入自己独有的脆弱性。尤其当很多人都依赖少数几个模型和 agent 产品时，一旦发现共性漏洞，影响会被快速放大。

### 2. prompt injection 的关键是“外部输入 + 私有信息 + 可外发”

Matt 复述了 Simon Willison 的 **lethal trifecta**：要形成高风险，通常需要同时具备三件事——接收不可信外部数据、能接触到私有数据、还能把结果外发。单独有其中一项还不够，真正危险的是 agent 把“读到的外部文本”当成了“应执行的指令”。

他们也强调，很多企业以为“多写点 prompt”就能解决问题，但在复杂、上下文重的任务里，这远远不够。真正的防护需要知道 agent 实际会做什么，而不只是它读到了什么。

### 3. Shade 说明：专门训练的 red-teaming 模型，已经能超过人类

Gray Swan 不是靠人工找漏洞，而是训练专门的红队模型做自动化攻击。Zico 说，**Shade** 在某些设定下已经比人类 red teamer 更强，尤其是在固定时间窗口和明确任务集合里，能找到更多 breaks。这里的关键不是“AI 已经无敌”，而是 red teaming 本身就是寻找 out-of-distribution 行为，天然适合用自动化系统规模化推进。

### 4. frontier model 不会因为更大就更安全

一个反直觉点是：安全和鲁棒性并不随着 scale 自动提升。Zico 认为，模型变大未必更会抵抗 jailbreak 或 prompt injection；很多安全能力需要**显式训练**。这也是为什么 Gray Swan 认为“鲁棒性”本身是一种可训练能力，而不是 scaling 的副产品。

### 5. Cygnal 的定位不是内容过滤，而是 policy enforcement

**Cygnal** 被设计成夹在 user、LLM 和 tool calls 中间的过滤/守卫层。它不仅看输入是否包含 prompt injection，也看输出动作是否违反企业政策，比如是否把 API key 发到不可信位置，或者是否触碰了某个不该访问的数据域。

Matt 和 Zico 都强调，这种产品适合企业场景，因为企业真正需要的是“可配置的、能理解自然语言政策的守卫”，而不是一个通用的开源 guardrail 组件。

### 6. 计算机使用型 agent 把问题放大了

在 **browser agent / computer-use agent** 里，风险从“生成错误文本”升级成“真实执行错误操作”。节目里提到他们对 **OpenClaw** 做了大量 break 测试；一旦 agent 能操作网页、文件和外部系统，prompt injection 就可能变成真正的业务事故，比如误删数据库、泄露凭证、触发不该发生的外发动作。

## 对 AI 从业者的启发

1. **把 agent 当作不可信执行者设计**，不要默认它会忠实执行目标。  
2. **任何接入外部内容、私有数据和工具调用的链路，都应默认有 prompt injection 风险。**  
3. **安全不是 prompt engineering 的附属品**，而是需要单独评估、训练和上线的能力层。  
4. **企业落地时最关键的是 policy，而不是“模型聪明不聪明”**。  
5. **自动化 red teaming 很可能会成为 AI 基础设施的一部分**，就像今天的监控、权限和审计一样。

## 值得继续追问

- 如果 Shade 已经能超过人类 red teamer，下一代人工红队的价值在哪里？
- Cygnal 这类守卫模型如何在“高召回”和“低误杀”之间取得稳定平衡？
- 对于 browser/computer-use agent，哪些权限应该默认关闭，哪些可以动态开启？
- 企业自定义 policy 如何被可靠地形式化，避免只停留在自然语言层面？
- 当 AI 既负责攻击又负责防守时，红队与防守模型之间会不会形成新的军备竞赛？
