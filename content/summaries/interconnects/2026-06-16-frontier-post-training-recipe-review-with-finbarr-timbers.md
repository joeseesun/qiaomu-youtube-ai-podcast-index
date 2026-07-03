# 与 Finbarr Timbers 一起回顾前沿后训练配方

- Podcast: Interconnects
- Episode: Frontier post-training recipe review with Finbarr Timbers
- Source: https://www.interconnects.ai/p/frontier-post-training-recipe-review
- 获取时间: 2026-07-03T04:59:30.008Z

## 一句话结论
这期的核心判断是：post-training 的主流 recipe 已经从“单一 SFT→RM→RL”演化到“多专家、按能力分工、再用 on-policy distillation 合并”的工业化流程；真正站在 frontier 的，不再只是把 RL 做大，而是把训练组织、数据流和专家协同一起做大。

## 这期在讲什么
Nathan Lambert 和 Finbarr Timbers 主要回顾了从 InstructGPT 到 2026 frontier models 的 post-training 变化，并用 OLMo / Tülu 3 这类开放模型对照 DeepSeek、MiMo Flash、Nemotron、GLM、MAI-Thinking、Kimi K2.5 等路线。讨论重点不是“谁分数高”，而是“recipe 形状为什么变了”：SFT、DPO、RLVR、reasoning RL、domain specialists、multi-teacher on-policy distillation 如何接力出现，以及它们背后的组织复杂度如何上升。

## 核心要点

### 1) 早期范式：InstructGPT 的三段式已经不够了
InstructGPT 的经典路径是 SFT → reward model → PPO，这套结构在 2022 年奠定了 post-training 的基本想象。之后的 Llama 2、Llama 3 仍延续“先对齐、再强化”的精神，但流程更长、更依赖迭代和数据工程。

两人都强调：这套 recipe 曾经很强，但现在已经不是 frontier 的主流模板了。它更多代表“可控、可解释、适合小团队”的训练方式，而不是今天大厂在 reasoning 和 agentic 模型上追求的上限。

### 2) DPO 不是消失了，而是被更强的流程挤到边缘
在开放路线里，Tülu 3、OLMo 3 还会用 SFT → DPO → RLVR 这种简洁组合；但在 frontier 叙事里，DPO 明显退场。Finbarr 的看法是：当上游数据、teacher 和 RL 流程更“工业化”后，DPO 的增益更难显现；反过来，在还处于 bootstrap 阶段的项目里，它依然有很高的性价比。

这里还有一个隐含点：DPO 的价值可能被“低估”了。它在一些场景下依旧能帮模型修正分布、清理粗糙边缘，只是 frontier labs 不一定把它作为核心卖点公开出来。

### 3) DeepSeek R1 把 RL 推到了 recipe 中心
这期把 DeepSeek R1 视为一个真正的拐点：R1-Zero、cold-start SFT、reasoning RL、rejection-sampling SFT、final RL、再 distill 到 dense 模型，意味着大规模 RLVR 不再是配角，而是生成 reasoning 能力的主驱动。

更重要的是，DeepSeek 后续从 V3 到 V3.1、V3.2、V4 的演化，展示了 frontier 训练的“工业化分叉”：既要兼顾 think / non-think，又要把 reasoning、code、agentic 等能力拆成专家，再合并回一个通用模型。

### 4) 2026 的新主线是 MOPD：多教师 on-policy distillation
MiMo Flash V2 给出了新术语 Multi-teacher On-Policy Distillation（MOPD）：先训练多个 domain specialists，再让 general student 在自己采样的轨迹上，按 token 级 reverse-KL 去贴近对应 teacher。DeepSeek V4、Nemotron 3 Ultra 都在把这条路规模化。

这意味着 frontier 不再是“单个大 RL run 把所有能力揉进来”，而是“先分治、再合并”。原因也很现实：math、code、agentic RL 放在一个 run 里会互相打架，而专家化训练更容易并行组织。

### 5) 难点不只在算法，而在 teacher/student 的分布对齐
Nemotron 3 Ultra 的一个关键发现是：如果 teacher 和 student 来自差异过大的训练流水线，on-policy distillation 会明显失效。问题不是“有没有 teacher”，而是“student 采样出来的轨迹，teacher 是否还能稳定监督”。

这说明 MOPD 的瓶颈已经从“会不会做”转向“怎么协同做”。Finbarr 甚至提到，可能需要分阶段拿中间 checkpoint 逐步对齐，而不是拿最终收敛 teacher 直接 merge。

### 6) 组织能力正在成为 recipe 的一部分
Nathan 反复强调，post-training 现在本质上是在“wrangle compute, data, and org chart”。OLMo 3 的相对简单，不只是技术选择，也是组织约束；而 frontier labs 的复杂 recipe，则体现了更强的团队分工、数据生产和迭代能力。

换句话说，今天的差距不只是模型参数或算力，而是能否把训练过程拆成可并行的专家工厂，再把这些工厂稳定连接起来。

## 对 AI 从业者的启发
1. 如果你做开放模型，先别迷信“最前沿 recipe”，而要先问：你的组织能不能稳定运行这套流程。  
2. DPO、RLVR、RLHF 不是互斥选项，而是不同成熟度下的工具箱。  
3. frontier 的关键能力正在从“单次训练技巧”转向“多轮专家协同 + on-policy 合并”。  
4. 未来的 post-training 研发，很可能要把“训练设计”与“组织设计”一起建模。

## 值得继续追问
1. MOPD 相比“teacher trace distillation SFT”到底带来多少净增益？  
2. teacher 必须多相似才可以有效 distill？中间 checkpoint 的最优粒度是什么？  
3. 在 agentic / tool-use 模型里，DPO 还有没有稳定价值？  
4. 如果所有 frontier 模型都走向专家化，最终的“通用模型”会不会只是一个路由器加若干专家的集合？
