import BProgress from './progress'
import BProgressBar from './progress-bar'
import { registerComponents } from '../../utils/plugins'

const components = {
  BProgress,
  BProgressBar
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
