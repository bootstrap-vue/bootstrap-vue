<template>
    <component :is="tag" :id="safeId()" class="tabs">
        <div v-if="bottom" :id="safeId('_BV_tab_container_')" :class="['tab-content',{'card-body': card}]" ref="tabsContainer">
            <slot></slot>
            <slot name="empty" v-if="!tabs || !tabs.length"></slot>
        </div>

        <div :class="{'card-header': card}">
            <ul :class="['nav','nav-' + navStyle, card ? 'card-header-'+navStyle : null]"
                role="tablist"
                tabindex="0"
                @keydown.left="previousTab"
                @keydown.up="previousTab"
                @keydown.right="nextTab"
                @keydown.down="nextTab"
                @keydown.shift.left="setTab(0,false,1)"
                @keydown.shift.up="setTab(0,false,1)"
                @keydown.shift.right="setTab(tabs.length-1,false,-1)"
                @keydown.shift.down="setTab(tabs.length-1,false,-1)"
            >
                <li class="nav-item" v-for="(tab, index) in tabs" role="presentation">
                    <a :class="['nav-link',{small: small, active: tab.localActive, disabled: tab.disabled}]"
                       :href="tab.href"
                       role="tab"
                       :aria-setsize="tabs.length"
                       :aria-posinset="currentTab + 1"
                       :aria-selected="tab.localActive ? 'true' : 'false'"
                       :aria-controls="safeId('_BV_tab_container_')"
                       :aria-disabled="tab.disabled"
                       :id="tab.controlledBy || safeId('_BV_tab_${index+1}_')"
                       @click.prevent.stop="setTab(index)"
                       @keydown.space.prevent.stop="setTab(index)"
                       @keydown.enter.prevent.stop="setTab(index)"
                       tabindex="-1"
                       v-if="!tab.headHtml"
                       v-html="tab.title"
                    ></a>
                    <div :class="['tab-head',{small: small, active: tab.localActive, disabled: tab.disabled}]"
                         role="heading"
                         tabindex="-1"
                         v-else
                         v-html="tab.headHtml"></div>
                </li>
                <slot name="tabs"></slot>
            </ul>
        </div>

        <div v-if="!bottom" :id="safeId('_BV_tab_container_')" :class="['tab-content',{'card-body': card}]" ref="tabsContainer">
            <slot></slot>
            <slot name="empty" v-if="!tabs || !tabs.length"></slot>
        </div>
    </component>
</template>

<script>
    import {observeDom} from '../utils';
    import {idMixin} from '../mixins';

    export default {
        mixins: [idMixin],
        data() {
            return {
                currentTab: this.value,
                tabs: []
            };
        },
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            card: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                default: null
            },
            pills: {
                type: Boolean,
                default: false
            },
            bottom: {
                type: Boolean,
                default: false
            },
            noFade: {
                type: Boolean,
                default: false
            },
            lazy: {
                // This prop is sniffed by the tab child
                type: Boolean,
                default: false
            }
        },
        watch: {
            currentTab(val, old) {
                if (val === old) {
                    return;
                }
                this.$root.$emit('changed::tab', this, val, this.tabs[val]);
                this.$emit('input', val);
                this.tabs[val].$emit('click');
            },
            value(val, old) {
                if (val === old) {
                    return;
                }
                if (typeof old !== 'number') {
                    old = 0;
                }
                // Moving left or right?
                const direction = val < old ? -1 : 1;
                this.setTab(val, false, direction);
            }
        },
        computed: {
            fade() {
                // This computed prop is sniffed by the tab child
                return !this.noFade;
            },
            navStyle() {
                return this.pills ? 'pills' : 'tabs';
            }
        },
        methods: {
            /**
             * Util: Return the sign of a number (as -1, 0, or 1)
             */
            sign(x) {
                return (x === 0) ? 0 : (x > 0 ? 1 : -1);
            },

            /**
             * Move to next tab
             */
            nextTab() {
                this.setTab(this.currentTab + 1, false, 1);
            },

            /**
             * Move to previous tab
             */
            previousTab() {
                this.setTab(this.currentTab - 1, false, -1);
            },

            /**
             * Set active tab on the tabs collection and the child 'tab' component
             * Index is the tab we want to activate. Direction is the direction we are moving
             * so if the tab we requested is disabled, we can skip over it.
             * Force is used by updateTabs to ensure we have cleared any previous active tabs.
             */
            setTab(index, force, direction) {
                direction = this.sign(direction || 0);
                index = index || 0;

                // Prevent setting same tab and infinite loops!
                if (!force && index === this.currentTab) {
                    return;
                }

                const tab = this.tabs[index];

                // Don't go beyond indexes!
                if (!tab) {
                    // Reset the v-model to the current Tab
                    this.$emit('input', this.currentTab);
                    return;
                }

                // Ignore or Skip disabled
                if (tab.disabled) {
                    if (direction) {
                        // Skip to next non disabled tab in specified direction (recursive)
                        this.setTab(index + direction, force, direction);
                    }
                    return;
                }

                // Activate requested current tab, and deactivte any old tabs
                this.tabs.forEach( t => {
                    if (t === tab) {
                        // Set new tab as active
                        this.$set(t, 'localActive', true);
                    } else {
                        // Ensure non current tabs are not active
                        this.$set(t, 'localActive', false);
                    }
                });

                // Update currentTab
                this.currentTab = index;
            },

            /**
             * Dynamically update tabs list
             */
            updateTabs() {
                // Probe tabs
                this.tabs = this.$children.filter(child => child._isTab);

                // Set initial active tab
                let tabIndex = null;

                // Find *last* active non-dsabled tab in current tabs
                // We trust tab state over currentTab
                this.tabs.forEach((tab, index) => {
                    if (tab.localActive && !tab.disabled) {
                        tabIndex = index;
                    }
                });

                // Else try setting to currentTab
                if (tabIndex === null) {
                    if (this.currentTab >= this.tabs.length) {
                        // Handle last tab being removed
                        this.setTab(this.tabs.length - 1, true, -1);
                        return;
                    } else if (this.tabs[this.currentTab] && !this.tabs[this.currentTab].disabled) {
                        tabIndex = this.currentTab;
                    }
                }

                // Else find *first* non-disabled tab in current tabs
                if (tabIndex === null) {
                    this.tabs.forEach((tab, index) => {
                        if (!tab.disabled && tabIndex === null) {
                            tabIndex = index;
                        }
                    });
                }

                this.setTab(tabIndex || 0, true, 0);
            }
        },
        mounted() {
            this.updateTabs();

            // Observe Child changes so we can notify tabs change
            observeDom(this.$refs.tabsContainer, this.updateTabs.bind(this), {subtree: false});
        }
    };

</script>
