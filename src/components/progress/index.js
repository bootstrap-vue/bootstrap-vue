import BProgress from './progress'
import BProgressBar from './progress-bar'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BProgress,
  BProgressBar
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
