import BSpinner from './spinner'
import { installFactory } from '../../utils/plugins'

const components = {
  BSpinner
}

export { BSpinner }

export default {
  install: installFactory({ components })
}
