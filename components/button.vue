<template>
    <button :class="classObject"
            @click.stop="onclick"
            :href="href || to"
            :is="componentType"
            :to="to || href"
            :exact="exact"
            :target="target"
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
                default: 'primary'
            },
            to: {
                type: [String, Object]
            },
            href: {
                type: String
            },
            exact: {
                type: Boolean,
                default: false
            },
            target: {
                type: String
            }
        },
        methods: {
            onclick() {
                this.$emit('click', this.to);
                if (this.$router && this.to) {
                    this.$router.push(this.to);
                }
            }
        }
    };
</script>
