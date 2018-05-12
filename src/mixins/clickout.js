export default {
  /* istanbul ignore next: not easy to test */
  beforeDestroy () {
    if (this._clickOutElement) {
      this._clickOutElement.removeEventListener('mousedown', this._clickOutListener)
      this._clickOutElement = null
      if (this.clickOutListener) {
        this.clickOutListener()
      }
    }
  },
  methods: {
    listenClickOut () {
      if (!this._clickOutElement && typeof document !== 'undefined') {
        this._clickOutElement = document.documentElement
        this._clickOutElement.addEventListener('mousedown', this._clickOutListener)
      }
    },
    _clickOutListener (e) {
      if (!this.$el.contains(e.target)) {
        if (this._clickOutElement) {
          this._clickOutElement.removeEventListener('mousedown', this._clickOutListener)
          this._clickOutElement = null
        }
        if (this.clickOutListener) {
          this.clickOutListener()
        }
      }
    }
  }
}
