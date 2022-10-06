import { extend } from '../../../vue'
import { EVENT_NAME_HEAD_CLICKED } from '../../../constants/events'
import { CODE_ENTER, CODE_SPACE } from '../../../constants/key-codes'
import { PROP_TYPE_ARRAY_OBJECT_STRING, PROP_TYPE_STRING } from '../../../constants/props'
import { SLOT_NAME_THEAD_TOP } from '../../../constants/slots'
import { stopEvent } from '../../../utils/events'
import { htmlOrText } from '../../../utils/html'
import { identity } from '../../../utils/identity'
import { isUndefinedOrNull } from '../../../utils/inspect'
import { noop } from '../../../utils/noop'
import { makeProp } from '../../../utils/props'
import { safeVueInstance } from '../../../utils/safe-vue-instance'
import { startCase } from '../../../utils/string'
import { BThead } from '../thead'
import { BTfoot } from '../tfoot'
import { BTr } from '../tr'
import { BTh } from '../th'
import { filterEvent } from './filter-event'
import { textSelectionActive } from './text-selection-active'

// --- Helper methods ---

const getHeadSlotName = value => `head(${value || ''})`

const getFootSlotName = value => `foot(${value || ''})`

// --- Props ---

export const props = {
  // Any Bootstrap theme variant (or custom)
  headRowVariant: makeProp(PROP_TYPE_STRING),
  // 'light', 'dark' or `null` (or custom)
  headVariant: makeProp(PROP_TYPE_STRING),
  theadClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
  theadTrClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING)
}

// --- Mixin ---

// @vue/component
export const theadMixin = extend({
  props,
  methods: {
    fieldClasses(field) {
      // Header field (<th>) classes
      return [field.class ? field.class : '', field.thClass ? field.thClass : '']
    },
    headClicked(event, field, isFoot) {
      if (this.stopIfBusy && this.stopIfBusy(event)) {
        // If table is busy (via provider) then don't propagate
        return
      } else if (filterEvent(event)) {
        // Clicked on a non-disabled control so ignore
        return
      } else if (textSelectionActive(this.$el)) {
        // User is selecting text, so ignore
        /* istanbul ignore next: JSDOM doesn't support getSelection() */
        return
      }
      stopEvent(event)
      this.$emit(EVENT_NAME_HEAD_CLICKED, field.key, field, event, isFoot)
    },
    renderThead(isFoot = false) {
      const {
        computedFields: fields,
        isSortable,
        isSelectable,
        headVariant,
        footVariant,
        headRowVariant,
        footRowVariant
      } = safeVueInstance(this)
      const h = this.$createElement

      // In always stacked mode, we don't bother rendering the head/foot
      // Or if no field headings (empty table)
      if (this.isStackedAlways || fields.length === 0) {
        return h()
      }

      const hasHeadClickListener = isSortable || this.hasListener(EVENT_NAME_HEAD_CLICKED)

      // Reference to `selectAllRows` and `clearSelected()`, if table is selectable
      const selectAllRows = isSelectable ? this.selectAllRows : noop
      const clearSelected = isSelectable ? this.clearSelected : noop

      // Helper function to generate a field <th> cell
      const makeCell = (field, colIndex) => {
        const { label, labelHtml, variant, stickyColumn, key } = field

        let ariaLabel = null
        if (!field.label.trim() && !field.headerTitle) {
          // In case field's label and title are empty/blank
          // We need to add a hint about what the column is about for non-sighted users
          /* istanbul ignore next */
          ariaLabel = startCase(field.key)
        }

        const on = {}
        if (hasHeadClickListener) {
          on.click = event => {
            this.headClicked(event, field, isFoot)
          }
          on.keydown = event => {
            const keyCode = event.keyCode
            if (keyCode === CODE_ENTER || keyCode === CODE_SPACE) {
              this.headClicked(event, field, isFoot)
            }
          }
        }

        const sortAttrs = isSortable ? this.sortTheadThAttrs(key, field, isFoot) : {}
        const sortClass = isSortable ? this.sortTheadThClasses(key, field, isFoot) : null
        const sortLabel = isSortable ? this.sortTheadThLabel(key, field, isFoot) : null

        const data = {
          class: [
            {
              // We need to make the header cell relative when we have
              // a `.sr-only` sort label to work around overflow issues
              'position-relative': sortLabel
            },
            this.fieldClasses(field),
            sortClass
          ],
          props: { variant, stickyColumn },
          style: field.thStyle || {},
          attrs: {
            // We only add a `tabindex` of `0` if there is a head-clicked listener
            // and the current field is sortable
            tabindex: hasHeadClickListener && field.sortable ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            'aria-colindex': colIndex + 1,
            'aria-label': ariaLabel,
            ...this.getThValues(null, key, field.thAttr, isFoot ? 'foot' : 'head', {}),
            ...sortAttrs
          },
          on,
          key
        }

        // Handle edge case where in-document templates are used with new
        // `v-slot:name` syntax where the browser lower-cases the v-slot's
        // name (attributes become lower cased when parsed by the browser)
        // We have replaced the square bracket syntax with round brackets
        // to prevent confusion with dynamic slot names
        let slotNames = [
          getHeadSlotName(key),
          getHeadSlotName(key.toLowerCase()),
          getHeadSlotName()
        ]
        // Footer will fallback to header slot names
        if (isFoot) {
          slotNames = [
            getFootSlotName(key),
            getFootSlotName(key.toLowerCase()),
            getFootSlotName(),
            ...slotNames
          ]
        }

        const scope = {
          label,
          column: key,
          field,
          isFoot,
          // Add in row select methods
          selectAllRows,
          clearSelected
        }

        const $content =
          this.normalizeSlot(slotNames, scope) ||
          h('div', { domProps: htmlOrText(labelHtml, label) })

        const $srLabel = sortLabel ? h('span', { staticClass: 'sr-only' }, ` (${sortLabel})`) : null

        // Return the header cell
        return h(BTh, data, [$content, $srLabel].filter(identity))
      }

      // Generate the array of <th> cells
      const $cells = fields.map(makeCell).filter(identity)

      // Generate the row(s)
      const $trs = []
      if (isFoot) {
        $trs.push(
          h(
            BTr,
            {
              class: this.tfootTrClass,
              props: {
                variant: isUndefinedOrNull(footRowVariant)
                  ? headRowVariant
                  : /* istanbul ignore next */ footRowVariant
              }
            },
            $cells
          )
        )
      } else {
        const scope = {
          columns: fields.length,
          fields,
          // Add in row select methods
          selectAllRows,
          clearSelected
        }
        $trs.push(this.normalizeSlot(SLOT_NAME_THEAD_TOP, scope) || h())

        $trs.push(
          h(
            BTr,
            {
              class: this.theadTrClass,
              props: { variant: headRowVariant }
            },
            $cells
          )
        )
      }

      return h(
        isFoot ? BTfoot : BThead,
        {
          class: (isFoot ? this.tfootClass : this.theadClass) || null,
          props: isFoot
            ? { footVariant: footVariant || headVariant || null }
            : { headVariant: headVariant || null },
          key: isFoot ? 'bv-tfoot' : 'bv-thead'
        },
        $trs
      )
    }
  }
})
