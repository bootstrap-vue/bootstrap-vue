import { idMixin } from '../../mixins'

export default {
  mixins: [idMixin],
  render (h) {
    const t = this
    let content = h(false)
    if (t.localActive || !this.computedLazy) {
      content = h(
        t.tag,
        {
          ref: 'panel',
          class: t.tabClasses,
          directives: [ { name: 'show', value: t.localActive } ],
          attrs: {
            role: 'tabpanel',
            id: t.safeId(),
            'aria-hidden': t.localActive ? 'false' : 'true',
            'aria-expanded': t.localActive ? 'true' : 'false',
            'aria-lablelledby': t.controlledBy || null
          }
        },
        [ t.$slots.default ]
      )
    }
    return h(
      'transition',
      {
        props: { mode: 'out-in' },
        on: {
          beforeEnter: t.beforeEnter,
          afterEnter: t.afterEnter,
          afterLeave: t.afterLeave
        }
      },
      [ content ]
    )
  },
  methods: {
    beforeEnter () {
      this.show = false
    },
    afterEnter () {
      this.show = true
    },
    afterLeave () {
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
        (this.$parent && this.$parent.card && !this.noBody) ? 'card-body' : '',
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
