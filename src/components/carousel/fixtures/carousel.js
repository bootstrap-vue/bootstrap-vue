window.app = new Vue({
  el: '#app',
  data: {
    slide: 0,
    sliding: null,
    interval: 0
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.slide = 2
    // })
  },
  methods: {
    blankImg (x, y) {
      // Return a blank SVG image with specified width and height
      // Handy for maintaining aspect ratio for text only slides
      return 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D' +
                 "'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' " +
                 "viewBox%3D'0 0 " + x + ' ' + y + "'%2F%3E"
    },
    onSlide (slide) {
      this.sliding = true
    },
    onSlid (slide) {
      this.sliding = false
    }
  }
})
