module.exports = {
  extends: ['standard', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  plugins: ['jest', 'node', 'promise'],
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
    'vue/max-attributes-per-line': ['error', { singleline: 4 }],
    'vue/no-template-shadow': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
