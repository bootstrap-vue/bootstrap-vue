import listenOnRootMixin from '../../mixins/listen-on-root'

export default {
  mixins: [listenOnRootMixin],
  render (h) {
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
  },
  data () {
    return {
      toggleState: false
    }
  },
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
  methods: {
    onClick () {
      this.$root.$emit('bv::toggle::collapse', this.target)
    },
    handleStateEvt (id, state) {
      if (id === this.target) {
        this.toggleState = state
      }
    }
  },
  created () {
    this.listenOnRoot('bv::collapse::state', this.handleStateEvt)
  }
}
