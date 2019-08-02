import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { pluginFactory } from '../../utils/plugins'

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: { BTable, BTableLite, BTableSimple }
})

export { TablePlugin, BTable, BTableLite, BTableSimple }
