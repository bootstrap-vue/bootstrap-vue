import BFormRadio from './form-radio'
import BFormRadioGroup from './form-radio-group'
import { registerComponents } from '../../utils/plugins'

const components = {
  BFormRadio,
  BRadio: BFormRadio,
  BFormRadioGroup,
  BRadioGroup: BFormRadioGroup
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
