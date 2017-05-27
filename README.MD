# Angular CAAS - Components as a Service

The concept of `Components as a Service` is not a new idea. It is, however, not popular among the Angular community. 
Over the last few years, I have come to learn the benefits of using components via a service, rather than via 
declarative markup in your Angular templates. 

I am lucky to work on a project that has over 60 front-end developers, all committing code to the same SPA. That's right!
You heard me correctly. We have 60 people all committing to the same SPA. The entirety of the SPA is made up of more than
1 million lines of code. In this environment, I have been able to see performance issues that simply don't surface on smaller
apps. 

I found that many of the components that were init'ing when any given view would load were components that were simply waiting
in the background, for some event to happen, before they could show themselves on the screen. And the real interesting thing
that most of these components that are laying-in-wait are not used 99% of the times that the user comes to this view. So
we were using valuable resources loading components that were simply not being used 99% of the time. 

The techniques in this project are a result of working closely with [Tyler Russell](https://twitter.com/te_russ), and of 
spending time looking at flamecharts in Chrome's Devtools. The larger the app you work on, the more benefit can be gained
from using these techniques. 

* The branch [ng1-no-caas](https://github.com/aaronfrost/ng-caas/tree/ng1-no-caas) is a simple app, made w/ AngularJS. It DOES NOT use CAAS.
* The branch [ng1-caas](https://github.com/aaronfrost/ng-caas/tree/ng1-caas) is a simple app, made w/ AngularJS. It has several changes that modify some of the components
to use the CAAS pattern.