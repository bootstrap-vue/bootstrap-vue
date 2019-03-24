import BButtonToolbar from './button-toolbar'
import { installFactory } from '../../utils/plugins'

const components = {
  BButtonToolbar,
  BBtnToolbar: BButtonToolbar
}

export default {
  install: installFactory({ components })
}
