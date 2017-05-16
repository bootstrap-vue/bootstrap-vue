<template>
    <ol class="breadcrumb" role="navigation">
        <li v-for="item in items2"
            :class="['breadcrumb-item', item.__active ? 'active' : null]"
            @click="onclick(item)"
            role="presentation"
        >
            <span v-if="item.active" v-html="item.text"></span>
            <b-link v-else
                    :to="item.to"
                    :href="item.href || item.link"
                    v-html="item.text"
                    @click="onclick"
            ></b-link>
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
            },
            items2() {
                const last = this.items.length > 0 && this.items[this.items.length - 1];

                return this.items.map(item => {
                    if (typeof item === 'string') {
                        return {text: item, link: '#', active: item === last};
                    }

                    if (item.active !== true && item.active !== false) {
                        item.__active = item === last;
                    } else {
                        item.__active = item.active;
                    }

                    return item;
                });
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
            }
        }
    };
</script>
