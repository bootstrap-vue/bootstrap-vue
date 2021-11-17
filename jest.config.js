const useVue2 = 'USE_VUE2' in process.env

const moduleNameMapper = useVue2
  ? {}
  : {
      '^vue$': '@vue/compat',
      '^@vue/test-utils$': '@vue/test-utils-vue3'
    }

module.exports = {
  testRegex: 'spec.js$',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules(?![\\\\/]vue-test-utils-compat[\\\\/])'],
  coverageDirectory: './coverage/',
  testEnvironmentOptions: {
    pretendToBeVisual: true
  },
  setupFilesAfterEnv: ['./tests/setup.js']
}
