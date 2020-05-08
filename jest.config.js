module.exports = {
  testRegex: 'spec.js$',
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  coverageDirectory: './coverage/',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}
