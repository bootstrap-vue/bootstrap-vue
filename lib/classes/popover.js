import ToolTip from './tooltip';
import { assign } from '../utils/object';

const NAME = 'v-b-popover';
const CLASS_PREFIX = 'bs-popover';
const BSCLS_PREFIX_REGEX = new RegExp(`\\b${CLASS_PREFIX}\\S+`, 'g');

const Defaults = assign({}, ToolTip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">'
            + '<div class="arrow"></div>'
            + '<h3 class="popover-header"></h3>'
            + '<div class="popover-body"></div></div>'
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
        this.getTipElement.classList.add(`${CLASS_PREFIX}-${attachment}`);
    };

    setContent(tip) {
        // we use append for html objects to maintain js events
        this.setElementContent(tip.querySelector(Selector.TITLE), this.getTitle());
        this.setElementContent(tip.querySelector(Selector.CONTENT), this.getContent());

        tip.classList.remove(ClassName.FADE);
        tip.classList.remove(ClassName.SHOW);
    };

    cleanTipClass(tip) {
        const tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
        if (tabClass !== null && tabClass.length > 0) {
            tabClass.forEach(cls => {
                tip.classList.remove(cls.trim());
            });
        }
    };

    // New motheds

    getContent() {
        return typeof this.$config.content === 'function' ?
              this.$config.content.call(this.$element) :
              this.$config.content;
    };

};

export default PopOver;
