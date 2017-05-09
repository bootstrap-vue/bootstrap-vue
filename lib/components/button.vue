<template>
    <button :class="classObject"
            :is="componentType"
            :to="to"
            :href="href"
            @click="onclick"
            :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>

<script>
    import bLink from './link.vue';

    export default {
        components: {bLink},
        computed: {
            classObject() {
                return [
                    'btn',
                    this.btnVariant,
                    this.btnSize,
                    this.btnBlock,
                    this.btnDisabled,
                    this.inactive ? 'btn-inactive' : ''
                ];
            },
            componentType() {
                return (this.href || this.to) ? 'b-link' : 'button';
            },
            btnBlock() {
                return this.block ? `btn-block` : '';
            },
            btnVariant() {
                return this.variant ? `btn-${this.variant}` : `btn-secondary`;
            },
            btnSize() {
                return this.size ? `btn-${this.size}` : '';
            },
            btnDisabled() {
                return this.disabled ? 'disabled' : '';
            }
        },
        props: {
            block: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            inactive: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: null
            },
            variant: {
                type: String,
                default: null
            },
            to: {
                type: [String, Object]
            },
            href: {
                type: String
            }
        },
        methods: {
            onclick(e) {
                if (this.disabled) {
                    e.stopPropagation();
                    e.preventDefault();
                } else {
                    this.$emit('click', e);
                }
            }
        }
    };
</script>
