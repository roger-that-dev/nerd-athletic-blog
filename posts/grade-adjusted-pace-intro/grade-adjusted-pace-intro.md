---
date: 2025-06-11
author: Roger Willis
tags: []
title: grade adjusted pace intro
published: false
excerpt:
---

1. What is grade adjusted pace?
2. What's the intuition behind Grade adjusted pace?
3. Why is it important?
4. What's the historical research? What's in the public domain that's been done to date?


3. Why not everyhthing adjusted? Well yes if we can do that then great but it's hard to do even just for grade.
4. Who already provides this? Strava, etc. 
5. Have there been any other approaches?
6. What's wrong with the strava implementation? Not personalised.
7. How can i model it?
8. What are the considerations for a model? Features? What type of model to use?

---

Design

1. Process FIT file to pull out records
2. Do we care about stops? or other things like that?
3. Dump to json or csv file
4. Determine if we want to use the file e.g. if there is a high variance in speed and heart rate then don't use it
5. Chunk the data into 25 or 50 meter chunks
6. Look at the data on a per monthly, quarterly and total basis and see the difference or if there is any
7. 

---

# Notes

See claude conversation about this where we go over a sensible implementation approach.

## What do I want to achieve?

Accurately measure metabolic cost or just make the times normalised to my flat level performance? Probably a bit of both.

The main reason why i want to do this is because i want to measure performance in a run, if there's hills and measure performance of a set of runs over time. 

want to be able to assess intensity regardless of the terrain. Cyclists have power meters to do this. Most runners dont use power meters so the proxy is pace. More power -> higher pace. If a runner did have a power meter than it would. tell the same story as Grade adjusted pace. Running up a hill with the same power as running on the flat will result in a slower pace running up a hill. If you wanted to run up the hill at the same speed, as running on the flat, then you need more power. The difference is the adjustment. As such we can estimate the power needed to match the pace on the flat.

So what is GAP? It calculates the equivalent pace on level ground for running up for down a hill.

## Some intuition here

* Running up a hill si definitely slower than down hill.
* running up steep hills is definitely a LOT slower than slight inclines. In that I don't belive the relationship between grade and pace for running up hill is linear. It's probably more quadratic.
* Running downhill is faster to a point. I feel I can always run the fastest on modest grades down hill. 
* As soon as the grade gets too steep then i have to slow down because otherwise I'll fall flat on my face.
* Running downhill is hard on the muscles but you're never going to tax yourself aerobically running down hill - it's not the limiting factor. But running downhill can be more work than running on the flat and that's reflected by heart rate. I.e. it's higher than you would expect. It's more technique, strength and confidence to push yourself and not fall over.
* Running downhill reduces running economy
* There will be small wind resistance effects. Less wind resistance running up hills for instance
* Every runner should have a different curve which depends on their fitness and economy of running up/down hills
* Runners which have practised running up and down hills will have better economy than those who have not. Hence why an individualised model is better.

## Other things to note

If we are using heart rate to compare metabolic cost then: 

1. HR will likely get higher as a run continues suggesting even if metabolic cost has not increased and we need to take into account of that.
2. Heart rate will be lower at the bottom of a hill and higher at the top of the hill.
3. Heart rate will still be high at the top of the hill even though it's flat. It takes a while for the heart rate to fall. How should that be taken into account?
4. Efficiency at runnign up and down hills will improve the more you do it. So the GAP adjustment will get smaller and smaller the fitter you get.
5. The GAP model should be calibrated every month or so to get a more accurate adjustment.
6. How much of a difference stopping and starting the watch is and waiting before running again. Same effect as a high HR running on the flat at the top of a hill but the other way round. I.e. HR will be lower than it should be.

## The models I've come across

**The Minetti paper**s

