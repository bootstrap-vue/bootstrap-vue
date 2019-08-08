import { BTable } from './table'
import { BTableLite } from './table-lite'
import { BTableSimple } from './table-simple'
import { BTbody } from './tbody'
import { BThead } from './thead'
import { BTfoot } from './tfoot'
import { BTr } from './tr'
import { BTd } from './td'
import { BTh } from './th'
import { pluginFactory } from '../../utils/plugins'

const TableLitePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTableLite
  }
})

const TableSimplePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTableSimple,
    BTbody,
    BThead,
    BTfoot,
    BTr,
    BTd,
    BTh
  }
})

const TablePlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BTable
  },
  plugins: {
    TableLitePlugin,
    TableSimplePlugin
  }
})

export {
  // Plugins
  TablePlugin,
  TableLitePlugin,
  TableSimplePlugin,
  // Table components
  BTable,
  BTableLite,
  BTableSimple,
  // Helper components
  BTbody,
  BThead,
  BTfoot,
  BTr,
  BTd,
  BTh
}
