# 🔬 The Coolest Diffusion Research Isn't in LLMs — Evan Feinberg & Sergey Edunov, Genesis Molecular AI

- Podcast: Latent Space: The AI Engineer Podcast
- Source: https://www.latent.space/p/the-coolest-diffusion-research-isnt
- 获取时间: 2026-07-02T16:40:02.555Z

## Transcript

This episode has a fun personal twist: There’s a counterfactual world where I was employee #1 at [Genesis Molecular AI](https://www.genesis.ml/),[1](https://www.latent.space/p/the-coolest-diffusion-research-isnt#footnote-1) the company behind today’s episode. A certain introduction happened a few weeks too late and I had already happily signed at Atomwise[2](https://www.latent.space/p/the-coolest-diffusion-research-isnt#footnote-2), another ML-for-drug-discovery startup. Same problem, different company. I was certain ML was going to transform small molecule drug discovery. Early results were underwhelming. Useful at times, but nowhere near revolutionary. In the last year I’ve seen signs that ML is finally ready to deliver on my convictions from a decade ago. Genesis is one of the places that might have finally cracked this problem. I was super excited to come full circle and catch up with co-founder [Evan Feinberg](https://www.linkedin.com/in/evanfeinberg) and CTO [Sergey Edunov](https://www.linkedin.com/in/edunov/).

If you are at all interested in small molecule drug discovery, we think you will find this fascinating!

In our nearly two hour chat we cover:

*   What is small molecule drug discovery, and why is it hard

*   Structure prediction as a hotbed of innovation in AI algorithms

*   How advances in AI elsewhere have enabled stepwise improvements in predictive power

*   How the community benchmarks are essentially calling AI slop good enough

*   The Genesis flagship model (PEARL) can routinely hit a threshold that is necessary for real-world applications

*   New agentic workflows enabled by these highly accurate models

Read on for more, and also some personal thoughts on the future at the end.

Sergey Edunov came to Genesis from Meta where he led Llama 2 training and Llama 3 pretraining. Sergey was a former physicist who thought he was done with physics after many years of training LLMs. Then, he discovered Genesis, and was blown away with all the novel architecture work they’ve been developing.

It probably surprises no one that modern LLM research has not resulted in fundamentally novel or exciting updates in architectures since almost the advent of the transformer — the entire field is using variants on the same idea that came out in the original “Attention is all you need” paper. Sure, some were quite useful (mixture-of-experts in particular allowed for the massive model paradigm we’re at today), but there was very little conceptually exciting.

> “We sort of had to wait for the right primitive to get created, and that turned out to be diffusion… Actually, some of the most innovative diffusion research that’s happening in our field is happening in 3D structure prediction right now.” — Evan Feinberg

