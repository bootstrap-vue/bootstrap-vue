module.exports = ctx => ({
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true
  },
  plugins: {
    autoprefixer: {
      cascade: false,
      // For IE11 grid compatability for stacked tables
      grid: true
    }
  }
})
