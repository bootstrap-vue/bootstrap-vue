<template>
    <div class="d-inline-block">
        <span class="d-inline-block" ref="trigger"><slot></slot></span>
        <div :class="['tooltip','tooltip-' + this.placement]"
             :style="{opacity:showState?1:0}"
             tabindex="-1"
             ref="popover"
             @focus="$emit('focus')"
             @blur="$emit('blur')"
        >
            <div class="tooltip-inner">
                <slot name="content"><span v-html="content"></span></slot>
            </div>
        </div>
    </div>
</template>

<style>
    .tooltip {
        display: block;
        transition: all 0.3s;
    }
</style>

<script>
    import { popoverMixin } from '../mixins';

    export default {
        mixins: [popoverMixin],
        props: {
            content: {
                type: String,
                default: ''
            },
            triggers: {
                type: [Boolean, String, Array],
                default: 'hover'
            }
        }
    };
</script>
