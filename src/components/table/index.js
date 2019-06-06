import BTable from './table'
import BTableLite from './table-lite'
import { pluginFactory } from '../../utils/plugins'

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: { BTable, BTableLite }
})

export { BTable, BTableLite }

export default TablePlugin
