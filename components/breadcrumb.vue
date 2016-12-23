<template>
    <ol class="breadcrumb">
        <li v-for="item in items" :class="['breadcrumb-item', item.active ? 'active' : null]">
            <a href="#"
               @click.stop.prevent="onclick(item)"
               v-if="!item.active"
            >{{item.text}}</a>
            <span v-if="item.active">{{item.text}}</span>
        </li>
    </ol>
</template>

<script>


    export default {
        computed: {},
        props: {
            items: {
                type: Array,
                default: () => [],
                required: true
            },
        },
        methods: {
            onclick: function (item) {
                this.$emit('click', item);
            },
        },
    }
</script>
