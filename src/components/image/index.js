import { BImg } from './img'
import { BImgLazy } from './img-lazy'
import { pluginFactory } from '../../utils/plugins'

const ImagePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BImg,
    BImgLazy
  }
})

export { ImagePlugin, BImg, BImgLazy }

export default ImagePlugin
