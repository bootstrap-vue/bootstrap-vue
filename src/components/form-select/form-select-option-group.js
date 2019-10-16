import Vue from '../../utils/vue'
import { isArray } from '../../utils/inspect'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import optionsMixin from './helpers/mixin-options'
import { BFormSelectOption } from './form-select-option'

// @vue/component
const BFormSelectOptionGroup = /*#__PURE__*/ Vue.extend({
  name: 'BFormSelectOptionGroup',
  mixins: [normalizeSlotMixin, optionsMixin],
  props: {
    label: {
      type: String,
      required: true
    }
  },
  render(h) {
    return h('optgroup', { attrs: { label: this.label } }, [
      this.normalizeSlot('first'),
      this.formOptions.map((option, index) => {
        const tag = isArray(option.options) ? BFormSelectOptionGroup : BFormSelectOption
        return h(tag, { props: option, key: `option_${index}_opt` })
      }),
      this.normalizeSlot('default')
    ])
  }
})

export { BFormSelectOptionGroup }
