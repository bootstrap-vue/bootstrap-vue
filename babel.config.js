module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'entry' }]],
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 8 }
          }
        ]
      ]
    }
  }
};
