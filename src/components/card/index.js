import BCard from './card'
import BCardHeader from './card-header'
import BCardBody from './card-body'
import BCardTitle from './card-title'
import BCardSubTitle from './card-sub-title'
import BCardFooter from './card-footer'
import BCardImg from './card-img'
import BCardText from './card-text'
import BCardGroup from './card-group'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  BCard,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BCardFooter,
  BCardImg,
  BCardText,
  BCardGroup
}

const VuePlugin = {
  install(Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
