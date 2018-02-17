import bProgress from './progress'
import bProgressBar from './progress-bar'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bProgress,
  bProgressBar
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
