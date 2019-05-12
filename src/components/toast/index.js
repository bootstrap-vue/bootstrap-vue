import BToast from './toast'
import BToaster from './toaster'
import BVToastPlugin from './helpers/bv-toast'
import { installFactory } from '../../utils/plugins'

const components = {
  BToast,
  BToaster
}

const plugins = {
  // $bvToast injection
  BVToastPlugin
}

export { BToast, BToaster }

export default {
  install: installFactory({ components, plugins })
}
