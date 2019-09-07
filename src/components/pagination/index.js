import { BPagination } from './pagination'
import { pluginFactory } from '../../utils/plugins'

const PaginationPlugin = /*#__PURE__*/ pluginFactory({
  components: { BPagination }
})

export { PaginationPlugin, BPagination }
