# 热力学 AI 计算芯片——Thomas Ahle

- Podcast: Machine Learning Street Talk
- Episode: The Thermodynamic AI Computing Chip - Thomas Ahle
- Source: https://podcasters.spotify.com/pod/show/machinelearningstreettalk/episodes/The-Thermodynamic-AI-Computing-Chip---Thomas-Ahle-e3ld781
- 获取时间: 2026-07-03T00:33:08.424Z

## 一句话结论

这期最重要的判断是：**如果 AI 要真正进入 chip design、program synthesis 和 formal verification，核心瓶颈不是“能不能生成”，而是“你如何证明它对”**。Thomas Ahle 用 Normal Computing 的实践说明了这点：从自研 Verilog simulator，到 ProgramBench、Lean autoformalization，再到 thermodynamic computing，整期都在围绕“性能、结构、理解与正确性”之间的张力展开。

## 这期在讲什么

Thomas Ahle 想把 Normal Computing 做成 chip design 领域的 Lovable：用户只要输入意图，agent swarm 就能完成设计、优化、形式化验证，直到 tape-out。但现实很快把问题拉回基础层：商用 EDA verifier 成本高得离谱，开源工具链又不足，所以他们先花 43 天写了一个 580,000 行的开源 Verilog simulator。

随后讨论转向更难的问题：当模型给出一个芯片设计、程序或证明时，怎么知道它真是对的？70% tests passing 不是正确，甚至一个“编造出来的 bug”都可能带来巨大损失。于是话题延伸到 ProgramBench、autoformalization、spec 的多种表示方式，以及 thermodynamic computing：让物理噪声本身参与计算，用硬件去解随机微分方程、做矩阵求逆。

## 核心要点

### 1. 生成式 AI 进入硬件后，验证比生成更难
Normal Computing 的目标不是只做“会写 Verilog 的模型”，而是把设计、优化、证明、验证连成闭环。但硬件和软件最大的不同是：错误代价极高，且很难靠部分测试覆盖。

Thomas 强调他们自建 simulator 不是为了炫技，而是因为现成商业 verifier 太贵，开源基础设施又不够成熟。这里的含义很直接：如果 AI agent 要进入芯片工程，首先要补的不是 prompt，而是低层工具链。

### 2. ProgramBench 暴露了“看起来会”与“真的会”的差距
节目里反复强调一个事实：让模型根据 tests 重建程序，ProgramBench 的成功率接近 0%。这比传统 benchmark 更残酷，因为它不是让模型“续写代码”，而是要求它从行为反推结构。

Tim 关心的点是：模型可能在局部测试里表现不错，但这不等于理解了程序。这里的“structure vs competence”很关键——系统也许能产出结构上像样的结果，却未必拥有可迁移的能力。

### 3. “理解债”会随着自动化加深
当没人读代码时，团队会积累一种 “understanding debt”：系统看起来运转正常，但没人真正知道内部发生了什么。Thomas 的语境下，这不是抽象哲学，而是工程风险。

这也解释了为什么他和 Tim 会不断追问形式化证明、规范表示和验证边界。自动生成越多，人工理解越少，短期效率越高，但长期可维护性和责任归属越差。

### 4. 没有唯一正确的 spec 表示
节目里提到 Petri nets、TLA+，以及 Erik Curiel 的 “math does not represent”。Thomas 的观点是：规格说明不是天然就有单一“真表示”，不同表示各有适用场景。

这点对做 AI 产品的人很重要。很多系统失败不是因为模型不够强，而是因为任务本身在不同抽象层上有不同目标：行为一致、时序安全、逻辑可证、工程可落地，这些并不总能被同一个 representation 完整捕捉。

### 5. thermodynamic computing 把“噪声”变成计算资源
Normal Computing 的 CN101 chip 把物理噪声当成计算的一部分，让系统通过硬件里的随机动力学去求解问题。这个方向的野心不是替代通用计算，而是把特定计算过程做得更自然、更便宜。

它背后的判断是：未来计算未必都要靠更大规模的离散控制；某些任务可以把概率、Bayesian uncertainty 和物理过程直接纳入架构设计。

### 6. 性能、正确性与“谁来负责”之间没有简单答案
整期其实一直在问同一个问题：如果一个系统“表现得像对的”，我们是否就接受它对？Thomas 和 Tim 的答案都很谨慎：**表现不是 competence，competence 也不自动等于可验证正确性**。

这也是为什么他们会把 AI slop、fabricated bug、以及“只看 benchmark 分数”的倾向放在一起批评。对于真正要上生产线的系统，最终责任仍然要落在可解释、可验证、可追溯上。

## 对 AI 从业者的启发

第一，**别把“能生成”误当成“能交付”**。一旦进入芯片、编译器、形式化验证这些高风险场景，测试覆盖、证明和工具链比模型大小更重要。

第二，**模型能力越强，spec 工程越关键**。你不是只在做 prompt，而是在定义任务的可验证边界。没有好的 spec，agent 再强也只是高效地产生歧义。

第三，**自动化会制造理解债**。团队要有意识保留人类可审计路径，否则短期提速会换来长期失控。

## 值得继续追问

- ProgramBench 这种“从 tests 重建程序”的任务，失败究竟卡在推理、搜索，还是 spec 本身不完备？
- 在芯片设计里，哪些环节适合 agent 自动化，哪些环节必须保留人类签字？
- thermodynamic computing 的优势是理论上的，还是已经能在工程上稳定兑现？
- 如果 spec 没有唯一真表示，AI 系统的验证应该以哪一层抽象为准？
- 当“性能足够好”与“可证明正确”冲突时，产品和研究应该如何取舍？
