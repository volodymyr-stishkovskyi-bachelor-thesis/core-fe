/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': 'babel-jest'
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/app/(.*)$': '<rootDir>/src/app/$1'
    },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};