<template>
    <nav :class="classObject">
        <slot></slot>
    </nav>
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
