import BvEvent from '../../../utils/bv-event.class'
import warn from '../../../utils/warn'
import { defineProperties, readonlyDescriptor } from '../../../utils/object'

class BvModalEvent extends BvEvent {
  constructor(type, eventInit = {}) {
    super(type, eventInit)
    // Freeze our new props as readonly, but leave them enumerable
    defineProperties(this, {
      modalId: readonlyDescriptor(),
      trigger: readonlyDescriptor()
    })
  }

  cancel() /* istanbul ignore next */ {
    // Backwards compatibility for BootstrapVue 1.x
    warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().')
    this.preventDefault()
  }

  static get Defaults() {
    return {
      ...super.Defaults,
      modalId: null,
      trigger: null
    }
  }
}

// Named exports
export { BvModalEvent }

// Default export
export default BvModalEvent
