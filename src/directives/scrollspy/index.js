import VBScrollspyDirective from './scrollspy'
import { installFactory } from '../../utils/plugins'

const directives = {
  BScrollspy: VBScrollspyDirective
}

export { VBScrollspyDirective as VBScrollspy }

export default {
  install: installFactory({ directives })
}
