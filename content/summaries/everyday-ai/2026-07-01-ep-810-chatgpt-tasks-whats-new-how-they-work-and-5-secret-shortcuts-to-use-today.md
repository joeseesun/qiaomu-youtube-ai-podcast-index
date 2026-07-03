# 第810期：ChatGPT Tasks 有什么新变化、它们如何运作，以及今天就能用的 5 个隐藏技巧

- Podcast: Everyday AI
- Episode: Ep 810: ChatGPT Tasks: What’s New, How They Work and 5 Secret Shortcuts to Use Today
- Source: https://pscrb.fm/rss/p/www.buzzsprout.com/2175779/episodes/19429393-ep-810-chatgpt-tasks-what-s-new-how-they-work-and-5-secret-shortcuts-to-use-today.mp3
- 获取时间: 2026-07-03T00:38:21.788Z

## 一句话结论
这期的核心不是“ChatGPT Tasks 又更新了”，而是它正在从一个低调的定时提醒功能，变成 ChatGPT 里最实用的 gateway agent：能调度、能串联应用、能吃进记忆与项目上下文，开始具备真正的主动工作流价值。

## 这期在讲什么
主持人认为，OpenAI 近两周把原本的 proactive feature「Pulse」逐步收掉，把算力和产品重心转回升级版 ChatGPT Tasks。很多人忽略了这一点，因为 Pulse 使用门槛高、影响小，而 Tasks 本来就“早就有了”，容易让人以为没新东西。实际上，这次变化的重点是：Tasks 变得更容易管理、支持更多场景，并且在后台能力上悄悄增强了。

他把 ChatGPT Tasks 定位为“给非技术用户的 agent 入门层”。相比直接上 Codex、workspace agents，Tasks 更像是一个自然语言驱动的自动化入口：你只要描述“什么时候、检查什么、结合哪些连接应用、输出什么结果”，它就能按计划运行，并保留上下文。

## 核心要点

### 1. Pulse 被收掉，Tasks 成为新的主动工作入口
OpenAI 在公告里提到，Tasks 新增了更清晰的 scheduled page、更顺手的创建/编辑流程、更灵活的调度选项和更好的通知；同时还能做 one-off 和 recurring task，也能要求它“检查变化并在有意义更新时提醒我”。

主持人特别强调，自己其实更支持关掉 Pulse，因为 Pulse 的问题是“不可 steer”，而 Tasks 更可控，也更适合围绕用户已有的数据源展开主动工作。

### 2. 现在的 Tasks 更像“连接应用后的自动化调度器”
他展示的思路不是简单让 ChatGPT 回答问题，而是把 Gmail、Google Calendar、Google Drive 等连接起来，写成“每天 7 点帮我扫描邮箱和日程，结合云盘和网页信息，给出优先事项、草拟邮件回复、建议今天要做的项目”。

这里的重点在于：Tasks 不是单点问答，而是把多个工具和已有上下文一次性拉进同一个定时任务里。对知识工作者来说，这类“晨间 triage”很接近真实工作流。

### 3. 直接在 scheduled 页面开任务不够理想
他明确提醒：不要只在 chatgpt.com/scheduled 里直接开任务。原因是当前这个入口太“裸”，能填自然语言，但看不到也无法选择模型，控制力不足。

他更推荐先在普通对话里构建任务，再检查系统是否把你的短 prompt 扩写成更完整的执行指令；这样更容易发现模型、推理强度和任务描述是否符合预期。换句话说，Tasks 的易用性很高，但可靠性仍需要人工校验。

### 4. 价格、频次和入口都限制了它的普及
他提到不同付费档位可创建的任务数非常有限：Go 计划 3 个、$20/月计划 5 个、Team 10 个、Pro/Enterprise 15 个。再加上入口之前被挪走、现在才回到 sidebar，说明 OpenAI 还在摸索这个功能的产品化方式。

这也解释了为什么它没有像一个“完整 agent 平台”那样被广泛讨论：它足够有用，但还不够显眼，也不够宽松。

### 5. 五个“秘密捷径”本质上是五种叠加能力
主持人给出的五个快捷思路分别是：MCP、apps 的读写能力增强、为未来 Super App 做准备、在 projects 里跑 tasks、以及利用 memory 生成更好的 recurring prompt。

其中最值得注意的是 MCP 和 apps 的 agentic 化：过去很多 connector 偏只读，现在像 Gmail 已经开始支持更主动的操作，甚至能触发发送邮件。再加上 projects 能承接 tasks、memory 能帮你自动生成可复制的提示词，Tasks 逐渐从“定时提醒”升级成“上下文驱动的执行层”。

## 对 AI 从业者的启发
第一，真正的产品机会不一定在“更强模型”，而在“把模型嵌进用户已经在用的工作节奏”。Tasks 的价值来自时间点、上下文和连接器，而不只是回答质量。

第二，OpenAI 这类产品的演进方向很清楚：从聊天窗口，走向可调度、可组合、可记忆的系统。对做 AI 产品的人来说，重点要观察的是：哪些能力正在从“手动触发”变成“自动触发”。

第三，如果你是团队里负责知识工作流的人，最该实验的不是大而全 agent，而是像这期展示的那种高频、低风险、可复用任务：晨间摘要、项目更新、指标巡检、邮件草拟、上下文聚合。

## 值得继续追问
- Tasks 当前到底在哪些模型、哪些账号层级上最稳定？
- app 的读写能力增强后，如何设置权限边界和审计日志？
- MCP + Tasks 的组合，什么时候会明显优于现有的 Zapier / Make / n8n？
- projects 里的 tasks 是否会成为团队级 agent 的雏形？
- OpenAI 会不会最终把 ChatGPT Tasks、Codex automations 和 workspace agents 合并成同一套调度层？
