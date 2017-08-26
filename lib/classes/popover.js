import ToolTip from './tooltip';
import { assign } from '../utils/object';

const NAME = 'v-b-popover';
const CLASS_PREFIX = 'bs-popover';
const BSCLS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g');

const Defaults = assign({}, ToolTip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' +
              '<div class="arrow"></div>' +
              '<h3 class="popover-header"></h3>' +
              '<div class="popover-body"></div></div>'
});

const ClassName = {
    FADE: 'fade',
    SHOW: 'show'
};

const Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
};

class PopOver extends ToolTip {

    // Getter overrides

    static get Default() {
        return Defaults;
    };

    static get NAME() {
        return NAME;
    };

    // Method overrides

    isWithContent() {
        return this.getTitle() || this.getContent();
    };

    addAttachmentClass(attachment) {
        this.getTipElement().classList.add(`${CLASS_PREFIX}-${attachment}`);
    };

    setContent(tip) {
        // we use append for html objects to maintain js events
        this.setElementContent(tip.querySelector(Selector.TITLE), this.getTitle());
        this.setElementContent(tip.querySelector(Selector.CONTENT), this.getContent());

        tip.classList.remove(ClassName.FADE);
        tip.classList.remove(ClassName.SHOW);
    };

    // This method may look identical to ToolTip version, but it uses a different RegEx defined above
    cleanTipClass() {
        const tip = this.getTipElement();
        const tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
            tabClass.forEach(cls => {
                tip.classList.remove(cls);
            });
        }
    };

    getTitle() {
        let title = this.$config.title || '';
        if (typeof title === 'function') {
            title = title.call(this.$element).toString().trim();
        }
        if (typeof title === 'object' && title.nodeType && !title.innerHTML.trim()) {
            // We have a dom node, but without inner content, so just return an empty string
            title = '';
        }
        if (!title) {
            // Try and grab elements title attribute
            title = this.$element.getAttribute('title') || this.$element.getAttribute('data-original-title') || '';
            title = title.trim();
        }
        return title;
    };

    // New methods

    getContent() {
        let content = this.$config.content || '';
        if (typeof content === 'function') {
            content = content.call(this.$element).toString.trim();
        }
        if (typeof content === 'object' && content.nodeType && !content.innerHTML.trim()) {
            // We have a dom node, but without inner content, so just return an empty string
            content = '';
        }
        return content;
    };

};

export default PopOver;
