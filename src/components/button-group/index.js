import BButtonGroup from './button-group'
import { installFactory } from '../../utils/plugins'

const components = {
  BButtonGroup,
  BBtnGroup: BButtonGroup
}

const ButtonGroupPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  ButtonGroupPlugin,
  // Components
  BButtonGroup
}

// Legacy: default is plugin
export default ButtonGroupPlugin
