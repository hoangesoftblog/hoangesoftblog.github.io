const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended'
        // 'plugin:@typescript-eslint/recommended-type-checked'
    ],
    parser: '@typescript-eslint/parser',

    // // Todo: This seems difficult to understand
    // // https://typescript-eslint.io/linting/typed-linting#specifying-tsconfigs
    // parserOptions: {
    //     project: project,
    //     tsconfigRootDir: __dirname,
    // },
    
    plugins: ['@typescript-eslint'],
    root: true,
};