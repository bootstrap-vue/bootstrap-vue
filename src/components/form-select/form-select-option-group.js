import Vue from '../../vue'
import { NAME_FORM_SELECT_OPTION_GROUP } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { SLOT_NAME_FIRST } from '../../constants/slot-names'
import { htmlOrText } from '../../utils/html'
import formOptionsMixin, { props as formOptionsProps } from '../../mixins/form-options'
import normalizeSlotMixin from '../../mixins/normalize-slot'
import { BFormSelectOption } from './form-select-option'

// @vue/component
const BFormSelectOptionGroup = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_SELECT_OPTION_GROUP,
  mixins: [normalizeSlotMixin, formOptionsMixin],
  props: makePropsConfigurable(
    {
      ...formOptionsProps,
      label: {
        type: String,
        required: true
      }
    },
    NAME_FORM_SELECT_OPTION_GROUP
  ),
  render(h) {
    const $options = this.formOptions.map((option, index) => {
      const { value, text, html, disabled } = option

      return h(BFormSelectOption, {
        attrs: { value, disabled },
        domProps: htmlOrText(html, text),
        key: `option_${index}`
      })
    })

    return h('optgroup', { attrs: { label: this.label } }, [
      this.normalizeSlot(SLOT_NAME_FIRST),
      $options,
      this.normalizeSlot()
    ])
  }
})

export { BFormSelectOptionGroup }
