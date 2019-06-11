/**
 * Plugin for adding `$bvToast` property to all Vue instances
 */

import { concat } from '../../../utils/array'
import { getComponentConfig } from '../../../utils/config'
import { requestAF } from '../../../utils/dom'
import { isUndefined, isString } from '../../../utils/inspect'
import {
  assign,
  defineProperties,
  defineProperty,
  keys,
  omit,
  readonlyDescriptor
} from '../../../utils/object'
import { pluginFactory } from '../../../utils/plugins'
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

// --- Utility methods ---

// Method to filter only recognized props that are not undefined
const filterOptions = options => {
  return BASE_PROPS.reduce((memo, key) => {
    if (!isUndefined(options[key])) {
      memo[key] = options[key]
    }
    return memo
  }, {})
}

// Method to install `$bvToast` VM injection
const plugin = Vue => {
  // Create a private sub-component constructor that
  // extends BToast and self-destructs after hidden
  // @vue/component
  const BToastPop = Vue.extend({
    name: 'BToastPop',
    extends: BToast,
    destroyed() {
      // Make sure we not in document any more
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    mounted() {
      const self = this
      // Self destruct handler
      const handleDestroy = () => {
        // Ensure the toast has been force hidden
        self.localShow = false
        self.doRender = false
        self.$nextTick(() => {
          self.$nextTick(() => {
            // In a `requestAF()` to release control back to application
            // and to allow the portal-target time to remove the content
            requestAF(() => {
              self.$destroy()
            })
          })
        })
      }
      // Self destruct if parent destroyed
      this.$parent.$once('hook:destroyed', handleDestroy)
      // Self destruct after hidden
      this.$once('hidden', handleDestroy)
      // Self destruct when toaster is destroyed
      this.listenOnRoot('bv::toaster::destroyed', toaster => {
        /* istanbul ignore next: hard to test */
        if (toaster === self.toaster) {
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
    // Create an instance of `BToastPop` component
    const toast = new BToastPop({
      // We set parent as the local VM so these toasts can emit events on the
      // app `$root`, and it ensures `BToast` is destroyed when parent is destroyed
      parent: $parent,
      propsData: {
        ...filterOptions(getComponentConfig('BToast') || {}),
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

    // Opens a user defined toast and returns immediately
    toast(content, options = {}) {
      if (!content || warnNotClient(PROP_NAME)) {
        /* istanbul ignore next */
        return
      }
      makeToast({ ...filterOptions(options), toastContent: content }, this._vm)
    }

    // shows a `<b-toast>` component with the specified ID
    show(id) {
      if (id) {
        this._root.$emit('bv::show::toast', id)
      }
    }

    // Hide a toast with specified ID, or if not ID all toasts
    hide(id = null) {
      this._root.$emit('bv::hide::toast', id)
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
  if (!Vue.prototype.hasOwnProperty(PROP_NAME)) {
    defineProperty(Vue.prototype, PROP_NAME, {
      get() {
        /* istanbul ignore next */
        if (!this || !this[PROP_NAME_PRIV]) {
          warn(`'${PROP_NAME}' must be accessed from a Vue instance 'this' context`)
        }
        return this[PROP_NAME_PRIV]
      }
    })
  }
}

export const BVToastPlugin = /*#__PURE__*/ pluginFactory({
  plugins: { plugin }
})

// Default export is the Plugin
export default BVToastPlugin
