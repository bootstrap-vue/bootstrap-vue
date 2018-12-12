module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: [
    'jest'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    'jest/globals': true
  },
  globals: {
    Vue: true
  },
  rules: {
  }
}
