import { BButtonGroup } from './button-group'
import { pluginFactory } from '../../utils/plugins'

const ButtonGroupPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BButtonGroup,
    BBtnGroup: BButtonGroup
  }
})

export { ButtonGroupPlugin, BButtonGroup }

export default ButtonGroupPlugin
