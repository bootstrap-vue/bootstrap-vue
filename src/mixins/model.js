import { defineComponent } from '../vue'
import { EVENT_NAME_MODEL_VALUE } from '../constants/events'
import { PROP_NAME_MODEL_VALUE } from '../constants/props'

// --- Props ---

const props = {
  [PROP_NAME_MODEL_VALUE]: {
    // type: [Array, Boolean, Number, Object, String]
    // default: null
  }
}

// @vue/component
export default defineComponent({
  model: {
    prop: PROP_NAME_MODEL_VALUE,
    event: EVENT_NAME_MODEL_VALUE
  },
  props
})
