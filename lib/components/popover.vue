<template>
    <div>
        <span ref="trigger"><slot></slot></span>
        <div :class="['popover', 'fade', classState ? 'show' : '', popoverAlignment]"
             :style="popoverStyle"
             tabindex="-1"
             ref="popover"
             @focus="$emit('focus')"
             @blur="$emit('blur')"
        >
            <div class="popover-arrow"></div>
            <h3 class="popover-title" v-if="title" v-html="title"></h3>
            <div class="popover-content">
                <div class="popover-content-wrapper">
                    <slot name="content"><span v-html="content"></span></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import popover from '../mixins/popover';

    export default {
        mixins: [popover],
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            popoverStyle: {
                type: Object,
                default: null
            }
        }
    };

</script>
