<template>
    <!--
      Container for possible title and content.
     -->
    <div v-show="false" class="d-none" aria-hidden="true">
        <div ref="title"><slot name="title"></slot></div>
        <div ref="content"><slot></slot></div>
    </div>
</template>

<script>
    import PopOver from '../classes/popover';
    import { isArray } from '../utils/array';
    import { assign } from '../utils/object';
    import { warn } from '../utils';
    import observeDom from '../utils/observe-dom';

    export default {
        data() {
            return {
                popOver: null
            }
        },
        props: {
            target: {
                // ID of element to place popover on
                // Or a reference to an emlement or component
                type: [String, Object],
                default() {
                    if (this.targetId) {
                        warn("b-popover: Prop 'target-id' is deprecated. Please use 'target' instead");
                        return this.targetId;
                    }
                    return null
                }
            },
            targetId: {
                // ID of element to place popover on
                // Must be in DOM
                type: String,
                default: null
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            triggers: {
                type: [String, Array],
                default: 'click'
            },
            placement: {
                type: String,
                default: 'right'
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
            }
        },
        mounted() {
            if (this.targetId) {
                let target = this.target;
                let el = null;
                this.$nextTick(() => {
                    if (typeof target === 'string') {
                        // Assume ID of element
                        el = document.getElementById(/^#/.test(target) ? target.slice(1) : target);
                    } else if (typeof target === 'object' && target.$el) {
                        // Component referece
                        el = target.$el;
                    } else if (typeof target === 'object' && target.tagName) {
                        // Element reference
                        el = target;
                    }
                    if (el && !this.popOver) {
                        // We pass the title & content as part of the config
                        this.popOver = new PopOver(el, this.getConfig(), this.$root);
                        // Listen to close signals from others
                        this.$on('close', this.onClose);
                        // Observe content Child changes so we can notify popper of possible size change
                        observeDom(this.$refs.content, this.updatePosition.bind(this), {
                            subtree: true,
                            childList: true,
                            attributes: true,
                            attributeFilter: ['class', 'style']
                        });
                    } else {
                        warn("b-popover: 'target' element not found!");
                    }
                });
            }
        },
        updated() {
            // If content changes, etc
            if (this.popOver) {
                this.popOver.updateConfig(this.getConfig());
            }
        },
        beforeDestroyed() {
            if (this.popOver) {
                // Destroy the popover
                this.popOver.destroy();
                this.popOver = null;
                // Bring our stuff back if necessary
                this.bringItBack();
            }
            this.$off('close', this.onClose);
        },
        computed: {
            baseConfig() {
                return {
                    title: this.title.trim() || '',
                    content: this.content.trim() || '',
                    placement: this.placement || 'top',
                    delay: parseInt(this.delay, 10) || 0,
                    // offset can be a css distance string. if no units provided then pixels are assumed
                    offset: this.offset || 0,
                    animation: Boolean(this.noFade),
                    trigger: isArray(this.triggers) ? this.triggers.join(' ') : this.triggers
                };
            }
        },
        methods: {
            onClose(callback) {
                if (this.popOver) {
                    this.popOver.hide(callback);
                } else if (typeof callback === 'function') {
                    callback();
                }
            },
            updatePosition() {
                if (this.popOver) {
                    // Instruct popper to reposition popover if necessary
                    this.popOver.update();
                }
            },
            getConfig() {
                const cfg = assign({}, this.baseConfig);
                if (this.$refs.title.innerHTML.trim()) {
                    // We pass the DOM element to preserve components
                    cfg.title = this.$refs.title;
                    cfg.html = true;
                }
                if (this.$refs.content.innerHTML.trim()) {
                    // We pass the DOM element to preserve components
                    cfg.content = this.$refs.content;
                    cfg.html = true;
                }
                cfg.callbacks = {
                    show: this.onShow,
                    shown: this.onShown,
                    hide: this.onHide,
                    hidden: this.onHidden
                };
                return cfg;
            },
            onShow(evt) {
                this.$emit('show', evt);
            },
            onShown(evt) {
                this.$emit('shown', evt);
            },
            onHide(evt) {
                this.$emit('hide', evt);
            },
            onHidden(evt) {
                // bring our content back if needed to keep Vue happy
                // Tooltip class will move it back to $tip when shown again
                this.bringItBack();
                this.$emit('hidden', evt);
            },
            bringItBack() {
                if (this.$el) {
                    if (this.$refs.title) {
                        this.$el.appendChild(this.$refs.title);
                    }
                    if (this.$refs.content) {
                        this.$el.appendChild(this.$refs.content);
                    }
                }
            }
        }
    };
</script>
