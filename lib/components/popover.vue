<template>
    <!--
      Container for possible title content.
      We v-if ourselves out of the DOM so we don't interfere with layout
     -->
    <div v-if="false"><slot name="title"></slot><slot></slot></div>
</template>

<script>
    import PopOver from '../classes/popover';
    import { keys } from '../utils/object';
    import { isArray } from '../utils/array';
    
    const selfClosingRE = /^(img|br|hr|wbr|source)$/i;
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
                required: true;
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
            position: {
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
            const el = document.querySeletor(`#${this.targetId}`);
            if (el && !this.popOver) {
                // We pass the title & content as part of the config
                this.popOver = new PopOver(el, this.getConfig(), this.$root);
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
                this.popOver.destroy();
                this.popOver = null
            }
        },
        computed: {
            baseConfig() {
                return {
                    title: this.title.trim() || '',
                    content: this.content.trim() || '',
                    position: this.position || 'top',
                    delay: this.delay || 0,
                    offset: this.offset || 0,
                    triggers: isArray(triggers) ? triggers.join(' ') : triggers
                };
            }
        },
        methods: {
            getConfig() {
                const cfg = assign({}, this.baseConfig);
                if (this.$slots['title']) {
                    // Grab the title from the slot, it any
                    const title = this.getSlotContent(this.$slots['title']);
                    // If slot has content, it overrides 'title' prop
                    if (title.trim()) {
                        cfg.title = title.trim();
                        cfg.html = true;
                    }
                }
                if (this.$slots.default) {
                    // Grab the content from the slot, it any
                    const content = this.getSlotContent(this.$slots.default);
                    // If slot has content, it overrides 'content' prop
                    if (content.trim()) {
                        cfg.content = content.trim();
                        cfg.html = true;
                    }
                }
                return cfg;
            },
            getSlotContent(nodes) {
                // Recursively build HTML content for provided slot
                // We do this because we are v-if'ed out and can't use this.$el.innerHTML
                // Supports only basic HTML, no components!
                nodes = nodes || [];
                let html = '';
                nodes.forEach(node => {
                    if (node.functionalOptions || node.componentOptions) {
                        // Regular components don't render, but functional do, but
                        // since we are recreating HTML, they will not function
                        // as expected, so we skip over both tyeps
                        return;
                    }
                    if (node.text) {
                        // Text Node
                        html += node.text;
                    } else {
                        // HTML element
                        const tag = node.tag;
                        if (forbiddenTagsRE.test(tag)) {
                            // THis is a no-no tag, so we skip it
                            return;
                        }
                        const data = node.data || {};
                        const children = node.children || [];
                        const cls = data.staticClass ? ` class="${data.staticClass}"` : '';
                        let attrs = '';
                        keys(data.attrs || {}).forEach(a => {
                            attrs += ` ${a}="${data.attrs[a]}"`
                        });
                        // Build Opening Tag
                        const tag1 = `<${tag}${cls}${attrs}>`;
                        // Build Closing Tag
                        const tag2 = selfClosingRE.test(tag) ? '' : `</${tag}>`;
                        // Build content, if any (recursive)
                        const content = (children.length > 0) ? this.getSlotContent(children) : '';
                        // Append to HTML string
                        html += `${tag1}${content}${tag2}`;
                    }
                });
                return html;
            }
        }
    };
</sscript>
