import Vue from '../../utils/vue'
import { getComponentConfig } from '../../utils/config'
import { toString } from '../../utils/string'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_SYNC } from '../../directives/toggle/toggle'

// TODO:
//   Switch to using `VBToggle` directive, will reduce code footprint
//   Although the `click` event will no longer be cancellable
//   Instead add `disabled` prop, and have `VBToggle` check element
//   disabled state

// --- Constants ---

const NAME = 'BNavbarToggle'
const CLASS_NAME = 'navbar-toggler'

// --- Main component ---
// @vue/component
export const BNavbarToggle = /*#__PURE__*/ Vue.extend({
  name: NAME,
  mixins: [listenOnRootMixin, normalizeSlotMixin],
  props: {
    label: {
      type: String,
      default: () => getComponentConfig(NAME, 'label')
    },
    target: {
      type: String,
      required: true
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
      this.$emit('click', evt)
      if (!evt.defaultPrevented) {
        this.$root.$emit(EVENT_TOGGLE, this.target)
      }
    },
    handleStateEvt(id, state) {
      if (id === this.target) {
        this.toggleState = state
      }
    }
  },
  render(h) {
    const expanded = this.toggleState
    return h(
      'button',
      {
        staticClass: CLASS_NAME,
        attrs: {
          type: 'button',
          'aria-label': this.label,
          'aria-controls': this.target,
          'aria-expanded': toString(expanded)
        },
        on: { click: this.onClick }
      },
      [
        this.normalizeSlot('default', { expanded }) ||
          h('span', { staticClass: `${CLASS_NAME}-icon` })
      ]
    )
  }
})
