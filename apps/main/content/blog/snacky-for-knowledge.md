---
title: snacky for knowledge
description: i wanna learn every language, framework, and database under the sun! but will i? (no!) 
published: 1752126024419
---

hey everybody. been a while. this is gonna be a bit rambly, but thats okay, its MY blog

so ive been thinking a lot. there are so many technologies that i want to learn. when i say i want to learn them, i dont necessarily mean i have a desire to actually *put in the work* required to learn them. im not hungry for knowledge, so much as i am snacky

dont get me wrong. i love to learn. if i didnt, i wouldnt BE snacky for knowledge. and for certain technologies, :::learning:::as in, actual learning, not just fantasizing about learning::: really is fun - html/css/js in general, vue, nuxt, docker, home server stuff. but then there are the things that just sound cool. for example, python. ive tried learning python a bit, at various times. but it was mostly just for random tiny stuff, like learning flask just for the sake of learning it, just hosting a basic webpage. or stealing pygame code to make something super lame

## want isnt enough. i need to need to learn

the problem with python, and with a lot of things i try to learn in general, is that i really need a GOOD reason to learn something. if i do, then i will sink hours and hours into learning it. but if i dont? its hard to force myself to just learn it for no reason anyway

the best example of this is linux. many years ago, i decided to try out this cool "linux" thing i had heard about. i created an ubuntu vm and just... aimlessly poked around. i saw the cool tiger desktop background, saw that it was kinda similar to windows and macos, but also kinda different. and that was that. fast forward to however many years later, when i was first trying to host my website. i made a :::digitalocean droplet:::i mean, first i used github pages, and then i experimented with google cloud before realizing i hated it. but THEN i switched to digitalocean::: and loaded it up with ubuntu. i had literally no idea what i was doing. i had never heard of cat, sudo, nano, ls, any of it. i had to constantly look up what command did what, as well as following a bunch of different guides from :::digitaloceans:::seriously, those guides were awesome. theres a nonzero chance i would have given up on webdev altogether if digitalocean hadnt had such a vast assortment of guides for stuff like nginx::: own website. but since i had a goal i was trying to achieve, i stuck with it. i successfully had my website online, and knew the very basics of linux

fast forward another few years. i wanted my own little server for torrenting + automated backups. people recommended proxmox, and it looked appealing, so i installed it. and man, proxmox really was like being thrown in the deep end - at least, with the little linux experience i had at the time. but it was another problem to solve. in fact, it was a dozen problems, each with a dozen of its own subproblems. took me a lot longer than it took to host my website on digitalocean, but nowadays i can say that most of my familiarity with linux comes from working with proxmox

## point being...?

point being, i love sinking my teeth into something new and unfamiliar WHEN theres an actual goal im trying to achieve

i really want to start working with databases more. its relevant knowledge to have, and there are a bunch of cool databases. mongodb is the one i have experience with from my discord bot days, and i guess sqlite too. but im definitely :::rusty:::its been around 3 years? 4?::: at mongodb, and sqlite... well, it IS useful, though not that exciting. i guess maybe i should get better at it. but like, what about postgresql? what about mysql? its hard to explain what intrigues me about them. cool logos are always a plus, but i think what really gets me is just the idea that theres something out there to learn thats popular, has some kind of cultural or historical impact when it comes to web dev, and could come in handy for a future career. something out there to *experience*, so i can be part of a community of people who have *experienced* this language or framework or whatever. basically, im a resume padder, but with no resume. more like a brain padder. the idea of being able to say "if push comes to shove, i can make a decently functional postgresql database". thats just such a cool thought, right?

but, as i mentioned... if i dont have a really good reason to learn postgresql, a PROBLEM that needs to be solved with it, then theres a low chance im gonna stick with it and actually learn it

an example of something that managed to escape this fate, and actually be used by me, is docker. man, when i talk about technologies that i love the *aesthetic* of, that i love *thinking* about using, and fantasizing about how useful it could be, nothing quite reaches the heights of docker. that beautiful blue logo with a cute whale. the idea of commanding fleets of containers. the idea of writing once and running everywhere. all my code, turned portable!

sounds like a fantasy, but i actually do use docker! i mean, the home server stuff is obvious, but thats not what i mean. im not talking about using docker to run jellyfin, im talking about writing my OWN dockerfile to containerize my OWN code. this website has been running in a docker container from the beginning. and earlier today i got done setting up a github action to automatically re-build it and send it to my digitalocean droplet every time i push my changes. yay! dont get me wrong, i still have a ways to go. i havent dockerized ALL my projects that could be dockerized. but im actually getting use out of it - in the real world, not just in my head. its been fun and rewarding, and im starting to build up a solid mental model of how docker works, to the point where i dont need to keep re-googling the basics in order to write a dockerfile

