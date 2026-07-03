# 第808期：OpenAI 限量发布 GPT-5.6、Mythos 开始缓慢恢复、OpenAI 语气变强硬，以及更多 AI 新闻

- Podcast: Everyday AI
- Episode: Ep 808: OpenAI’s limited release of GPT-5.6, Mythos starts slow reinstatement, OpenAI gets spicy and more AI news
- Source: https://pscrb.fm/rss/p/www.buzzsprout.com/2175779/episodes/19417836-ep-808-openai-s-limited-release-of-gpt-5-6-mythos-starts-slow-reinstatement-openai-gets-spicy-and-more-ai-news.mp3
- 获取时间: 2026-07-03T00:39:21.966Z

## 一句话结论
这期核心不是“又发布了什么模型”，而是 AI 前沿模型正在进入更强监管、更小范围试用、以及更明显的地缘政治分层时代：OpenAI、Anthropic、Google 都在被“限流”，同时各家又在用新命名、新架构、新芯片和人才战加速追赶。

## 这期在讲什么
Jordan 主要围绕四条主线展开：OpenAI 限量放出 GPT-5.6，Anthropic 的 Mythos 5 重新被部分放行，Google 传出把 coding strike team 常设化以补 Gemini 的编码能力短板，以及 OpenAI 与 Broadcom 合作做自研推理芯片 Jalapeño。  
另外还穿插了几个更大的结构性信号：美国政府正在更主动介入 frontier model 的发布节奏；AI 模型能力、算力、人才和市场准入，正在从“谁做得更好”变成“谁能被允许先用”；而中美技术竞争、模型蒸馏争议、企业 AI 采购策略，都被这轮变化重新牵动。

## 核心要点

### 1. OpenAI 的 GPT-5.6 不是全面发布，而是“受控试用”
OpenAI 这次把 GPT-5.6 的早期访问限制给少量 trusted testers，而且还要经过美国政府知情或参与的伙伴。Jordan 重点强调，OpenAI 还改了命名：Soul 是旗舰、Terra 是平衡版、Luna 是低成本快速版，明显向 Anthropic 的三层产品线靠拢。  
更值得注意的是，Soul 加了 max reasoning 和 ultra mode，后者会协调 subagents 处理更复杂的 coding、biology、cybersecurity 任务。OpenAI 还声称它在 coding workflows 上略强于 Anthropic 的 Mythos 5，而且输出 token 只用约三分之一。

### 2. Anthropic 的 Mythos 5 重新开放，但只给约 100 家公司和一个联邦机构
Anthropic 在本月早些时候因为出口管制和国家安全担忧，暂停了 Mythos 5 和 Fable 5 的广泛访问。现在 Commerce Department 似乎允许部分“trusted partners”重新使用 Mythos 5，但 Fable 5 仍未恢复。  
这说明所谓“前沿模型普惠”可能正在被改写：不是所有付费用户都能第一时间拿到最强模型，甚至连大公司也未必行。Anthropic 还被提到由 CEO Dario Matti 转由联合创始人 Tom Brown 参与对政府谈判，侧面说明监管沟通已经变成产品发布的一部分。

### 3. Google 的重点不只是发 Gemini 3.5 Pro，而是补齐 coding 中台能力
Google 原本在 I/O 里暗示 Gemini 3.5 Pro 会在 6 月推出，但现在仍未落地。报道显示，Google 正把原本临时的 AI coding strike team 常设化，并引入 mid-training 阶段，专门用编码数据训练更复杂的工程能力。  
这里的变化很关键：不再只是 pre-training + fine-tuning，而是增加一个专门面向工具使用、多文件理解、长期工程任务的训练层。Jordan 认为，这反映出 Google 受 Anthropic 的 Claude Code 压力很大，也受到了人才流失影响。

### 4. AI 的瓶颈不只是技术，还有人：RAISE US 试图补“劳动力适配”
新成立的非营利组织 RAISE US 已筹到 5 亿美元，目标是 10 亿美元，想帮助各州应对 AI 带来的就业冲击。它的锚定伙伴包括 OpenAI Foundation、Anthropic、Amazon 和 Microsoft。  
Jordan 把这件事解读为：AI 落地的关键不只是模型能力，而是组织、培训、岗位迁移和政策设计。它已经开始和 Arkansas、Maryland、Utah 等州合作，尝试 career navigation、service year、wage insurance 等机制。

### 5. 模型蒸馏争议升级，AI 竞争正变成“模型保护战”
Anthropic 公开指控 Alibaba 通过约 2800 万次交互、2.5 万个虚假账号，对其模型进行大规模 distillation attack。这里的核心不是单纯“模仿”，而是用强模型输出训练更小模型，进而逼近甚至复制其行为。  
这件事的危险性在于：如果 frontier models 只有少数人能用，而其他模型又能通过蒸馏快速追平，那企业在选型时会面对更复杂的合规、供应链和地缘风险。它也会影响未来 Anthropic 这类公司如何证明自己的护城河。

### 6. OpenAI 与 Broadcom 的 Jalapeño，说明推理算力正在被重新设计
OpenAI 和 Broadcom 正在做一颗面向 inference 的自研芯片 Jalapeño，目标是更便宜、更快、更省电地支撑大规模模型服务。  
Jordan 特别强调，这不是训练芯片，而是为在线推理设计，关注速度、内存、网络和减少浪费算力。更夸张的是，双方称这颗芯片从立项到样片只用了 9 个月，说明 AI 基础设施迭代速度远超传统芯片周期。

## 对 AI 从业者的启发
1. frontier model 的竞争，已经从“性能榜单”变成“发布权限 + 合规路径 + 政府关系”的综合竞争。  
2. 如果你的产品依赖最强模型，要提前准备 tiered access 的备选方案，不要默认“最强模型会立刻普及”。  
3. coding 能力正在成为基础模型竞争的关键战场，mid-training、agentic coding、multi-file understanding 会持续升温。  
4. 企业选型时要把蒸馏、出口管制、供应链和数据中心算力一起考虑，而不是只看 benchmark。  
5. 未来 AI 落地的最大挑战，往往不是模型本身，而是组织如何吸收变化、改造岗位和训练人。

## 值得继续追问
1. 美国政府会不会把 frontier model 的访问变成事实上的许可制？  
2. GPT-5.6 Soul、Anthropic Mythos 5、Google Gemini 3.5 Pro 之间的真实第三方基准会如何排序？  
3. 如果强模型长期只能小范围开放，开源/开放权重模型会不会在企业市场获得更大份额？  
4. Anthropic 对 Alibaba 的蒸馏指控，最后会不会演变成行业级反制规则？  
5. OpenAI 的 Jalapeño 能否真正降低 inference 成本，还是只是在特定 workload 上优化？
