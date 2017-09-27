/*
 * Tooltip/Popover component mixin
 * Common props
 */
import { isArray } from '../utils/array';
import { assign } from '../utils/object';
import { isElement, getById } from '../utils/dom';
import { observeDom } from '../utils';

const PLACEMENTS = {
    top: 'top',
    topleft: 'topleft',
    topright: 'topright',
    right: 'right',
    righttop: 'righttop',
    rightbottom: 'rightbottom',
    bottom: 'bottom',
    bottomleft: 'bottomleft',
    bottomright: 'bottomright',
    left: 'left',
    lefttop: 'lefttop',
    leftbottom: 'leftbottom',
    auto: 'auto'
};

const OBSERVER_CONFIG = {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'style']
};

export default {
    props: {
        target: {
            // String ID of element, or element/component reference
            type: [String, Object]
        },
        delay: {
            type: Number,
            default: 0
        },
        offset: {
            type: [Number, String],
            default: 0
        },
        noFade: {
            type: Boolean,
            default: false
        },
        container: {
            // String ID of container, if null body is used (default)
            type: String,
            default: null
        }
    },
    created() {
        // Create non-reactive property
        this._toolpop = null;
        this._obs_title = null;
        this._obs_content = null;
    },
    mounted() {
        // We do this in a $nextTick in hopes that the target element is in the DOM
        // And that our children have rendered
        this.$nextTick(() => {
            // Instantiate ToolTip/PopOver on target
            // createToolpop method must exist in main component
            if (this.createToolpop()) {
                // Listen to close signals from others
                this.$on('close', this.onClose);
                // Observe content Child changes so we can notify popper of possible size change
                this.setObservers(true);
            }
        });
    },
    updated() {
        // If content/props changes, etc
        if (this._toolpop) {
            this._toolpop.updateConfig(this.getConfig());
        }
    },
    activated() {
        // Called when component is inside a <keep-alive> and component brought offline
        this.setObservers(true);
    },
    deactivated() {
        // Called when component is inside a <keep-alive> and component taken offline
        if (this._toolpop) {
            this.setObservers(false);
            this._toolpop.hide();
        }
    },
    beforeDestroy() {
        this.$off('close', this.onClose);
        this.setObservers(false);
        if (this._toolpop) {
            this._toolpop.destroy();
            this._toolpop = null;
        }
        // bring our content back if needed
        this.bringItBack();
    },
    computed: {
        baseConfig() {
            const cont = this.container;
            return {
                // Title prop
                title: (this.title || '').trim() || '',
                // Contnt prop (if popover)
                content: (this.content || '').trim() || '',
                // Tooltip/Popover placement
                placement: PLACEMENTS[this.placement] || 'auto',
                // Container curently needs to be an ID with '#' prepended, if null then body is used
                container: cont ? (/^#/.test(cont) ? cont : `#${cont}`) : false,
                // Show/Hide delay
                delay: parseInt(this.delay, 10) || 0,
                // Offset can be css distance. if no units, pixels are assumed
                offset: this.offset || 0,
                // Disable fade Animation?
                animation: !Boolean(this.noFade),
                // Open/Close Trigger(s)
                trigger: isArray(this.triggers) ? this.triggers.join(' ') : this.triggers,
                // Callbacks so we can trigger events on component
                callbacks: {
                    show: this.onShow,
                    shown: this.onShown,
                    hide: this.onHide,
                    hidden: this.onHidden
                }
            };
        }
    },
    methods: {
        getConfig() {
            const cfg = assign({}, this.baseConfig);
            if (this.$refs.title && this.$refs.title.innerHTML.trim()) {
                // If slot has content, it overrides 'title' prop
                // We use the DOM node as content to allow components!
                cfg.title = this.$refs.title;
                cfg.html = true;
            }
            if (this.$refs.content && this.$refs.content.innerHTML.trim()) {
                // If slot has content, it overrides 'content' prop
                // We use the DOM node as content to allow components!
                cfg.content = this.$refs.content;
                cfg.html = true;
            }
            return cfg;
        },
        onClose(callback) {
            if (this._toolpop) {
                this._toolpop.hide(callback);
            } else if (typeof callback === 'function') {
                callback();
            }
        },
        updatePosition() {
            if (this._toolpop) {
                // Instruct popper to reposition popover if necessary
                this._toolpop.update();
            }
        },
        getTarget() {
            const target = this.target;
            if (typeof target === 'string') {
                // Assume ID of element
                return getById(target);
            } else if (typeof target === 'object' && isElement(target.$el)) {
                // Component reference
                return target.$el;
            } else if (typeof target === 'object' && isElement(target)) {
                // Element reference
                return target;
            }
            return null;
        },
        onShow(evt) {
            this.$emit('show', evt);
        },
        onShown(evt) {
            this.setObservers(true);
            this.$emit('shown', evt);
        },
        onHide(evt) {
            this.$emit('hide', evt)
        },
        onHidden(evt) {
            this.setObservers(false);
            // bring our content back if needed to keep Vue happy
            // Tooltip class will move it back to tip when shown again
            this.bringItBack();
            this.$emit('hidden', evt);
        },
        bringItBack() {
            // bring our content back if needed to keep Vue happy
            if (this.$el && this.$refs.title) {
                this.$el.appendChild(this.$refs.title);
            }
            if (this.$el && this.$refs.content) {
                this.$el.appendChild(this.$refs.content);
            }
        },
        setObservers(on) {
            if (on) {
                if (this.$refs.title) {
                    this._obs_title = observeDom(this.$refs.title, this.updatePosition.bind(this), OBSERVER_CONFIG);
                }
                if (this.$refs.content) {
                    this._obs_content = observeDom(this.$refs.content, this.updatePosition.bind(this), OBSERVER_CONFIG);
                }
            } else {
                if (this._obs_title) {
                    this._obs_title.disconnect();
                    this._obs_title = null;
                }
                if (this._obs_content) {
                    this._obs_content.disconnect();
                    this._obs_content = null;
                }
            }
        }
    }
};
