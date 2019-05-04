import VBModalDirective from './modal'
import { installFactory } from '../../utils/plugins'

const directives = {
  BModal: VBModalDirective
}

export { VBModalDirective as VBModal }

export default {
  install: installFactory({ directives })
}
