module.exports = {
  presets: [['@babel/env', { useBuiltIns: 'entry' }]],
  plugins: ['@babel/proposal-object-rest-spread', '@babel/transform-runtime'],
  env: {
    test: {
      presets: [['@babel/env', { targets: { node: 8 } }]]
    }
  }
}
