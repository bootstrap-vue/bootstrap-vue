import BModal from './modal'
import BVModalPlugin from './helpers/bv-modal'
import VBModal from '../../directives/modal/modal'
import { pluginFactory } from '../../utils/plugins'

const ModalPlugin = /*#__PURE__*/ pluginFactory({
  components: { BModal },
  directives: { VBModal },
  // $bvModal injection
  plugins: { BVModalPlugin }
})

export { BModal }

export default ModalPlugin
