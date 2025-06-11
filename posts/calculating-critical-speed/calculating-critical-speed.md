---
date: 2025-06-10
author: Roger Willis
tags: [critical-speed, physiology, modelling]
title: calculating critical speed
published: false
excerpt:
---

* Start with the calculation section in this running writings post: https://runningwritings.com/2024/01/critical-speed-guide-for-runners.html#_ftn3
* Also look at https://upsidestrength.com/critical-speed-calculator/
* See https://pmc.ncbi.nlm.nih.gov/articles/PMC7664951/
* https://www.runnersworld.com/training/a39395440/what-is-critical-velocity-pace/ might not be useful but have a look 
* https://www.endureiq.com/blog/endure-iq-critical-running-speed-calculator worth a look 
* You can take two results but the curve will always fit perfectly. You'll get a more accurate fit if you use three results.
* You can only use results from 2 to 30 minutes ideally from 2 to 20 minutes. So for a reasonably fast runner that's anything from 800m to 5km.
* If you have many results, you can pick different sets of three. You'll notice each one gives you a different curve. You can take the average.
* Calculation of error bounds.
* Plot the time vs distance on a graph and you'll get a line.
* For CS take 1/gradient of the line
* For D' -1 * b * CS

* Calculate a curve for myself, for Jakob Ingebrigsten and for Femke Bol and then comment on them.

* The issue with doing it this way is that you need to use all-out efforts. And all out efforts are difficult to do. They are disruptive for training and it's not practical to do these periodically jsut to update your model. Also the performances need to be close to each other in time and all performances used needs to be all out, eg. if one was a 70% effort then it will skew the model.

* you need to be fully rested and in racing form. No point in doing a race/effort if you can't run your best.

* Good data to use would be any track race from 800m to 5km.

* Don't use cross country or trail runs. Flat road runs will do.

* You can use intervals times from your training if you like but you need to take into account hills, wind, surface and other things.

* If anything you are likey to underestimate your critical speed, so you at least know that whatever you calculate is a lower bound on it. You can use common sense to figure out the upper bound.

* Show a calculator that allows you to provide three results of any distance and time.

* Show the plotting of multiple curves on the same graph to compare

* Lastly briefly touch on other ways to do it and how i might build a tool to do it 

    * Use a model calibrated from powerof10 data - you provide a race time and it give you a critical speed value (no D' though)
    * Use day to day efforts as and when you do them in training
