import { isArray } from '../utils';

// Controls which events are mapped for each named trigger, and the expected popover behavior for each.
const TRIGGER_LISTENERS = {
    click: {click: 'toggle'},
    hover: {mouseenter: 'show', mouseleave: 'hide'},
    focus: {focus: 'show', blur: 'hide'}
};

export default {
    props: {
        debounce: {
            type: [Number],
            default: 0,
            validator(value) {
                return value >= 0;
            }
        },
        delay: {
            type: [Number, Object],
            default: 0,
            validator(value) {
                if (typeof value === 'number') {
                    return value >= 0;
                } else if (value !== null && typeof value === 'object') {
                    return typeof value.show === 'number' &&
                        typeof value.hide === 'number' &&
                        value.show >= 0 &&
                        value.hide >= 0;
                }
                return false;
            }
        },
        show: {
            type: Boolean,
            default: null
        },
        triggers: {
            type: [Boolean, String, Array],
            default: () => ['click', 'focus'],
            validator(value) {
                // Allow falsy value to disable all event triggers (equivalent to 'manual') in Bootstrap 4
                if (value === false || value === '') {
                    return true;
                } else if (typeof value === 'string') {
                    return Object.keys(TRIGGER_LISTENERS).indexOf(value) !== -1;
                } else if (isArray(value)) {
                    const keys = Object.keys(TRIGGER_LISTENERS);
                    value.forEach(item => {
                        if (keys.indexOf(item) === -1) {
                            return false;
                        }
                    });
                    return true;
                }
                return false;
            }
        }
    },
    data() {
        return {
            triggerState: this.show,
            classState: this.show,
            lastEvent: null,
            persistentState: false,
            triggerName: ''
        };
    },
    computed: {
        /**
         * Arrange event trigger hooks as array for all input types.
         *
         * @return Array
         */
        normalizedTriggers() {
            if (this.triggers === false) {
                return [];
            } else if (typeof this.triggers === 'string') {
                return [this.triggers];
            }
            return this.triggers;
        },
        /**
         * Determine if the Popover should be shown.
         *
         * @return Boolean
         */
        showState() {
            return this.show !== false && (this.triggerState || this.show);
        },
        persistentOnClick () {
            return this.triggers.indexOf("click") > -1 && this.triggers.indexOf("hover") > -1
        }
    },
    watch: {
        /**
         * Refresh Popover event triggers
         * @param {Array} newTriggers
         * @param {Array} oldTriggers
         */
        normalizedTriggers(newTriggers, oldTriggers) {
            this.updateListeners(newTriggers, oldTriggers);
        },
        /**
         * Affect 'show' state in response to status change
         * @param  {Boolean} val
         */
        showState(val) {
            const delay = this.getDelay(val);
            clearTimeout(this.$data._timeout);
            if (delay) {
                this.$data._timeout = setTimeout(() => this.toggle(val), delay);
            } else {
                this.toggle(val);
            }
        }
    },
    methods: {
        /**
         * Add all event hooks for the given trigger
         * @param {String} trigger
         */
        addListener(trigger) {
            // eslint-disable-next-line guard-for-in
            for (const item in TRIGGER_LISTENERS[trigger]) {
                this.$data._triggers.forEach((trigger) => {
                    if (trigger.addEventListener) {
                        trigger.addEventListener(item, e => this.eventHandler(e));
                    }
                })
            }
        },
        /**
         * Handle multiple event triggers
         * @param  {Object} e
         */
        eventHandler(e) {
            e.preventDefault()
            // If this event is right after a previous successful event, ignore it (debounce)
            if (this.normalizedTriggers.length > 1 && this.debounce > 0 && this.lastEvent !== null && e.timeStamp <= this.lastEvent + this.debounce) {
                return;
            }
            // Look up the expected popover action for the event
            // eslint-disable-next-line guard-for-in
            for (const trigger in TRIGGER_LISTENERS) {
                for (const event in TRIGGER_LISTENERS[trigger]) {
                    if (event === e.type) {
                        const action = TRIGGER_LISTENERS[trigger][event];
                        // If the expected event action is the opposite of the current state, allow it
                        if (action === 'toggle' || (this.triggerState && action === 'hide') || (!this.triggerState && action === 'show')) {
                            if(!this.persistentOnClick || !this.persistentState || event === 'click') {
                                if (this.persistentOnClick && event === 'click') {
                                    this.persistentState = !this.persistentState;
                                    this.triggerState = this.persistentState
                                } else {
                                    this.triggerState = !this.triggerState;
                                }
                                this.lastEvent = e.timeStamp;
                            }
                        }
                        return;
                    }
                }
            }
        },
        /**
         * Get the currently applicable popover delay
         *
         * @returns Number
         */
        getDelay(state) {
            if (typeof this.delay === 'object') {
                return state ? this.delay.show : this.delay.hide;
            }
            return this.delay;
        },
        /**
         * Remove all event hooks for the given trigger
         * @param {String} trigger
         */
        removeListener(trigger) {
            // eslint-disable-next-line guard-for-in
            for (const item in TRIGGER_LISTENERS[trigger]) {
                this.$data._triggers.forEach((trigger) => {
                    if (trigger.removeEventListener) {
                        trigger.removeEventListener(item, e => this.eventHandler(e));
                    }
                })
            }
        },
        /**
         * Handle Popover show or hide instruction
         */
        toggle(newShowState) {
            if (newShowState === false && this.persistentState) {
                this.persistentState = false
                
                if (this.triggerState) {
                    this.triggerState = false
                    return
                }
            }
            if (typeof newShowState === 'undefined' || (newShowState !== false && newShowState !== true)) {
                newShowState = !this.classState
            }

            this.$emit('showChange', newShowState);
            if (newShowState) {
                this.showComponent();
                this.$root.$emit('shown::' + this.triggerName);
            } else {
                this.hideComponent();
                this.$root.$emit('hidden::' + this.triggerName);
            }
        },
        /**
         * Study the 'triggers' component property and apply all selected triggers
         * @param {Array} triggers
         * @param {Array} appliedTriggers
         */
        updateListeners(triggers, appliedTriggers = []) {
            const newTriggers = [];
            const removeTriggers = [];
            // Look for new events not yet mapped (all of them on first load)
            triggers.forEach(item => {
                if (appliedTriggers.indexOf(item) === -1) {
                    newTriggers.push(item);
                }
            });
            // Disable any removed event triggers
            appliedTriggers.forEach(item => {
                if (triggers.indexOf(item) === -1) {
                    removeTriggers.push(item);
                }
            });
            // Apply trigger mapping changes
            newTriggers.forEach(item => this.addListener(item));
            removeTriggers.forEach(item => this.removeListener(item));
        },
        triggersCreated() {
            this.$root.$on('hide::' + this.triggerName, () => {
                this.triggerState = false;
            });
        },
        triggersMounted(triggers, componentMountCallback) {
            if (!isArray(triggers)) {
                triggers = [ triggers ]
            }

            // Configure tether
            this.$data._triggers = triggers.map((trigger) => {
                return trigger.children && trigger.children[0] || trigger
            })

            if (componentMountCallback && componentMountCallback instanceof Function) {
                componentMountCallback()
            }
            
            this.$data._timeout = 0;
            // Add listeners for specified triggers and complementary click event
            this.updateListeners(this.normalizedTriggers);
            // Display popover if prop is set on load
            if (this.showState) {
                this.showComponent();
            }
        },
        triggersBeforeDestroy() {
            this.normalizedTriggers.forEach(item => this.removeListener(item));
            clearTimeout(this.$data._timeout);
        }
    }
};
