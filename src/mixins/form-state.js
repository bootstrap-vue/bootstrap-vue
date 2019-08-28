/* Form control contextual state class computation
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true for is-valid
 *  - false for is-invalid
 *  - null for no contextual state
 */
import { isBoolean } from '../utils/inspect'

// @vue/component
export default {
  props: {
    state: {
      // Tri-state prop: true, false, null (or undefined)
      type: Boolean,
      default: null
    }
  },
  computed: {
    computedState() {
      // If not a boolean, ensure that value is null
      return isBoolean(this.state) ? this.state : null
    },
    stateClass() {
      const state = this.computedState
      if (state === true) {
        return 'is-valid'
      } else if (state === false) {
        return 'is-invalid'
      }
      return null
    }
  }
}
