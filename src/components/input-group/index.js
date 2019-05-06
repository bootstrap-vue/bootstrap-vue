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

const InputGroupPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  InputGroupPlugin,
  // Components
  BInputGroup,
  BInputGroupAddon,
  BInputGroupPrepend,
  BInputGroupAppend,
  BInputGroupText
}

// Legacy: default is plugin
export default InputGroupPlugin
