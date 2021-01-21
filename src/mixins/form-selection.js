import { Vue } from '../vue'

// @vue/component
export const formSelectionMixin = Vue.extend({
  computed: {
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      /* istanbul ignore next */
      get() {
        return this.$refs.input.selectionStart
      },
      /* istanbul ignore next */
      set(val) {
        this.$refs.input.selectionStart = val
      }
    },
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      /* istanbul ignore next */
      get() {
        return this.$refs.input.selectionEnd
      },
      /* istanbul ignore next */
      set(val) {
        this.$refs.input.selectionEnd = val
      }
    },
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      /* istanbul ignore next */
      get() {
        return this.$refs.input.selectionDirection
      },
      /* istanbul ignore next */
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
})
