<template>
    <span class="input-group-addon" :id="_id">
        <slot></slot>
    </span>
</template>

<script>
    import generateId from '../mixins/generate-id';

    export default {
        mixins: [generateId],
        props: {
            id: {
                type: String,
                default: null
            }
        }
    };
</script>
