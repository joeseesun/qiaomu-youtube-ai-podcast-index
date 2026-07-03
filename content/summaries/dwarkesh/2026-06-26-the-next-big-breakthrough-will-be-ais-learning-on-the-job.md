# 下一个重大突破，将是 AI 在工作中学习

- Podcast: Dwarkesh Podcast
- Episode: The next big breakthrough will be AIs learning on the job
- Source: https://www.dwarkesh.com/p/the-next-paradigm
- 获取时间: 2026-07-03T09:29:41.097Z
- 说明: 本总结基于原始网页正文，不是逐字 Transcript。

## 一句话结论
这期的核心判断是：下一阶段 AI 的关键突破，不只是更强的 pretraining 或更长的 context window，而是让模型在真实使用中“边做边学”，把部署过程中的经验高效回灌到 weights 里，形成可持续的 continual learning。

## 这期在讲什么
文章围绕一个研究押注展开：如果我们能在大量可验证、可并行、可重放的 RL environments 里训练 AI 完成数百万任务，模型就可能学到通用的规划、纠错、长程推进能力。作者认为，很多当前看似“基础性”的瓶颈，比如 data inefficiency 和 continual learning 的缺失，未必是绝对障碍，可能会像 NLP 领域一样，被更大规模的 compute 和 RL 训练逐步碾平。

但他也强调，光是“可验证”还不够，任务还得足够 grindable：能否在确定性、可复现的 simulator 里同时跑很多 rollouts。coding 之所以进展更快，部分原因就在于这类环境容易搭；而 computer use、创业、法律、政治等任务，往往既难验证，也难重放，导致训练数据稀缺、样本效率要求极高。

## 核心要点

### 1. RLVR 的野心：把“会做题”扩展成“会做事”
作者把当前 labs 的大赌注概括为 RLVR（reproducible / verifiable reward）路线：先在大量环境里训出一个能稳定解决开放式问题的 agent，再期待它把这种能力泛化到更复杂的现实工作中。理想状态下，它不仅会 coding、math，还能逐步学会在长时间跨度内推进任务、处理不确定性、修正错误。

问题在于，这种泛化是否真的足够强，目前还是开放的经验问题。

### 2. 可验证不等于可训练：grindability 才是瓶颈
作者最看重的一点是：一个任务即使能验证结果，也不代表适合大规模 RL。真正能推动进步的，还需要能在相同条件下反复试错、并行搜索、快速重置。coding 环境可以复制 repo 和 container，但真实的 web 操作、商业决策、政治博弈往往无法像游戏一样重开。

这意味着，很多“AI 应该很快学会”的领域，其实卡在训练目标无法规模化，而不是卡在模型智商本身。

### 3. 现实世界的学习必须回到 weights
作者认为，单靠 context window 不够。模型当然可以在一次会话中积累经验，但把所有经验都留在 KV cache 里，既不经济也不可持续。真正的 continual learning 需要把会话中的关键信息压缩回参数里，像人类把经历沉淀成直觉，而不是存成逐字记录。

他提到的一个方向是 OPSD（on-policy self-distillation）：让基础模型去模仿“带着长上下文、已经学会东西的 teacher model”。这样既能利用 in-context learning 的密集信息，又能把这些信息蒸馏回 weights。

### 4. 为什么 SFT 不够，RL 的稀疏更新反而有价值
作者反对把 continual learning 简单理解成“把会话 transcript 全部做 SFT”。真实工作中的学习，不是背下过程，而是提炼出少量真正有用的规律。RL 的优势就在于它只把梯度压到对结果有用的部分，更新更稀疏，不容易把原有能力冲掉。

这也解释了为什么当前 online learning 只适合少数统一目标的场景，比如 Cursor Tab 这类高频、目标一致的预测任务；而真正复杂的、因岗位而异的学习，还远远不够。

### 5. “Dreaming” 是更激进的第四条扩展轴
除了现实数据回灌，作者还提出一种更 speculative 的思路：让模型自己构建模拟世界，在内部大量“做梦”式练习。它不再只是压缩真实会话，而是用 test-time compute 生成可训练的环境，进行更便宜、更密集的反事实演练。

如果成立，这会成为继 pretraining、RL、inference-time compute 之后的第四种扩展轴。但问题也最难：Go 可以模拟，整个现实世界却很难被完整建模。

## 对 AI 从业者的启发
第一，别只盯着 benchmark 分数，真正要问的是：这个任务是否 grindable、是否能产生大量高质量 rollouts。  
第二，产品层面的竞争不只是“回答更好”，而是谁能在部署后持续学习，并把用户交互中的信号转化为模型改进。  
第三，continual learning 的工程重点可能不是单一算法，而是训练目标、蒸馏机制、上下文管理、数据回流管线的组合。  
第四，未来的模型能力差距，可能越来越取决于谁能把真实世界经验变成可训练数据，而不是谁只会做更大的 pretraining。

## 值得继续追问
1. RLVR 的泛化边界到底在哪里？从短任务到长任务、从实验环境到真实世界，哪一步最先失效？  
2. OPSD 相比 SFT 和传统 RL，在哪些任务上最有可能率先落地？  
3. 真实部署中的用户交互数据，如何在隐私、成本和训练价值之间平衡？  
4. “Dreaming” 需要怎样的 world model 才算足够有用，而不是昂贵的幻觉？  
5. 如果未来 AI 真能在使用中持续学习，模型版本管理、行为稳定性和安全对齐要怎么做？
