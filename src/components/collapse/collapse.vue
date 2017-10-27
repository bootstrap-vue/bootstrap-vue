<template>
    <transition
            enter-class=""
            enter-active-class="collapsing"
            enter-to-class=""
            leave-class=""
            leave-active-class="collapsing"
            leave-to-class=""
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave"
    >
        <component v-show="show"
                   :id="id || null"
                   :is="tag"
                   :class="classObject"
                   @click="clickHandler"
        ><slot></slot></component>
    </transition>
</template>

<script>
    import { listenOnRootMixin } from '../mixins';
    import { hasClass, reflow } from '../utils/dom';

    // Events we emit on $root
    const EVENT_STATE = 'bv::collapse::state';
    const EVENT_ACCORDION = 'bv::collapse::accordion';

    // Events we listen to on $root
    const EVENT_TOGGLE = 'bv::toggle::collapse';

    export default {
        mixins: [listenOnRootMixin],
        data() {
            return {
                show: this.visible,
                transitioning: false
            };
        },
        model: {
            prop: 'visible',
            event: 'input'
        },
        props: {
            id: {
                type: String,
                required: true
            },
            isNav: {
                type: Boolean,
                default: false
            },
            accordion: {
                type: String,
                default: null
            },
            visible: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'div'
            }
        },
        watch: {
            visible(newVal) {
                if (newVal !== this.show) {
                    this.show = newVal;
                }
            },
            show(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.emitState();
                }
            }
        },
        computed: {
            classObject() {
                return {
                    'navbar-collapse': this.isNav,
                    'collapse': !this.transitioning,
                    'show': this.show && !this.transitioning
                };
            }
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },
            onEnter(el) {
                el.style.height = 0;
                reflow(el);
                el.style.height = el.scrollHeight + 'px';
                this.transitioning = true;
                // This should be moved out so we can add cancellable events
                this.$emit('show');
            },
            onAfterEnter(el) {
                el.style.height = null;
                this.transitioning = false;
                this.$emit('shown');
            },
            onLeave(el) {
                el.style.height = 'auto';
                el.style.display = 'block';
                el.style.height = el.getBoundingClientRect().height + 'px';
                reflow(el);
                this.transitioning = true;
                el.style.height = 0;
                // This should be moved out so we can add cancellable events
                this.$emit('hide');
            },
            onAfterLeave(el) {
                el.style.height = null;
                this.transitioning = false;
                this.$emit('hidden');
            },
            emitState() {
                this.$emit('input', this.show);
                // Let v-b-toggle know the state of this collapse
                this.$root.$emit(EVENT_STATE, this.id, this.show);
                if (this.accordion && this.show) {
                    // Tell the other collapses in this accordion to close
                    this.$root.$emit(EVENT_ACCORDION, this.id, this.accordion);
                }
            },
            clickHandler(evt) {
                // If we are in a nav/navbar, close the collapse when non-disabled link clicked
                const el = evt.target;
                if (!this.isNav || !el || getComputedStyle(this.$el).display !== 'block') {
                    return;
                }
                if (hasClass(el, 'nav-link') || hasClass(el, 'dropdown-item')) {
                    this.show = false;
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
                    // Open this collapse if not shown
                    if (!this.show) {
                        this.toggle();
                    }
                } else {
                    // Close this collapse if shown
                    if (this.show) {
                        this.toggle();
                    }
                }
            },
            handleResize() {
                // Handler for orientation/resize to set collapsed state in nav/navbar
                this.show = (getComputedStyle(this.$el).display === 'block');
            },
        },
        created() {
            // Listen for toggle events to open/close us
            this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt);
            // Listen to otehr collapses for accordion events
            this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt);
        },
        mounted() {
            if (this.isNav && typeof document !== 'undefined') {
                // Set up handlers
                window.addEventListener('resize', this.handleResize, false);
                window.addEventListener('orientationchange', this.handleResize, false);
                this.handleResize();
            }
            this.emitState();
        },
        beforeDestroy() {
            if (this.isNav && typeof document !== 'undefined') {
                window.removeEventListener('resize', this.handleResize, false);
                window.removeEventListener('orientationchange', this.handleResize, false);
            }
        }
    };

</script>
