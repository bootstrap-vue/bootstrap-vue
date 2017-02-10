<template>
    <div :class="classObject" role="group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        computed: {
            classObject() {
                return [
                    'btn-' + (this.toolbar ? 'toolbar' : 'group'),
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
            toolbar: {
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
