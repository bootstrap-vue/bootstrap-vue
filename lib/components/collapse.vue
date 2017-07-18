<template>
    <transition
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
            enter-class=""
            enter-active-class="collapsing"
            enter-to-class=""
            leave-class=""
            leave-active-class="collapsing"
            leave-to-class=""
    >
        <div :id="id || null" :class="classObject" v-show="show">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    import { listenOnRootMixin } from '../mixins';

    export default {
        mixins: [listenOnRootMixin],
        data() {
            return {
                show: this.visible,
                transitioning: false
            };
        },
        computed: {
            classObject() {
                return {
                    'navbar-collapse': this.isNav,
                    'collapse': !this.transitioning,
                    'show': this.show || this.transitioning
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
                type: String,
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
                el.style.height = 0;
                this.reflow(el);
                el.style.height = el.scrollHeight + 'px';
                this.transitioning = true;
            },
            afterEnter(el) {
                el.style.height = null;
                this.transitioning = false;
                this.emitState();
            },
            leave(el) {
                el.style.height = 'auto';
                el.style.display = 'block';
                el.style.height = el.scrollHeight + 'px';
                this.reflow(el);
                this.transitioning = true;
                el.style.height = 0;
            },
            afterLeave(el) {
                el.style.height = null;
                this.transitioning = false;
                this.emitState();
            },
            reflow(el) {
                /* eslint-disable no-unused-expressions */
                el.offsetHeight; // Force repaint
            },
            emitState() {
                this.$emit('input', this.show);
                this.$root.$emit('collapse::toggle::state', this.id, this.show);
                if (this.accordion && this.show) {
                    // Tell the other collapses in this accordion to close
                    this.$root.$emit('accordion::toggle', this.id, this.accordion);
                }
            },
            handleToggleEvt(target) {
                if (target !== this.id) {
                    return;
                }
                this.toggle();
            },
            handleAccordionEvt(openedId, accordion) {
                if (!this.accordion || accordion !== this.accordion) {
                    return;
                }
                if (openedId === this.id) {
                    if (!this.show) {
                        this.toggle();
                    }
                } else {
                    if (this.show) {
                        this.toggle();
                    }
                }
            }
        },
        created() {
            this.listenOnRoot('collapse::toggle', this.handleToggleEvt);
            this.listenOnRoot('accordion::toggle', this.handleAccordionEvt);
        },
        mounted() {
            this.emitState();
        }
    };

</script>
