import Vue from '../../utils/vue'
import listenOnRootMixin from '../../mixins/listen-on-root'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { getComponentConfig } from '../../utils/config'

const NAME = 'BNavbarToggle'

// Events we emit on $root
const EVENT_TOGGLE = 'bv::toggle::collapse'

// Events we listen to on $root
const EVENT_STATE = 'bv::collapse::state'
// This private event is NOT to be documented as people should not be using it.
const EVENT_STATE_SYNC = 'bv::collapse::sync::state'

// @vue/component
export default Vue.extend({
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
    return h(
      'button',
      {
        class: ['navbar-toggler'],
        attrs: {
          type: 'button',
          'aria-label': this.label,
          'aria-controls': this.target,
          'aria-expanded': this.toggleState ? 'true' : 'false'
        },
        on: { click: this.onClick }
      },
      [this.normalizeSlot('default') || h('span', { class: ['navbar-toggler-icon'] })]
    )
  }
})
