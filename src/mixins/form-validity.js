// @vue/component
export default {
  computed: {
    validity: {
      // Expose validity property
      cache: false,
      /* istanbul ignore next */
      get() {
        return this.$refs.input.validity
      }
    },
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      /* istanbul ignore next */
      get() {
        return this.$refs.input.validationMessage
      }
    },
    willValidate: {
      // Expose willValidate property
      cache: false,
      /* istanbul ignore next */
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
