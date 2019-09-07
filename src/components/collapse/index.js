import { BCollapse } from './collapse'
import { VBToggle } from '../../directives/toggle/toggle'
import { pluginFactory } from '../../utils/plugins'

const CollapsePlugin = /*#__PURE__*/ pluginFactory({
  components: { BCollapse },
  directives: { VBToggle }
})

export { CollapsePlugin, BCollapse }
