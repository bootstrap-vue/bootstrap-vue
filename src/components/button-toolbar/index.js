import BButtonToolbar from './button-toolbar'
import { installFactory } from '../../utils/plugins'

const components = {
  BButtonToolbar,
  BBtnToolbar: BButtonToolbar
}

const ButtonToolbarPlugin = {
  install: installFactory({ components })
}

export {
  // Plugins
  ButtonToolbarPlugin,
  // Components
  BButtonToolbar
}

// Legacy: default is plugin
export default ButtonToolbarPlugin
