import { defineComponent } from '../vue'
import { PROP_TYPE_STRING } from '../constants/props'
import { makeProp, makePropsConfigurable } from '../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    size: makeProp(PROP_TYPE_STRING)
  },
  'formControls'
)

// --- Mixin ---

// @vue/component
export const formSizeMixin = defineComponent({
  props,
  computed: {
    sizeFormClass() {
      return [this.size ? `form-control-${this.size}` : null]
    }
  }
})
