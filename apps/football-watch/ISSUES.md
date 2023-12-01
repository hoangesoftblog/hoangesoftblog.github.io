# Next.js Server-side API Endpoint with route.js
- Problem: When error fetching from 3rd party API, how to return error from this side


- Problem: Why writing like in "C:\Users\hoang\Desktop\projects\hoangesoftblog.github.io\apps\football-watch\src\app\room\[id]\room.tsx", there will be 5-7 requests called? And when the code is syntax-wrong, it seems to got infinite loops (1000+ requests for 1-2s)?

- Problem: Stuck with "strict-origin-when-cross-origin" by the URL of the m3u8
+ Solution: https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/
+ P.S: No need to do this, the problem is that the URL is outdated
+ P.P.S: This appears for "Vebo" -> unable to solve yet.


- Problem: Components that are declared in folder "src/component" does not get compiled properly, whose classes are not read by TailwindCSS and does not apply and show in the browser.
+ Solution: Move the folder to "src/app/component". TailwindCSS only parse for code in "src/app" (maybe).



- Problem: In Next.js, the "ReactPlayer" component in room.tsx catch the error "https://nextjs.org/docs/messages/react-hydration-error"
+ Explanation: The <Video> component inside "ReactPlayer" exists and use Web API, which is not existed in React Server Component.
+ Solution: Somehow only make "ReactPlayer" exist after using a useEffect - which only runs after the component is already rendered.

- Problem: The "ReactPlayer" component does not cleanup when the URL is not "m3u8" -> Resource usages (Memory + CPU + etc.) keeps increasing
+ Solution: Finding another player/Create own player