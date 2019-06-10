import { BVToastPlugin } from './helpers/bv-toast'
import { BToast } from './toast'
import { BToaster } from './toaster'
import { pluginFactory } from '../../utils/plugins'

const ToastPlugin = /*#__PURE__*/ pluginFactory({
  components: { BToast, BToaster },
  // $bvToast injection
  plugins: { BVToastPlugin }
})

export { ToastPlugin, BToast, BToaster }

export default ToastPlugin
