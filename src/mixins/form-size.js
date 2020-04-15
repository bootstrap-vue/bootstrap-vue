import { getComponentConfig } from '../utils/config'
import { suffixClass } from '../utils/string'

// @vue/component
export default {
  props: {
    size: {
      type: String,
      default: () => getComponentConfig('formControls', 'size')
    }
  },
  computed: {
    sizeFormClass() {
      return [this.size ? suffixClass('form-control', this.size) : null]
    },
    /* istanbul ignore next: don't think this is used */
    sizeBtnClass() {
      return [this.size ? suffixClass('btn', this.size) : null]
    }
  }
}
