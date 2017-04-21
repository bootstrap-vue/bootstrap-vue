<template>
    <div :class="classObject">
        <slot name="left">
            <b-input-group-addon v-if="left" v-html="left"></b-input-group-addon>
        </slot>
        <slot></slot>
        <slot name="right">
            <b-input-group-addon v-if="right" v-html="right"></b-input-group-addon>
        </slot>
    </div>
</template>

<script>
    import bInputGroupAddon from './input-group-addon.vue';

    export default {
        components: {bInputGroupAddon},
        computed: {
            classObject() {
                return [
                    'input-group',
                    this.size ? ('input-group-' + this.size) : '',
                    this.state ? ('has-' + this.state) : ''
                ];
            }
        },
        props: {
            size: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            },
            left: {
                type: String,
                default: null
            },
            right: {
                type: String,
                default: null
            }
        }
    };
</script>
