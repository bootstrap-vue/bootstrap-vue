import _startCase from 'lodash.startcase'
import _get from 'lodash.get'
import looseEqual from '../../utils/loose-equal'
import stableSort from '../../utils/stable-sort'
import KeyCodes from '../../utils/key-codes'
import warn from '../../utils/warn'
import stripScripts from '../../utils/strip-scripts'
import { keys, assign } from '../../utils/object'
import { arrayIncludes, isArray } from '../../utils/array'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'

// Import styles for busy and stacked
import './table.css'

// Object of item keys that should be ignored for headers and stringification and filter events
const IGNORED_FIELD_KEYS = {
  _rowVariant: true,
  _cellVariants: true,
  _showDetails: true
}

// Return a copy of a row after all reserved fields have been filtered out
// TODO: add option to specify which fields to include
function sanitizeRow (row) {
  return keys(row).reduce((obj, key) => {
    // Ignore special fields that start with _
    if (!IGNORED_FIELD_KEYS[key]) {
      obj[key] = row[key]
    }
    return obj
  }, {})
}

// Stringifies the values of an object
//   { b: 3, c: { z: 'zzz', d: null, e: 2 }, d: [10, 12, 11], a: 'one' }
// becomes
//   'one 3 2 zzz 10 12 11'
function toString (v) {
  if (!v) {
    return ''
  }
  if (v instanceof Object) {
    // Arrays are also object, and keys just returns the array indexes
    return keys(v)
      .sort() /* sort to prevent SSR issues on pre-rendered sorted tables */
      .map(k => toString(v[k]))
      .join(' ')
  }
  return String(v)
}

// Stringifies the values of a record, ignoring any special top level field keys
// TODO: add option to strigify formatted/scopedSlot items, and only specific fields
function recToString (row) {
  if (!(row instanceof Object)) {
    return ''
  }
  return toString(sanitizeRow(row))
}

// Default sort compare routine
// TODO: add option to sort by multiple columns (tri-state per column, plus order of columns in sort)
//  where sprtBy could be an array of objects [ {key: 'foo', sortDir: 'asc'}, {key:'bar', sortDir: 'desc'} ...]
//  or an array of arrays [ ['foo','asc'], ['bar','desc'] ]
function defaultSortCompare (a, b, sortBy) {
  a = _get(a, sortBy, '')
  b = _get(b, sortBy, '')
  if (typeof a === 'number' && typeof b === 'number') {
    return (a < b && -1) || (a > b && 1) || 0
  }
  return toString(a).localeCompare(toString(b), undefined, {
    numeric: true
  })
}

// Helper function to massage field entry into common object format
function processField (key, value) {
  let field = null
  if (typeof value === 'string') {
    // Label shortcut
    field = { key, label: value }
  } else if (typeof value === 'function') {
    // Formatter shortcut
    field = { key, formatter: value }
  } else if (typeof value === 'object') {
    field = assign({}, value)
    field.key = field.key || key
  } else if (value !== false) {
    // Fallback to just key
    field = { key }
  }
  return field
}

