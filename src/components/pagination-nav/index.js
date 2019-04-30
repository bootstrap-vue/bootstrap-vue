import BPaginationNav from './pagination-nav'
import { installFactory } from '../../utils/plugins'

const components = {
  BPaginationNav
}

export { BPaginationNav }

export default {
  install: installFactory({ components })
}
