import VBScrollspy from './scrollspy'
import { installFactory } from '../../utils/plugins'

const directives = {
  VBScrollspy
}

export { VBScrollspy }

export default {
  install: installFactory({ directives })
}
