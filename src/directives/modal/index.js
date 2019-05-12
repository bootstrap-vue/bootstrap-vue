import VBModal from './modal'
import { installFactory } from '../../utils/plugins'

const directives = {
  VBModal
}

export { VBModal }

export default {
  install: installFactory({ directives })
}
