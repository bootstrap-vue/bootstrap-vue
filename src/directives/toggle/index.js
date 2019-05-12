import VBToggle from './toggle'
import { installFactory } from '../../utils/plugins'

const directives = {
  VBToggle
}

export { VBToggle }

export default {
  install: installFactory({ directives })
}
