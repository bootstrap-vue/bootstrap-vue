import BFormInput from './form-input'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormInput,
  BInput: BFormInput
}

export default {
  install: installFactory({ components })
}
