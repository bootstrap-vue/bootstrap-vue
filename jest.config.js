module.exports = {
  testRegex: 'spec.js$',
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  coverageDirectory: './coverage/',
  // JSDOM for node > v6
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}
