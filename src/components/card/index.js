import BCard from './card'
import BCardHeader from './card-header'
import BCardBody from './card-body'
import BCardFooter from './card-footer'
import BCardImg from './card-img'
import BCardGroup from './card-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BCard,
  BCardHeader,
  BCardBody,
  BCardFooter,
  BCardImg,
  BCardGroup
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
