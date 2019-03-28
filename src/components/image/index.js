import BImg from './img'
import BImgLazy from './img-lazy'
import { installFactory } from '../../utils/plugins'

const components = {
  BImg,
  BImgLazy
}

export default {
  install: installFactory({ components })
}
