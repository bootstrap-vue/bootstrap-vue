import { BAvatar } from './avatar'
import { BAvatarGroup } from './avatar-group'
import { pluginFactory } from '../../utils/plugins'

const AvatarPlugin = /*#__PURE__*/ pluginFactory({
  components: { BAvatar, BAvatarGroup }
})

export { AvatarPlugin, BAvatar, BAvatarGroup }
