import { BCard } from './card'
import { BCardHeader } from './card-header'
import { BCardBody } from './card-body'
import { BCardTitle } from './card-title'
import { BCardSubTitle } from './card-sub-title'
import { BCardFooter } from './card-footer'
import { BCardImg } from './card-img'
import { BCardImgLazy } from './card-img-lazy'
import { BCardText } from './card-text'
import { BCardGroup } from './card-group'
import { pluginFactory } from '../../utils/plugins'

const CardPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BCardFooter,
    BCardImg,
    BCardImgLazy,
    BCardText,
    BCardGroup
  }
})

export {
  CardPlugin,
  BCard,
  BCardHeader,
  BCardBody,
  BCardTitle,
  BCardSubTitle,
  BCardFooter,
  BCardImg,
  BCardImgLazy,
  BCardText,
  BCardGroup
}

export default CardPlugin
