# 最酷的扩散研究并不在 LLMs 里——Evan Feinberg 与 Sergey Edunov，Genesis Molecular AI

- Podcast: Latent Space: The AI Engineer Podcast
- Episode: 🔬 The Coolest Diffusion Research Isn't in LLMs — Evan Feinberg & Sergey Edunov, Genesis Molecular AI
- Source: https://www.latent.space/p/the-coolest-diffusion-research-isnt
- 获取时间: 2026-07-03T00:27:42.378Z

## 一句话结论

这期的核心信息是：小分子药物发现正在从“能生成候选分子”走向“能高精度预测并驱动 agentic 迭代”，而 Genesis Molecular AI 的 PEARL 把 3D 结构预测和 diffusion 真正推进到了可用于现实药物设计的阈值。

## 这期在讲什么

这是一场围绕 small molecule drug discovery 的技术讨论，重点不在药理学科普，而在 AI 模型为什么过去没能真正改变药物发现、以及现在为什么开始有希望了。嘉宾 Evan Feinberg 和 Sergey Edunov 主要讨论了结构预测、protein-ligand binding、co-folding、ADMET、多目标优化，以及他们的旗舰模型 PEARL 和内部 agentic 系统 SAPPHIRE。

节目里最重要的判断是：LLM 时代的很多模型创新停留在同一类架构上的增量优化，但 3D 结构预测领域因为引入了 diffusion 这种新 primitive，出现了真正“概念上新”的方法。Genesis 认为，模型精度已经提升到可以支撑化学家式的循环工作流，结合实验室合作，开始接近 24/7 自动化 drug discovery。

## 核心要点

### 1）小分子药物发现不是“找一个分子”，而是多目标高难优化
Sergey 用了一个很直白的数量级说明：drug-like small molecules 大约有 10^60 个，根本不可能穷举。问题不只是找得到 binder，还要同时满足 ADMET 等一长串约束；而这些目标彼此常常冲突。比如强 binder 往往更“greasy”，但 greasy 又可能意味着 insoluble，进不了血液循环。

这意味着药物发现不是单一分类或生成任务，而是一个极端的 multi-parameter optimization 问题。模型如果只会“看起来像药”，但不能把 binding、可溶性、毒性、代谢等一起顾到，就离真实应用很远。

### 2）真正的突破点来自 3D 结构预测里的 diffusion
Evan 的观点很明确：LLM 领域长期缺少结构性的创新，而 3D 结构预测这几年反而成了 AI 算法创新的高地。Genesis 认为，diffusion 让过去难以处理的 3D 结构生成和精细调整成为可能，这也是 PEARL 能工作的关键基础。

PEARL 的一个重要能力，是不仅预测 ligand 该放在哪里，还能对 protein 做小幅调整，让两者更好地 fit。这对应真实生物体系中的 flexibility，而不是把蛋白当静态背景。节目强调，这个层面的进展并不是“生成得像”，而是开始接近“预测得对”。

### 3）传统 benchmark 太宽松，2Å RMSD 可能在奖励“slop”
Evan 对社区常用的 co-folding benchmark 很不客气：2Å RMSD 被当成“good pose”的标准，但在他看来这太松了，甚至会把错误的姿态包装成可接受结果。比如 aromatic ring 翻转、关键 hydrogen bond 偏掉一点点，在 2Å 门槛下都可能被掩盖。

他主张更接近 1Å RMSD 才能说明模型真的把分子的核心位置和相互作用放对了。这个判断的意义在于：如果 benchmark 本身不够严格，模型就会朝着“看上去过关”的方向优化，而不是朝着真正能指导 medicinal chemistry 的方向优化。

### 4）PEARL 在 OpenBind 上展示了“无需微调”的真实能力
节目里最有说服力的部分，是 PEARL 在新发布的 OpenBind benchmark 上的表现。这个 benchmark 包含 802 个此前未见过的 co-complexes，目标蛋白 EV-A71 还带有典型的 induced fit 难题：ligand 进入后，蛋白结构会重新调整，把进入路径“关上”。

PEARL 不靠长时间 MD simulation，就能把这种 induced fit 和 loop movement 预测出来，而且在多个指标上明显领先公开模型。更关键的是，这不是在目标蛋白或同源蛋白上做过 fine-tuning 的结果，说明模型有一定的 zero-shot 泛化能力。这是从“论文上可用”到“工程上可信”的一个强信号。

### 5）agentic drug discovery 正在从概念变成工作流
Genesis 认为他们已经跨过了一个阈值：模型足够准确后，agent 不再像早期 LLM agent 那样因为小错误不断累积而失控。SAPPHIRE 的设想是让系统像化学家一样迭代：看 pose、推理、查文献、调用内部工具、生成下一轮候选分子，再结合自动化实验室合作持续循环。

这里的关键不是“让模型自己发明药”，而是把模型嵌进一个高频反馈闭环：模型负责高质量提案，实验负责验证，系统再根据结果更新下一轮搜索。AI 的角色从“助手”变成了“持续运转的研发流程节点”。

## 对 AI 从业者的启发

第一，很多领域真正需要的不是更大的通用模型，而是新的表示方式和问题定义。Genesis 的故事说明，当任务本身具有明确物理结构时，diffusion、3D prediction、protein flexibility 这类原生建模方式可能比单纯堆参数更关键。

第二，benchmark 不是中立的。2Å RMSD 这种阈值如果过松，会把模型优化方向带偏。对做垂直领域 AI 的团队来说，定义什么叫“可用”，往往比训练技巧更重要。

第三，agent 是否能工作，取决于底座模型是否足够稳。药物发现这种高风险场景里，早期 agent 失败不是因为“工具链不够多”，而是因为单步准确率还不够高。模型一旦跨过阈值，才可能进入真正的闭环自动化。

## 值得继续追问

1. PEARL 相比公开 co-folding 模型，最关键的架构改动是什么？
2. 1Å RMSD 在真实 medicinal chemistry 里是否足够，还是还需要更细的 interaction-level 指标？
3. SAPPHIRE 的 agentic workflow 里，哪些步骤适合自动化，哪些必须保留人类化学家审核？
4. OpenBind 这类 benchmark 是否能持续代表“真实世界难题”，还是很快会被过拟合？
5. 如果 closed-source 公司都在做类似进展，未来该如何建立可比、可复现的评测标准？
