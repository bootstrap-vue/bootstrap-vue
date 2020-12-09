import { makeModelMixin } from '../utils/model'

const { mixin, props, prop, event } = makeModelMixin('value')

export { mixin as modelMixin, props, prop as MODEL_PROP_NAME, event as MODEL_EVENT_NAME }
