import Tether from 'tether';
import triggersMixin from './triggers';

const PLACEMENT_PARAMS = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'middle right',
    right: 'middle left'
};
const TETHER_CLASS_PREFIX = 'bs-tether';
const TETHER_CLASSES = {
    element: false,
    enabled: false
};
const TRANSITION_DURATION = 150;

export default {
    mixins: [triggersMixin],
    props: {
        constraints: {
            type: Array,
            default() {
                return [];
            }
        },
        offset: {
            type: String,
            default: '0 0',
            validator(value) {
                // Regex test for a pair of units, either 0 exactly, px, or percentage
                return /^((0\s?)|([+-]?[0-9]+(px|%)\s?)){2}$/.test(value);
            }
        },
        placement: {
            type: String,
            default: 'top',
            validator(value) {
                return Object.keys(PLACEMENT_PARAMS).indexOf(value) !== -1;
            }
        },
        popoverStyle: {
            type: Object,
            default: null
        },
        targetOffset: {
            type: String,
            default: '0 0',
            validator(value) {
                // Regex test for a pair of units, either 0 exactly, px, or percentage
                return /^((0\s?)|([+-]?[0-9]+(px|%)\s?)){2}$/.test(value);
            }
        },
        debounce: {
            default: 300,
        }
    },
    data() {
        return {
            triggerName: 'popover'
        };
    },
    computed: {
        /**
         * Class property to be used for Popover rendering
         *
         * @return String
         */
        popoverAlignment() {
            return !this.placement || this.placement === `default` ? `popover-top` : `popover-${this.placement}`;
        },
    },
    watch: {
        /**
         * Refresh Tether display properties
         */
        constraints() {
            this.setOptions();
        },
        /**
         * Refresh Tether display properties
         */
        offset() {
            this.setOptions();
        },
        /**
         * Refresh Tether display properties
         */
        placement() {
            this.setOptions();
        }
    },
    methods: {
        /**
         * Tidy removal of Tether object from the DOM
         */
        destroyTether() {
            if (this.$data._tether && !this.showState) {
                this.$data._tether.destroy();
                this.$data._tether = null;
                const regx = new RegExp('(^|[^-]\\b)(' + TETHER_CLASS_PREFIX + '\\S*)', 'g');
                this.$data._triggers[0].className = this.$data._triggers[0].className.replace(regx, '');
            }
        },
        /**
         * Tether construct params for each show event.
         *
         * @return Object
         */
        getTetherOptions() {
            return {
                attachment: PLACEMENT_PARAMS[this.placement],
                element: this.$data._popover,
                target: this.$data._triggers[0],
                classes: TETHER_CLASSES,
                classPrefix: TETHER_CLASS_PREFIX,
                offset: this.offset,
                constraints: this.constraints,
                targetOffset: this.targetOffset
            };
        },
        /**
         * Hide popover and fire event
         */
        hideComponent() {
            this.classState = false;
            clearTimeout(this.$data._timeout);
            this.$data._timeout = setTimeout(() => {
                this.$data._popover.style.display = 'none';
                this.destroyTether();
            }, TRANSITION_DURATION);
        },
        /**
         * Refresh the Popover position in order to respond to changes
         */
        refreshPosition() {
            if (this.$data._tether) {
                this.$nextTick(() => {
                    this.$data._tether.position();
                });
            }
        },
        /**
         * Update tether options
         */
        setOptions() {
            if (this.$data._tether) {
                this.$data._tether.setOptions(this.getTetherOptions());
            }
        },
        /**
         * Display popover and fire event
         */
        showComponent() {
            clearTimeout(this.$data._timeout);
            if (!this.$data._tether) {
                this.$data._tether = new Tether(this.getTetherOptions());
            }
            this.$data._popover.style.display = 'block';
            // Make sure the popup is rendered in the correct location
            this.refreshPosition();
            this.$nextTick(() => {
                this.classState = true;
            });
        }
    },
    created() {
        this.triggersCreated();
    },
    mounted() {
        this.triggersMounted(this.$refs.trigger, () => {
            // Configure tether
            this.$data._popover = this.$refs.popover;
            this.$data._popover.style.display = 'none';
            this.$data._tether = new Tether(this.getTetherOptions());
        });
    },
    updated() {
        this.refreshPosition();
    },
    beforeDestroy() {
        this.triggersBeforeDestroy();

        this.destroyTether();
    },
    destroyed() {
        // Tether is moving the popover element outside of Vue's control and leaking dom nodes
        if (this.$data._popover.parentElement === document.body) {
            document.body.removeChild(this.$data._popover);
        }
    }
};
