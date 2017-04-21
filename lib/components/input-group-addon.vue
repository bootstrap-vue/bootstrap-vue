
<template>
    <span class="input-group-addon" :id="id">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                default: 'b_input_geoup_addon_' + this._uid
            }
        }
    };
</script>
