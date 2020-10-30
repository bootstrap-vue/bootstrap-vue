import { makePropsConfigurable } from '../utils/config'

// @vue/component
export default {
  props: makePropsConfigurable(
    {
      size: {
        type: String
        // default: null
      }
    },
    'formControls'
  ),
  computed: {
    sizeFormClass() {
      return [this.size ? `form-control-${this.size}` : null]
    },
    /* istanbul ignore next: don't think this is used */
    sizeBtnClass() {
      return [this.size ? `btn-${this.size}` : null]
    }
  }
}
