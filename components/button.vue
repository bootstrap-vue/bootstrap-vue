<template>
    <button :class="classObject"
            @click.stop.prevent="click"
            :href="href || to"
            :is="componentType"
            :to="to || href"
            :exact="exact"
    >
        <slot></slot>
    </button>
</template>


<script>
    export default {
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
                return this.href ? (this.$route ? 'router-link' : 'a') : 'button';
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
            role: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'md'
            },
            variant: {
                type: String,
                default: 'secondary'
            },
            to: {
                type: [String, Object],
                default: ''
            },
            href: {
                type: String
            },
            exact: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click() {
                this.$emit('click', this.to);
                if (this.$router && this.to) {
                    this.$router.push(this.to);
                }
            }
        }
    };
</script>
