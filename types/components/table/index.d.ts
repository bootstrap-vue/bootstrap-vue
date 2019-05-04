//
// Table
//
import Vue, { VNode } from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Modal Plugin
declare const TablePlugin: TablePlugin
export default TablePlugin
export interface TablePlugin extends BvPlugin {}

// Component: b-modal
export interface BTable extends Vue {
  // Public methods
  refresh: () => void
  clearSelected: () => void
  // Props
  fields?: BvTableFieldObject | BvTableFieldArray
}

export type BvTableVariant =
  | 'active'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark'

export type BvTableSortDirection = 'asc' | 'desc' | 'last'

export type BvTableFormatterCallback = ((value: any, key: string, item: any) => any)

export interface BvTableField {
  label?: string
  headerTitle?: string
  headerAbbr?: string
  class?: string | string[]
  formatter?: string | BvTableFormatterCallback
  sortable?: boolean
  sortDirection?: BvTableSortDirection
  tdClass?: string | string[] | BvTableFormatterCallback
  thClass?: string | string[]
  thStyle?: any
  variant?: BvTableVariant | string
  tdAttr?: any | ((value: any, key: string, item: any) => any)
  isRowHeader?: boolean
}

export interface BvTableFieldObject {
  [key: string]: BvTableField
}

export type BvTableFieldArray = Array<string | ({ key: string } & BvTableField)>
