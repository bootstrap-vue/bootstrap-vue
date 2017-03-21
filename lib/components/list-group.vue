<template>
    <component :is="tag" :class="['list-group',flush?'list-group-flush':null]">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        replace: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            flush: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
