/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Important for Path Alias support in tests
    // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}


// // jest.config.ts

// import type {Config} from '@jest/types';
// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   transform: {
//   '^.+\\.tsx?$': 'ts-jest',
//   },
// };
// export default config;
