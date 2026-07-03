# 为什么 AI Agents 会打破 GenAI 安全模型——Devvret Rishi 访谈

- Podcast: The TWIML AI Podcast
- Episode: Why AI Agents Break the GenAI Security Model with Devvret Rishi - #770
- Source: https://twimlai.com/podcast/twimlai/why-ai-agents-break-genai-security-model
- 获取时间: 2026-07-03T00:31:15.610Z

## 一句话结论
这期核心观点很明确：当 AI agent 从“回答问题”变成“跨工具执行动作”后，传统 GenAI 安全模型里那套“静态 guardrails + 人工审批”会迅速失效，企业需要转向运行时治理、可观测性和可恢复机制。

## 这期在讲什么
Sam 采访 Rubrik 的 AI GM Devvret Rishi，讨论 agent 进入企业后带来的安全变化。与只生成文本的 LLM 不同，agent 能规划、调用工具、更新系统、写代码、发消息，并在多个工作流中以机器速度执行，这让它们的价值更高，但风险也更大。

节目重点不在“要不要用 agent”，而在“当 agent 真正能做事时，怎么管”。Dev 认为，过去企业常用的做法——预先写规则、设置审批节点、让人逐个审核——在 agent 时代会变成一种规模化的失效机制，甚至沦为 security theater。

## 核心要点

### 1. Agent 的风险不是“会胡说”，而是“会真的做”
传统 LLM 出错主要造成信息层面的误导；agent 出错则可能直接修改系统、触发流程、发送消息，后果会落到真实业务上。只要它接上工具链，错误就不再停留在对话框里。

Dev 强调，agent 的能力越强，治理难度越高，因为它们不是被动生成内容，而是在工作流中连续采取行动。对企业来说，这意味着安全边界必须从“输出内容审查”升级到“动作过程控制”。

### 2. Tool access 会放大 blast radius
一旦 agent 拥有更多工具权限，它能触达的系统就更多，单点失误的影响范围也会被放大。节目里反复提到 tool sprawl 和 MCP，说明当工具数量快速增长时，权限管理和审计复杂度会指数上升。

问题不只是“给不给权限”，而是“给到什么粒度、在什么条件下、谁能回收”。如果权限设计粗糙，agent 可能在多个系统之间绕开原本的控制路径，形成难以预期的跨系统风险。

### 3. 预设规则很难覆盖 agent 的真实行为
静态 guardrails 假设系统行为可提前枚举，但 agent 的核心特点恰恰是动态规划和上下文驱动。它可以选择不同工具、不同路径、不同顺序完成目标，因此很容易出现“规则没禁止，但结果有问题”的灰区。

Dev 的意思不是规则没用，而是规则不能只写在模型外面。企业需要的是 policy-aware governance：政策要能在运行时被理解、被执行、被记录，而不是只在上线前做一次性配置。

### 4. Human-in-the-loop 可能变成安全幻觉
如果每一步都要求人审批，看起来很安全，实际上在高频、批量的 agent 任务里，人很难真正理解每个动作的上下文，只能机械点击通过。这样一来，审批反而像在给系统增加合规表演。

在 agent scale 下，人工审核的瓶颈不是“人不够认真”，而是“人无法跟上机器速度”。节目把重点放在减少对逐条审批的依赖，转而建立更强的 runtime enforcement 和事后回滚能力。

### 5. 企业需要可观测性、执行约束和恢复能力
Dev 和 Sam 讨论的替代方案包括：更好的 agent observability、运行时策略执行、defense in depth，以及出错后的 recovery / agent rewind。这里的逻辑很像传统安全与运维：不是假设不会出事，而是让出事后能看见、能拦住、能撤回。

Rubrik 的 sponsor 信息也呼应了这一点：监控 agent 行为、基于策略控制动作，并在错误扩散前 rewind。对 agent 来说，“可恢复”开始和“可用”一样重要。

### 6. 甚至需要 AI 来帮 AI 做安全
节目最后一个有意思的判断是：agent 时代的安全复杂度，可能已经超过纯人工治理能力，因此需要 AI-assisted security。比如用更小的模型做 policy enforcement，或用专门的 agent 去监控、解释和约束其他 agent。

这不是简单的“让模型管模型”，而是承认企业级 agent 系统已经进入动态博弈：攻击、绕过、误操作、回滚，都需要机器协同完成。

## 对 AI 从业者的启发
对于做 AI 产品、工程和平台的人，这期最大的提醒是：别把 agent 当成“更聪明的 chatbot”，而要当成“有权限的执行体”。一旦接入真实系统，安全设计必须前移到权限建模、工具编排、审计和恢复。

如果你在做 agent 产品，优先级可能应当是：最小权限、细粒度策略、运行时监控、动作日志、可回滚，而不是单纯把模型能力继续做大。否则，能力提升越快，事故放大的速度也越快。

## 值得继续追问
1. 对不同类型的 tool access，企业应该如何定义最小权限边界？
2. runtime enforcement 具体要拦截什么：意图、动作、参数，还是结果？
3. agent observability 的最小可用指标集是什么？
4. 当人工审批失效时，哪些场景适合用自动回滚，哪些必须冻结？
5. small language models 在 policy enforcement 里能承担到什么程度？
6. MCP 生态下，工具标准化会降低治理成本，还是加速 tool sprawl？
