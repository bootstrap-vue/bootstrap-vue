<template>
    <component :is="tag" :id="id || null" class="tabs">
        <div v-if="bottom" :class="['tab-content',{'card-block': card}]" ref="tabsContainer">
            <slot></slot>
            <slot name="empty" v-if="!tabs || !tabs.length"></slot>
        </div>

        <div :class="{'card-header': card}">
            <ul :class="['nav','nav-' + navStyle, card ? 'card-header-'+navStyle : null]"
                role="tablist"
                tabindex="0"
                :aria-setsize="tabs.length"
                :aria-posinset="currentTab + 1"
                @keydown.left="previousTab"
                @keydown.up="previousTab"
                @keydown.right="nextTab"
                @keydown.down="nextTab"
                @keydown.shift.left="setTab(-1,false,1)"
                @keydown.shift.up="setTab(-1,false,1)"
                @keydown.shift.right="setTab(tabs.length,false,-1)"
                @keydown.shift.down="setTab(tabs.length,false,-1)"
            >
                <li class="nav-item" v-for="(tab, index) in tabs" role="presentation">
                    <a :class="['nav-link',{small: small, active: tab.localActive, disabled: tab.disabled}]"
                       :href="tab.href"
                       role="tab"
                       :aria-selected="tab.localActive ? 'true' : 'false'"
                       :aria-controls="tab.id || null"
                       :id="tab.controlledBy || null"
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

        <div v-if="!bottom" :class="['tab-content',{'card-block': card}]" ref="tabsContainer">
            <slot></slot>
            <slot name="empty" v-if="!tabs || !tabs.length"></slot>
        </div>
    </component>
</template>

<script>
    import observeDom from '../utils/observe-dom';

    export default {
        data() {
            return {
                currentTab: this.value,
                tabs: []
            };
        },
        props: {
            id: {
                type: String,
                default: ''
            },
            tag: {
                type: String,
                default: 'div'
            },
            noFade: {
                type: Boolean,
                default: false
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
                default: 0
            },
            pills: {
                type: Boolean,
                default: false
            },
            lazy: {
                type: Boolean,
                default: false
            },
            bottom: {
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

                this.setTab(val);
            },
            fade(val, old) {
                if (val === old) {
                    return;
                }

                this.tabs.forEach(item => {
                    this.$set(item, 'fade', val);
                });
            }
        },
        computed: {
            fade() {
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
                this.setTab(this.currentTab, false, 1);
            },

            /**
             * Move to previous tab
             */
            previousTab() {
                this.setTab(this.currentTab, false, -1);
            },

            /**
             * Set active tab on the tabs collection and the child 'tab' component
             */
            setTab(index, force, offset) {
                offset = offset || 0;

                // Prevent setting same tab!
                if (!force && (index + offset) === this.currentTab) {
                    return;
                }

                const tab = this.tabs[index + offset];

                // Don't go beyond indexes!
                if (!tab) {
                    return;
                }

                // Ignore or Skip disabled
                if (tab.disabled) {
                    if (offset) {
                        // Skip to next non disabled tab in offset direction (recursive)
                        this.setTab(index, force, offset + this.sign(offset));
                    }
                    return;
                }

                // Deactivate any previous active tab(s)
                this.tabs.forEach( t => {
                    if (t !== tab && t.localActive) {
                        this.$set(t, 'localActive', false);
                    }
                });

                // Set new tab as active
                this.$set(tab, 'localActive', true);

                // Update currentTab
                this.currentTab = index + offset;
            },

            /**
             * Dynamically update tabs
             */
            updateTabs() {
                // Probe tabs
                if (this.$slots.default) {
                    this.tabs = this.$slots.default.filter(tab => tab.componentInstance || false)
                        .map(tab => tab.componentInstance);
                } else {
                    this.tabs = [];
                }

                this.tabs.forEach(tab => {
                    this.$set(tab, 'fade', this.fade);
                    this.$set(tab, 'lazy', this.lazy);
                });

                // Get initial active tab
                let tabIndex = this.currentTab;

                if (tabIndex === null || tabIndex === undefined) {
                    // Find last active tab in current tabs
                    this.tabs.forEach((tab, index) => {
                        if (tab.active) {
                            tabIndex = index;
                        }
                    });
                }

                // Workaround to fix problem when currentTab is removed
                let offset = 0;
                if (tabIndex > this.tabs.length - 1) {
                    offset = -1;
                }

                this.setTab(tabIndex || 0, true, offset);
            }
        },
        mounted() {
            this.updateTabs();

            // Observe Child changes so we can notify tabs change
            observeDom(this.$refs.tabsContainer, this.updateTabs.bind(this), {subtree: false});
        }
    };

</script>
