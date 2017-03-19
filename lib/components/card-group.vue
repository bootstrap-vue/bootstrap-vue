<template>
    <div :class="['card-' + type]">
        <slot></slot>
    </div>
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
