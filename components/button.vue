<template>
    <button :class="classObject"

            @click.stop.prevent="click"

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
            classObject(){
                return [
                    'btn',
                    this.btnVariant,
                    this.btnSize,
                    this.btnBlock,
                    this.btnDisabled,
                    this.inactive ? 'btn-inactive' : ''
                ];
            },
            componentType(){
                return this.to ? 'router-link' : 'a';
            },
            btnBlock() {
                return this.block ? `btn-block` : '';
            },
            btnVariant() {
                return !this.variant ? `btn-secondary` : `btn-${this.variant}`
            },
            btnSize() {
                return !this.size ? '' : `btn-${this.size}`
            },
            btnDisabled() {
                return this.disabled ? 'disabled' : ''
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
            link: {
                type: String,
                default: ''
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
                default: '',
            },
            exact: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            click: function () {
                this.$emit('click', this.link);
                if (this.$router && this.to && this.to.length) {
                    this.$router.push(this.to);
                }
            },
        },
    }
</script>
