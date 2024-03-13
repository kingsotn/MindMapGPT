# FLOW

## Run

```
# contiously compile to .js files
tsc --watch


```

## Timeline:

2 weeks

## Problem:

As someone who uses chatgpt a lot to brainstorm and learn new things, when brainstorming or chatting with chatgpt, it’s hard to find where I want to return to an idea, or where I branched off. CTRL-F doesn’t do it justice because the UI is not great. By creating a tree view I can quickly go and find the information I need and branch off correctly. I also want to save my ideas after each chat session, or have the ability to accumulate how I use chatgpt.

## Goal:

To create a beautiful and easy to understand visual interface of a real-time chatting process to make learning things easier.

## Requirements:

### UI:

1. Node creation after user sends a chat
2. two tabs: one for sent messages and one for LLM’s responses
    - sent contains “EDIT” and “GOTO”, “KEYWORDS”, “SUMM”
    - response contains “GOTO”, “KEYWORDS”, “SUMM”
3. Has to be animated during each node creation
4. Color has to show the current DAG path. Paths that have branched off and are not displaying in the UI must be grayed out

### Tools:

Extension stuff
Javascript — and some other nice graph-building frameworks or sth
node
nextJS
headlessUI
radixUI
tailwind
// Docker? For env stuff
// Python?

## Roadmap:

Tue Mar 12

-   [x] init project
-   [x] create extension library (basics)
-   [x] learn some typescript
-   [x] ok .ts injection works... dope
        ~~- [ ] let's test css injections~~
        okay it seems like css injections isn't the move. an overlay would make more sense like how grammarly does it

    okay this overlay thing is getting kind of annoying. i should just create a separate window just so i can move on... but then i still need to continously parse chatgpt which is annoying.

    there were so many problems. i'm new to this and i was actually so close to giving up. I was hoping the csp wasn't blocked but it couldn't be because otherwise grammarly wouldn't work. Now it works though. I was messing around with too many toggle() functions which chatgpt gave me, and the `matches` keyword didn't work sometimes and I was testing on other websites and seeing many different console messages problems that were interfering with my other extensions!

-   [x] figure out how to create a new overlay!

Wed Mar 13

okay let's now figure out how to move the red box to the right and actually create a flow box. This prob requires me to install some css tools. Let's just create the bg first then add in the required tools.

ok i figured out how to add it to the side and not fuck with any of the chat margins. but now how do i incorporate radixUI? that's typically for react and I don't want to npx create-react-app that seems too complicated. How does grammarly do it? The network tab says that it fetches images and styles on click, so that's being hosted somewhere. but how did they get their ui there? I see that they get their data from their api calls in the network tab: an example url `https://f-log-assistant.grammarly.io/log?datatier=continuous&retention=90`.

Ah so i think it's just inserting the divs. I don't think it's react in any way tho...

Okay i'm assuming they just insert through an API. For now I'll just do it locally, this is a future request

im more curious about how grammarly is able to insert a div from an api call, and then what library is used (react? or just simple html). I assume it is react because it is more complex than just static html, and if we are considering scalability then it's probably some library. I'll first develop with react locally in the extension folder then in the future i'll see if I can render through api calls via a hosted s3 bucket or smth.

okay now i'm fixing the react build path into my extensions folder

now bundling the webpack

-   [x] never mind i just copied a github lib and got react to work both as a popup and as a webpage

-   [ ] class Node() and its properties (look for obsidian for inspiration)

    -   [ ] create
    -   [ ] delete
    -   [ ] parse data
    -   [ ] properties (color, number, id, outgoing[], ingoing[])

    -   [ ] FUNC: GOTO, SUMM, KEYWORDS, EDIT
    -   [ ] data (sent message or chatgpt response)

## Ideas:

1. Can create a framework where other companies can integrate into their chat systems, or use a specific chatbot/LLM API they want!

    - however this would require them to see it as a necessity, will consider after pushing out first product

2. Can download exported chat files, and create a visualization from that

3. Landing site, definitely (look at levels fyi or simplify.jobs)

## Thoughts:

This is a tool that I want to build, and it doesn’t address a need in the market. It can be demotivating to think that while others are marketing their cool startups, I’m making a tool with an undesired need. I think it is a mistake for someone to build their company around an artificial problem — sometimes the easy ideas are the most overlooked ones. I don’t need another B2B SaaS product for my cloud AI inference engine, or a super niche service; I want an AI that can order food for me end to end. Just the simple things. And I think

The reason why I have decided to build this is not for the money (and not partly for some Twitter clout), but to also put my skills to the test.
