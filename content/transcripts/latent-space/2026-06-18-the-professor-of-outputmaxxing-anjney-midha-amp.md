# The Professor of Outputmaxxing — Anjney Midha, AMP

- Podcast: Latent Space: The AI Engineer Podcast
- Source: https://www.latent.space/p/anj
- 获取时间: 2026-07-02T16:43:53.365Z

## Transcript

_Last 4 days before regular tickets sell out at [AI Engineer World’s Fair](https://www.ai.engineer/worldsfair/2026) - this is the single biggest gathering of AI Engineers, Founders, Leaders, and Researchers in the world. Attendees get >$5000 worth of sponsor credits and talk tracks are looking FANTASTIC. Join us!_

The AI scaling debate always focuses on the question of “how do we get more GPUs?” but the better question may be: **how do we make the most of ones we already have.**

The fact that a frontier lab like xAI could be running at **sub-10% MFU (Model FLOPs Utilization)** is just a hint at what the real problem may be.

For context, older frontier-scale training runs were already much higher than 10%. GPT-3 was around **21% MFU**. Gopher was around **32%**. Megatron-Turing NLG was around **30%**. PaLM reached around **46%**. And our guest Anjney says best-in-class MFU today is closer to **60–70%**.

It’s not necessarily that xAI is uniquely incompetent [(it’s clear they have talented folks)](https://www.latent.space/p/video-agents) but rather the priorities may be flipped in the GPU arms race.

While GPU access is a bottleneck, simply increasing CapEx won’t automatically translate to better models as **frontier AI is increasingly a systems problem**: scheduling, utilization, networking, kernels, frameworks, data pipelines, parallelism, cluster reliability, and the thousand small decisions that determine whether your theoretical FLOPs become real training progress.

[Video 3](https://www.youtube.com/watch?v=h5dlIPM0X18)

From building Discord’s developer platform and backing frontier AI companies like **Anthropic, Mistral, Black Forest Labs, and Periodic Labs** to now building AMP’s independent compute grid, **Anjney Midha** has spent years close to the real bottlenecks of AI scaling. In this episode, Anjney joins swyx at Periodic Labs to unpack **why the AI race is not just about buying more GPUs**, why 95% utilization would have been considered an outage at Google, and why the next era of AI infrastructure has to be more aligned, more efficient, and more responsible.

We go deep on AMP’s vision for a compute grid that makes **FLOPs flow like megawatts**, the difference between full-stack AI labs and horizontal pooling, why AI data centers need community buy-in, and how compute markets could evolve into something closer to an independent system operator. Anjney also explains why DeepMind’s unpublished research points to a market failure, why end-of-life prediction remains one of the most important AI applications he has thought about for fourteen years, and why **“output maxing” may become a new discipline for frontier systems.**

We also discuss Anthropic’s culture, why **“luck favors the prepared mind”** in coding models, how Claude cracked coding, why too much capital too early can make AI labs fragile, what Periodic Labs is trying to do with science and superconductors, why great researchers can become great CEOs, and why Silicon Valley is both deeply missionary and deeply mercenary.

**We discuss:**

*   Why **95% utilization** was considered an outage at Google

*   Why **AI infrastructure waste** compounds at frontier-lab scale

*   Why **“move fast and break things”** does not work for AI data centers

*   How **data center backlash**, power grids, and community incentives shape AI scaling

*   AMP’s vision for making **FLOPs flow like megawatts**

*   Why compute needs an **independent system operator**

*   How **interruptible demand** and dynamic prioritization worked inside Google

*   Why **DeepMind research hoarding** creates negative externalities

*   AMP’s **1.2GW base-load ambition** and the need for 6GW of spike capacity

*   Why **end-of-life prediction** could become one of AI’s most important healthcare applications

*   **Frontier Systems**, output maxing, and full-stack alignment

*   Why **APIs and abstraction layers** become lossy as organizations scale

*   **Superconductors**, standards, and the dream of lossless systems

*   **SF Compute**, open protocols, and the future of compute marketplaces

*   Why **non-NVIDIA chips** can still benefit from NVIDIA’s reference architecture

*   **Trust boundaries** and why chip startups need visibility into future model architectures

*   Why VCs often **underestimate researchers as CEOs**

*   Scientists as **star athletes of the mind**

*   Why great CEOs need to be **confrontational up and down the stack**

*   Why **leading the frontier** matters more than “winning”

*   How **Anthropic cracked coding**

*   Why **culture is fragile**, not a permanent moat

*   Why **hardship** was a feature, not a bug, for Anthropic

*   Why Anthropic’s **P0 was coding** from day one

*   **Periodic Labs**, physics as the constraint, and technical reality

*   **Silicon Valley mercenaries**, missionary teams, and what happens after a breakthrough

**Anjney Midha**

*   **LinkedIn:**[https://www.linkedin.com/in/anjney](https://www.linkedin.com/in/anjney)

*   **X:**[https://x.com/AnjneyMidha](https://x.com/AnjneyMidha)

AMP PBC

*   **Website:**[https://amppublic.com/](https://amppublic.com/)

*   **X:**[https://x.com/amppublic](https://x.com/amppublic)

**00:00:00** Introduction

**00:00:09** Why AI Compute Is Being Wasted

**00:03:17** Responsible Infrastructure and Data Center Backlash

**00:06:07** AMP Grid: Making FLOPs Flow Like Megawatts

**00:12:41** Foundry, Frontier Labs, and Research Hoarding

**00:14:42** Gigawatt-Scale Compute and End-of-Life Prediction

**00:24:08** Frontier Systems, Output Maxing, and Alignment

**00:27:38** Compute Markets, SF Compute, and Non-NVIDIA Chips

**00:32:57** Trust Boundaries, Co-Design, and Researcher CEOs

**00:38:17** AI Coachella and First-Principles Thinking

**00:42:43** Leading vs Winning in Frontier AI

**00:45:54** How Anthropic Cracked Coding

**00:48:25** Culture, Hardship, and Anthropic’s P0

**00:54:03** Periodic Labs, Physics, and Silicon Valley Mercenaries

**00:56:26** Rishi Valley, Singapore, and Money as a Measure

**00:58:47** Closing Thoughts

**Swyx [00:00:00]:** We’re in Periodic Labs with Anjney Midha, CEO, founder of AMP. Welcome.

**Anjney [00:00:09]:** Thanks for having me. At Google, there are two types of utilization usually, right? That you’re measuring in these clusters. One is node allocation, and then the other’s MFU. Node utilization is usually like what percentage of cards in the data center are just, used, and that, if it’s not at, 95%-

**Swyx [00:00:29]:** There is no excuse

**Anjney [00:00:29]:** There’s no excuse, right? I think 95% at Google, which is where my co-founder, Seb, came from, he built the Borg, PBorg/GQM scheduler at Google, and there I think 95% was considered an outage, so 96% node utilization is, should be standard. And most single-tenant clusters are not running at that. So that’s one. And then MFU should be, I would say the best in class today is somewhere between 60 and 70%. I think this is a leadership question, right? Fundamentally it’s an alignment question, which is are the people who are funding the cluster and then deploying the cluster actually aligned? And sometimes theoretically they are, but in practice the number of people in the chain, the supply chain between, the capital and all the way to whoever’s managing the cluster and then whoever’s measuring what the output is, are just so many, degrees of separation away that, the, The Have you ever heard the radian metaphor, which is at the beginning of an arc, if you have two arcs that are two lines that are just off by a few degrees, that-

**Swyx [00:01:33]:** It spreads out

**Anjney [00:01:34]:** It spreads out, right? Or at scale. And I think what’s happening is a lot of cluster implementations and infrastructure, a lot of frontier labs and other teams, that’s what’s happening, is they’re, they initialize the plan, which is kind of like North Star with a team that wants to do good, but then they’re, required to scale so fast instead of iteratively that the wastage just compounds really fast at scale. And so I think we know the answer, which is just do iterative bring ups. If you spend time with people who’ve been in the semiconductor industry or the DSN industry for a long time, this is not new, and I don’t think AI should be an excuse. Sure. Something What is new? Okay. We have a lot of new capabilities, but that doesn’t mean just abandon common sense. Common sense should always be in fashion. ? AI scaling doesn’t change the in fact, if anything, AI scaling should be putting a premium on the value of common sense and infrastructure because the margin of error now is so much lower and the costs of wastage are so much higher. And the cost of wastage, by the way, is not just economic. I’m, obviously I’m, I’m an investor, or I’m an investor by background. Over the last few years now we’re running an AI infrastructure business called, AMP. And I think that it’s okay to say this time is different on the capabilities front. We are genuinely getting capabilities at, of the, of a kind we haven’t had before. That doesn’t give you an excuse to say this time is different for everything, especially infrastructure. So look, I love the hacker mindset and the hustler mindset. Now, that’s great for the startup mindset, but you remember this moment where Zuck went from saying, “Move fast, break things” to, move-

**Swyx [00:03:10]:** Fast and stable infrastructure

**Anjney [00:03:11]:** Move fast with stable infrastructure. I think now we need to move fast with, responsible infrastructure. People are going to ask where the impact is. There was a really In our class yesterday, Scott Nolan, who’s the founder of General Matter, came by at Stanford to speak about energy bottlenecks. And he had a phenomenal idea. He said, “if you look at the marginal unit economics of compute per hour,” he goes, “let’s call it, $4 an hour. If you’re having to bring up a new data center in a new community, why not just say we’re going to charge 4.50 an hour, and that marginal impact or that marginal increase, we just literally take that and give it to the local community as cash?” I can tell you as a customer of that compute, I would love that. I’d be happy to pay an additional 50 cents per hour at scale.

**Swyx [00:03:57]:** Wow. Yeah.

**Anjney [00:03:58]:** Because if that means the public benefit is so clear to the communities that the data centers are coming up in, I’m going to feel like that compute is much more reliable. Up to 20% of all data centers this year in the US, my understanding is are at risk.

**Swyx [00:04:13]:** Of community backlash?

**Anjney [00:04:14]:** Correct. Of not getting the community support they need to get brought up.

**Swyx [00:04:19]:** Wow. That’s a huge number.

**Anjney [00:04:20]:** Yeah. Now, we, I think we should dig into what that number is. I think it’s a little bit of overstated. These things can get over-reported, but it-

**Swyx [00:04:27]:** They don’t just care about jobs. They care about all the other stuff around it, right? They care about power grid, they care about environments-

**Anjney [00:04:33]:** Power grid, permitting, and so on. And imagine I think if you said there’s a new AI deal. If we’re bringing up a data center in your community, we’re actually going to reduce the cost of your electricity bill. Okay, now we’re talking. Right? The community’s going, “Okay. Now this is a deal. I feel like a partner in this.” Right now that’s not happening. There will be audits, there will be investigations, and when the, when the regulators come, I don’t know when it’s going to be, the folks who are moving fast and breaking things in the name of AI progress better be prepared. That’s certainly not how we’re procuring compute. Or we’re, we’re trying as much as we can to work with partners who have long-term track records. Many of whom, by the way, are not, AI providers. I think this whole idea of neoclouds being somehow this new category is a lot of marketing speak. There are really good, reliable, trusted data center providers in America who’ve been around 20 plus years. I love those folks. They know how to Sure. Are they sponsoring happy hours at NeurIPS? No. Are they legibly listed in Build? No. Are they hanging out in my, in, situational awareness parties? No. But they’re adults. I trust them.

**Swyx [00:05:44]:** They can run LAN. They can run power.

**Anjney [00:05:45]:** They can run LAN, power, and shell. They have credit histories. We sit down, we have a conversations. Many of them live in Silicon Valley. They’ve, they’ve had to deal with the boom and bust cycles of the internet, and I love those folks. They are stable infrastructure partners and thinkers. And I think there’s a lot of short-term thinking going on in the compute layer, and it’s going to catch up to us. It’s not going to be good.

**Swyx [00:06:07]:** You talk about aligning incentives, and, I would think that aligning incentives means you have the full stack in one company, which is xAI and OpenAI, right? So you as a standalone infrastructure layer, why are you somehow more aligned to your portfolio companies than people who just own the whole thing?

**Anjney [00:06:28]:** In systems design, right, there’s, there’s two regimes of, architecture, right? You have integration, and then you have pooling and utilization, right? So the Or rather, the way to increase utilization often is you can do systems integration where you collapse a lot of process into one node, or you can pull out a process from a node and share that amongst various That resource amongst several different nodes. And so we see the AMP grid, which is, the, what, the system we’re building here, which is basically a compute grid. We’re trying to do for compute what the electric grid-

**Swyx [00:07:02]:** Power

**Anjney [00:07:02]:** Yeah, what the power grid did for electricity. It-- this is a pooling and utilization layer across clouds, And so we’re actually the opposite of a full stack integration like approach.

**Swyx [00:07:12]:** Super horizontal.

**Anjney [00:07:13]:** Where it’s much more horizontal and it’s, it’s multi-cloud, it’s multi-silicon. The goal is to try to make FLOPs flow like megawatts, and that is very hard to do today for many reasons. There’s stranded pools of compute all over the place and there’s no fungibility. And so right now we do it at the level of scheduling, and we often do it at the economic layer. But as we start to announce what we’re working on, it’s extraordinary like how many folks are coming out of the woodworks and saying, “Hey, I’m actually working on a way to make compute fungible at this part of the stack and that part of the stack.” And as a grid, we’d like all of these folks to participate on the grid. There’s, people often ask me, “Andra, are you a new cloud?” And I go, “No, actually neoclouds are suppliers.” sometimes they’ll ask, “Are you a venture capital firm?” I go, “No, actually they are, they are demand like sort of off-takers of the grid.” We see ourselves as what’s called an independent system operator. So if you study the history of the electric grid, once it became legible to a lot of factories and industrial sort of participants that, hey, actually it turns out pooling is a good idea. We should pool our generators instead of all having a generator running at half capacity in our backyard. There was a need for an independent entity who could coordinate all these parties. Transmission line, power generation, facilities, transmission lines, factories, and that neutral coordination mechanism is very critical. In order-- If you study like the history of grids, the most enduring ones were those that never owned their own assets. They were ones that had, or often started with long-term anchors who are uncorrelated sources of demand, a steel factory, a shoe mill or whatever in a particular town who weren’t competitive, where the steel factory want to spike up at night, the shoe mill wanted to spike up during the day. So then you pool and you share, right? So each of you is guaranteed some base load, but then you kind of schedule your spikes to drive a peak utilization across the town. The gold standard, so to speak, historically, has been these utility companies like PJM Interconnect in the northeast of America, where they, over many years became this what’s called an ISO, an independent system operator of the grid. So that’s how we see ourselves. Economically, that’s what we are. From a technical perspective, we started at the scheduling layer because Seb and Mihai, who, run engineering here, built that at-

**Swyx [00:09:28]:** Did your scheduling

**Anjney [00:09:28]:** They did that at Google. And, -

**Swyx [00:09:32]:** And you have infra shops from Discord as well.

**Anjney [00:09:35]:** I have some.

**Swyx [00:09:35]:** I don’t know, I don’t know if Discord is like the primary identity, but what-whatever, I’m just kind of-

**Anjney [00:09:39]:** No, D-Discord was-

**Swyx [00:09:40]:** Choosing a well-known name.

**Anjney [00:09:42]:** Well, I So I was running the developer platform there. The internal infrastructure I was not responsible for. That was actually a guy by the name of Mark Smith, who was extraordinary. And yes, Discord did pool So Discord is actually a counter example. I had the chance to learn a lot about fully, full stack infra there because-

**Swyx [00:09:56]:** It’s the same thing, yeah

**Anjney [00:09:57]:** It’s the, it’s the other architecture which is, Discord built its own WebRTC vo-voice and video infra. So like Discord did not use-

**Swyx [00:10:08]:** For the calls, yeah.

**Anjney [00:10:09]:** Yeah, did not For communication, Discord did not use third party infra. It was all built in-house. And then the way you maximize utilization was you pool demand from the world’s 200 million plus monthly active gamers, right? And so that’s, that’s how those stacks were constructed. Again, in systems design, the two concepts that keep coming up over and over again are abstraction and composition, right? And-

**Swyx [00:10:31]:** Bundling and unbundling

**Anjney [00:10:33]:** Bundling and unbundling, abstraction, composition, like verticalization and-

**Swyx [00:10:36]:** Horizontal

**Anjney [00:10:36]:** Horizontalization. So in that sense, AMP is an independent system operator of the grid. We pool demand, we pool supply from a number of partners we trust At about 1.3 gigawatt scale over four years. And then we pool demand from some of the world’s best, research labs and so on. We’re sitting at one, periodic labs who need extraordinary long-term demand. And the idea is that, each of them is guaranteed base load on the grid, but they can spike up and down flexibly on, for compute, with much shorter timelines as needed. That was roughly the design of the program I came up with at a16z called Oxygen. The same-- That was the same design of the GQM, BorgX, Borg GQM implementation at Google that Mihai and Seb had built. Which was that how do you allow, teams inside of Google, on the internal infrastructure to be guaranteed capacity, for their base workloads? But when they need to spike up on research, how could they ensure that was sufficiently there? And of course, the big innovation that was not discovered, but kind of implemented in the space, this infra space maybe three, four years ago at Google was the idea of interruptible demand, right? Where you just queue up a bunch of jobs and through this like sort of credit system, there can be a bidding mechanism.

**Swyx [00:11:53]:** Like priorities.

**Anjney [00:11:54]:** It’s a dynamic prioritization Basically. And jobs can get interrupted based on somebody else who’s saying, “what? I have 10 tokens, 10 credits I want to spend on this job.” Another like team lead, research lead is “Genie 3 or whatever is only worth five, credits, and NanoBanana2 is worth 10 credits,” and so the NanoBanana job gets priority. That’s a, that’s a made up example.

**Swyx [00:12:15]:** It’s very real. Brain Marketplace was real. And, we’ve, we’ve covered this on the pod with David Luan, who was-

**Anjney [00:12:20]:** Oh, great. Okay

**Swyx [00:12:20]:** Was there. And the criticism is that, well, actually sometimes you need central command to go all in on a thing. And actually sometimes capitalism via credits doesn’t work. Not, this is not a criticism of AMP. I’m just saying, this is a thing that has been tried, internally within Google, and it led to Google missing GPT.

**Anjney [00:12:41]:** Like, we structured ourself essentially very similarly to Google. We are structured as a holdings company. So, Alphabet holdings is Alphabet holdings, and then they’ve got these subsidiaries called Google and-

**Swyx [00:12:51]:** Other bets

**Anjney [00:12:52]:** Other bets and so on. We’ve got, AMP holdings, and we’ve got our infrastructure business, and then we’ve got a capital business called Foundry that incubates new frontier AI labs or invests in them as venture capital, like Periodic. We put a few hundred million dollars into Anthropic from our fund earlier this year. So wherever we feel like teams are making progress, especially researchers and so on who’ve pushed the frontier inside of existing labs like DeepMind, I find, there comes a point where they feel misaligned with the dictatorship of Alphabet holdings. And at that point, sometimes the dictatorship doesn’t want them anymore. And they’re “Thank you. You’ve done your job here. You’ve kind of helped us through the zero to one phase, and for whatever reason, we’re going to deprioritize your amazing, omni model or whatever it is, and instead we’re going to prioritize coding.” And, I think that’s a tragedy, but I get it. They’re Sergey and team are running their own business there. But that doesn’t mean we the rest of us should sit around waiting for that progress to get unlocked for the rest of the world and humanity. If you think about how much extraordinary research has happened inside of DeepMind over the last 10 years, I, Demis and Sergey and those guys did such a great job. But at the end of the day, so much of that has never seen the light of day?

**Swyx [00:14:00]:** Or they’re like papers only, but they never actually shipped it to production or-

**Anjney [00:14:03]:** What’s worse is the paper is actually not even being published anymore ‘cause there’s a six-month embargo inside of DeepMind, right? We’ve heard about this where a paper comes out, and then I think there’s a six-month embargo window where if anybody on the business team says, “This could be interesting” It’s embargoed for life.

**Swyx [00:14:18]:** Exactly. So the stuff that gets published is the stuff that’s not good enough.

**Anjney [00:14:21]:** There’s an adverse selection problem, basically. Yeah. At this point-

**Swyx [00:14:25]:** It’s, it’s a common complaint at NeurIPS, by the way, that’s “Well, why would I look at the papers that are the trash of GDM?”

**Anjney [00:14:31]:** Again, I think it’s a tragedy. I get it. They’re running their business, but the rest of the I think there’s negative externalities of research being hoarded, and so that’there’s a market failure. And somebody needs to unlock that research, and we can’t do it on our own. We only have 1.2 gigawatts of compute. That’s nothing. That’s about $40 billion of cloud spend. We’re going to need a lot-

**Swyx [00:14:51]:** By the way, is that’s a new number. I haven’t, haven’t come across that gigawatt number. That’s huge.

**Anjney [00:14:56]:** Yeah. And to be clear, we haven’t secured all of it. That’s how much demand we have started to secure. I think publicly we haven’t actually confirmed how much we have for this year. In order-

**Swyx [00:15:04]:** Where do you want to get to?

**Anjney [00:15:06]:** I think the steady state would be that we have a base load pool Of 1.2 gigawatts at all times Of base load capacity. For spike capacity, right now my estimate is we need roughly six gigawatts over the next four years for all our teams to feel like they were able to keep moving the frontier, whatever they’re working on, whether it’s, like superconductor discovery over here. There’s a new investment we’re working on right now, which is in the end of life prediction space in healthcare. It’s extraordinary how much you can, you can give this was actually my graduate school work. I went to grad school for bioinformatics at Stanford Med. And I know we-

**Swyx [00:15:40]:** Econ, MCS, bio.

**Anjney [00:15:41]:** So my-- I was this really weird cat where, I was never satisfied with my major options. So at one point I was an econ major, then I was a CS major, then I was a MCS major called mathematical computational science, and they decided they were going to end that major. So I took all that coursework, and I applied it to grad school, my graduate degree in bioinformatics, which was the master’s program, and then I thought I was going to do a PhD. I never ended up doing it. I dropped out and went to work at Kleiner. But I was lucky enough to apprentice with this professor at, Stanford Med. His name is Nigam Shah, and he was working on end of life prediction. Stanford is one of the only research facilities in America that has a longitudinal patient data set that’s larger at scale. I think it’s at least 12 million patient lives. The only larger data set is at the VA, the Veterans Affairs, of America. And to do research, like do any deep learning and so on that data set, it was called the STRIDE data set at that time, you had to be a Stanford Med School affiliate, which is why I went and enrolled in the bioinformatics department. End of deep learning was early. Nigam Shah had the visibility-- the vision to see that, you could do end of life prediction to help palliative care. In America, the, over 30% of all Medicare, Medicaid spend, at least at that time, was spent on end of life care. And what’s we grew up in Asia, so we all-- Yeah, at least I won’t speak for you, but I have A very different relationship with death than I find folks who grew up in America do. In America, spiritually and culturally, especially in Western societies where Christianity, the Christian tradition sort of frames death as this terminal point, there’s often a judgment day and so on. The way we view death is with a finality. In Indian culture, in Hindu culture, death is one-

**Swyx [00:17:35]:** Also, he’s Buddhist as well.

**Anjney [00:17:36]:** You’re Buddhist, yeah. So it’s one, it’s one step in a journey of many lives, right? And so, I grew up in this city called Chennai in the south of India, and when people die, you dance on the street. There’s like a procession where your body is carried to be cremated and your family, like celebrates and there’s drums and so on. It’s this huge thing. And, It’s because the idea is that you’re going to be reincarnated. You’ve been liberated from the responsibilities of this life, and now you’re onto your next. It’s a new It’s like going off to a new college or whatever, right? And so it was so alien to me when I got here as an undergrad- That the medical system works backwards from that assumption that we have to view death as this terminal thing and delay it, postpone it’s a bad thing. And so at the time, clinical decision support in the United States was this very primitive field. Even to this day, physicians in the United States often will tell you when you have a terminal disease, this is your, we’ve diagnosed you, which is great. Our ability to diagnose you is extraordinary. You have somewhere between six months to six years to live. What do you do with that information? The error bars are so high that then you In times of uncertainty, we default to culture, and when the culture is let’s-- this is a bad thing, I’ve got to prolong my life, then you start doing things like And just to, just sort of from a systems perspective, what’s going on there is Physicians often feel like they need to provide such high error bars because there’s always some uncertainty in end of life diagnosis, and if you provide the wrong Diagnosis or recommendation to your patient, you can be sued for medical malpractice. And then your license can be taken away. It can be catastrophic for your career. In contrast, if in countries where that’s not the case, what you often observe is that patients, physicians are quite prescriptive with their recommendation. They say, “Hey, this is your condition. The literature says that you probably have this much time on Earth left. My expert opinion is that you are an outlier or whatever.” And they try to be more prescriptive, and that empowers a patient, right? ‘Cause then a patient can say, “I trust my doctor. They said on average, I have six months to live, but if I do these things, I may have a shot because of my particular predispositions or my genetic history or whatever.” And that empowers you to go about your life in a actually more scientific way than leaning on religion, culture, spirituality, and so on. In contrast, here, because of that medical malpractice sort of thing looming over your head, a physician never gives you a clear recommendation. So instead you say, “Okay, Doc, well, let’s try it all.” And then you start a whole regime of drugs and therapies, and then you often spend weeks and weeks in the hospital, and that deteriorates your quality of life. And when that deteriorates your quality of life, you instead of spending your last few days doing the things you love with your family, you’re spending it on a hospital bed. And that ends up being thirty percent of Medicare and Medicaid. So it’s worse for the patients. The doctors feel terrible. The American taxpayer is paying a huge amount of money. And so this is why Nigam Shah, who was this professor at Stanford, said, “Anjney, if there’s “ I kind of sat down with him. I was this young, I’d, I was twenty-one, and I was “I want to work on a big problem.” He’s “The big problem is end of life care.” And so we tried to do deep learning to say, to-- So we started trying to run deep learning on these tried patient data sets to say, “Could you have an AI system make a recommendation that is orders of magnitude more precise about how much time you have left once you’ve been diagnosed with a terminal condition than a human?” And then if we can get that precision to be high enough, then you can empower the patient. And it turns out the tech works. Like it’s-- Once you get the data set, like RL works. Honestly, even regression models work. You don’t need to get that fancy. At the time, we were just trying, doing like very simple neural nets.

**Swyx [00:21:54]:** Simple solutions, yeah.

**Anjney [00:21:54]:** Today, what we can do with RL is extraordinary. The problem remains then and now is regulatory, because you actually can’t shift the burden of the wrong clinical diagnoses from the physician to the AI system. And so at that time, I got quite disillusioned ten years ago for, twelve years ago where, ‘cause I felt I just didn’t have the resources to influence regulation. Today, I’m very lucky. I’m in a different place. I’ve, I’m a lot older, and so I’ve been spending a lot of time on my next incubation, which is how can we unlock the, patient empowerment by training AI models to do end of life prediction much, with much more precision and ac-

**Swyx [00:22:37]:** Oh, wow. You’re still focused on this the whole time.

**Anjney [00:22:40]:** The-- I haven’t been able to get, this out of my mind a single day for the last fourteen years. This is the hill I want, I would like to die on. There’s two, I would say. What? I actually, I’d prefer not to die.

**Swyx [00:22:51]:** Yeah, exactly.

**Anjney [00:22:52]:** But I think two bipartisan issues, I think two issues that should be bipartisan in America are how do we empower patients to make the right clinical decisions at the end of their life, such that we’re reducing the taxpayer burden with science? It’s just good old science, and AI can help here. And the second is, net positive data centers, ‘cause I think that’s the biggest critical bottleneck on training and good enough AI models to help people at the end of their life. So there’s sort of two sides of the, of the same scaling bottleneck curve, but those two, we formed AMP as a public benefit corporation. My wife and I, who you’ve met, you’ve met Viv. Her passion is education. Her family is a long line of educators and so on, and, of physicists. And so this class is my attempt to stop being the black sheep of the family and be a, an educator. But if I’m not educating, the thing I would be doing is working, on these two problems, whether on the political spectrum or as a researcher back at, in some lab. And my hope is if anyone’s listening to this podcast, if they’re passionate about either of those two topics, I’d love to hear from them. We’ll, we’ll we can share the contact in the show notes, but, we’re looking for people to join both of those missions on the, on the political side as well as on the medical side, on the research side.

**Swyx [00:24:08]:** You said, this is a discipline that you want to form. You call it’s called variously called Frontier System. It’s variously called One Person Frontier Lab. What is the ideal name or shape of this? Like the, what is the mission?

**Anjney [00:24:24]:** Of the class?

**Swyx [00:24:26]:** Of the discipline that you’re, exploring, right? I The class is called Frontier Systems. But like for me, maybe one phrase is you’re, you’re just anti-waste, right? Which is wasting GPUs, wasting in human and Medicare. But is there, is there a broader theme that I’m, that maybe you can encapsulate more succinctly?

**Anjney [00:24:45]:** Yeah. The, from an engineering perspective, it’s very simple. It’s output maxing. It’s the, it’s the department of output maxing.

**Swyx [00:24:51]:** Making the most of what we have.

**Anjney [00:24:52]:** Exactly. I’m a huge believer in optimal outcomes. I think both in America and other countries, we are losing our appreciation for nuance, and this is the thing of And AI is the same case, right? Oh, the bitter lesson holds. Okay, fine. But that doesn’t mean you just like throw 500 GB300, 500,000 GB300s at your suboptimal model scaling and you waste a bunch of compute. It also doesn’t mean that, the most optimal is to have like 50 different architectures where there isn’t enough standardization. One of the reasons Anthropic has had extraordinary sort of velocity is ‘cause they picked the transform architecture and said, “This is simple. Let’s double down on it,” right? And now luckily there’s enough investment going to the space that we can afford other architectures, but at the time, investment was just too fragmented into other architectures, so that arguably unlocked scaling. So I think there’s a philosophy. I think we all owe it to ourselves to do output maxing with a new capability called AI on a global level. I think if I was starting a new department at Stanford, depending on how fuzzy or technical I wanted to be, I’d probably call it the Department of Alignment. Like-

**Swyx [00:25:59]:** It’s an overloaded term

**Anjney [00:26:01]:** But it is, But alignment really Is a hard problem. And I think when you unlock it, full stack alignment is super hard in any organization and in any system. Like in a, in a venture capital firm, if you can have full stack alignment between your limited partners and your, the founders who are creating the value and ultimately the public that owns the IPO stock, that is a gift that keeps giving. And when you study the history of these systems, when they start off, they usually start out small scale where the feedback loop is actually so tight that there’s alignment. And then the more you try to scale, the more division of labor happens, the more specialization happens, and at each step you add abstractions. And wherever there’s an API interface, there’s like loss. There’s communication loss. And so I think a really cool thing would be for us to figure out is there a way for us to have our cake and eat it too as an engineering discipline? Is there a way to actually scale up and scale out Without losing any alignment, without lossy transmission?

**Swyx [00:27:01]:** You mean standards?

**Anjney [00:27:02]:** So standards is one way. The other way is you just have net new capabilities. So like what we’re trying to do here is discover new superconductors. A room temperature superconductor would be a lossless transmission mechanism for energy. We would have flying cars. We are right within a few years of having a new room temperature superconductor. So I think those are the two. You either have to standardize On protocols or API specs that allow lossless communication, or you can come up with a whole new capability that unlocks so much abundance, the standardization doesn’t matter ‘cause you just unlock net new capacity. This, the, so this is what I spend my days thinking about these days.

**Swyx [00:27:38]:** No, I think every infra person at, who wants scale and wants to output max does eventually end up thinking about this. We don’t have time to go into it, but we have done an episode with SF Compute-

**Anjney [00:27:50]:** Oh, cool

**Swyx [00:27:50]:** That is trying to standardize The futures contract for compute. I don’t, I don’t know how that’s going by the way, but like at some point this will be public.

**Anjney [00:27:57]:** Oh, I think Evan is awesome and SF Compute is the kind of effort that I hope we can accelerate because what often happens is these exchanges are very hard to get, they, it’s hard to bootstrap them, right? Because they often require-- There’s many inefficiencies between parties. There’s trust boundary inefficiencies in infrastructure because you don’t trust, one part of the stack doesn’t trust another part of the stack to give them visibility. There’s capital markets inefficiencies, there’s operational efficiencies. So if you can inject like a single shock to the system of a ton of compute demand or supply, then you can accelerate, these new flywheels. And so my hope is one day, or soon, if SF Compute needs extra like has excess capacity, they just hook it up to the grid and they get flooded with demand from us. And on the other side, if they have a ton of demand but they don’t have supply, they just again hook up to the grid and it’s a two-way protocol where they can just hook up to our capacity. And I don’t think we’re too far from that. Today our working implementation of it is mostly through a group of labs, universities, and a few sort of trusted parties who are, who all feel like they’re in alignment to borrow an over sort of used word. But our hope is to just have it be an open protocol that anyone can hook up to on-

**Swyx [00:29:20]:** Hook up for demand or hook up for supply? In primarily demand, it sounds like. Like you-

**Anjney [00:29:25]:** No, both

**Swyx [00:29:26]:** You would want to offer demand.

**Anjney [00:29:27]:** Both. Yeah. Unfortunately, what’s happened in the last six weeks is, we thought we’d have a bunch of excess capacity by the end of this year. It’s all gone.

**Swyx [00:29:37]:** It’s exploding.

**Anjney [00:29:38]:** It, yeah. It’s all gone. And so I have, my text messages are full of friends, we know many of these people, these are founders who’ve raised billions of dollars in San Francisco going, “Oh, any chance you have like 50 nodes in the next few weeks?”

**Swyx [00:29:51]:** What is the scope for, non-Nvidia, right? You have Lisa Su coming and, Rainer Pope as well. And so There is a lot of demand for, more performance Alternative architectures and all that. At the same time, this hurts your standardization.

**Anjney [00:30:11]:** I don’t think so. So actually Rainer’s a great example, right? Rainer is a CEO and founder of, MatX. I actually had him by for office hours in the class earlier today, and there was an insight he brought up that I hadn’t considered before, which is when they decided to pick the standard For their data center, they picked the NVIDIA reference architecture. So the MatX chips Just plug in to any site that has an NVIDIA bring up planned. And, the-

**Swyx [00:30:42]:** It’s just software then. It’s, it’s not the-

**Anjney [00:30:44]:** A-

**Swyx [00:30:44]:** Hardware.

**Anjney [00:30:46]:** Well, from an input and IO perspective It’s the same footprint as an NVIDIA rack.

**Swyx [00:30:52]:** That makes sense.

**Anjney [00:30:53]:** Where they have done, innovated a bunch from what I can tell is on systems co-design. Which is where a lot of the gains are to be had. And so he picked He was “Anjney, we, there’s just so much work to do when you’re building a new chip company.”

**Swyx [00:31:08]:** Can’t fight every front.

**Anjney [00:31:08]:** You just can’t fight on every front. So my question to him was, “Well, you’re working on this new chip. Their tape-out is next year. What, who are you going to partner with to host the chips?” And he said, “Whoever will host them. That’s just not, that’s not my focus.” And I said, “But how did you “ you decided back to our earlier systems design question, he decided that, he didn’t want to be a full, fully integrated chip provider. The bottleneck they’re focused on is the logic die, and they, he feels they can crank out a ton of performance gains through co-design there. But then that means you delegate, to our question earlier, it, you he’s the data center provider is a different part of the stack, and so then he’s dependent on that part of the ecosystem to host his chips to get the performance gains to the customer. So now you have another abstraction, and you might have loss. So I asked him, “How do you prevent loss?” And back to your point, he said, “I just picked the NVIDIA standard ‘cause I didn’t want to Like I wanted to piggyback off of an existing protocol.” And that, what’s great about NVIDIA is that reference architecture is known.

**Swyx [00:32:15]:** Open.

**Anjney [00:32:15]:** It’s open. They’ve published it. So Jensen’s actually enabled someone like Rainer to build a chip company like MatX, and I don’t see them as competitive. The compute demand is so high. Like, I don’t I think NVIDIA’s not able to meet the demands of production, so we just need more chips. And I think it’s very smart what MatX has done, which is say, “We’re just going to we’re not going to innovate on the data center design ‘cause actually, thank you, Jensen, you’ve done all the hard work. Where we can innovate is somewhere else.” And I think that’s, that’s very healthy. I think that’s how we unblock new bottlenecks. And my view is these, the, chip teams like MatX, who have arrived at the insight that co-design is the way, The primary bottleneck for them is trust boundary. To do co-design well, you need visibility into the next model generation as soon as possible ‘cause it takes two years to tape out. So if by the time I bring my chip to market, your model architecture’s changed, I’m host. Now, when he was inside Google, he was sitting next to the Gemini team. He was on Palm or whatever.

**Swyx [00:33:19]:** His co-founder was the, was one, was one of the Palm guys, I think.

**Anjney [00:33:23]:** Yes. Yes, exactly. So when you’re inside the trust boundary of Google, then your systems co-design loop is super tight. When you leave as a founder, one of the biggest risks you take is now you’re outside the trust boundary. And so what I love doing is helping chip teams who can help us unlock more capacity for the independent ecosystem access to trust. Because when I If I’ve been, involved with a lab from day one, and I was lucky enough to work with Anthropic, and then I’m on the board of Mistral and helped Black Forest Labs get started. I think at this point I’m on six or seven different teams.

**Swyx [00:33:57]:** Only six? I feel like my mental number was going to be 13, but yeah, it’s-

**Anjney [00:34:02]:** No, I go deep with one at a time.

**Swyx [00:34:04]:** You’re founding CEO of Arena.

**Anjney [00:34:07]:** Nah, that was an, that was an-

**Swyx [00:34:08]:** Administrative CEO

**Anjney [00:34:09]:** It was an administrative five-month gig where Whalen and Anastasios were graduating from their PhDs, and they didn’t need a product team. So I helped recruit the head of engineering product and design. But Anastasios has always been the CEO of that company. I played a pinch-hitting I’m an intern. I was CEO intern For five months. -

**Swyx [00:34:33]:** I interviewed him, and he’s he’s very well-spoken. I think he’s a debate, former debate, champion. But also very quantitative and mathematical, which is-

**Anjney [00:34:41]:** He-

**Swyx [00:34:41]:** Such a unicorn.

**Anjney [00:34:43]:** See, what’s amazing about him? If you look at his output, he’s an output maxer. By the time he was graduating from his PhD, which he only graduated last year, he had published more work with a citation count than, people twice his age. But at the same time, he’d already started a project called LLM Arena that was being used by millions of people As a side project. And time and time again, what I’ve realized is venture capitalists suck at seeing human beings as, dynamic agents where-

**Swyx [00:35:14]:** They want to put you in a box

**Anjney [00:35:15]:** They want to put you in a box.

**Swyx [00:35:15]:** This is your thing.

**Anjney [00:35:16]:** So the first time I got introduced to Anastasios, somebody had told me “Oh, he’s amazing, but he’s a researcher.” I was “what? What do you mean he’s a researcher?” That’s what-

**Swyx [00:35:28]:** Like he’s not a CEO, not a founder.

**Anjney [00:35:29]:** Not a CEO, exactly. I was “Are you crazy? Do you Have you met Dario?” Dario’s a scientist. He’s gone from zero to, what will soon be a trillion-dollar company in four years. Being a CEO, nominally speaking, is not that hard. Being a good CEO is hard. Being a great CEO actually requires a level of performance that scientists who have already published at the top of their field have accomplished. It is super hard to be a competitive scientist. To publish in academia over the last 20, 30 years, to make it to the top of your discipline at a place like Berkeley, you are a star athlete. Like, you are an athlete of the mind, and you perform at the highest levels. And to get there, whether you’re, Anastasios or Whalen at Berkeley, or you are Robin, who-

**Swyx [00:36:23]:** BFL, yeah

**Anjney [00:36:24]:** With Black Forest, who created Stable Diffusion, or if you’re, like Guillaume at Meta, who created Llama before he started Mistral. The amount of human leadership you have to demonstrate to get the resources, like get the trust of the organization, publish it, put it up. I would just fund researchers all day Right? If who have contributed already to the field. If they’ve, if they’ve put SOTA out there, they’re, they’re star athletes already. If they haven’t done SOTA Look, they can still be good CEOs, but then I find the failure mode is that they just don’t want to be CEOs, they primarily want to publish, and that’s okay, too. One of the things we do with the AMP Grid is we donate excess compute. We have two nonprofits, like university labs. We carved out like a couple thousand H100s. But I do think there’s extraordinary research being done on university campuses. My father-in-law’s a physicist. He’s a professor. Extraordinary work in physics, and we need that. But if you want to be a CEO, what you need to be willing To do is be super confrontational, outside of science. Like within the scientific community, some of the best researchers are very confrontational about their convictions, right? This architecture is right. To be a great CEO, you basically have to be willing to be confrontational up and down the stack.

**Swyx [00:37:41]:** To your own team.

**Anjney [00:37:42]:** To your own team-

**Swyx [00:37:43]:** To customers

**Anjney [00:37:43]:** Hiring, recruiting customers. Well, I would say, Yeah, pretty much to everyone Everybody. Of course-

**Swyx [00:37:50]:** I see, I feel a little bit of that in my own work, but yeah, I can’t imagine the stakes that Dario has had to go through. It’s, it’s pretty insane.

**Anjney [00:37:56]:** No, I don’t think the stakes are that different From how you’re feeling it, right? Stakes are personal scaling vectors, right? The stakes that seem so low to you, like having this podcast where you can talk to somebody and just have a you’re an extraordinary communicator, right? Like already in this conversation, you’ve pulled more out of me than most people, and I’ve been on 12 podcasts in the last two weeks.

**Swyx [00:38:17]:** I think I, we’ve just seen each other enough that there’s some base trust.

**Anjney [00:38:20]:** There’s base trust.

**Swyx [00:38:20]:** And I think, and I know that you, that I’ve done my homework and like I know that trust is a big deal for you, so.

**Anjney [00:38:27]:** I think trust is about consistency, and you and I have seen each other In the community for years, right? Like, I remember the first time we met was at NeurIPS in New Orleans. I don’t know if you remember that, luncheon.

**Swyx [00:38:38]:** Oh my God.

**Anjney [00:38:39]:** Reiko had set up this Reiko’s amazing, and he set up this luncheon and-

**Swyx [00:38:43]:** Yeah, I was “Who’s this Discord guy?” I’m “Okay.” But-

**Anjney [00:38:45]:** No, you weren’t-

**Swyx [00:38:46]:** You were just “You made some investments.”

**Anjney [00:38:47]:** You were much less polite. You were “Who’s this VC?” You’re like-

**Swyx [00:38:51]:** No, I Was I? Oh my God.

**Anjney [00:38:53]:** It was-

**Swyx [00:38:53]:** I’m so sorry

**Anjney [00:38:53]:** It was visible on your face.

**Swyx [00:38:54]:** I’m so sorry. But you weren’t, you weren’t The introduction was bad. I was I didn’t know who you were.

**Anjney [00:39:00]:** The, see, this is the thing about context, right? Like, but then I think I heard your accent. And I was “Are you-”

**Swyx [00:39:06]:** Singapore, yeah

**Anjney [00:39:06]:** “Are you Singaporean?” And you’re “Yeah.” And I said, “I went to high school, JC, in Singapore.” And then the ice broke. But This is the there are in the scientific community, sometimes the stakes are very high for people who haven’t had the emotional, what is called EQ Coaching and mentorship, right? Which is like to have scientific impact, you often need to be a extraordinary emotional, like emotionally in tune person with the folks you’re trying to influence. And so what comes so naturally to you is actually a super high stakes thing to other people. And so I wouldn’t assume that Dario’s more stressed out than you. These things are you’d be surprised how similar and small sometimes the problems are to you That some of the world’s biggest, leaders are facing. And that’s what I’ve learned from this class. The guest speakers are Sam, Satya, Jensen.

**Swyx [00:40:01]:** AI Coachella.

**Anjney [00:40:02]:** Yeah. It’s AI Coachella, right? So we got to get all the headliners, and they’re I’m very lucky that some of these people have either mentored me over the years or I’ve done business with them. And when you, take the performative stuff out and any assumptions you may have about these people that you read in the press or on Twitter, We’re all just humans. We’re all trying to get along. And what’s so special about this moment is AI is forcing, like scaling, the bitter lesson is forcing a lot of people to revise their assumptions for how the world works and go back to first principles or go and educate themselves. So the kind of people I was, I won’t name who this person is, but I was at an event last week in Texas and, ran to somebody who said, “Anjney, I came across the class. What do you think about real time action prediction models?” And I was, don’t know how happy it made me feel when they asked me that question. I know they’ve done the work. They’ve challenged themselves. I’m, they didn’t ask me, “What do you think of world models?” They said, “What do you think of n-”

**Swyx [00:41:04]:** Real time action prediction

**Anjney [00:41:05]:** “action, real time action prediction models?” World models, don’t get me wrong, are cool and everything, but you and I both know that is a layer of abstraction that is sometimes not usefully precise enough. Right? Ours-

**Swyx [00:41:16]:** There’s like four different kinds of world models.

**Anjney [00:41:17]:** Yes, exactly.

**Swyx [00:41:18]:** We’ve done the part with general intuition, by the way, which is very focused on, -

**Anjney [00:41:22]:** Oh, cool. Yes. I love Pim. Pim is great. And this is what I love about people who’ve done that level of work. They realize they’re not in competition with people who the rest of the world thinks they’re in competition with.

**Swyx [00:41:34]:** Because they’re not in the category, they’re in the specific thing they’re trying to do.

**Anjney [00:41:37]:** They’re focused on their mission, and they have a systems understanding of the bottleneck they’re trying to solve. And when somebody else says, “I’m working on real time, action prediction models too,” Pim goes, “Oh, I love that person. I want, I can learn from them.” But the minute they’re “Oh, that person’s a world model person,” it’s “like which type of world model person?” But mostly they’re just trying to figure out if it’s a waste of their time, because we don’t have enough time. So, Pim, for example, is super, loves this other company I work with we’ve talked about called Black Forest Labs. And he’s mentioned to me multiple times that he’s so, He thinks what Flux is doing is really cool. Andy Blattman came by and spoke in the class. And what I find over and over again is for people who do the work, who can be usefully precise enough about like what is actually going on in the world of frontier research, The sense of camaraderie is still well and alive, but it gets lost sometimes when you have to like abstract The technical complexities in, business terms And then the VCs are “How are you different from that world model?” I’m going to say Where do I even start to explain this stuff? And then the misalignment creeps in.

**Swyx [00:42:43]:** This is good. Yeah, I think, people listening get a sense of, what it is like to operate at a real level, like yourself, rather than at, the journalist level, where you have to sort of put everyone in, a rough category and create a narrative of competition, and who’s winning today, who’s behind.

**Anjney [00:42:58]:** It-- this idea of winning is so Weird to me.

**Swyx [00:43:03]:** You do want to win. You want you want competitiveness.

**Anjney [00:43:06]:** No, I think you want to lead.

**Swyx [00:43:07]:** You want SOTA.

**Anjney [00:43:07]:** No, I think you want to lead. Yes, so you want to push the frontier. You want to push the SOTA. You want to do something that hasn’t been done before. You want to capture value, but you don’t want to capture so much value that, people think you’re unaligned with your mission or trying to do what’s best for the world. You want to capture enough value that you can keep innovating, right? And I think that people want to lead, they don’t really This idea of winning and losing, again, I love Jensen. He’s a, he’s a leader. The mindset that he talked about on Dwarkesh’s podcast, right? He’s “I didn’t wake up with a loser mindset.” I think that was awesome, right? Because he’s, he’s an engineer. Dwarkesh has done the work. So there’s at least-- even though the, to me, it was very obvious they’re talking about the same thing, they just passed each other. They just had to basically, Jensen has this, five-layer cake abstraction of how the industry works. And Dwarkesh had, I think from that podcast, had more of, a pre-training, mid-training, post-training systems loop concept.

**Swyx [00:44:04]:** It’s just a factor of who he talks to, right? Again, it’s very clear.

**Anjney [00:44:06]:** It’s the systems It’s the abstraction, the mental models, the It’s the whole-- Dude, so much of the problem in the world is reasoning by analogy. And then the assumptions that are held invisibly.

**Swyx [00:44:19]:** Yeah, I’ve, I’ve said, this is actually the best time in human history for first principles thinkers. Because everything you think will happen is actually now coming true.

**Anjney [00:44:28]:** Correct. And the venture capital community is, notorious for this, where people look-- In times of uncertainty, they, cling to axioms that ended up being true from the previous era, and they kind of like proclaim them with confidence as if they’re truths, but they’re not. And it’s very important to see the distinction between a heuristic and an axiom. An axiom can be proven-

**Swyx [00:44:55]:** Like from internal consistency point of view

**Anjney [00:44:56]:** With internal consistency. A heuristic is a way you kind of a shortcut. And my God, the number of people I have had to put up with over the last few years who proclaim-- use heuristics As axioms to judge people, to judge which companies are going to succeed or the number of people who are “Oh, yeah, Anthropic, they’re just training models right now,” but this one continue.

**Swyx [00:45:22]:** Because that’s a B2B SaaS?

**Anjney [00:45:23]:** Yeah, the, like Which over the fullness of time, if you squint at it, maybe. But the way you arrive there is so important that you can-- you just, you can dismiss people. Here’s what happened, right? What happened is Anthropic basically achieved takeoff in October of last year. That training run-

**Swyx [00:45:41]:** Whatever, three seven?

**Anjney [00:45:42]:** I forget the numbers now, but whatever that checkpoint was-

**Swyx [00:45:45]:** We saw the cognition.

**Anjney [00:45:46]:** Yeah. Right? You probably-- The, to those of us in the community, especially once post-training was done and it was released in December-

**Swyx [00:45:52]:** Yeah. Can I sneak a sneaky question in there? I don’t know if you have a perspective, maybe you don’t, I just The number one question is how did Anthropic crack coding, right? Because Claude One, Claude Two, okay, like it was part of it, but it wasn’t a big deal. And the leading hypothesis, it’s a lucky dice roll that was then compounded, right? Like it was like Mildly better, but then they saw it and they were “Okay, let’s really invest.”

**Anjney [00:46:17]:** I had this very annoying teacher. I went to this boarding school called Rishi Valley in India, which is like this, bird preserve. It’s like three hundred and fifty acres of bird preserve in rural India, and there was no technology for seven years. There was this teacher, I won’t name them, but they would have this-- I hated it every time he said this to me. He was “Luck fa-favors the prepared mind,” which is like a common saying, but the way he delivered it, always grated me, ‘cause he was always I was always one of those kids who got, a good grade without trying very hard. ‘Cause like high middle school is not that hard if you, if you’re generally, paying attention and so on. And there was this one time where I-- But then I would get an eighty percent grade, and he would keep pushing me to say “The reason you didn’t get the ninety-five plus percent is because you’re not that lucky.” And I would say, “What do you mean?” ‘Cause I would think that I deserved that grade, and I would sometimes argue with him. And he’d say, “You didn’t have a prepared mind. If you want to get lucky again “ There was basically one time where I got like ninety-five or ninety-six on this, on this subject, and I, now that I felt entitled. I was “Okay, I’m going to keep doing this,” and I didn’t. And then he was “Luck favors a prepared mind. You got lucky last time, but you got to stay prepared.” And I didn’t understand what he meant. Now, as I’m older, I’m okay, these adults actually knew a thing or two. Anthropic has been the most prepared company for four years. And so then when the right, context data comes in, the right developers start sending in, the right context diffs, Sure, you could say you got lucky, but if you ask me, they’re pr-pretty damn prepared with paranoia for like four years. And you have to remember, it was so hard for them to get going early on that they had to do so much more with so much less that you just have to be prepared to be so efficient.

**Swyx [00:48:06]:** Yes. There’s numbers on their burn compared to OpenAI. I’ve, I’ve written about it, but they are so much more efficient in their, in their tech stack.

**Anjney [00:48:14]:** It’s not even It’s not funny.

**Swyx [00:48:14]:** Not even close.

**Anjney [00:48:15]:** Yeah. But it’s so clear, right? Like how to output max for the world. They have been prepared, and you could call that luck, but Luck favors the prepared mind.

**Swyx [00:48:25]:** This is one of those things that I was going over some of your old lectures and, you were data, people think it’s a moat and actually it’s culture and actually it’s team Actually. And I, it’s-- there’s different levels of moats, and this is the ultimate one that determines everything else. Which you can then compound

**Anjney [00:48:43]:** You’re saying culture is the ultimate moat? Yeah. But the thing about culture is it’s very fragile. So moats, I don’t think they’re-- there’s very few moats I found that are actually moats. They’re-- It’s, it’s a nice concept, but in reality, you have to replenish your culture. Ben Horowitz was, the speaker in CS153 on Tuesday, and I asked him this question about the culture bottleneck in teams because, there are several AI teams-

**Swyx [00:49:09]:** His book, Hard Things About Hard Things

**Anjney [00:49:11]:** Hard Thing About Hard Things. But more concretely, there are so many AI labs today that have all the cash they need, they have all the compute they need, and they’re still not able to ship anything SOTA. And then you start seeing people leave and so on, and my diagnosis, it’s, is it’s the culture. And so I asked him, Ben, they’re-- He’s been one of the most aggressive investors in AI labs. He goes back to this thing which resonates in my mind a lot. It-- When I used to work at a16z, I would, book a conference room, and right outside the conference room, which is closest to the toilet ‘cause it was the fastest way for me to go use the bathroom between Zoom meetings-

**Swyx [00:49:45]:** Oh my God, I’ll put maxing my toilet optimization. Okay, never mind.

**Anjney [00:49:48]:** It was not healthy in hindsight, but maybe this is TMI. But anyway, outside that conference on the wall was this quote that was printed that said, “Culture is not a set of beliefs, it’s a set of actions.” And it’s by Bushido, is this, Japanese philosopher. And if you stop taking the actions that demonstrate the mission alignment to what you’ve said to your team and to your-- the world matters to you, then your culture starts to fray. So it’s not actually a moat, I would say. It’s a very brittle, fragile thing that requires daily tending to like a garden. But if you figure out the system to keep that garden tended, which I think ultimately comes down to knowing yourself ‘cause you most naturally, if you’re authentic and so on, you’ll naturally make trade-offs that seem effortless to you, but that reinforce your culture. And then That becomes this very hard thing for other people to catch up to. And at Anthropic, from day one, there was this mission like-- missionary like zeal and belief that, hey, these capabilities will scale. These systems are stochastic, not deterministic. There will be error bars, and until we crack interpretability, there’s risk. And at some point, people will go-- stop using Claude just for coding. They’ll use it in some mission-critical context where there’s-- it’ll throw off a bug, and then people are going to come blame them, and they want to be on the right side of history where they said, “Yes, this is a powerful technology. We think it’s going to change the world, And we want to be very measured and scientific about the fact that, ‘Hey, guys, these are stats models, statistical models.’ That’s how statistics works.” ultimately, when you’re training neural nets, it is just a statistical system. And I think that Belief that safety is important and that it might seem toy-like in the early days, and sometimes, you could say, “Anjney, they totally over-exaggerated the risk,” like two years ago when they said, “Let’s not launch Claude One,” or whatever. Well, okay, maybe in hindsight, but hindsight is twenty/twenty. And at the time, they didn’t know how that model would be used, and to them it felt existential if somebody came and said, “You weren’t responsible. It-- This wrote a bug.” The liability associated with that is massive. So how do you prevent against that? Well, day in, day out, you say safety. And when you start deviating from that, you have the team hold you accountable, you have the world hold you accountable, and I think that becomes a moat over time. At some point, that moat will get challenged and so on, and then it become fragile. I hope it endures because that’s the beauty of having founders run the show, ‘cause they can make really hard trade-offs to do mission alignment. The hardest part is in the earliest days when you don’t have a group of people who are going through difficulty, stress, crisis together, then your culture doesn’t get defined sharply enough, and that’s what I’m worried about right now, is there’s so much money going to these labs. There’s no hardship. There’s no-

**Swyx [00:52:50]:** To anyone who knows

**Anjney [00:52:51]:** There’s no to anyone who knows. And that, in hindsight, was a feature, not a bug for Anthropic. The number of people who said no, the number of people who said, “Sorry, we’re all doing investors in OpenAI,” that is competitive difference. It forces you to really understand, what is the hill you want to die on at the expense of everything else. What’s the P zero? And there, P zero from day one was coding. The reason, the mechanism system there was if we crack coding, Then we will crack AGI. Our mission is AGI. We want to get there safely. If we focus on coding, it’s such a generally powerful capability that it can accelerate all kinds of work on a computer. And if we can accelerate all kinds of work on a computer, we can get to AGI. As a result, they’ve had to say no to so much other stuff. Here, superconductivity is the mission. Coding is not the mission, so we use Claude. We’ll use Claude. We don’t care about that. The mission defines everything, and I think teams who can raise too much money too fast, too early, who don’t have to define what the P zero is, because that’s the only thing when you have scarce resources you got to You got to invest in, Those cultures end up being the most fragile and brittle, and they almost don’t even make it to take off.

**Swyx [00:54:03]:** So let’s apply this to Periodic since we’re here. What is the constraint or the hardship that they were forcing themselves to go through?

**Anjney [00:54:09]:** Dude, h-here? Are you crazy? No. Well, the-- Yeah, okay, so on a technical level, it’s physics. It’s literally reality.

**Swyx [00:54:17]:** But is there, is there, is there another one that’s, the company building-

**Anjney [00:54:20]:** Y-yeah. W-when-- Liam was a co-creator of ChatGPT, and Doge was skip level from Demis at DeepMind. Had created, Genome, so one of, one of the most important tools to come out of DeepMind. At the time, I was a visiting scientist at the Stanford Physics Department, and we had started benchmarking- frontier models on physics and science capabilities, they were not very good. They were good at, doing things like summarization of papers. But if you said, “Hey, could you, analyze the scientific data coming out of a condensed matter physics lab?” I was, I was in the condensed matter physics group at Stanford. It was terrible. So it was not popular 12 months ago. Periodic and I wouldn’t go into details, but there were people who said, As recently as a few months ago, who said they wanted to join the company. And they, for whatever reason, took a job elsewhere. They kind of reneged on their commitments. They took a job elsewhere that offered more money. Then we had a technical breakthrough. Create a SOTA system and, like It was-

**Swyx [00:55:30]:** I’m excited-

**Anjney [00:55:30]:** Yeah. When you see-

**Swyx [00:55:31]:** To cover it. We’ll, we’ll be doing a separate pod On Periodic.

**Anjney [00:55:33]:** And then they wanted to come back, and I said, “No.”

**Swyx [00:55:36]:** Yeah, of course.

**Anjney [00:55:36]:** “No way. You If you come here, you-”

**Swyx [00:55:38]:** You had your shot.

**Anjney [00:55:39]:** “You had your shot.”

**Swyx [00:55:40]:** ‘Cause it’s actually about culture.

**Anjney [00:55:41]:** Of course.

**Swyx [00:55:42]:** And first principles, yeah.

**Anjney [00:55:43]:** And look, I believe in second chances and so on, but time will need to heal. Some of those wounds were they will leave deep For them, will leave deep scars, but because I started my company at 24, 25, I had I went through the whole cycle of betrayal and drama. And so you realize, Silicon Valley is both a very missionary place, it’s also a very mercenary place. Sometimes people lose their minds With when they, when big money gets involved, which is, in the grand scheme of things, quite small money. Like, We you’re taking it-

**Swyx [00:56:17]:** Life changing to me, maybe less to you, but a lot of people have not been taught-

**Anjney [00:56:21]:** Like, I was-

**Swyx [00:56:21]:** How to deal with money. And yeah, we didn’t come up from, that privilege of a background, right?

**Anjney [00:56:26]:** I’m a street dog, man. I, look, I grew up in Rishi Valley. We didn’t have, like This was enforced brutalism. Jiddu Krishnamurti started the school, was “you will sleep on a hard slab of stone.” my mattress was this thin. ? And when you grew up in Singapore, when I got to Singapore, I used to sleep I was, part of the scholarship program, but, which was amazing. I’m very grateful to the Singaporean government. But I was at St. Andrew’s JC, and our dorm, which was by, Boon Keng-

**Swyx [00:56:57]:** -huh

**Anjney [00:56:57]:** MRT, was-

**Swyx [00:56:58]:** Which is not a prestigious neighborhood.

**Anjney [00:57:00]:** Well, it was a, it was a transition dorm. Because they were building this beautiful, residential campus on site At SAJC in Potong Pasir. But the We were the last, I think the second last batch to be in the transition site, which was some old, I think, I think it was, an immigrant labor-

**Swyx [00:57:20]:** That’s where we keep the people who work on the factories and stuff.

**Anjney [00:57:23]:** Right. So I lived in a For my 11th and 12th grade, I slept in a bedroom the size of this. Like, literally from there to here. Right? There were, bunk beds. And so, one bunk bed here, one bunk bed there, one on top, one on top, one more here, and then here was where our, we kept our toiletries and clothes and stuff. And when one guy would climb onto his bed there, this one would shake.

**Swyx [00:57:52]:** Oh, my God.

**Anjney [00:57:53]:** And one of my roommates who was from, And it was amazing. I loved every minute of it. My roommates were a guy who was a top ranked Dota player from PRC, from China. Didn’t speak a English. Loved him. Amazing guy.

**Swyx [00:58:09]:** All the Singapore scholars are fantastic, and honestly, we should treat you guys better ‘cause of what you go on to do. But-

**Anjney [00:58:15]:** Look-

**Swyx [00:58:15]:** Cool to know.

**Anjney [00:58:16]:** No, it what I’m saying is I don’t need much to be happy in life? When you’ve lived through that, money is a way, I think sometimes we measure ourselves, but when it’s, when it Stops becoming, to borrow Goodhart’s law, when it stops becoming just a byproduct and more of a measure, it stops having meaning.

**Swyx [00:58:38]:** You use it to do more meaningful things.

**Anjney [00:58:40]:** Correct.

**Swyx [00:58:40]:** It’s resources to pursue a mission. I’ve kept you longer than I am supposed to, but we should continue this in-

**Anjney [00:58:47]:** Any time, man

**Swyx [00:58:48]:** A part two.

**Anjney [00:58:48]:** Where to find me.

**Swyx [00:58:49]:** I really enjoyed this. Yeah. You’re, you’re so inspirational and, yeah, there’s more I want to dig into about how you’ve, set everything up, every single one of your investments, how AMP is going, but we don’t, we’re running out of time for that. But thank you so much for joining us.

**Anjney [00:59:01]:** It was great to see you, man. Let’s get chicken rice sometime.

**Swyx [00:59:04]:** Yes. I’m Actually, tomorrow. I’ll send you a, I’ll send you details. I’m hosting a birthday party.

**Anjney [00:59:09]:** And I don’t get an invite?

**Swyx [00:59:10]:** And it has to be a Singaporean birthday party, yes. Yeah, you’re getting invited right now.

**Anjney [00:59:13]:** Okay, perfect.

**Swyx [00:59:14]:** All right, thank you.

**Anjney [00:59:15]:** All right. Thanks, man.
