// For adding $bvModal property to all Vue isntances
import Vue from 'vue'
import BModal, { props as modalProps } from '../modal'
import warn from '../../../utils/warn'
import pluckProps from '../../../utils/pluck-props'
import { inBrowser, hasPromise } from '../../../utils/env'
import { assign, defineProperty, defineProperties } from '../../../utils/object'

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

// Create a private sub-component that extends BModal
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
    // Self destruct after hidden
    this.$refs.modal.$once('hidden', () => {
      this.$nextTick(() => this.$destroy)
    })
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
        listeners: this.$listeners
      },
      [this.content]
    )
  }
})

// Base Modal Props that are allowed
// (some may be ignored on some message boxes)
// TODO: This could be BModal props, run through
//       omit and reduced to an array of keys
const BASE_PROPS = [
  'title',
  'okTitle',
  'okVariant',
  'cancelTitle',
  'cancelVariant',
  'size',
  'buttonSize',
  'centered',
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
  'returnFocus'
]

// Method to generate the modal message box
const makeMsgBox = (props, $parent) => {
  const msgBox = new MsgBox({
    // Create a fresh DIV to attach the modal to
    el: document.createElement('div'),
    // We set parent as the local VM so these modals
    // will emit $root events on the global $root
    // as needed by things like tooltips and dropdowns
    parent: $parent,
    // Preset the props
    propsData: {
      // Add in (filtered) user supplied props
      ...props,
      // We fallback to undefined here so that the defaults will be used.
      // We may not need to do this if users don't provide the props.
      // Or we may need to filter undefined props out of here.
      okTitle: props.okTitle || undefined,
      cancelTitle: props.cancelTitle || undefined,
      // Enable/Disable some features
      hideHeaderClose: true,
      hideHeader: !props.title
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
      ...pluckProps(BASE_PROPS, options),
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
      ...pluckProps(BASE_PROPS, options),
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

// Method to install $bvModal injection
const install = _Vue => {
  // Add our instance mixin
  _Vue.mixin({
    beforeCreate() {
      // Because we need access to $root for $emits, we have to
      // create a fresh instance of BvModal for each VM.
      this._bv__modal = new BvModal(this)
    }
  })

  // Define out $bvModal instance property
  defineProperty(_Vue.prototype, '$bvModal', {
    get() {
      return this._bv__modal
    }
  })
}

export default install
