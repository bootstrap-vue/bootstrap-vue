<template>
    <component :is="tag" :class="['list-group',flush?'list-group-flush':null]">
        <slot></slot>
    </component>
</template>

<script>
    export default {
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
