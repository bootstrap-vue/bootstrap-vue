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
import { upperFirst } from './utils/string'
import { normalizeSlot } from './utils/normalize-slot'

const applyFunctionalRenderArguments = render => {
  return function() {
    const { $props: props, $attrs: attrs, $slots: slots, $parent: parent } = this
    const scopedSlots = {}

    return render.call(this, h, {
      props,
      children: normalizeSlot(SLOT_NAME_DEFAULT, scopedSlots, slots),
      slots: () => slots,
      scopedSlots,
      data: { ...attrs },
      parent,
      // TODO: Check if `listeners` work properly
      listeners: keys(attrs).reduce(
        (result, key) => (key.indexOf('on') === 0 ? { ...result, [key]: attrs[key] } : result),
        {}
      )
    })
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
    // TODO: Check if `nativeOn` event listeners are handled properly
    ...keys(nativeOn).reduce(
      (result, key) => ({ ...result, [`nativeOn${upperFirst(key)}`]: nativeOn[key] }),
      {}
    ),
    ...keys(on).reduce((result, key) => ({ ...result, [`on${upperFirst(key)}`]: on[key] }), {}),
    class: [staticClass, otherData.class],
    style: [staticStyle, otherData.style]
  }
}

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
export { defineComponent, h, mergeProps, normalizeDefineComponentData, normalizeCreateElementData }
