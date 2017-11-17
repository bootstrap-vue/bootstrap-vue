module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: [
        'standard',
        'plugin:vue/recommended'
    ],
    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            impliedStrict: true,
            experimentalObjectRestSpread: true,
        },
        sourceType: "module"
    },
    globals: {
        Tether: true,
        Promise: true,
        Vue: true
    },
}
