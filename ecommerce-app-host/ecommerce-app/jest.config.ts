module.exports = {
  preset: 'jest-preset-angular',

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],

  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],

  moduleFileExtensions: [
    'ts',
    'html',
    'js',
    'json'
  ],

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ],

  coverageDirectory: 'coverage',

  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/**/*.module.ts'
  ]
};