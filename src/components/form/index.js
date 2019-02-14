import BForm from './form'
import BFormRow from './form-row'
import BFormText from './form-text'
import BFormInvalidFeedback from './form-invalid-feedback'
import BFormValidFeedback from './form-valid-feedback'
import { registerComponents } from '../../utils/plugins'

const components = {
  BForm,
  BFormRow,
  BFormText,
  BFormInvalidFeedback,
  BFormFeedback: BFormInvalidFeedback,
  BFormValidFeedback
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
