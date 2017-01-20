<template>
    <component
            class="nav-item"
            :class="classObject"

            @click.stop.prevent="onclick"

            :is="componentType"
            active-class="active"
            :to="to"
            :exact="exact"
    >
        <slot></slot>
    </component>
</template>

<script>

    export default {
        computed: {
            classObject(){
                return [
                    'nav-link',
                    this.active ? 'active' : '',
                    this.disabled ? 'disabled' : ''
                ];
            },
            componentType(){
                return this.to ? 'router-link' : 'a';
            },
        },
        props: {
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            to: {
                type: String,
                default: '',
            },
            exact: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            onclick: function () {
                this.$emit('click', this.to);
                if (this.$router && this.to && this.to.length) {
                    this.$router.push(this.to);
                }
            }
        }
    }
</script>
