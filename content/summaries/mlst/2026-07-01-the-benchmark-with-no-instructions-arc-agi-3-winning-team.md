# 没有说明的基准测试——ARC-AGI-3 夺冠团队

- Podcast: Machine Learning Street Talk
- Episode: The Benchmark With No Instructions — ARC-AGI-3 (winning team!)
- Source: https://podcasters.spotify.com/pod/show/machinelearningstreettalk/episodes/The-Benchmark-With-No-Instructions--ARC-AGI-3-winning-team-e3lh6i9
- 获取时间: 2026-07-03T00:32:46.839Z

## 一句话结论
这期把 ARC-AGI-3 讲成一个“没有说明书的任务发现” benchmark：真正考的不是静态识别能力，而是模型能否在交互中发现目标、保持动作效率、避免锁死在错误目标上。

## 这期在讲什么
Tim Scarfe 在 Zurich 采访了 Tufa Labs 的 ARC-AGI-3 赢分团队，重点拆解他们的 leaderboard system 以及这个 benchmark 到底在测什么。节目从 Locksmith 游戏切入：模型只能看原始 frame，必须自己读出规则、推断目标，而不是把一个静态 grid 翻译成答案。讨论逐步扩展到 induction vs transduction、LLM 的 priors 如何在“看懂迷宫”时泄露出来、以及为什么很多系统在 ARC 里表现像“会做题”，其实只是被特定 harness 推着走。

## 核心要点

### 1. ARC-AGI-3 的关键变化：从“识别”变成“发现目标”
ARC-AGI-3 把 ARC 做成 interactive 和 agentic，模型不再面对完整题面，而是要在环境里探索、试错、理解规则。这个设计让人类仍然相对容易，但对 LLM 会明显变难，因为它要求的是目标发现，而不是模式映射。

### 2. StochasticGoose 的胜利与失效
Dries 回顾了自己在 preview 阶段的 StochasticGoose：核心策略是 brute force，但只搜索“会改变画面”的动作，借此压缩搜索空间。这个方法在 preview 里有效，但当组织方加入 action-efficiency scoring 和 unseen games 后就崩了，说明 benchmark 一旦从单纯“能不能解”转向“用多少步解、对新游戏是否泛化”，投机式搜索很快失去优势。

### 3. induction、transduction 与“priors 泄露”
对话中一个反复出现的主题是：模型的答案里到底有多少是真正从环境中归纳出的结构，有多少只是先验在熟悉模式被触发后回流出来。Tim 的看法偏尖锐：LLM 很多时候不是“理解了”，而是用碎片化、纠缠的表征把性能做出来，表现接近 competence，但底层未必真的稳定。

### 4. 这类 benchmark 更像在测 action efficiency
团队和 Tim 都多次强调，ARC-AGI-3 不只是测“解出多少题”，而是在测“用多少交互成本解题”。一旦 agent 锁定了错误目标，就容易进入 wrong-goal loop，越做越偏，最后回不来。这使得 benchmark 更接近对搜索策略、目标保持和纠错能力的综合测试。

### 5. 小实验室对抗巨头：bitter lesson 与自建 harness
Crouzier 的立场很明确：Tufa Labs 之所以做独立研究实验室，是为了在巨头之外保留研究自由，但也承认自建 harness 很脆弱，容易背离 bitter lesson。Tim 也把话题拉回到安全与能力研究的张力：越是“看起来聪明”的系统，越可能在错误目标上非常坚持。

## 对 AI 从业者的启发
这期最有价值的提醒是：很多 benchmark 不是在测“模型懂不懂”，而是在测“系统设计是否把正确目标写进了 harness”。如果你的 agent 只是在固定规则下靠搜索和启发式取巧，一旦加入新环境、效率约束或目标扰动，性能可能迅速塌陷。做产品和评测时，不能只看任务完成率，还要看交互成本、目标稳定性和对 unseen cases 的鲁棒性。

## 值得继续追问
- ARC-AGI-3 里，哪些失败更像“缺少表征”，哪些只是“搜索预算不够”？
- 如果一个 agent 在 preview 和 hardened games 间掉得很厉害，应该优先改 model、planner 还是 harness？
- action-efficiency scoring 会不会把 benchmark 又推向另一种可投机的局部最优？
- “会做题”与“真的理解规则”之间，能否设计出更可操作的区分指标？
