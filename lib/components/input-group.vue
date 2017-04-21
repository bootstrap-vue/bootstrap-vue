<template>
    <div :class="classObject">
        <slot name="left"></slot>
        <slot></slot>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        computed: {
            classObject() {
                return [
                    'input-group',
                    this.size ? ('input-group-' + this.size) : ''
                ];
            }
        },
        props: {
            size: {
                type: String,
                default: null
            }
        }
    };
</script>
