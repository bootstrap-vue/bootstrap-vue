import Vue from '../../utils/vue'
import { htmlOrText } from '../../utils/html'
import formOptionsMixin from '../../mixins/form-options'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BFormSelectOption } from './form-select-option'

// @vue/component
const BFormSelectOptionGroup = /*#__PURE__*/ Vue.extend({
  name: 'BFormSelectOptionGroup',
  mixins: [normalizeSlotMixin, formOptionsMixin],
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render(h) {
    return h('optgroup', { attrs: { label: this.label } }, [
      this.normalizeSlot('first'),
      this.formOptions.map((option, index) =>
        h(BFormSelectOption, {
          props: { value: option.value, disabled: option.disabled },
          domProps: htmlOrText(option.html, option.text),
          key: `option_${index}_opt`
        })
      ),
      this.normalizeSlot('default')
    ])
  }
})

export { BFormSelectOptionGroup }
