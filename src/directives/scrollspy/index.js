import BScrollspyDirective from './scrollspy'
import { installFactory } from '../../utils/plugins'

const directives = {
  BScrollspy: BScrollspyDirective
}

export default {
  install: installFactory({ directives })
}
