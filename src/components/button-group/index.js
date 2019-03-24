import BButtonGroup from './button-group'
import { installFactory } from '../../utils/plugins'

const components = {
  BButtonGroup,
  BBtnGroup: BButtonGroup
}

export default {
  install: installFactory({ components })
}
