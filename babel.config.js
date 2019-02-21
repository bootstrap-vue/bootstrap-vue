module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  env: {
    docs: {
      plugins: ['@babel/plugin-transform-runtime']
    },
    es: {
      plugins: [['@babel/plugin-transform-modules-commonjs', { noInterop: true, loose: true }]]
    },
    test: {
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
