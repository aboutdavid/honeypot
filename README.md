# 🍯 honeypot
***

### What is a honeypot:
> In computer terminology, a honeypot is a computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems. Generally, a honeypot consists of data (for example, in a network site) that appears to be a legitimate part of the site that seems to contain information or a resource of value to attackers, but actually, is isolated and monitored and enables blocking or analyzing the attackers. This is similar to police sting operations, colloquially known as "baiting" a suspect.

\- Wikipedia

### Why set up a honeypot:
Many bad bots will try to attack/DDoS your site. Those same bots will also go to other sites. So, with this honeypot, you can help other people by warning them.

### How to set it up:
1. Remix the project [here.](https://glitch.com/edit/#!/remix/honeypot),
2. Get a [AbuseIPDB](https://www.abuseipdb.com/account/api) API key here.
3. Place the AbuseIPDB key in the .env file under `ABUSEIPDB_API_KEY`. It looks like this: `ABUSEIPDB_API_KEY=<PLACE API KEY HERE>`

### How to add more traps:
All traps are stored in `routes.js`. A normal entry looks something like:
```jsx
"/path/to/trap": ["15,19","A normal description."]
```
If you visit PROJECT_NAME.glitch.me/path/to/trap, then you would be reported for "A normal description." with the tags 'Hacking' and 'Bad web bot'
Now 