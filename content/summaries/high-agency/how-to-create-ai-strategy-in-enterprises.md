# 如何在企业中制定 AI 战略

- Podcast: High Agency
- Episode: How to Create AI Strategy in Enterprises
- Source: https://www.youtube.com/watch?v=qIJIoRUOIAw
- 获取时间: 2026-07-03T00:37:21.694Z

## 一句话结论
Peter Gostev 的核心观点很务实：企业做 AI 战略，不是先追最炫的功能，而是先大量试用模型、建立判断力，再用“快赢项目 + 长线探索”的组合推进落地。

## 这期在讲什么
这期主要围绕 Peter 在 NatWest 和 Moonpig 两类组织里的 AI 实战经验展开：前者是大型、强监管银行，后者是节奏更快的电商公司。对话里既谈了 OpenAI Dev Day 带来的新能力，也谈了企业里把 LLM 真正推到生产环境时会遇到的组织协调、文档适配、成本与效果评估问题。最后落到一个很清晰的主题：AI 战略不是口号，而是持续试错和组合管理。

## 核心要点

### 1. 新功能是否“有用”，往往要等真实场景验证
Peter 对 OpenAI Dev Day 的态度很典型：看到新能力时，先问“还能拿它做什么”。他提到 vision fine-tuning 可能会对 Moonpig 有帮助，因为他们有约 50,000 张 greeting cards，用视觉模型给卡片打额外 tag 以改善搜索，花费大概 £300/$500，虽然单次收益不大，但值得做。

他也强调，团队对产品形态的判断经常会错。比如之前他以为 Custom GPTs 不重要、Assistant API 会更常用，结果实际却相反：公司里大约一半员工在用 ChatGPT licenses，已经有 100+ Custom GPTs，而 Assistant API 几乎没怎么用。

### 2. 客服自动化不是“全自动”才有价值
在 Moonpig，他们做过客服相关项目，但并不是一味追求端到端自动化，而是选择更稳妥的切口：一部分流程自动化，另一部分给人工坐席做增强，比如帮助写回复、补全模板内容。Peter 明确说，之所以没有做得更激进，不是因为模型不行，而是输入文档本身不适合机器使用——这些文档是“给人写的”，模型需要更多上下文才能真正理解。

这说明企业落地 LLM 时，最大的限制常常不是模型能力，而是知识表达形式、流程设计和可维护性。

### 3. 企业里的 AI 落地瓶颈，更多是组织协同而非红 tape
在 NatWest，Peter 参与的 innovation team 从约 10 人扩到接近 100 人，说明高层支持很关键；但即使如此，拿到 OpenAI 访问权限也花了 6 个月。之后做了如 RAG 用于 HR policies 的 prototype，但从 prototype 到 production 依然非常慢，每一步都要按月推进。

他特别指出，问题不只是审批繁琐，而是缺少清晰的 deployment pattern，加上相关团队都很忙，协调成本高。这对大企业很重要：AI 项目失败往往不是 demo 不好，而是进入组织运行轨道太难。

### 4. AI 的价值不只是提速，更是打开“以前不会做的事”
Peter 说自己并不把 AI 主要理解为 productivity tool。它当然能提升效率，但更重要的是让他做出以前不会尝试的东西：比如用 Replit、LLMs 和 synthetic data，在一个晚上做出 prototype，第二天就能演示。

他还观察到，Moonpig 里 LLM 用得好的人不一定是工程师，真正关键的是 curiosity 和坚持。这对企业内部推广 AI 很重要：门槛下降后，最有价值的人往往不是最“懂技术”的人，而是最愿意试的人。

### 5. AI 战略要做项目组合，不要押单点
Peter 给 AI leader 的建议很直接：先“玩”模型，形成直觉；再做一个 portfolio of projects。这个 portfolio 里既要有能快速证明价值的 quick wins，也要有更大、更实验性的项目。

这其实是在给企业 AI 战略做风险分层：一类项目负责建立组织信心、积累内部案例；另一类项目负责探索未来能力边界。只押一种，很容易不是没声量，就是没方向。

### 6. 值得关注的是 OR1 和 test-time compute
最后他提到 underappreciated 的方向是 OR1 models，核心吸引力在于：可以通过投入更多 compute，在推理时换取更好的答案。Peter 认为行业过去习惯于“喂模型固定格式提示词”，但 OR1 代表可以给它更多上下文和更高层级的 reasoning，未来可能支持更复杂、更 nuanced 的任务。

这不是立刻能变现的功能点，但它提示了一个方向：AI 的进步不只在训练端，也在推理端的算力分配方式。

## 对 AI 从业者的启发
1. 不要只评估“能不能自动化”，也要评估“能不能增强人类工作流”。
2. 企业落地的关键资产不是模型，而是可部署模式、文档结构和跨团队协作方式。
3. 先做小项目建立组织信任，再做中长期探索，否则很容易卡在 POC。
4. 让非工程师参与 LLM 实践，往往能释放更大规模的使用价值。
5. 看到新模型/新 API，先问“在我当前流程里多一个什么能力”，而不是先下结论。

## 值得继续追问
1. 在大型企业里，什么样的 deployment pattern 最适合 LLM 从 prototype 走向 production？
2. 如何把“给人看的文档”改造成“给模型和人都能用”的知识结构？
3. Moonpig 这类业务里，哪些 AI 项目更可能从 cost saving 走向 revenue impact？
4. OR1 / test-time compute 在企业场景里，最先会在哪些高复杂度任务上体现价值？
