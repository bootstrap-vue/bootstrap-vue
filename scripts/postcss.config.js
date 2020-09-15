const autoprefixer = require('autoprefixer')

module.exports = () => ({
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: [autoprefixer({ cascade: false })]
})
