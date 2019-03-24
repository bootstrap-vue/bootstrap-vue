import BForm from './form'
import BFormDatalist from './form-datalist'
import BFormRow from './form-row'
import BFormText from './form-text'
import BFormInvalidFeedback from './form-invalid-feedback'
import BFormValidFeedback from './form-valid-feedback'
import { installFactory } from '../../utils/plugins'

const components = {
  BForm,
  BFormDatalist,
  BDatalist: BFormDatalist,
  BFormRow,
  BFormText,
  BFormInvalidFeedback,
  BFormFeedback: BFormInvalidFeedback,
  BFormValidFeedback
}

export default {
  install: installFactory({ components })
}
