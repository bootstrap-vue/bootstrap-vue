<template>
    <div>
        <span ref="trigger"><slot></slot></span>

        <div tabindex="-1" :class="['popover',popoverAlignment]" ref="popover" @focus="$emit('focus')"
             @blur="$emit('blur')" :style="popoverStyle">
            <div class="popover-arrow"></div>
            <h3 class="popover-title" v-if="title" v-html="title"></h3>
            <div class="popover-content">
                <div class="popover-content-wrapper">
                    <slot name="content"><span v-html="content"></span></slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Tether from 'tether';

    // Controls which events are mapped for each named trigger, and the expected popover behavior for each.
    const triggerListeners = {
        click: {click: 'toggle'},
        hover: {mouseenter: 'show', mouseleave: 'hide'},
        focus: {focus: 'show', blur: 'hide'}
    };

    const placementParams = {
        top: {
            attachment: 'bottom center',
            targetAttachment: 'top center'
        },
        bottom: {
            attachment: 'top center',
            targetAttachment: 'bottom center'
        },
        left:
        {
            attachment: 'middle right',
            targetAttachment: 'middle left'
        },
        right: {
            attachment: 'middle left',
            targetAttachment: 'middle right'
        }
    };

    export default {
        props: {
            constraints: {
                type: Array,
                default() {
                    return [];
                }
            },
            content: {
                type: String,
                default: ''
            },
            debounce: {
                type: [Number],
                default: 300,
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
            offset: {
                type: String,
                default: '0 0',
                validator(value) {
                    return /^(\d+\s\d+)$/.test(value);
                }
            },
            placement: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
                }
            },
            popoverStyle: {
                type: Object,
                default: null
            },
            show: {
                type: Boolean,
                default: null
            },
            title: {
                type: String,
                default: ''
            },
            triggers: {
                type: [Boolean, String, Array],
                default: () => ['click', 'focus'],
                validator(value) {
                    // Allow falsy value to disable all event triggers (equivalent to 'manual') in Bootstrap 4
                    if (value === false || value === '') {
                        return true;
                    } else if (typeof value === 'string') {
                        return Object.keys(triggerListeners).indexOf(value) !== -1;
                    } else if (Array.isArray(value)) {
                        const keys = Object.keys(triggerListeners);
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
                lastEvent: null
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
             * Class property to be used for Popover rendering
             *
             * @return string
             */
            popoverAlignment() {
                return !this.placement || this.placement === `default` ? `popover-top` : `popover-${this.placement}`;
            },

            /**
             * Determine if the Popover should be shown.
             *
             * @return boolean
             */
            showState() {
                return this.show !== false && (this.triggerState || this.show);
            },

            /**
             * Tether construct params for each show event.
             *
             * @return Object
             */
            tetherOptions() {
                return {
                    element: this._popover,
                    target: this._trigger,
                    offset: this.offset,
                    constraints: this.constraints,
                    attachment: placementParams[this.placement].attachment,
                    targetAttachment: placementParams[this.placement].targetAttachment
                };
            },

            /**
             * Determine if debounce should be used.
             *
             * @return boolean
             */
            useDebounce() {
                return this.normalizedTriggers.length > 1;
            }
        },

        watch: {
            constraints() {
                this.setOptions();
            },

            content() {
                this.refreshPosition();
            },

            normalizedTriggers(newTriggers, oldTriggers) {
                this.updateListeners(newTriggers, oldTriggers);
            },

            offset() {
                this.setOptions();
            },

            placement() {
                this.setOptions();
            },

            /**
             * Affect 'show' state in response to status change
             * @param  {Boolean} newShowState
             */
            showState(val) {
                clearTimeout(this._timeout);
                let delay = this.getDelay(val);

                if (delay)
                    this._timeout = setTimeout(() => {this.togglePopover(val)}, delay);
                else
                    this.togglePopover(val);
            },

            title() {
                this.refreshPosition();
            }
        },

        methods: {
            /**
             * Add all event hooks for the given trigger
             * @param {String} trigger
             */
            addListener(trigger) {
                // eslint-disable-next-line guard-for-in
                for (const item in triggerListeners[trigger]) {
                    this._trigger.addEventListener(item, e => this.eventHandler(e));
                }
            },

            /**
             * Cleanup component listeners
             */
            cleanup() {
                // Remove all event listeners
                // eslint-disable-next-line guard-for-in
                for (const trigger in this.normalizedTriggers) {
                    this.removeListener(trigger);
                }

                clearTimeout(this._timeout);
                this._timeout = null;
                this.hidePopover();
            },

            destroyTether() {
                if (this._tether) {
                    this._tether.destroy();
                    this._tether = null;
                }
            },

            /**
             * Handle multiple event triggers
             * @param  {Object} e
             */
            eventHandler(e) {
                // If this event is right after a previous successful event, ignore it
                if (this.useDebounce && this.debounce > 0 && this.lastEvent !== null && e.timeStamp <= this.lastEvent + this.debounce) {
                    return;
                }

                // Look up the expected popover action for the event
                // eslint-disable-next-line guard-for-in
                for (const trigger in triggerListeners) {
                    for (const event in triggerListeners[trigger]) {
                        if (event === e.type) {
                            const action = triggerListeners[trigger][event];

                            // If the expected event action is the opposite of the current state, allow it
                            if (action === 'toggle' || (this.triggerState && action === 'hide') || (!this.triggerState && action === 'show')) {
                                this.triggerState = !this.triggerState;
                                this.lastEvent = e.timeStamp;
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
             * Hide popover and fire event
             */
            hidePopover() {
                this._popover.style.display = 'none';
                this.$root.$emit('hidden::popover');

                this.destroyTether();
            },

            /**
             * Refresh the Popover position in order to respond to changes
             */
            refreshPosition() {
                if (this._tether) {
                    this.$nextTick(() => { this._tether.position(); });
                }
            },

            /**
             * Remove all event hooks for the given trigger
             * @param {String} trigger
             */
            removeListener(trigger) {
                // eslint-disable-next-line guard-for-in
                for (const item in triggerListeners[trigger]) {
                    this._trigger.removeEventListener(item, e => this.eventHandler(e));
                }
            },

            /**
             * Update tether options
             */
            setOptions() {
                if (this._tether) {
                    this._tether.setOptions(this.tetherOptions);
                }
            },

            /**
             * Display popover and fire event
             */
            showPopover() {
                // Just in case
                this.destroyTether();

                // Let tether do the magic, after element is shown
                this._popover.style.display = 'block';
                this._tether = new Tether(this.tetherOptions);

                // Make sure the popup is rendered in the correct location
                this.refreshPosition();

                this.$root.$emit('shown::popover');
            },

            togglePopover(newShowState) {
                this.$emit('showChange', newShowState);
                if (newShowState) {
                    this.showPopover();
                } else {
                    this.hidePopover();
                }
            },

            /**
             * Study the 'triggers' component property and apply all selected triggers
             * @param {Array} triggers
             * @param {Array} appliedTriggers
             */
            updateListeners(triggers, appliedTriggers = []) {
                let newTriggers = [];
                let removeTriggers = [];

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
            }
        },

        created() {
            const hub = this.$root;
            hub.$on('hide::popover', () => {
                this.triggerState = false;
            });

            // Workaround to resolve issues like #151
            if (this.$router) {
                this.$router.beforeEach((to, from, next) => {
                    next();
                    this.cleanup();
                });
            }

            const cleanup = () => {
                this.cleanup();
            };

            hub.$on('hide::modal', cleanup);
            hub.$on('changed::tab', cleanup);
        },

        mounted() {
            // Configure tether
            this._trigger = this.$refs.trigger.children[0];
            this._popover = this.$refs.popover;
            this._popover.style.display = 'none';
            this._timeout = 0;

            // Add listeners for specified triggers and complementary click event
            this.updateListeners(this.normalizedTriggers);

            // Display popover if prop is set on load
            if (this.showState) {
                this.showPopover();
            }
        },

        /*
        beforeUpdate() {
            console.log('called beforeUpdate');
        },

        updated() {
            console.log('called update');
        }
        */

        beforeDestroy() {
            this.cleanup();
        }
    };

</script>
