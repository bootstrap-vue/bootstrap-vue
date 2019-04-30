import BInputGroup from './input-group'
import BInputGroupAddon from './input-group-addon'
import BInputGroupPrepend from './input-group-prepend'
import BInputGroupAppend from './input-group-append'
import BInputGroupText from './input-group-text'
import { installFactory } from '../../utils/plugins'

const components = {
  BInputGroup,
  BInputGroupAddon,
  BInputGroupPrepend,
  BInputGroupAppend,
  BInputGroupText
}

export { BInputGroup, BInputGroupAddon, BInputGroupPrepend, BInputGroupAppend, BInputGroupText }

export default {
  install: installFactory({ components })
}
