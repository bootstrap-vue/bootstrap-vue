import { listenOnRootMixin } from '../../mixins'

export default {
  mixins: [listenOnRootMixin],
  render (h) {
    const t = this
    return h(
      'button',
      {
        class: [ 'navbar-toggler' ],
        attrs: {
          type: 'button',
          'aria-label': t.label,
          'aria-controls': t.target,
          'aria-expanded': t.toggleState ? 'true' : 'false'
        },
        on: { click: t.onClick }
      },
      [ t.$slots.default || h('span', { class: [ 'navbar-toggler-icon' ] }) ]
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
