import { defineComponent } from '../vue'
import { EVENT_NAME_MODEL_PREFIX } from '../constants/events'

export const makeModelMixin = prop => {
  const event = EVENT_NAME_MODEL_PREFIX + prop

  const props = {
    [prop]: {
      // type: [Array, Boolean, Number, Object, String]
      // default: null
    }
  }

  // @vue/component
  const mixin = defineComponent({
    model: {
      prop,
      event
    },
    props
  })

  return { mixin, event, props }
}
