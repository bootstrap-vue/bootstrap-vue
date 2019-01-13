// @vue/component
export default {
  computed: {
    /* istanbul ignore next */
    validity: {
      // Expose validity property
      cache: false,
      get() {
        return this.$refs.input.validity
      }
    },
    /* istanbul ignore next */
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      get() {
        return this.$refs.input.validationMessage
      }
    },
    /* istanbul ignore next */
    willValidate: {
      // Expose willValidate property
      cache: false,
      get() {
        return this.$refs.input.willValidate
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    setCustomValidity() {
      // For external handler that may want a setCustomValidity(...) method
      return this.$refs.input.setCustomValidity(...arguments)
    },
    /* istanbul ignore next */
    checkValidity() {
      // For external handler that may want a checkValidity(...) method
      return this.$refs.input.checkValidity(...arguments)
    },
    /* istanbul ignore next */
    reportValidity() {
      // For external handler that may want a reportValidity(...) method
      return this.$refs.input.reportValidity(...arguments)
    }
  }
}
