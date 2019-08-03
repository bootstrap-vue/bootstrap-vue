import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { BTableTbody } from './table-tbody'
import { BTableThead } from './table-thead'
import { BTableTfoot } from './table-tfoot'
import { BTr } from './tr'
import { BTd } from './td'
import { BTh } from './th'
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
    BTr,
    BTableTd,
    BTd,
    BTh
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
  BTr,
  BTd,
  BTh
}

export default TablePlugin
