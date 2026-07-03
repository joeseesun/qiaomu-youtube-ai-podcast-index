# Why the Frontier Ecosystem must be Open — Matei Zaharia and Reynold Xin, Databricks

- Podcast: Latent Space: The AI Engineer Podcast
- Source: https://www.latent.space/p/databricks
- 获取时间: 2026-07-02T16:42:04.565Z

## Transcript

_We’re excited to have Databricks join us at [AIEWF](https://www.ai.engineer/worldsfair/2026), among [hundreds of the top companies](https://www.ai.engineer/worldsfair/2026#expo) in the AI Engineer ecosystem. LS subscribers can use [their discount](https://www.latent.space/p/exclusive-250-off-ai-engineer-tix) to get past the late bird pricing and access [over $50k in sponsor offers](https://x.com/aiDotEngineer/status/2068541375814246451?s=20)!_

Everyone is still talking about [Satya’s Frontier Ecosystems post](https://www.latent.space/p/ainews-satya-on-loopcraft-building), but few have actually built a ([now $175 billion](https://finance.yahoo.com/markets/stocks/articles/databricks-reportedly-eyes-staggering-175-220052367.html)) frontier ecosystem and cloud like our guests today.

From **open-sourcing the layer above coding agents** to **rethinking databases** for the agent era, Databricks cofounders **Matei Zaharia** and **Reynold Xin** are pushing the company beyond the lakehouse into a full data-and-AI operating system. In this episode, Matei and Reynold join swyx at the 2026 Data + AI Summit to unpack **[Omnigent](https://www.databricks.com/blog/introducing-omnigent-meta-harness-combine-control-and-share-your-agents)**, **[LTAP](https://www.databricks.com/company/newsroom/press-releases/databricks-launches-ltap-first-lake-transactionalanalytical)**, **[Lakebase](https://www.databricks.com/product/lakebase)**, **agent security**, open formats, **Mosaic**, and why databases may matter more than ever once AI agents start doing real work.

We go deep on **Omnigent**: Databricks’ open-source meta-harness for combining, controlling, and **sharing agents across Claude Code, Codex, Cursor, Pi, custom agents, and internal tools**. Matei explains why coding agents and enterprise agents run into the same problems: portability, collaboration, session history, security, spend controls, and the need for a common API above every harness.

Then Reynold walks through Databricks’ database dream: why **CDC is brittle enough to joke that it means “continuous data corruption,”** why HTAP has been **the holy grail of database engineering**, and why Databricks thinks LTAP gets most of the benefits by unifying the storage layer instead of collapsing every query engine. We also cover **Databricks’ infrastructure scale**, the culture behind **rapid prototyping**, the difference between tech and enterprise customers, **Databricks vs Snowflake**, **whether vector databases should have ever existed**, the **Mosaic model strategy**, **[Genie](https://www.databricks.com/product/genie/agents)**, AI Runtime, RL fine-tuning, and the thesis that traditional software gets rewritten once the data is in the right place and agents sit on top.

[



Matei Zaharia@matei\_zaharia

Genie has transformed how Databricks users work with data, with 3x the accuracy of generic agents. We're sharing some of the research behind it and what makes building data agents challenging. Super proud of our research team's impact with this!

databricks.com

Pushing the Frontier for Data Agents with Genie | Databricks Blog



3:52 PM · May 8, 2026 · 106K Views

8 Replies · 44 Reposts · 276 Likes





](https://x.com/matei_zaharia/status/2052778748941046180)

Databricks began as a company for **the big data era**. The origination of [Spark](https://www.databricks.com/spark/about) from the Berkeley AMPLab which eventually turned into the product [Lakehouse](https://www.databricks.com/blog/2020/01/30/what-is-a-data-lakehouse.html) convinced enterprises that they didn’t need a separate data lake, warehouse, ML platform, and governance layer. They just needed **one open foundation where all of their data could live and be reasoned over.**

Since then a lot has changed, but data has only become more important. Data is no longer something you keep track of and analyze ad hoc, **it’s the necessary context agents need in order to act.** So the framing has shifted from “where do we put all of our data?” to “how do we expose the right slice of state, history, permissions, and business logic to an AI system at the exact moment it’s doing work?”

If frontier model performance becomes commoditized, the durable advantage then becomes **the company-specific context around them**: proprietary data, governed access, operational state, transaction logs, workflows, and feedback loops. Which makes Databricks positioned perfectly.

Now coming fresh off the **[Data + AI Summit 2026](https://www.databricks.com/dataaisummit)**, the company is moving just as fast to keep up, announcing [Genie One](https://www.databricks.com/company/newsroom/press-releases/databricks-launches-genie-one-all-new-agentic-coworker-every-team), [Omnigent](https://www.databricks.com/blog/introducing-omnigent-meta-harness-combine-control-and-share-your-agents), [LTAP](https://www.databricks.com/company/newsroom/press-releases/databricks-launches-ltap-first-lake-transactionalanalytical), and many more, indicating a central mission in its newer work: **Databricks is trying to become the operating system for enterprise agents.**

[



Matei Zaharia@matei\_zaharia

Really excited to open source a new project: Omnigent, a meta-harness for AI agents. It lets you build multi-agent coding and custom agents, sitting above Claude Code, Codex, Pi, and agent SDKs to let you compose them. It also adds live collaboration and rich control policies.



4:02 PM · Jun 13, 2026 · 204K Views

88 Replies · 202 Reposts · 1.14K Likes





](https://x.com/matei_zaharia/status/2065827057624605146)

Models are getting good enough, but agents are only useful if they have the right context, permissions, memory, state, cost controls, and access to live business data. Fundamentally it appears that significantly better model performance in production is **a systems problem**, one that data guys like us are remarkably well prepared to solve!

**We discuss:**

*   Why Databricks built **Omnigent** as a meta-harness above existing AI agents
    
*   Why **coding agents** and custom enterprise agents need the same infrastructure
    
*   The common API for **agent sessions**, files, streams, tool calls, and cancellation
    
*   Why **persistent sessions**, cloud sandboxes, sharing, search, and collaboration matter
    
*   Why Databricks **open-sourced Omnigent** instead of keeping it proprietary
    
*   Databricks’ internal **agent usage**, cloud sandboxes, and coding workflows
    
*   The scale of Databricks: **50–60 million virtual machines a day** and exabytes before breakfast
    
*   Why agent security needs **contextual and stateful policies**
    
*   How an agent could read confidential docs, install a compromised npm package, and **leak data**
    
*   Why **spend control** matters when an agent can burn $500 reading logs
    
*   Startup opportunities around coding-agent **analytics, quality, skills, and spend**
    
*   **LTAP, Lakebase**, and why Databricks wants to rethink the database stack
    

[



Reynold Xin@rxin

The future of databases is being built directly on top of object stores. We call this the Lakebase architecture. For a long time, the industry treated data lakes strictly as analytical or offline storage. But the Lakebase architecture is changing that by enabling true

12:37 AM · May 28, 2026 · 2.96K Views

1 Reply · 9 Reposts · 32 Likes





](https://x.com/rxin/status/2059796129093652740)

*   **OLTP vs OLAP**, CDC, and why data pipelines break at 3 a.m.
    
*   Why **HTAP** has historically been the holy grail of database engineering
    
*   Why Databricks thinks LTAP is **“HTAP done right”**
    
*   How writing transactional data into **column-oriented formats** changes analytics
    
*   Why agents need **live operational context** from databases, not just telemetry
    
*   How Databricks prototypes strategic systems without **endless process**
    
*   Enterprise vs tech customers, **governance, procurement, and DIY culture**
    
*   The **“second system syndrome”** risk of rewriting a database engine
    
*   Building a database engine from a decade of traces and **quadrillions of data points**
    
*   Why **vector databases** should never have been a separate category
    
*   Why **open formats and AI** changed the race with Snowflake
    
*   The Mosaic story, **DBRX, Genie**, document parsing models, and specialized model training
    
*   Why **model customization** and RL fine-tuning may become mainstream
    
*   Why **“get the data there, slap some agent on top”** may rewrite traditional software
    

**Matei Zaharia**

**Reynold Xin**

*   **LinkedIn:** [https://www.linkedin.com/in/rxin](https://www.linkedin.com/in/rxin)
    
*   **X:** [https://x.com/rxin](https://x.com/rxin)
    

**Databricks**

*   **Website:** [https://www.databricks.com](https://www.databricks.com/)
    
*   **X:** [https://x.com/databricks](https://x.com/databricks)
    

**00:00:00** Introduction

**00:02:22** Omnigent and the Agent Infrastructure Layer

**00:08:39** Agent Clouds, Common APIs, and Open Source

**00:16:52** Databricks Scale and Internal AI Workflows

**00:18:03** Agent Security, Governance, and Spend Controls

**00:27:34** LTAP and the Database Dream

**00:30:30** CDC, HTAP, and Why Data Pipelines Break

**00:34:05** Lakebase, Parquet, and Live Data for Agents

**00:36:47** Databricks’ Culture of Fast Prototyping

**00:43:40** The Dream Engine and Rewriting the Database Stack

**00:51:02** Vector Databases, Query Engines, and LTAP

**00:52:36** Databricks vs Snowflake

**00:57:48** Mosaic, DBRX, Genie, and Specialized Models

**01:03:11** Context, AI Runtime, and RL Fine-Tuning

**01:06:15** Why Data + Agents May Rewrite Software

**01:07:09** Closing Thoughts

**Swyx \[00:00:00\]:** Matei and Reynold from Databricks, welcome to Latent Space.

**Reynold Xin \[00:00:06\]:** Hey, thanks for having us.

**Swyx \[00:00:07\]:** Yeah.

**Matei Zaharia \[00:00:08\]:** Yeah, thanks so much.

**Swyx \[00:00:09\]:** thanks for taking time out. You have your Databricks, Data AI Summit going on. You were just telling me how the first summit that you guys ran was just 50 people

**Reynold Xin \[00:00:17\]:** Yeah, it was

**Swyx \[00:00:17\]:** in Berkeley

**Reynold Xin \[00:00:18\]:** little meetup at Berkeley, I think

**Matei Zaharia \[00:00:19\]:** Yeah

**Reynold Xin \[00:00:19\]:** put together

**Matei Zaharia \[00:00:20\]:** We were doing these tutorials and, yeah, just teach people Spark.

**Swyx \[00:00:23\]:** Yeah. obviously now it’s like, I think like the headline number’s like 100,000 people around the world, 30,000 in person.

**Swyx \[00:00:30\]:** it’s a crazy

**Matei Zaharia \[00:00:31\]:** Amazing

**Swyx \[00:00:31\]:** community. Well, I just saw the keynote.

**Swyx \[00:00:35\]:** Ali’s just. Did was it obvious or that back when that Ali would be, like, such a great, like, CEO? Like

**Reynold Xin \[00:00:42\]:** Oh

**Swyx \[00:00:42\]:** such a great presenter?

**Reynold Xin \[00:00:43\]:** What do you think?

**Matei Zaharia \[00:00:44\]:** I think among our group of founders it was clear that, I think he’d be the best at this.

**Swyx \[00:00:50\]:** Yeah.

**Matei Zaharia \[00:00:50\]:** And yeah, it turned out great. And he’s, he’s ramped up on so many topics growing a company. He would just go in and, like, study it and, be talk to all the experts. Like, even if he can’t hire the person, learn enough about, like, finance and sales and whatever it was, and, and go from there. Yeah.

**Swyx \[00:01:09\]:** Yeah.

**Reynold Xin \[00:01:10\]:** he’s obviously very high IQ and a very high EQ, but it wasn’t. Like, Ali today is quite different from Ali from, like 10 years ago. I think there’s a lot of work that he put in to, get to this point.

**Swyx \[00:01:20\]:** Yeah. no, to me the most appealing thing about him is that he’s funny. And like, it, it’s, it’

**Matei Zaharia \[00:01:26\]:** It’s true, yeah

**Swyx \[00:01:26\]:** it’s hard to make jokes about, data warehouses

**Reynold Xin \[00:01:30\]:** About serious topics

**Swyx \[00:01:31\]:** security

**Matei Zaharia \[00:01:32\]:** Yeah

**Swyx \[00:01:32\]:** what have you.

**Matei Zaharia \[00:01:33\]:** Oh, yeah. That’s for sure.

**Swyx \[00:01:34\]:** Yeah. So you guys launched a whole bunch of things. I’ll, I’ll just name check briefly, the stuff because we’re not gonna cover everything. Omnigentt, your baby. LTAP, your baby, your dream engine.

**Swyx \[00:01:47\]:** we’re also gonna cover Genie, cover CustomerLake, you acquired Panther

**Matei Zaharia \[00:01:52\]:** Yeah

**Swyx \[00:01:52\]:** Open Sharing, and there’s Unity AI Gateway. A lot of these, I think, like, are things that you would expect a Databricks to do. It’s, it’s like part of the roadmap. Everyone in your category has similar things. But I think, probably the two of you are leading the two most unique and differentiated initiatives

**Swyx \[00:02:09\]:** on, in the landscape. Maybe we’ll start with, Omnigentt we’ll, we’ll, we’ll, we’ll go into it. I do think that a lot of people are exploring this meta harness concept.

**Matei Zaharia \[00:02:21\]:** Yeah, totally.

**Swyx \[00:02:21\]:** What led you to it?

**Matei Zaharia \[00:02:22\]:** Yeah. There were a couple of, like, converging lines, which I think is a good sign that you need something new. So on the one hand, there’s all the coding agent info internally. We have really great, dev infra team. they built something called Isaac, that’s like a wrapper on Claude Code and Codex, and, lets you use them either on the web in, like, sandboxes or, just on your dev machine or on your laptop or whatever. And then, they were adding all kinds of stuff there. And we saw all the more advanced engineers like, were building their own workflows with tons of agents, and they were building their own UIs and stuff on top or even on top of that. And then the other one was, like, us building agents. We ship this, like, data science agent called Genie on the research team, which I lead. We also build a lot of internal ones for various things, and then we have all the customer ones. And all of them running into this thing of like, “Oh, I need to switch model and harness and so on,” every few months. Plus the agent is, like, completely useless if you can’t share sessions with someone and have history and have search and all this, like, layer on top of it for collaboration. I thought a bit about it from both contexts and, at first people thought it was weird. They’re like, “Why are you doing coding agents and custom agents in the same thing?” But I said it’s, it’s the same problems and, you just wanna build the stuff that lets you deliver the agent, maybe control it if you care about security, and, make it portable across things. And then we prototyped some things as experiments. We saw, yeah, we can make it work, and then we built that for real.

**Swyx \[00:04:06\]:** I’m wondering if this let’s call it architecture

**Matei Zaharia \[00:04:11\]:** Yeah

**Swyx \[00:04:11\]:** maps to anything in your careers in the past. like I always think about how a lot of things just tie back to operating systems.

**Swyx \[00:04:18\]:** A lot of operating

**Matei Zaharia \[00:04:19\]:** Yeah

**Swyx \[00:04:20\]:** systems tie back to databases,

**Matei Zaharia \[00:04:21\]:** So

**Swyx \[00:04:21\]:** or the other way around

**Matei Zaharia \[00:04:22\]:** so the thing, I do think it ties a lot to, like, network protocols, internet protocol. we also

**Swyx \[00:04:29\]:** Communication between entities.

**Matei Zaharia \[00:04:30\]:** Yeah. We did stuff with, like, data sharing also, which is probably, most viewers probably won’t know unless they’

**Swyx \[00:04:36\]:** Yeah, open protocol is the term.

**Matei Zaharia \[00:04:37\]:** Yeah.

**Swyx \[00:04:38\]:** Open sharing. Open sharing.

**Matei Zaharia \[00:04:38\]:** Open sharing.

**Swyx \[00:04:39\]:** Yes.

**Matei Zaharia \[00:04:39\]:** Yeah. So it’s like you have a company, you maintain some table, like let’s say like a Walmart or something. They have like the, inventory and what’s been sold in each store. And then you also have suppliers, and they would love to produce more things and ship them, like, exactly the moment you need them. So they would love, like, real-time access to your table. So instead of like sending emails around or Excel sheets or phone calls, why can’t you share like a view of that table in real time with them? Then they query, they, join it with their data, and they decide what to send. So it’s one of these things where you, like you might ask like today since we can vibe code anything so fast, why do we even need to design like protocols or APIs or software? Why can’t you just vibe code things on demand? But for this type of interoperability where multiple parties that are moving at different speeds are building stuff and you still want some layer on top to coordinate, you do wanna design it and build it. So it reminds me of that, like agents talking to each other and, users talking to agents and tools.

**Swyx \[00:05:42\]:** Reynold, any other comments alternative viewpoints?

**Reynold Xin \[00:05:46\]:** I think, by the way, we had a debate on exactly which set of benefits would, matter a lot, and I think around the time we decided to do this thing I was telling Matei, “Hey,” it just happened to be there’s a particular week that I was coding nonstop

**Swyx \[00:06:00\]:** from the moment I woke up to, like, the moment I went to bed, I was, like, looking at my Claude sessions, my Codex sessions. And one of the things that was particularly annoying was having to keep my laptop open.

**Swyx \[00:06:12\]:** I was driving to a doctor’s appointment, and I remember because I wanted to make sure the whole thing continues working.

**Matei Zaharia \[00:06:18\]:** But by the way, it’s so comforting to hear you say that because I’m like, “I don’t know if I’m a clown and I’m doing this or like.”

**Swyx \[00:06:25\]:** Yeah. Like honestly, I was driving and I was tethering my laptop to my phone.

**Matei Zaharia \[00:06:29\]:** huh.

**Swyx \[00:06:29\]:** Keeping it on the side. Whenever I hit a red light, I started looking at what’s going on my laptop.

**Matei Zaharia \[00:06:35\]:** Yeah.

**Swyx \[00:06:35\]:** And I just felt that was ridiculous.

**Matei Zaharia \[00:06:37\]:** Yeah.

**Swyx \[00:06:37\]:** It felt like we went back to the dark ages

**Matei Zaharia \[00:06:39\]:** Yeah

**Swyx \[00:06:40\]:** programming. the productivity you gain from all this coding age is amazing, but, yeah.

**Matei Zaharia \[00:06:45\]:** Have you heard of cloud?

**Swyx \[00:06:47\]:** Yeah.

**Swyx \[00:06:48\]:** It was crazy to me.

**Matei Zaharia \[00:06:49\]:** Oh, the thing you were working on was the sandboxes or was this before that?

**Swyx \[00:06:52\]:** It was a sandbox.

**Matei Zaharia \[00:06:53\]:** Okay.

**Swyx \[00:06:54\]:** I was work

**Matei Zaharia \[00:06:54\]:** So you were in

**Swyx \[00:06:55\]:** So I was approaching from a very different angle. I wanted to, “Hey, we’re gonna have cloud sandboxes that doesn’t shut down. You can get one very quickly,” but not just for running agentic sessions.

**Matei Zaharia \[00:07:06\]:** Yeah.

**Swyx \[00:07:06\]:** It’s also for running development. So I was personally building that week, and through building that, I ran into all these issues, and then I wrote

**Matei Zaharia \[00:07:15\]:** Yeah

**Swyx \[00:07:15\]:** a document for Matei, it’s like, “Here’s my wish list of what the actual environment should do.” And I think he ended up almost implementing

**Matei Zaharia \[00:07:22\]:** Yeah

**Swyx \[00:07:22\]:** every single one of them.

**Matei Zaharia \[00:07:23\]:** Yeah, I remember Reynolds saying, ‘cause my first prototype of this had just chats with your agent and he said, “I have to be able to open a shell, like my own shell and like list files and like tail them and stuff.” So

**Swyx \[00:07:36\]:** So SSH into a mainframe.

**Matei Zaharia \[00:07:37\]:** Yeah. it has that now.

**Swyx \[00:07:39\]:** Tailing my log.

**Matei Zaharia \[00:07:40\]:** Yeah.

**Matei Zaharia \[00:07:41\]:** Yeah.

**Swyx \[00:07:41\]:** And also another thing I think I asked was, I had. I still use cursor for the sole purpose of rendering markdown files.

**Matei Zaharia \[00:07:48\]:** huh. Yes.

**Swyx \[00:07:49\]:** So I said, “If you just give me a way to see my markdown files and render

**Matei Zaharia \[00:07:53\]:** Yeah

**Swyx \[00:07:53\]:** them properly, I don’t need a separate tool anymore.”

**Matei Zaharia \[00:07:55\]:** Yeah.

**Swyx \[00:07:56\]:** And I think you also built that in.

**Matei Zaharia \[00:07:57\]:** Yeah, we, yeah, we did that, yeah. Yeah, we had a lot of engineers building, their own vibe coding setup. But then the other thing they all said is like, “Hey, I built something that’s amazing for me, but, like, no one else on the team can use it ‘cause I don’t have a server to collaborate.” And this is why we tried to set up, Omnigent, so you can have a server and have the security, set up in there. So, like log in with Google or whatever and, like securely share stuff. which. And that’s where we’ve seen a lot of other agents like hit things. Like people think they prototyped an awesome agent, but it’s not allowed to connect to like some really important data or whatever because of the security team.

**Swyx \[00:08:38\]:** Yeah.

**Matei Zaharia \[00:08:38\]:** So yeah.

**Swyx \[00:08:39\]:** Yeah. At this point, so for those watching along on YouTube, we’re gonna putting up a image of the structure here, and we can talk a little bit of the architecture. I think I just want to have people understand, ‘cause like when we’re talking about software, it can be very abstract and like here is what we’re talking about. You’ve worked out in open source this entire platform and there’s a runner component and server component with a uniform API that you’ve, you’ve figured out. any other element and obviously you can plug in all this, persistence layers and compute layers. This is a whole cloud. It’s an agent cloud.

**Matei Zaharia \[00:09:12\]:** Yeah. It’s, it’s got these components to work with it. The, a lot of the action happens like on the machine where you deploy your agent too. So whatever you’ve got on there, you can run. But yeah, it’s, I think it’s the minimal thing you want to have hosted, like collaborative agents and to have that server. And one of the reasons we open sourced it is, anyone building agents, this gives them an app they can start with and customize, which we were seeing in Databricks too. Like someone would make a nice, agent app and then other teams would ask, “Oh, can I just use yours for my agent?”

**Swyx \[00:09:45\]:** Yeah, I think we had like five or six different agentic frameworks

**Matei Zaharia \[00:09:48\]:** Yeah

**Swyx \[00:09:48\]:** built by every different team. They do all do more or less the same thing. Yeah, you need to. people wanna take something that works in Forkit, and you might as well have something open source. Yeah, which also was another question, which is interesting for Databricks. Like what do you choose to open source? What do you choose to make it proprietary? It’s in. this goes back to Spark, right?

**Matei Zaharia \[00:10:05\]:** Yeah.

**Matei Zaharia \[00:10:06\]:** One, so one of the reasons to open source something is if you think it’s a layer that will there’ll be some network effect, it’ll benefit from many, people collaborating, on it. So, for example, with Spark, I don’t know if when Spark came out, we also focused a lot on letting you have libraries on top. So like there used to be different

**Swyx \[00:10:28\]:** Ecosystem

**Matei Zaharia \[00:10:28\]:** distributed computing engines for like machine learning and graph computation. We said they should all be libraries that you can compose. And we made it super easy to add connectors to data sources too. And then we benefit because, we don’t have the time to write like connectors to like, 1,000 like different databases and file formats, but we can just use the ones people make, and of course they benefit from joining, this thing. So that’s like one of these as it. Another way to think about it is like imagine, we our thing wasn’t open. We had some agent hosting thing, but it’s not open and then there is an open one. if you’re. Which one’s gonna win in the long run? So like here, because there is this benefit from like people writing integrations, it’ll be, it’ll be that. And then there are other things that like you just can’t, even deliver as open source that are things the company does. Like for example, how do you make sure you’re like streaming, jobs or your Lakebase database doesn’t like, lose all your data at night? Well, that requires an operational team that’s gonna sit there. There’s no way it has to be a service. So like we wanna make sure as a company we’re really good at those infra services and then we’re as open as we can in terms of like what you build on top.

**Swyx \[00:11:42\]:** speaking from a benefits, I think we are already seeing pull requests

**Matei Zaharia \[00:11:45\]:** Yeah

**Swyx \[00:11:45\]:** of all kinds of ecosystem integration, even though it was only released on Saturday.

**Matei Zaharia \[00:11:50\]:** Yeah, Saturday. Yeah. So someone

**Swyx \[00:11:51\]:** Let’s see, let’s see what’s going on. Yeah, you can look at the merge ones. I asked Sam Nigon this morning about

**Matei Zaharia \[00:11:59\]:** 400 merge already?

**Matei Zaharia \[00:12:00\]:** Yeah. I think Recent quite, I would guess around half are not from our team. but for example, someone added support for running it on Kubernetesrnetes. people added, many cloud sandboxes, so this can launch a cloud sandbox and run your agent in there, which is great for sharing too, ‘cause it’s not, like, on your laptop and someone’s, like, running scary code on there. so yeah, many startups have put those in, and, we expect to see more of them. We also have more agent harnesses already. Cursor, CLI, and Antigravity also.

**Matei Zaharia \[00:12:34\]:** Yeah. That’s all, beautiful. And I, I feel like the last time this happens, there was the rise of the modern data stack.

**Matei Zaharia \[00:12:42\]:** I don’t know if it’s that useful. I’m, I’m curious in your postmortem.

**Matei Zaharia \[00:12:46\]:** I think most people

**Swyx \[00:12:47\]:** Agree

**Matei Zaharia \[00:12:47\]:** will agree that it is finally dead. but maybe this arises to a new modern AI stack that, like, does the same thing.

**Matei Zaharia \[00:12:52\]:** I don’t know.

**Reynold Xin \[00:12:54\]:** I think the modern data stack was a pretty useful thing, probably even up until this day. I think what, maybe for the audience who don’t understand the history, I think the modern data stack is effectively decomposed into you need a layer to ingest the data in, you need a layer to transform your data, and then all of this are run, and then you need a layer to maybe visualize your data. And all of this runs on some data warehouse, or later on, as we’re doing data warehouse or lakehouse.

**Reynold Xin \[00:13:21\]:** I think that concepts are all very powerful and very useful. They enable a lot of workloads. What people eventually run into is a question of unification and consolidation is, hey, do you really need to chop all this into different pieces and work with so many different vendors and platforms in order to get, like, a very simple visualization done, right? So I think, like, over time, everybody started realizing that customers are pushing us. We started, we can realize that, so we started building more and more capabilities and trying to consolidate. And at the end of the day now, customers don’t have to worry about having me hook up five different systems in order

**Matei Zaharia \[00:13:55\]:** Yeah

**Reynold Xin \[00:13:55\]:** produce a chart. But the. I think, honestly, something like this is probably happening, in how many different frameworks do you want to hook up together in order to produce, like do a very simple agent.

**Matei Zaharia \[00:14:06\]:** Just to be clear, I would say the core of this is this common API on top of all the harnesses. So the API is like, you’ve got an agent session, and you can send in a message or, like, a file. That’s what you can send in, and then you get out, these streams as it’s streaming text or as it’s doing tool calls. And, or the other thing you can send in is you can, like, tell it to cancel a turn. So that’s the API. Now, the thing we did is we could get you that on top of, like, cloud code running in a terminal, Codex, Py, OpenAI SDK, all that stuff. We map them all to that same interface. So that is something that you’d have to maintain yourself if you built your own, like, agent orchestrator, and then whenever cloud changes its API, you gotta, tweak your thing or it’s gonna lose some messages. So that’s the thing that’s valuable to maintain. Then on top of that, like, we built a few apps. I think we built a pretty cool UI and stuff, but that’s, And we built a security and control piece, which I’m excited about. But it’s that common interface, so we don’t. We. That doesn’t try to be a stack. And in fact, you could plug in your own UI on top of this, server. That, and that’s one of the use cases we care a lot about, ‘cause we want to use this in our own products.

**Swyx \[00:15:20\]:** Yeah. It should be everywhere.

**Matei Zaharia \[00:15:22\]:** Yeah.

**Swyx \[00:15:22\]:** I think one of those things that is really interesting to me is, like, well, first of all, I’ll, I’ll endeavor to do everything and not call it the modern AI stack because like it needs a different name.

**Matei Zaharia \[00:15:32\]:** Yeah.

**Swyx \[00:15:32\]:** But like, yes, like, so one of the first people that told me about compute, sandboxing was Nikita from Neon.

**Swyx \[00:15:39\]:** Because a lot of people think about Neon as like, well, it’s serverless Postgres with, like, the separation of compute and storage and, instant branching and all those things. But every database company is also a compute company.

**Matei Zaharia \[00:15:51\]:** Yeah. Yeah.

**Swyx \[00:15:52\]:** And so he was showing to me his whole, his sandboxing solution. I don’t think he have ever launched it.

**Matei Zaharia \[00:15:57\]:** So our sandbox solution, the reason we could build it so quickly was because we realized if you just take the actual Lakebase architecture

**Swyx \[00:16:05\]:** Yeah

**Matei Zaharia \[00:16:05\]:** and remove the database from it, by the coming from Neon

**Swyx \[00:16:08\]:** Exactly, right

**Matei Zaharia \[00:16:09\]:** you have this sandbox

**Swyx \[00:16:09\]:** Every database company has it already, yeah.

**Matei Zaharia \[00:16:11\]:** Now, there are some differences. For example, in the one to support this particular workflow, it’s important to have local persistence,

**Swyx \[00:16:19\]:** Yeah

**Matei Zaharia \[00:16:19\]:** because you want your state to persist. Your libraries, you don’t have to install your library every time, right?

**Matei Zaharia \[00:16:24\]:** whereas the Neon architecture, because of the separation of storage from compute, you don’t need persistent local disk.

**Swyx \[00:16:30\]:** Yeah.

**Matei Zaharia \[00:16:30\]:** So there’s some differences.

**Swyx \[00:16:32\]:** Yeah.

**Matei Zaharia \[00:16:32\]:** But the, at the end of the day, yeah, it’s, Yeah, so this is when you run, like, a coding sandbox. Like, if I use it, yeah, we have the dev env internally at Databricks. There’s, like, many, like, tens of gigabytes of data just for, like, all the source code and, like, artifacts and stuff that I built, and I want that to come back next time, so.

**Matei Zaharia \[00:16:51\]:** Yeah.

**Matei Zaharia \[00:16:51\]:** But yeah.

**Matei Zaharia \[00:16:52\]:** Before the show, we was talking about some statistics that might be surprising at the adoption.

**Matei Zaharia \[00:16:56\]:** It could be internal, it could be external, whatever comes to mind, just to impress people the scale this is happening.

**Swyx \[00:17:02\]:** So we, on the analytics side, I think we launched

**Reynold Xin \[00:17:06\]:** Maybe 50 or 60 million virtual machines a day across all three clouds, so we’re one of the biggest compute orchestrators out there.

**Reynold Xin \[00:17:13\]:** Stuff for sure for CPU compute.

**Swyx \[00:17:14\]:** Yeah.

**Matei Zaharia \[00:17:14\]:** Yeah.

**Reynold Xin \[00:17:15\]:** the. And all of this process, I think exabytes of data, I joked about depending on which time zone you are, typically before you have breakfast, Databricks would have processed exabytes of data already on that day. and on Neon, it’s pretty interesting, too. It’s launching, I think, 13 million databases

**Swyx \[00:17:34\]:** Yeah

**Reynold Xin \[00:17:34\]:** a day now.

**Swyx \[00:17:35\]:** Yeah, to me that was, like, a

**Reynold Xin \[00:17:36\]:** And that’s just like

**Swyx \[00:17:37\]:** Like, what do you mean?

**Matei Zaharia \[00:17:38\]:** Yeah. And that’s the point.

**Reynold Xin \[00:17:40\]:** And a lot of those were thanks to agent- agents and branching experimentation

**Swyx \[00:17:44\]:** Yeah

**Reynold Xin \[00:17:44\]:** because we made it so easy and so quickly, and thanks a lot to Nikita’s team, to launch databases. It’s, the. So it’s changing the way people use databases.

**Swyx \[00:17:54\]:** Yeah. Okay, we’re gonna go into more database talk in a bit, but I wanna make sure we close up anything on Omnigentt. you mentioned, you were excited about the security

**Swyx \[00:18:03\]:** control side.

**Matei Zaharia \[00:18:04\]:** Yeah.

**Swyx \[00:18:04\]:** a lot of companies are figuring that out right now, as well as the spend side.

**Matei Zaharia \[00:18:08\]:** Yep.

**Swyx \[00:18:09\]:** what have you found there?

**Matei Zaharia \[00:18:11\]:** Yeah, so I spent quite a bit of time talking to internal users, developers, security team, managers, and also lots of customers, and there’s a few things. Like, first of all, one thing, that immediately was. became obvious is for security, there’s this tension between, like, usability and security. And, the way people do. Like, a lot of coding agents today have very basic things like you can tell me which tool patterns I’ll allow or disallow or whatever. It’s like yes or no. But that puts you in a very tough spot. So just as an example, like, should my agent be able to read, some confidential documents, or let’s say, should it be able to install new packages from npm, which, maybe it’s compromised. Yes or no? Like, maybe I wanna allow it. Should my agent be able to publish stuff to the company website? Well, if I’m using it to code on the website, yes. But should it be able to do both, so it can, like grab a confidential document and be prompt injected and leak it? Probably not. So the thing we decided we need is stateful or what we call contextual policies where you keep track of the state of that session. It’s not like is it allowed to push to the marketing site or not, but, like, hey, if it did a risky thing, like it installed, a old package from npm, or it read, like, 1,000 confidential docs, then no. Then don’t, don’t do it. Otherwise, maybe it’s okay. That’s one example of, like, moving that trade-off so it’s both more secure and more useful by having a more powerful engine, essentially. This requires tracking sessions. The other piece that was interesting there is, like, there are these very level events it’s doing, and you want some libraries on top that parse them. Like, for example, we have a, MCP server on Google Drive internally. It’s got 60 API calls. like, how do I know which of those, like, will share a document with stuff on the internet and which ones won’t? It’s, it’s annoying. So we designed in Omnigentt the policy layer so that it’s functions and you can have libraries. Like, someone can make something that maps the level events to high-level ones, and then you write a policy about the high-level things that came out. so and that

**Swyx \[00:20:25\]:** This is related to the Panther,

**Matei Zaharia \[00:20:27\]:** Yeah, Panther is. will help with that. Panther

**Swyx \[00:20:30\]:** Yeah

**Matei Zaharia \[00:20:30\]:** a similar idea on the event processing side, and it’s Python-based versus a weird custom language. this is more, as in real

**Swyx \[00:20:39\]:** I didn’t even know we were good yeah.

**Matei Zaharia \[00:20:41\]:** Those things are happening, yeah.

**Swyx \[00:20:42\]:** Yeah.

**Matei Zaharia \[00:20:42\]:** So yeah, but these are the cool things. I think the contextual or stateful part, and then the way it can be libraries, and that was another reason to make it open source because others will write libraries and, like, we and our customers can use them. And the final thing, because it’s stateful, one of the states we track is how much you spent in that session. So I can. I’ve had, like, I ask an agent to debug something, and it spent $500 because it decided to read a lot of log files and burn a lot of tokens. but I can literally say, “Okay, launch a agent to do this and cap it to spending $5.” Like, ask me for permission if it needs more. And because we’re counting that within that session, it’ll pop up and tell me, “Okay, you spent five, $5. Do you wanna go on?”

**Reynold Xin \[00:21:27\]:** So important context here. Matei spent the last five years, a lot of his time was architecting Unity Catalog at Databricks

**Matei Zaharia \[00:21:34\]:** Yeah

**Reynold Xin \[00:21:34\]:** which is the governance layer for data.

**Matei Zaharia \[00:21:35\]:** That’s right, yeah.

**Reynold Xin \[00:21:36\]:** And he’s combining expertise at that layer together with all the AI governance he knows.

**Matei Zaharia \[00:21:41\]:** Yeah.

**Swyx \[00:21:41\]:** Do

**Matei Zaharia \[00:21:41\]:** But I also spent a lot of time being annoyed by coding agents and getting prompts.

**Matei Zaharia \[00:21:46\]:** And also as the

**Reynold Xin \[00:21:48\]:** All the above

**Matei Zaharia \[00:21:48\]:** I don’t want to end up on the front page as, like, I installed some weird npm package and leaked

**Swyx \[00:21:53\]:** Yeah

**Matei Zaharia \[00:21:53\]:** all the code, so I’m especially paranoid. But also I have very little time, so I don’t want to sit there approving, like, do you want to run a 20-line, bash script, yes or no? so that’s why I spend a lot of time figuring out, like, how can I make it as safe as possible and not annoying?

**Swyx \[00:22:10\]:** Yeah. Is safety and mmm, let’s call it security a bigger concern than token maxing or token budgets? which one is, like

**Matei Zaharia \[00:22:19\]:** Oh, yeah, they’re both there. I don’t know. I guess it depends on the type of company you are. So I think, some companies, like, the budget is, limited and, they really care about that

**Swyx \[00:22:34\]:** you can be Uber and still be concerned?

**Matei Zaharia \[00:22:36\]:** Yeah. Oh, yeah, totally. Yeah. If you have

**Reynold Xin \[00:22:38\]:** for us, security

**Matei Zaharia \[00:22:39\]:** Yeah

**Reynold Xin \[00:22:40\]:** super paramount.

**Matei Zaharia \[00:22:40\]:** For us, security is absolutely critical as a, cloud provider. It’s, it’s the most important thing, and, token maxing, we’re not so worried about it yet, but I’ve seen the Like, for example, I talked to some consulting companies. They have, like, 100,000 employees who are all coding for customers. If those each spend, like, an extra $1,000 a month, that’s, that’s not fun.

**Swyx \[00:23:04\]:** Yeah

**Matei Zaharia \[00:23:04\]:** we have, like, only a few thousand engineers.

**Swyx \[00:23:06\]:** What’s the policy in Databricks? Is it just unlimited or what’

**Matei Zaharia \[00:23:08\]:** It’s, it’s unlimited, but we do. we use our own product to, like, analyze the traces and stuff, and we have a team that’looking to optimize and to see if anyone’s doing something weird. And, we had some really cool insights just from analyzing current traces, like which

**Swyx \[00:23:24\]:** Yeah

**Matei Zaharia \[00:23:25\]:** models are better at, say, Rust versus like TypeScript or whatever. So yeah, at least in our code base.

**Swyx \[00:23:31\]:** Yeah. Amazing. Obviously, I have to ask the token question, obviously.

**Matei Zaharia \[00:23:34\]:** Yeah.

**Swyx \[00:23:34\]:** I think it’s

**Reynold Xin \[00:23:34\]:** Yeah

**Swyx \[00:23:34\]:** it’s a key thing. But yes, security and control above that, and figuring out a sane layer there you can have some autonomy, but, not too much.

**Matei Zaharia \[00:23:43\]:** Yeah. Yeah, and we wanna make it super easy. As a engineer, you should set a thing. So in Omnigentt, you can ask your agent, “Set a policy on yourself to do this.” So it can like

**Swyx \[00:23:52\]:** But if there’s something I should be showing

**Matei Zaharia \[00:23:53\]:** Yeah

**Swyx \[00:23:53\]:** I don’t, I don’t see it on the GitHub, but,

**Matei Zaharia \[00:23:55\]:** Oh, yeah

**Swyx \[00:23:56\]:** there’s just

**Matei Zaharia \[00:23:56\]:** Well, in the docs there’s something.

**Swyx \[00:23:57\]:** Yeah, this is it.

**Matei Zaharia \[00:23:58\]:** You can look at it later.

**Swyx \[00:23:59\]:** Okay. Yeah.

**Matei Zaharia \[00:23:59\]:** Just look in the docs

**Swyx \[00:24:00\]:** Yeah

**Matei Zaharia \[00:24:00\]:** contextual policies if you wanna see.

**Swyx \[00:24:04\]:** I just like to point people

**Matei Zaharia \[00:24:05\]:** look at the built-in policies.

**Swyx \[00:24:06\]:** Yeah.

**Reynold Xin \[00:24:06\]:** Yeah.

**Swyx \[00:24:06\]:** If you want to, follow up on this is exactly where to look, right?

**Reynold Xin \[00:24:10\]:** Yeah.

**Matei Zaharia \[00:24:10\]:** Yeah. yeah, and the story of these is, like, I just wrote, like, I wrote a doc with like 10 ideas for things before as you were working on them. Well, that was, like, my wish list of things people asked, and I told the team, like, “Hey, can you do like at least five of these for the launch?” And then they just got back with all of them, so.

**Swyx \[00:24:29\]:** Oh, wow.

**Matei Zaharia \[00:24:29\]:** so you can come up with more, but them- some of them are just meant to be examples. really you can intercept, like, any event the agent is making, and you can then either block or force it to ask the user or, like, allow, and you can update state to keep

**Swyx \[00:24:45\]:** Yeah

**Matei Zaharia \[00:24:45\]:** track stuff.

**Swyx \[00:24:46\]:** Yeah, ‘cause ultimately you’re, I think of you as, like, a systems designer.

**Swyx \[00:24:50\]:** You let people plug in, right? That’s the whole

**Matei Zaharia \[00:24:51\]:** Yeah

**Swyx \[00:24:52\]:** modus operandi of what you do.

**Matei Zaharia \[00:24:53\]:** Yeah.

**Swyx \[00:24:54\]:** It’s like

**Matei Zaharia \[00:24:54\]:** And we care a lot about also composab- like, can someone else write a library that others use, which

**Swyx \[00:24:59\]:** Yeah

**Matei Zaharia \[00:24:59\]:** this is meant to.

**Reynold Xin \[00:25:00\]:** There’s also a batteries included philosophy here

**Matei Zaharia \[00:25:03\]:** Yes

**Reynold Xin \[00:25:03\]:** probably very similar to how you did Spark, which is you could just start using.

**Swyx \[00:25:06\]:** Yeah.

**Matei Zaharia \[00:25:06\]:** Yeah, that’s right. It has to be good out of the box at certain things, and then you can build your own things on top that, like, we don’t wanna do. But in Spark, if you just wanna like, I don’t know, like read a table or do, like, a aggregation, it should be awesome at that out of the box.

**Swyx \[00:25:23\]:** Yeah. People wanna catch up on Omnigentt, they should watch your keynote.

**Swyx \[00:25:26\]:** they should go through the GitHub and the docs. If they wanted to contribute, or they want to build on this ecosystem what would you call out as the most high-leverage places get involved?

**Matei Zaharia \[00:25:36\]:** Yeah, do get involved in the Discord and in GitHub. Our team is there, is monitoring, and, some of the things people ask for we just built ourselves. Some of them, we’re, we’re collaborating with them to build it. and also tell us, like

**Swyx \[00:25:49\]:** Yeah, they’re gonna be very

**Matei Zaharia \[00:25:49\]:** how you would like to use it because I think especially for developers, like, everyone wants it to work their own way, and a really good developer tool, like you have to hear the feedback on all the ways and figure out the abstractions and how to let people customize. So we’d love to hear, like, if you think, “Hey, I, I don’t want it to work this way,” tell us. We really just wanna get that compatibility layer across agents and then let you do stuff on top.

**Swyx \[00:26:14\]:** Yeah. is there any, in terms of like the startup side, I’m, I’m a founder.

**Swyx \[00:26:18\]:** I want

**Matei Zaharia \[00:26:18\]:** Yeah

**Swyx \[00:26:18\]:** I see an opportunity, I wanna get in front of you. What’s your request for, like, a startup that, like, I wish someone

**Matei Zaharia \[00:26:23\]:** Oh, like you wanna integrate with us?

**Swyx \[00:26:24\]:** someone was working on this.

**Matei Zaharia \[00:26:26\]:** Oh, for a startup?

**Swyx \[00:26:27\]:** Yeah.

**Swyx \[00:26:28\]:** Like, your, you got your own startup. It’s doing well.

**Matei Zaharia \[00:26:30\]:** Yeah.

**Swyx \[00:26:30\]:** But like, if you weren’t working on your own startup, what is, like, obvious that you should You advise many startups too, obviously.

**Matei Zaharia \[00:26:37\]:** I do think, just as a company with a lot of engineers, like anything that helps me make sense of how people are using

**Swyx \[00:26:46\]:** Spend

**Matei Zaharia \[00:26:46\]:** coding agents and,

**Swyx \[00:26:48\]:** Yeah. Analytics

**Matei Zaharia \[00:26:48\]:** spend, but also quality or like you should write, you should add this skill, or you should write this thing, or your agents are really horrible at tasks involving this service, so I go spend time. That would be nice. yeah.

**Swyx \[00:27:00\]:** Yeah. The closest I’ve found is, this team, GitAI.

**Matei Zaharia \[00:27:03\]:** Oh, cool. Yeah.

**Swyx \[00:27:04\]:** They started with, like, we will just do, code and human attribution, but they’re building the analytics layer on top of that.

**Matei Zaharia \[00:27:12\]:** Yeah.

**Swyx \[00:27:12\]:** I do think, like, there are a bunch of, like, artificial analysis is obviously,

**Matei Zaharia \[00:27:18\]:** Yeah, they have their benchmarks

**Swyx \[00:27:18\]:** doing super well

**Matei Zaharia \[00:27:19\]:** Yeah

**Swyx \[00:27:19\]:** with their stuff. so there’s, there will be people. I think this is like the domain of consultants first, but then people

**Matei Zaharia \[00:27:26\]:** Yeah

**Swyx \[00:27:26\]:** will build software that, let’s say, it’s kinda like the management plane

**Matei Zaharia \[00:27:29\]:** Yeah

**Swyx \[00:27:30\]:** for coding agents.

**Matei Zaharia \[00:27:30\]:** Yeah, I think there’ll be a lot of insights there. You have it in other areas.

**Swyx \[00:27:34\]:** Okay. Well, and then the other, big thing is your dream engine.

**Swyx \[00:27:39\]:** maybe you wanna tell the story of, LTAP.

**Reynold Xin \[00:27:45\]:** So, and background with. I’m, I’m gonna make people listen to our Ankur Goyal episode where we talked about SingleStore, HTAP

**Matei Zaharia \[00:27:52\]:** Yeah

**Reynold Xin \[00:27:52\]:** and all that history.

**Matei Zaharia \[00:27:52\]:** Yeah. The LTAP idea is pretty simple. so if people have heard of the, Ankur’s, talk about HTAP, it’s effectively the world of databases. Sorry, there’s like maybe a lot of context needs to be injected here. The world of databases

**Swyx \[00:28:06\]:** I am happy to be the database podcast that I’m forcing people to, like, learn your databases, guys.

**Swyx \[00:28:11\]:** You cannot vibe code with just markdown files.

**Reynold Xin \[00:28:13\]:** Yeah.

**Swyx \[00:28:13\]:** Like,

**Reynold Xin \[00:28:14\]:** It’s one of the most important fundamental systems technologies out there. But the world of database effectively split into roughly two halves. There’s what we call OLTP databases, which are transactional, and think of your Postgres, your MySQL, your Oracle databases, and the other side is what we call analytics, and sometime might refer to term OLAP. And the difference is on OLTP, you typically have maybe run some transaction on some event that looks up at one specific row. We update that row, right? It’s a very oriented data structure. And on analytics, you’re trying to reason on the data. You’re trying to compute, “Hey, what’s my revenue per store? What’s my. How’s my website doing every day?” And then you, eventually want to probably end up running anal- machine learning on it to predict, “Hey, how will my maybe sales be going in the future?” they are so very different architecture, and everybody start with OLTP databases. Every app, when you become serious enough, that needs more than markdown files, you need to have a database. You want to lose your data, you want to have some transactional consistency. But once you want to reason on the data, if you only have like- A hundred rows, it’s probably okay to run it on your Postgres or your own, your MySQL database. But once you have more data and want to run more complicated analysis, the very analysis might crush your Postgres database. So you start doing, getting data out of the OLTP database

**Swyx \[00:29:35\]:** Replication.

**Reynold Xin \[00:29:36\]:** Replicate them into the analytic systems and just start

**Swyx \[00:29:39\]:** Yeah, which for people, Elasticsearch is, like, a

**Reynold Xin \[00:29:42\]:** Yeah. So some of them get into Elasticsearch for, like, blocked analysis. A lot of our customers obviously get into Databricks to run more sophisticated things.

**Swyx \[00:29:51\]:** Yeah.

**Reynold Xin \[00:29:51\]:** And there’s this term called CDC, which

**Matei Zaharia \[00:29:54\]:** Change data capture

**Reynold Xin \[00:29:55\]:** change data capture. and what it does, it reads the binlog of the database, and if you don’t understand what binlog is, it’s fine. The, but it’s a little delta of the data, and it reconstructs based on the delta, the state of the database, on the analytics side. But CDC is, like, a very painful thing. It’s how standard in the industry, everybody uses it, but, it ends up being. I think many data engineers ends up being waken up at, like, 3:00 a.m, because there’s some pipeline thing.

**Swyx \[00:30:22\]:** my explanation is, like, Airbyte is like a, became a $5 billion company just doing CDC.

**Reynold Xin \[00:30:27\]:** Yeah, exactly.

**Reynold Xin \[00:30:28\]:** CDC is, like, a very

**Matei Zaharia \[00:30:30\]:** It’s hard.

**Reynold Xin \[00:30:30\]:** It’s one of the most boring but one of the most fundamental operations, like, powering modern society.

**Matei Zaharia \[00:30:37\]:** huh.

**Reynold Xin \[00:30:37\]:** But it’s so brittle that, we joke that it’s, should be called continuous data corruption, because you might change your schema on your OLTP database, and then the CDC pipeline fails to handle

**Swyx \[00:30:48\]:** Yeah

**Reynold Xin \[00:30:48\]:** the schema change.

**Swyx \[00:30:49\]:** Yeah.

**Reynold Xin \[00:30:49\]:** And then everything goes out.

**Swyx \[00:30:51\]:** And there’s all sorts of tricks that you can do, like, you add in, like, some versioning or whatever, but yeah.

**Reynold Xin \[00:30:55\]:** Yeah, but it’s a very, in general, very complicated. Like, I think at my keynote, I asked the audience put up their hand if they love their CDC pipeline. Only, like, maybe two people put it up. So if single store, like, about maybe a decade ago, I think the industry had this idea, hey, what if I built a single database that can handle both workloads? Now I don’t.

**Swyx \[00:31:12\]:** Which, like, by the way, every database person ever has ever always dreamed about this.

**Reynold Xin \[00:31:15\]:** Yes. Yes.

**Reynold Xin \[00:31:16\]:** This is the holy grail of database engineering is why not build a single system that can do both of this? But it ends up just being a lot of compromises. one, I think one of the first issue is that, hey, each. they say Postgres has a massive ecosystem, right? You want to be using the tools that’s built for Postgres. And Spark, for example, had a massive ecosystem. There’s a lot of libraries you want to use. If you were to create now a new thing, you don’t have a ecosystem. You tend to create a new, smaller proprietary API, and you’re lacking both, and it’s also very difficult to make it performance-wise to be, comparable on either side. So it ends up being sucking on both. And our whole idea of LTAP, it’s obviously a wordplay on the term HTAP, is that we think this is HTAP done right. HTAP wants to build a single engine for both. We think you can get 99% of what you need by unifying the storage, and just have a single storage layer. And once you have the single storage layer, if your Postgres databases are writing data in a column-oriented format, everything analytics can just go read that data directly without any delay, right? There’s no pipeline in between, so all the data will immediately be available for reasoning analytics. I think I was telling some customers earlier, hey, when we talked about this is gonna be super useful for agents, I at first didn’t really believe in it myself, even though we wrote that positioning.

**Matei Zaharia \[00:32:39\]:** Yeah.

**Reynold Xin \[00:32:40\]:** But then last night I was having dinner with a Australian customer, and they told me, “Oh, hey, one of the big issue we have is we have all these logs from our services, and we see SLA dips and want to investigate. But then there’s no way for those agents to even understand what’s going on in the actual databases themselves. All we see is just, like, product telemetry of the database and the services.” It would make those agents 10 times more powerful if understand, for example, who’s placing those orders, what is happening, what exactly are they doing. So now I’m sold on our own message.

**Swyx \[00:33:13\]:** Yeah.

**Reynold Xin \[00:33:14\]:** I think it’s really. It gets you the almost all of the benefits of the HTAP holy grail, which is, hey, make the data available immediately for reasoning analytics

**Swyx \[00:33:26\]:** Yeah, I think,

**Reynold Xin \[00:33:27\]:** without compromise

**Swyx \[00:33:28\]:** in the way that humans are generally intelligent and want to have the ability and access to query anything

**Reynold Xin \[00:33:34\]:** Yeah

**Swyx \[00:33:35\]:** while they do the work, they also need history and need context.

**Swyx \[00:33:38\]:** And, like, where else does they get context? That’s it’s an analytical workload.

**Reynold Xin \[00:33:41\]:** Exactly.

**Matei Zaharia \[00:33:42\]:** Yeah. Yeah. And I remember when we had incidents with our databases and engineers said, “Well, I can’t just run a giant query on it to see what’s going on because that’s gonna bring down the database and hoard it even more.” Like, that’s the stuff that this gets rid of, because you spin up a whole separate fleet of machines that’s doing the analytics. You’re not overloading, like, the main database

**Reynold Xin \[00:34:02\]:** Right

**Matei Zaharia \[00:34:02\]:** that’s still trying to serve stuff.

**Reynold Xin \[00:34:04\]:** Yeah.

**Matei Zaharia \[00:34:04\]:** Yeah.

**Swyx \[00:34:05\]:** So this has been a dream for a while. what had to get done in order to get to today? Like,

**Reynold Xin \[00:34:11\]:** Yeah.

**Swyx \[00:34:11\]:** I feel like, you have announced variants of this several times, but it wasn’t as clear as LTAP.

**Reynold Xin \[00:34:18\]:** Yeah.

**Swyx \[00:34:18\]:** I think LTAP is like Like, okay, we’ve got it, guys.

**Matei Zaharia \[00:34:21\]:** This thing, yeah.

**Reynold Xin \[00:34:21\]:** I was talking to somebody at Meta, and then he was asking me, “Hey, what’s the catch? Why is it possible now?” And I think the reality is we took a lot of time to work on the Lakebase architecture. obviously a lot of it came from the Neon team, which is a separation of storage from compute. And it turned out it was just a tiny little step away going from that to this LTAP idea, which is, hey, we just. in the Neon architecture and in Lakebase architecture, we’re writing data in oriented format to the open data lake, but in there we’re writing in Postgres pages. Ali and I were spending a lot of time debating, hey, can we just change that to write in column-oriented format? And we’re just debating, and one day, one of our engineers who’s, like, super smart came in, he’s like, “Hey, I just prototyped it. It works.”

**Swyx \[00:35:07\]:** Wait, it’s, prototype what?

**Reynold Xin \[00:35:09\]:** Prototype, instead of storing the data in the data lake in the oriented format

**Swyx \[00:35:15\]:** Column

**Reynold Xin \[00:35:15\]:** like Postgres pages

**Swyx \[00:35:15\]:** Yeah

**Reynold Xin \[00:35:16\]:** write them in Parquet.

**Swyx \[00:35:17\]:** Yeah.

**Reynold Xin \[00:35:18\]:** and he just made the observation that, hey, our storage fleet has a lot of extra idle CPUs And we could use those CPUs to do the transcoding from row to column, where row is good for OLTP, but column is good for analytics. so let’s do that transcoding at that time. And as a matter of fact, once you transcode the data compresses better. So from those services writing to, for example, S3 or other data lake, like object stores, you can write them faster ‘cause now they are now smaller.

**Matei Zaharia \[00:35:49\]:** Yeah.

**Reynold Xin \[00:35:49\]:** So there’s no overhead, it’s no compromise in performance

**Matei Zaharia \[00:35:52\]:** Some CPU overhead.

**Swyx \[00:35:54\]:** Yeah, because,

**Matei Zaharia \[00:35:55\]:** Yeah

**Swyx \[00:35:55\]:** we had extra CPUs anyway.

**Matei Zaharia \[00:35:56\]:** We had that fleet anyway, yeah.

**Swyx \[00:35:57\]:** so the debate ended. it’s one of the classics of, tech, issue of a lot of debate, but then somebody went ahead and just tried to prototype it and it worked.

**Matei Zaharia \[00:36:06\]:** But, like, something this strategic

**Swyx \[00:36:07\]:** That’s right

**Matei Zaharia \[00:36:07\]:** and important to the company, I expect there to be, like, a kickoff thing, like a design doc. Nothing like that.

**Swyx \[00:36:13\]:** Nothing like that.

**Swyx \[00:36:14\]:** He just. We were debating in many meetings

**Matei Zaharia \[00:36:17\]:** Yeah.

**Swyx \[00:36:17\]:** and then we’re just debating whether it’s possible or not from first principle.

**Matei Zaharia \[00:36:20\]:** Yeah

**Swyx \[00:36:20\]:** and then, somebody just did it.

**Matei Zaharia \[00:36:23\]:** Yeah, if you set yourself up so people do that’ll be great. And that happened a bit with Omnigentt too. I think if I just had a doc on, like, we can make these together, everyone would, would think, “Oh, what about this? What about this?” But then you. if you try it out, it helps. And then if you have real users and they bash it and, like, it’s still working, or in this case, if you have the workload, what the workload looks like, you can just test the same pattern then.

**Swyx \[00:36:47\]:** Yeah.

**Matei Zaharia \[00:36:47\]:** Yeah.

**Swyx \[00:36:47\]:** Tech aside, which is very cool, this is, like, the most important thing, the culture of innovation, and you don’t have to ask my permission, you don’t have like, do a whole form- formal process, just do it?

**Matei Zaharia \[00:36:59\]:** Well, especially these days, I think with

**Swyx \[00:37:01\]:** Yeah

**Matei Zaharia \[00:37:01\]:** AI, it’s easier to build

**Swyx \[00:37:02\]:** But so, like

**Matei Zaharia \[00:37:03\]:** a prototype

**Swyx \[00:37:03\]:** I think you are very I made a lot of suite of, like, large companies and, like, I think that at scale, things slow down, and I’m sure you felt it already, but somehow you have this core of people that, like, are exempt. How? I think we hire and we work with really good people, and that’s a very important part of it, and empowering them, but also spending a lot of time, maybe us in the trenches matter a lot also.

**Matei Zaharia \[00:37:28\]:** Yeah, I think, I think first, people can adapt to being in the larger company, so that helps. And we wanna make sure they know that they can try stuff and settle debates and have a lot of examples of how it was done before, or launch a thing in beta or whatever. and then the other thing I do think as a company, like despite the size, we don’t launch that many, like, products. We try to keep it pretty coherent. That’s, that was the whole, like, theory of the company, was like instead of having, like, 20 Amazon services you need to set up, like a analytics and machine learning stack, you just have one, and it’s, like, the same API, the same semantics across all of them, the same copy of the data. So that requires, like, unification. And then we added one more thing at a time. Like, we added storage with Delta Lake. We didn’t used to do any storage. Then we added SQL, we added, machine learning platform stuff. So, but yeah, don’t, don’t do too many, but do those things well and, that also helps, it helps keep it manageable.

**Reynold Xin \[00:38:33\]:** Yeah. The other thing we encourage a lot is instead of building, boil the ocean for everything, let’s figure out how do we do it incrementally, how do we do it very quickly. Like, many of our products

**Matei Zaharia \[00:38:43\]:** Yeah

**Reynold Xin \[00:38:43\]:** they’re built in the span of weeks, and then we go to, hey. Like, usually my first question to whoever team is building is who’s the target customer? Who are you working with? Are you on a first-name basis with them? Are you texting with them? I think having that very tight loop,

**Matei Zaharia \[00:38:59\]:** Can you bring up another launch that comes to mind when, in this thing? I just want to give examples.

**Reynold Xin \[00:39:04\]:** Omnigentt itself happened that way.

**Reynold Xin \[00:39:05\]:** Yeah.

**Matei Zaharia \[00:39:06\]:** Who’s the customer? That’s a good one

**Reynold Xin \[00:39:34\]:** storage layer we did. we had, our largest customer at the time said like, “Okay, I need some. I want something in the cloud ‘cause, I. if the rest of our network is compromised, like this thing needs to be separate to store and query the events.” And then, talked to us, he said, “Okay, this is the rate of events per second. This is, like, the freshness I want. Can you do it?” So that was, like, way larger than any workload we had, and we had our, engineer, working on that, Michael Armbrust, and he worked just to make this work. And once it worked for them, it worked for everyone else. Yeah. This was early in the company, probably like four years in or something.

**Matei Zaharia \[00:40:24\]:** 20- 2018?

**Swyx \[00:40:26\]:** Yeah, ‘17, ‘18.

**Matei Zaharia \[00:40:28\]:** Few companies

**Swyx \[00:40:28\]:** Do you have other examples?

**Matei Zaharia \[00:40:30\]:** there’

**Swyx \[00:40:31\]:** Maybe you have others

**Matei Zaharia \[00:40:31\]:** yeah, Clean Room, which is how you share data in a way without sharing

**Swyx \[00:40:35\]:** Yeah

**Matei Zaharia \[00:40:35\]:** underlying data, but you allow specific operations. Those were done effectively initially just for two customers. I think the industry has a sense of, hey, maybe if you overfit to, like, one or two customers, it’s gonna be really bad for you. But I think the, downside of overfitting is much smaller than the upside itself. And if you try to be too ambitious and boil the ocean, it’s a much bigger problem.

**Swyx \[00:40:58\]:** Yeah. Yeah.

**Matei Zaharia \[00:40:58\]:** ‘Cause you might end up having no customer.

**Swyx \[00:41:00\]:** Yeah, that’s more, that’s the more likely outcome.

**Matei Zaharia \[00:41:02\]:** Yeah.

**Swyx \[00:41:03\]:** than you can pivot from there. I do think there is such a thing as a bad customer that sometimes you should fire. Yeah.

**Matei Zaharia \[00:41:08\]:** They could exist sometimes if you drive. well, one of the challenge I think we probably see, and maybe many AI, so newer generation companies are seeing is, so tech companies are very different from tech companies or traditional enterprises.

**Swyx \[00:41:22\]:** Yeah.

**Matei Zaharia \[00:41:22\]:** And, if you optimize everything just for tech companies, you might have various challenges

**Swyx \[00:41:27\]:** Oh

**Matei Zaharia \[00:41:27\]:** scaling them outside of tech companies.

**Swyx \[00:41:28\]:** Okay, what like

**Matei Zaharia \[00:41:30\]:** Yeah

**Swyx \[00:41:30\]:** what like top three differences that you always think about?

**Reynold Xin \[00:41:33\]:** Governance is a big one

**Matei Zaharia \[00:41:34\]:** I think, yeah, a big one is like, yeah, security, data privacy, governance, all that stuff. So usually if you’re building some kinda like B2B or developer tool, like your biggest market is gonna be enterprises, but it’s just very different. A company that’s existed for like, it’s had some form of IT for like 30 years, they have so many legacy systems or they operate in a regulated space. whereas a startup or, even like a, like sorta more recent tech company, all the. everything is new and pristine. So yeah, it’s just different, and if you’ve never worked with enterprises or been in one, you just won’t know about it.

**Reynold Xin \[00:42:13\]:** Yeah.

**Matei Zaharia \[00:42:13\]:** Yeah.

**Reynold Xin \[00:42:13\]:** And the procurement process is probably quite different. There’s far more stakeholders.

**Matei Zaharia \[00:42:17\]:** Yeah, that is one. Yeah.

**Matei Zaharia \[00:42:18\]:** Another piece that’s interesting is I think some tech companies, people, will say, “Oh, I can build that myself,” right? I’ll just build that myself.

**Matei Zaharia \[00:42:27\]:** So then you go,

**Reynold Xin \[00:42:28\]:** I don’t think people say that about Databricks, but

**Matei Zaharia \[00:42:31\]:** yeah, it depends

**Reynold Xin \[00:42:32\]:** They do.

**Matei Zaharia \[00:42:32\]:** They do?

**Matei Zaharia \[00:42:32\]:** Yeah, the. Yeah, and it depends on the teams and things. So, but, on the other hand, like many of the enterprises say, “I don’t, I never wanna be in the business of building that.” Like, I don’t want my, whatever, I’m a retailer or something, I never wanna

**Reynold Xin \[00:42:45\]:** Yeah, sell clothes,

**Matei Zaharia \[00:42:46\]:** be down because like some weird like nerd like couldn’t get streaming pipelines working.

**Matei Zaharia \[00:42:51\]:** That is not what I’m doing.

**Reynold Xin \[00:42:53\]:** Yeah.

**Reynold Xin \[00:42:53\]:** Yeah. This makes them great customers, to be honest, right?

**Matei Zaharia \[00:42:55\]:** Yeah. But you have to understand that it’s hard without having worked there and stuff, like you may not appreciate.

**Reynold Xin \[00:43:01\]:** Look, I think they’re all great. don’t get me wrong, they have different challenges. But the, many of the tech companies, for sure there’s a lot, far more DIY.

**Matei Zaharia \[00:43:10\]:** On the flip side, you have people who are. they’re very much experts in their domain, like they’re building airplanes, they’re, designing medicines, whatever, and they just want to bridge the technology, where like they don’t wanna learn, databases or whatever. As cool as we think it is, even as interesting as the average software engineer might think it is to read a little bit, like they just never wanna know. They just say, “I have a, giant like, matrix or whatever with my, clinical data, like how do I, how do I like cluster it or whatever?” So yeah.

**Reynold Xin \[00:43:40\]:** Yeah. That’s true. Okay, so and then I wanted to build out the dream engine, vision. where does this all lead? So one of the thing we, realized maybe a couple years back is that every single database engine out there, especially on the analytics side, are a decade old. pretty much everything that have reasonable traction are about a decade old. And they all started targeting some very specific narrow use cases, and then over time it’s become more and more successful. They have grown in their ambition, and then they try to support more and more use cases. But the fastest way to support those use cases tend to be hacked around the abstractions that were initially created, that were not for those use cases.

**Matei Zaharia \[00:44:23\]:** Yeah.

**Reynold Xin \[00:44:23\]:** And then, but you can support them more or less okay. And before it, after 10 years of organic evolution that way, it becomes a gigantic pile of shit.

**Reynold Xin \[00:44:31\]:** the. And, but that includes Databricks. And very few company or very few systems, I think, have the gut to say, let’s go start from scratch. Let’s go back to the drawing board and design, knowing everything we know today after a decade of workloads and probably billions in revenue, let’s attempt to rewrite it from scratch and make sure it will work and it can support all of these use cases. So we started doing that, but it’s a very ambitious project. by the way, you can search on Wikipedia, there’s this thing called second system syndrome.

**Matei Zaharia \[00:45:08\]:** Yeah, I know that. Yes.

**Reynold Xin \[00:45:09\]:** Or second system effect.

**Matei Zaharia \[00:45:11\]:** Every developer must know what a second syndrome is.

**Reynold Xin \[00:45:12\]:** It’s you built your first thing and it works out great, and the second one’s bound to fail because you become too ambitious.

**Reynold Xin \[00:45:19\]:** And then you ask so many requirements.

**Matei Zaharia \[00:45:20\]:** Or like you think everything

**Reynold Xin \[00:45:21\]:** Yeah

**Matei Zaharia \[00:45:21\]:** and then you’re like

**Reynold Xin \[00:45:22\]:** You just

**Matei Zaharia \[00:45:22\]:** you’re, “I’m gonna design the perfect system this time.”

**Reynold Xin \[00:45:24\]:** Yeah. And it turned out it’s not perfect, and then it start failing and you’re too ambitious, never launch, and you get killed. The, and the engineering team that started this, they were brilliant. I think we hired some of the best database engineers, on the planet into Databricks, and they were brilliant. Thank God it’s not their second system. Many of them have built more than two in the past.

**Matei Zaharia \[00:45:44\]:** Ah, nice.

**Reynold Xin \[00:45:45\]:** But they were still worried about this, hey, building a database engine from scratch, I think the conventional wisdom is gonna take like five years to mature. This would be a very long-term project. It could fail. I think one of the engineers jokingly said, “Hey, maybe we just call it Reynolds Stream Engine.” If we name after a founder, maybe we then may get canceled or killed. But I think they built something pretty remarkable. they went back to. They changed the way the database engines were built from a paradigm point of view. Usually when you build a database engine, you read a lot of academic papers, you try to understand what are the latest algorithms and data structures, and you put them together and see if they work or not. And there’s a high risk of failure there also because whatever that looks really good on paper might work out. might look really good in 70% of the workloads, but then it backfires on the other 30%. they went build a more of a factory for building the database. So they spent more time building this factory, and the factory takes the decade of traces we have. I think they count as like quadrillion data points in the trace table.

**Matei Zaharia \[00:46:47\]:** You don’t drop anything? Or you see sample?

**Reynold Xin \[00:46:49\]:** We for sure sample,

**Matei Zaharia \[00:46:50\]:** Yeah

**Reynold Xin \[00:46:51\]:** the, there’s like massive amount of things. And the, and they use that to build a model, like a machine learning model. Not an AL, a machine learning model. Machine learning model it can very quickly tell us how any algorithm and how any implementation would perform for any specific type of queries with very high fidelity. And based on that, they can, pick the most likely algorithm and data structure that will help with the different kinds of workloads.

**Reynold Xin \[00:47:21\]:** Both at runtime as well as at implementation time.

**Reynold Xin \[00:47:25\]:** Because there’s like unlimited number

**Matei Zaharia \[00:47:27\]:** it sounds like you want to like route to different data structures

**Reynold Xin \[00:47:31\]:** Yeah. if you think about

**Matei Zaharia \[00:47:32\]:** This is not one database

**Reynold Xin \[00:47:33\]:** a single database has many things implemented

**Matei Zaharia \[00:47:36\]:** Yeah

**Reynold Xin \[00:47:36\]:** together. But you want to make sure they all work well

**Swyx \[00:47:39\]:** Yeah

**Reynold Xin \[00:47:39\]:** with each other, and then for any given operation, there might be more than one implementation, so we make it run really. reality is things, algorithms that work super well, for example, for very low latency might not work very well for, say, scanning through petabytes of data.

**Swyx \[00:47:54\]:** Yeah.

**Reynold Xin \[00:47:54\]:** Right? most often there’s a trade-off there between throughput and latency.

**Swyx \[00:47:58\]:** What are the key dimensions like scale, throughput, latency? What

**Reynold Xin \[00:48:01\]:** Yeah, scale

**Swyx \[00:48:02\]:** anything else?

**Reynold Xin \[00:48:02\]:** and the distribution of data.

**Swyx \[00:48:05\]:** Yeah.

**Reynold Xin \[00:48:05\]:** Right? How sparse the data is.

**Swyx \[00:48:06\]:** How hard

**Reynold Xin \[00:48:06\]:** That matters

**Swyx \[00:48:07\]:** Yeah

**Reynold Xin \[00:48:07\]:** very a lot. how frequently do you hit the same data?

**Matei Zaharia \[00:48:10\]:** Yeah, how many distinct values

**Reynold Xin \[00:48:12\]:** Yeah

**Matei Zaharia \[00:48:12\]:** and stuff like that.

**Reynold Xin \[00:48:13\]:** Those things matter a lot.

**Matei Zaharia \[00:48:14\]:** Yeah.

**Reynold Xin \[00:48:14\]:** Like number of distinct value impacts the memory consumption of your aggregation, your hash. Like at some point there’s a hash table.

**Swyx \[00:48:20\]:** Somebody, I’m gonna, in my write-up, I’m gonna try to list all this out because I really want a taxonomy. To me, taxonomies

**Matei Zaharia \[00:48:25\]:** huh

**Swyx \[00:48:25\]:** are so helpful because it covers everything that you should think about.

**Reynold Xin \[00:48:29\]:** I think if you try to list it out, probably like a million different features.

**Swyx \[00:48:32\]:** I always want like, okay

**Reynold Xin \[00:48:35\]:** It’s not a trivial

**Swyx \[00:48:35\]:** give me like 12. Give me.

**Swyx \[00:48:38\]:** like a, someone did, like I think a Oracle paper in like 40 years ago did like the, these are the eight fallacies of distributed systems.

**Reynold Xin \[00:48:45\]:** Yeah.

**Swyx \[00:48:45\]:** Right? That thing is super useful.

**Matei Zaharia \[00:48:46\]:** Yeah, it is.

**Swyx \[00:48:46\]:** It’s like, okay, think through these eight.

**Reynold Xin \[00:48:48\]:** But let me give you a very, weird example, but it has profound implication on performance, which is like is your string just ASCII or does it have Unicode in it? How should you encode it?

**Swyx \[00:48:59\]:** Strings, strings are the most complex data types.

**Reynold Xin \[00:49:01\]:** Yeah. So the. And that, like for example, if string is super dense, you could convert every string into a, like imagine you have to do a aggregation. Instead of having a hash table, you could have an array. Because if your string is dense enough, if you only have 256 options, you don’t need a hash table. You can just do array

**Swyx \[00:49:21\]:** Yeah

**Reynold Xin \[00:49:21\]:** lookup.

**Swyx \[00:49:21\]:** Yeah.

**Reynold Xin \[00:49:22\]:** and that’ll be far fast.

**Matei Zaharia \[00:49:23\]:** Yeah, if the string is like a country code or something.

**Reynold Xin \[00:49:25\]:** Yeah.

**Matei Zaharia \[00:49:25\]:** Yeah.

**Reynold Xin \[00:49:26\]:** So it’s like probably millions of, features in that model. But using that, they can, one, prioritize the different algorithms that might impact in practice. And many of them are very counterintuitive. These are naturally things that you think, hey, might work super well, don’t work that well in practice. But also more importantly at runtime, you can dispatch the right algorithm and structure.

**Swyx \[00:49:47\]:** I’m listening to the dream. I feel like Databricks is doing a really good job of the incremental evolution. Do you have to hard cut to a new system at any point? Or like,

**Reynold Xin \[00:49:58\]:** We designed it in a way that it can be incremental.

**Swyx \[00:50:00\]:** Yeah.

**Reynold Xin \[00:50:00\]:** So first we’re releasing a new endpoint. but this goes to the broader ocean versus. what we wanted to do is wanted to by design, this new engine should be able to do everything we’re able to do before and better, right? It’s been particular, the better part refers to very low latency workloads that can finish in 10s of milliseconds. But we want to roll it out incrementally with incremental capabilities so it doesn’t take like five years to see the light at the end of the tunnel.

**Swyx \[00:50:29\]:** I think that’s a heroic task. I don’t know what other way to say it. I am really interested in any new workload and new databases. obviously I think, if a, I’ve maybe established that I’m a little of a database nerd. The transactional databases, sorry, the accounting databases, like the Tiger Beetles I don’t know if you’ve, seen those.

**Reynold Xin \[00:50:50\]:** What do they do?

**Swyx \[00:50:51\]:** Dual entry accounting database. Like it’s just meant to really model like financial accounts or credit systems

**Reynold Xin \[00:50:56\]:** Oh, I see.

**Reynold Xin \[00:50:57\]:** it’s like a very specific problem.

**Swyx \[00:50:58\]:** Very high throughput. Yeah.

**Reynold Xin \[00:50:59\]:** Yeah.

**Swyx \[00:51:00\]:** Yeah. No, so when you were talking about how everyone like starts with

**Matei Zaharia \[00:51:02\]:** Yeah

**Swyx \[00:51:02\]:** a thing and then they

**Reynold Xin \[00:51:03\]:** Oh, I see

**Swyx \[00:51:03\]:** they scale up and then they tack on other things. It’s exactly that.

**Swyx \[00:51:06\]:** And then, I recently interviewed Simon from TurboPuffer.

**Reynold Xin \[00:51:08\]:** Yeah.

**Swyx \[00:51:09\]:** Same thing.

**Matei Zaharia \[00:51:09\]:** Yeah.

**Swyx \[00:51:09\]:** Like, well, and Chroma as well, like the, all the vector database companies of 2023

**Reynold Xin \[00:51:14\]:** Yeah

**Swyx \[00:51:14\]:** all are suddenly now just, we’re just generalist, general storage, like blob storage.

**Matei Zaharia \[00:51:18\]:** Yeah.

**Reynold Xin \[00:51:18\]:** Vector database should have never been a separate category.

**Swyx \[00:51:21\]:** I think it used to be a hot take, now it’s like the conventional wisdom nowadays. What should be a separate category? if everything becomes LTAP, like what’s.

**Reynold Xin \[00:51:31\]:** I think the thesis of LTAP is we’re not collapsing the databases at the actual query layer. We’re just collapsing

**Swyx \[00:51:37\]:** Indexing layer

**Reynold Xin \[00:51:38\]:** the storage layer.

**Swyx \[00:51:38\]:** Yeah.

**Reynold Xin \[00:51:39\]:** and that’s a, I think, a very important part. And we don’t think it makes sense to collapse the query layer into a single, like HTAP style database. And part of it. By the way, the other thing I think a lot of people had is, hey, it would be nice if there’s only one query language I have to worry about. Instead of worrying about Postgres and maybe Spark SQL, why not just one? But I don’t think that’s an issue for agents. Agents are very eloquent in Postgres or Spark SQL. It’s never gonna get confused. As long as the data is there and it’

**Matei Zaharia \[00:52:10\]:** Yeah

**Reynold Xin \[00:52:10\]:** accessible, agents will do fine. That might have been,

**Matei Zaharia \[00:52:14\]:** Yeah,

**Reynold Xin \[00:52:15\]:** five years ago might have been a problem for humans.

**Matei Zaharia \[00:52:17\]:** That could arise over time also, but it should. And this is, leads to how to do things incrementally, right? Like we realize you don’t need it right now. We don’t need to solve that problem to have a lot of value, from the current LTAP.

**Swyx \[00:52:30\]:** Yeah. Okay. I’m gonna end the pod with a little bit of more of spicier things.

**Swyx \[00:52:37\]:** everyone has like, had to receive within a separation of storage and compute and try to build, the clouds. I had the same pitches from Snowflake.

**Swyx \[00:52:47\]:** How have you succeeded where they failed?

**Swyx \[00:52:50\]:** That’s rough.

**Reynold Xin \[00:52:52\]:** Well,

**Swyx \[00:52:52\]:** respecting that they are a competitor

**Reynold Xin \[00:52:54\]:** Yeah

**Swyx \[00:52:55\]:** objectively you have outpaced them. What is the core insight from your point of view that you guys just went different directions?

**Reynold Xin \[00:53:03\]:** Probably the biggest fundamental difference, both companies started around the same time, both went to the cloud, both focused on storage from compute architecture. But the biggest difference, one is, open. Like Databricks had never had the proprietary format, right? We started with the open ecosystem started with Parquet and then evolved into Delta and Iceberg and all that. It’s like one big thing. I think it matters a lot. The other one is AI. before 2022, October 2022, when ChatGPT came out, we had always pitched Databricks as a machine learning plus data

**Swyx \[00:53:38\]:** And a lot of the platform were built with machine learning use cases in mind, and obviously AI is a little bit different, and Matei’s, like spent far more time there than I do. But, the whole platform - we never felt, “Hey, we’re just a data infrastructure platform.”

**Matei Zaharia \[00:53:53\]:** Like, well, it makes only

**Swyx \[00:53:54\]:** Yeah.

**Matei Zaharia \[00:53:54\]:** Yeah.

**Swyx \[00:53:54\]:** We

**Matei Zaharia \[00:53:55\]:** I think they started with, like, they thought, “Okay, we’ll just manage the most valuable data and try to make it really fast. For that, we’ll have our own storage, which is optimized with the engine, and then we’ll just start at, like, the small amount of data that, like, the managers and whatever, finance people and so on look at and make that super fast to serve.” And, it was a different space. Whereas we started with, like, we’ll do the bulk processing and ingest. Like, you’ve got a bunch of, JSON log files, you’ve got whatever. We do that very large scale stuff ‘cause that’s what Spark was for, the large scale MapReduce-like stuff. And then we’ll keep the data in an open format. Might be slower, but, like, it’s already out there. You can consume it downstream. And, it turned out that, it’s easier to go from that broad thing that’s really good at the scale and ingesting and super low cost and create versions in it that have the speed and features of the, super easy to use, like, smaller data for, business users thing. And there was a

**Swyx \[00:55:02\]:** So start open, then optimize.

**Matei Zaharia \[00:55:04\]:** Yeah, start open and start large. Like, in some sense, we started upstream of them. And there was a time when we both, like, listed each other as partners because we said if you used both solutions together, use Databricks for, like, your ingest and compute, and then serve the tables out of Snowflake, you get all the visualization, all the very fast stuff, like, that’s great. And then, we both realized, like, customers were telling us, like, “Why do I need this other thing? Why can’t I just query your tables?” And we said, “No, we’re horrible at that. Like, please use our partner for the SQL warehouse stuff.” And then they realized that, like, wait a minute, so much of the compute is moving upstream into this other thing. Like, we’ve got to stop that

**Swyx \[00:55:43\]:** You have to go into each other’s territory, yeah.

**Matei Zaharia \[00:55:45\]:** But I think we did start with, like, the bigger scope, and with the open thing and that’s important architecture. Like, as - again, it goes to enterprises, like, if your company’s existed for, like, thirty years, you’ve experienced, being locked into Oracle and, like, all kinds of, like, crazy things. And if you’re the CTO there and you’re setting up the architecture for the future for your company, you’re gonna wanna pick a foundation that’s open. And you only want, like, one way to manage data in your company, ideally. You don’t want, like, seven different systems.

**Swyx \[00:56:17\]:** But, the open data format have won. Like, I think now every enterprise wants to put data in open data format. But, it was very controversial, like, back then. I think five, six. When exactly - one of the Snowflake founders wrote a blog called

**Matei Zaharia \[00:56:31\]:** Yeah

**Swyx \[00:56:31\]:** Choosing Open Wisely, which argued against

**Matei Zaharia \[00:56:35\]:** Yeah.

**Swyx \[00:56:35\]:** I think they might have taken it down. You have to find it on archive now.

**Matei Zaharia \[00:56:38\]:** Oh, it’s, it’s never going away now.

**Matei Zaharia \[00:56:41\]:** no, it’s still there. I love the perspective that only you guys will have because obviously you run the company. and I thank you for indulging this. It’s incredible, perspective. We’d love

**Swyx \[00:56:52\]:** Maybe one last one.

**Matei Zaharia \[00:56:55\]:** Yeah.

**Swyx \[00:56:55\]:** As you were talking I think I have to give Ali a lot of credit.

**Matei Zaharia \[00:56:58\]:** Yes.

**Swyx \[00:56:59\]:** He’s an incredible CEO. I think he’s the perfect combination of IQ, EQ, technology obsession, execution, business acumen.

**Swyx \[00:57:07\]:** and he’s also a founder, which makes a lot, make him, a lot easier for

**Matei Zaharia \[00:57:12\]:** Yeah

**Swyx \[00:57:12\]:** to, mobilize and execute. I think that’s,

**Matei Zaharia \[00:57:15\]:** Oh, that was it? so you have Ali, and he, they don’t, like, okay.

**Swyx \[00:57:20\]:** Well, a couple of other things, but I think Ali play a pretty big role in the,

**Matei Zaharia \[00:57:23\]:** I

**Swyx \[00:57:23\]:** Yeah.

**Matei Zaharia \[00:57:23\]:** I was, I thought he there was, like, gonna be some technical, choice that he contributed to.

**Swyx \[00:57:28\]:** Oh, no, I, well,

**Matei Zaharia \[00:57:29\]:** He did for a lot of these. Like, there were forks in the road where he pushed for, like, one way, and then it became clear that, like, that was the right way. yeah.

**Swyx \[00:57:37\]:** Yeah, there’s a whole book that needs to be written about how, like, the eight of you, like, work together and all that. I think there’s been profiles that people have done. Second one, not a cleared, question again.

**Swyx \[00:57:48\]:** Mosaic.

**Matei Zaharia \[00:57:49\]:** Stats are there. Oh.

**Swyx \[00:57:50\]:** Mosaic.

**Matei Zaharia \[00:57:50\]:** Yeah.

**Swyx \[00:57:51\]:** A lot of people in our community are in, are curious on, like, what’s the the model story of Databricks, right?

**Swyx \[00:57:56\]:** Like, when you guys bought Mosaic, like, the thing was like, “Okay, well, we’re gonna do fine-tuning. We’re gonna house model,” ‘cause they had, the Mosaic models. And it seems like you’re, you’re not doing that, and it seems like you’re going towards more of the, LTAP and, the harness stuff. What’s the story there? just

**Matei Zaharia \[00:58:14\]:** Yeah. I guess when Mosaic started, I think it was well known or became most well known for releasing open source LLMs early on, and they were general models. before that, they were doing other things. They were about optimizing, training systems. So they had the fastest, like, image model training stack in the world and stuff like that. And then they decided to do LLMs, which was smart. They moved into it before ChatGPT, so they had some of the first open source LLMs.

**Swyx \[00:58:43\]:** Yeah.

**Swyx \[00:58:43\]:** We interviewed John Franco

**Matei Zaharia \[00:58:45\]:** Oh, yeah

**Swyx \[00:58:45\]:** Abi for 7B.

**Matei Zaharia \[00:58:46\]:** Yeah, exactly. Yeah. Oh, yeah, very cool. Yeah. Yeah. So we, decided, even though we did launch a open source model DBRX and, we went up to, like, above the Llama Three scale, we decided that we really wanna focus on there’ll be so many people releasing models, and, instead of doing the general model where, like, a big part of the recipe is just throw in a lot of compute and just scale, we wanna focus on, like, the next step also of, let’s say you have the very smart model, how do you make it, useful? for us, it was a lot about automating, like, how. Like, making it very good at querying data. That’s the first party agents we have called Genie. so it’s like a virtual data scientist. Imagine, there’s someone who already knows all the stuff in your company inside out and knows all the machine learning libraries, all the data libraries, all the stuff on the web, and you can ask them questions? That’s, that’s what we wanted to do first. So that meant, like, let’s not focus as much on, like, let’s just train some frontier model, but let’s build a system using either external models or, fine-tuned, customized components. we’re still doing quite a bit of model training though, and in fact, we’re always, we’re procuring, like, lots of GPUs and stuff all the time to do it. and there’s a few places where we’re doing it. One is, there are many high volume use cases where if you have a specialized model, it’s just so much better than any of the general models you get. A nice example of that is understanding, like, documents, like PDF, Word documents, stuff like that, parsing them. If you’ve ever tried to do that, it’s frustrating ‘cause you send it to, like, like, Claude, Fable, or whatever, it, like, almost gets it, but it gets some things wrong, and it’s super expensive. You just burnt a huge amount of tokens plopping in an image into there. So our team, built this, document, vision model that takes a page and gives you back a nice JSON with all the components, and it’s very competitive. It’s like- Probably like 100X cheaper than those, frontier models and still better.

**Swyx \[01:00:57\]:** Yeah.

**Matei Zaharia \[01:00:57\]:** And that’s done by one of the researchers who came from DeepMind, was a founder of Adept, like very early scaling person, but focused on this. likewise we have, we’re doing specialized agents for part of what the coding agent does. And if you’ve seen the stuff on advisor models,

**Swyx \[01:01:17\]:** Yes

**Matei Zaharia \[01:01:17\]:** from Harvey, also from

**Swyx \[01:01:20\]:** Anthropic has been putting

**Matei Zaharia \[01:01:20\]:** Anthropic

**Swyx \[01:01:20\]:** Commission also.

**Matei Zaharia \[01:01:21\]:** Yeah.

**Swyx \[01:01:21\]:** Yeah.

**Matei Zaharia \[01:01:22\]:** And UC Berkeley one of my grad students there, wrote a paper called Advisor Models, I think before those came out. I’m sure others had the idea at the same time

**Swyx \[01:01:30\]:** Yeah

**Matei Zaharia \[01:01:30\]:** but that’s, something that helps a ton. So yeah, we showed some stuff just today at the keynote on

**Swyx \[01:01:38\]:** Is it Parth? Oh, Parth?

**Matei Zaharia \[01:01:39\]:** Parth, yeah. Parth

**Swyx \[01:01:39\]:** Oh, he’s speaking at my thing. he’s doing

**Matei Zaharia \[01:01:41\]:** Oh, nice

**Swyx \[01:01:41\]:** continual learning bench.

**Matei Zaharia \[01:01:42\]:** Yes.

**Matei Zaharia \[01:01:43\]:** Yeah, I’m one of his advisors, at Berkeley.

**Swyx \[01:01:44\]:** Oh, yeah.

**Matei Zaharia \[01:01:45\]:** Yeah.

**Swyx \[01:01:45\]:** We interviewed his brother, Chai.

**Matei Zaharia \[01:01:47\]:** Oh, okay.

**Swyx \[01:01:47\]:** ‘Cause he’s also at Abridge.

**Matei Zaharia \[01:01:48\]:** Yeah. Cool.

**Swyx \[01:01:49\]:** that, their family’s very smart.

**Matei Zaharia \[01:01:51\]:** Yeah.

**Matei Zaharia \[01:01:51\]:** Yeah. They’re, they’re awesome, yeah. So yeah, so we’re doing some of that and as we get experience with these in the first party agents, we’re also doing them with customers. So my feeling is, like, customizing models is gonna get way easier over time. That’s what we’re finding, ‘cause the base models are smarter, so they generate better traces in RL already, and then RL is about learning from your own past traces. And then synthetic data generation is way better, way easier now. we have pipelines just using open source models, like the same model generates training environments and trains itself and beats like Opus and GPT 5.5 and stuff at a task. So I do think it’s gonna pick up, like. The thing is, the ease of training the algorithms is only gonna go up over time. There’s a question of when it crosses into mainstream. Like, instead of this like, specialized document parsing thing we did where like you need a hardcore LLM researcher, when does it get easy enough that anyone can like plop in some stuff and describe a task?

**Swyx \[01:02:53\]:** Yeah.

**Matei Zaharia \[01:02:53\]:** Yeah.

**Swyx \[01:02:53\]:** Well, what makes it easy? Interfaces.

**Matei Zaharia \[01:02:56\]:** Yeah.

**Swyx \[01:02:56\]:** And, unified APIs.

**Matei Zaharia \[01:02:57\]:** Yeah.

**Swyx \[01:02:57\]:** ‘Cause obviously if it’s not interoperable, then you cannot switch.

**Matei Zaharia \[01:03:00\]:** That’s what we’re seeing with these like, with Omnigentt and

**Swyx \[01:03:04\]:** Yeah

**Matei Zaharia \[01:03:04\]:** composable agents, like you can have agents or, with specialized models, and then you can train the whole thing. I think that’ll help a lot too.

**Swyx \[01:03:11\]:** Yeah. The last thing I was gonna leave, this, I’m sequencing this, so I’m proud of myself. Satya, is, talking about this. I interviewed him at, Microsoft Build

**Matei Zaharia \[01:03:22\]:** Yeah

**Swyx \[01:03:22\]:** a couple weeks ago, and then he wrote this essay, which I’m sure you’ve seen

**Matei Zaharia \[01:03:25\]:** Yes

**Swyx \[01:03:26\]:** which is, talking about building frontier ecosystem. He sounded, when I was talking to him, more like a Databricks CEO than I’ve ever

**Matei Zaharia \[01:03:32\]:** huh.

**Swyx \[01:03:35\]:** is there a this thing presumably went viral in my circles. I don’t know if it’s in your circles.

**Swyx \[01:03:41\]:** What’s the theory of like, I guess tokens as IP, building up the context? He said everything but data is the new oil or context is the new oil. Some version of that that you guys have heard before.

**Matei Zaharia \[01:03:54\]:** Yeah, I agree. I think the data you have, as you get better technology around it, like you can just do more in your domain with it. It’s not even just about AI. Even when people, started collecting stuff in real time, like I remember all the power companies put like the smart meters and stuff, and all the car manufacturers started putting like sensors and cameras and stuff. Any technology like makes data more valuable and can give you some advantage, anything that helps you do something with it and make some decisions, and AI is the same way. Like you had all this stuff that’s just sitting there, now you can have an agent automatically tell you. Like for example, instead of I discovered as a, what feature in my product is broken ‘cause a customer complained, the agent tells me, “I noticed no one is like uploading files anymore ‘cause they get errors or whatever.” And as you saw with like Reyden, like as a database company, because we have all these, the history of all the queries and all the table layouts and like how they worked, we can build a new engine very quickly that, is good and we’re confident that it’s gonna be good. So I think this is right. I think the question is exactly how it will, land, but I do think like custom, model customization, which Satya talked about, is gonna get easier over time.

**Swyx \[01:05:09\]:** Yeah.

**Swyx \[01:05:10\]:** Which is why, by the way, I brought up the model thing, ‘cause they have their MEI things and you guys don’t. That’s the, that was the, to be the mental question.

**Matei Zaharia \[01:05:17\]:** Yeah. We do have, We’re doing like RL fine-tuning as a service and, with a bunch of customers. We don’t have like. we have like preview customers, and we have a general, something called AI Runtime that’s like we get you GPU clusters on demand with a software stack in there that makes it easy to do training. So we didn’t like launch

**Swyx \[01:05:38\]:** Do fancy name, yeah

**Matei Zaharia \[01:05:39\]:** but that’s existed for a while. We’ve had like GPU compute for a while, and that’s where a lot of the Mosaic, stack went

**Swyx \[01:05:46\]:** Yeah

**Matei Zaharia \[01:05:46\]:** to help scale that. But yeah, we found that the engagements, like some of the. There’s two types of customers. There’s some who just want GPUs and libraries to like get data in and out and monitor, so that’s what AI Runtime is. And then there’s some that say, “Hey, can you work with me, build evals, build synthetic data, and create-”

**Swyx \[01:06:05\]:** Yeah. The more forward deploy solutions architects.

**Matei Zaharia \[01:06:07\]:** Yeah. And then that’s what we’re doing and as. And more things will transition from like being custom to not, but, that’s how it is today.

**Reynold Xin \[01:06:15\]:** Going back to your original question, I think one of the thesis we have is the, once you can get the data in the right place, the AI models are becoming pretty good. The generic agents are fairly. Ali talked about

**Matei Zaharia \[01:06:27\]:** Yeah

**Reynold Xin \[01:06:27\]:** AGI is already here. They have pretty good reasoning capabilities. I think many of the traditional software will be rewritten, with this new paradigm, which is just get the data to be there, and then just slap some agent on top.

**Reynold Xin \[01:06:40\]:** Magic will come out.

**Matei Zaharia \[01:06:41\]:** Yeah.

**Reynold Xin \[01:06:42\]:** but without the right data, you can’t really do that. And it’s our approach going to security and our approach going to the, customer data platform space

**Matei Zaharia \[01:06:51\]:** Yeah

**Reynold Xin \[01:06:51\]:** is, like we launched two products

**Matei Zaharia \[01:06:54\]:** Yeah

**Reynold Xin \[01:06:54\]:** at Data and AI Summit, one targeting security teams and the other one targeting marketing teams. And those all are, have a lot of existing technologies out there, and our, I think our approach is just, hey, once you get the data in, everything is a lot easier with agents on top.

**Matei Zaharia \[01:07:09\]:** Yeah.

**Reynold Xin \[01:07:10\]:** Well, and you guys have been fantastic guests. I just love this discussion. I just love the ability to dive in on the tech side, but also culture and strategy. I hope this isn’t the last time we chat. Like, congrats on all the success so far.

**Matei Zaharia \[01:07:23\]:** Thank you.

**Reynold Xin \[01:07:24\]:** Yeah.

**Matei Zaharia \[01:07:24\]:** Congrats on your success also.

**Reynold Xin \[01:07:27\]:** Yeah. Yeah. Databricks is supporting my, event, which is, so I

**Matei Zaharia \[01:07:31\]:** Yeah

**Reynold Xin \[01:07:32\]:** the AI engineer conference, and it is. I was, I’ve been an attendee of Data AI Summit for a long time, and I noticed that it was like. this was back in 2022. It was like 90% data and then 10% AI.

**Matei Zaharia \[01:07:43\]:** Yeah.

**Reynold Xin \[01:07:44\]:** And I was just like, “Well, okay, like we need a, we need the community thing that is like just 90% AI.”

**Matei Zaharia \[01:07:49\]:** Yeah.

**Reynold Xin \[01:07:50\]:** Which like now everybody is.

**Matei Zaharia \[01:07:51\]:** Yeah. No, we’re excited to support.

**Reynold Xin \[01:07:52\]:** so yeah. So Databricks will be at the conference. and I know, I just, it’s just amazing to see you guys, build out the most like interesting like cloud that I have I’ve seen outside of like the, the big three. And like it’s amazing how far you’ve grown. Like,

**Matei Zaharia \[01:08:07\]:** Thank you

**Reynold Xin \[01:08:07\]:** one of the, one of the most, insightful, like, I don’t, I’m not a VC, but I play one on TV.

**Reynold Xin \[01:08:12\]:** like Ben Horowitz like when he was talking to you guys, advising you on just like where is this company going, he was like, “Don’t sell it to 100 billion,” or some some version of that story, right?

**Matei Zaharia \[01:08:22\]:** Yeah, it was like the company should be worth a trillion dollars. You’re underselling it for 10 billion.

**Reynold Xin \[01:08:26\]:** And like he doesn’t do that for everyone? Like for some reason, like, I think he saw the vision, but also, the infinite runway that you have.

**Matei Zaharia \[01:08:36\]:** We’re lucky to have Ben. Yeah.

**Reynold Xin \[01:08:37\]:** Yeah.

**Matei Zaharia \[01:08:37\]:** He’s a big supporter.

**Reynold Xin \[01:08:39\]:** Yeah, amazing. Okay, well thank you so much.

**Matei Zaharia \[01:08:41\]:** All right. Thank you so much, Swyx.
