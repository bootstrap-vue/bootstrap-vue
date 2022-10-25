import { extend } from '../../vue'
import { NAME_FORM_DATALIST } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { htmlOrText } from '../../utils/html'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { formOptionsMixin, props as formOptionsProps } from '../../mixins/form-options'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...formOptionsProps,
    id: makeProp(PROP_TYPE_STRING, undefined, true) // Required
  }),
  NAME_FORM_DATALIST
)

// --- Main component ---

// @vue/component
export const BFormDatalist = /*#__PURE__*/ extend({
  name: NAME_FORM_DATALIST,
  mixins: [formOptionsMixin, normalizeSlotMixin],
  props,
  render(h) {
    const { id } = this

    const $options = this.formOptions.map((option, index) => {
      const { value, text, html, disabled } = option

      return h('option', {
        attrs: { value, disabled },
        domProps: htmlOrText(html, text),
        key: `option_${index}`
      })
    })

    return h('datalist', { attrs: { id } }, [$options, this.normalizeSlot()])
  }
})
