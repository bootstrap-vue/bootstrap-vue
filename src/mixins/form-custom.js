export default {
  computed: {
    custom () {
      return !this.plain
    }
  },
  props: {
    plain: {
      type: Boolean,
      default: false
    }
  }
}
