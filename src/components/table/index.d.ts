//
// Table
//
import Vue, { VNode } from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Modal Plugin
export declare const TablePlugin: BvPlugin
export default TablePlugin

// Component: b-table
export declare class BTable extends BvComponent {
  // Public methods
  refresh: () => void
  clearSelected: () => void
  // Props
  id?: string
  items: Array<any> | BvTableProviderCallback
  fields?: BvTableFieldObject | BvTableFieldArray
  primaryKey?: string
  sortBy?: string | null
  sortDesc?: boolean
  sortDirection?: BvTableSortDirection
  sortCompare?: BvTableSortCompareCallback
  sortCompareLocale?: string | Array<string>
  sortCompareOptions?: BvTableLocaleCompareOptions
  perPage?: number | string
  currentPage?: number | string
  filter?: string | Array<any> | RegExp | object | any
  filterFunction?: BvTableFilterCallback
  filterIgnoredFields?: Array<string>
  filterIncludedFields?: Array<string>
  busy?: boolean
  tbodyTrClass?: string | Array<any> | object | BvTableTbodyTrClassCallback
}

// Component: b-table-lite
export declare class BTableLite extends BvComponent {
  // Props
  id?: string
  items: Array<any> | BvTableProviderCallback
  fields?: BvTableFieldObject | BvTableFieldArray
  primaryKey?: string
  tbodyTrClass?: string | Array<any> | object | BvTableTbodyTrClassCallback
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

export type BvTableTbodyTrClassCallback = ((item: any, type: string) => any)

export type BvTableFilterCallback = ((item: any, filter: any) => boolean)

export type BvTableLocaleCompareOptionLocaleMatcher = 'lookup' | 'best fit'

export type BvTableLocaleCompareOptionSensitivity = 'base' | 'accent' | 'case' | 'variant'

export type BvTableLocaleCompareOptionCaseFirst = 'upper' | 'lower' | 'false'

export type BvTableLocaleCompareOptionUsage = 'sort'

export interface BvTableLocaleCompareOptions {
  ignorePunctuation?: boolean
  numeric?: boolean
  localeMatcher?: BvTableLocaleCompareOptionLocaleMatcher
  sensitivity?: BvTableLocaleCompareOptionSensitivity
  caseFirst?: BvTableLocaleCompareOptionCaseFirst
  usage?: BvTableLocaleCompareOptionUsage
}

export type BvTableSortCompareCallback = ((
  a: any,
  b: any,
  field: string,
  sortDesc?: boolean,
  formatter?: BvTableFormatterCallback | undefined | null,
  localeOptions?: BvTableLocaleCompareOptions,
  locale?: string | Array<string> | undefined | null
) => number | boolean | null | undefined)

export interface BvTableCtxObject {
  currentPage: number
  perPage: number
  filter: string | RegExp | BvTableFilterCallback | null
  sortBy: string | null
  sortDesc: boolean
  apiUrl: string | null
  [key: string]: any
}

export type BvTableProviderPromiseResult = Array<any> | null

export interface BvTableProviderCallback {
  (ctx: BvTableCtxObject): Array<any> | Promise<BvTableProviderPromiseResult> | any
  (ctx: BvTableCtxObject, callback: () => Array<any>): null
}

export interface BvTableField {
  label?: string
  headerTitle?: string
  headerAbbr?: string
  class?: string | string[]
  formatter?: string | BvTableFormatterCallback
  sortable?: boolean
  sortDirection?: BvTableSortDirection
  sortByFormatted?: boolean
  filterByFormatted?: boolean
  tdClass?: string | string[] | ((value: any, key: string, item: any) => any)
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
