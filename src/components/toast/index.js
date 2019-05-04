import BToast from './toast'
import BToaster from './toaster'
import BvToastPlugin from './helpers/bv-toast'
import { installFactory } from '../../utils/plugins'

const components = {
  BToast,
  BToaster
}

const plugins = {
  BvToastPlugin
}

export { BToast, BToaster }

export default {
  install: installFactory({ components, plugins })
}
