## MongoAPIError: URI must include hostname, domain name, and tld
- Solution: Special characters must be encoded. [ref](https://stackoverflow.com/a/57789524)
- P.S: How to name MongoDB environment variables - [ref](https://stackoverflow.com/a/62767284)


## Absolute import not working.
**More detail:**
- In VSCode, it will show "Cannot find module <X> or its corresponding type declarations.ts(2307)"
- When run "dev", the <code>ts-node</code> give error <code>Cannot find module \'@/utils/db\'</code>
- When run "build" + "start", <code>node</code> give error <code> Cannot find module '@/utils/db'</code>
**Solution:**
- In VSCode, check if the file path is included in `tsconfig.json`
- For running "dev" with <code>ts-node</code>, need to run <code>npm i -D tsconfig-paths</code>, then do it in 1 of 2 ways
1. ([Ref](https://stackoverflow.com/a/72622089)) In `tsconfig.json`, add:
    ```json
    {
        ...
        "ts-node": {
            "require": [
                "tsconfig-paths/register"
            ]
        },
        "compilerOptions": {
            // 
        },
        ...
    }
    ```

2. [Ref](https://github.com/santiq/bulletproof-nodejs/issues/115#issuecomment-912980978) - In `package.json`, modify `dev` to:
    ```json
    {
        "dev": "nodemon --exec ts-node -r tsconfig-paths/register src/index.ts"
    }
    ```

- For the "build" command, using `tsconfig-paths` mentioned above will likely not work. Let's look at the docs of `tsconfig-paths`.  
    > ***tsconfig-paths docs***   
    > Typescript by default mimics the Node.js runtime resolution strategy of modules. But it also allows the use of path mapping which allows arbitrary module paths (that doesn't start with "/" or ".") to be specified and mapped to physical paths in the filesystem. The typescript compiler can resolve these paths from tsconfig so it will compile OK. 
    >
    > But if you then try to execute the compiled files with node (or ts-node), it will only look in the node_modules folders all the way up to the root of the filesystem and thus will not find the modules specified by paths in tsconfig.  
    > 
    > If you require this package's tsconfig-paths/register module it will read the paths from tsconfig.json or jsconfig.json and convert node's module loading calls into to physical file paths that node can load.

    - As in the paragraph, tsconfig-path/register will read `paths` from tsconfig.json or jsconfig.json and convert node's module loading calls into to physical file paths that node can load.  
    - But the problem is, after compiling, the path alias of module will be updated based on the `outDir` from `tsconfig.json` - which is (likely) not resemble to `paths` options.  

    - For example, given the current `tsconfig.json` is as below:
    <code>
    {  
        "compilerOptions": {   
            "outDir": "./dist", 
            "baseUrl": "./", 
            "paths": {   
                "@/*": [   
                    "./src/*"   
                ]
            }  
        }  
    }  
    </code>   

    <details>
        <summary>If you still insist on using <code>tsconfig-paths</code> only to run the compile code</summary>
        <p>
        To do so, update the <code>"compilerOptions"</code> as below  
        <code>
        {  
            "compilerOptions": {     
                <p style='color:red'>"outDir": "./dist",</p>  
                <p style='color:green'>"outDir": "./src/dist",</p>   
                "baseUrl": "./",   
                "paths": {    
                    "@/*": [    
                        "./src/*"    
                    ]   
                }    
            }    
        }    
        </code>  

        
        Now, you can run with <code>ts-node -r tsconfig-paths/register src/dist/index.js</code> or <code>node -r tsconfig-paths/register src/dist/index.js</code>
        </p>
    </details>

    [Todo: Rework on this answer by Bard]: #
    No, the tsconfig-paths module does not directly work with the Typescript compiler tsc to resolve path aliases during build. While it can resolve aliases at runtime or during bundling, it doesn't affect how tsc emits the final compiled JavaScript code.

    Here's the breakdown:

    > tsconfig-paths: This module reads your tsconfig.json or jsconfig.json file and uses the defined paths mappings to resolve aliases when loading modules at runtime or during bundling.  
    >
    > tsc: The Typescript compiler generates JavaScript code based on your source files. It doesn't have built-in support for path aliases defined in your tsconfig.json.  
    
    Therefore, tsc will simply emit the aliases as-is in the compiled JavaScript code. For them to work at runtime, you need to use a bundler or a runtime resolver that understands the tsconfig.json path mappings.

    Here are some alternative approaches to achieve path alias resolution during build:

    Bundlers: Use a bundler like Webpack or Rollup that supports resolving aliases based on your tsconfig.json. They often provide plugins or configurations to handle this.
    Custom build scripts: You can write your own build script that reads the tsconfig.json and transforms the import paths before compiling with tsc. This can be more involved but gives you more control over the process.
    Third-party libraries: Libraries like tsc-alias or esbuild offer alternative solutions for resolving path aliases during build. They might be simpler than writing your own script but come with additional dependencies.
    Ultimately, the choice depends on your specific needs and project setup. If you need more flexibility, a custom script or third-party library might be suitable. However, for simpler projects, using a bundler with built-in support for tsconfig.json paths might be the easiest option.

    I hope this clarifies the limitations of tsconfig-paths with tsc and provides some alternative solutions for resolving path aliases during your build process.

    - Ref: 
        - <https://stackoverflow.com/a/53691493>
        - <https://stackoverflow.com/a/70905194>



## "... is a type and must be imported using a type-only import ..." should have a quick fix
- Problem: Place is a Typescript interface in "src/models.ts". When import to "src/components/place.vue", it cause this error
- Solution: update the import to `import {type Place} from "src.models.ts";`
- Ref:
    - <https://stackoverflow.com/a/64243357>
    - <https://github.com/microsoft/TypeScript/issues/52444#issue-1558992963>


## 'File name differs from already included file name only in casing' on relative path with same casing
- Problem: Rename a file in VSCode to uppercase version cause this error
- Solution: <https://stackoverflow.com/a/62159572>


## MongoDB Cursor exhausted after calling toArray() method, or iterating over.
- Solution: This is the `note` from <https://www.mongodb.com/docs/drivers/node/upcoming/fundamentals/crud/read-operations/cursor/>
> When you reach the last result through iteration or through an **at-once fetch**, the cursor is exhausted which means it ceases to respond to methods that access the results.
- Calling with toArray(), or iterating over - is an **at-once fetch**, therefore, based on the `note`, the cursor is exhausted.


## CSS: Input not auto-grow/shrink based on flexbox
- Solution: Set width to 0


## Backend: axios.get.mockResolvedValue() is highlighted as error
- Solution: https://stackoverflow.com/a/76393284

## FE: Mock Vitest Axios.get when return mockResolvedValue(mockResponse), please check carefully the type of Axios.get.