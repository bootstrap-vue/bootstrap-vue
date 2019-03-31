import BModal from './modal'
import BModalDirective from '../../directives/modal/modal'
import { installFactory } from '../../utils/plugins'

const components = {
  BModal
}

const directives = {
  BModal: BModalDirective
}

export default {
  install: installFactory({ components, directives })
}
