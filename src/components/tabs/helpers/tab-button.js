import Vue from '../../../utils/vue'
import KeyCodes from '../../../utils/key-codes'
import BLink from '../../link/link'

// --- BTabButton Private Component ---

// @vue/component
export default Vue.extend({
  name: 'BTabButton',
  inject: {
    bvTabs: {
      default() /* istanbul ignore next */ {
        return {
          noKeyNav: true
        }
      }
    }
  },
  props: {
    // Reference to the child <b-tab> instance
    tab: { default: null },
    active: { default: false },
    posInSet: { type: Number, default: null },
    setSize: { type: Number, default: null }
  },
  computed: {
    noKeyNav() {
      return this.bvTabs.noKeyNav
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(active) {
        if (this.tab) {
          this.tab.localActive = active
        }
      }
    }
  },
  mounted() {
    // When tab updates, we may need to update the button slot
    this.tab && this.tab.$on('hook:updated', this.updateButton)
  },
  beforeDestroy() {
    this.tab && this.tab.$off('hook:updated', this.updateButton)
  },
  methods: {
    updateButton() {
      // Update the button content if the tab has a title slot
      const tab = this.tab
      if (tab && (tab.$slots.title || tab.$scopedSlots.title)) {
        this.$forceUpdate()
      }
    },
    focus() {
      const $refs = this.$refs
      if ($refs && $refs.link && $refs.link.focus) {
        $refs.link.focus()
      }
    },
    handleEvt(evt) {
      function stop() {
        evt.preventDefault()
        evt.stopPropagation()
      }
      if (this.tab.disabled) {
        /* istanbul ignore next */
        return
      }
      const type = evt.type
      const key = evt.keyCode
      const shift = evt.shiftKey
      if (type === 'click') {
        stop()
        this.$emit('click', evt)
      } else if (type === 'keydown' && !this.noKeyNav && key === KeyCodes.SPACE) {
        // In keynav mode, SPACE press will also trigger a click/select
        stop()
        this.$emit('click', evt)
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if (key === KeyCodes.UP || key === KeyCodes.LEFT || key === KeyCodes.HOME) {
          stop()
          if (shift || key === KeyCodes.HOME) {
            this.$emit('first', evt)
          } else {
            this.$emit('prev', evt)
          }
        } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT || key === KeyCodes.END) {
          stop()
          if (shift || key === KeyCodes.END) {
            this.$emit('last', evt)
          } else {
            this.$emit('next', evt)
          }
        }
      }
    }
  },
  render(h) {
    const tab = this.tab
    const bvTabs = this.bvTabs

    // Create the a.nav-link
    const $link = h(
      BLink,
      {
        ref: 'link',
        staticClass: 'nav-link',
        class: [
          {
            // active: this.active,
            active: tab.localActive && !tab.disabled,
            disabled: tab.disabled
          },
          tab.titleLinkClass,
          // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
          // this.active ? bvTabs.activeNavItemClass : null
          tab.localActive ? bvTabs.activeNavItemClass : null
        ],
        props: {
          href: tab.href, // To be deprecated to always be '#'
          disabled: tab.disabled
        },
        attrs: {
          id: tab.safeId(`_BV_tab_button_`),
          role: 'tab',
          // Roving tab index when keynav enabled
          tabindex: this.noKeyNav || tab.active ? null : '-1',
          // 'aria-selected': this.active ? 'true' : 'false',
          'aria-controls': tab.safeId(),
          'aria-selected': tab.localActive && !tab.disabled ? 'true' : 'false',
          'aria-setsize': this.setSize,
          'aria-posinset': this.posInSet
          // 'aria-disabled' is set by BLink
        },
        on: {
          click: this.handleEvt,
          keydown: this.handleEvt
        }
      },
      [tab.normalizeSlot('title', {}) || tab.title]
    )

    // return wrapped in a li.nav-item
    return h(
      'li',
      {
        staticClass: 'nav-item',
        class: [tab.titleItemClass],
        attrs: { role: 'presentation' }
      },
      [$link]
    )
  }
})
