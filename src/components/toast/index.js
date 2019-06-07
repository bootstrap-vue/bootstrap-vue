import BToast from './toast'
import BToaster from './toaster'
import BVToastPlugin from './helpers/bv-toast'
import { pluginFactory } from '../../utils/plugins'

const ToastPlugin = /*#__PURE__*/ pluginFactory({
  components: { BToast, BToaster },
  // $bvToast injection
  plugins: { BVToastPlugin }
})

export { BToast, BToaster }

export default ToastPlugin
