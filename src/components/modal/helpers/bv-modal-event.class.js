import BvEvent from '../../../utils/bv-event.class'
import warn from '../../../utils/warn'
import { defineProperties, readonlyDescriptor } from '../../../utils/object'

class BvModalEvent extends BvEvent {
  constructor(type, eventInit = {}) {
    super(type, eventInit)
    // Freeze our new props as readonly, but leave them enumerable.
    defineProperties(this, {
      modalId: readonlyDescriptor(),
      trigger: readonlyDescriptor()
    })
  }

  cancel() /* istanbul ignore next */ {
    // Backwards compatibility for 1.x BootstrapVue
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

// Named Exports
export { BvModalEvent }

// Default Export
export default BvModalEvent
