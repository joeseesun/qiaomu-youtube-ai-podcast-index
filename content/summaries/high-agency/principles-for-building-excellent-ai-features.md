# 打造优秀 AI 功能的原则

- Podcast: High Agency
- Episode: Principles for Building Excellent AI Features
- Source: https://www.youtube.com/watch?v=5Ik2_L3vjqU
- 获取时间: 2026-07-03T00:36:41.033Z

## 一句话结论
Superhuman 做 AI 功能的核心方法，不是先追求“最炫”的模型能力，而是先把 AI 嵌进真实工作流里，围绕“优化学习”和“无感集成”两条原则，持续用内部测试、beta 反馈和数据集迭代把功能打磨到可用、好用。

## 这期在讲什么
这期主要讲 Superhuman 的 AI 邮件功能是怎么做出来的：从 Write with AI、Instant Reply、自动摘要，到 Ask AI 和 Instant Event。Lorilyn McCue 重点解释了产品如何在“写邮件、读邮件、搜邮件、建日程”四类高频场景里，用 LLM 节省时间；以及团队如何在 prompt、评测集、上线节奏、用户反馈和模型更新之间反复迭代。整场对话的重点不是“AI 能做什么”，而是“AI 功能怎么在产品里稳定交付”。

## 核心要点

### 1) 两条原则：先学习，再无感
Lorilyn 开头就给出两条原则：optimize for learning，以及 integrate AI seamlessly into the product。前者意味着尽快把功能放到真实环境里，哪怕还很粗糙；后者意味着 AI 不应该像一个单独的聊天窗口，而要变成产品动作的一部分。

她很明确地说，理想状态是用户使用 AI 功能时“甚至没意识到这是 AI feature”。对 Superhuman 来说，目标不是让用户感到“我在用 AI”，而是让用户更快完成邮件处理。

### 2) 最先切入的是最耗时的三个动作
Superhuman 把高频邮件工作拆成：写、读、搜。写邮件用 Write with AI，把短语扩写成完整邮件；Instant Reply 则处理一句话级别的快速回复。读邮件则用 auto summarize，而且是默认内置在每封邮件里，不需要用户主动点按。搜索则升级成 Ask AI，把“找关键词”变成“直接问问题”。

这种拆法很务实：优先解决“每周写 50 封邮件”“每周花半小时搜邮件”这种明显的时间黑洞，而不是先做一个泛化的邮件助手。

### 3) Always-on 功能的难点是成本、延迟和质量
与 on-demand 生成不同，摘要这类 always-on 功能会对几乎每封邮件触发处理，因此团队必须同时考虑 cost、latency 和 quality。Lorilyn 说他们不会去给垃圾邮件、marketing email 做摘要，而是对主收件箱里的大部分邮件都预先生成摘要。

这也解释了为什么 Superhuman 的摘要能做到“打开就有”，而不是“点了才算”。代价是工程上必须更谨慎地选择模型，并不断在速度和准确性之间找平衡。

### 4) Prompt engineering 本质上是快速形成规格
Lorilyn 亲自做了大量 prompt 调参：看测试集、发现错误、改 prompt、再跑一轮。她强调，很多时候是在“迭代中才知道好标准是什么”，例如摘要里要不要加链接、回复对象到底该指向谁、应该抓住对话主线还是某个局部片段。

她特别提到 few-shot examples 很关键，甚至会通过重复措辞、加重语气来影响模型行为。与此同时，QA 在这里不是边缘角色，而是会参与构建 dataset、定义 edge cases、甚至帮助做 prompt engineering。

### 5) 评测和反馈是产品系统的一部分
Superhuman 的做法不是只靠主观判断，而是逐步把“可接受/不可接受”的人工判断，转成 LLM-as-a-judge 和更明确的评测集。上线后，他们也依赖 thumbs up / thumbs down 收集反馈；但 Lorilyn 额外澄清，用户数据不会直接拿去做训练，内部测试样本才会进入 eval set。

这意味着他们不是把“反馈”当客服流程，而是当成产品改进的输入管线：反馈 → 归因 → 新的测试样本 → 下一轮迭代。

### 6) Ask AI 更像一个路由系统，而不只是聊天搜索
Ask AI 的难点不只是“搜邮件”，而是“理解问题要调用什么工具”。Lorilyn 说，他们会先用一个 prompt 对 query 分类，把请求路由到不同工具：普通搜索、创建日程、处理更专门的查询等。底层还涉及向量化邮件、embedding、metadata 和多种存储/检索方案的组合。

一个关键点是：真正有价值的检索，不只是邮件正文，还包括时间、附件名、是否已读等元数据。对 RAG / QA 系统来说，这是一个很现实的提醒：只索引正文通常远远不够。

## 对 AI 从业者的启发
- 不要先问“模型能不能做”，先问“用户最痛的时间浪费在哪里”。
- AI 产品的竞争力常常来自 workflow integration，而不是单点能力。
- 早期要接受“规格和产品目标是一起长出来的”，不要幻想一开始就能写完美 prompt。
- 评测集不是一次性资产，而是从内部测试、线上反馈和边界案例里持续长出来的。
- 做搜索/RAG 时，正文之外的 metadata 往往决定了真实可用性。
- 对 AI 功能来说，QA、设计、后端和产品的边界会比传统软件更模糊，团队结构也要随之调整。

## 值得继续追问
- Superhuman 如何把“时间节省”量化成更稳定的产品指标？
- 对 always-on 功能，哪些类型最值得默认开启，哪些应该保留用户触发？
- 用户个性化 voice/tone 依赖 few-shot examples，长期是否会遇到上下文长度和成本瓶颈？
- Ask AI 的 metadata 体系还缺哪些关键字段，尤其是 read receipt 这类协作信号？
- 当新模型持续变强时，产品层面到底哪些 prompt / eval 需要重写，哪些可以保持不动？
