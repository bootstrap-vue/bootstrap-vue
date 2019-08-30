import KeyCodes from '../../../utils/key-codes'
import startCase from '../../../utils/startcase'
import { getComponentConfig } from '../../../utils/config'
import { htmlOrText } from '../../../utils/html'
import filterEvent from './filter-event'
import textSelectionActive from './text-selection-active'
import { BThead } from '../thead'
import { BTfoot } from '../tfoot'
import { BTr } from '../tr'
import { BTh } from '../th'

export default {
  props: {
    headVariant: {
      type: String, // 'light', 'dark' or null (or custom)
      default: () => getComponentConfig('BTable', 'headVariant')
    },
    theadClass: {
      type: [String, Array, Object]
      // default: undefined
    },
    theadTrClass: {
      type: [String, Array, Object]
      // default: undefined
    }
  },
  methods: {
    fieldClasses(field) {
      // Header field (<th>) classes
      return [field.class ? field.class : '', field.thClass ? field.thClass : '']
    },
    headClicked(evt, field, isFoot) {
      if (this.stopIfBusy && this.stopIfBusy(evt)) {
        // If table is busy (via provider) then don't propagate
        return
      } else if (filterEvent(evt)) {
        // Clicked on a non-disabled control so ignore
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
      const fields = this.computedFields || []

      if (this.isStackedAlways || fields.length === 0) {
        // In always stacked mode, we don't bother rendering the head/foot.
        // Or if no field headings (empty table)
        return h()
      }

      // Refernce to `selectAllRows` and `clearSelected()`, if table is Selectable
      const selectAllRows = this.isSelectable ? this.selectAllRows : () => {}
      const clearSelected = this.isSelectable ? this.clearSelected : () => {}

      // Helper function to generate a field <th> cell
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
        const sortAttrs = this.isSortable ? this.sortTheadThAttrs(field.key, field, isFoot) : {}
        const sortClass = this.isSortable ? this.sortTheadThClasses(field.key, field, isFoot) : null
        const data = {
          key: field.key,
          class: [this.fieldClasses(field), sortClass],
          props: {
            variant: field.variant,
            stickyColumn: field.stickyColumn
          },
          style: field.thStyle || {},
          attrs: {
            // We only add a tabindex of 0 if there is a head-clicked listener
            tabindex: hasHeadClickListener ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            'aria-colindex': String(colIndex + 1),
            'aria-label': ariaLabel,
            ...this.getThValues(null, field.key, field.thAttr, isFoot ? 'foot' : 'head', {}),
            ...sortAttrs
          },
          on: handlers
        }
        // Handle edge case where in-document templates are used with new
        // `v-slot:name` syntax where the browser lower-cases the v-slot's
        // name (attributes become lower cased when parsed by the browser)
        // We have replaced the square bracket syntax with round brackets
        // to prevent confusion with dynamic slot names
        let slotNames = [`head(${field.key})`, `head(${field.key.toLowerCase()})`, 'head()']
        if (isFoot) {
          // Footer will fallback to header slot names
          slotNames = [
            `foot(${field.key})`,
            `foot(${field.key.toLowerCase()})`,
            'foot()',
            ...slotNames
          ]
        }
        const hasSlot = this.hasNormalizedSlot(slotNames)
        let slot = field.label
        if (hasSlot) {
          slot = this.normalizeSlot(slotNames, {
            label: field.label,
            column: field.key,
            field,
            isFoot,
            // Add in row select methods
            selectAllRows,
            clearSelected
          })
        } else {
          data.domProps = htmlOrText(field.labelHtml)
        }
        return h(BTh, data, slot)
      }

      // Generate the array of <th> cells
      const $cells = fields.map(makeCell).filter(th => th)

      // Genrate the row(s)
      const $trs = []
      if (isFoot) {
        $trs.push(h(BTr, { class: this.tfootTrClass }, $cells))
      } else {
        const scope = {
          columns: fields.length,
          fields: fields,
          // Add in row select methods
          selectAllRows,
          clearSelected
        }
        $trs.push(this.normalizeSlot('thead-top', scope) || h())
        $trs.push(h(BTr, { class: this.theadTrClass }, $cells))
      }

      return h(
        isFoot ? BTfoot : BThead,
        {
          key: isFoot ? 'bv-tfoot' : 'bv-thead',
          class: (isFoot ? this.tfootClass : this.theadClass) || null,
          props: isFoot
            ? { footVariant: this.footVariant || this.headVariant || null }
            : { headVariant: this.headVariant || null }
        },
        $trs
      )
    }
  }
}
