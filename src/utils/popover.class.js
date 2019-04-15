import ToolTip from './tooltip.class'
import { select, addClass, removeClass, getAttr } from './dom'
import { isFunction, isNull, isObject, isString } from './inspect'

const NAME = 'popover'
const CLASS_PREFIX = 'bs-popover'
const BS_CLASS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g')

const Defaults = {
  ...ToolTip.Default,
  placement: 'right',
  trigger: 'click',
  content: '',
  template:
    '<div class="popover" role="tooltip">' +
    '<div class="arrow"></div>' +
    '<h3 class="popover-header"></h3>' +
    '<div class="popover-body"></div></div>'
}

const ClassName = {
  FADE: 'fade',
  SHOW: 'show'
}

const Selector = {
  TITLE: '.popover-header',
  CONTENT: '.popover-body'
}

class PopOver extends ToolTip {
  // --- Getter overrides ---

  static get Default() {
    return Defaults
  }

  static get NAME() {
    return NAME
  }

  // --- Method overrides ---

  isWithContent(tip) {
    tip = tip || this.$tip
    if (!tip) {
      /* istanbul ignore next */
      return false
    }
    const hasTitle = Boolean((select(Selector.TITLE, tip) || {}).innerHTML)
    const hasContent = Boolean((select(Selector.CONTENT, tip) || {}).innerHTML)
    return hasTitle || hasContent
  }

  addAttachmentClass(attachment) /* istanbul ignore next */ {
    addClass(this.getTipElement(), `${CLASS_PREFIX}-${attachment}`)
  }

  setContent(tip) {
    // we use append for html objects to maintain js events/components
    this.setElementContent(select(Selector.TITLE, tip), this.getTitle())
    this.setElementContent(select(Selector.CONTENT, tip), this.getContent())

    removeClass(tip, ClassName.FADE)
    removeClass(tip, ClassName.SHOW)
  }

  // This method may look identical to ToolTip version, but it uses a different RegEx defined above
  cleanTipClass() /* istanbul ignore next */ {
    const tip = this.getTipElement()
    const tabClass = tip.className.match(BS_CLASS_PREFIX_REGEX)
    if (!isNull(tabClass) && tabClass.length > 0) {
      tabClass.forEach(cls => {
        removeClass(tip, cls)
      })
    }
  }

  getTitle() {
    let title = this.$config.title || ''
    /* istanbul ignore next */
    if (isFunction(title)) {
      title = title(this.$element)
    }
    /* istanbul ignore next */
    if (isObject(title) && title.nodeType && !title.innerHTML.trim()) {
      // We have a dom node, but without inner content, so just return an empty string
      title = ''
    }
    if (isString(title)) {
      title = title.trim()
    }
    if (!title) {
      // Try and grab element's title attribute
      title = getAttr(this.$element, 'title') || getAttr(this.$element, 'data-original-title') || ''
      title = title.trim()
    }
    return title
  }

  // New methods

  getContent() {
    let content = this.$config.content || ''
    /* istanbul ignore next */
    if (isFunction(content)) {
      content = content(this.$element)
    }
    /* istanbul ignore next */
    if (isObject(content) && content.nodeType && !content.innerHTML.trim()) {
      // We have a dom node, but without inner content, so just return an empty string
      content = ''
    }
    if (isString(content)) {
      content = content.trim()
    }
    return content
  }
}

export default PopOver
