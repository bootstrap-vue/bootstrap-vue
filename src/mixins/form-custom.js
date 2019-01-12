// @vue/component
export default {
  props: {
    plain: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    custom() {
      return !this.plain
    }
  }
}
