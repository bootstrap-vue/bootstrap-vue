import BCollapse from './collapse'
import BToggleDirective from '../../directives/toggle/toggle'
import { installFactory } from '../../utils/plugins'

const components = {
  BCollapse
}

const directives = {
  BToggle: BToggleDirective
}

export default {
  install: installFactory({ components, directives })
}
