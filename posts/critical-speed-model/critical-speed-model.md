---
date: 2025-06-03
author: Roger Willis
tags: [physiology, critical-speed, research, performance]
title: Introducing Critical Speed
excerpt: A comprehensive introduction to the critical speed model, a powerful tool for runners to understand their physiological limits and optimise their training.
series: critical speed
image: formula.png
---

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="critical-speed-graph.js"></script>
<script src="power-duration-graph.js"></script>
<script src="anaerobic-aerobic-graph.js"></script>
<link rel="stylesheet" href="/css/graph.css" />

Have you ever wondered why you can maintain your 10km pace for much longer than your 5km pace? Or why some runners seem to excel at shorter, high-intensity efforts while others dominate the longer distances? The answer lies in a piece of exercise physiology called critical speed --- a fundamental concept in modern exercise physiology that deserves thorough exploration. For me to really get into it, I'll break the topic up into a series of focused posts:

1. [Introducing critical speed](/post/2025/06/03/introducing-critical-speed/) (you're reading this now!)
2. How to calculate critical speed 
3. The physiology of critical speed
4. Training using critical speed
5. Problems with the critical speed model
6. Alternatives to critical speed 
7. Building a critical speed training tool

## Summary

Critical speed ("CS") isn't just another training metric - it's a window into your body's energy systems and key to unlocking your potential as a runner. This physiological boundary represents the highest sustainable running speed where your body can maintain metabolic equilibrium, typically falling between your 10km and 5km pace. If you had to guess your critical speed right now, it would likely be a few percent slower than your current 5km pace[^1], but certainly faster than what you'd consider your "comfortably hard" threshold pace.

What makes critical speed so valuable is its practicality. Unlike lactate threshold testing, which requires blood draws and specialised equipment which is not always as accurate as you would hope, critical speed can be calculated from your regular training data or race performances. It's a performance-based metric that's deeply grounded in physiology, making it more reliable than many other training metrics that rely on arbitrary percentages or generic formulas.

The real utility of critical speed lies in what it reveals about your unique physiology. It tells you how long you can maintain different speeds, helping you make informed decisions about pacing and effort distribution in both training and racing. This understanding becomes the foundation for setting personalised training zones, predicting race performances, and optimising your training approach based on your individual physiological profile.

I'm interested in critical speed because I want to use it as the basis for personalised performance models calibrated with day-to-day training data.

## What is Critical Power?

Before we dive into critical speed, we need to understand its older sibling: critical power. The concept was first introduced in a paper[^2] back in 1965 by Monod and Scherrer, who investigated the relationship between the maximum amount of muscular work that could be performed for various lengths of time. This foundational research laid the groundwork for our modern understanding of how energy systems interact during sustained exercise.

Critical power is one way to estimate what exercise physiologists call the maximal metabolic steady state[^3] or MMSS --- the true physiological boundary which separates stable and unstable metabolic states. While MMSS is the actual physiological parameter we're trying to measure, critical power is just one of several methods we can use to estimate it. Other estimation methods include the lactate threshold and maximal lactate steady state (MLSS). Think of MMSS as the "true" boundary we're trying to find, and critical power as one of the tools we use to locate it.

The reason why I'm writing a whole article series on critical speed and not the lactate threshold or MLSS is because critical speed is [considered the best way](https://physoc.onlinelibrary.wiley.com/doi/10.14814/phy2.14098) to estimate MMSS. From the linked paper abstract:

> CP represents the genuine boundary separating exercise in which physiological homeostasis can be maintained from exercise in which it cannot, and should be considered the gold standard when the goal is to determine the maximal metabolic steady state.

In an ideal world, we'd measure critical power directly by monitoring oxygen consumption with sophisticated lab equipment like metabolic carts. But since most of us don't have access to exercise physiology labs, we need practical alternatives. In cycling, this problem was elegantly solved by power meters, which became affordable and could measure the actual mechanical power output at the pedals. This power measurement serves as an excellent proxy for metabolic power output, which is why the power-duration relationship became such a cornerstone of competitive cycling training.

<figure>
    <div class="chart-container">
        <svg id="power-duration-chart"></svg>
    </div>
    <figcaption>
        Example power-duration curve, as seen on platforms like Strava
  </figcaption>
</figure>

Platforms like Strava display power curves that map your best average power outputs across different durations. When you plot your maximum efforts at various time intervals, the resulting curve closely approximates your critical power curve.

## What is Critical Speed?

Enough of cycling. While they had power meters to quantify their efforts, runners were left without an equivalent tool. Running power meters exist[^4], but they're essentially sophisticated guesswork --- using accelerometers, gyroscopes, and algorithms to estimate what power might look like for running. The reality is that there's no true equivalent to the mechanical power measurement available in cycling.

This is where critical speed comes in. Instead of trying to measure power, we use speed as our proxy for intensity. Like critical power, critical speed creates a clear boundary between running speeds that can be maintained in a metabolically steady state and those that cannot. It's intuitive when you think about it. You can maintain your half-marathon pace much longer than your 1500m pace, and this relationship follows predictable physiological principles.

In practical training terms, critical speed serves as the boundary between training zones 3 and 4[^5] in a typical 5 zone system and represnts an intensity that most athletes can maintain for about 15 to 30 minutes. 

The variability in this duration range is actually quite revealing --- it exists because (as mentioned above) critical speed is an estimate of your true MMSS, not the parameter itself. This variability has important implications. If you underestimate your critical speed, you'll find you can maintain it for longer periods than expected. Overestimate it, and you'll fade much quicker than anticipated. Hence the reported variability[^6]. There's also the concept of [durability](https://www.endureiq.com/blog/durability-a-key-endurance-performance-characteristic-and-something-to-consider-in-training) which comes into play, where speed falls over time (and at different rates depending on the athlete) despite a constant metabolic effort.

## The Model Formula

The critical speed model defines a hyperbolic[^7] relationship between the maximum speed you can maintain for any running duration. As speed increases, duration must decrease, and this relationship follows a predictable mathematical pattern:

$$t_{lim} = \frac{D'}{s - CS}$$

Where $s$ is running speed, and $t_{lim}$ is the "time limit" you can sustain a given speed. $CS$ and $D'$ are two parameters that vary from one runner to another, and which can change as your fitness level increases or declines.

The first parameter, $CS$[^8] (measured in metres per second), is the asymptote that the curve approaches and represents the boundary between sustainable and unsustainable paces. Viewing critical speed as a boundary is crucial. It's not a pace you should train at[^9]. If you try to run _at_ critical speed then you are likely to get unpredictable results.

The second parameter, $D'$ (pronounced "D prime"), is where things get interesting. It's measured in metres, which might seem odd at first, but there's a sensible reason for this. $D'$ represents the actual distance you can cover using your anaerobic energy system during an _all-out effort_ before you need to stop due to exhaustion. Think of it as your finite energy reserve. The extra distance you can travel even after you've reached the limits of your aerobic system and hit VO2max.

Recent research by [Burnley (2023)](https://www.sciencedirect.com/science/article/pii/S109564332300020X) has shown that $D'$ is remarkably consistent across different types of exercise, suggesting it represents a fundamental physiological limit rather than just a mathematical parameter. This makes the model even more powerful as a training tool.

When you're running at maximum effort, you're not just using your anaerobic system in isolation --- your aerobic system is working at (or near to) its maximum capacity. The model encapsulates both systems working together, with $D'$ representing that extra metabolic power you can access even after you've reached VO2max and your muscles are using anaerobic processes to produce ATP.

If you run at a pace just slightly above your critical speed, that finite energy reserve gets spread out over a longer duration. Run much faster, and you burn through it quickly, which is why very high speeds can only be maintained for short periods. 

## Visualising Critical Speed

Take a moment to play around with the graph below. You can adjust both the CS (critical speed) and D' (anaerobic capacity) parameters to see how they affect the speed-duration curve.

<figure>
    <div class="chart-container">
        <svg id="critical-speed-chart"></svg>
    </div>
    <div class="controls">
        <div class="slider-container">
            <span class="slider-label">CS (m/s)</span>
            <input type="range" id="cs-slider" min="1" max="10" step="0.1" value="3.5">
            <span class="slider-value" id="cs-value">3.5 m/s</span>
        </div>
        <div class="slider-container">
            <span class="slider-label">D' (meters)</span>
            <input type="range" id="d-slider" min="1" max="500" step="1" value="150">
            <span class="slider-value" id="d-value">250 m</span>
        </div>
    </div>
    <figcaption>
        Interactive critical speed model showing the relationship between speed and duration
  </figcaption>
</figure>


When you increase the critical speed slider, notice how the entire curve shifts upward, giving you a higher "floor" from which to base your anaerobic efforts. This represents having better aerobic fitness --- your sustainable pace is faster, which means all your higher-intensity efforts can be built upon this stronger foundation.

When you increase the $D'$ parameter, watch how the curve becomes more pronounced at shorter durations. A higher $D'$ means you can run much further using your anaerobic system, which translates to better performance in shorter, more intense efforts.

## Basic Physiology Behind the Model

If you only remember one thing from this entire post, make it this section.

The critical speed model reveals insights about how your body's energy systems operate during different intensities of exercise. At speeds below your critical speed, your body maintains what exercise physiologists call "metabolic equilibrium". Your heart rate finds a steady rhythm, your breathing settles into a sustainable pattern, and your energy production systems can keep pace with the demands you're placing on them. Most importantly, blood lactate levels remain stable, and you're primarily relying on aerobic energy pathways that can theoretically continue indefinitely.

This is why you can maintain paces below critical speed for extended periods. Your body is in a true steady state. VO2 (oxygen consumption) stabilises, usually somewhere below your VO2max, and your muscles are efficiently using oxygen to produce ATP through aerobic metabolism (via fats or sugars). This is not to say that there's no anaerobic respiration at these speeds. There is. It's just that the metabolic byproducts produced at this intensity can be cleared as quickly as they're produced, preventing the accumulation that leads to fatigue.

Above critical speed, the physiological picture changes dramatically. You begin accumulating metabolic byproducts faster than your body can clear them, blood lactate starts rising progressively and muscle pH starts dropping. Your VO2 continues to rise toward its maximum. You're now operating in a metabolically unsustainable state.

This is the important thing to recognise with anaerobic metabolism. When running above critical speed, you don't need to stop because you _run out of energy_. You must stop because the build up of metabolic byproducts leads to exhaustion. After reaching exhaustion, if you stop for a few minutes, your muscles will recover and you can go again!

If we graph aerobic and anaerobic contribution against duration, we see a curve that mirrors the critical speed graph --- a relationship that aligns perfectly with our understanding of critical speed:

* For very short events like the 100m, the aerobic system barely has time to activate before the race ends, making anaerobic contribution dominant.
* As duration increases, the anaerobic contribution becomes progressively smaller in percentage terms, not because less is used, but because the aerobic contribution grows substantially larger. 

<figure>
    <div class="chart-container">
        <svg id="anaerobic-vs-aerobic-chart"></svg>
    </div>
    <figcaption>
        Relative contribution of aerobic and anaerobic energy systems during maximal exercise. Data from <a href="https://www.researchgate.net/profile/Paul-Gastin/publication/11799339_Energy_System_Interaction_and_Relative_Contribution_During_Maximal_Exercise/links/0deec517cf3c25f8cf000000/Energy-System-Interaction-and-Relative-Contribution-During-Maximal-Exercise.pdf">Gastin (2001)</a>
  </figcaption>
</figure>

The graph above and the critical speed model assumes an all-out effort and uniform pace throughout. However, race strategy can significantly impact this, potentially to your advantage[^10].

What surprised me when I first learned about critical speed was how small $D'$ typically is. I had always assumed that anaerobic energy played a much larger role in running performance, but the [data](https://www.actioninsports.com/wp-content/uploads/2021/11/energy-system-contribution-in-track-running.pdf) [consistently shows](https://www.researchgate.net/profile/Paul-Gastin/publication/11799339_Energy_System_Interaction_and_Relative_Contribution_During_Maximal_Exercise/links/0deec517cf3c25f8cf000000/Energy-System-Interaction-and-Relative-Contribution-During-Maximal-Exercise.pdf) that this finite reserve is relatively modest compared to our aerobic capacity. This small value tells us something profound about human physiology --- we're primarily aerobic creatures, with our anaerobic system serving as a limited but powerful backup system.

## Differences between athletes

Individual differences in $CS$ and $D'$ become apparent when comparing athletes. Consider two runners with similar overall performance but different physiological profiles. One might have a lower $CS$ but a higher $D'$, making them naturally suited to shorter, more explosive efforts like 800m or 1500m races where the anaerobic contribution is significant. Their training would need to focus heavily on developing their aerobic base to raise their critical speed.

Another athlete might have a higher $CS$ but lower $D'$, excelling at longer, steady-state efforts like 5km or 10km races where aerobic capacity dominates. Their training might emphasise developing power and anaerobic capacity to improve their finishing kick and ability to handle pace changes.

## Applications for Training

Again, it's important to note that $CS$ is not a training pace. It's a boundary. Training exactly at $CS$ isn't ideal because you'll likely oscillate between sustainable and unsustainable states due to the inherent error in estimating it. Instead, you should train either some percentage above or below $CS$ depending on your goals.

Training below $CS$ helps develop your aerobic system and improve your ability to maintain steady-state exercise. This is crucial for longer races and building endurance. Training above $CS$ helps develop your anaerobic system and improve your ability to handle higher intensities. This is important for shorter races and improving your speed. Organising your training as percentages of critical speed is also probably a better approach than a [percentage of VO2max or maximum heart rate](https://training4endurance.co.uk/physiology-of-endurance/sustainable-percent-vo2max/).

Recent [research](https://pmc.ncbi.nlm.nih.gov/articles/PMC8505327/) has determined that trianing at _any_ pace above your $CS$ results in an unsustainable metabolic state. Therefore, to improve your anaerobic system you don't need a specific training pace, any range above $CS$ will do.

For monitoring training progress, tracking changes in $CS$ and $D'$ over time allows you to see concrete evidence of how your fitness is improving. The model also serves as a tool for predicting race performances, helping estimate potential race times at different distances based on your current physiological parameters.

Perhaps most practically, critical speed can be used to establish training zones based on actual physiological boundaries rather than arbitrary percentages. This creates more personalised and effective training programs. Additionally, understanding the relationship between intensity and duration helps optimise recovery protocols, as you can better gauge the metabolic cost of different training sessions and plan appropriate rest periods.

## Limitations of the Model

The model predicts you can run indefinitely at $CS$ and infinitely fast at very short durations! Thish is obviously false. Exercise physiologists therefore recommend using the model only for durations between 2 to 30 minutes.

The model also doesn't account for several important factors that affect real-world performance. Environmental conditions like heat, humidity, and altitude can significantly impact your ability to maintain certain speeds. Terrain variations such as hills[^11], trails, or track surfaces also influence performance in ways the model doesn't capture. Fatigue from previous training sessions, psychological factors like motivation and mental state, and technical aspects of running form and efficiency are all elements that can affect your actual performance compared to what the model predicts.

Despite these limitations, the model is still valuable because it provides a framework for understanding the relationship between speed and duration. It's not perfect, but it's better than having no model at all, and it gives us a foundation for making informed training decisions.

## Alternatives to the Model

Several other approaches exist for understanding the relationship between exercise intensity and sustainability. Lactate threshold and maximal lactate steady state testing involve measuring blood lactate levels to estimate the boundary between sustainable and unsustainable exercise. While these methods can be accurate, they require invasive testing and specialised equipment, making them less practical for most runners.

[Omni-duration models](https://www.tandfonline.com/doi/full/10.1080/02640414.2020.1735609) take a different approach, using more complex mathematical functions to model the relationship between speed and duration. These models often include additional parameters and can provide more nuanced predictions, but they sacrifice the elegant simplicity of the two-parameter critical speed model. Similarly, critical speed-like models with more parameters attempt to account for additional factors, but often at the cost of practical applicability.

Reigel's [power law models](https://pmc.ncbi.nlm.nih.gov/articles/PMC10858092/) represent another alternative that some consider better performance predictors. However, these models lack the physiological grounding that makes critical speed so appealing --- they're purely mathematical relationships without clear connections to underlying biological processes.

The beauty of the critical speed model is that both $CS$ and $D'$ represent actual physiological parameters, making it both practical and theoretically sound. While other models might be more accurate in certain situations, critical speed provides a good balance between simplicity and accuracy, offering insights that are both scientifically valid and practically useful.

In the next post, we'll dive into how to calculate critical speed from your training data.

---

## Footnotes

[^1]: If you are familiar with [Roberto Canova-style](https://www.letsrun.com/forum/flat_read.php?thread=2959804) percentage based training then, for example, 5% slower than a 5km pace of 3:30min/km would be $210\times1.05=220.5$ and so adds 10 seconds to your pace, which would now be 3:40min/km.

[^2]: The paper can be found [here](https://www.tandfonline.com/doi/abs/10.1080/00140136508930810) and is worth a read. It's only within the last 15 years or so that the critical power model has come to the fore. 

[^3]: I'm going to write a separate article on the maximal metabolic steady state. 

[^4]: The [Stryde](https://stryde.com/) power meter is probably the most well known one.

[^5]: Though in most training zone schemes which use lactate threshold as the 3-4 boundary, critical speed would likely sit within the lower section of zone 4.

[^6]: I'll show some analysis of the [powerof10](https://www.kaggle.com/datasets/goprogram/thepowerof10) dataset in a future post to demonstrate how we can estimate critical speed within some reasonable bounds given a 5km race time.

[^7]: A hyperbolic relationship, in mathematics, describes a relationship between two variables where their product is a constant, resulting in a graph that resembles a hyperbola. Interestingly, in my day-job I often encounter another hyperbolic function --- the constant product market-maker function $a \times b = k$, which ensures that in a crypto trading pool, the product of the two tokens in the pool always remains the same. For example, if a pool starts with 100 token A and 100 token B, then $k = 10,000$. If someone trades 10 token A into the pool, the new balance might be 110 token A and ~90.9 token B (since $110 \times 90.9 ≈ 10,000$). This mechanism automatically determines prices based on the ratio of tokens in the pool, with prices becoming exponentially more expensive as you try to drain more of one token from the pool. In the case of critical speed, $speed \times time = distance$ and this distance remains constant regardless of how fast you run, which as we'll see later on in this post is quite an interesting result.

[^8]: It's somewhat confusing that the model shares the same name as this asymptote, but understanding this distinction is crucial for proper interpretation.

[^9]: While critical speed represents a precise physiological boundary in theory, in practice we can only estimate it within certain error bounds. Rather than trying to train exactly at this theoretical point (or our estimation of it), it's more practical to define ranges above and below it. This way, we can be confident we're training either aerobically (below CS) or anaerobically (above CS), without worrying about hitting an exact pace that we can never know with perfect accuracy. I'll touch on this more in the in the post about training using critical speed.

[^10]: For example, [Jakob Ingebrigtsen](https://worldathletics.org/athletes/norway/jakob-ingebrigtsen-14653717) often employs a negative split strategy in his 5km races, starting conservatively for the first 8-9 laps before treating the final laps like a 1500m race. This effectively transforms the race duration massively in his favour, allowing for a stronger finish. If Jakob runs the first few laps below critical speed then his whole $D'$ remains as he winds the pace up close to the end of the race. This only works for Jakub because his critical speed is higher than the other athletes --- his aerobic system is a powerhouse!

[^11]: When estimating critical speed via training data, using an effort adjusted pace as input to the model takes account of hills and potentially other factors like wind and running surface. 


