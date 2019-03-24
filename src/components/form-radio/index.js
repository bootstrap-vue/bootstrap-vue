import BFormRadio from './form-radio'
import BFormRadioGroup from './form-radio-group'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormRadio,
  BRadio: BFormRadio,
  BFormRadioGroup,
  BRadioGroup: BFormRadioGroup
}

export default {
  install: installFactory({ components })
}
