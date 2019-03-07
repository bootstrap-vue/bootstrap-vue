// @vue/component
export default {
  computed: {
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get() /* istanbul ignore next */ {
        return this.$refs.input.selectionStart
      },
      set(val) /* istanbul ignore next */ {
        this.$refs.input.selectionStart = val
      }
    },
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get() /* istanbul ignore next */ {
        return this.$refs.input.selectionEnd
      },
      set(val) /* istanbul ignore next */ {
        this.$refs.input.selectionEnd = val
      }
    },
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get() /* istanbul ignore next */ {
        return this.$refs.input.selectionDirection
      },
      set(val) /* istanbul ignore next */ {
        this.$refs.input.selectionDirection = val
      }
    }
  },
  methods: {
    select() /* istanbul ignore next */ {
      // For external handler that may want a select() method
      this.$refs.input.select(...arguments)
    },
    setSelectionRange() /* istanbul ignore next */ {
      // For external handler that may want a setSelectionRange(a,b,c) method
      this.$refs.input.setSelectionRange(...arguments)
    },
    setRangeText() /* istanbul ignore next */ {
      // For external handler that may want a setRangeText(a,b,c) method
      this.$refs.input.setRangeText(...arguments)
    }
  }
}
