import { extend } from '../vue'
import { NAME_CARD } from '../constants/components'
import { PROP_TYPE_STRING } from '../constants/props'
import { makeProp, makePropsConfigurable } from '../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    bgVariant: makeProp(PROP_TYPE_STRING),
    borderVariant: makeProp(PROP_TYPE_STRING),
    tag: makeProp(PROP_TYPE_STRING, 'div'),
    textVariant: makeProp(PROP_TYPE_STRING)
  },
  NAME_CARD
)

// --- Mixin ---

// @vue/component
export const cardMixin = extend({
  props
})
