import BModal from './modal'
import BModalDirectivePlugin from '../../directives/modal'
import { installFactory } from '../../utils/plugins'

const components = {
  BModal
}

const plugins = {
  BModalDirectivePlugin
}

export default {
  install: installFactory({ components, plugins })
}
