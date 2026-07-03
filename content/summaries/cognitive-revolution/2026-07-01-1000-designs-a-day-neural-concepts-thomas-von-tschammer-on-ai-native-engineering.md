# 一天 1000 个设计：Neural Concept 的 Thomas von Tschammer 谈 AI 原生工程

- Podcast: The Cognitive Revolution
- Episode: 1000 Designs a Day: Neural Concept's Thomas von Tschammer on AI-Native Engineering
- Source: https://www.cognitiverevolution.ai/1000-designs-a-day-neural-concept-s-thomas-von-tschammer-on-ai-native-engineering/
- 获取时间: 2026-07-03T00:29:23.721Z

## 一句话结论

这期的核心判断很明确：AI 在工程设计里不是“替代仿真”，而是把仿真从前端瓶颈变成后端验证，并把工程师的工作重心推向更大规模的方案探索、跨学科权衡和制造约束整合。

## 这期在讲什么

Thomas von Tschammer 讲的是 Neural Concept 如何用 physics-aware AI 加速汽车、F1 和制造业的产品设计。它训练 3D 几何模型，结合 simulation 和 test data，把过去要等几天的数值仿真压缩到几分钟，让工程团队能一天看 1000+ 个设计，而不是几十个。

这期真正重要的地方，不是某个单点功能，而是工程流程的重构：AI 先做大范围生成和筛选，工程师再做高层 trade-off，最后用高保真 solver 做验证。Thomas 认为，这种 workflow 会决定 OEM 和供应商未来的速度差距。

## 核心要点

### 1. 工程设计已经经历两次革命，现在进入第三次
第一次是物理打样：做原型、撞墙、重来。第二次是 CAD + numerical simulation：把很多物理试验搬到电脑里，迭代速度提升一个数量级。  
第三次则是 physics-aware AI：不是消灭仿真，而是把“慢的、贵的、精确的”求解器留到后面，把“广泛探索”的任务交给模型。Thomas 强调，今天的瓶颈已经不是能不能算，而是算得太慢。

### 2. Neural Concept 做的是“3D 几何 + 物理预测”的专用层
它不是通用大模型，而是面向 aerodynamics、deformation、temperature 等具体物理问题的专用模型。模型输入是 CAD geometry，输出是性能预测；训练数据来自 simulation，也来自 wind tunnel 和 test lab 测量。  
Thomas 反复强调“hybrid training”：当传统 solver 对某些现象不够准时，就把实测数据补进去。对客户而言，这些数据本质上是 engineering know-how，也就是可被模型捕获和复用的知识资产。

### 3. 真实价值来自设计空间扩张，而不只是加速
JLR 是最有说服力的案例：外部空气动力学评估从每天约 50 个，提升到生产环境中的 1500 个，约 30x。Battery cool plate 供应商则把开发周期缩短 80%，同时做到更好的 cooling 和更轻的部件。  
Thomas 的意思很直接：更快不是唯一收益，更多探索会带来更好的设计。某些方案在人类直觉里“看起来像错的”，但模型会在物理约束内给出更优解。

### 4. AI 现在是 copilot，不是黑盒自动设计师
当前流程里，AI 会读 spec、生成候选方案、调用 CAD 和高保真 solver，但工程师仍然负责关键 trade-off。原因不是模型“不够会说”，而是工程问题天然多目标耦合：成本、性能、外形、制造、可靠性互相牵制。  
Thomas 认为，未来更重要的不是“一个模型包打天下”，而是 frontier models + tools + domain-specific physics models 的组合：通用推理负责协作，专用模型负责物理正确性。

### 5. 竞争差距会先体现在开发周期，而不是单点性能
他给出的对比很刺眼：西方 OEM 新车开发周期约 48–60 个月，中国约 18–24 个月。Thomas 认为，中国优势更偏制造敏捷和流程自由度，而不是设计本身更神秘。  
如果 legacy OEM 不先把 crash、aero、powertrain 这些旗舰环节 AI 化，几年内就会在速度上被拉开；第二步再把跨域约束打通，才可能获得 50–60% 级别的周期压缩。

### 6. F1 是最前沿的压力测试场
F1 团队有明确的 aero simulation CPU-hours cap，而且配额还是 sliding scale，成绩越好，能用的算力越少。Thomas 认为这像是 AI governance 的一个先例：算力分配已经可以直接影响竞争格局。  
F1 也展示了“token-maxing engineer”式工作流：夜里跑数万种设计，早上看 trade-off dashboard 选方案。Neural Concept 把 F1 当作极限环境，用来验证 OEM 未来会走向的工作方式。

## 对 AI 从业者的启发

这期最值得借鉴的是“AI-native workflow”而不是“AI 模型能力”本身。真正的壁垒在于：你是否能把专有数据、工具链、验证环节和组织知识串成闭环。  
对做 AI 产品的人来说，这提示了三点：一是别只盯着生成，要把 validation 接上；二是高价值场景往往是多目标优化，不是单轮问答；三是数据飞轮在工程领域尤其强，因为每一次迭代本身就是新的知识沉淀。  
如果你的产品面对的是强物理约束行业，真正的机会往往不是替代专家，而是把专家的“手工经验”编码进 workflow。

## 值得继续追问

1. 当 foundation model for aerodynamics 成熟后，专用公司的位置会向上移还是向下移？  
2. 工程里的 RFQ/spec 为什么仍然充满 human interpretation，谁来定义可机器执行的标准？  
3. 这种“AI 先探索、solver 后验证”的流程，在哪些行业最容易复制到汽车之外？  
4. 如果价格从 seat-based 迁移到 value-based，工程软件和平台的商业模式会怎么变？  
5. 当 AI 真正进入跨学科协同后，最大的瓶颈会是模型能力、数据治理，还是企业组织结构本身？
