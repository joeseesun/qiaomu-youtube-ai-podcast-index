# The data black hole at the center of AI

- Podcast: Dwarkesh Podcast
- Source: https://www.dwarkesh.com/p/the-sample-efficiency-black-hole
- 获取时间: 2026-07-03T02:10:20.730Z

## Transcript

[![Image 1: Dwarkesh Podcast](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fae02ccd4d1af8c41f7ca3e0382378157?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=rb1JGJuZKGgrxctnBd%2BdOlqkg50%3D)](https://www.dwarkesh.com/)

# [Dwarkesh Podcast](https://www.dwarkesh.com/)

Subscribe Sign in

[Video 2](blob:https://www.dwarkesh.com/11593ce6-7444-4133-9363-5cb7d3ced3d9)

Playback speed

1×

Subtitles

English

Share post

Share post at current time

 So one definition of intelligence is

 sample efficiency.

Share from 0:00

0:00

/

11:56

S1

SPEAKER 1

0:00 So  one  definition  of  intelligence  is  sample  efficiency.  That  is  to  say,  how  much  data  do  you  need  in  a  given  domain  to  operate  fluently  and  competently?  And  it's  actually  not  clear  that  we've  made  that  much  progress  in  training  sample  efficiency  over  the  last  few  years. 

0:13 It  seems  like  more  so  we've  just  dramatically  widened  and  improved  the  data  distribution.  The  main  way  that  AIs  have  been  getting  better  is  from  adding  more  and  better  data  and  scaling  the  compute  required  to  develop  that  data  in  the  first  place.  Obviously  RL  is  the  main  way  that  this  has  happened. 

0:28 You  can  think  of  RL  as  basically  a  kind  of  synthetic  data  generation  where  you  dump  a  ton  of  compute  against  a  verifier  or  a  rubric  if  you  have  another  one  as  a  judge  and  you  do  this  in  order  to  find  out  what  the  good  data  is  in  the  first  place. 

0:40 And  then  you  train  your  model  to  predict  these  correct  rollouts  much  in  the  same  way  that  you  might  train  that  model  to  predict  the  next  word  in  internet  text.  For  this  process  to  work,  the  model  must  have  at  least  some  prior  probability  to  anticipate  the  correct  solution  in  the  first  place, 

0:53 which  is  why  you  need  mind-stretching  amounts  of  human  expert  trajectories  in  every  single  field  and  skill  that  you  want  the  model  to  eventually  be  competent  in.  It's  hard  to  overstate  how  task-specific  and  bespoke  this  human  expert  data  is.  If  you  want  some  intuition,  I  recommend  checking  out  the  job  descriptions  on  Mercore  or  Serge's  websites. 

1:11 There  are  listings  for  Word  specialists  who  will  convert  legacy  documents  into  polished  Word  files,  and  legal  experts  who  will  write  realistic  M&A  diligences  or  securities  filings,  and  management  consultants  who  will  write  up  template  market  research.  And  it  is  not  only  that  the  data  have  to  be  so  domain  specific,  But  there  has  to  be  so  much  of  it. 

1:28 Each  skill  corresponds  to  at  least  hundreds  of  human  experts  who  are  generating  example  completions,  writing  rubrics,  and  explaining  their  chain  of  thought.  There's  a  reason  that  the  data  industry  that  is  producing  these  expert  labels  and  the  RL  environments  in  which  these  meticulously  cataloged  skills  can  congeal  is  earning  billions  a  year  in  revenue,  soon  to  be  decabillions. 

1:47 Now  imagine  if  it  took  a  couple  decades  worth  of  courses  with  hundreds  of  concurrent  professors  and  millions  of  practice  tasks  for  you  to  learn  how  to  polish  a  word  file.  Even  the  task  count  difference  here  understates  the  gap  because  the  models  have  to  grind  their  far  more  numerous  tasks,  each  far  harder. 

2:01 Whereas  a  human  student  might  practice  a  textbook  problem  once  or  twice.  With  GRPO,  these  models  are  generating  hundreds  to  thousands  of  rollouts  per  task  and  they  need  to  to  solve  the  credit  assignment  problem.  The  correct  way  to  think  about  these  models  is  not  like  a  human  who  has  learned  all 

2:14 these  different  skills  that  you  see  these  models  displaying.  It's  more  like  a  Frankenstein's  monster,  which  has  been  built  out  of  a  billion  graphs  of  carefully  constructed  examples  all  sewn  together.  Epoch  recently  reported  that  open  models  lag  state-of-the-art  frontier  models  by  four  months.  I  think  the  reason  it  is  relatively  easy  for  open  source  and  previous  laggards  to 

2:34 catch  up  to  within  months  of  the  frontier  is  that  data  is  the  real  driver  of  progress.  And  data  can  be  easily  distilled  from  public  APIs,  whereas  hyperparameters  and  training  tricks  and  architectural  optimizations  cannot.  And  if  the  latter  were  driving  most  of  the  progress,  then  catching  up  would  be  far  harder  than  we  are  observing  it  to  be. 

2:52 It  is  easy  to  forget  how  much  data  these  models  are  trained  on  and  how  much  more  it  is  than  what  we  humans  see  in  our  lifetimes.  We  see  these  AIs  as  a  galaxy  glittering  with  capabilities.  But  at  their  center,  invisible  to  the  naked  eye,  holding  all  the  constellations  together  is  an  unimaginably  massive  black  hole  of  data. 

3:11 Just  a  couple  of  points  of  comparison  to  help  drive  home  how  big  this  difference  is.  Here's  one.  If  a  person  sees  and  hears  on  average,  let's  say  generously,  2,000  words  an  hour,  then  between  the  time  they're  born  and  the  time  they're  an  adult,  they'll  see  about  200  million  tokens.  Now,  by  contrast, 

3:27 these  frontier  models  are  trained  on  somewhere  between  tens  to  hundreds  of  trillion  Trillions  of  tokens.  That  is  close  to  a  million-fold  difference.  Here's  another  point  of  comparison.  If  you  wanted  to,  you  could  learn  to  teleoperate  any  random  humanoid  or  robot  arm  within  hours.  And  if  you  could  get  AIs  to  learn  just  as  fast, 

3:44 robotics  would  be  a  decatrillion-dollar  industry,  and  you'd  have  an  endless  army  of  unitary  G1s  doing  all  kinds  of  useful  work  in  the  world.  But  the  reason  we  can't  do  this  is  that  our  AIs  learn  much  less  efficiently  than  we  do.  And  even  with  the  millions  of  hours  of  demonstrations  that  we  collected, 

3:59 this  is  not  enough  to  allow  them  to  perform  complex  open-ended  tasks.  And  a  final  point  of  comparison,  a  teenager  can  learn  to  drive  a  car  Now  I  want  to  deal  with  a  couple  of  common  responses  and  objections  that  people  have  to  these  kinds  of  comparisons.  One  thing  people  will  say, 

4:25 and  I  think  Karpathy  said  this  when  he  came  on  my  podcast,  is  that  for  humans,  many  billions  of  years  of  evolution  had  to  go  into  basically  pre-training  us.  And  so  we're  being  unfair  when  we're  comparing  how  little  data  we  see  within  our  lifetimes  to  what  these  cold-started  LLMs,  who  are  just  starting  off  with  a  totally  random  initialization, 

4:43 have  to  learn  from.  I  think  this  is  not  the  right  way  to  think  about  it.  Our  genome  is  only  three  gigabytes  big  and  only  one  to  two  percent  of  it  is  protein  coding.  And  that  is  simply  not  enough  space  to  store  the  parameters  of  this  network  that  supposedly  evolution  has  pre-trained. 

4:59 I  think  the  closer  analogy  is  more  that  evolution  found  the  right  hyperparameters  and  the  right  loss  functions,  and  that  within  our  lifetime,  we  are  still  from  scratch  building  up  the  connectome  in  our  brain,  that  is  to  say,  the  analogous  And  even  if  you  granted  this  comparison  and  you  said  yes, 

5:21 the  hundreds  of  trillions  of  tokens  that  these  models  see  to  get  pre-trained  is  similar  to  just  catching  up  to  evolution,  that  still  doesn't  explain  why  any  new  marginal  So  once  you  have  been  educated,  again,  you  don't  need  100  different  professors  to  teach  you  how  to  learn  a  new  programming  language.  But  these  AIs,  even  once  they're  pre-trained, 

5:42 still  require  enormous  amounts  of  data  to  learn  the  next  marginal  skill  and  the  next  marginal  skill  after  that.  Another  objection  to  this  kind  of  comparison  is  that  we're  not  including  multimodal  data  that  we're  seeing  in  our  lifetimes.  So  we  include  all  this  sensor  information  that  we  see  from  birth  to  adulthood. 

5:55 That's  probably  tens  to  hundreds  of  billions  of  tokens  of  data.  And  my  response  to  this  objection  is  simply  that  blind  and  deaf  people  who  have  And  that  suggests  to  me  that  all  these  billions  of  sensory  tokens  are  not  really  the  thing  that  is  making  humans  smart.  And  in  fact, 

6:13 deaf  people  who  don't  have  the  ability  to  hear  any  tokens,  who  just  have  to  consume  them  via  sign  language  and  reading  are  probably  ingesting  far  less  than  the  200  million  language  tokens  that  we  ballparked  earlier.  Which  suggests  that  even  the  million-fold  difference  that  we  calculated  earlier  might  be  an  understatement. 

6:30 Okay,  the  third  common  objection  people  make  is  that  we  just  haven't  scaled  enough.  We  have  these  scaling  laws.  They  tell  us  that  bigger  models  are  more  sample  efficient.  The  human  brain  we  know  is  about  100  trillion  synapses.  and  we  have  frontier  models  that  are  currently  around  five  trillion  parameters. 

6:43 And  so  maybe  we  could  just  achieve  human  level  sample  efficiency  if  we  made  these  models  one  to  two  orders  of  magnitude  bigger.  The  reason  this  objection  is  off  mark  is  actually  quite  interesting.  So  if  you  look  at  the  way  the  scaling  loss  equation  So,  suppose  you  have  a  model,  and  you've  trained  it  to  compute  optimally, 

7:03 and  you  say,  I  want  to  be  sample  efficient.  I  want  to  use  as  little  data  as  possible,  and  I'll  throw  in  as  many  parameters  as  is  necessary  to  make  that  happen.  So,  take  the  constants  from  the  chinchilla  scaling  law  paper.  Even  if  you  increase  the  number  of  parameters  by  infinity, 

7:17 that  would  only  decrease  by  a  factor  of  10  the  amount  of  data  that  you  need  in  order  to  keep  the  same  loss.  As  soon  as  I  earn  money,  Conor1oshea  Dwarkesh  I  just  tell  command  the  date  I'm  interested  in  and  it  does  the  rest.  It  takes  my  current  balance  and  adds  whatever  invoices  we  do  by  the  cutoff. 

8:02 Then  it  reviews  my  last  six  months  of  transaction  history  so  it  can  subtract  out  my  monthly  average  expenses  along  with  any  scheduled  And  if  there's  anything  relevant  coming  up  that's  not  in  Mercury  yet,  I  can  just  flag  it.  Things  like,  heads  up,  there's  a  $12,000  contractor  payment  that's  slated  for  July. 

8:17 And  that  gets  included  in  the  final  output.  Because  this  is  all  happening  in  chat,  and  every  answer  has  links  to  the  underlying  data,  I  can  easily  double-check  commands  work.  And  once  I'm  convinced,  I  can  just  tell  Command,  alright,  that  looks  good,  just  transfer  the  surplus  to  my  personal  account. 

8:29 And  you  will  immediately  draft  the  transfer  for  me  to  approve.  Command  is  live  now.  Visit  mercury.com  slash  command  to  learn  more.  Okay,  all  these  nerdy  comparisons  aside,  you  might  ask,  why  do  we  even  care  about  sample  efficiency?  Is  this  actually  necessary  for  the  labs  to  achieve  the  two  overarching  objectives  they  have,  which  are,  one, 

8:58 automate  white  collar  work,  and  two,  automate  AI  research  itself?  The  bet  that  the  labs  are  making  with  white-collar  work  is  that  the  common  tasks  that  a  software  engineer  or  analyst  or  accountant  needs  to  do  are  common.  And  as  a  result,  you  can  bring  them  into  the  training  distribution  quite  easily. 

9:13 If  you  look  at  the  revenue  curves  of  these  labs  over  the  last  few  months,  it  does  suggest  that  there's  an  enormous  amount  of  value  from  bringing  into  distribution  these  kinds  of  common  tasks,  even  if  we  can't  replicate  whatever  is  making  human  learning  so  special. 

9:26 And  it  might  be  more  inefficient  to  train  AIs  to  do  these  kinds  of  tasks  than  it  is  to  train  humans,  but  so  what?  Human  lifespan  simply  does  not  allow  for  the  quantity  and  the  breadth  of  training  that  these  models  experience.  If  you,  as  a  human,  had  some  weird  learning  disability  where  you  needed  to  read  through  every  public 

9:43 repository  on  GitHub  before  you  could  be  a  competent  software  engineer,  then  it  would  simply  not  make  sense  to  train  you  up.  You'd  be  on  Social  Security  by  the  early  stages  of  your  education,  and  even  once  you  were  trained,  you  would  only  be  able  to  work  on  one  project  at  a  time. 

9:56 But  AIs  can  learn  these  skills  by  firehosing  gigawatts  of  training  at  a  time.  And  what  they  learn  can  be  amortized  across  billions  of  sessions  at  once.  So  we  can  be  ludicrously  inefficient  in  training  them  up  and  still  be  wildly  in  the  green.  And  then  there's  a  question  of,  well, 

10:12 how  much  out-of-distribution  thinking  do  white-collar  employees  need  to  do  that  you  simply  can't  train  for  in  advance?  This  is  more  a  question  about  the  nature  of  different  jobs  than  it  is  a  question  about  AI  research.  And  it  also  depends  on  which  job  you're  talking  about. 

10:25 Some  jobs  are  so  mechanical  and  predictable  that  we  were  able  to  automate  them  long  before  the  modern  era  of  AI.  For  example,  bank  tellers  or  travel  agents.  But  there  are  other  jobs  which  require  dealing  on  a  daily  basis  with  problems  that  are  quite  distant  from  the  data  distribution.  I  think  software  engineering  is  probably  one  such. 

10:40 This  is  the  job  that  AIs  are  supposed  to  take  first,  but  I  would  be  willing  to  bet  that  there's  overall  more  demand  for  human  software  engineers  in  2027  than  there  is  right  now,  largely  due  to  the  complementary  input  of  AI.  The  lab's  plans  for  this  latter  category  of  jobs  is  first  to  automate  AI  research 

10:57 and  then  have  the  automated  AI  researchers  solve  the  sample  efficiency  problem.  So  then  the  question  is,  can  AIs,  which  do  not  have  human-level  sample  efficiency,  nonetheless  solve  the  remaining  resource  problems  that  stand  on  the  way  of  human-like  intelligence  and  learning?  This  is  a  very  complicated  question, 

11:13 and  I'll  have  to  address  it  in  a  much  longer  future  blog  post.  So  just  to  tease  it  a  bit,  I  think  that  the  way  that  people  currently  think  about  an  intelligence  explosion  is  very  clumsy  because  either  people  dismiss  the  possibility  of  AI  speeding  up  AI  progress  altogether, 

11:26 or  they  assume  that  some  kind  of  god  pops  out  the  other  end.  They  don't  reason  carefully  about  what  it  looks  like  to  have  a  period  where  AI  progress  is  much  faster  than  usual,  but  have  that  happen  atop  LLMs  and  the  particular  kinds  of  intelligences  that  LLMs  are.  But  I'll  save  that  for  next  time.  In  the  meanwhile, 

11:45 if  you  want  to  read  this  blog  post  or  all  the  other  blog  posts  I  write  or  be  alerted  when  I  write  a  future  blog  post,  go  sign  up  for  my  newsletter  at  my  website,  dwarkesh.com.  All  right,  I'll  see  you  later. 

47

18

8

## The data black hole at the center of AI

"We see these AIs as a galaxy glittering with capabilities, but at their center, invisible to the naked eye, holding all the constellations together, is an unimaginably massive black hole of data."

[![Image 2: Dwarkesh Patel's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fca6e6fdd725f2a12db0d392fe4f41d52?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Fb39fwEtR1J5PYlKTqCy0V0wVN8%3D)](https://substack.com/@dwarkesh)

[Dwarkesh Patel](https://substack.com/@dwarkesh)

Jun 19, 2026

47

18

8

Share

Transcript

One definition of intelligence is sample efficiency - that is to say, how much data do you need to see in a given domain in order to operate fluently and competently. It’s not clear that we’ve actually made much progress on training sample efficiency over the last few years - it seems like more so we’ve dramatically widened and improved the data distribution.

The main way that AIs have been getting better is from adding [more and better data](https://epoch.ai/gradient-updates/the-least-understood-driver-of-ai-progress), and scaling the compute to develop that data in the first place. Obviously RL is the main way that has happened. You can think of RL as a kind of synthetic data generation - you dump a lot of compute against a verifier in order to find the “good” data. Then you train your model to predict these correct rollouts, much in the same way that you might train it to predict the next word in internet text.

For this process to work, the model must have at least prior some probability to anticipate the correct solution, which is why you also need mind-stretching amounts of human expert trajectories in every single field and skill you want the model to be competent at.

It’s hard to overstate how task specific and bespoke this human expert data is. If you want to get some intuition, go read some job descriptions at[Mercor](https://work.mercor.com/explore) or Surge’s websites. There are listings for a [word specialists](https://work.mercor.com/explore?listingId=list_AAABnfU_UoKURfBKz-hPsIhO) who will convert legacy documents into polished Word files, and [legal experts](https://work.mercor.com/explore?listingId=list_AAABndKk8wND-PxLaqFAq5HH) who will write realistic M&A diligences or securities filings, and [management consultants](https://work.mercor.com/explore?listingId=list_AAABmu1UcrKMfGwlYNNP64qU) who will write up template market research, and dozens more other particular categories.

And it is not only that the data have to be so domain specific, but there has to be so much of it! Each skill corresponds to at least hundreds of human experts who are generating example completions, writing rubrics, and explaining their chain of thought. There’s a reason that the data industry producing these expert labels (and the RL environments in which their meticulously catalogued skills can congeal) is earning billions a year in revenue, soon deca-billions.

Imagine if it took a couple decades worth of courses with hundreds of concurrent professors and millions of practice tasks for you to learn how to polish a word file. Even the task count difference understates the gap - the models have to grind their far more numerous tasks each far harder. Whereas a human student might practice a textbook problem once or twice, GRPO has the model generate hundreds to thousands of rollouts per task. We are building some Frankenstein’s monster, with a billion grafts of carefully constructed examples sewn together.

Epoch recently reported that [open models only lag state-of-the-art closed models by 4 months](https://epoch.ai/data-insights/open-closed-eci-gap). I think the reason it is relatively easy for open source and previous laggards to catch up to within months of the frontier is that data is the real driver of progress. And data can be easily distilled from public APIs, whereas hyper-parameters and training tricks and architectural micro-optimizations cannot - if the latter were driving most of progress, then catching up would be harder than we are observing it to be.

It is easy to forget how much data these models are trained on, and how much more it is than what we humans see in our lifetimes. We see these AIs as a galaxy glittering with capabilities, but at their center, invisible to the naked eye, holding all the constellations together, is an unimaginably massive black hole of data.

### Intermission: Comparing human and AI sample efficiency

*   If a person hears and sees on average ~2,000 words an hour, then from birth to adulthood, they’ll see ~200 millions tokens. By contrast, frontier models are trained on somewhere between 10s to 100s of trillions of tokens. That is close to a million fold difference.

*   A person can learn to teleoperate any random humanoid or robot arm within hours. The reason robotics isn’t already a deca-trillion dollar industry, with a endless army of Unitree G1s doing all kinds of useful work in world, is that our AIs learn so much less efficiently than humans, and even the millions of hours of demonstrations we’ve collected is not enough to allow them to perform complex, open ended tasks.

*   A teenager can learn to drive a car with about 20 hours of practice. Even if you include their ~16 years of accumulated physical intuition as relevant training data, that is at least 3-4 orders of magnitude less than the amount of data Waymo and Tesla have needed to train their self-driving car models.

I wanna deal with some common objections to this kind of comparison:

*   Many billions of years of evolution is our pre-training, so it’s unfair to compare how little data we see simply within our lifetime to what these cold-started LLMs have to learn from.

    *   Our genome is 3GB, about 1-2% protein coding. That is just not enough space to store the model parameters that are supposedly pretrained (frontier models are terabytes sized). The closer analogy is probably that evolution has found the right hyperparameters and loss functions (Sidenote: I had an interesting [podcast with Adam Marblestone](https://www.dwarkesh.com/p/adam-marblestone) where he argued that the loss functions were the more significant find from evolution), but that the equivalent of parameter training is still happening within lifetime, and is encoded in the map of neural connections in the brain built up over a lifetime.

    *   Even if it were the case that we can explain away the trillions of tokens required to pretrain a base model as catching up to evolution, it doesn’t explain why the marginal capabilities take so much data - once you have been educated, you don’t need 100 different professors to learn a new programming language, but the AIs (even once pretrained) do.

*   These comparisons are not including the multimodal data we see in our lifetimes. If you include all this sensory information, we’re probably in the 10s to 100s of billions of tokens range from birth to adulthood

    *   Blind/deaf people who are cut off from this kind of sensory information might lack faculty with the relevant sense, but still have the same general intelligence as everyone else. Which suggests that all these billions of sensory tokens are not really the thing making humans smart.

    *   In fact, deaf people who can only communicate via sign language and reading (and not from hearing) are ingesting far less than the 200 million language tokens we calculated earlier, and even this is sufficient for them to be fully general intelligences.

*   Scaling laws tell us that bigger models are more sample efficient. The human brain is 100T synapses - if each synapse is ~1 parameter, and frontier models are currently roughly ~5T parameters, then maybe we could achieve human-level sample efficiency with another order of magnitude or two of parameter scaling.

    *   The way the scaling law equations work is that parameter and data terms are added to the loss independently. If you have a model that is trained compute optimally, and suppose you ask, well what if I just wanna maximize sample efficiency and use less data - and I’ll throw in as many parameters as it takes to make that happen. With the constants from the Chinchilla scaling laws paper (and the nature of the result wouldn’t change even with different constants), even if you increased the number of parameters by infinity, that would only decrease by a factor of ~10 the amount of data you need in order to keep the same loss. Humans are somewhere between thousands to millions of times more sample efficient than these models. Scaling of current models simply can’t make up for that discrepancy. This really does suggest that humans are on a different scaling curve altogether.

### Does sample efficiency matter?

But you might ask, why does sample efficiency matter? The labs have two overarching objectives: automate white collar work, and automate AI research itself. Is human level sample efficiency necessary for either?

The bet with white collar work is the common tasks that a software engineer or analyst or accountant does are, well common. And we can bring common tasks into distribution quite easily through RL and SFT. The [revenue curves](https://www.anthropic.com/news/series-h) of these AI labs suggest that there is enormous value from bringing tasks into distribution, even if we don’t replicate human sample efficiency.

Yes it is far more inefficient to train AIs to do these tasks than it is to train humans. But so what? Human lifespan does not allow for the quantity and breath of training these models experience. If you as a human had some weird learning disability where you needed to read through every public repository on Github before you could be a competent developer, it would not make sense to train you up. You’d be on Social Security by the early stages of your education, and even once you were trained, you could work on only one project at a time. But AIs can learn these skills by firehosing gigawatts of training at a time. And what they learn can be amortized across billions of sessions, so we can be ludicrously inefficient in training them and still be wildly in the green.

How much “out-of-distribution” thinking do white collar employees need to do that you simply can’t train for in advance? Well this is more a question about the nature of different jobs rather than a question about AI research. And also depends on the job - some jobs are mechanical and predictable enough that they were automated long before the modern era of AI, for example bank tellers or travel agents. And there are other jobs which require dealing on a daily basis with problems that are quite distant from the data distribution. Even software engineering (the jobs AIs are supposed to take first) is one such. I would be willing to bet that there’s overall more demand for human software engineers in 2028 than there is now, largely due to the complementary input of AI.

The labs’ plan for these later kinds of jobs is to first automate AI research, and then have the automated AI researchers solve this sample efficiency problem. So then the question is, can AIs, which do not have human-level sample efficiency, nonetheless solve the remaining research problems on the way to human-like intelligence and learning.

That question I’ll address in a future blog post - I think the way that people currently think about an intelligence explosion is pretty clumsy. Either people dismiss the possibility of AIs speeding up AI progress altogether, or they just assume that God pops out the other end. People are not reasoning about what extremely rapid progress, but starting with LLMs, looks like.

## Sponsor

Thanks to [Mercury](https://mercury.com/) for sponsoring this essay! Mercury is my banking platform, and they just released a new AI feature called Command. Since I already use Mercury to run basically my entire business, Command has access to all the info it needs to get real work done. I can ask it to send invoices, or categorize expenses, or even transfer money… and Command just handles it. Learn more at [mercury.com/command](https://mercury.com/command)

[![Image 3: Piyush's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Ff9d705d88edbaa986b95c6a62d07d9ef?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=6UnVYRTTeGrC0QPOvALGW1ARzBU%3D)](https://substack.com/profile/281025-piyush)[![Image 4: Engincan Veske's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F580443fd5b871f75cfde8263c611f0b4?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=borLuSSJuOUJzt6ch37lU245Q1M%3D)](https://substack.com/profile/86937968-engincan-veske)[![Image 5: Jameson Graber's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fd6029eda2e21f3dd053d23dc25eb22ad?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=2CGJEtJigMxOdQdvsHMm3fXwivA%3D)](https://substack.com/profile/138773302-jameson-graber)[![Image 6: steele's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fe23f75cd11c9b957fdb1fa59e315448b?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=pzQ1OijdgcqxNAxBZjxIW0efIyY%3D)](https://substack.com/profile/16209180-steele)[![Image 7: Benjamin Hause's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7964d58b6480403aeec8f781a7c52698?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=NKV%2BDGSTphmptkZUZEaGMK1gqaM%3D)](https://substack.com/profile/217540386-benjamin-hause)

[47 Likes](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)∙

[8 Restacks](https://substack.com/note/p-202734201/restacks?utm_source=substack&utm_content=facepile-restacks)

#### Discussion about this video

Comments Restacks

![Image 8: User's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fe222d4067e53c83b7ce0b4aa064f8f09?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=9%2BcHgA%2BLFrW7PDopLTgOLrYix1U%3D)

[![Image 9: Yarrow Bouchard's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F19be890ce562eef251ea7ad0703da23c?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=XgpEU5Wj4V%2BWhmE71x0LfcuskBQ%3D)](https://substack.com/profile/6053245-yarrow-bouchard?utm_source=comment)

[Yarrow Bouchard](https://substack.com/profile/6053245-yarrow-bouchard?utm_source=substack-feed-item)

[Jun 19](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279303620 "Jun 19, 2026, 8:21 PM")Edited

I assume this example comes from Yann LeCun:

"A teenager can learn to drive a car with about 20 hours of practice."

He's been giving this exact example in his talks and interviews for years.

For example, from a Meta AI blog post from 2022:

"As Meta AI’s Chief AI Scientist Yann LeCun notes, a teenager who has never sat behind a steering wheel can learn to drive in about 20 hours, while the best autonomous driving systems today need millions or billions of pieces of labeled training data and millions of reinforcement learning trials in virtual environments. And even then, they fall short of human’s ability to drive a car reliably."

[https://ai.meta.com/blog/yann-lecun-advances-in-ai-research/](https://ai.meta.com/blog/yann-lecun-advances-in-ai-research/)

[Like (3)](javascript:void(0))[Reply (1)](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 10: The Synthesis's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F008944fb2becc8d4e62813b8d154e105?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=9E5cswOXGXDglH2crfr1rP%2F8EGo%3D)](https://substack.com/profile/455020385-the-synthesis?utm_source=comment)

[The Synthesis](https://substack.com/profile/455020385-the-synthesis?utm_source=substack-feed-item)

[Jun 21](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279963436 "Jun 21, 2026, 2:13 AM")

The teenager-driving example is LeCun's, yes. What's interesting is the post's framing flips his point: those millions of RL trials aren't compensating for poor sample efficiency, they're the synthetic data generation step itself. The teenager already has the prior. The car-driving AI is still building one from scratch, which is why it needs billions of labeled frames to approximate what 20 hours installs in a human.

[Like (1)](javascript:void(0))[Reply (1)](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 11: Yarrow Bouchard's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F19be890ce562eef251ea7ad0703da23c?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=XgpEU5Wj4V%2BWhmE71x0LfcuskBQ%3D)](https://substack.com/profile/6053245-yarrow-bouchard?utm_source=comment)

[Yarrow Bouchard](https://substack.com/profile/6053245-yarrow-bouchard?utm_source=substack-feed-item)

[Jun 21](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279964346 "Jun 21, 2026, 2:16 AM")

This post doesn't flip LeCun's point. It repeats it.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 12: Naga Sandeep Ramachandruni's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7521c632a873598d465dd5e7c49e8881?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=QeBubSZCIDKO3d%2F9Fa2uUlGkmt8%3D)](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=comment)

[Naga Sandeep Ramachandruni](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=substack-feed-item)

[Jun 20](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279698568 "Jun 20, 2026, 3:38 PM")

I think the "black hole of data" framing mistakes a data problem for an architecture problem.

Humans aren't magically sample-efficient — we front-load an enormous, richly *constrained* pretraining run: embodied, multi-sensory, closed-loop, survival-stakes data that builds a full world model (geometry, physics, object permanence). Every new skill is then a cheap last mile on top of that. The 20-hours-to-drive number isn't efficiency from scratch; it's the head bolted onto a foundation the car never had. Sparse "don't crash" supervision is wildly underconstrained, so the car wanders a huge space and needs far more data. That's not the car being a worse learner — it's the data carrying fewer constraints.

LLMs are the extreme case: next-token prediction is about the least constrained objective imaginable, with no grounding, no staged curriculum, no evaluative feedback. We have literally never trained them the way a human is trained, so claiming the inefficiency is architectural is unsupported — we haven't run the experiment.

Meanwhile the actual track record says data, not architecture, is the driver: open models trail by four months because data distills and architecture barely moves. Gradient descent — a dumb hill-climbing rule — plus enough *constrained* data has eaten vision, language, and games. The bet that visual intelligence "needs tons of data and progress will be slow" gets the lesson backwards. Fill in embodied, constrained data and the gap closes. We should be looking at the data, not despairing about the architecture.

[Like (1)](javascript:void(0))[Reply (2)](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 13: Alistair Penbroke's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7a7fa47c9f73508ddd64df0cbea945ee?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=jGbNngXyU0rMP7Exj7bJbWZNea0%3D)](https://substack.com/profile/2420813-alistair-penbroke?utm_source=comment)

[Alistair Penbroke](https://substack.com/profile/2420813-alistair-penbroke?utm_source=substack-feed-item)

[Jun 21](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280300843 "Jun 21, 2026, 6:41 PM")

This feels like an LLM written comment tbh.

[Like (1)](javascript:void(0))[Reply (1)](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 14: Naga Sandeep Ramachandruni's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7521c632a873598d465dd5e7c49e8881?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=QeBubSZCIDKO3d%2F9Fa2uUlGkmt8%3D)](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=comment)

[Naga Sandeep Ramachandruni](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280449318 "Jun 22, 2026, 12:32 AM")

I am not very good at writing. thoughts are mine.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 15: blake harper's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F3f58ca2f3ef74cd9e9b4c34ce2e4bd09?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=ThMB2UXwsiP%2FU5RNbjjC%2FCkcIxw%3D)](https://substack.com/profile/28107508-blake-harper?utm_source=comment)

[blake harper](https://substack.com/profile/28107508-blake-harper?utm_source=substack-feed-item)

[Jun 20](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279778651 "Jun 20, 2026, 6:18 PM")

Agree with this but what if the architectures impact your ability to get that constrained data in the first place? Seems pretty hard to conjure it up independently.

[Like](javascript:void(0))[Reply (1)](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 16: Naga Sandeep Ramachandruni's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7521c632a873598d465dd5e7c49e8881?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=QeBubSZCIDKO3d%2F9Fa2uUlGkmt8%3D)](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=comment)

[Naga Sandeep Ramachandruni](https://substack.com/profile/6822263-naga-sandeep-ramachandruni?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280448203 "Jun 22, 2026, 12:29 AM")

Everything is not binary. its not just constrained data and its not just archiecture. Animals and humans both can see the computer or books and can hear what humans speak and can see animals or cookies infront of them. but they don't have the architecture to process language and map into meaning like human does or solve complex counting of cookies problem and can trade between animals. the difference is architecture because we both are literally exposed to same world except that animals can't speak. The same constrained data is exposed to same animals and humans.but here architecture is the problem because animals didn't quite had larger brain and same components like human which does this complex problem solving. Although some animals can still plan and do complex reasoning and do but they are not in the same level as humans do.

but when comparing with a computer they can increase the connections of neurons or can have many loss functions or complex architecture like transformers. they already have solved far more complex problems than humans. Currently their ability is limited in visual intelligence or navigation intelligence where they can't grasp objects and do the same kind of physical work as humans do. When a small animal like squireel or ant or mosquito with very limited processing power can navigate the complex world, there is something the computers are lagging less about architecture and more about embodiment and the nature of usage of constrained data. we don't have the same way of visual and multisensory data tied with embodiment and survival which teaches the animals and humans the skill of navigation or visual intelligence .

There is more about constrained data than architecture. Yes the architecture could be different or suboptimal but just having perfect architecture can't solve the problem but having constrained data can solve even without perfect architecture.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 17: Sam's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Faffafb6f7fe7495767839b91a84b2729?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=EZOzb%2BAQjMKmKRPihGaLxKaz8bk%3D)](https://substack.com/profile/10062371-sam?utm_source=comment)

[Sam](https://substack.com/profile/10062371-sam?utm_source=substack-feed-item)

[Jun 19](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279211323 "Jun 19, 2026, 5:20 PM")

Not mentioning the extreme sample efficiency of in context learning is an interesting choice

[Like (1)](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 18: Alec Pritzos's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fcf6ffc25a9e18af9a700a26c3d099104?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=8hHBbeJ%2BDpQ55HwY2gUByzQGoJY%3D)](https://substack.com/profile/234936587-alec-pritzos?utm_source=comment)

[Alec Pritzos](https://substack.com/profile/234936587-alec-pritzos?utm_source=substack-feed-item)

[7d](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/282959791 "Jun 26, 2026, 6:18 AM")

I'd push back a little on the idea that inefficiency doesn't matter because the cost amortizes across billions of sessions. That holds while the task stays put, but the jobs you flag as genuinely hard, like real software work, keep drifting out of distribution, so the data bill there never really gets paid off. It comes due again every time the workflow shifts.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 19: Danno28's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F2c24cbaf0626a051484f6bc6e06bfe30?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=VsG%2BFSn4vPejxnHA4116Y%2BW%2BH2U%3D)](https://substack.com/profile/10448315-danno28?utm_source=comment)

[Danno28](https://substack.com/profile/10448315-danno28?utm_source=substack-feed-item)

[Jun 25](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/282245603 "Jun 25, 2026, 12:23 AM")

Thank you, this is a really interesting thesis.

I notice I am confused though.

The classic description of inputs to pre-training is data, compute and algorithms.

There is lots of research suggesting that there have been real algorithmic improvements in pre-training.

This 2024 paper, for example, "Algorithmic Progress in Language Models"

[https://arxiv.org/abs/2403.05812](https://arxiv.org/abs/2403.05812)

found that " the compute required to reach a set performance threshold has halved approximately every 8 months."

This seems inconsistent with your thesis that the progress has actually been driven just by data (or some combination of data and compute). It suggests that even with no new data, no new compute, we could achieve a 1000x performance improvement in 6 to 7 years.

I am not sure how to reconcile that with the really quite persuasive evidence in your post.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 20: Kyle H's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fa469a8ae6a6d06d951568234b8927b12?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=vsf2%2Bd8qdlsne9RuSK3Uk471YPk%3D)](https://substack.com/profile/293975411-kyle-h?utm_source=comment)

[Kyle H](https://substack.com/profile/293975411-kyle-h?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280963923 "Jun 22, 2026, 9:52 PM")

In the post you wagered more demand for SWE in 2028, but in the video you scaled back to 2027 👀

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 21: Alex Kubiesa's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F5bfc01d42c70b86a7a8a777f95cc88fb?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=6BGmHRlKFySh4lk6JiBUjZOYqzE%3D)](https://substack.com/profile/231899164-alex-kubiesa?utm_source=comment)

[Alex Kubiesa](https://substack.com/profile/231899164-alex-kubiesa?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280879787 "Jun 22, 2026, 7:11 PM")

I find absolutely ludicrous that we would automate all white-collar work without sample efficiency and continual learning.

I use AI for document processing and it takes a lot of work to communicate to an LLM how *our company* wants documents classified, data extracted etc.

Prompt tuning is too indirect. In-context learning just doesn’t work - even a single document can be hundreds of pages long and overload the context window.

I want a way to point at an example, or at a specific mistake the AI made, and have it know not to make that mistake again. Not for every variant of a task to constitute a huge labelling effort.

And what seemingly never gets mentioned: even if we automate all jobs *that exist today*, new jobs will emerge as a result, and the training data for those won’t exist yet. So unless AI can adapt to job market changes quickly - with continual learning and sample efficiency - there will always be a lag.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 22: KacyycaK's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F91b0f0b4a50877fb0596c60461ae6de9?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=cnlFqvDZScYBPgIov4SKg7dKkao%3D)](https://substack.com/profile/512574369-kacyycak?utm_source=comment)

[KacyycaK](https://substack.com/profile/512574369-kacyycak?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280659720 "Jun 22, 2026, 12:33 PM")

Yay! I remember you…you interviewed Elon once…fantastic interview…clearly I need to know everything about you…LOL. JK…but glad you showed up on my feed.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 23: Juno's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F3df37d087923ba13f312c7543b7e7d7f?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Aw9nlw%2BH%2BhtA3PrtDvK1YQv4exQ%3D)](https://substack.com/profile/522159293-juno?utm_source=comment)

[Juno](https://substack.com/profile/522159293-juno?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280629138 "Jun 22, 2026, 11:21 AM")

This essay really nails why “data” is becoming the real bottleneck in AI progress. If models are still so sample-inefficient, then the next big infrastructure layer should not just be better trainers or bigger clusters, but better systems for generating, cleaning, selecting, weighting, and reusing high-quality data.

This is exactly the problem DataFlow and DataFlex were created to tackle. DataFlow （[https://github.com/OpenDCAI/DataFlow）focuses](https://github.com/OpenDCAI/DataFlow%EF%BC%89focuses) on turning messy raw sources into model-ready data through reusable pipelines for generation, filtering, evaluation, refinement, RAG, Text2SQL, reasoning, code, and knowledge-base construction. DataFlex （[https://github.com/OpenDCAI/DataFlex）then](https://github.com/OpenDCAI/DataFlex%EF%BC%89then) pushes this further into training itself, with data-centric dynamic training methods such as sample selection, domain mixture optimization, and sample reweighting.

In other words, if the “black hole” is the enormous amount of bespoke expert data needed to make models competent, we probably need open infrastructure that treats data as a first-class optimization target, not just something collected before training starts.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 24: Wrong On The Internet's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F0cad89d7471821511411c278401f4c9a?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=8NUoDlm3qPbCS9hAFfXTxaxeIHA%3D)](https://substack.com/profile/136819765-wrong-on-the-internet?utm_source=comment)

[Wrong On The Internet](https://substack.com/profile/136819765-wrong-on-the-internet?utm_source=substack-feed-item)

[Jun 22](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/280508549 "Jun 22, 2026, 3:35 AM")Edited

This is a great post, but I have a quibble with a minor point. We have strong evidence that the genome encodes an astounding amount of information relating to innate behaviors. I think a lot of AI researchers (and even many neuroscientists) are too dismissive of the role of evolution. I recommend talking to Tony Zador about this. Here's a section of a 2019 article of his laying out some of this evidence in a way I think you'd appreciate: [https://www.nature.com/articles/s41467-019-11786-6#Sec4](https://www.nature.com/articles/s41467-019-11786-6#Sec4) . I'd be interested to hear his more current thoughts. I also recommend checking out this great paper from the same time period showing that human learning algorithms may not be enough: [https://rachit-dubey.github.io/humanRL_website/](https://rachit-dubey.github.io/humanRL_website/)

That's not to say that better learning algorithms are unattainable. LLMs are fantastic in-context learners, so that's in some sense an existence proof that better efficiency is possible.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 25: Irredeemably Incorrect's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fc44709299a2d6c2c322c43aa6da2f2a0?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=jeGcnDwXkUpSly%2FVTh3TJXiyof4%3D)](https://substack.com/profile/103789170-irredeemably-incorrect?utm_source=comment)

[Irredeemably Incorrect](https://substack.com/profile/103789170-irredeemably-incorrect?utm_source=substack-feed-item)

[Jun 20](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279822524 "Jun 20, 2026, 7:52 PM")

Good points in this- I've noticed when I apply AI to novel cases, it's pretty bad without discrete rules.

In one of Steven Pinker's books he talks about infinite recursion, or being able to refer to infinite sentences (I know that you know that I know and so on)- it's unclear to me how conceptually you'd stop a problem like this in the AI space when all of these are possible.

There's a little bit of game theory of trying to right-size predictions to human intelligence, to give the types of answers that you'd hope to get. But, that often involves theory of minds that I'm not sure have been solved.

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 26: Anastasia Borovykh's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fad77b5876f6179c5e8774aab49a11295?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=4AmeolsyxK9BdRsoqdednrehEwE%3D)](https://substack.com/profile/178168683-anastasia-borovykh?utm_source=comment)

[Anastasia Borovykh](https://substack.com/profile/178168683-anastasia-borovykh?utm_source=substack-feed-item)

[Jun 19](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole/comment/279345501 "Jun 19, 2026, 9:48 PM")

Great video! Nice to shed light on this data hole

[Like](javascript:void(0))[Reply](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)[Share](https://www.dwarkesh.com/p/the-sample-efficiency-black-hole)

[![Image 27: Dwarkesh Podcast](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fbe8a3562214a35f76269c089c8632f28?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=ImfbcwdxPnW2%2B8A2vd1kD%2F6pCdc%3D)](https://www.dwarkesh.com/)

Dwarkesh Podcast

Deeply researched interviews

Deeply researched interviews

Subscribe

Listen on

Substack App

Apple Podcasts

Spotify

YouTube

RSS Feed

Appears in episode

[![Image 28: Dwarkesh Patel's avatar](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F7d90564ab1f2362c4b254d9fe89b171c?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=VK%2BlrOwtwRnJGkqW%2Bca55RyGGIc%3D)](https://substack.com/@dwarkesh?utm_source=author-byline-face-podcast)

[Dwarkesh Patel](https://substack.com/@dwarkesh)

Recent Episodes

![Image 29](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F34b4ef4feb7dee78087047c394485aa1?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=fAiS4r0whkia5ui5RcY925%2BeNzU%3D)

[Grant Sanderson – AI and the future of math](https://www.dwarkesh.com/p/grant-sanderson-2)

Jun 30•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 30](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F1ed6354f5a6428d81252c1a36c15f1e5?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Mv6rx%2BsE%2Bq2DzkkDckciUZkPeg4%3D)

[The next big breakthrough will be AIs learning on the job](https://www.dwarkesh.com/p/the-next-paradigm)

Jun 26•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 31](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F2abd4b7d92052a256d35daafa39c1538?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=dJRsIhEgDiC%2FQjMEyBdJ1kLYfN4%3D)

[Ada Palmer – Machiavelli is the most misunderstood thinker of all time](https://www.dwarkesh.com/p/ada-palmer-2)

Jun 16•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 32](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F5eaba45897b7e2ee3067d42c272b0efa?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=THKvn9KjSfAAOys9dAsovibvQdM%3D)

[Alex Imas and Phil Trammell – What remains scarce after AGI?](https://www.dwarkesh.com/p/alex-imas-phil-trammell)

Jun 4•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 33](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2Fe5254739aa7e40f0644ae502a29a0b2a?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=pgNeBBtbmhUCRiyi61DZBrGGKKo%3D)

[Reiner Pope – Chip design from the bottom up](https://www.dwarkesh.com/p/reiner-pope-2)

May 22•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 34](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F04756e1ca2e54fc7e70a64e462b79ed8?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=IMMkJ1urPw9wqX4mb11HDq0XOGE%3D)

[Eric Jang – Building AlphaGo from scratch](https://www.dwarkesh.com/p/eric-jang)

May 15•[Dwarkesh Patel](https://substack.com/@dwarkesh)

![Image 35](https://get-notes.umiwi.com/morphling%2Fvoicenotes%2Fprod%2F1eda8115526b1228f1a81468da5bba70?Expires=1785636620&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=9gmo7uuByfgOTtj1wQHdaIpdNVE%3D)

[David Reich – Why the Bronze Age was an inflection point in human evolution](https://www.dwarkesh.com/p/david-reich-2)

May 8•[Dwarkesh Patel](https://substack.com/@dwarkesh)

### Ready for more?

Subscribe

© 2026 Dwarkesh Patel · [Privacy](https://substack.com/privacy) ∙ [Terms](https://substack.com/tos) ∙ [Collection notice](https://substack.com/ccpa#personal-data-collected)

[Start your Substack](https://substack.com/signup?utm_source=substack&utm_medium=web&utm_content=footer)[Get the app](https://substack.com/app/app-store-redirect?utm_campaign=app-marketing&utm_content=web-footer-button)

[Substack](https://substack.com/) is the home for great culture
