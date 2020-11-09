import { defineComponent, h } from '../../vue'
import { NAME_FORM_DATALIST } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { htmlOrText } from '../../utils/html'
import formOptionsMixin, { props as formOptionsProps } from '../../mixins/form-options'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// @vue/component
export const BFormDatalist = /*#__PURE__*/ defineComponent({
  name: NAME_FORM_DATALIST,
  mixins: [formOptionsMixin, normalizeSlotMixin],
  props: makePropsConfigurable(
    {
      ...formOptionsProps,
      id: {
        type: String,
        required: true
      }
    },
    NAME_FORM_DATALIST
  ),
  render() {
    const $options = this.formOptions.map((option, index) => {
      const { value, text, html, disabled } = option

      return h('option', {
        attrs: { value, disabled },
        domProps: htmlOrText(html, text),
        key: `option_${index}`
      })
    })

    return h('datalist', { attrs: { id: this.id } }, [$options, this.normalizeSlot()])
  }
})
