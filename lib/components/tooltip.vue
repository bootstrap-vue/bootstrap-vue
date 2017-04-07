<template>
    <div>
        <span ref="trigger"><slot></slot></span>
        <div tabindex="-1" :class="['tooltip','tooltip-' + this.placement]"
             ref="popover" @focus="$emit('focus')" @blur="$emit('blur')"
             :style="{opacity:showState?1:0}"
        >
            <div class="tooltip-inner">
                <slot name="content"><span v-html="content || title"></span></slot>
            </div>
        </div>
    </div>
</template>

<style>
    .tooltip {
        display: block !important;
        transition: all 0.3s;
    }
</style>

<script>
    import bPopover from './popover.vue';

    export default {
        extends: bPopover,
        props: {
            triggers: {
                type: [Boolean, String, Array],
                default: 'hover'
            }
        }
    };
</script>
