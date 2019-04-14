import BModal from './modal'
import bvModalInstall from './helpers/bv-modal'
import BModalDirective from '../../directives/modal/modal'
import { installFactory } from '../../utils/plugins'

const components = {
  BModal
}

const directives = {
  BModal: BModalDirective
}

const install = installFactory({ components, directives })

export default {
  install: Vue => {
    // Inject `$bvModal` into Vue prototype
    bvModalInstall(Vue)
    // Install component and directive
    install(Vue)
  }
}
