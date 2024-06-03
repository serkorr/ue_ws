module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
};