module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:markdown/recommended'
  ],
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
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
    'object-shorthand': ['error', 'properties'],
    'spaced-comment': 'off', // needed to ignore `/*#__PURE__*/` comments
    'vue/custom-event-name-casing': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never'
        }
      }
    ],
    'vue/max-attributes-per-line': ['error', { singleline: 4 }],
    'vue/no-v-html': 'off',
    'vue/one-component-per-file': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
