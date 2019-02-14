import BJumbotron from './jumbotron'
import { registerComponents } from '../../utils/plugins'

const components = {
  BJumbotron
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
