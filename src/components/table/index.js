import BTable from './table'
import BTableLite from './table-lite'
import { installFactory } from '../../utils/plugins'

const components = {
  BTable,
  BTableLite
}

export { BTable, BTableLite }

export default {
  install: installFactory({ components })
}
