import { Vue } from '../vue'
import { PROP_TYPE_BOOLEAN } from '../constants/props'
import { makeProp, makePropsConfigurable } from '../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    plain: makeProp(PROP_TYPE_BOOLEAN, false)
  },
  'formControls'
)

// --- Mixin ---

// @vue/component
export const formCustomMixin = Vue.extend({
  props,
  computed: {
    custom() {
      return !this.plain
    }
  }
})
