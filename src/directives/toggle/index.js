import VBToggleDirective from './toggle'
import { installFactory } from '../../utils/plugins'

const directives = {
  BToggle: VBToggleDirective
}

export { VBToggleDirective as VBToggle }

export default {
  install: installFactory({ directives })
}
