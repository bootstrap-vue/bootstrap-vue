<template>
    <b-form :id="id || null" inline>
        <slot></slot>
    </b-form>
</template>

<script>
    import bForm from './form.vue';
    
    export default {
        components: [bForm],
        props: {
            id: {
                type: String,
            }
        }
    };
</script>
