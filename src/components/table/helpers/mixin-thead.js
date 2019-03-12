import startCase from '../../../utils/startcase'
import KeyCodes from '../../../utils/key-codes'
import { htmlOrText } from '../../../utils/html'
import filterEvent from './filter-event'
import textSelectionActive from './text-selection-active'

export default {
  props: {
    headVariant: {
      type: String,
      default: ''
    },
    theadClass: {
      type: [String, Array, Object],
      default: null
    },
    theadTrClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    headClasses() {
      return [this.headVariant ? 'thead-' + this.headVariant : '', this.theadClass]
    }
  },
  methods: {
    fieldClasses(field) {
      // header field (th) classes
      return [
        field.variant ? 'table-' + field.variant : '',
        field.class ? field.class : '',
        field.thClass ? field.thClass : ''
      ]
    },
    headClicked(e, field, isFoot) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return
      } else if (filterEvent(e)) {
        // clicked on a non-disabled control so ignore
        return
      } else if (textSelectionActive(this.$el)) {
        // User is selecting text, so ignore
        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return
      }
      e.stopPropagation()
      e.preventDefault()
      let sortChanged = false
      const toggleLocalSortDesc = () => {
        const sortDirection = field.sortDirection || this.sortDirection
        if (sortDirection === 'asc') {
          this.localSortDesc = false
        } else if (sortDirection === 'desc') {
          this.localSortDesc = true
        }
      }
      if (!(isFoot && this.noFooterSorting)) {
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
      }
      this.$emit('head-clicked', field.key, field, e, isFoot)
      if (sortChanged) {
        // Sorting parameters changed
        this.$emit('sort-changed', this.context)
      }
    },
    renderThead(isFoot = false) {
      const h = this.$createElement

      if (this.isStacked === true) {
        // In always stacked mode, we don't bother rendering the head/foot
        return h(false)
      }

      const fields = this.computedFields || []

      // Helper function to generate a field TH cell
      const makeCell = (field, colIndex) => {
        let ariaLabel = ''
        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users
          /* istanbul ignore next */
          ariaLabel = startCase(field.key)
        }
        const sortable = field.sortable && !(isFoot && this.noFooterSorting)
        const ariaLabelSorting = sortable
          ? this.localSortDesc && this.localSortBy === field.key
            ? this.labelSortAsc
            : this.labelSortDesc
          : null
        // Assemble the aria-label
        ariaLabel = [ariaLabel, ariaLabelSorting].filter(a => a).join(': ') || null
        const ariaSort =
          sortable && this.localSortBy === field.key
            ? this.localSortDesc
              ? 'descending'
              : 'ascending'
            : sortable
              ? 'none'
              : null
        const data = {
          key: field.key,
          class: this.fieldClasses(field),
          style: field.thStyle || {},
          attrs: {
            tabindex: sortable ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            role: 'columnheader',
            scope: 'col',
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel,
            'aria-sort': ariaSort
          },
          on: {
            click: evt => {
              this.headClicked(evt, field, isFoot)
            },
            keydown: evt => {
              const keyCode = evt.keyCode
              if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                this.headClicked(evt, field, isFoot)
              }
            }
          }
        }
        let fieldScope = { label: field.label, column: field.key, field: field }
        let slot =
          isFoot && this.hasNormalizedSlot(`FOOT_${field.key}`)
            ? this.normalizeSlot(`FOOT_${field.key}`, fieldScope)
            : this.normalizeSlot(`HEAD_${field.key}`, fieldScope)
        if (slot) {
          slot = [slot]
        } else {
          data.domProps = htmlOrText(field.labelHtml, field.label)
        }
        return h('th', data, [slot])
      }

      // Generate the array of TH cells
      const $cells = fields.map(makeCell).filter(th => th)

      // Genrate the row(s)
      const $trs = []
      if (isFoot) {
        $trs.push(h('tr', { class: this.tfootTrClass }, $cells))
      } else {
        const scope = {
          columns: fields.length,
          fields: fields
        }
        $trs.push(this.normalizeSlot('thead-top', scope) || h(false))
        $trs.push(h('tr', { class: this.theadTrClass, attrs: { role: 'row' } }, $cells))
      }

      return h(
        isFoot ? 'tfoot' : 'thead',
        {
          key: isFoot ? 'tfoot' : 'thead',
          class: isFoot ? this.footClasses : this.headClasses,
          attrs: { role: 'rowgroup' }
        },
        $trs
      )
    }
  }
}
