import BModal from './modal'
import BvModalPlugin from './helpers/bv-modal'
import BModalDirective from '../../directives/modal/modal'
import { installFactory } from '../../utils/plugins'

const components = {
  BModal
}

const directives = {
  BModal: BModalDirective
}

const plugins = {
  BvModalPlugin
}

export { BModal }

export default {
  install: installFactory({ components, directives, plugins })
}
