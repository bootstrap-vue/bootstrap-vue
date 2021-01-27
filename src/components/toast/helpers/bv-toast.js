/**
 * Plugin for adding `$bvToast` property to all Vue instances
 */

import { NAME_TOAST, NAME_TOASTER, NAME_TOAST_POP } from '../../../constants/components'
import {
  EVENT_NAME_DESTROYED,
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_TOGGLE,
  HOOK_EVENT_NAME_DESTROYED
} from '../../../constants/events'
import { concat } from '../../../utils/array'
import { getComponentConfig } from '../../../utils/config'
import { requestAF } from '../../../utils/dom'
import { getRootEventName, getRootActionEventName } from '../../../utils/events'
import { isUndefined, isString } from '../../../utils/inspect'
import {
  assign,
  defineProperties,
  defineProperty,
  hasOwnProperty,
  keys,
  omit,
  readonlyDescriptor
} from '../../../utils/object'
import { pluginFactory } from '../../../utils/plugins'
import { pluckProps } from '../../../utils/props'
import { warn, warnNotClient } from '../../../utils/warn'
import { BToast, props as toastProps } from '../toast'

// --- Constants ---

const PROP_NAME = '$bvToast'
const PROP_NAME_PRIV = '_bv__toast'

// Base toast props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`
const BASE_PROPS = ['id', ...keys(omit(toastProps, ['static', 'visible']))]

// Map prop names to toast slot names
const propsToSlots = {
  toastContent: 'default',
  title: 'toast-title'
}

// --- Helper methods ---

// Method to install `$bvToast` VM injection
const plugin = Vue => {
  // Create a private sub-component constructor that
  // extends BToast and self-destructs after hidden
  // @vue/component
  const BVToastPop = Vue.extend({
    name: NAME_TOAST_POP,
    extends: BToast,
    destroyed() {
      // Make sure we not in document any more
      const { $el } = this
      if ($el && $el.parentNode) {
        $el.parentNode.removeChild($el)
      }
    },
    mounted() {
      // Self destruct handler
      const handleDestroy = () => {
        this.$nextTick(() => {
          // In a `requestAF()` to release control back to application
          requestAF(() => {
            this.$destroy()
          })
        })
      }
      // Self destruct if parent destroyed
      this.$parent.$once(HOOK_EVENT_NAME_DESTROYED, handleDestroy)
      // Self destruct after hidden
      this.$once(EVENT_NAME_HIDDEN, handleDestroy)
      // Self destruct when toaster is destroyed
      this.listenOnRoot(getRootEventName(NAME_TOASTER, EVENT_NAME_DESTROYED), toaster => {
        /* istanbul ignore next: hard to test */
        if (toaster === this.computedToaster) {
          handleDestroy()
        }
      })
    }
  })

  // Private method to generate the on-demand toast
  const makeToast = (props, $parent) => {
    if (warnNotClient(PROP_NAME)) {
      /* istanbul ignore next */
      return
    }
    // Create an instance of `BVToastPop` component
    const toast = new BVToastPop({
      // We set parent as the local VM so these toasts can emit events on the
      // app `$root`, and it ensures `BToast` is destroyed when parent is destroyed
      parent: $parent,
      propsData: {
        ...pluckProps(BASE_PROPS, getComponentConfig(NAME_TOAST)),
        // Add in (filtered) user supplied props
        ...omit(props, keys(propsToSlots)),
        // Props that can't be overridden
        static: false,
        visible: true
      }
    })
    // Convert certain props to slots
    keys(propsToSlots).forEach(prop => {
      let value = props[prop]
      if (!isUndefined(value)) {
        // Can be a string, or array of VNodes
        if (prop === 'title' && isString(value)) {
          // Special case for title if it is a string, we wrap in a <strong>
          value = [$parent.$createElement('strong', { class: 'mr-2' }, value)]
        }
        toast.$slots[propsToSlots[prop]] = concat(value)
      }
    })
    // Create a mount point (a DIV) and mount it (which triggers the show)
    const div = document.createElement('div')
    document.body.appendChild(div)
    toast.$mount(div)
  }

  // Declare BvToast instance property class
  class BvToast {
    constructor(vm) {
      // Assign the new properties to this instance
      assign(this, { _vm: vm, _root: vm.$root })
      // Set these properties as read-only and non-enumerable
      defineProperties(this, {
        _vm: readonlyDescriptor(),
        _root: readonlyDescriptor()
      })
    }

    // --- Public Instance methods ---

    // Shows a user defined toast and returns immediately
    toast(content, props = {}) {
      /* istanbul ignore next */
      if (!content || warnNotClient(PROP_NAME)) {
        return
      }
      makeToast(
        {
          ...pluckProps(BASE_PROPS, props),
          toastContent: content
        },
        this._vm
      )
    }

    // Show a toast with the specified ID
    show(id) {
      if (id) {
        this._root.$emit(getRootActionEventName(NAME_TOAST, EVENT_NAME_SHOW), id)
      }
    }

    // Hide a toast with specified ID, or if no ID all toasts
    hide(id = null) {
      this._root.$emit(getRootActionEventName(NAME_TOAST, EVENT_NAME_HIDE), id)
    }

    // Toggle a toast with the specified ID
    toggle(id) {
      if (id) {
        this._root.$emit(getRootActionEventName(NAME_TOAST, EVENT_NAME_TOGGLE), id)
      }
    }
  }

  // Add our instance mixin
  Vue.mixin({
    beforeCreate() {
      // Because we need access to `$root` for `$emits`, and VM for parenting,
      // we have to create a fresh instance of `BvToast` for each VM
      this[PROP_NAME_PRIV] = new BvToast(this)
    }
  })

  // Define our read-only `$bvToast` instance property
  // Placed in an if just in case in HMR mode
  if (!hasOwnProperty(Vue.prototype, PROP_NAME)) {
    defineProperty(Vue.prototype, PROP_NAME, {
      get() {
        /* istanbul ignore next */
        if (!this || !this[PROP_NAME_PRIV]) {
          warn(`"${PROP_NAME}" must be accessed from a Vue instance "this" context.`, NAME_TOAST)
        }
        return this[PROP_NAME_PRIV]
      }
    })
  }
}

export const BVToastPlugin = /*#__PURE__*/ pluginFactory({
  plugins: { plugin }
})
