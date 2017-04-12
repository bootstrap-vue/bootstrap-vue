<template>
    <transition @enter="enter" @leave="leave" name="collapse">
        <div :class="classObject" v-show="show">
            <div ref="content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .collapse-enter-active, .collapse-leave-active {
        transition: all .35s ease;
        overflow: hidden;
    }

    .collapse-enter, .collapse-leave-to {
        height: 0;
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
            },
            enter(el) {
                const height = getComputedStyle(this.$refs.content).height;
                el.style.height = height;
            },
            leave(el) {
                el.style.height = 0;
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
