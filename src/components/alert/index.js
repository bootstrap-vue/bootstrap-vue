import BAlert from './alert'
import { installFactory } from '../../utils/plugins'

const components = {
  BAlert
}

export default {
  install: installFactory({ components })
}
