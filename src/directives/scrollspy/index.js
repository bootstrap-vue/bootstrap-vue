import BScrollspyDirective from './scrollspy'
import { installFactory } from '../../utils/plugins'

const directives = {
  BScrollspy: BScrollspyDirective
}

export { BScrollspyDirective as BScrollspy }

export default {
  install: installFactory({ directives })
}
