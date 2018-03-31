module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        'jest/globals': true
    },
    extends: [
        'standard',
        'plugin:vue/recommended'
    ],
    plugins: [
        'jest'
    ],
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module"
    },
    globals: {
        Tether: true,
        Promise: true,
        Vue: true
  },
  rules: {
    "vue/attributes-order": 0
  }
}
