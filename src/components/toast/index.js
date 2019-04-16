import BToast from './toast'
import BToaster from './toaster'
import bvToastInstall from './helpers/bv-toast'
import { installFactory } from '../../utils/plugins'

const components = {
  BToast,
  BToaster
}

const install = installFactory({ components })

export default {
  install: Vue => {
    // Inject `$bvToast` into Vue prototype
    bvToastInstall(Vue)
    // Install components
    install(Vue)
  }
}
