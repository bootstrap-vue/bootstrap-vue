import { BTabs } from './tabs'
import { BTab } from './tab'
import { pluginFactory } from '../../utils/plugins'

const TabsPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTabs,
    BTab
  }
})

export { BTabs, BTab }

export default TabsPlugin
