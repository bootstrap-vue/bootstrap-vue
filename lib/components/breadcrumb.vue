<template>
    <ol class="breadcrumb"
        role="navigation">
        <li v-for="item in normalizedItems"
            :class="['breadcrumb-item', item.active ? 'active' : null]"
            @click="onClick(item._originalItem)"
            role="presentation">
            <span v-if="item.active"
                  v-html="item.text"></span>
            <b-link v-else
                    v-bind="item._linkProps"
                    v-html="item.text"></b-link>
        </li>
        <slot></slot>
    </ol>
</template>

<script>
import bLink from './link.vue';
import { props as linkProps } from '../mixins/link';
const bLinkPropKeys = Object.keys(linkProps);

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
                let normalizedItem = { _originalItem: item };
                // if no active state is defined,
                // default to the last item in the array as active
                const isLast = index === originalItemsLength - 1;

                // nothing defined except the text
                if (typeof item === 'string') {
                    normalizedItem = { text: item, link: '#', active: isLast };
                } else {
                    Object.assign(normalizedItem, item);
                }

                // don't default the active state if given a boolean value,
                // or if a user defined value has already been given
                if (normalizedItem.active !== true && normalizedItem.active !== false && !userDefinedActive) {
                    normalizedItem.active = isLast;
                } else if (normalizedItem.active) {
                    // here we know we've been given an active value,
                    // so we won't set a default value
                    userDefinedActive = true;
                }

                if (normalizedItem.link) {
                    // default the link value to bLink's href prop
                    normalizedItem.href = normalizedItem.link;
                }

                // stuff all the bLink props into a single place
                // so we can bind to the component
                // for dynamic prop proxying
                normalizedItem._linkProps = Object.keys(normalizedItem).reduce((memo, itemProp) => {
                    if (bLinkPropKeys.includes(itemProp)) {
                        memo[itemProp] = normalizedItem[itemProp];
                    }

                    return memo;
                }, {});

                return normalizedItem;
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
