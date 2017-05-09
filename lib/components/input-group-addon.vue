<template>
    <div class="input-group-addon" :id="id">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: null
            }
        }
    };
</script>
