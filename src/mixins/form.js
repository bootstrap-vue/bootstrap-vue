// @vue/component
export default {
  props: {
    name: {
      type: String
      // default: undefined
    },
    id: {
      type: String
      // default: undefined
    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    },
    form: {
      type: String,
      default: null
    }
  }
}
