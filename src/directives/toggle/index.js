import BToggleDirective from './toggle'
import { installFactory } from '../../utils/plugins'

const directives = {
  BToggle: BToggleDirective
}

export {
  BToggleDirective as BToggle
}

export default {
  install: installFactory({ directives })
}
