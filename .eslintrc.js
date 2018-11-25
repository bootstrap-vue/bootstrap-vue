module.exports = {
  extends: ['standard', 'plugin:vue/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 8,
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
    'vue/attributes-order': 'off'
  }
}
