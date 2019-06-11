import { BMedia } from './media'
import { BMediaAside } from './media-aside'
import { BMediaBody } from './media-body'
import { pluginFactory } from '../../utils/plugins'

const MediaPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BMedia,
    BMediaAside,
    BMediaBody
  }
})

export { MediaPlugin, BMedia, BMediaAside, BMediaBody }

export default MediaPlugin
