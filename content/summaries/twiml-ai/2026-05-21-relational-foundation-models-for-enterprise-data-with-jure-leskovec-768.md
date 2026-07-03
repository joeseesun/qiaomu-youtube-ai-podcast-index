# 面向企业数据的关系型基础模型：与 Jure Leskovec 对谈 - #768

- Podcast: The TWIML AI Podcast
- Episode: Relational Foundation Models for Enterprise Data with Jure Leskovec - #768
- Source: https://twimlai.com/podcast/twimlai/relational-foundation-models-enterprise-data
- 获取时间: 2026-07-03T00:31:52.325Z

## 一句话结论
这期的核心是：Jure Leskovec 把两类“Foundation Model”往前推进了一步——一类面向生命科学，用多尺度数据学习从蛋白到细胞再到患者的表示；另一类面向企业数据，把多表数据库直接当作图来做 relational deep learning，让模型能在新数据库、新任务上几乎“零训练”地推断。

## 这期在讲什么
Jure 先讲 AI for science 里的 **AI Virtual Cell**：目标不是手工编码生物学规则，而是用单细胞 RNA-seq、蛋白语言模型（如 **ESM**）和结构模型（如 **AlphaFold**）等数据，学习跨尺度的表示，从分子、细胞一直连到患者层面。

后半段转向企业数据的 **relational deep learning**。他把传统 enterprise database 重新表述为 graph，在原始 multi-table data 上直接训练神经网络，并介绍 **Kumo** 的 **Relational Foundation Model (RFM2)**：通过对 subgraph 做 in-context learning，在新的数据库和新任务上完成预测，而不需要针对每个任务重新训练一个专用模型。

## 核心要点

### 1）AI Virtual Cell：不是“模拟生物”，而是学习生物的表示
这部分强调的是跨尺度建模：蛋白、细胞、患者不是孤立层级，而是可以被统一到数据驱动表示空间里。相比手工规则，模型直接从数据中学习关联，减少先验设计。

它的意义在于把单细胞数据、蛋白语言模型和结构模型串起来，形成一个从序列、结构到细胞状态的连续视角。这种路线更像“用表示去接近生物过程”，而不是把已有生物知识硬编码进系统。

### 2）把 enterprise database 看成 graph
Jure 的关键重构是：多表数据库本质上天然是关系结构，适合用图神经网络和 relational representation learning 来处理。这里不是把表先压成一张宽表，而是保留多表之间的 join 关系、外键关系和上下文信息。

这种视角的价值在于，很多企业场景真正有信息量的不是单表字段，而是对象之间的关系链条。把数据库图化后，模型能利用跨表依赖，而不必依赖大量手工 feature engineering。

### 3）RFM2 的重点是“in-context learning over subgraphs”
RFM2 的核心不是为某个任务单独训练，而是让模型在给定的新图/新子图上下文中做预测。也就是说，它更像是在数据库关系结构里做一种“上下文内推理”，把已知的局部模式迁移到新任务上。

这使它尤其适合“新数据库、新 schema、新任务”的企业环境：传统 ML 往往需要重做特征、重训模型，而 RFM2 的目标是把适配成本压低。节目里也提到它会在 **RelBench** 和其他 multi-table datasets 上做 benchmark。

### 4）真实部署比论文指标更重要
节目明确提到 Kumo 已经在 **Reddit、DoorDash、Coinbase** 等公司有真实部署。对于企业 AI 来说，这说明 relational model 不只是 academic demo，而是要面对脏数据、复杂 schema、延迟、可解释性和迭代成本。

这类场景里，模型是否能“接上”现有数据栈、是否容易解释、是否能稳定上线，往往比单次离线指标更关键。

### 5）可解释性和 agentic integration 是落地门槛
Jure 还谈到通过 attention 看 tables 和 columns 来做解释。这类解释不是“为什么这个预测对”，而是帮助工程和业务人员定位模型究竟依赖了哪些关系路径、哪些字段组合。

同时，模型还要能和 agentic systems 集成：也就是不只是输出一个分数，而是能成为更大工作流中的一个组件，参与检索、决策、自动化执行或分析链路。

## 对 AI 从业者的启发
第一，很多“表格问题”本质上是关系问题。不要默认把多表数据 flatten 成单表特征，尤其在企业数据里，关系结构本身可能就是最强信号。

第二，foundation model 的价值不只在通用语言能力，也可以体现在“新环境快速适配”。RFM2 这种思路提示我们：如果任务变化快、schema 复杂、训练样本稀缺，in-context learning 可能比传统 fine-tuning 更有优势。

第三，AI for science 和 enterprise AI 看似不同，但方法论很接近：都在处理高维、弱标注、强结构的数据。真正的竞争力往往不是模型名字，而是你能否把领域结构转换成可学习的表示。

## 值得继续追问
- RFM2 在新数据库上的“无训练”到底需要多长的上下文，成本如何随 schema 复杂度变化？
- 相比特征工程 + GBDT，这类 relational foundation model 在哪些任务上优势最明显？
- attention-based explanation 在多表关系里是否足够稳定，还是更像一种调试工具？
- AI Virtual Cell 这条线里，跨蛋白、细胞、患者的表示学习，哪些环节最依赖高质量数据，哪些环节最依赖模型结构？
- 当 relational model 接入 agentic systems 后，如何定义可靠性、权限边界和错误恢复机制？
