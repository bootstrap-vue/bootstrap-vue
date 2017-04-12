<template>
    <ol class="breadcrumb">
        <li v-if="items" v-for="item in items" :class="['breadcrumb-item', item.active ? 'active' : null]">
            <span v-if="item.active" v-html="item.text"></span>
            <b-link v-else :to="item.to||item.href||item.link" v-html="item.text"></b-link>
        </li>
        <slot></slot>
    </ol>
</template>

<script>
    import bLink from './link.vue';

    export default {
        components: {bLink},
        computed: {
            componentType() {
                return this.to ? 'router-link' : 'a';
            }
        },
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
                if (this.$router && this.to) {
                    this.$router.push(this.to);
                }
            }
        }
    };
</script>
