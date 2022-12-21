import { extend } from '../../vue'
import { NAME_COLLAPSE, NAME_NAVBAR_TOGGLE } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import { PROP_TYPE_ARRAY_STRING, PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_DEFAULT } from '../../constants/slots'
import { getRootEventName } from '../../utils/events'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { listenOnRootMixin } from '../../mixins/listen-on-root'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { VBToggle } from '../../directives/toggle/toggle'

// --- Constants ---

const CLASS_NAME = 'navbar-toggler'

const ROOT_EVENT_NAME_STATE = getRootEventName(NAME_COLLAPSE, 'state')
const ROOT_EVENT_NAME_SYNC_STATE = getRootEventName(NAME_COLLAPSE, 'sync-state')

// --- Props ---

export const props = makePropsConfigurable(
  {
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    label: makeProp(PROP_TYPE_STRING, 'Toggle navigation'),
    target: makeProp(PROP_TYPE_ARRAY_STRING, undefined, true) // Required
  },
  NAME_NAVBAR_TOGGLE
)

// --- Main component ---

// @vue/component
export const BNavbarToggle = /*#__PURE__*/ extend({
  name: NAME_NAVBAR_TOGGLE,
  directives: { VBToggle },
  mixins: [listenOnRootMixin, normalizeSlotMixin],
  props,
  data() {
    return {
      toggleState: false
    }
  },
  created() {
    this.listenOnRoot(ROOT_EVENT_NAME_STATE, this.handleStateEvent)
    this.listenOnRoot(ROOT_EVENT_NAME_SYNC_STATE, this.handleStateEvent)
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        // Emit courtesy `click` event
        this.$emit(EVENT_NAME_CLICK, event)
      }
    },
    handleStateEvent(id, state) {
      // We listen for state events so that we can pass the
      // boolean expanded state to the default scoped slot
      if (id === this.target) {
        this.toggleState = state
      }
    }
  },
  render(h) {
    const { disabled } = this

    return h(
      'button',
      {
        staticClass: CLASS_NAME,
        class: { disabled },
        directives: [{ name: 'VBToggle', value: this.target }],
        attrs: {
          type: 'button',
          disabled,
          'aria-label': this.label
        },
        on: { click: this.onClick }
      },
      [
        this.normalizeSlot(SLOT_NAME_DEFAULT, { expanded: this.toggleState }) ||
          h('span', { staticClass: `${CLASS_NAME}-icon` })
      ]
    )
  }
})
