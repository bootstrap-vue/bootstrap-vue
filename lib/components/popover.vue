<template>
    <!--
      Container for possible title and content.
     -->
    <div v-show="false" class="d-none">
        <div ref="title"><slot name="title"></slot></div>
        <div ref="content"><slot></slot></slot>
    </div>
</template>

<script>
    import PopOver from '../classes/popover';
    import { keys } from '../utils/object';
    import { isArray } from '../utils/array';
    
    const selfClosingTagsRE = /^(img|br|hr|wbr|source)$/i;
    const forbiddenTagsRE = /^(object|embed|input|button|textarea|select|iframe|script|link|command|area|base)$/i;

    export default {
        data() {
            popOver: null
        },
        props: {
            targetId: {
                // ID of element to place popover on
                // must be in DOM
                type: String,
                default: null,
                required: true
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
            }
        },
        mounted() {
            if (this.targetId) {
                const el = document.body.querySelector(`#${this.targetId}`);
                if (el && !this.popOver) {
                    // We pass the title & content as part of the config
                    this.popOver = new PopOver(el, this.getConfig(), this.$root);
                    this.$on('close', this.onClose);
                }
            }
        },
        updated() {
            // If content changes, etc
            if (this.popOver) {
                this.popOver.updateConfig(getConfig());
            }
        },
        destroyed() {
            if (this.popOver) {
                // Bring our tuff back if necessary
                this.$el.appendChild(this.$refs.title);
                this.$el.appendChild(this.$refs.content);
                // Destroy the popover
                this.popOver.destroy();
                this.popOver = null;
            }
            this.$off('close', this.onClose);
        },
        computed: {
            baseConfig() {
                return {
                    title: this.title.trim() || '',
                    content: this.content.trim() || '',
                    placement: this.placement || 'top',
                    delay: this.delay || 0,
                    offset: this.offset || 0,
                    triggers: isArray(this.triggers) ? this.triggers.join(' ') : this.triggers
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
                return cfg;
          }
        }
    };
</script>