* [Mechanical determinants of the minimum energy cost of gradient running in man](https://www.researchgate.net/publication/15235652_Mechanical_determinants_of_the_minimum_energy_cost_of_gradient_running_in_man) 1994
* [Energy cost of walking and running at extreme uphill and downhill slopes](https://pubmed.ncbi.nlm.nih.gov/12183501/) 1994
* [The Physiological Responses to Running Downhill. Journal of Applied Physiology](https://link.springer.com/article/10.1007/BF00423214) 1974
* [Effects of wind assistance and resistance on the forward motion of a runner. Journal of Applied Physiology](http://anneclairepannier.free.fr/files/athle/Effects%20of%20wind%20assistance%20and%20resistance%20on%20the%20forward%20motion%20of%20a%20runner.pdf) 1980

**HR model**

Used in the pickletech blog post

1. Split runs into 1minute or 100m segments.
2. Make sure to have distance, time, grade and HR data
3. Plot and discard any outliers
4. Calculate speed/HR on the flat sections
5. Use linear regression to fit a model using HR, grade and speed

Pace model

1. Plot pace / grade on a graph
2. Fit a curve
3. Use the curve as a conversion function to get an equivalent flat pace
## Improvements

1. Use a power meter potentially?
2. Factor in other things like wind resistance, altitude, reduction in running economy from the hills, fatigue
3. Reduction in economy from running downhill https://www.tandfonline.com/doi/abs/10.1080/02640410600718228
4. Use your own data to calculate a GAP. Not everyone's physiology will fit the generalised model. It's also changing all the time as you adapt. 
5. Runners tend to speed up on short uphills https://pubmed.ncbi.nlm.nih.gov/20010117/ but slow down more on long uphills
## resources

* Strava models
	* First approach [Blog post](https://medium.com/strava-engineering/improving-grade-adjusted-pace-b9a2a332a5dc)
	* Updated model https://medium.com/strava-engineering/an-improved-gap-model-8b07ae8886c3
* https://www.letsrun.com/forum/flat_read.php?thread=9982949
	* Downhill HRs
		* Strava based their original GAP model on that Minetti paper. Strava users sort of revolted because they couldn't run fast enough on downhills to reach an equivalent metabolic demand. They thought their downhill paces were plenty fast, and that GAP was too slow. So strava generously changed their algorithm - they used their database of user activity data to do so.
		* My issue is that Strava used HR to compare downhill running to flat running. Which is theoretically fine, until you consider that heart rate becomes elevated on downhills relative to metabolic demands. For the same work rate, your downhill runs will have a higher HR. Strava was like, yeah that's fine, we'll keep our new algorithm. The reality is this: when the trail goes downhill, different factors slow people down. Their sense of safety becomes relevant. When the trail gets steep enough, almost all the muscular demands go into braking, not propelling. It's just a different experience going downhill, and you can speed up a lot just by changing your relationship to risk or by practicing your downhill technique. Strava wanted an algorithm that better agreed with your average runners' sense of how hard they were working. The new downhill GAP is the result.
	* There is only a single adjustment factor for all paces
		* I'm not sure if this answers your question, but something to chew on: Strava's pace adjustment factor does not consider the runner's speed - it is the same no matter what speed you are running at. eg. to calculate GAP for a downhill 10% grade, there is one single adjustment factor that is applied to every runner's pace. Running 12 minute miles? Your GAP is 12 / 0.88 = 13.6 minutes per mile. Running 5 minutes per mile? Your GAP is 5 / 0.88 = 5.68 minutes per mile.
		* In other words, if you look at this guy's GAP on a -4% grade, that pace is not based specifically on 4 minute milers, but on everyone in the strava database who ran on a -4% grade. I think GAP would be a lot more accurate if the adjustment factor considered the runner's speed, but alas, it only thinks in terms of slope.
	* Best grade for going downhill
		* 4 to 5 percent is the optimal grade to open your stride and effortlessly fly, which is what this guy did. The hill is doing most of the work for him.
* https://educatedguesswork.org/posts/grade-vs-pace/#fn6 - some guy who tried to calculate GAP himself from a 100km run. Uses r. 
* https://www.trainingpeaks.com/learn/articles/what-is-normalized-graded-pace/ - useful discussion of GAP vs power in cycling
* http://apps.runningwritings.com/gap-calculator/ has got some great comments at the end of the article explaining some nuance about the calculator. E.g. wind resistance may play a part. Also the types of terrain. Altitude. Running downhill reduces running economy as well. He just uses the Minetti paper.
* https://pickletech.eu/blog-gap/  Individualization matters: the gradient adjusted pace model of Kilian Jornet
* https://aaron-schroeder.github.io/reverse-engineering/grade-adjusted-pace.html

Additional:

1. Elevation correction https://alex-hhh.github.io/2023/05/elevation-correction.html
2. Calculator with no workings but some useful info https://runbundle.com/tools/grade-adjusted-pace-calculator
3. https://fellrnr.com/wiki/Grade_Adjusted_Pace - discussion minetti and strava approaches
4. https://blog.stryd.com/2019/12/17/the-cost-of-running-up-and-down-hills/ Stryde on energy cost of running 

**Getting data**

```
export PATH=/Users/rogerwillis/Library/Python/3.9/bin:$PATH

garmin-backup rojw@pm.me -f fit --backup-dir activities --password
```

Make sure to use the above from the parent directory to `activities` otherwise the tool will download from the beginning where as we just want incremental FIT files.

**Assumptions in approach**

1. Chunking the records every 100m to smooth some of the features. E.g. speed and altitude are all over the place on a per second basis but average out to sensible values over time.
3. Speed is the distance weighted average speed during the chunk.
4. Heart rate is the distance weighted average heart rate during the chunk.
5. I'm using the watch altimeter for elevation, which may be inaccurate but the chunks of 100m should smooth things out a bit.
6. Sometimes speed is NULL for some reason, in which case I just take the previous speed as a proxy. Justification: current speed is likely to be close to the previous speed and if there was a big difference, then it's only few a second or two until the next GPS point.
7. Only using heart rate data collected by strap. `This is from activity ID 103 onwards`.
8. Only using steady state running activities i.e. no intervals sessions.
9. Running app technical things to think about
	1. Storing data
		1. How to store user data? Database? Something else?
		2. If database what schema do we use? Do we have a single table to store all user running data? How do we index the data?
	2. Input and preprocessing
		1. Do we keep the raw input files (FIT or others )
		2. Should we preprocess the data eg smith values, add new columns, augment with other data, something else?
		3. How to spot artefacts in the data eg clearly erroneous GOS data or heart rate data?
		4. How to deal with missing data?
		5. 
	3. User tools
		1. Percentage pace calculator
		2. Flat land finder
		3. Route mapper
