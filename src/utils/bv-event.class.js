import { assign, defineProperty, defineProperties, readonlyDescriptor } from '../utils/object'

class BvEvent {
  constructor(type, eventInit = {}) {
    // Start by emulating native Event constructor.
    if (!type) {
      /* istanbul ignore next */
      throw new TypeError(
        `Failed to construct '${this.constructor.name}'. 1 argument required, ${
          arguments.length
        } given.`
      )
    }
    // Assign defaults first, the eventInit,
    // and the type last so it can't be overwritten.
    assign(this, BvEvent.defaults(), constructor.defaults(), eventInit, { type })
    // Freeze some props as readonly, but leave them enumerable.
    defineProperties(this, {
      type: readonlyDescriptor(),
      cancelable: readonlyDescriptor(),
      nativeEvent: readonlyDescriptor(),
      target: readonlyDescriptor(),
      relatedTarget: readonlyDescriptor(),
      vueTarget: readonlyDescriptor()
    })
    // Create a private variable using closure scoping.
    let defaultPrevented = false
    // Recreate preventDefault method. One way setter.
    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true
      }
    }
    // Create 'defaultPrevented' publicly accessible prop
    // that can only be altered by the preventDefault method.
    defineProperty(this, 'defaultPrevented', {
      enumerable: true,
      get() {
        return defaultPrevented
      }
    })
  }

  static defaults() {
    return {
      type: '',
      cancelable: true,
      nativeEvent: null,
      target: null,
      relatedTarget: null,
      vueTarget: null
    }
  }
}

class BvModalEvent extends BvEvent {
  constructor(type, eventInit = {}) {
    super(type, eventInit)
    // Freeze our new props as readonly, but leave them enumerable.
    defineProperties(this, {
      modalId: readonlyDescriptor(),
      trigger: readonlyDescriptor()
    })
  }

  get isOK() /* istanbul ignore next */ {
    warn(`b-modal: evt.isOK is deprecated. Please use evt.trigger === 'ok'.`)
    return this.trigger === 'ok'
  }

  cancel() /* istanbul ignore next */ {
    // Backwards compatibility
    warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().')
    this.preventDefault()
  }

  static defaults() {
    return {
      ...super.defaults(),
      modalId: null,
      trigger: null
    }
  }
}

// Named Exports
export {
  BvEvent,
  BvModalEvent
}

// Default Export
export default BvEvent
