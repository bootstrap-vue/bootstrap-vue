//
// Single point of contact for Vue
//

import {
  defineComponent as _defineComponent,
  h as _h,
  isVue2,
  mergeProps as _mergeProps
} from 'vue-demi'
import { mergeData } from 'vue-functional-data-merge'
import { SLOT_NAME_DEFAULT } from './constants/slots'
import { isPlainObject, isUndefined } from './utils/inspect'
import { keys } from './utils/object'
import { upperFirst, lowerFirst } from './utils/string'
import { normalizeSlot } from './utils/normalize-slot'

// --- Constants ---

const LISTENER_KEY_PREFIX = 'on'
const NATIV_LISTENER_KEY_PREFIX = 'nativeOn'

const COMPONENT_UID_KEY = isVue2 ? '_uid' : 'uid'

// --- Helper methods ---

const applyFunctionalRenderArguments = render => {
  return function() {
    const { $props: props, $attrs: attrs, $slots: scopedSlots, $parent: parent } = this
    const children = normalizeSlot(SLOT_NAME_DEFAULT, {}, scopedSlots)
    const slots = () => {}

    const data = {}
    const listeners = {}
    for (const key in attrs) {
      const value = attrs[key]
      if (key.indexOf(LISTENER_KEY_PREFIX) === 0) {
        listeners[lowerFirst(key.substring(LISTENER_KEY_PREFIX.length))] = value
      } else {
        data[key] = value
      }
    }

    return render.call(this, h, { props, children, slots, scopedSlots, data, parent, listeners })
  }
}

const normalizeDefineComponentData = data => {
  if (isVue2) {
    return data
  }

  const {
    functional,
    destroyed: unmounted,
    beforeDestroy: beforeUnmount,
    render: _render,
    ...otherData
  } = data

  return {
    ...otherData,
    unmounted,
    beforeUnmount,
    render: functional ? applyFunctionalRenderArguments(_render) : _render
  }
}

const normalizeCreateElementData = data => {
  if (isVue2) {
    return data
  }

  const {
    staticClass,
    staticStyle,
    attrs = {},
    domProps = {},
    nativeOn = {},
    on = {},
    ...otherData
  } = data

  return {
    ...otherData,
    ...attrs,
    ...domProps,
    ...keys(nativeOn).reduce(
      (result, key) => ({
        ...result,
        [NATIV_LISTENER_KEY_PREFIX + upperFirst(key)]: nativeOn[key]
      }),
      {}
    ),
    ...keys(on).reduce(
      (result, key) => ({
        ...result,
        [LISTENER_KEY_PREFIX + upperFirst(key)]: on[key]
      }),
      {}
    ),
    class: [staticClass, otherData.class],
    style: [staticStyle, otherData.style]
  }
}

// --- Overwrite methods ---

const mergeProps = (...args) =>
  isVue2 ? mergeData(...args) : _mergeProps(...args.map(data => normalizeCreateElementData(data)))

const defineComponent = data => _defineComponent(normalizeDefineComponentData(data))

const h = (...args) =>
  isUndefined(args[0]) && !isVue2
    ? null
    : args.length >= 2 && isPlainObject(args[1])
      ? _h(args[0], normalizeCreateElementData(args[1]), args[2])
      : _h(...args)

export * from 'vue-demi'
export {
  COMPONENT_UID_KEY,
  defineComponent,
  h,
  mergeProps,
  normalizeDefineComponentData,
  normalizeCreateElementData
}
