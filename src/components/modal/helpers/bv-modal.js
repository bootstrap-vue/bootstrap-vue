//
// Plugin for adding $bvModal property to all Vue isntances
//
import Vue from 'vue'
import BModal, { props as modalProps } from '../modal'
import warn from '../../../utils/warn'
import { getComponentConfig } from '../../../utils/config'
import { inBrowser, hasPromise } from '../../../utils/env'
import { assign, defineProperty, defineProperties } from '../../../utils/object'

/* istanbul ignore file: for now, until tests are created */

// Utility methods that produce warns
const noPromises = method => {
  /* istanbul ignore if */
  if (!hasPromise) {
    method = method ? `.${method}` : ''
    warn(`$bvModal${method}: requires promise support`)
    return true
  } else {
    return false
  }
}

const notClient = method => {
  /* istanbul ignore if */
  if (!inBrowser) {
    method = method ? `.${method}` : ''
    warn(`$bvModal${method}: methods can not be called on the server`)
    return true
  } else {
    return false
  }
}

// Base Modal Props that are allowed
// (some may be ignored on some message boxes)
// TODO: This could be BModal props, run through
//       omit and reduced to an array of keys
const BASE_PROPS = [
  'id',
  'title',
  'titleTag',
  'okTitle',
  'okVariant',
  'cancelTitle',
  'cancelVariant',
  'size',
  'buttonSize',
  'centered',
  'scrollable',
  'noCloseOnBackdrop',
  'noCloseOnEsc',
  'noFade',
  'hideBackdrop',
  'modalClass',
  'headerClass',
  'headerBgVariant',
  'headerBgVariant',
  'headerBorderVariant',
  'headerTextVariant',
  'bodyClass',
  'bodyBgVariant',
  'bodyBgVariant',
  'bodyBorderVariant',
  'bodyTextVariant',
  'footerClass',
  'footerBgVariant',
  'footerBorderVariant',
  'footerTextVariant',
  // Return Focus is not really needed as the modal will
  // return focus to the previously active element.
  'returnFocus'
]

// Method to filter only recognized props that are not undefined
const filterOptions = options => {
  return BASE_PROPS.reduce((memo, key) => {
    if (options[key] !== undefined) {
      memo[key] = options[key]
    }
  }, {})
}

// Create a private sub-component that wraps BModal
// that self-destructs after hidden.
// @vue/component
const MsgBox = Vue.extend({
  name: 'BMsgBox',
  props: {
    // Has all the b-modal props
    ...modalProps,
    // Plus we add a new prop for the content.
    content: {
      // type: [String, VNode, Array],
      default: ''
    }
  },
  beforeMount() {
    // Make sure we are in document before mount
    if (this.$el && document && document.body) {
      document.body.appendChild(this.$el)
    }
  },
  destroyed() {
    // Make sure we not in document any more
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  mounted() {
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
    this.$refs.modal.$once('hidden', handleDestroy)
    // TODO:
    //    Add in route watcher to destroy modal on route change
    //    But may need to add in an option to reject promise
    // Show the modal message box once mounted,
    // as these modals are created on demand
    this.$refs.modal.show()
  },
  render(h) {
    return h(
      BModal,
      {
        ref: 'modal',
        props: this.$props,
        on: {
          show: (...args) => this.$emit('show', ...args),
          shown: (...args) => this.$emit('shown', ...args),
          hide: (...args) => this.$emit('hide', ...args),
          hidden: (...args) => this.$emit('hidden', ...args)
        }
      },
      [this.content]
    )
  }
})

// Method to generate the on-demand modal message box
const makeMsgBox = (props, $parent) => {
  const msgBox = new MsgBox({
    // Create a fresh DIV to attach the modal to
    el: document.createElement('div'),
    // We set parent as the local VM so these modals can emit events
    // on the app $root, as needed by things like tooltips and dropdowns.
    // And it ensures this component gets destroyed when parent does
    parent: $parent,
    // Preset the prop values
    propsData: {
      // Add in optional global config for modal defaults before the following.
      // TODO:
      //   Add in specific defaults for BMsgBox
      //   Will need special handling as most defaults are undefined
      ...filterOptions(getComponentConfig('BModal') || {}),
      // Defaults that user can override
      hideHeaderClose: true,
      hideHeader: !props.title,
      noStacking: false,
      // Add in (filtered) user supplied props
      ...props
    }
  })
  return msgBox
}

// Private Read Only descriptor helper
const privateRODescriptor = () => ({ enumerable: false, configurable: false, writable: false })

// BvModal instance property class
class BvModal {
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

  // Show modal with the specified ID
  // args are for future use
  show(id, ...args) {
    if (id) {
      this._root.$emit('bv::show::modal', id, ...args)
    }
  }

  // Hide modal with the specified ID
  // args are for future use
  hide(id, ...args) {
    if (id) {
      this._root.$emit('bv::hide::modal', id, ...args)
    }
  }

  // TODO:
  //   Could make Promise Versions of above
  //   that first check if modal is in document (by ID)
  //   and if not found reject the promise
  //   else waits for hide/hidden event and then resolve
  //   returning the BvModalEvent object (which contains the details)

  // The following methods require Promise Support!
  // IE 11 and others do not support Promise natively, so users
  // should have a Polyfill loaded.

  // Open a message box with OK button only
  msgBoxOk(message, options = {}) {
    if (!message || noPromises('msgBoxOk') || notClient('msgBoxOk')) {
      // Should this throw an error?
      /* istanbul ignore next */
      return
    }
    // Pick the modal props we support from options
    const props = {
      ...filterOptions(options),
      // Add in overrides and our content prop
      okOnly: true,
      content: message
    }
    // Return a promise
    return new Promise(resolve => {
      makeMsgBox(props, this._vm).$on('hide', evt => {
        // Always returns true when closed
        resolve(true)
      })
    })
  }

  // Open a message box modal with OK and CANCEL buttons
  msgBoxConfirm(message, options = {}) {
    if (!message || noPromises('msgBoxConfirm') || notClient('msgBoxConfirm')) {
      // Should this throw an error?
      /* istanbul ignore next */
      return
    }
    // Pick the modal props we support from options
    const props = {
      ...filterOptions(options),
      // Add in overrides and our content prop
      okOnly: false,
      content: message
    }
    return new Promise(resolve => {
      makeMsgBox(props, this._vm).$on('hide', evt => {
        // Value could be null if pressing ESC or clicking Backdrop
        let value = null
        if (evt.trigger === 'ok') {
          // Return explicit true if user clicked OK button
          value = true
        } else if (evt.trigger === 'cancel') {
          // Return explicit false if user clicked CANCEL button
          value = false
        }
        resolve(value)
      })
    })
  }
}

// Method to install $bvModal vm injection
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
      // we have to create a fresh instance of BvModal for each VM.
      this._bv__modal = new BvModal(this)
    }
  })

  // Define our read-only $bvModal instance property
  defineProperty(_Vue.prototype, '$bvModal', {
    get() {
      return this._bv__modal
    }
  })
}

export default install
