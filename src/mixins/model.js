import { EVENT_NAME_MODEL_VALUE } from '../constants/events'
import { makeModelMixin } from '../utils/model'

const { mixin, props } = makeModelMixin(EVENT_NAME_MODEL_VALUE)

export { mixin as default, props }
