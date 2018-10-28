export default {
  props: {
    formatter: {
      type: Function,
      value: null
    },
    lazyFormatter: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    getFormatted (value, event = null) {
      value = value == null ? '' : String(value)
      return this.formatter ? this.formatter(value, event) : value
    }
  }
}
