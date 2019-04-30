import BModalDirective from './modal'
import { installFactory } from '../../utils/plugins'

const directives = {
  BModal: BModalDirective
}

export { BModalDirective as BModal }

export default {
  install: installFactory({ directives })
}
