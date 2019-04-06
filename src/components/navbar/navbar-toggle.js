import Vue from 'vue'
import listenOnRootMixin from '../../mixins/listen-on-root'
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
  mixins: [listenOnRootMixin],
  props: {
    label: {
      type: String,
      default: () => String(getComponentConfig(NAME, 'label') || '')
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
      [this.$slots.default || h('span', { class: ['navbar-toggler-icon'] })]
    )
  }
})
