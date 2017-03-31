<template>
    <transition name="collapse">
        <div :class="classObject" v-show="show">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped>
    .collapse-enter-active, .collapse-leave-active {
        transition: all .35s ease;
        overflow: hidden;
        max-height: 100vh;
    }

    .collapse-enter, .collapse-leave-to {
        max-height: 0;
    }
</style>

<script>
    export default {

        data() {
            return {
                show: false
            };
        },

        computed: {
            classObject() {
                return {
                    'navbar-collapse': this.isNav,
                    show: this.show
                };
            }
        },

        props: {
            isNav: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
                required: true
            }
        },

        methods: {
            toggle() {
                this.show = !this.show;
            }
        },

        created() {
            this.$root.$on('collapse::toggle', target => {
                if (target !== this.id) {
                    return;
                }
                this.toggle();
            });
        }
    };

</script>
