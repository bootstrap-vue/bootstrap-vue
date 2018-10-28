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
      value = this.stringifyValue(value)
      return this.formatter ? this.formatter(value, event) : value
    },
    stringifyValue (value) {
      return value == null ? '' : String(value)
    }
  }
}
