<template>
    <div :class="classObject" role="group">
        <slot name="left">
            <div v-if="left" class="input-group-addon" v-html="left"></div>
        </slot>

        <slot></slot>

        <slot name="right">
            <div v-if="right" class="input-group-addon" v-html="right"></div>
        </slot>
    </div>
</template>

<script>
    export default {
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
