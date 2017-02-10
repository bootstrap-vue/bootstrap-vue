<template>
    <button :class="classObject"
            @click.stop.prevent="click"
            :href="to"
            :is="componentType"
            :to="to"
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
                return this.to ? 'router-link' : 'a';
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
