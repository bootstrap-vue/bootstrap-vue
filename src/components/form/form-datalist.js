import { NAME_FORM_DATALIST } from '../../constants/components'
import Vue from '../../utils/vue'
import { htmlOrText } from '../../utils/html'
import formOptionsMixin from '../../mixins/form-options'
import normalizeSlotMixin from '../../mixins/normalize-slot'

// @vue/component
export const BFormDatalist = /*#__PURE__*/ Vue.extend({
  name: NAME_FORM_DATALIST,
  mixins: [formOptionsMixin, normalizeSlotMixin],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  render(h) {
    const $options = this.formOptions.map((option, index) => {
      const { value, html, text, disabled } = option

      return h('option', {
        key: `option_${index}_opt`,
        attrs: { disabled },
        domProps: { ...htmlOrText(html, text), value }
      })
    })

    return h('datalist', { attrs: { id: this.id } }, [$options, this.normalizeSlot('default')])
  }
})
