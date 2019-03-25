import BToggleDirective from './toggle'
import { installFactory } from '../../utils/plugins'

const directives = {
  BToggle: BToggleDirective
}

export default {
  install: installFactory({ directives })
}
