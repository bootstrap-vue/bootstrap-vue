import BModal from './modal'
import BVModal from './helpers/bv-modal'
import VBModal from '../../directives/modal/modal'
import { installFactory } from '../../utils/plugins'

const components = {
  BModal
}

const directives = {
  VBModal
}

const plugins = {
  // $bvModal injection
  BVModal
}

export { BModal }

export default {
  install: installFactory({ components, directives, plugins })
}
