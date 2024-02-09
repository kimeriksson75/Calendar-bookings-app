module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        "resources": "usable"
    },
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
};