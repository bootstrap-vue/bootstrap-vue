module.exports = function(api) {
  const isDocs = api.env('docs')

  return {
    presets: isDocs
      ? ['@nuxt/babel-preset-app-edge']
      : [['@babel/env', { useBuiltIns: 'entry', corejs: { version: 2 } }]],
    env: {
      es: {
        plugins: [['@babel/plugin-transform-modules-commonjs', { noInterop: true, loose: true }]]
      },
      test: {
        presets: [['@babel/env', { targets: { node: 'current' } }]]
      }
    }
  }
}
