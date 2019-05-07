import BCollapse from './collapse'
import VBToggle from '../../directives/toggle/toggle'
import { installFactory } from '../../utils/plugins'

const components = {
  BCollapse
}

const directives = {
  VBToggle
}

export { BCollapse }

export default {
  install: installFactory({ components, directives })
}
