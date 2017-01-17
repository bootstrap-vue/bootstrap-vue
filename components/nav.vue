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
                    'navbar-nav',
                    'mr-auto',
                    this.inline ? 'nav-inline' : '',
                    this.tabs ? 'nav-tabs' : '',
                    this.pills ? 'nav-pills' : '',
                    this.stacked ? 'nav-stacked' : '',
                ];
            }
        },
        props: {
            inline: {
                type: Boolean,
                default: true
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
