// @vue/component
export default {
  computed: {
    /* istanbul ignore next */
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get() {
        return this.$refs.input.selectionStart
      },
      set(val) {
        this.$refs.input.selectionStart = val
      }
    },
    /* istanbul ignore next */
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get() {
        return this.$refs.input.selectionEnd
      },
      set(val) {
        this.$refs.input.selectionEnd = val
      }
    },
    /* istanbul ignore next */
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get() {
        return this.$refs.input.selectionDirection
      },
      set(val) {
        this.$refs.input.selectionDirection = val
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    select() {
      // For external handler that may want a select() method
      this.$refs.input.select(...arguments)
    },
    /* istanbul ignore next */
    setSelectionRange() {
      // For external handler that may want a setSelectionRange(a,b,c) method
      this.$refs.input.setSelectionRange(...arguments)
    },
    /* istanbul ignore next */
    setRangeText() {
      // For external handler that may want a setRangeText(a,b,c) method
      this.$refs.input.setRangeText(...arguments)
    }
  }
}
