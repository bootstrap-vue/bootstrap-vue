import BPagination from './pagination'
import { installFactory } from '../../utils/plugins'

const components = {
  BPagination
}

export { BPagination }

export default {
  install: installFactory({ components })
}
