## drinksomecoffee

Welcome to the world of pollution!

> Like all pollution, prototype pollution leads to real problems!

In this level, you are required to `exploit` the prototype pollution vulnerability in order to escalate the consequence from DoS to something more exciting like universal cross-site scripting (XSS). Move past the traditional XSS approaches where luring a victim into clicking a link or manually entering the exploit is necessary. Here, an XSS exploit via prototype pollution impacts the server first, subsequently compromising all its clients. Ready to brew some chaos?

#### Deployment
This challenge should not be deployed on the machine within the JHU networks as the XSS request may be blocked by the jhu firewall.

#### Reference
Here is an advanced prototypepollution2XSS challenge from google ctf 2023:
https://biohazard-web.2023.ctfcompetition.com/

You could try it out after you finished the drinksomecoffee challenge.

Here is the solution:
https://github.com/google/google-ctf/tree/master/2023/quals/web-biohazard/solution