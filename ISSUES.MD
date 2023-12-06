## Changing package manager from npm to pnpm -> Many issues  

### Issue: pnpm workspaces cause this error when trying to run "pnpm run dev"
  <samp>ERROR  run failed: Failed to add workspace "" from apps\football-watch\.next\types, it already exists at apps\docs\.next</samp>  

----------------------------------------------------------------

Solution: Update "pnpm-workspace.yaml" in the root with the pattern of "/apps/\*\*" (double asterisk) to "/apps/*" (single asterisk)  

### Issue: In /apps/web/tsconfig.json, it says that "tsconfig/nextjs.json" from package /packages/tsconfig is not found  

----------------------------------------------------------------  

Solution: By changing package manager to "pnpm", the dependency "tsconfig" in "apps/web/package.json" needs to be updated to pnpm  
<code>{  
    ...,  
    "tsconfig": "***workspace***:\*",  
}
</code>
