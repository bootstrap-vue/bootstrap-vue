/* istanbul ignore next */
export default {
  computed: {
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get () {
        return this.$refs.input.selectionStart
      },
      set (val) {
        this.$refs.input.selectionStart = val
      }
    },
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get () {
        return this.$refs.input.selectionEnd
      },
      set (val) {
        this.$refs.input.selectionEnd = val
      }
    },
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get () {
        return this.$refs.input.selectionDirection
      },
      set (val) {
        this.$refs.input.selectionDirection = val
      }
    }
  },
  methods: {
    select () {
      // For external handler that may want a select() method
      this.$refs.input.select(...arguments)
    },
    setSelectionRange () {
      // For external handler that may want a setSelectionRange(a,b,c) method
      this.$refs.input.setSelectionRange(...arguments)
    },
    setRangeText () {
      // For external handler that may want a setRangeText(a,b,c) method
      this.$refs.input.setRangeText(...arguments)
    }
  }
}
