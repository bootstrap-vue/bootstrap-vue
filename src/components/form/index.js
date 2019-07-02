import { BForm } from './form'
import { BFormDatalist } from './form-datalist'
import { BFormText } from './form-text'
import { BFormInvalidFeedback } from './form-invalid-feedback'
import { BFormValidFeedback } from './form-valid-feedback'
import { BFormRow } from '../layout/form-row'
import { pluginFactory } from '../../utils/plugins'

const FormPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BForm,
    BFormDatalist,
    BDatalist: BFormDatalist,
    BFormText,
    BFormInvalidFeedback,
    BFormFeedback: BFormInvalidFeedback,
    BFormValidFeedback,
    // Added here for convenience
    BFormRow
  }
})

// BFormRow is not exported here as a named export, as it is exported by Layout
export { FormPlugin, BForm, BFormDatalist, BFormText, BFormInvalidFeedback, BFormValidFeedback }
