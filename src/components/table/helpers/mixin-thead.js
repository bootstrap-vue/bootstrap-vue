import KeyCodes from '../../../utils/key-codes'
import startCase from '../../../utils/startcase'
import { getComponentConfig } from '../../../utils/config'
import { htmlOrText } from '../../../utils/html'
import filterEvent from './filter-event'
import textSelectionActive from './text-selection-active'

export default {
  props: {
    headVariant: {
      type: String,
      default: () => getComponentConfig('BTable', 'headVariant')
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
    headClicked(evt, field, isFoot) {
      if (this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return
      } else if (filterEvent(evt)) {
        // clicked on a non-disabled control so ignore
        return
      } else if (textSelectionActive(this.$el)) {
        // User is selecting text, so ignore
        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return
      }
      evt.stopPropagation()
      evt.preventDefault()
      this.$emit('head-clicked', field.key, field, evt, isFoot)
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
        let ariaLabel = null
        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users
          /* istanbul ignore next */
          ariaLabel = startCase(field.key)
        }
        const hasHeadClickListener = this.$listeners['head-clicked'] || this.isSortable
        const handlers = {}
        if (hasHeadClickListener) {
          handlers.click = evt => {
            this.headClicked(evt, field, isFoot)
          }
          handlers.keydown = evt => {
            const keyCode = evt.keyCode
            if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
              this.headClicked(evt, field, isFoot)
            }
          }
        }
        const data = {
          key: field.key,
          class: [this.fieldClasses(field), this.sortTheadThClasses(field.key, field, isFoot)],
          style: field.thStyle || {},
          attrs: {
            // We only add a tabindex of 0 if there is a head-clicked listener
            tabindex: hasHeadClickListener ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            role: 'columnheader',
            scope: 'col',
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel,
            ...this.sortTheadThAttrs(field.key, field, isFoot)
          },
          on: handlers
        }
        let fieldScope = { label: field.label, column: field.key, field: field }
        let slot =
          isFoot && this.hasNormalizedSlot(`FOOT_${field.key}`)
            ? this.normalizeSlot(`FOOT_${field.key}`, fieldScope)
            : this.normalizeSlot(`HEAD_${field.key}`, fieldScope)
        if (!slot) {
          data.domProps = htmlOrText(field.labelHtml)
        }
        return h('th', data, slot || field.label)
      }

      // Generate the array of TH cells
      const $cells = fields.map(makeCell).filter(th => th)

      // Genrate the row(s)
      const $trs = []
      if (isFoot) {
        $trs.push(h('tr', { class: this.tfootTrClass, attrs: { role: 'row' } }, $cells))
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
