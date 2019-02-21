// Type definitions for bootstrap-vue 2.0.0-rc.6
// Project: https://github.com/bootstrap-vue/bootstrap-vue
// Definitions by: Nicola Bosco <https://github.com/nicolabosco87>

declare module 'bootstrap-vue' {
  import Vue, { PluginFunction, PluginObject } from 'vue'

  class BootstrapVue implements PluginObject<{}> {
    [key: string]: any
    public install: PluginFunction<{}>
  }

  const VuePlugin: BootstrapVue

  export default VuePlugin

  // Interfaces
  export interface Alert extends Vue {
    dismiss: () => void
    clearCounter: () => void
    showChanged: () => void
  }

  export interface Badge extends Vue {}
  export interface Breadcrumb extends Vue {}
  export interface Breadcrumb extends Vue {}
  export interface Button extends Vue {}
  export interface ButtonGroup extends Vue {}
  export interface ButtonToolbar extends Vue {
    onFocusin: () => void
    onKeydown: () => void
    setItemFocus: () => void
    focusNext: () => void
    focusFirst: () => void
    focusLast: () => void
    getItems: () => void
  }

  export interface Card extends Vue {}
  export interface Carousel extends Vue {
    setSlide: (slide: number) => void
    prev: () => void
    next: () => void
    pause: () => void
    start: () => void
    restart: () => void
    updateSlides: () => void
    calcDirection: () => void
  }

  export interface Collapse extends Vue {
    toggle: () => void
  }
  export interface Dropdown extends Vue {}
  export interface Embed extends Vue {}
  export interface Form extends Vue {}
  export interface FormCheckbox extends Vue {}
  export interface FormFile extends Vue {
    reset: () => void
  }

  export interface FormGroup extends Vue {}
  export interface FormInput extends Vue {
    focus: () => void
  }
  export interface FormRadio extends Vue {}
  export interface FormSelect extends Vue {}
  export interface FormTextarea extends Vue {
    focus: () => void
  }
  export interface Image extends Vue {}
  export interface InputGroup extends Vue {}
  export interface Jumbotron extends Vue {}
  export interface Layout extends Vue {}
  export interface Link extends Vue {}
  export interface ListGroup extends Vue {}
  export interface Media extends Vue {}

  export interface Modal extends Vue {
    show: () => void
    hide: () => void
    onBeforeEnter: () => void
    onEnter: () => void
    onAfterEnter: () => void
    onBeforeLeave: () => void
    onLeave: () => void
    onAfterLeave: () => void
    emitEvent: () => void
    onClickOut: () => void
    onEsc: () => void
    onFocusout: () => void
    setResizeEvent: () => void
    showHandler: () => void
    hideHandler: () => void
    modalListener: () => void
    focusFirst: () => void
    returnFocusTo: () => void
    getScrollbarWidth: () => void
    adjustDialog: () => void
    resetAdjustments: () => void
    checkScrollbar: () => void
    setScrollbar: () => void
    resetScrollbar: () => void
  }

  export interface Nav extends Vue {}
  export interface Navbar extends Vue {}
  export interface Pagination extends Vue {
    numberOfPages: number
  }
  export interface PaginationNav extends Vue {}
  export interface Popover extends Vue {
    createToolpop: () => void
  }
  export interface Progress extends Vue {}
  export interface Table extends Vue {
    refresh: () => void
  }
  export interface Tabs extends Vue {}
  export interface Tooltip extends Vue {
    createToolpop: () => void
  }
}
