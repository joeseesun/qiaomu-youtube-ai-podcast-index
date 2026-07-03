# “输出榨干学”教授——Anjney Midha，AMP

- Podcast: Latent Space: The AI Engineer Podcast
- Episode: The Professor of Outputmaxxing — Anjney Midha, AMP
- Source: https://www.latent.space/p/anj
- 获取时间: 2026-07-03T00:28:44.353Z

## 一句话结论

这期的核心不是“怎么再买更多 GPU”，而是把 AI scaling 重新定义为一个系统工程问题：提升利用率、减少浪费、重建算力市场与组织激励，才是 frontier AI 时代更关键的瓶颈。

## 这期在讲什么

Anjney Midha 把 AMP 讲成一个“compute grid”，目标是让 FLOPs 像 megawatts 一样流动：跨 cloud、跨 silicon、跨实验室做 pooling 和 utilization，而不是把算力死锁在单一 full-stack lab 里。他反复强调，算力紧缺是真问题，但“买更多”不等于“用得更好”。

节目后半段，话题从基础设施延伸到研究组织、chip co-design、DeepMind 研究外溢、以及他长期关注的 end-of-life prediction。整期的主线是：当 AI 进入高资本密度阶段，alignment、标准、trust boundary、社区许可，都会直接影响产出。

## 核心要点

### 1. MFU 和 node utilization 暴露的不是算力短缺，而是系统浪费
Anjney 说，Google 里 node utilization 低于 95% 都可能被视为 outage，而 best-in-class 的 MFU 今天应在 60–70% 左右。相比之下，xAI 被提到的 sub-10% MFU 只是说明：frontier labs 的问题常常不是“没有卡”，而是调度、并行、网络、kernel、框架和数据管线把理论 FLOPs 变成现实训练进度的效率太低。

他认为这种浪费会在 scale 下快速复利，因此更应采用 iterative bring-ups，而不是一口气堆规模。

### 2. AMP 想做的是“独立系统运营商”，不是又一家 cloud
AMP 的定位不是 full-stack integration，而是横向 pooling layer：像电网一样协调供给和需求，做一个独立 system operator。它希望把多家 partner 的供给聚合起来，再把研究实验室、大学和其他需求方聚合起来，让 base load 和 spike capacity 可调度。

这也解释了他为什么强调“FLOPs flow like megawatts”——在他看来，compute 市场缺少一个中立协调层，导致 stranded compute 无法被重新分配。

### 3. 社区接受度和“responsible infrastructure”不是 PR，而是扩张前提
Anjney 明确说，AI 数据中心不是可以“move fast and break things”的地方。社区反弹、permit、power grid、环境争议，会直接让数据中心项目面临风险。他甚至提出一种补偿思路：如果新数据中心落地，就把每小时 compute 费率多收的 50 美分直接返给当地社区，甚至降低居民电费，让社区成为“partner”。

这部分的重点不是某个具体方案，而是把 data center backlash 视为真实的 scaling 约束。

### 4. 组织结构的关键是对齐，但 abstraction 会带来 loss
他把很多问题都归结到 alignment：资本、运营、测量结果之间隔了太多层，误差会像“radian metaphor”那样在 scale 中放大。AMP 虽然是 holdings 结构，但内部同时有 infrastructure business 和 Foundry，用来孵化或投资 frontier labs，类似 Alphabet 的组织分层逻辑。

同时他指出，接口、API、抽象层都会带来 loss。想要既规模化又不丢对齐，要么靠更好的 standards，要么靠新的能力（比如 room temperature superconductor）把损耗问题绕过去。

### 5. DeepMind 的研究外溢问题，本质上是 market failure
他批评 frontier labs 内部研究被 hoarding：很多高质量研究要么不公开，要么因为业务优先级变化而长期搁置，形成负外部性。AMP 投资 Anthropic、Mistral、Black Forest Labs 等，也是在尝试把这些被锁住的进展重新释放到生态里。

这不是“谁更强”的叙事，而是“哪些进展被组织边界卡住了”的叙事。

### 6. 他眼中的“output maxing”是 frontier systems 的新纪律
Anjney 最后把这门学问概括成“output maxing”：用已有资源尽可能输出最大价值。Anthropic 之所以能快，部分原因是押注了 Transformer 并持续深耕；MatX 之所以聪明，是在 chip 设计上借用 NVIDIA reference architecture，减少无谓的系统摩擦。

他把优秀研究者视为“mind 的 star athletes”，认为真正能当好 CEO 的人，必须既能在科学上做到 top-tier，也能在组织、客户、招聘上持续 confrontational。

## 对 AI 从业者的启发

1. 未来几年，训练效率、调度效率和基础设施可靠性，可能比“再融到多少钱”更决定模型进展。
2. 如果你做 model、chip 或 infra，trust boundary 是核心资产：没有足够早的架构信息，就很难做 co-design。
3. 数据中心、算力市场、实验室组织，都会越来越像“公共基础设施问题”，而不只是创业公司的内部工程问题。
4. 对齐不是口号，而是从资本到部署到测量的全链路问题；只要链条拉长，loss 就会出现。
5. 研究者未必只是“研究者”，很多时候他们本来就已经是能带队、能创业的高绩效执行者。

## 值得继续追问

1. AMP 的“independent system operator”模式，如何在商业上避免沦为另一个中心化平台？
2. 1.2GW base load、6GW spike capacity 这种目标，现实中要靠什么机制兑现？
3. 真正提升 MFU 的关键瓶颈，究竟更多在软件栈、网络，还是组织治理？
4. 研究 hoarding 的负外部性，能否通过开源、市场机制或监管被系统性缓解？
5. “output maxing” 是否会成为未来 AI infra 和 lab 组织的共同方法论？
