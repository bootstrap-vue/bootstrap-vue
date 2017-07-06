<template>
    <div :class="classObject">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        computed: {
            classObject() {
                return [
                    'btn-group',
                    this.vertical ? 'btn-group-vertical' : '',
                    this.size ? ('btn-group-' + this.size) : ''
                ];
            }
        },
        props: {
            vertical: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: null
            }
        }
    };
</script>
