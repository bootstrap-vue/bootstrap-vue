import { PROP_NAME_MODEL_VALUE } from './props'

export const EVENT_NAME_BLUR = 'blur'
export const EVENT_NAME_CANCEL = 'cancel'
export const EVENT_NAME_CHANGE = 'change'
export const EVENT_NAME_CLICK = 'click'
export const EVENT_NAME_CLOSE = 'close'
export const EVENT_NAME_CONTEXT = 'context'
export const EVENT_NAME_FILTERED = 'filtered'
export const EVENT_NAME_HIDDEN = 'hidden'
export const EVENT_NAME_HIDE = 'hide'
export const EVENT_NAME_INPUT = 'input'
export const EVENT_NAME_OK = 'ok'
export const EVENT_NAME_REMOVE = 'remove'
export const EVENT_NAME_SELECTED = 'selected'
export const EVENT_NAME_SHOW = 'show'
export const EVENT_NAME_SHOWN = 'shown'
export const EVENT_NAME_TOGGLE = 'toggle'
export const EVENT_NAME_UPDATE = 'update'

export const EVENT_NAME_MODEL_PREFIX = 'update:'
export const EVENT_NAME_MODEL_VALUE = EVENT_NAME_MODEL_PREFIX + PROP_NAME_MODEL_VALUE

export const ROOT_EVENT_EMITTER_KEY = '$bvEvents'
export const ROOT_EVENT_NAME_PREFIX = 'bv'
export const ROOT_EVENT_NAME_SEPARATOR = '::'

export const EVENT_OPTIONS_PASSIVE = { passive: true }
export const EVENT_OPTIONS_NO_CAPTURE = { passive: true, capture: false }
