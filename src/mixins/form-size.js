// @vue/component
export default {
  props: {
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeFormClass() {
      return [this.size ? `form-control-${this.size}` : null]
    },
    sizeBtnClass() /* istanbul ignore next: don't think this is used */ {
      return [this.size ? `btn-${this.size}` : null]
    }
  }
}
