import BvEvent from '../../../utils/bv-event.class'
import warn from '../../../utils/warn'
import { defineProperties, readonlyDescriptor } from '../../../utils/object'

class BvModalEvent extends BvEvent {
  constructor(type, eventInit = {}) {
    super(type, eventInit)
    // Freeze our new props as readonly, but leave them enumerable
    defineProperties(this, {
      trigger: readonlyDescriptor()
    })
  }

  get modalId() /* istanbul ignore next */ {
    // Backwards compatability <= 2.0.0-rc.19
    warn('b-modal: evt.modalId is deprecated. Please use evt.componentId.')
    return this.componentId
  }

  cancel() /* istanbul ignore next */ {
    // Backwards compatibility for BootstrapVue 1.x
    warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().')
    this.preventDefault()
  }

  static get Defaults() {
    return {
      ...super.Defaults,
      trigger: null
    }
  }
}

// Named exports
export { BvModalEvent }

// Default export
export default BvModalEvent
