<template>
    <ol class="breadcrumb">
        <li v-for="item in items" :class="['breadcrumb-item', item.active ? 'active' : null]">
            <a href="#"
               @click.stop.prevent="onclick(item)"
               v-if="!item.active"
               v-html="item.text"
            />
            <span v-if="item.active" v-html="item.text"/>
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
            }
        },
        methods: {
            onclick(item) {
                this.$emit('click', item);
            }
        }
    };
</script>
