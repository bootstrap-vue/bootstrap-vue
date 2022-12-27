// Plugin for adding `$bvModal` property to all Vue instances
import { NAME_MODAL, NAME_MSG_BOX } from '../../../constants/components'
import {
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  HOOK_EVENT_NAME_BEFORE_DESTROY,
  HOOK_EVENT_NAME_DESTROYED
} from '../../../constants/events'
import { useParentMixin } from '../../../mixins/use-parent'
import { concat } from '../../../utils/array'
import { getComponentConfig } from '../../../utils/config'
import { requestAF } from '../../../utils/dom'
import { getRootActionEventName } from '../../../utils/events'
import { isUndefined, isFunction } from '../../../utils/inspect'
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
import { warn, warnNotClient, warnNoPromiseSupport } from '../../../utils/warn'
import { createNewChildComponent } from '../../../utils/create-new-child-component'
import { getEventRoot } from '../../../utils/get-event-root'
import { BModal, props as modalProps } from '../modal'

// --- Constants ---

const PROP_NAME = '$bvModal'
const PROP_NAME_PRIV = '_bv__modal'

// Base modal props that are allowed
// Some may be ignored or overridden on some message boxes
// Prop ID is allowed, but really only should be used for testing
// We need to add it in explicitly as it comes from the `idMixin`
const BASE_PROPS = [
  'id',
  ...keys(omit(modalProps, ['busy', 'lazy', 'noStacking', 'static', 'visible']))
]

// Fallback event resolver (returns undefined)
const defaultResolver = () => {}

// Map prop names to modal slot names
const propsToSlots = {
  msgBoxContent: 'default',
  title: 'modal-title',
  okTitle: 'modal-ok',
  cancelTitle: 'modal-cancel'
}

// --- Helper methods ---

// Method to filter only recognized props that are not undefined
const filterOptions = options => {
  return BASE_PROPS.reduce((memo, key) => {
    if (!isUndefined(options[key])) {
      memo[key] = options[key]
    }
    return memo
  }, {})
}

// Method to install `$bvModal` VM injection
const plugin = Vue => {
  // Create a private sub-component that extends BModal
  // which self-destructs after hidden
  // @vue/component
  const BMsgBox = Vue.extend({
    name: NAME_MSG_BOX,
    extends: BModal,
    mixins: [useParentMixin],
    destroyed() {
      // Make sure we not in document any more
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
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
      this.bvParent.$once(HOOK_EVENT_NAME_DESTROYED, handleDestroy)
      // Self destruct after hidden
      this.$once(EVENT_NAME_HIDDEN, handleDestroy)
      // Self destruct on route change
      /* istanbul ignore if */
      if (this.$router && this.$route) {
        // Destroy ourselves if route changes
        /* istanbul ignore next */
        this.$once(HOOK_EVENT_NAME_BEFORE_DESTROY, this.$watch('$router', handleDestroy))
      }
      // Show the `BMsgBox`
      this.show()
    }
  })

  // Method to generate the on-demand modal message box
  // Returns a promise that resolves to a value returned by the resolve
  const asyncMsgBox = (parent, props, resolver = defaultResolver) => {
    if (warnNotClient(PROP_NAME) || warnNoPromiseSupport(PROP_NAME)) {
      /* istanbul ignore next */
      return
    }
    // Create an instance of `BMsgBox` component
    // We set parent as the local VM so these modals can emit events on
    // the app `$root`, as needed by things like tooltips and popovers
    // And it helps to ensure `BMsgBox` is destroyed when parent is destroyed
    const msgBox = createNewChildComponent(parent, BMsgBox, {
      // Preset the prop values
      propsData: {
        ...filterOptions(getComponentConfig(NAME_MODAL)),
        // Defaults that user can override
        hideHeaderClose: true,
        hideHeader: !(props.title || props.titleHtml),
        // Add in (filtered) user supplied props
        ...omit(props, keys(propsToSlots)),
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
        msgBox.$slots[propsToSlots[prop]] = concat(props[prop])
      }
    })
    // Return a promise that resolves when hidden, or rejects on destroyed
    return new Promise((resolve, reject) => {
      let resolved = false
      msgBox.$once(HOOK_EVENT_NAME_DESTROYED, () => {
        if (!resolved) {
          /* istanbul ignore next */
          reject(new Error('BootstrapVue MsgBox destroyed before resolve'))
        }
      })
      msgBox.$on(EVENT_NAME_HIDE, bvModalEvent => {
        if (!bvModalEvent.defaultPrevented) {
          const result = resolver(bvModalEvent)
          // If resolver didn't cancel hide, we resolve
          if (!bvModalEvent.defaultPrevented) {
            resolved = true
            resolve(result)
          }
        }
      })
      // Create a mount point (a DIV) and mount the msgBo which will trigger it to show
      const div = document.createElement('div')
      document.body.appendChild(div)
      msgBox.$mount(div)
    })
  }

  // Private utility method to open a user defined message box and returns a promise.
  // Not to be used directly by consumers, as this method may change calling syntax
  const makeMsgBox = (parent, content, options = {}, resolver = null) => {
    if (
      !content ||
      warnNoPromiseSupport(PROP_NAME) ||
      warnNotClient(PROP_NAME) ||
      !isFunction(resolver)
    ) {
      /* istanbul ignore next */
      return
    }
    return asyncMsgBox(parent, { ...filterOptions(options), msgBoxContent: content }, resolver)
  }

  // BvModal instance class
  class BvModal {
    constructor(vm) {
      // Assign the new properties to this instance
      assign(this, { _vm: vm, _root: getEventRoot(vm) })
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
        this._root.$emit(getRootActionEventName(NAME_MODAL, 'show'), id, ...args)
      }
    }

    // Hide modal with the specified ID args are for future use
    hide(id, ...args) {
      if (id && this._root) {
        this._root.$emit(getRootActionEventName(NAME_MODAL, 'hide'), id, ...args)
      }
    }

    // The following methods require Promise support!
    // IE 11 and others do not support Promise natively, so users
    // should have a Polyfill loaded (which they need anyways for IE 11 support)

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
      return makeMsgBox(this._vm, message, props, () => {
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
      return makeMsgBox(this._vm, message, props, bvModalEvent => {
        const trigger = bvModalEvent.trigger
        return trigger === 'ok' ? true : trigger === 'cancel' ? false : null
      })
    }
  }

  // Add our instance mixin
  Vue.mixin({
    beforeCreate() {
      // Because we need access to `$root` for `$emits`, and VM for parenting,
      // we have to create a fresh instance of `BvModal` for each VM
      this[PROP_NAME_PRIV] = new BvModal(this)
    }
  })

  // Define our read-only `$bvModal` instance property
  // Placed in an if just in case in HMR mode
  if (!hasOwnProperty(Vue.prototype, PROP_NAME)) {
    defineProperty(Vue.prototype, PROP_NAME, {
      get() {
        /* istanbul ignore next */
        if (!this || !this[PROP_NAME_PRIV]) {
          warn(`"${PROP_NAME}" must be accessed from a Vue instance "this" context.`, NAME_MODAL)
        }
        return this[PROP_NAME_PRIV]
      }
    })
  }
}

export const BVModalPlugin = /*#__PURE__*/ pluginFactory({
  plugins: { plugin }
})
