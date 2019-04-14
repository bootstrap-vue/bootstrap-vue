//
// Plugin for adding $bvModal property to all Vue isntances
//
import Vue from 'vue'
import BToast, { props as toastProps } from '../toast'
import warn from '../../../utils/warn'
import { getComponentConfig } from '../../../utils/config'
import { inBrowser } from '../../../utils/env'
import { assign, keys, omit, defineProperty, defineProperties } from '../../../utils/object'
import { isDef } from '../../../utils/inspect'

/* istanbul ignore file: for now until we are ready to test */

const notClient = method => {
  /* istanbul ignore else */
  if (inBrowser) {
    return false
  } else {
    warn('this.$bvToast: on demand toasts can not be called during SSR')
    return true
  }
}

// Base Toast Props that are allowed
// (some may be ignored or overridden on some message boxes)
// We need to add ID in explicitly as it comes from the IdMixin
const BASE_PROPS = keys(omit(toastProps, ['show', 'static']))
BASE_PROPS.push('id')

// Method to filter only recognized props that are not undefined
const filterOptions = options => {
  return BASE_PROPS.reduce((memo, key) => {
    if (isDef(options[key])) {
      memo[key] = options[key]
    }
    return memo
  }, {})
}

// Create a private sub-component that extends BToast
// which self-destructs after hidden.
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
    const handleDestroy = () => {
      const self = this
      this.$nextTick(() => {
        // in a setTimeout to release control back to application
        setTimeout(() => self.$destroy(), 0)
      })
    }
    // Self destruct if parent destroyed
    this.$parent.$once('hook:destroyed', handleDestroy)
    // Self destruct after hidden
    this.$once('hidden', handleDestroy)
    // Show the Toast
    this.show()
  }
})

// Map prop names to toast slot names
const propsToSlots = {
  toastContent: 'default',
  title: 'toast-title'
}

// Method to generate the on-demand toast
const makeToast = (props, $parent) => {
  if (notClient()) {
    /* istanbul ignore next */
    return
  }
  // Create an instance of BToast component
  const toast = new BToastPop({
    // We set parent as the local VM so these toasts can emit events
    // on the app $root.
    // And it helps to ensure Toast is destroyed when parent is destroyed.
    parent: $parent,
    // Preset the prop values
    propsData: {
      ...filterOptions(getComponentConfig('BToast') || {}),
      // Add in (filtered) user supplied props
      ...omit(props, ['toastContent']),
      // Props that can't be overridden
      show: false
    }
  })

  // Convert certain props to slots
  keys(propsToSlots).forEach(prop => {
    if (isDef(props[prop])) {
      // Can be a string, or array of VNodes.
      toast.$slots[propsToSlots[prop]] = props[prop]
    }
  })

  // Create a mount point (a DIV)
  // TODO: this needs to target a portal-target
  // But we still need to palce in document to portal-vue can
  // transfer the content
  const div = document.createElement('div')
  document.body.appendChild(div)

  // Mount the toast to trigger it to show
  toast.$mount(div)
}

// Private Read Only descriptor helper
const privateRODescriptor = () => ({ enumerable: false, configurable: false, writable: false })

// Bvtoast instance property class
class BvToast {
  constructor(vm) {
    // Assign the new properties to this instance
    assign(this, { _vm: vm, _root: vm.$root })
    // Set these properties as read-only and non-emumerable
    defineProperties(this, {
      _vm: privateRODescriptor(),
      _root: privateRODescriptor()
    })
  }

  // Instance Methods

  // Opens a user defined toast and returns immediately
  toast(content, options = {}, resolver) {
    if (!content || notClient()) {
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
}

//
// Method to install $bvToast vm injection
//
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
      // Because we need access to $root for $emits, and vm for parenting,
      // we have to create a fresh instance of BvToast for each VM.
      this._bv__toast = new BvToast(this)
    }
  })

  // Define our read-only $bvToast instance property
  defineProperty(_Vue.prototype, '$bvToast', {
    get() {
      return this._bv__toast
    }
  })
}

export default install
