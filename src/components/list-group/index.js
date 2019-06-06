import BListGroup from './list-group'
import BListGroupItem from './list-group-item'
import { pluginFactory } from '../../utils/plugins'

const ListGroupPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BListGroup,
    BListGroupItem
  }
})

export { BListGroup, BListGroupItem }

export default ListGroupPlugin