## it gets worse.

but, the problem doesnt end there. no, this is merely where it begins. lets talk about programming languages. not python; python is something i could realistically use. i make websites and a discord bot, as well as miscellaneous scripts to make my life easier. python could certainly come in handy! and databases? again, i make websites - obviously i could figure out a use for a database!

...

... you know... rust sounds cool... i mean people always rewrite stuff in it, and its sooo fast. sounds cool right? and what about golang? oo, that would be fun.

... WHAT THE HELL AM I GONNA USE RUST FOR!

look, im a javascript developer. ill leave smart people languages to the smart people. what am i trying to make, a damn kernel? drivers? or like, why would i need to learn the C family of languages? yes they sound cool. and anything that could be used to make a video game does have some theoretical value to me, a guy who Likes Video Games. but i just cant think of a situation where theres some software i REALLY wanna write, that REALLY benefits from being written in a language i :::dont know:::dont forget atwoods law!:::, to the point where its enough motivation to buckle down and learn rust or something. i hope the situation comes up, but im a little doubtful. plus, languages like C are scary... i dont know if i have it in me to manually manage memory

that doesnt mean ill never give them a try. in fact, just writing about them is making me even more snacky to learn. but... i dont know. maybe i need to start small. maybe i need to take things one at a time. maybe i should really commit myself to making a game in python, and i wont give up until its done. then if it goes well, we can talk about rust and go and stuff. maybe.

## retro web dev

another thing that fits in quite weirdly to this whole discussion is the classic web dev stuff. stuff thats (in some cases) still used quite a bit, but seems retro when compared to the more popular technologies nowadays, like react and tailwind and such. stuff like jquery, php, apache, ruby on rails, i think mysql fits in here, bootstrap? look, im not super knowledgeable about this stuff. but ive seen jquery more times than i can count in stackoverflow answers (annoyingly), and i hear people talk about ruby on rails and php quite often. web devs that have been around a while seem to remember that era of web dev pretty fondly. they love those languages for their simplicity compared to modern solutions. and while they *may* just have rose tinted glasses, im certainly curious to try it out for myself. because i also find myself getting the impression that modern web dev cares more about trends and fancy over-engineered solutions than they do about simple good DX and UX. now, do i think wrestling with PHP is going to bring me some kind of web dev zen? no, not really. to me, vue is already a fantastic balance of modern niceties, without being overcomplicated and frustrating

but... wouldnt it be cool to know ruby on rails? something so historical? i could impress every 30+ year old web dev i meet. like those videos where a white guy goes to a chinese restaurant and orders in perfect mandarin, and all the employees are so impressed. is it so wrong for me to want to feel like a special little guy?

## i admit it. im ignorant.

maybe you could tell but. i dont really know what exactly ruby on rails is. i think ruby is frontend, and ruby on rails turns it full stack? im not gonna google it, im just gonna let my honest assumption exist in public and you can judge me if you want. ok fine im googling it.

yeah i was entirely wrong. so ruby is like your average general-purpose programming language, like python. and ruby on rails turns it into a full-stack web framework. thats cool!

and what about rust and go? well i know theyre a bit lower level, though im not entirely sure HOW low level. how much stuff am i gonna have to get used to doing, that javascript abstracts away from me? you know what, maybe i need to make a blog post where i just go through every language/framework/database/web server/etc that catches my eye, and do a little bit of research on them, and then write what i learned. like, we're talking 6th grade book report levels of depth here

actually. yeah. maybe that is what i need! to LEARN! i dont need to learn HOW to write rust code. i just need to figure out what rust actually is! maybe learning a bit about it will satisfy my snackiness, and maybe theres some language where, after learning about it beyond just its name and logo, i will come to realize it would actually be quite a good fit for me. and THAT can be the motivation i need to learn it for real

i mean, i already said that the main thing drawing me to these technologies is their cultural and historical impact. so yeah. why dont i write about that impact! and touch on the basics of how the language or framework is actually used, with some code examples!

... oh wait. thats literally what fireship does. well, time to go watch fireship's video on ruby again, as well as every other "in 100 seconds" video from him! its like he perfectly understands my snackiness. in fact, maybe thats a problem...? maybe modern web dev culture is encouraging developers to become more interested in the IDEA of coding than the actual act of coding? maybe we're all being trained to waste time watching youtube videos, reading reddit posts, and arguing on twitter about coding, instead of actually writing code? maybe we're all snacky for knowledge?

well, im gonna break free from the matrix! no more thinking, its time to *do*! im going to learn python right away!

... right after this fireship video...