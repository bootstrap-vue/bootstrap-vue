<template>
    <ol class="breadcrumb">
        <li v-for="(item, idx) in normalizedItems"
            :class="['breadcrumb-item', item.active ? 'active' : null]"
            @click="onClick(item)"
            role="presentation"
        >
            <span v-if="item.active"
                  aria-current="true"
                  v-html="item.text"></span>
            <b-link v-else
                    :to="item.to"
                    :href="item.href || item.link"
                    v-html="item.text"></b-link>
        </li>
        <slot></slot>
    </ol>
</template>

<script>
    import bLink from './link.vue';

    export default {
        components: { bLink },
        computed: {
            componentType() {
                return this.to ? 'router-link' : 'a';
            },
            normalizedItems() {
                let userDefinedActive = false;
                const originalItemsLength = this.items.length;

                return this.items.map((item, index) => {
                    // if no active state is defined,
                    // default to the last item in the array as active
                    const isLast = index === originalItemsLength - 1;

                    // nothing defined except the text
                    if (typeof item === 'string') {
                        return { text: item, link: '#', active: isLast };
                    }

                    // don't default the active state if given a boolean value,
                    // or if a user defined value has already been given
                    if (item.active !== true && item.active !== false && !userDefinedActive) {
                        item.active = isLast;
                    } else if (item.active) {
                        // here we know we've been given an active value,
                        // so we won't set a default value
                        userDefinedActive = true;
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
            onClick(item) {
                this.$emit('click', item);
            }
        }
    };
</script>
