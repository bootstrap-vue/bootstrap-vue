/**
 * Plugin for adding `$bvModal` property to all Vue instances
 */

import Vue from '../../../utils/vue'
import BModal, { props as modalProps } from '../modal'
import { getComponentConfig } from '../../../utils/config'
import { isUndefined, isFunction } from '../../../utils/inspect'
import {
  assign,
  keys,
  omit,
  defineProperty,
  defineProperties,
  readonlyDescriptor
} from '../../../utils/object'
import { warnNotClient, warnNoPromiseSupport } from '../../../utils/warn'

// --- Constants ---

const PROP_NAME = '$bvModal'

// Base modal props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`
const BASE_PROPS = ['id', ...keys(omit(modalProps, ['busy', 'lazy', 'noStacking', 'visible']))]

// Fallback event resolver (returns undefined)
const defaultResolver = bvModalEvt => {}

// Map prop names to modal slot names
const propsToSlots = {
  msgBoxContent: 'default',
  title: 'modal-title',
  okTitle: 'modal-ok',
  cancelTitle: 'modal-cancel'
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

// Create a private sub-component that extends BModal
// which self-destructs after hidden
// @vue/component
const MsgBox = Vue.extend({
  name: 'BMsgBox',
  extends: BModal,
  destroyed() {
    // Make sure we not in document any more
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  mounted() {
    // Self destruct handler
    const handleDestroy = () => {
      const self = this
      this.$nextTick(() => {
        // In a `setTimeout()` to release control back to application
        setTimeout(() => self.$destroy(), 0)
      })
    }
    // Self destruct if parent destroyed
    this.$parent.$once('hook:destroyed', handleDestroy)
    // Self destruct after hidden
    this.$once('hidden', handleDestroy)
    // Self destruct on route change
    /* istanbul ignore if */
    if (this.$router && this.$route) {
      const unwatch = this.$watch('$router', handleDestroy)
      this.$once('hook:beforeDestroy', unwatch)
    }
    // Should we also self destruct on parent deactivation?

    // Show the `MsgBox`
    this.show()
  }
})

// Method to generate the on-demand modal message box
// Returns a promise that resolves to a value returned by the resolve
const asyncMsgBox = (props, $parent, resolver = defaultResolver) => {
  if (warnNotClient(PROP_NAME) || warnNoPromiseSupport(PROP_NAME)) {
    // Should this throw an error?
    /* istanbul ignore next */
    return
  }
  // Create an instance of `MsgBox` component
  const msgBox = new MsgBox({
    // We set parent as the local VM so these modals can emit events on
    // the app `$root`, as needed by things like tooltips and popovers
    // And it helps to ensure `MsgBox` is destroyed when parent is destroyed
    parent: $parent,
    // Preset the prop values
    propsData: {
      // Add in optional global config for modal defaults before the following
      // TODO: Add in specific defaults for `BMsgBox`
      //       Will need special handling as most defaults are undefined
      ...filterOptions(getComponentConfig('BModal') || {}),
      // Defaults that user can override
      hideHeaderClose: true,
      hideHeader: !(props.title || props.titleHtml),
      // Add in (filtered) user supplied props
      ...omit(props, ['msgBoxContent']),
      // Props that can't be overridden
      lazy: false,
      busy: false,
      visible: false,
      noStacking: false,
      noEnforceFocus: false
    }
  })

  // Convert certain props to scoped slots
  keys(propsToSlots).forEach(prop => {
    if (!isUndefined(props[prop])) {
      // Can be a string, or array of VNodes.
      // Alternatively, user can use HTML version of prop to pass an HTML string.
      msgBox.$slots[propsToSlots[prop]] = props[prop]
    }
  })

  // Create a mount point (a DIV)
  const div = document.createElement('div')
  document.body.appendChild(div)

  // Return a promise that resolves when hidden, or rejects on destroyed
  return new Promise((resolve, reject) => {
    let resolved = false
    msgBox.$once('hook:destroyed', () => {
      if (!resolved) {
        /* istanbul ignore next */
        reject(new Error('BootstrapVue MsgBox destroyed before resolve'))
      }
    })
    msgBox.$on('hide', bvModalEvt => {
      if (!bvModalEvt.defaultPrevented) {
        const result = resolver(bvModalEvt)
        // If resolver didn't cancel hide, we resolve
        if (!bvModalEvt.defaultPrevented) {
          resolved = true
          resolve(result)
        }
      }
    })
    // Mount the `MsgBox`, which will auto-trigger it to show
    msgBox.$mount(div)
  })
}

// BvModal instance property class
class BvModal {
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

  // Show modal with the specified ID args are for future use
  show(id, ...args) {
    if (id && this._root) {
      this._root.$emit('bv::show::modal', id, ...args)
    }
  }

  // Hide modal with the specified ID args are for future use
  hide(id, ...args) {
    if (id && this._root) {
      this._root.$emit('bv::hide::modal', id, ...args)
    }
  }

  // TODO: Could make Promise versions of above that first checks
  //       if modal is in document (by ID) and if not found reject
  //       the Promise. Otherwise waits for hide/hidden event and
  //       then resolves returning the `BvModalEvent` object
  //       (which contains the details)

  // The following methods require Promise support!
  // IE 11 and others do not support Promise natively, so users
  // should have a Polyfill loaded (which they need anyways for IE 11 support)

  // Opens a user defined message box and returns a promise
  msgBox(content, options = {}, resolver) {
    if (
      !content ||
      warnNoPromiseSupport(PROP_NAME) ||
      warnNotClient(PROP_NAME) ||
      !isFunction(resolver)
    ) {
      // Should this throw an error?
      /* istanbul ignore next */
      return
    }
    const props = {
      ...filterOptions(options),
      msgBoxContent: content
    }
    return asyncMsgBox(props, this._vm, resolver)
  }

  // Open a message box with OK button only and returns a promise
  msgBoxOk(message, options = {}) {
    // Pick the modal props we support from options
    const props = {
      ...options,
      // Add in overrides and our content prop
      okOnly: true,
      okDisabled: false,
      hideFooter: false,
      msgBoxContent: message
    }
    return this.msgBox(message, props, bvModalEvt => {
      // Always resolve to true for OK
      return true
    })
  }

  // Open a message box modal with OK and CANCEL buttons
  // and returns a promise
  msgBoxConfirm(message, options = {}) {
    // Set the modal props we support from options
    const props = {
      ...options,
      // Add in overrides and our content prop
      okOnly: false,
      okDisabled: false,
      cancelDisabled: false,
      hideFooter: false
    }
    return this.msgBox(message, props, bvModalEvt => {
      const trigger = bvModalEvt.trigger
      return trigger === 'ok' ? true : trigger === 'cancel' ? false : null
    })
  }
}

// Method to install `$bvModal` VM injection
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
      // we have to create a fresh instance of `BvModal` for each VM
      this._bv__modal = new BvModal(this)
    }
  })

  // Define our read-only `$bvModal` instance property
  // Placed in an if just in case in HMR mode
  if (!_Vue.prototype.hasOwnProperty(PROP_NAME)) {
    defineProperty(_Vue.prototype, PROP_NAME, {
      get() {
        return this._bv__modal
      }
    })
  }
}

export default install
