# AI 核心的数据黑洞

- Podcast: Dwarkesh Podcast
- Episode: The data black hole at the center of AI
- Source: https://www.dwarkesh.com/p/the-sample-efficiency-black-hole
- 获取时间: 2026-07-03T02:10:47.312Z

## 一句话结论
这期核心观点很直接：AI 进步的瓶颈，越来越像不是算力本身，而是“把足够多、足够对口的高质量数据找出来并做成训练信号”的能力；而今天的模型依然远谈不上人类级 sample efficiency。

## 这期在讲什么
Dwarkesh 认为，过去几年 AI 变强，主因不是训练算法突然让模型更“省样本”，而是数据分布被显著扩宽、数据质量被显著抬高，尤其是 RL 把计算堆到 verifier/rubric 上，做出“合成数据”，再训练模型预测这些正确 rollout。换句话说，行业进步很大程度上是“更多更好的数据 + 更多计算去生成这些数据”。

他进一步把这个问题概括成“data black hole”：表面上看模型能力很炫，但能力背后吸进去的是极其庞大的、任务定制化的专家轨迹、标注、rubric 和环境。对想做 white-collar automation 和 AI research automation 的 labs 来说，数据是中心约束。

## 核心要点

### 1）RL 更像“合成数据工厂”，不是单纯的优化技巧
他说 RL 的关键作用，是在 verifier 约束下用大量算力筛出“好轨迹”，再让模型学习这些正确 rollout。要让这套机制生效，模型本来就得对正确解有一定先验概率，所以还需要大量 human expert trajectories 打底。

这意味着，真正稀缺的不是“有个 reward”，而是能把某个具体技能拆成可训练样本的专家数据。行业里 Mercor、Surge 上那些 Word specialist、法律、咨询类任务，正好说明数据的粒度已经细到非常岗位化、流程化。

### 2）模型像 Frankenstein，不像通用人脑
文中反复强调：今天的模型不是像人那样从经验里长出通用能力，更像由“亿级精心缝合的例子”拼出来的 Frankenstein’s monster。GRPO 这类方法还要对每个任务生成 hundreds to thousands of rollouts，本质上是在靠大规模试错解决 credit assignment。

这也解释了为什么 open models 能在几个月内追上 frontier：如果进步主要来自 hyperparameters、训练技巧和架构秘密，追赶不会这么快；而数据更容易从 public APIs 蒸馏、复制和再利用。

### 3）人类和模型的 sample efficiency 仍差几个数量级
作者给了几个对比：人类从出生到成年大约接触 2 亿 tokens 左右，而 frontier models 训练数据是 tens to hundreds of trillions tokens，差距接近百万倍。驾驶、机器人 teleoperation 这些例子也用来说明：人类用很少示范就能学会，模型却要大量 labeled data 和 RL trials。

他还回应了两个常见反驳：一是“人类有 evolution 预训练”，二是“算上多模态感知后，人类其实也看了很多数据”。他的结论是，这些解释都不足以抹平数量级差距；尤其是语言和任务迁移层面的学习，模型仍然远不够省样本。

### 4）更大的模型也补不回这条差距
他引用 Chinchilla scaling law 的直觉：在参数和数据的权衡里，即便把参数推得再大，能换来的样本效率提升也很有限，远不足以解释人类和模型之间的巨大鸿沟。换言之，单靠 scale parameters 不会自然把模型推到人类级学习效率。

所以，“再多堆几个数量级参数”不是解法，除非同时改变数据生成、筛选和训练信号的组织方式。

### 5）对白领自动化来说，低样本效率未必立刻致命
虽然模型不够省样本，但这不一定阻止白领工作自动化。理由是：很多 white-collar tasks 是 common tasks，可以被纳入训练分布；而且训练成本可以被亿万次推理会话摊薄。即便训练得很不经济，只要部署后复用广泛，商业上仍可能成立。

但他也承认，像 software engineering 这类经常面对 out-of-distribution 问题的岗位，是否能被完全自动化仍存疑。他甚至押注：2027 或 2028 年，对人类软件工程师的总需求可能比现在更高，因为 AI 会先成为互补工具，而不是立即替代。

### 6）真正难的是自动化 AI research
labs 的长线赌注是：先自动化 AI research，再让自动化研究者去解决 sample efficiency 问题。但这就引出一个更难的问题：如果现有 AI 本身并不具备人类级 sample efficiency，它们还能不能在资源约束下，继续推进到更像人类的学习与研究能力？

Dwarkesh 说，这决定了所谓 intelligence explosion 的形态不会是“突然出现神”，而更像一段由 LLM 驱动、但又受其结构限制的加速期。

## 对 AI 从业者的启发
第一，别把“数据”当成前置清洗步骤，应该当成核心优化对象。未来的竞争点可能是生成、筛选、加权、复用高质量数据的系统能力，而不只是更大的训练集。  
第二，RL/SFT 的边界在扩大，但真正稀缺的是能把复杂岗位拆成可验证任务的专家工作流。  
第三，如果你做的是 enterprise AI 或 vertical AI，最关键的问题往往不是“模型会不会”，而是“如何持续把真实工作流转成可训练、可复用的分布内数据”。

## 值得继续追问
- 如果 data 是瓶颈，下一代基础设施应如何围绕“数据生产线”而不是“训练集仓库”设计？
- GRPO、RL、SFT 各自适合解决哪一类技能的样本效率问题？
- 在不断变化的工作流里，AI 如何做到 continual learning，而不是一次性拟合？
- open models 追近 frontier 的速度，究竟有多少来自数据可蒸馏，多少来自架构/算法改进？
- 对软件工程、法务、分析等岗位，哪些任务是真正可训练的 common tasks，哪些永远会留在 out-of-distribution 区域？
