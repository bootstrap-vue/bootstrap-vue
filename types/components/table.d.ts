//
// Table
//
import Vue, { VNode } from 'vue'
import { BvPlugin } from '../bv-plugin'

// Modal Plugin
declare const TablePlugin: Table
export default Table
export interface TablePlugin extends BvPlugin {}

// Component: b-modal
export interface BTableComponent extends Vue {
  // Public methods
  refresh: () => void
  // Props
  fields?: BTableFieldObject | BTableFieldArray
}

type BTableVariant =
  | 'active'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark'

type BTableSortDirection = 'asc' | 'desc' | 'last'

type BTableFormatterCallback = ((value: any, key: string, item: any) => any)

export interface BTableField {
  label?: string
  headerTitle?: string
  headerAbbr?: string
  class?: string | string[]
  formatter?: string | BTableFormatterCallback
  sortable?: boolean
  sortDirection?: SortDirection
  tdClass?: string | string[] | BTableFormatterCallback
  thClass?: string | string[]
  thStyle?: any
  variant?: BTableVariant | string
  tdAttr?: any | ((value: any, key: string, item: any) => any)
  isRowHeader?: boolean
}

export interface BTableFieldObject {
  [key: string]: BTableField
}

export type BTableFieldArray = Array<string | ({ key: string } & BTableField)>
