export default {
  props: {
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeFormClass () {
      return [
        this.size ? `form-control-${this.size}` : null
      ]
    },
    sizeBtnClass () {
      return [
        this.size ? `btn-${this.size}` : null
      ]
    }
  }
}
