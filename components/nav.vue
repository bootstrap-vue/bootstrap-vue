<template>
    <div :class="classObject">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        computed: {
            classObject(){
                return [
                    'nav',
                    this.inline ? 'nav-inline' : '',
                    this.tabs ? 'nav-tabs' : '',
                    this.pills ? 'nav-pills' : '',
                    this.stacked ? 'nav-stacked' : '',
                    this.fill ? 'nav-fill' : '',
                ];
            }
        },
        props: {
            inline: {
                type: Boolean,
                default: true
            },
            fill: {
                type: Boolean,
                default: false
            },
            tabs: {
                type: Boolean,
                default: false
            },
            pills: {
                type: Boolean,
                default: false
            },
            stacked: {
                type: Boolean,
                default: false
            },
        },
    };

</script>
