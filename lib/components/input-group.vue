<template>
    <component :is="tag" :id="id || null" :class="classObject" role="group">
        <slot name="left">
            <b-input-group-addon v-if="left"
                                 :id="id ? `${id}_BV_addon_left_` : null"
                                 v-html="left"
            ></b-input-group-addon>
        </slot>

        <slot></slot>

        <slot name="right">
            <b-input-group-addon v-if="right"
                                 :id="id ? `${id}_BV_addon_right_` : null"
                                 v-html="right"
            ></b-input-group-addon>
        </slot>
    </component>
</template>

<script>
    import bInputGroupAddon from './input-group-addon';

    export default {
        components: { bInputGroupAddon },
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
            id: {
                type: String,
                defualt: null
            },
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
            },
            tag: {
                type: String,
                default: 'div'
            }
        }
    };
</script>
