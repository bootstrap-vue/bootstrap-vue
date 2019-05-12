import BListGroup from './list-group'
import BListGroupItem from './list-group-item'
import { installFactory } from '../../utils/plugins'

const components = {
  BListGroup,
  BListGroupItem
}

export { BListGroup, BListGroupItem }

export default {
  install: installFactory({ components })
}
