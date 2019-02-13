import BMedia from './media'
import BMediaAside from './media-aside'
import BMediaBody from './media-body'
import { registerComponents } from '../../utils/plugins'

const components = {
  BMedia,
  BMediaAside,
  BMediaBody
}

export default {
  install(Vue) {
    registerComponents(Vue, components)
  }
}
