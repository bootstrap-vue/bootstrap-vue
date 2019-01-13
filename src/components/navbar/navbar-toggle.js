import listenOnRootMixin from '../../mixins/listen-on-root'

// @vue/component
export default {
  name: 'BNavbarToggle',
  mixins: [listenOnRootMixin],
  props: {
    label: {
      type: String,
      default: 'Toggle navigation'
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
    this.listenOnRoot('bv::collapse::state', this.handleStateEvt)
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt)
      /* istanbul ignore next */
      if (!evt.defaultPrevented) {
        this.$root.$emit('bv::toggle::collapse', this.target)
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
}
