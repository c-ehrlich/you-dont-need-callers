# How to call tRPC Procedures

## Intro

People ask this a lot, how to call a tRPC procedure from another procedure

lets look at a scenario for this

- procedure that gets a thing, does some business logic, returns something
- then we have a thing that wants to call it
- we get a lot of questions from people who read the trpc docs, and think the caller is what they're looking for, and are confused that it doesn't work.
- the reason it doesn't work is that using the caller creates a whole new router, and you're doing that inside the router, so it becomes recursive, and typescript doesn't like that
- so how do you do it? is there some other magic?
- ! heres the good news: when you ask how to do this, you think you're asking a question about trpc, but what you're actually asking is a much more fundamental question about api design or even programming as a whole.
- so whats the answer? functions.

- show extracting into a function

- how do you organize this?

-
