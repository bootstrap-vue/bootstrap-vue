/* istanbul ignore next */
export default {
  computed: {
    validity: {
      // Expose validity property
      cache: false,
      get () {
        return this.$refs.input.validity
      }
    },
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      get () {
        return this.$refs.input.validationMessage
      }
    },
    willValidate: {
      // Expose willValidate property
      cache: false,
      get () {
        return this.$refs.input.willValidate
      }
    }
  },
  methods: {
    setCustomValidity () {
      // For external handler that may want a setCustomValidity(...) method
      return this.$refs.input.setCustomValidity(...arguments)
    },
    checkValidity () {
      // For external handler that may want a checkValidity(...) method
      return this.$refs.input.checkValidity(...arguments)
    },
    reportValidity () {
      // For external handler that may want a reportValidity(...) method
      return this.$refs.input.reportValidity(...arguments)
    }
  }
}
