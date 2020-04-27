//
// Table
//
import Vue, { VNode } from 'vue'
import { BvPlugin, BvComponent } from '../../'

// Table Plugins
export declare const TablePlugin: BvPlugin
export declare const TableLitePlugin: BvPlugin
export declare const TableSimplePlugin: BvPlugin

// Component: b-table
export declare class BTable extends BvComponent {
  // Public methods
  refresh: () => void
  clearSelected: () => void
  selectAllRows: () => void
  isRowSelected: (index: number) => boolean
  selectRow: (index: number) => void
  unselectRow: (index: number) => void
  // Props
  id?: string
  items: Array<any> | BvTableProviderCallback
  fields?: BvTableFieldArray
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
  tbodyTrAttr?: object | BvTableTbodyTrAttrCallback
  tabelVariant?: BvTableVariant | string
  headVariant?: BvTableHeadFootVariant | string
  footVariant?: BvTableHeadFootVariant | string
  tbodyTransitionProps?: BvTableTbodyTransitionProps
  tbodyTransitionHandlers?: BvTableTbodyTransitionHandlers
  responsive?: boolean | string
  stacked?: boolean | string
  stickyHeader?: boolean
}

// Component: b-table-lite
export declare class BTableLite extends BvComponent {
  // Props
  id?: string
  items: Array<any> | BvTableProviderCallback
  fields?: BvTableFieldArray
  primaryKey?: string
  tbodyTrClass?: string | Array<any> | object | BvTableTbodyTrClassCallback
  tbodyTrAttr?: object | BvTableTbodyTrAttrCallback
  tableClass?: string
  tableVariant?: BvTableVariant | string
  headVariant?: BvTableHeadFootVariant | string
  footVariant?: BvTableHeadFootVariant | string
  tbodyTransitionProps?: BvTableTbodyTransitionProps
  tbodyTransitionHandlers?: BvTableTbodyTransitionHandlers
  responsive?: boolean | string
  stacked?: boolean | string
  stickyHeader?: boolean
}

// Component: b-table-simple
export declare class BTableSimple extends BvComponent {
  // Props
  id?: string
  tableClass?: string
  tabelVariant?: BvTableVariant | string
  responsive?: boolean | string
  stacked?: boolean | string
  stickyHeader?: boolean
}

// Component: b-tbody
export declare class BTbody extends BvComponent {
  tbodyTransitionProps?: BvTableTbodyTransitionProps
  tbodyTransitionHandlers?: BvTableTbodyTransitionHandlers
}

// Component: b-thead
export declare class BThead extends BvComponent {
  headVariant?: BvTableHeadFootVariant | string
}

// Component: b-tfoot
export declare class BTfoot extends BvComponent {
  footVariant?: BvTableHeadFootVariant | string
}

// Component: b-tr
export declare class BTr extends BvComponent {
  variant?: BvTableVariant | string
}

// Component: b-th
export declare class BTh extends BvComponent {
  variant?: BvTableVariant | string
  colspan?: number | string
  rowspan?: number | string
  stackedHeading?: number | string
  stickyColumn?: boolean
}

// Component: b-td
export declare class BTd extends BvComponent {
  variant?: BvTableVariant | string
  colspan?: number | string
  rowspan?: number | string
  stackedHeading?: number | string
  stickyColumn?: boolean
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

export type BvTableHeadFootVariant = 'light' | 'dark'

export type BvTableSortDirection = 'asc' | 'desc' | 'last'

export type BvTableFormatterCallback = ((value: any, key: string, item: any) => any)

export type BvTableTbodyTrAttrCallback = ((item: any, type: string) => object)

export type BvTableTbodyTrClassCallback = ((item: any, type: string) => any)

export type BvTableFilterCallback = ((item: any, filter: any) => boolean)

export type BvTableLocaleCompareOptionLocaleMatcher = 'lookup' | 'best fit'

export type BvTableLocaleCompareOptionSensitivity = 'base' | 'accent' | 'case' | 'variant'

export type BvTableLocaleCompareOptionCaseFirst = 'upper' | 'lower' | 'false'

export type BvTableLocaleCompareOptionUsage = 'sort'

export interface BvTableTbodyTransitionProps {
  name?: string
  appear?: boolean
  css?: boolean
  type?: string
  duration?: number
  moveClass?: string
  enterClass?: string
  leaveClass?: string
  appearClass?: string
  enterToClass?: string
  leaveToClass?: string
  appearToClass?: string
  enterActiveClass?: string
  leaveActiveClass?: string
  appearActiveClass?: string
}

export interface BvTableTbodyTransitionHandlers {
  beforeEnter?: (el: any) => void
  beforeLeave?: (el: any) => void
  beforeAppear?: (el: any) => void
  enter?: (el: any, done: () => void) => void
  leave?: (el: any, done: () => void) => void
  appear?: (el: any, done: () => void) => void
  afterEnter?: (el: any) => void
  afterLeave?: (el: any) => void
  afterAppear?: (el: any) => void
  enterCancelled?: (el: any) => void
  leaveCancelled?: (el: any) => void
  appearCancelled?: (el: any) => void
}

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
  sortByFormatted?: boolean | BvTableFormatterCallback
  filterByFormatted?: boolean | BvTableFormatterCallback
  tdClass?: string | string[] | ((value: any, key: string, item: any) => any)
  thClass?: string | string[]
  thStyle?: any
  variant?: BvTableVariant | string
  tdAttr?: any | ((value: any, key: string, item: any) => any)
  thAttr?: any | ((value: any, key: string, item: any, type: string) => any)
  stickyColumn?: boolean
  isRowHeader?: boolean
}

export type BvTableFieldArray = Array<string | ({ key: string } & BvTableField)>
