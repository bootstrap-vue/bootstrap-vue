import Vue from '../../utils/vue'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { getComponentConfig } from '../../utils/config'
import { EVENT_TOGGLE, EVENT_STATE, EVENT_STATE_SYNC } from '../../directives/toggle/toggle'

const NAME = 'BNavbarToggle'

// TODO:
//  Switch to using VBToggle directive, will reduce code footprint
//  Although the click event will no longer be cancellable
//  Instead add `disabled` prop

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
        class: ['navbar-toggler'],
        attrs: {
          type: 'button',
          'aria-label': this.label,
          'aria-controls': this.target,
          'aria-expanded': expanded ? 'true' : 'false'
        },
        on: { click: this.onClick }
      },
      [this.normalizeSlot('default', { expanded }) || h('span', { class: ['navbar-toggler-icon'] })]
    )
  }
})
