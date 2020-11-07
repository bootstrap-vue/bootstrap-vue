import { NAME_TABLE } from '../../../constants/components'
import { makePropsConfigurable } from '../../../utils/config'
import { htmlOrText } from '../../../utils/html'
import { isFunction } from '../../../utils/inspect'
import { BTr } from '../tr'
import { BTd } from '../td'

export default {
  props: makePropsConfigurable(
    {
      showEmpty: {
        type: Boolean,
        default: false
      },
      emptyText: {
        type: String,
        default: 'There are no records to show'
      },
      emptyHtml: {
        type: String
      },
      emptyFilteredText: {
        type: String,
        default: 'There are no records matching your request'
      },
      emptyFilteredHtml: {
        type: String
      }
    },
    NAME_TABLE
  ),
  methods: {
    renderEmpty() {
      const h = this.$createElement
      const items = this.computedItems

      let $empty = h()
      if (
        this.showEmpty &&
        (!items || items.length === 0) &&
        !(this.computedBusy && this.hasNormalizedSlot('table-busy'))
      ) {
        const {
          isFiltered,
          emptyText,
          emptyHtml,
          emptyFilteredText,
          emptyFilteredHtml,
          computedFields,
          tbodyTrClass,
          tbodyTrAttr
        } = this

        $empty = this.normalizeSlot(this.isFiltered ? 'emptyfiltered' : 'empty', {
          emptyFilteredHtml,
          emptyFilteredText,
          emptyHtml,
          emptyText,
          fields: computedFields,
          // Not sure why this is included, as it will always be an empty array
          items: this.computedItems
        })

        if (!$empty) {
          $empty = h('div', {
            class: ['text-center', 'my-2'],
            domProps: isFiltered
              ? htmlOrText(emptyFilteredHtml, emptyFilteredText)
              : htmlOrText(emptyHtml, emptyText)
          })
        }

        $empty = h(BTd, { props: { colspan: computedFields.length || null } }, [
          h('div', { attrs: { role: 'alert', 'aria-live': 'polite' } }, [$empty])
        ])

        $empty = h(
          BTr,
          {
            staticClass: 'b-table-empty-row',
            class: [
              isFunction(tbodyTrClass)
                ? /* istanbul ignore next */ this.tbodyTrClass(null, 'row-empty')
                : tbodyTrClass
            ],
            attrs: isFunction(tbodyTrAttr)
              ? /* istanbul ignore next */ this.tbodyTrAttr(null, 'row-empty')
              : tbodyTrAttr,
            key: isFiltered ? 'b-empty-filtered-row' : 'b-empty-row'
          },
          [$empty]
        )
      }

      return $empty
    }
  }
}
