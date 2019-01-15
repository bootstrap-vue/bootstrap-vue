module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
    'babel-plugin-lodash'
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: { node: 'current' }
          }
        ]
      ],
      plugins: ['babel-plugin-istanbul']
    }
  }
}
