<template>
    <component :is="tag" tabindex="-1" class="dropdown-header">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        props: {
            tag: {
                type: String,
                default: 'h6'
            }
        }
    };
</script>
