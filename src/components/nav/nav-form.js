import Vue, { mergeData } from '../../vue'
import { NAME_NAV_FORM } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { omit } from '../../utils/object'
import { BForm, props as BFormProps } from '../form/form'

export const props = makePropsConfigurable(
  {
    ...omit(BFormProps, ['inline']),
    formClass: {
      type: [String, Array, Object]
      // default: null
    }
  },
  NAME_NAV_FORM
)

// @vue/component
export const BNavForm = /*#__PURE__*/ Vue.extend({
  name: NAME_NAV_FORM,
  functional: true,
  props,
  render(h, { props, data, children, listeners = {} }) {
    const attrs = data.attrs
    // The following data properties are cleared out
    // as they will be passed to BForm directly
    data.attrs = {}
    data.on = {}
    const $form = h(
      BForm,
      {
        class: props.formClass,
        props: { ...props, inline: true },
        attrs,
        on: listeners
      },
      children
    )
    return h('li', mergeData(data, { staticClass: 'form-inline' }), [$form])
  }
})
