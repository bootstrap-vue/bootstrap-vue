/**
 * Plugin for adding `$bvToast` property to all Vue instances
 */

/* istanbul ignore file: not ready for testing yet as things are still changing */

import Vue from '../../../utils/vue'
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
import { warnNotClient } from '../../../utils/warn'
import BToast, { props as toastProps } from '../toast'

// --- Constants ---

const PROP_NAME = '$bvToast'

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

// Create a private sub-component that extends BToast
// which self-destructs after hidden
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
    // Self destruct handler
    const self = this
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
      if (toaster === self.toaster) {
        handleDestroy()
      }
    })
  }
})

// Method to generate the on-demand toast
const makeToast = (props, $parent) => {
  if (warnNotClient(PROP_NAME)) {
    // Should this throw an error?
    /* istanbul ignore next */
    return
  }
  // Create an instance of `BToast` component
  const toast = new BToastPop({
    // We set parent as the local VM so these toasts can emit events on
    // the app `$root`
    // And it helps to ensure `BToast` is destroyed when parent is destroyed
    parent: $parent,
    // Preset the prop values
    propsData: {
      ...filterOptions(getComponentConfig('BToast') || {}),
      // Add in (filtered) user supplied props
      ...omit(props, ['toastContent']),
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
      // Alternatively, user can use HTML version of prop to pass an HTML string
      if (prop === 'title' && isString(value)) {
        // Special case for title if it is a string, we wrap in a <strong>
        value = [$parent.$createElement('strong', { class: 'mr-2' }, value)]
      }
      toast.$slots[propsToSlots[prop]] = value
    }
  })

  // Create a mount point (a DIV)
  // TODO: this needs to target a portal-target
  // But we still need to place in document to portal-vue can
  // transfer the content
  const div = document.createElement('div')
  document.body.appendChild(div)

  // Mount the toast to trigger it to show
  toast.$mount(div)
}

// BvToast instance property class
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

  // --- Instance methods ---

  // Opens a user defined toast and returns immediately
  toast(content, options = {}) {
    if (!content || warnNotClient(PROP_NAME)) {
      // Should this throw an error?
      /* istanbul ignore next */
      return
    }
    const props = {
      ...filterOptions(options),
      toastContent: content
    }
    makeToast(props, this._vm)
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

// Method to install `$bvToast` VM injection
const install = _Vue => {
  if (install._installed) {
    // Only install once
    /* istanbul ignore next */
    return
  }
  install._installed = true

  // Add our instance mixin
  _Vue.mixin({
    beforeCreate() {
      // Because we need access to `$root` for `$emits`, and VM for parenting,
      // we have to create a fresh instance of `BvToast` for each VM
      this._bv__toast = new BvToast(this)
    }
  })

  // Define our read-only `$bvToast` instance property
  // Placed in an if just in case in HMR mode
  if (!_Vue.prototype.hasOwnProperty(PROP_NAME)) {
    defineProperty(_Vue.prototype, PROP_NAME, {
      get() {
        return this._bv__toast
      }
    })
  }
}

export default install
