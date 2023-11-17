## Bugs faced
- Error: Hydration failed because the initial UI does not match what was rendered on the server.
    + Warning: Expected server HTML to contain a matching <header> in <html>.
    + Solution (currently): Move the <header> into <body> inside <html>

- Setup: Jest in Next.js - [](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#setting-up-jest-with-the-rust-compiler)


- Suddenly facing with the error: "next/font" requires SWC although Babel is being used due to a custom babel config being present
    + Solution: Comment out the module.exports in babel.config.js