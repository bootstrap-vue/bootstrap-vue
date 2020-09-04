import { pluginFactory } from '../../utils/plugins'
import { BSkeleton } from './skeleton'
import { BSkeletonIcon } from './skeleton-icon'
import { BSkeletonImg } from './skeleton-img'
import { BSkeletonTable } from './skeleton-table'
import { BSkeletonWrapper } from './skeleton-wrapper'

const SkeletonPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BSkeleton,
    BSkeletonWrapper,
    BSkeletonTable,
    BSkeletonImg,
    BSkeletonIcon
  }
})

export { SkeletonPlugin, BSkeleton, BSkeletonWrapper, BSkeletonTable, BSkeletonImg, BSkeletonIcon }
