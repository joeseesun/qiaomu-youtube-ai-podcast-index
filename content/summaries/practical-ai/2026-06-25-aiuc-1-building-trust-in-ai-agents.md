# AIUC-1：如何在 AI 智能体中建立信任

- Podcast: Practical AI
- Episode: AIUC-1: Building trust in AI agents
- Source: https://share.transistor.fm/s/e039d1ca
- 获取时间: 2026-07-03T00:34:54.378Z

## 一句话结论
这期核心观点很明确：**企业要真正放心用 AI agents，靠的不只是模型能力，而是“标准 + 审计 + 红队测试 + 保险”的信任基础设施**。

## 这期在讲什么
Emil Lassen 来自 Artificial Intelligence Underwriting Company（AIUC），他们在做的是把传统高风险行业里成熟的合规飞轮，迁移到 AI agents 上：先定义标准，再做第三方审计，再做认证，最后把认证结果和保险连接起来。Daniel 关心的是：这些标准到底是在“拖慢创新”，还是在“加速企业 adoption”？Emil 的答案是后者——尤其对 enterprise buyer 来说，标准化和可验证性反而是规模化采购的前提。

这期也重点解释了 AIUC-1 这个框架：它不是笼统地管“AI”，而是聚焦在 **agentic AI layer**，并把组织层、基础设施层和 agent 层拆开。节目的后半段，Emil 具体讲了 certification 的流程、red teaming 怎么做、什么叫“通过”，以及为什么“没有漏洞的完美分数”在 agent 系统里并不现实。

## 核心要点

### 1. 企业真正缺的不是“AI 宣言”，而是可验证的信任层
Emil 强调，startup 说“我们很安全”对 enterprise buyer 的说服力有限。真正能降低采购摩擦的，是第三方标准和审计，让买方相信你不是只在营销层面承诺安全。

他把这个逻辑类比到电力、汽车、核电等历史上的技术扩散：标准不是天然阻碍创新，反而常常是让行业敢用、敢扩的前提。对 AI agents 来说，信任层就是把“可卖”变成“可采购”的关键。

### 2. AIUC-1 的重点不是泛 AI，而是 agent 的具体风险
AIUC 把标准分成三层：组织层、基础设施层、agentic AI 层。前两层分别对应 ISO 27001/42001、SOC 2、pentest、access management、transport security 等常规治理；他们认为这些是基础，但不足以覆盖 agent 的独特风险。

真正差异化的部分在 agent 层：包括系统行为是否越界、是否给医疗/法律/金融建议、数据/系统/tool access 是否被限制、是否会 hallucinate，以及面对 adversarial pressure 时是否稳得住。也就是说，他们不是重复做传统安全合规，而是在补 agent 特有的空白。

### 3. 标准要“可执行”，所以红队测试是认证核心
AIUC-1 里有 40 条 mandatory requirements，其中 6 条和 red teaming 相关。Emil 反复强调：认证不是看你有没有写 policy，而是要测试这些控制在压力下是否真的有效。

他们会先做 gap assessment，再让企业准备证据材料；随后由第三方 auditor 验证静态控制，同时 AIUC 团队对实际 agent 进行攻击测试。攻击不会只停留在正常提问，还会逐步升级到 social engineering、authority invocation、multi-turn 诱导、退款请求等场景。通过标准的前提是：不能有 P0/P1 级漏洞。

### 4. “通过”不是 100% 无错，而是风险被透明地识别和压住
Daniel 问得很实际：非确定性的 agent，到底怎么算 pass？Emil 的回答是：**不是追求零问题，而是不能存在关键级漏洞**。他们把漏洞分级，P4 是轻微问题，P3/P2 是逐步加重，P1/P0 则不能接受。

这背后的现实判断很重要：agent 系统本来就可能被 jailbreak、可能 hallucinate。认证的目标不是把它变成“绝对安全”，而是让风险被看见、被记录、被缓解，并通过季度复审持续维持。对 enterprise 来说，这种“可解释的残余风险”比“表面完美”更接近真实采购需求。

### 5. 生态正在形成：标准、工具、审计一起把门槛降下来
Emil 说，真正让开发者和企业能落地的，不只是标准文本，而是围绕标准形成的工具生态：监控、过滤、runtime security、GRC 集成、programmatic evidence capture 等。他举了 White Circle、Credo、Witness AI 等例子，说明很多控制可以通过合作伙伴平台提前满足。

这意味着未来的认证不会只依赖人工截图和文档堆砌，而会越来越偏向实时验证、自动取证和持续审计。标准如果能“嵌入工具链”，才会从合规任务变成工程默认项。

## 对 AI 从业者的启发
第一，做 agent 产品时，不要只盯模型效果，要把 **governance、security、observability、change management** 当成产品的一部分。尤其是换 LLM、加 tool、接 MCP server 这类动作，本质上都在改变风险面。

第二，面对 enterprise 客户，最好尽早建立可以对外讲清楚的 trust story：你遵循什么标准、哪些控制已经默认内置、出了问题如何响应、哪些风险是残余风险。对销售、法务、GRC、客户安全评估都会有直接帮助。

第三，不要把 red teaming 理解成“上线前过一下”；它更像周期性的体检。agent 的行为会随模型、提示词、工具和数据变化而变化，持续测试才是现实做法。

## 值得继续追问
1. AIUC-1 目前覆盖的控制里，哪些最容易被企业“形式上满足、实际无效”？
2. P0/P1 的判定标准未来会不会因为行业、场景而分化，比如医疗、金融、客服各自不同？
3. 如果 agent 的工具链越来越复杂，第三方红队如何保持覆盖面，而不被成本拖垮？
4. 保险到底会在多大程度上改变企业购买 AI agents 的行为，还是主要是“最后一层背书”？
5. 当模型、MCP、runtime、数据治理都在快速演化时，标准的 quarterly update 机制能否跟上真实风险变化？
