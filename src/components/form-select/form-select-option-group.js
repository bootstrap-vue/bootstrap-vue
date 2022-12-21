import { extend } from '../../vue'
import { NAME_FORM_SELECT_OPTION_GROUP } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_FIRST } from '../../constants/slots'
import { htmlOrText } from '../../utils/html'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { formOptionsMixin, props as formOptionsProps } from '../../mixins/form-options'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BFormSelectOption } from './form-select-option'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formOptionsProps,
    label: makeProp(PROP_TYPE_STRING, undefined, true) // Required
  }),
  NAME_FORM_SELECT_OPTION_GROUP
)

// --- Main component ---

// @vue/component
export const BFormSelectOptionGroup = /*#__PURE__*/ extend({
  name: NAME_FORM_SELECT_OPTION_GROUP,
  mixins: [normalizeSlotMixin, formOptionsMixin],
  props,
  render(h) {
    const { label } = this

    const $options = this.formOptions.map((option, index) => {
      const { value, text, html, disabled } = option

      return h(BFormSelectOption, {
        attrs: { value, disabled },
        domProps: htmlOrText(html, text),
        key: `option_${index}`
      })
    })

    return h('optgroup', { attrs: { label } }, [
      this.normalizeSlot(SLOT_NAME_FIRST),
      $options,
      this.normalizeSlot()
    ])
  }
})
