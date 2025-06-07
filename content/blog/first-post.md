---
title: first post!
description: discussing the new website, and plans going forward
published: 1749198130658
---

wow! first post! i dont know if i should type in proper grammar so im just gonna go ahead and not, at least for now. maybe proper grammar is reserved only for certain kinds of posts? like, educational type writeups? and casual posts can be written casually? works for me i guess!

anyway! this is the first post for my new blog. im planning to do longer, perhaps less casual writeups on certain features of the blog. like :::tooltips:::tooltips are the thing youre looking at right now, where you mouse over text and it shows you some more text:::, as well as my experience getting better at :::css:::something i kinda suck at and have been avoiding, but which i have definitely improved at while making this website:::, and also my biggest vue project yet. ive used vue before, but it was on pretty small things. im coming from react and i can say i definitely prefer vue. theres a reason my previous react-based website never got updated:::...:::to be fair i did make other miscellaneous projects in react but they were often left unfinished, and never made public-facing:::

anyway, this blog can do some cool things! its powered by [@nuxt/content](https://content.nuxt.com/) so it can do some neat stuff like code blocks!

```ts
const awesome = 'look, im a code block!'

console.log(awesome.split('').reverse().join(''))
```



## so... what now?

lots of things! 

1. a page editor would be great! having to write my posts within vscode is a little annoying. i plan to have my own webpage where i can write posts in a text box and see a live preview of how it will look on the  actual website. it would also automatically set the created date, and let me specify title more easily. plus an image uploader maybe. this may have to wait until i have things relatively stable; right now im changing things so often that having an "outside of vscode" solution doesnt make much sense. im probably gonna have to pop in to vscode regardless to adjust the code
2. table of contents. not sure where i want to put it though. im thinking about having a floating button that you can click on to expand the table of contents, but i could also have it permanently visible on the sidebar. or i could have it sit under the title bar, and not be permanently visible. so many options!
3. tags for posts. gonna have to give some thought to what tags should exist, to avoid bloat
4. a search feature on the <NuxtLink to="/blog">blog index</NuxtLink> (once i add more blog posts)
5. a series system. not sure what i want to call it, but a way to group posts even more tightly than a simple tag. kinda like having one post be a part 2 to another post, and then i can even have a part 3, 4, etc. so if you wanna read all the posts about this one particular project, it will show "part of a series on (blank)" and you can click it to see all the posts in that series. not everything will be part of a series of course
6. use github actions to automatically rebuild prod every time i push changes
7. better theme switcher. right now its more like a silly easter egg. the plan is that when you click on the theme switcher, it will bring up a modal where you can set the primary, secondary, and accent colors manually. i would want to automatically detect whether its dark or light mode (stuff like shiki relies on knowing whether the theme is light or dark). maybe i could just detect whether the primary color is lighter than the secondary color or vice versa
8. better code blocks. really i just want a code block that can show the extension and filename. gonna want to make my own wrapper around shiki i think

#### and probably a lot more that im forgetting!

but i guess that will do it for this post. thanks for tuning in :)