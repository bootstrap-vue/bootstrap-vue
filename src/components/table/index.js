import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { BTableTbody } from './table-tbody'
import { BTableThead } from './table-thead'
import { BTableTfoot } from './table-tfoot'
import { BTableTr } from './table-tr'
import { BTableTd } from './table-td'
import { BTableTh } from './table-th'
import { pluginFactory } from '../../utils/plugins'

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTable,
    BTableLite,
    BTableSimple,
    BTableTbody,
    BTbody: BTableTbody,
    BTableThead,
    BThead: BTableThead,
    BTableTfoot,
    BTfoot: BTableTfoot,
    BTableTr,
    BTr: BTableTr,
    BTableTd,
    BTd: BTableTd,
    BTableTh,
    BTh: BTableTh
  }
})

export {
  // Plugin
  TablePlugin,
  // Table components
  BTable,
  BTableLite,
  BTableSimple,
  // Helper components
  BTableTbody,
  BTableThead,
  BTableTfoot,
  BTableTr,
  BTableTd,
  BTableTh
}

export default TablePlugin
