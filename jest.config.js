module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['<rootDir>/**/*.spec.(ts|js)'],
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.(ts|js)', '!src/**/*.d.ts'],
    setupFiles: [
        "dotenv/config"
    ],
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^src/(.*)$': '<rootDir>/src/$1', // Add this line
      },
};