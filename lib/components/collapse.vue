<template>
    <transition
            @enter="enter"
            @after-enter="clearHeight"
            @leave="leave"
            @after-leave="clearHeight"
            name="collapse"
    >
        <div :id="id || null" :class="classObject" v-show="show">
            <slot></slot>
        </div>
    </transition>
</template>

<style scoped>
    .collapse-enter-active, .collapse-leave-active {
        transition: all .35s ease;
        overflow: hidden;
    }
</style>

<script>
    export default {
        data() {
            return {
                show: this.visible
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
        model: {
            prop: 'visible',
            event: 'input'
        },
        watch: {
            visible(newVal) {
                if (newVal !== this.show) {
                    this.show = newVal;
                    this.emitState();
                }
            },
        },
        props: {
            isNav: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
                required: true
            },
            accordion: { 
                type; String.
                default: null
            },
            visible: {
                type: Boolean,
                default: false
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
                this.$emit('input', this.show);
                this.$root.$emit('collapse::toggle::state', this.id, this.show);
                if (this.accordion && this.show) {
                    // Tell the other collapses in this accordion to close
                    this.$root.$emit('accordion::toggle', this.id, this.accordion);
                }
            }
        },
        created() {
            this.$root.$on('collapse::toggle', target => {
                if (target !== this.id) {
                    return;
                }
                this.toggle();
            });
            this.$root.$on('accordion::toggle', (openedId, accordion) => {
                if (openedId === this.id || accordion !== this.accordion || !this.show) {
                    return;
                }
                // Close this accordion collapse component
                this.toggle();
            });
        },
        mounted() {
            this.emitState();
        }
    };

</script>
