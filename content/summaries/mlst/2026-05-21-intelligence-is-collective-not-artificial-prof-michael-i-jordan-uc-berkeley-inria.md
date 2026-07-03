# 智能是集体性的，不是人工的——Michael I. Jordan 教授（UC Berkeley / Inria）

- Podcast: Machine Learning Street Talk
- Episode: Intelligence is collective, not artificial — Prof. Michael I. Jordan (UC Berkeley / Inria)
- Source: https://podcasters.spotify.com/pod/show/machinelearningstreettalk/episodes/Intelligence-is-collective--not-artificial--Prof--Michael-I--Jordan-UC-Berkeley--Inria-e3jkvil
- 获取时间: 2026-07-03T00:34:12.464Z

## 一句话结论

Jordan 的核心观点很明确：AI 不应被理解为“造出一个独立超智能”，而应被看成嵌入经济、组织和制度中的集体系统；真正重要的不是给模型贴上 AGI 标签，而是让机器学习在真实世界里可用、可控、可激励。

## 这期在讲什么

这期围绕 Michael I. Jordan 对 AI 叙事的长期反思展开。他从统计学和认知科学出发，强调自己做的不是“AI 研究”，而是面向 supply chains、commerce、healthcare 等场景的 machine learning system design。节目重点不在模型能力演示，而在：AI 的社会位置、解释与预测的关系、AlphaFold 这类系统的边界、以及为什么 drug discovery 之类问题本质上牵涉 incentive design，而非单纯 pattern matching。

## 核心要点

### 1) “AGI”更像 PR 词，不是科学分类
Jordan 认为，AGI 叙事会把注意力从系统设计、协作结构和经济激励上拉走。与其问“模型是不是通用智能”，不如问：它是否能在具体任务中稳定地与人、流程、组织结合，产出可验证的结果。

他反对把 intelligence 想成脱离人类和制度的“实体”。AI 的真实形态更像一个 collective economic system：模型、工具、数据、反馈、分工和责任边界共同构成能力。

### 2) 机器学习的价值在“可用”，不在神话化
Jordan 说，LLM 热潮容易制造“看起来懂了”的错觉，但工程上更重要的是系统是否 predictability 高、错误是否可控、部署后能否持续改进。一个能做对事情但没有清晰解释的系统，未必比一个能给出可行动解释的系统更有价值。

他特别强调：explanations 必须是 actionable 的，而不只是 mechanistic 的。也就是说，解释的标准不只是“说得通”，而是能否帮助决策、修正和治理。

### 3) AlphaFold 很强，但不是“理解生命”
Jordan 认可 AlphaFold 的成就，但提醒不要把它的成功外推成“AI 已经理解生物学”。关键问题之一是 error bars：如果没有不确定性表达，预测就很难转化为可靠决策。AlphaFold 适合做结构预测，但不等于细胞模型，更不等于药物开发的完整解。

这也解释了为什么“预测一个对象”与“控制一个系统”之间差得很远。生物问题里，单纯识别模式并不能自动解决实验设计、机制验证和临床转化。

### 4) drug discovery 不是纯技术问题，而是 incentive problem
Jordan 认为药物发现的瓶颈不只是模型能力，而是整个数据与决策链条的激励结构。真实世界里，数据生成、验证、专有知识、商业目标、监管要求彼此耦合，决定了什么信息会被采集、怎么被解释、谁为错误负责。

因此，AI 进入科学和产业，不是“更大的模型”单独能解决的，而是要重新设计 data market、反馈机制和责任分配。

### 5) 安全是系统属性，不是模型属性
Jordan 把 safety 看作整个系统的性质，而不是单个模型参数的性质。这意味着：光看模型是否“聪明”不够，还要看它放进什么工作流、由谁审批、怎样追责、如何防止错误被放大。

这对当前很多“助手式 AI”尤其重要。把一个模型放到组织中，它可能不是替代人，而是重塑人类的判断路径；风险也往往来自流程，而非单次生成结果。

### 6) 不要把人类知识压缩成“语言幻觉”
Jordan 对把语言模型当成思维本体持保留态度。他认为，很多真正有用的知识并不是自然语言里的陈述，而是分散在市场、制度、文化和实践中的 social knowledge。语言可以是接口，但不应被误认为认知本身。

这也是他为什么反对“AI 像一个肩上的助手”这种过度浪漫化的想象：更现实的方向，是让机器学习系统增强人的决策能力，而不是替人生成看似聪明的文本。

## 对 AI 从业者的启发

第一，做产品别先问“像不像 AGI”，先问它在哪个经济流程里创造稳定增益。  
第二，评估模型时不要只看 benchmark 分数，要看不确定性、可追责性和部署后的系统行为。  
第三，很多高价值问题的瓶颈不在模型，而在 incentive design、数据治理和组织协作。  
第四，真正难的是把预测变成决策，把能力变成制度内可持续的能力。

## 值得继续追问

- 如果 AI 是 collective system，那么“模型能力”与“组织能力”的边界该怎么量化？
- 面向科学和医疗，什么样的不确定性表达才算足够可行动？
- 在 drug discovery 这类场景里，数据市场应如何设计，才能让高质量反馈持续出现？
- 当系统安全取决于流程而不是模型本身时，AI 产品的责任边界该如何定义？
- 如果 AGI 只是 PR 词，那什么才是更好的长期研究坐标系？
