import ToolTip from '../../utils/tooltip.class'
import warn from '../../utils/warn'
import toolpopMixin from '../../mixins/toolpop'

// @vue/component
export default {
  name: 'BTooltip',
  mixins: [toolpopMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {}
  },
  methods: {
    createToolpop() {
      // getTarget is in toolpop mixin
      const target = this.getTarget()
      if (target) {
        this._toolpop = new ToolTip(target, this.getConfig(), this.$root)
      } else {
        this._toolpop = null
        warn("b-tooltip: 'target' element not found!")
      }
      return this._toolpop
    }
  },
  render(h) {
    return h(
      'div',
      { class: ['d-none'], style: { display: 'none' }, attrs: { 'aria-hidden': true } },
      [h('div', { ref: 'title' }, this.$slots.default)]
    )
  }
}
