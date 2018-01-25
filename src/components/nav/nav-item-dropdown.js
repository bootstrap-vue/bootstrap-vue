import idMixin from '../../mixins/id'
import dropdownMixin from '../../mixins/dropdown'

export default {
  mixins: [idMixin, dropdownMixin],
  render (h) {
    const t = this
    const button = h(
      'a',
      {
        class: t.toggleClasses,
        ref: 'toggle',
        attrs: {
          href: '#',
          id: t.safeId('_BV_button_'),
          disabled: t.disabled,
          'aria-haspopup': 'true',
          'aria-expanded': t.visible ? 'true' : 'false'
        },
        on: {
          click: t.toggle,
          keydown: t.toggle // space, enter, down
        }
      },
      [
        t.$slots['button-content'] ||
          t.$slots.text ||
          h('span', { domProps: { innerHTML: t.text } })
      ]
    )
    const menu = h(
      'div',
      {
        class: t.menuClasses,
        ref: 'menu',
        attrs: { 'aria-labelledby': t.safeId('_BV_button_') },
        on: {
          mouseover: t.onMouseOver,
          keydown: t.onKeydown // tab, up, down, esc
        }
      },
      [this.$slots.default]
    )
    return h('li', { attrs: { id: t.safeId() }, class: t.dropdownClasses }, [
      button,
      menu
    ])
  },
  computed: {
    isNav () {
      // Signal to dropdown mixin that we are in a navbar
      return true
    },
    dropdownClasses () {
      return [
        'nav-item',
        'b-nav-dropdown',
        'dropdown',
        this.dropup ? 'dropup' : '',
        this.visible ? 'show' : ''
      ]
    },
    toggleClasses () {
      return [
        'nav-link',
        this.noCaret ? '' : 'dropdown-toggle',
        this.disabled ? 'disabled' : '',
        this.extraToggleClasses ? this.extraToggleClasses : ''
      ]
    },
    menuClasses () {
      return [
        'dropdown-menu',
        this.right ? 'dropdown-menu-right' : 'dropdown-menu-left',
        this.visible ? 'show' : ''
      ]
    }
  },
  props: {
    noCaret: {
      type: Boolean,
      default: false
    },
    extraToggleClasses: {
      // Extra Toggle classes
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'menu'
    }
  }
}
