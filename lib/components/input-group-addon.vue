
<template>
    <span class="input-group-addon" :id="thisId">
        <slot></slot>
    </span>
</template>

<script>
    export default {
        computed: {
            thisId() {
                return: 'b_input_group_addon_' + this._uid;
            }
        },
        props: {
            id: {
                type: String,
                default: null
            }
        }
    };
</script>
