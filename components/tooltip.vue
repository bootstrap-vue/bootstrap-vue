<template>
    <div>
        <div :class="classObject" role="tooltip" style="opacity: 1">
            <div class="tooltip-inner">
                <slot name="text">{{text}}</slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            placement: {
                type: String,
                default: 'top'
            },
            text: {
                type: String,
                default: null
            }
        },
        computed: {
            classObject() {
                return [
                    'tooltip',
                    'tooltip-' + this.placement
                ];
            }
        }
    };
</script>
