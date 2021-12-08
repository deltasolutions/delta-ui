module.exports = {
  verbose: true,
  clearMocks: true,
  moduleNameMapper: {
    '\\.(svg|png|pcss|jpg)$': '<rootDir>/lib/tests/stub.ts'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/lib/tests/setup.ts']
};