// b-table component definition
export default {
  mixins: [idMixin, listenOnRootMixin],
  render (h) {
    const $slots = this.$slots
    const $scoped = this.$scopedSlots
    const fields = this.computedFields
    const items = this.computedItems

    // Build the caption
    let caption = h(false)
    let captionId = null
    if (this.caption || $slots['table-caption']) {
      captionId = this.isStacked ? this.safeId('_caption_') : null
      const data = {
        key: 'caption',
        id: captionId,
        style: this.captionStyles
      }
      if (!$slots['table-caption']) {
        data.domProps = { innerHTML: stripScripts(this.caption) }
      }
      caption = h('caption', data, $slots['table-caption'])
    }

    // Build the colgroup
    const colgroup = $slots['table-colgroup']
      ? h('colgroup', { key: 'colgroup' }, $slots['table-colgroup'])
      : h(false)

    // factory function for thead and tfoot cells (th's)
    const makeHeadCells = (isFoot = false) => {
      return fields.map((field, colIndex) => {
        let ariaLabel = ''
        if (!(field.label.trim()) && !field.headerTitle) {
          // In case field's label and title are empty/balnk
          // We need to add a hint about what the column is about for non-dighted users
          ariaLabel = _startCase(field.key)
        }
        const ariaLabelSorting = field.sortable
          ? this.localSortDesc && this.localSortBy === field.key
            ? this.labelSortAsc
            : this.labelSortDesc
          : null
        // Assemble the aria-label
        ariaLabel = [ariaLabel, ariaLabelSorting].filter(a => a).join(': ') || null
        const ariaSort = field.sortable && this.localSortBy === field.key
          ? (this.localSortDesc ? 'descending' : 'ascending')
          : null
        const data = {
          key: field.key,
          class: this.fieldClasses(field),
          style: field.thStyle || {},
          attrs: {
            tabindex: field.sortable ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel,
            'aria-sort': ariaSort
          },
          on: {
            click: evt => {
              evt.stopPropagation()
              evt.preventDefault()
              this.headClicked(evt, field)
            },
            keydown: evt => {
              const keyCode = evt.keyCode
              if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                evt.stopPropagation()
                evt.preventDefault()
                this.headClicked(evt, field)
              }
            }
          }
        }
        let slot =
          isFoot && $scoped[`FOOT_${field.key}`]
            ? $scoped[`FOOT_${field.key}`]
            : $scoped[`HEAD_${field.key}`]
        if (slot) {
          slot = [slot({ label: field.label, column: field.key, field: field })]
        } else {
          data.domProps = { innerHTML: stripScripts(field.label) }
        }
        return h('th', data, slot)
      })
    }

    // Build the thead
    let thead = h(false)
    if (this.isStacked !== true) {
      // If in always stacked mode (this.isStacked === true), then we don't bother rendering the thead
      thead = h('thead', { key: 'thead', class: this.headClasses }, [
        h('tr', { class: this.theadTrClass }, makeHeadCells(false))
      ])
    }

    // Build the tfoot
    let tfoot = h(false)
    if (this.footClone && this.isStacked !== true) {
      // If in always stacked mode (this.isStacked === true), then we don't bother rendering the tfoot
      tfoot = h('tfoot', { key: 'tfoot', class: this.footClasses }, [
        h('tr', { class: this.tfootTrClass }, makeHeadCells(true))
      ])
    }

    // Prepare the tbody rows
    const rows = []

    // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
    // If in always stacked mode, we don't bother rendering the row
    if ($scoped['top-row'] && this.isStacked !== true) {
      rows.push(
        h(
          'tr',
          {
            key: 'top-row',
            staticClass: 'b-table-top-row',
            class: [typeof this.tbodyTrClass === 'function' ? this.tbodyTrClass(null, 'row-top') : this.tbodyTrClass]
          },
          [$scoped['top-row']({ columns: fields.length, fields: fields })]
        )
      )
    } else {
      rows.push(h(false))
    }

    // Add the item data rows
    items.forEach((item, rowIndex) => {
      const detailsSlot = $scoped['row-details']
      const rowShowDetails = Boolean(item._showDetails && detailsSlot)
      // Details ID needed for aria-describedby when details showing
      const detailsId = rowShowDetails
        ? this.safeId(`_details_${rowIndex}_`)
        : null
      const toggleDetailsFn = () => {
        if (detailsSlot) {
          this.$set(item, '_showDetails', !item._showDetails)
        }
      }
      // For each item data field in row
      const tds = fields.map((field, colIndex) => {
        const formatted = this.getFormattedValue(item, field)
        const data = {
          key: `row-${rowIndex}-cell-${colIndex}`,
          class: this.tdClasses(field, item),
          attrs: this.tdAttrs(field, item, colIndex),
          domProps: {}
        }
        let childNodes
        if ($scoped[field.key]) {
          childNodes = [
            $scoped[field.key]({
              item: item,
              index: rowIndex,
              field: field,
              unformatted: _get(item, field.key, ''),
              value: formatted,
              toggleDetails: toggleDetailsFn,
              detailsShowing: Boolean(item._showDetails)
            })
          ]
          if (this.isStacked) {
            // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
            childNodes = [h('div', {}, [childNodes])]
          }
        } else {
          if (this.isStacked) {
            // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
            childNodes = [h('div', formatted)]
          } else {
            // Non stacked
            childNodes = formatted
          }
        }
        // Render either a td or th cell
        return h(field.isRowHeader ? 'th' : 'td', data, childNodes)
      })
      // Calculate the row number in the dataset (indexed from 1)
      let ariaRowIndex = null
      if (this.currentPage && this.perPage && this.perPage > 0) {
        ariaRowIndex = String((this.currentPage - 1) * this.perPage + rowIndex + 1)
      }
      // Assemble and add the row
      rows.push(
        h(
          'tr',
          {
            key: `row-${rowIndex}`,
            class: [
              this.rowClasses(item),
              { 'b-table-has-details': rowShowDetails }
            ],
            attrs: {
              'aria-describedby': detailsId,
              'aria-owns': detailsId,
              'aria-rowindex': ariaRowIndex,
              role: this.isStacked ? 'row' : null
            },
            on: {
              click: evt => { this.rowClicked(evt, item, rowIndex) },
              contextmenu: evt => { this.rowContextmenu(evt, item, rowIndex) },
              dblclick: evt => { this.rowDblClicked(evt, item, rowIndex) },
              mouseenter: evt => { this.rowHovered(evt, item, rowIndex) },
              mouseleave: evt => { this.rowUnhovered(evt, item, rowIndex) }
            }
          },
          tds
        )
      )
      // Row Details slot
      if (rowShowDetails) {
        const tdAttrs = { colspan: String(fields.length) }
        const trAttrs = { id: detailsId }
        if (this.isStacked) {
          tdAttrs['role'] = 'cell'
          trAttrs['role'] = 'row'
        }
        const details = h('td', { attrs: tdAttrs }, [
          detailsSlot({
            item: item,
            index: rowIndex,
            fields: fields,
            toggleDetails: toggleDetailsFn
          })
        ])
        rows.push(
          h(
            'tr',
            {
              key: `details-${rowIndex}`,
              staticClass: 'b-table-details',
              class: [typeof this.tbodyTrClass === 'function' ? this.tbodyTrClass(item, 'row-details') : this.tbodyTrClass],
              attrs: trAttrs
            },
            [details]
          )
        )
      } else if (detailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        rows.push(h(false))
      }
    })

    // Empty Items / Empty Filtered Row slot
    if (this.showEmpty && (!items || items.length === 0)) {
      let empty = this.isFiltered ? $slots['emptyfiltered'] : $slots['empty']
      if (!empty) {
        empty = h('div', {
          class: ['text-center', 'my-2'],
          domProps: { innerHTML: stripScripts(this.isFiltered ? this.emptyFilteredText : this.emptyText) }
        })
      }
      empty = h(
        'td',
        {
          attrs: {
            colspan: String(fields.length),
            role: this.isStacked ? 'cell' : null
          }
        },
        [h('div', { attrs: { role: 'alert', 'aria-live': 'polite' } }, [empty])]
      )
      rows.push(
        h(
          'tr',
          {
            key: 'empty-row',
            staticClass: 'b-table-empty-row',
            class: [typeof this.tbodyTrClass === 'function' ? this.tbodyTrClass(null, 'row-empty') : this.tbodyTrClass],
            attrs: this.isStacked ? { role: 'row' } : {}
          },
          [empty]
        )
      )
    } else {
      rows.push(h(false))
    }

    // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
    // If in always stacked mode, we don't bother rendering the row
    if ($scoped['bottom-row'] && this.isStacked !== true) {
      rows.push(
        h(
          'tr',
          {
            key: 'bottom-row',
            staticClass: 'b-table-bottom-row',
            class: [typeof this.tbodyTrClass === 'function' ? this.tbodyTrClass(null, 'row-bottom') : this.tbodyTrClass]
          },
          [$scoped['bottom-row']({ columns: fields.length, fields: fields })]
        )
      )
    } else {
      rows.push(h(false))
    }

    // Assemble the rows into the tbody
    const tbody = h(
      'tbody',
      { class: this.bodyClasses, attrs: this.isStacked ? { role: 'rowgroup' } : {} },
      rows
    )

    // Assemble table
    const table = h(
      'table',
      {
        key: 'b-table',
        staticClass: 'table b-table',
        class: this.tableClasses,
        attrs: {
          ...this.$attrs,
          id: this.safeId(),
          role: this.isStacked ? 'table' : null,
          'aria-describedby': captionId,
          'aria-busy': this.computedBusy ? 'true' : 'false',
          'aria-colcount': String(fields.length),
          // Only set aria-rowcount if provided in $attrs or if localItems > shown items
          'aria-rowcount': this.$attrs['aria-rowcount'] ||
            (this.filteredItems.length > items.length) ? String(this.filteredItems.length) : null
        }
      },
      [caption, colgroup, thead, tfoot, tbody]
    )

    // Add responsive wrapper if needed and return table
    return this.isResponsive
      ? h('div', { key: 'b-table-responsive', class: this.responsiveClass }, [table])
      : table
  },
  props: {
    items: {
      type: [Array, Function],
      default () {
        return []
      }
    },
    fields: {
      type: [Object, Array],
      default: null
    },
    sortBy: {
      type: String,
      default: null
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc',
      validator: direction => arrayIncludes(['asc', 'desc', 'last'], direction)
    },
    caption: {
      type: String,
      default: null
    },
    captionTop: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default () {
        if (this && typeof this.inverse === 'boolean') {
          // Deprecate inverse
          warn(
            "b-table: prop 'inverse' has been deprecated. Use 'dark' instead"
          )
          return this.dark
        }
        return false
      }
    },
    inverse: {
      // Deprecated in v1.0.0 in favor of `dark`
      type: Boolean,
      default: null
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    footClone: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: [Boolean, String],
      default: false
    },
    headVariant: {
      type: String,
      default: ''
    },
    footVariant: {
      type: String,
      default: ''
    },
    theadClass: {
      type: [String, Array],
      default: null
    },
    theadTrClass: {
      type: [String, Array],
      default: null
    },
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTrClass: {
      type: [String, Array, Function],
      default: null
    },
    tfootClass: {
      type: [String, Array],
      default: null
    },
    tfootTrClass: {
      type: [String, Array],
      default: null
    },
    perPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    filter: {
      type: [String, RegExp, Object, Array, Function],
      default: null
    },
    filterFunction: {
      type: Function,
      default: null
    },
    sortCompare: {
      type: Function,
      default: null
    },
    noLocalSorting: {
      type: Boolean,
      default: false
    },
    noProviderPaging: {
      type: Boolean,
      default: false
    },
    noProviderSorting: {
      type: Boolean,
      default: false
    },
    noProviderFiltering: {
      type: Boolean,
      default: false
    },
    noSortReset: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    value: {
      // v-model for retreiving the current displayed rows
      type: Array,
      default () {
        return []
      }
    },
    labelSortAsc: {
      type: String,
      default: 'Click to sort Ascending'
    },
    labelSortDesc: {
      type: String,
      default: 'Click to sort Descending'
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'There are no records to show'
    },
    emptyFilteredText: {
      type: String,
      default: 'There are no records matching your request'
    },
    apiUrl: {
      // Passthrough prop. Passed to the context object. Not used by b-table directly
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localSortBy: this.sortBy || '',
      localSortDesc: this.sortDesc || false,
      localBusy: false,
      // Our local copy of the items. Must be an array
      localItems: isArray(this.items) ? this.items : [],
      // Flag for displaying which empty slot to show, and for some event triggering.
      isFiltered: false
    }
  },
  mounted () {
    this.localSortBy = this.sortBy
    this.localSortDesc = this.sortDesc
    if (this.hasProvider && (!this.localItems || this.localItems.length === 0)) {
      // Fetch on mount if localItems is empty
      this._providerUpdate()
    }
    // Listen for global messages to tell us to force refresh the table
    this.listenOnRoot('bv::refresh::table', id => {
      if (id === this.id || id === this) {
        this.refresh()
      }
    })
  },
  watch: {
    // Watch props for changes and update local values
    items (newItems) {
      if (this.hasProvider || newItems instanceof Function) {
        this.$nextTick(this._providerUpdate)
      } else if (isArray(newItems)) {
        // Set localItems/filteredItems to a copy of the provided array
        this.localItems = newItems.slice()
      } else {
        this.localItems = []
      }
    },
    sortDesc (newVal, oldVal) {
      if (newVal === this.localSortDesc) {
        return
      }
      this.localSortDesc = newVal || false
    },
    sortBy (newVal, oldVal) {
      if (newVal === this.localSortBy) {
        return
      }
      this.localSortBy = newVal || null
    },
    // Update .sync props
    localSortDesc (newVal, oldVal) {
      // Emit update to sort-desc.sync
      if (newVal !== oldVal) {
        this.$emit('update:sortDesc', newVal)
      }
    },
    localSortBy (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:sortBy', newVal)
      }
    },
    localBusy (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:busy', newVal)
      }
    },
    // Watch for changes to the filter criteria and filtered items vs localItems).
    // And set visual state and emit events as required
    filteredCheck ({filteredItems, localItems, localFilter}) {
      // Determine if the dataset is filtered or not
      let isFiltered
      if (!localFilter) {
        // If filter criteria is falsey
        isFiltered = false
      } else if (looseEqual(localFilter, []) || looseEqual(localFilter, {})) {
        // If filter criteria is an empty array or object
        isFiltered = false
      } else if (localFilter) {
        // if Filter criteria is truthy
        isFiltered = true
      } else {
        isFiltered = false
      }
      if (isFiltered) {
        this.$emit('filtered', filteredItems, filteredItems.length)
      }
      this.isFiltered = isFiltered
    },
    isFiltered (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        // We need to emit a filtered event if isFiltered transitions from true to
        // false so that users can update their pagination controls.
        this.$emit('filtered', this.localItems, this.localItems.length)
      }
    },
    context (newVal, oldVal) {
      // Emit context info for enternal paging/filtering/sorting handling
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context-changed', newVal)
      }
    },
    // Provider update triggering
    providerTriggerContext (newVal, oldVal) {
      // Trigger the provider to update as the relevant context values have changed.
      if (!looseEqual(newVal, oldVal)) {
        this.$nextTick(this._providerUpdate)
      }
    }
  },
  computed: {
    // Layout related computed props
    isStacked () {
      return this.stacked === '' ? true : this.stacked
    },
    isResponsive () {
      const responsive = this.responsive === '' ? true : this.responsive
      return this.isStacked ? false : responsive
    },
    responsiveClass () {
      return this.isResponsive === true
        ? 'table-responsive'
        : this.isResponsive ? `table-responsive-${this.responsive}` : ''
    },
    tableClasses () {
      return {
        'table-striped': this.striped,
        'table-hover': this.hover,
        'table-dark': this.dark,
        'table-bordered': this.bordered,
        'table-sm': this.small,
        'border': this.outlined,
        // The following are b-table custom styles
        'b-table-fixed': this.fixed,
        'b-table-stacked': this.stacked === true || this.stacked === '',
        [`b-table-stacked-${this.stacked}`]: this.stacked !== true && this.stacked
      }
    },
    headClasses () {
      return [
        this.headVariant ? 'thead-' + this.headVariant : '',
        this.theadClass
      ]
    },
    bodyClasses () {
      return [this.tbodyClass]
    },
    footClasses () {
      const variant = this.footVariant || this.headVariant || null
      return [variant ? 'thead-' + variant : '', this.tfootClass]
    },
    captionStyles () {
      // Move caption to top
      return this.captionTop ? { captionSide: 'top' } : {}
    },
    // Items related computed props
    hasProvider () {
      return this.items instanceof Function
    },
    localFiltering () {
      return this.hasProvider ? !!this.noProviderFiltering : true
    },
    localSorting () {
      return this.hasProvider ? !!this.noProviderSorting : !this.noLocalSorting
    },
    localPaging () {
      return this.hasProvider ? !!this.noProviderPaging : true
    },
    context () {
      // Current state of sorting, filtering and pagination props/values
      return {
        filter: this.localFilter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        perPage: this.perPage,
        currentPage: this.currentPage,
        apiUrl: this.apiUrl
      }
    },
    providerTriggerContext () {
      // Used to trigger the provider function via a watcher. Only the fields that
      // are needed for triggering a provider update are included. Note that the
      // regular this.context is sent to the provider during fetches though, as they
      // may neeed all the prop info.
      const ctx = {
        apiUrl: this.apiUrl
      }
      if (!this.noProviderFiltering) {
        // Either a string, or could be an object or array.
        ctx.filter = this.localFilter
      }
      if (!this.noProviderSorting) {
        ctx.sortBy = this.localSortBy
        ctx.sortDesc = this.localSortDesc
      }
      if (!this.noProviderPaging) {
        ctx.perPage = this.perPage
        ctx.currentPage = this.currentPage
      }
      return ctx
    },
    computedBusy () {
      return this.busy || this.localBusy
    },
    computedFields () {
      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      let fields = []
      if (isArray(this.fields)) {
        // Normalize array Form
        this.fields.filter(f => f).forEach(f => {
          if (typeof f === 'string') {
            fields.push({ key: f, label: _startCase(f) })
          } else if (
            typeof f === 'object' &&
            f.key &&
            typeof f.key === 'string'
          ) {
            // Full object definition. We use assign so that we don't mutate the original
            fields.push(assign({}, f))
          } else if (typeof f === 'object' && keys(f).length === 1) {
            // Shortcut object (i.e. { 'foo_bar': 'This is Foo Bar' }
            const key = keys(f)[0]
            const field = processField(key, f[key])
            if (field) {
              fields.push(field)
            }
          }
        })
      } else if (
        this.fields &&
        typeof this.fields === 'object' &&
        keys(this.fields).length > 0
      ) {
        // Normalize object Form
        keys(this.fields).forEach(key => {
          let field = processField(key, this.fields[key])
          if (field) {
            fields.push(field)
          }
        })
      }
      // If no field provided, take a sample from first record (if exits)
      if (fields.length === 0 && this.localItems.length > 0) {
        const sample = this.localItems[0]
        keys(sample).forEach(k => {
          if (!IGNORED_FIELD_KEYS[k]) {
            fields.push({ key: k, label: _startCase(k) })
          }
        })
      }
      // Ensure we have a unique array of fields and that they have String labels
      const memo = {}
      return fields.filter(f => {
        if (!memo[f.key]) {
          memo[f.key] = true
          f.label = typeof f.label === 'string' ? f.label : _startCase(f.key)
          return true
        }
        return false
      })
    },
    filteredCheck () {
      // For watching changes to filteredItems vs localItems
      return {
        filteredItems: this.filteredItems,
        localItems: this.localItems,
        localFilter: this.localFilter
      }
    },
    localFilter () {
      // Returns a sanitized/normalized version of filter prop
      if (typeof this.filter === 'function') {
        // this.localFilterFn will contain the correct function ref.
        // Deprecate setting prop filter to a function
        return ''
      } else if ((typeof this.filterFunction !== 'function') &&
        !(typeof this.filter === 'string' || this.filter instanceof RegExp)) {
        // Using internal filter function, which only acccepts string or regexp at the moment
        return ''
      } else {
        // Could be astring, object or array, as needed by external filter function
        return this.filter
      }
    },
    localFilterFn () {
      let filter = this.filter
      let filterFn = this.filterFunction
      // Sanitized/normalize filter-function prop
      if (typeof filterFn === 'function') {
        return filterFn
      } else if (typeof filter === 'function') {
        // Deprecate setting prop filter to a function
        return filter
      } else {
        // no filterFunction, so signal to use internal filter function
        return null
      }
    },
    filteredItems () {
      // Returns the records in localItems that match the filter criteria.
      // Returns the original localItems array if not sorting
      let items = this.localItems || []
      const criteria = this.localFilter
      const filterFn =
        this.filterFnFactory(this.localFilterFn, criteria) ||
        this.defaultFilterFnFactory(criteria)

      // We only do local filtering if requested, and if the are records to filter and
      // if a filter criteria was specified
      if (this.localFiltering && filterFn && items.length > 0) {
        items = items.filter(filterFn)
      }
      return items
    },
    sortedItems () {
      // Sorts the filtered items and returns a new array of the sorted items
      // or the original items array if not sorted.
      let items = this.filteredItems || []
      const sortBy = this.localSortBy
      const sortDesc = this.localSortDesc
      const sortCompare = this.sortCompare
      const localSorting = this.localSorting
      if (sortBy && localSorting) {
        // stableSort returns a new arary, and leaves the original array intact
        return stableSort(items, (a, b) => {
          let result = null
          if (typeof sortCompare === 'function') {
            // Call user provided sortCompare routine
            result = sortCompare(a, b, sortBy, sortDesc)
          }
          if (result === null || result === undefined || result === false) {
            // Fallback to built-in defaultSortCompare if sortCompare not defined or returns null/false
            result = defaultSortCompare(a, b, sortBy)
          }
          // Negate result if sorting in descending order
          return (result || 0) * (sortDesc ? -1 : 1)
        })
      }
      return items
    },
    paginatedItems () {
      let items = this.sortedItems || []
      const currentPage = Math.max(parseInt(this.currentPage, 10) || 1, 1)
      const perPage = Math.max(parseInt(this.perPage, 10) || 0, 0)
      // Apply local pagination
      if (this.localPaging && !!perPage) {
        // Grab the current page of data (which may be past filtered items limit)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage)
      }
      // update the v-model view
      this.$emit('input', items)
      // Return the items to display in the table
      return items
    },
    computedItems () {
      return this.paginatedItems || []
    }
  },
  methods: {
    // Methods for computing classes, attributes and styles for table cells
    fieldClasses (field) {
      return [
        field.sortable ? 'sorting' : '',
        field.sortable && this.localSortBy === field.key
          ? 'sorting_' + (this.localSortDesc ? 'desc' : 'asc')
          : '',
        field.variant ? 'table-' + field.variant : '',
        field.class ? field.class : '',
        field.thClass ? field.thClass : ''
      ]
    },
    tdClasses (field, item) {
      let cellVariant = ''
      if (item._cellVariants && item._cellVariants[field.key]) {
        cellVariant = `${this.dark ? 'bg' : 'table'}-${
          item._cellVariants[field.key]
        }`
      }
      return [
        field.variant && !cellVariant
          ? `${this.dark ? 'bg' : 'table'}-${field.variant}`
          : '',
        cellVariant,
        field.class ? field.class : '',
        this.getTdValues(item, field.key, field.tdClass, '')
      ]
    },
    tdAttrs (field, item, colIndex) {
      let attrs = {}
      attrs['aria-colindex'] = String(colIndex + 1)
      if (this.isStacked) {
        // Generate the "header cell" label content in stacked mode
        attrs['data-label'] = field.label
        if (field.isRowHeader) {
          attrs['role'] = 'rowheader'
        } else {
          attrs['role'] = 'cell'
        }
      }
      return assign({}, attrs, this.getTdValues(item, field.key, field.tdAttr, {}))
    },
    rowClasses (item) {
      return [
        item._rowVariant
          ? `${this.dark ? 'bg' : 'table'}-${item._rowVariant}`
          : '',
        typeof this.tbodyTrClass === 'function' ? this.tbodyTrClass(item, 'row') : this.tbodyTrClass
      ]
    },
    getTdValues (item, key, tdValue, defValue) {
      const parent = this.$parent
      if (tdValue) {
        const value = _get(item, key, '')
        if (typeof tdValue === 'function') {
          return tdValue(value, key, item)
        } else if (typeof tdValue === 'string' && typeof parent[tdValue] === 'function') {
          return parent[tdValue](value, key, item)
        }
        return tdValue
      }
      return defValue
    },
    // Method to get the value for a field
    getFormattedValue (item, field) {
      const key = field.key
      const formatter = field.formatter
      const parent = this.$parent
      let value = _get(item, key, null)
      if (formatter) {
        if (typeof formatter === 'function') {
          value = formatter(value, key, item)
        } else if (
          typeof formatter === 'string' &&
          typeof parent[formatter] === 'function'
        ) {
          value = parent[formatter](value, key, item)
        }
      }
      return (value === null || typeof value === 'undefined') ? '' : value
    },
    // Filter Function factories
    filterFnFactory (filterFn, criteria) {
      // Wrapper factory for external filter functions.
      // Wrap the provided filter-function and return a new function.
      // returns null if no filter-function defined or if criteria is falsey.
      // Rather than directly grabbing this.computedLocalFilterFn or this.filterFunction
      // We have it passed, so that the caller computed prop will be reactive to changes
      // in the original filter-function (as this routine is a method)
      if (!filterFn || !criteria || typeof filterFn !== 'function') {
        return null
      }

      // Build the wrapped filter test function, passing the criteria to the provided function
      const fn = (item) => {
        // Generated function returns true if the crieria matches part of the serialzed data, otherwise false
        return filterFn(item, criteria)
      }

      // return the wrapped function
      return fn
    },
    defaultFilterFnFactory (criteria) {
      // Generates the default filter function, using the given flter criteria
      if (!criteria || !(typeof criteria === 'string' || criteria instanceof RegExp)) {
        // Bult in filter can only support strings or RegExp criteria (at the moment)
        return null
      }

      // Build the regexp needed for filtering
      let regexp = criteria
      if (typeof regexp === 'string') {
        // Escape special RegExp characters in the string and convert contiguous
        // whitespace to \s+ matches
        const pattern = criteria
          .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
          .replace(/[\s\uFEFF\xA0]+/g, '\\s+')
        // Build the RegExp (no need for global flag, as we only need to find the value once in the string)
        regexp = new RegExp(`.*${pattern}.*`, 'i')
      }

      // Generate the wrapped filter test function to use
      const fn = (item) => {
        // This searches all row values (and sub property values) in the entire (excluding
        // special _ prefixed keys), because we convert the record to a space-separated
        // string containing all the value properties (recursively), even ones that are
        // not visible (not specified in this.fields).
        //
        // TODO: enable searching on formatted fields and scoped slots
        // TODO: should we filter only on visible fields (i.e. ones in this.fields) by default?
        // TODO: allow for searching on specific fields/key, this could be combined with the previous TODO
        // TODO: give recToString extra options for filtering (i.e. passing the fields definition
        //      and a reference to $scopedSlots)
        //
        // Generated function returns true if the crieria matches part of the serialzed data, otherwise false
        // We set lastIndex = 0 on regex in case someone uses the /g global flag
        regexp.lastIndex = 0
        return regexp.test(recToString(item))
      }

      // Return the generated function
      return fn
    },
    // Event handlers
    rowClicked (e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      this.$emit('row-clicked', item, index, e)
    },
    rowDblClicked (e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      this.$emit('row-dblclicked', item, index, e)
    },
    rowHovered (e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      this.$emit('row-hovered', item, index, e)
    },
    rowUnhovered (e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      this.$emit('row-unhovered', item, index, e)
    },
    rowContextmenu (e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      this.$emit('row-contextmenu', item, index, e)
    },
    headClicked (e, field) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      }
      let sortChanged = false
      const toggleLocalSortDesc = () => {
        const sortDirection = field.sortDirection || this.sortDirection
        if (sortDirection === 'asc') {
          this.localSortDesc = false
        } else if (sortDirection === 'desc') {
          this.localSortDesc = true
        }
      }
      if (field.sortable) {
        if (field.key === this.localSortBy) {
          // Change sorting direction on current column
          this.localSortDesc = !this.localSortDesc
        } else {
          // Start sorting this column ascending
          this.localSortBy = field.key
          toggleLocalSortDesc()
        }
        sortChanged = true
      } else if (this.localSortBy && !this.noSortReset) {
        this.localSortBy = null
        toggleLocalSortDesc()
        sortChanged = true
      }
      this.$emit('head-clicked', field.key, field, e)
      if (sortChanged) {
        // Sorting parameters changed
        this.$emit('sort-changed', this.context)
      }
    },
    stopIfBusy (evt) {
      if (this.computedBusy) {
        // If table is busy (via provider) then don't propagate
        evt.preventDefault()
        evt.stopPropagation()
        return true
      }
      return false
    },
    // Exposed method(s)
    refresh () {
      // Expose refresh method
      if (this.computedBusy) {
        // Can't force an update when busy
        return false
      }
      if (this.hasProvider) {
        this.$nextTick(this._providerUpdate)
      } else {
        this.localItems = isArray(this.items) ? this.items.slice() : []
      }
      return true
    },
    // Provider related methods
    _providerSetLocal (items) {
      this.localItems = isArray(items) ? items.slice() : []
      this.localBusy = false
      this.$emit('refreshed')
      // New root emit
      if (this.id) {
        this.emitOnRoot('bv::table::refreshed', this.id)
      }
    },
    _providerUpdate () {
      // Refresh the provider function items.
      // TODO: this method should be debounced with lodash.debounce to minimize network requests,
      // with a 100ms default debounce period (i.e. 100ms holdtime after the last update before
      // the new update is called). Debounce period should be a prop
      if (this.computedBusy || !this.hasProvider) {
        // Don't refresh remote data if we are 'busy' or if no provider
        return
      }
      // Set internal busy state
      this.localBusy = true

      // Call provider function with context and optional callback after DOM is fully updated
      this.$nextTick(function () {
        try {
          // Call provider function passing it the context and optional callback
          const data = this.items(this.context, this._providerSetLocal)
          if (data && data.then && typeof data.then === 'function') {
            // Provider returned Promise
            data.then(items => {
              // Provider resolved with items
              this._providerSetLocal(items)
            })
          } else if (isArray(data)) {
            // Provider returned Array data
            this._providerSetLocal(data)
          } else if (this.items.length !== 2) {
            // Check number of arguments provider function requested
            // Provider not using callback (didn't request second argument), so we clear
            // busy state as most likely there was an error in the provider function
            warn('b-table provider function didn\'t request calback and did not return a promise or data')
            this.localBusy = false
          }
        } catch (e) {
          // Provider function borked on us, so we spew out a warning
          // console.error(`b-table provider function error [${e.name}]: ${e.message}`, e.stack)
          // and clear the busy state
          this.localBusy = false
        }
      })
    }
  }
}
