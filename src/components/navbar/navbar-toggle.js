import { NAME_NAVBAR_TOGGLE } from '../../constants/components'
import { SLOT_NAME_DEFAULT } from '../../constants/slot-names'
import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { VBToggle, EVENT_STATE, EVENT_STATE_SYNC } from '../../directives/toggle/toggle'

// --- Constants ---

const CLASS_NAME = 'navbar-toggler'

// --- Main component ---
// @vue/component
export const BNavbarToggle = /*#__PURE__*/ Vue.extend({
  name: NAME_NAVBAR_TOGGLE,
  directives: { VBToggle },
  mixins: [listenOnRootMixin, normalizeSlotMixin],
  props: {
    label: {
      type: String,
      default: () => getComponentConfig(NAME_NAVBAR_TOGGLE, 'label')
    },
    target: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggleState: false
    }
  },
  created() {
    this.listenOnRoot(EVENT_STATE, this.handleStateEvt)
    this.listenOnRoot(EVENT_STATE_SYNC, this.handleStateEvt)
  },
  methods: {
    onClick(evt) {
      if (!this.disabled) {
        // Emit courtesy `click` event
        this.$emit('click', evt)
      }
    },
    handleStateEvt(id, state) {
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
