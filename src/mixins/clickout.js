export default {
  mounted () {
    if (typeof document !== 'undefined') {
      document.documentElement.addEventListener('mousedown', this._clickOutListener)
    }
  },
  beforeDestroy () {
    if (typeof document !== 'undefined') {
      document.documentElement.removeEventListener('mousedown', this._clickOutListener)
    }
  },
  methods: {
    _clickOutListener (e) {
      if (!this.$el.contains(e.target)) {
        if (this.clickOutListener) {
          this.clickOutListener()
        }
      }
    }
  }
}
