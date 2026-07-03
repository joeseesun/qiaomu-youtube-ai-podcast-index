# 为 AI Agents 构建搜索：访 Exa CEO Will Bryk

- Podcast: AI + a16z
- Episode: Building Search for AI Agents with Exa CEO Will Bryk
- Source: https://ai-a16z.simplecast.com/episodes/building-search-for-ai-agents-with-exa-ceo-will-bryk-O7xRJK9R
- 获取时间: 2026-07-03T08:16:47.757Z

## 一句话结论
这期的核心判断是：当“搜索”的使用者从人变成 AI agent 后，搜索不再只是“找网页”，而会变成 agent 工作流里的基础检索层，甚至是整个 agent economy 的底层能力。

## 这期在讲什么
Sarah Wang 和 Exa 的联合创始人兼 CEO Will Bryk 讨论了 AI 时代搜索基础设施该怎么重做。重点不是传统搜索引擎如何更快，而是：传统搜索产品本来就是围绕“人类输入关键词、浏览结果页面”设计的，并不适合 autonomous system 这种会持续调用、筛选、组合信息的 agent。

对 Exa 来说，搜索的对象、接口和评价标准都变了：不只是“相关性”，还包括能否被 agent 稳定调用、能否支持 retrieval、能否嵌入 coding agents 和其他自动化流程。Bryk 也把视角拉大到 AI-native 产品和信息发现的未来：很多技术问题，最终都可以抽象成 search problem。

## 核心要点

### 1）传统 search engine 的设计目标，不是 agent
这期反复强调一个前提：Google 式搜索是为“人类阅读”服务的。结果页、点击率、摘要、排序，都是围绕人类注意力优化的；但 agent 需要的是可机器消费的结构化入口、稳定的调用路径，以及可直接进入下一步行动的信息。

因此，AI 时代的 search 不只是把网页“找出来”，而是要把信息变成 agent 可用的上下文。对于 autonomous system 来说，搜索结果不是终点，而是工作流中的中间层。

### 2）retrieval 会成为 agent workflow 的关键环节
当模型要执行任务时，先检索再生成几乎是标配。Will Bryk 讨论的重点之一，就是 search infra 如何服务 retrieval：不是泛泛地返回一堆链接，而是帮助 agent 更快、更准确地定位可用信息，并在多轮调用中保持一致性。

这意味着 search 的价值从“流量分发”转向“任务完成”。谁能更好地提供 retrieval，谁就更接近 agent 的执行入口，也更可能成为后续工具链的默认层。

### 3）coding agents 把 search 的要求拉得更高
在 coding agent 场景里，搜索不只是查资料，而是要找代码、文档、API、依赖关系和上下游上下文。这里对 search 的要求更高：召回不能只靠表面关键词，排序也不能只看网页热度，而要贴近开发任务本身。

这类场景说明，AI-native search 不是“搜索页面的改良版”，而是要理解任务语义与使用场景。对于 coding agents 而言，search 如果不能服务于具体执行步骤，就很难进入主流程。

### 4）search 可能是 agent economy 的底层基础设施
Bryk 的一个重要判断是：当 agent 越来越多地承担发现、筛选、调用和执行信息的工作，search 会从一个应用功能变成基础设施。它像是 agent economy 的“信息入口层”，决定 agent 能看见什么、信什么、以及接下来能做什么。

这也解释了为什么 search 问题会在 AI 时代重新变得核心。很多看似复杂的产品问题，拆开后其实都是“如何更好地找到正确的信息并用于行动”。

### 5）AI-native 产品会重写信息发现的方式
这期并没有把重点放在“更好的搜索框”，而是放在“更好的信息发现机制”。AI-native 产品的差异，在于它们默认用户不是在浏览信息，而是在完成任务；因此信息发现也要服务于行动，而不是服务于阅读。

这会改变产品设计：入口、交互、返回结果、后续调用方式都要围绕 agent 的连续动作来组织，而不是围绕一次性的查询来组织。

## 对 AI 从业者的启发
第一，做 AI 产品时要重新定义“搜索”。如果你的系统里有 retrieval、工具调用、知识访问、代码上下文，这些都不是附属能力，而是主流程的一部分。

第二，评估 search 不能只看传统指标。对于 agent，关键不是“点了多少”，而是“检索后任务有没有完成、有没有减少失败、有没有提升下一步动作质量”。

第三，凡是面向 autonomous system 的产品，都要考虑机器消费友好性：接口是否稳定、结果是否可复用、信息是否能直接进入上下文。人类可读不等于 agent 可用。

## 值得继续追问
1. Exa 认为 AI search 最核心的技术壁垒是什么：索引、召回、排序，还是面向 agent 的接口设计？
2. 当 agent 成为主要用户后，search 的商业模式会更接近基础设施、API，还是新的分发网络？
3. coding agents、research agents、shopping agents 对 search 的要求分别有什么根本差异？
4. 如果 search 变成 agent economy 的底层层，那谁会控制“信息入口”的分配权？