The field of 3D structure prediction on the other hand has been a hotbed of research. Genesis’ recent model [PEARL](https://www.genesis.ml/news/introducing-pearl) (Place Every Atom at the Right Location) is able to understand protein flexibility, and model not just where the ligand goes, but also make small adjustments of the protein so that the two fit better than either alone. The field knew this was missing for a long time, but it was really hard to model until now.

What makes this problem so hard? As Sergey points out, there are 10^60 possible drug-like small molecules. You’ll never be able to search them all, and trying to find the good ones is something like finding a needle in a haystack — except everything except your needle is dangerous.

> “There are 10 to the 60 drug-like small molecules in the universe… it’s like finding a needle in a haystack, where everything except your needle is very, very dangerous.” — Sergey Edunov
> 
> 
> “Or finding hay in a needle stack might be a more apt analogy.” — Evan Feinberg

Trying to solve the multi-parameter optimization problem is even worse. What makes a strong binder and a molecule with good “ADMET Properties”[3](https://www.latent.space/p/the-coolest-diffusion-research-isnt#footnote-3) are oftentimes at tension with each other. For example, a good binder is likely greasy, but a greasy molecule is likely insoluble so it won’t enter the bloodstream and get to where it needs to go!

Genesis’ advances in generative AI have now pushed them beyond the threshold where they believe agentic drug discovery loops are finally possible. We all remember the early days of LLMs. They were great chatbots but terrible agents, as small errors compounded rapidly into uselessness. As LLMs got better, the usefulness of agents rapidly improved. Evan and Sergey argue that their models at Genesis recently passed a similar threshold. Their internal agentic drug-discovery system (code named SAPPHIRE) can now iterate like a chemist: look at and reason about poses, form hypotheses, read literature, use internal tools, create candidates for the next iteration. Combining this with automated lab partnerships like the one Genesis has with [Incyte](https://incyte.com/), we’re rapidly approaching a time of drug discovery agents running 24/7 making/testing new molecules. Exciting times!

One surprising point that isn’t talked enough about: the academic field of “co-folding” has settled on a benchmark value of “2 Angstrom RMSD” as a metric for a “good pose”. Evan does not mince words: this threshold is just bad. Perhaps even deceptively bad. For many strong binders, there’s a very clear pose, one that you can even directly resolve in the PDB electron density! And yet, with a 2Å RMSD threshold, you can get the pose quite wrong in ways that might even mislead a medicinal chemist. For example, flip around an aromatic ring, and everything looks reasonable, but you’re no longer modeling the right interactions.

Evan makes the strong claim that 1Å RMSD is really the threshold necessary to ensure the core of the molecule is sitting where it needs to be, and models all interactions.

> “If your model is sitting at 1.8, 1.9 Angstrom RMSD, that’s slop, most likely.” — Evan Feinberg

As a simple example, he points out hydrogen bonds which are responsible for many of the most important interactions in protein-ligand systems. Hydrogen bonds only have a 0.6Å range to be valid! Clearly if you’re accurately resolving all H-bonds, you generally have to be doing much better than the 2Å threshold.

This is clearly a hard-fought lesson for Evan and Genesis. In their opinion, the community is stuck on these benchmarks because academics developing methods were not users. Evan does see signs of life, with the use of new metrics such as lDDT for co-folding. Hopefully soon the community can agree that “1.8Å RMSD is slop”, and start hill climbing on this much harder task.

For a more thorough exploration of the weaknesses in conventional benchmarks, see the [PEARL technical report](https://arxiv.org/abs/2510.24670).

Which makes what happened next all the more striking. Near the end of the podcast, we talked about a recent “proof-is-in-the-pudding” moment for Genesis — evaluating their [PEARL model](https://www.genesis.ml/news/zero-shot-pearl-system-surpasses-all-cofolding-models-on-openbind) on a recently released OpenBind benchmark. This benchmark featured 802 never before seen co-complexes on a target protein EV-A71. This target seems almost custom-chosen to give most classical docking methods a problem. When a ligand binds to the main binding site, the protein moves around to close off the path the ligand used to enter the binding pocket. This process, known as “induced fit” is notoriously hard for traditional methods to model. The tradeoff is easy to understand: treating the protein as a static structure, it becomes difficult to place a ligand in a binding pocket. Treat the protein as dynamic, and now you have to simulate complicated processes that take a long time to resolve.

PEARL was able to model the induced fit of the ligand without running long MD simulations. Across the different evaluation metrics, PEARL came out not just ahead, but oftentimes well ahead of any public model. A truly impressive result.

> “Where PEARL was exceptionally good is figuring out how to move this loop. We are basically correct for every single pose.” — Sergey Edunov

Even more exciting, this was done without any fine-tuning, or using any data on the target or homologous targets — the template PDB was released after PEARL’s training cutoff.

As someone who has followed or participated in ML techniques for protein-ligand interactions for almost a decade, I was genuinely impressed with the results that Genesis has released recently. This has been many years in development, and I’m sure Evan and the team had many sleepless nights trying to get to this point. I also think other teams are making similar progress — both Isomorphic and Deep Origin have released results that seem spiritually similar and combine computation, wetlab data, ML, to achieve genuine predictive power that seemed impossible a decade ago. Sadly, all of the above are closed source so there’s no way to honestly compare them. Looking at the results I think there might be a time in the not so distant future where we can consider protein-ligand binding “solved”.

I sincerely hope that the academic community can take inspiration from these developments. Once you know something can be done, it’s much easier to execute. Still, I believe that the key enabler in all of the above was the tight integration of ML, large-scale computation, and real-world drug discovery applications. Sadly academia is just not structured in a way that makes such a development easy.

With those parting thoughts, we hope you give the podcast a listen!

[1](https://www.latent.space/p/the-coolest-diffusion-research-isnt#footnote-anchor-1)

At the time called Genesis Therapeutics

[3](https://www.latent.space/p/the-coolest-diffusion-research-isnt#footnote-anchor-3)

ADMET stands for Absorption, Distribution, Metabolism, Excretion, and Toxicity. This set of about 30 properties all need to be optimized in order for a molecule to be considered a “good drug”.
