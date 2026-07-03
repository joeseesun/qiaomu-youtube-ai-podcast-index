# 用 Coinbase 前 CPO 打造 AI 员工

- Podcast: High Agency
- Episode: Building AI Employees with Coinbase's Ex-CPO
- Source: https://www.youtube.com/watch?v=5RjeUL95OsE
- 获取时间: 2026-07-03T00:37:42.209Z

## 一句话结论
Surojit Chatterjee 把 Ema 定义成“Universal AI Employee”，核心不是做一个更聪明的 chatbot，而是用 agentic architecture 把企业里那些跨系统、跨流程、重复且脏乱的工作自动化，并且用“像雇佣员工一样”的方式来部署、训练和评估它。

## 这期在讲什么
这期主要讲 Ema 的产品理念、技术架构和企业落地方式。Surojit 解释了为什么他从 Coinbase CPO 回到创业：他长期不满于优秀人才把大量时间耗在 KTLO（keeping the lights on）和重复性事务上，希望用 AI 释放员工时间去做更高价值的工作。

节目重点围绕三件事展开：Ema 怎么通过多 agent 协同完成复杂 workflow；它如何接入企业数据和系统并控制权限；以及在 enterprise 场景里，AI employee 如何被评价、被训练、被逐步放大使用范围。

## 核心要点

### 1. Ema 不是“聊天工具”，而是执行 workflow 的 agent mesh
Surojit 的定义很明确：Ema 由一组 agents 组成，背后有一个小模型把用户问题翻译成 workflow，再自动调度多个 agents，并生成 orchestration code。它模拟的是 human role，而不是单轮问答。

它覆盖的不是单一垂直场景，而是 customer center automation、sales & marketing、legal、HR 等多个角色。关键能力在于“协作”和“执行”，比如读 SOP、查数据库、写回系统，而不是只生成答案。

### 2. 企业落地的第一难点，是数据接入和权限边界
Ema 预集成了大量 SaaS、数据库、云存储与企业应用，用户通常只需两三步授权即可接入。Surojit 强调可以限定访问范围，不必把全部数据都给出去，这对 enterprise adoption 很重要。

安全上，他们同时支持 multi-tenant SaaS、single-tenant SaaS，以及部署到客户自己的 cloud instance；对大客户还能利用其已经建立好的 private endpoint 去连 OpenAI、Gemini 等模型服务。整体思路是尽量让“数据可控、路径可审计”。

### 3. 当前最有价值的场景，是“复杂工单”和“多步业务流程”
他们最重视的是 L2/L3 ticket resolution：不是简单 FAQ，而是需要查多源信息、修改状态、在多个系统之间执行动作的复杂问题。Ema 连接 Zendesk、FreshDesk、ServiceNow 等 ticketing 系统后，可以先内部验证，也可以直接对外回复。

除了客服，Surojit 还提到 sales proposal 生成、lead generation、business intelligence、HR 事务、contract compliance、prior authorization 等。共同点是：任务复杂、数据分散、需要判断并跨系统动作。

### 4. AI 产品的本质难题，不只是模型，而是产品化与评估
他强调，做 AI 产品比想象中更“产品驱动”：同一个 AI employee 会因不同客户反馈而表现差异巨大，像真实员工一样需要 onboarding、instruction、持续反馈。LLM 是 stochastic 的，hallucination 不可能完全消失。

Ema 的评估方式是“嵌入式 Turing test”：展示 AI 的工作和人类工作并排给客户打分。初始测试集来自历史工单等人类已完成的工作，再由内部专家评判质量。这种做法把 evaluation 变成了上线过程的一部分。

### 5. 降低 hallucination 的方法，是融合多模型而非押注单一模型
Ema Fusion 是一个 mixture of experts 风格的系统，会整合多个 public LLM 和自研小模型，交叉参考多个模型对同一问题的回答，再在离线阶段学习如何在实时推理时选择与组合模型。

Surojit 的判断是：底层模型会越来越强，真正难的是 enterprise last mile——把 heterogenous data、多个系统、权限、安全和业务动作串起来。Ema 不和 foundation model 直接竞争，而是把它们当作可替换的能力层。

### 6. SaaS 的 seat-based 时代正在被挑战
他认为未来 5 年里，SaaS 的商业模式会明显变化。原因是企业里有大量软件“没在真正工作”，而 agentic software 更适合按 outcome 或 task 来定价，而不是按 seat 收费。

但他并不认为人会消失。更可能发生的是：人类员工管理更多 AI colleagues，自己从重复工作中解放出来，去做更创造性、更高杠杆的事情。

## 对 AI 从业者的启发
第一，企业 AI 的关键不只是“模型更强”，而是“能不能安全接入真实业务系统，并稳定完成动作”。如果不能写回系统、不能跨应用协作，很多价值都停留在演示层。

第二，AI 产品的成功路径很像招聘与培养员工：先定义角色，再做 onboarding，再通过 feedback 和 evaluation 逐步提高能力。对于做 enterprise AI 的团队，evaluation 不是附属功能，而是产品本身。

第三，不要只盯着 model layer。Surojit 的路径是用多模型融合和 agent orchestration 去吃下最后一公里，这也提示创业者：在模型快速 commoditize 的环境里，真正的护城河可能在 workflow、数据连接、安全边界和 ROI 交付。

## 值得继续追问
- Ema 在真实客户中，L2/L3 ticket resolution 的准确率、节省工时和 ROI 到底是多少？
- 多模型融合的 routing 逻辑如何设计，哪些任务适合交给哪个模型？
- 当 AI employee 逐步扩大权限时，如何定义可审计、可回滚、可责任归属的执行链路？
- outcome-based pricing 在 enterprise 中如何规模化，如何避免和客户现有采购体系冲突？
- 如果未来模型能力继续提升，Ema 的核心壁垒会更多来自数据层、评估层，还是 workflow orchestration 层？
