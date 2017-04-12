<template>
    <div class="media">
        <div :class="['d-flex','mr-3',verticalAlignClass]"  v-if="!rightAlign">
            <slot name="aside"></slot>
        </div>
        <div class="media-body">
            <slot></slot>
        </div>
        <div :class="['d-flex','ml-3',verticalAlignClass]" v-if="rightAlign">
            <slot name="aside"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            verticalAlignClass() {
                return `align-self-${this.verticalAlign}`;
            }
        },
        props: {
            rightAlign: {
                type: Boolean,
                default: false
            },
            verticalAlign: {
                type: String,
                default: 'top'
            }
        }
    };
</script>
