//
// Single point of contact for Vue
//

import {
  defineComponent as _defineComponent,
  h as _h,
  isVue2,
  resolveComponent as _resolveComponent,
  resolveDirective as _resolveDirective,
  vModelDynamic,
  vShow,
  withDirectives
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
    const { $attrs: attrs, $props: props, $slots: scopedSlots, $parent: parent } = this
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

const normalizeTransitionProps = props => {
  if (isVue2) {
    return props
  }

  const { enterClass: enterFromClass, leaveClass: leaveFromClass, ...otherProps } = props

  return { enterFromClass, leaveFromClass, ...otherProps }
}

const normalizeVNodeData = data => {
  if (isVue2) {
    return data
  }

  const {
    staticClass,
    staticStyle,
    attrs = {},
    props = {},
    domProps = {},
    nativeOn = {},
    on = {},
    ...otherData
  } = data

  return {
    ...otherData,
    ...attrs,
    ...domProps,
    ...props,
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

const normalizeVNodeDirectives = directives =>
  isVue2
    ? directives
    : directives.map(({ name, value, arg, modifiers }) => [name, value, arg, modifiers])

const defineDirective = data => {
  if (isVue2) {
    return data
  }

  const {
    bind: beforeMount,
    inserted: mounted,
    componentUpdated: updated,
    unbind: unmounted,
    ...otherData
  } = data

  return { beforeMount, mounted, updated, unmounted, ...otherData }
}

// --- Overwrite methods ---

const defineComponent = data => _defineComponent(normalizeDefineComponentData(data))

const h = (...args) => {
  if (isVue2) {
    return _h(...args)
  }

  let [tag, data, children] = args
  let normalizedDirectives = []

  if (isUndefined(tag) && !isVue2) {
    return null
  }

  if (isPlainObject(data)) {
    const { directives = [], ...otherData } = data
    data = normalizeVNodeData(otherData)
    normalizedDirectives = normalizeVNodeDirectives(directives)
  }

  const vNode = _h(...[tag, data, children].slice(0, args.length))

  return normalizedDirectives.length > 0 ? withDirectives(vNode, normalizedDirectives) : vNode
}

const resolveComponent = value => (isVue2 ? value : _resolveComponent(value))

const resolveDirective = value => {
  if (isVue2) {
    return value
  }

  if (value === 'show') {
    return vShow
  }
  if (value === 'model') {
    return vModelDynamic
  }

  return _resolveDirective(value)
}

export * from 'vue-demi'
export {
  COMPONENT_UID_KEY,
  defineComponent,
  defineDirective,
  h,
  mergeData,
  normalizeDefineComponentData,
  normalizeTransitionProps,
  normalizeVNodeData,
  normalizeVNodeDirectives,
  resolveComponent,
  resolveDirective
}
