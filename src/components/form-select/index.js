import BFormSelect from './form-select'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormSelect,
  BSelect: BFormSelect
}

export default {
  install: installFactory({ components })
}
