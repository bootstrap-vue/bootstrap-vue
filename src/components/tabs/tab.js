import idMixin from '../../mixins/id'

// @vue/component
export default {
  name: 'BTab',
  mixins: [idMixin],
  inject: {
    bTabs: {
      default: function () {
        return {
          // Dont set a tab index if not rendered inside b-tabs
          noKeyNav: true
        }
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.js and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.js and added to nav 'a.nav-link'
      type: [String, Array, Object],
      default: null
    },
    headHtml: {
      // Is this actually ever used?
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    href: {
      // This should be deprecated, as tabs are not navigation (URL) based
      // <b-nav> + <b-card> + <router-view>/<nuxt-child> should be used instead
      // And we dont support router-links here
      type: String,
      default: '#'
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localActive: this.active && !this.disabled,
      show: false
    }
  },
  computed: {
    tabClasses () {
      return [
        this.bTabs.card && !this.noBody ? 'card-body' : '',
        this.show ? 'show' : '',
        this.computedFade ? 'fade' : '',
        this.disabled ? 'disabled' : '',
        this.localActive ? 'active' : ''
      ]
    },
    controlledBy () {
      return this.buttonId || this.safeId('__BV_tab_button__')
    },
    computedFade () {
      return this.bTabs.fade || false
    },
    computedLazy () {
      return this.bTabs.lazy || this.lazy
    },
    _isTab () {
      // For parent sniffing of child
      return true
    }
  },
  mounted () {
    // Initially show on mount if active and not disabled
    this.show = this.localActive
  },
  updated () {
    // Force the tab buton content to update (since slots are not reactive)
    // if (this.bTabs.updateButton) {
    //   this.bTabs.updateButton(this)
    // }
  },
  methods: {
    // Public methods
    activate () {
      if (this.bTabs.activateTab && !this.disabled) {
        return this.bTabs.activateTab(this)
      } else {
        return false
      }
    },
    // Transition handlers
    beforeEnter () {
      // change opacity (add 'show' class) 1 frame after display
      // otherwise css transition won't happen
      // TODO: Move raf method into utils/dom.js
      const raf = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (cb) { setTimeout(cb, 16) }

      raf(() => { this.show = true })
    },
    beforeLeave () {
      // remove the 'show' class
      this.show = false
    }
  },
  render (h) {
    let content = h(
      this.tag,
      {
        ref: 'panel',
        staticClass: 'tab-pane',
        class: this.tabClasses,
        directives: [{ name: 'show', value: this.localActive }],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          tabindex: (this.localActive && !this.bTabs.noKeyNav) ? '0' : null,
          'aria-hidden': this.localActive ? 'false' : 'true',
          'aria-expanded': this.localActive ? 'true' : 'false',
          'aria-labelledby': this.controlledBy || null
        }
      },
      // Render content lazily if requested
      [(this.localActive || !this.computedLazy) ? this.$slots.default : h(false)]
    )
    return h(
      'transition',
      {
        props: { mode: 'out-in' },
        on: {
          beforeEnter: this.beforeEnter,
          beforeLeave: this.beforeLeave
        }
      },
      [content]
    )
  }
}
