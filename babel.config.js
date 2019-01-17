module.exports = {
  plugins: ['@babel/proposal-object-rest-spread', '@babel/transform-runtime'],
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  env: {
    test: {
      plugins: ['babel-plugin-istanbul'],
      presets: [
        [
          '@babel/env',
          {
            targets: { node: 'current' }
          }
        ]
      ]
    }
  }
}
