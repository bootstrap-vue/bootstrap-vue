import { extend } from '../vue'
import { EVENT_NAME_INPUT } from '../constants/events'
import { PROP_TYPE_ANY } from '../constants/props'
import { makeProp } from './props'

export const makeModelMixin = (
  prop,
  {
    type = PROP_TYPE_ANY,
    defaultValue = undefined,
    validator = undefined,
    event = EVENT_NAME_INPUT
  } = {}
) => {
  const props = {
    [prop]: makeProp(type, defaultValue, validator)
  }

  // @vue/component
  const mixin = extend({
    model: {
      prop,
      event
    },
    props
  })

  return { mixin, props, prop, event }
}
