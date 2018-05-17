import idMixin from '../../mixins/id'

export default {
  mixins: [idMixin],
  render (h) {
    let content = h(false)
    if (this.localActive || !this.computedLazy) {
      content = h(
        this.tag,
        {
          ref: 'panel',
          class: this.tabClasses,
          directives: [{ name: 'show', value: this.localActive }],
          attrs: {
            role: 'tabpanel',
            id: this.safeId(),
            'aria-hidden': this.localActive ? 'false' : 'true',
            'aria-expanded': this.localActive ? 'true' : 'false',
            'aria-lablelledby': this.controlledBy || null
          }
        },
        [this.$slots.default]
      )
    }
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
  },
  methods: {
    beforeEnter () {
      // change opacity 1 frame after display
      // otherwise css transition won't happen
      window.requestAnimationFrame(() => { this.show = true })
    },
    beforeLeave () {
      this.show = false
    }
  },
  data () {
    return {
      localActive: this.active && !this.disabled,
      show: false
    }
  },
  mounted () {
    this.show = this.localActive
  },
  computed: {
    tabClasses () {
      return [
        'tab-pane',
        this.$parent && this.$parent.card && !this.noBody ? 'card-body' : '',
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
      return this.$parent.fade
    },
    computedLazy () {
      return this.$parent.lazy
    },
    _isTab () {
      // For parent sniffing of child
      return true
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
      // Sniffed by tabs.vue and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.vue and added to nav 'a.nav-link'
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
      type: String,
      default: '#'
    }
  }
}
