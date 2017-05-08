<template>
    <transition
            @enter="enter"
            @after-enter="clearHeight"
            @leave="leave"
            @after-leave="clearHeight"
            name="collapse"
    >
        <div :class="classObject" v-show="show" :aria-expanded="show ? 'true' : 'false'">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped>
    .collapse-enter-active, .collapse-leave-active {
        transition: all .35s ease;
        overflow: hidden;
    }

    .collapse-enter, .collapse-leave-to {
        /*height: 0;*/
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
                this.emitState();
            },
            enter(el) {
                el.style.height = 'auto';
                const realHeight = getComputedStyle(el).height;
                el.style.height = '0px';

                /* eslint-disable no-unused-expressions */
                el.offsetHeight; // Force repaint

                el.style.height = realHeight;
            },
            leave(el) {
                el.style.height = 'auto';
                const realHeight = getComputedStyle(el).height;
                el.style.height = realHeight;

                /* eslint-disable no-unused-expressions */
                el.offsetHeight; // Force repaint

                el.style.height = '0px';
            },
            clearHeight(el) {
                el.style.height = null;
            },
            emitState() {
                this.$root.$emit('collapse::toggle::state', this.id, this.state);
            }
        },
        created() {
            this.$root.$on('collapse::toggle', target => {
                if (target !== this.id) {
                    return;
                }
                this.toggle();
            });
        },
        mounted() {
            this.emitState();
        }
    };

</script>
