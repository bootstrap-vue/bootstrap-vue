import BModal from './modal'
import BVModalPlugin from './helpers/bv-modal'
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
  BVModalPlugin
}

export { BModal }

export default {
  install: installFactory({ components, directives, plugins })
}
