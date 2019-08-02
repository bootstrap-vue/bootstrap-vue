import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { BTableThead } from './table-thead'
import { BTableTr } from './table-tr'
import { BTableTd } from './table-td'
import { BTableTh } from './table-th'
import { pluginFactory } from '../../utils/plugins'

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTable,
    BTableLite,
    BTableSimple,
    BTableThead,
    bThead: BTableThead,
    BTableTr,
    BTr: BTableTr,
    BTableTd,
    BTd: BTableTd,
    BTableTh,
    BTh: BTableTh
  }
})

export { TablePlugin, BTable, BTableLite, BTableSimple, BTableThead, BTableTr, BTableTd, BTableTh }

export default TablePlugin
