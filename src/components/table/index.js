import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { BTableTr } from './table-tr'
import { BTableTd } from './table-td'
import { BTableTh } from './table-th'
import { pluginFactory } from '../../utils/plugins'

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTable,
    BTableLite,
    BTableSimple,
    BTableTr,
    BTr: BTableTr,
    BTableTd,
    BTd: BTableTd,
    BTableTh,
    BTh: BTableTh
  }
})

export { TablePlugin, BTable, BTableLite, BTableSimple, BTableTr, BTableTd, BTableTh }

export default TablePlugin
