import { BSkeleton } from './skeleton'
import { BSkeletonWrapper } from './skeleton-wrapper'
import { BSkeletonTable } from './skeleton-table'
import { BSkeletonImage } from './skeleton-image'

import { pluginFactory } from '../../utils/plugins'

const SkeletonPlugin = /*#__PURE__*/ pluginFactory({
  components: { BSkeleton, BSkeletonWrapper, BSkeletonTable, BSkeletonImage }
})

export { SkeletonPlugin, BSkeleton, BSkeletonWrapper, BSkeletonTable, BSkeletonImage }
