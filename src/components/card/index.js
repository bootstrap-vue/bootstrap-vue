import bCard from './card'
import bCardHeader from './card-header'
import bCardBody from './card-body'
import bCardFooter from './card-footer'
import bCardImg from './card-img'
import bCardGroup from './card-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bCard,
  bCardHeader,
  bCardBody,
  bCardFooter,
  bCardImg,
  bCardGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
