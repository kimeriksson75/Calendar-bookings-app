module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
};