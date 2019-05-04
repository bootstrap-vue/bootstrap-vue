import BFormGroup from './form-group'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormGroup,
  BFormFieldset: BFormGroup
}

export { BFormGroup }

export default {
  install: installFactory({ components })
}
