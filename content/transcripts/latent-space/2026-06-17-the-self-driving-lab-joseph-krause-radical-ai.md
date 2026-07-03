# 🔬 The Self-Driving Lab — Joseph Krause, Radical AI

- Podcast: Latent Space: The AI Engineer Podcast
- Source: https://www.latent.space/p/radical-ai
- 获取时间: 2026-07-02T16:44:26.479Z

## Transcript

On the Science pod, we’ve been covering a lot of the ground on how AI is revolutionizing STEM, but one of our favorite off the record topics since our launch is [which field is harder](https://www.latent.space/p/scientist-simulator) to accelerate: [math](https://www.latent.space/p/axiom), [bio](https://www.latent.space/p/esmfold2), or [physics](https://www.latent.space/p/lupsasca?utm_source=publication-search)? Today we’re back in Materials Science land with Radical — Unlike biological molecules that can be represented (and predicted!) by token strings, the success of materials involve many more macro complex variables like supply chains, microstructures, and **manufacturing processes**. If you recall [the LK99 drama of 2023](https://en.wikipedia.org/wiki/LK-99), while the basic ingredients were known, part of the confusion came from the lack of disclosure around manufacturing, and therefore defeated reproducibility. There is probably no "one-shot" model capable of designing a material that works perfectly at scale.

[Joseph Krause](https://x.com/josephfkrause) is a materials scientist through and through. And after spending his career watching industries stall out waiting for better materials, he founded [Radical AI](https://www.radical-ai.com/) to do something about it.

We recently sat down with Joseph to talk about **Radical AI**, materials discovery, self-driving labs, and the future of AI science. Joseph did not sugar coat anything: accelerating the materials discovery pipeline is a hard problem. But it’s one that he strongly believes we need to invest in, for the future of consumer products, aerospace, computing, and defense, and get them into every day use:

> _“We count it as a discovery when you pick up your phone and there’s a new material sitting inside of it.”_

How does Joseph plan on accelerating the rate of discovery? To understand this, it’s important to understand why this is such a hard problem in the first place. The first thing to keep in mind is that the material that is manufactured is far more than a chemical formula going into it. The process of mixing, annealing, growing, or generating the final material can result in wildly different outcomes.[1](#footnote-1) The entire materials discovery process, both from early discovery to large scale manufacturing, needs to be understood and characterized.

This philosophy has grown into a key insight at Radical AI: The construction of the self-driving lab. This lab is one that is not just automated, but in fact uses an “AI scientist” that combines scientific knowledge, computational techniques, and human intuition to generate and test hypotheses in an automated lab. Creating an AI scientist was key to making Radical’s self-driving labs work, since Joseph argues that no single AI model can one-shot materials.

> “In materials, the ground truth is the material itself. You have to be able to test it and characterize it.”

Joseph talked at length about the self-driving labs at Radical. Joseph argues that experimental data is the true “moat” in this industry. **An SDL functions as a closed-loop system where an AI scientist generates hypotheses, and automated robotics synthesize and characterize materials, running research campaigns in parallel rather than serially**.

The successes here were both on the automation side and on the science side. Radical has managed to scale their alloy discovery pipeline up to **producing and characterizing 1200 alloys in six months** — this nearly 10x speedup over the [DARPA/GE MACH program](https://www.darpa.mil/research/programs/materials-architectures-and-characterization-for-hypersonics) that aimed to create 500 new alloys in a year. Joseph claims they can scale this up even more and estimates they can produce a hundred new alloys tested and characterized in a day. A truly new paradigm in high-throughput alloy experimentation.

On the science side, their AI scientist proposed and tested 300 new materials, ten of which were found to have novel state-of-the-art properties that are already being further developed for commercial applications. The robustness of this first materials campaign reinforces Joseph’s claim that the moat is the lab and data.

> “It’s moved into elemental families or alloy families no one has ever published on before.”

Interestingly, Radical’s AI scientist has made some novel discoveries, expanding into elements that just were not explored prior. This is fascinating from a scientific perspective, but it’s also important for helping reduce supply chain bottlenecks for vital industries!

Joseph spent a lot of time in D.C. before founding Radical, and he’s clear-eyed about the competitive threat. China’s centralized model lets it stand up manufacturing hubs and immediately scale new materials from lab to production. We can’t replicate that, and Joseph is very clear we shouldn’t try. But we do need an answer. For Joseph, that means transforming the scientific workforce, investing in self-driving lab infrastructure at the national lab level, and leaning hard into public-private partnerships.

> “Now imagine every scientist in the United States doing 10 times the research output. That’s fundamental. That just changes the trajectory of discovery.”

Before we close, we’d like to give a shout out to Joseph and Radical for publishing and open sourcing much of their internal tooling pipeline. This includes:

*   [TorchSim](https://github.com/torchsim/torch-sim) ([preprint](https://arxiv.org/pdf/2508.06628), [blog](https://www.radical-ai.com/news/introducing-torchsim)): an open-source PyTorch-based MD simulation framework, which has been spun off into its own non-profit.
    
*   [MATRIX/MATRIX-PT](https://huggingface.co/radical-ai) ([preprint](https://arxiv.org/abs/2602.00376), [blog](https://www.radical-ai.com/news/leveraging-experimental-data-beyond-language-a-multimodal-benchmark)): An open-source dataset for benchmarking autonomous self-driving labs (MATRIX), along with with an open source model based upon this dataset (MATRIX-PT). We could talk about this extensively, but a fun data point is that improving reasoning in the area of materials also improved reasoning for biological systems! This is a truly unexpected result.
    

Big shout-out to the Radical team for sharing their work!

Materials discovery has been stuck on a 20–30 year timeline for generations. Joseph thinks that’s about to change, and Radical AI is putting that thesis to the test in the lab, one sample at a time.

We had a great time talking with Joseph. We hope you give it a listen!

*   **0:00** Introduction to the challenges of AI in material science
    
*   **0:52** Welcome and introduction to _Joseph Krause_ and _Radical AI_
    
*   **1:38** Why _Radical AI_ is different: The focus on experimental data and Self-Driving Labs (SDLs)
    
*   **6:19** The process: Candidate generation, synthesis, and characterization
    
*   **11:05** The application of exotic alloys in extreme environments (aerospace and defense)
    
*   **13:20** Barriers to entry: The slow process of qualification and manufacturing
    
*   **16:06** Supply chain constraints in material science
    
*   **19:24** Human-in-the-loop: Training the AI using scientific intuition
    
*   **20:35** The engineering challenges of automating a laboratory
    
*   **23:17** Defining the “Self-Driving Lab”: Research campaigns vs. just automation
    
*   **24:39** Mechanical challenges: Handling high-temperature samples
    
*   **27:41** Future scaling plans and the “Vertical Integration” strategy
    
*   **30:08** Validation timelines for high-tech industries (semiconductors, aerospace)
    
*   **31:47** The active learning loop and handling “negative results”
    
*   **35:32** AI exploring elemental families beyond human bias
    
*   **39:13** Throughput targets and the difference between AI and human exploration
    
*   **43:52** Why the dataset size is less critical than the quality of experimental feedback
    
*   **46:20** Addressing the lack of an “AlphaFold” for materials
    
*   **53:49** War stories from the lab: Building the infrastructure
    
*   **58:12** The shift in industry sentiment toward SDLs and tool interfaces
    
*   **1:01:14** Geopolitical considerations and the race in material science innovation
    
*   **1:06:12** Calls to action for ML and AI engineers: Rethinking the scientific stack
    
*   **1:09:53** The _Matrix_ model and using VLM for scientific knowledge extraction
    
*   **1:13:10** Why _Radical AI_ is open-sourcing their work
