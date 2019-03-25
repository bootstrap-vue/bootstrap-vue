import BFormTextarea from './form-textarea'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormTextarea,
  BTextarea: BFormTextarea
}

export default {
  install: installFactory({ components })
}
