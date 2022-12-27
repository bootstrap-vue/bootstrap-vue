const useVue3 = 'USE_VUE3' in process.env

const moduleNameMapper = useVue3
  ? {
      '^vue$': '@vue/compat',
      '^@vue/test-utils$': '@vue/test-utils-vue3'
    }
  : {}

module.exports = {
  testRegex: 'spec.js$',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules(?![\\\\/]vue-test-utils-compat[\\\\/])'],
  coverageDirectory: useVue3 ? './coverage-vue3' : './coverage/',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}
