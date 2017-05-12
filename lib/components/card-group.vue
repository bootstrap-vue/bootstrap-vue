<template>
    <component :is="tag" :class="['card-' + type]">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        computed: {
            type() {
                if (this.deck) {
                    return 'deck';
                }

                if (this.columns) {
                    return 'columns';
                }

                return 'group';
            }
        },
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            deck: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
