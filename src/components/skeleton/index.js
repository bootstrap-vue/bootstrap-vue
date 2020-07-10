import { BSkeleton } from './skeleton'
import { BSkeletonWrapper } from './skeleton-wrapper'
import { pluginFactory } from '../../utils/plugins'

const SkeletonPlugin = /*#__PURE__*/ pluginFactory({
  components: { BSkeleton, BSkeletonWrapper }
})

export { SkeletonPlugin, BSkeleton, BSkeletonWrapper }
