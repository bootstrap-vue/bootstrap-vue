import { pluginFactory } from '../../utils/plugins'
import { BSkeleton } from './skeleton'
import { BSkeletonIcon } from './skeleton-icon'
import { BSkeletonImg } from './skeleton-img'
import { BSkeletonTable } from './skeleton-table'
import { BSkeletonWrapper } from './skeleton-wrapper'

const SkeletonPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BSkeleton,
    BSkeletonIcon,
    BSkeletonImg,
    BSkeletonTable,
    BSkeletonWrapper
  }
})

export { SkeletonPlugin, BSkeleton, BSkeletonIcon, BSkeletonImg, BSkeletonTable, BSkeletonWrapper }
