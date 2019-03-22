import formOptionsMixin from '../../mixins/form-options'
import { htmlOrText } from '../../utils/html'

// @vue/component
export default {
  name: 'BFormDatalist',
  mixins: [formOptionsMixin],
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  render(h) {
    const options = this.formOptions.map((option, index) => {
      return h('option', {
        key: `option_${index}_opt`,
        on: this.$listeners
        attrs: { disabled: option.disabled },
        domProps: { ...htmlOrText(option.html, option.text), value: option.value }
      })
    })
    return h('datalist', { attrs: { id: this.id } }, [options, this.$slots.default])
  }
}
