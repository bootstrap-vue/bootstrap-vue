<template>
    <div class="tabs">
        <div v-if="bottom" :class="['tab-content',{'card-block': card}]" ref="tabsContainer">
            <slot></slot>
            <slot name="empty" v-if="!tabs || !tabs.length"></slot>
        </div>

        <div :class="{'card-header': card}">
            <ul :class="['nav','nav-' + navStyle, card? 'card-header-'+navStyle: null]">
                <li class="nav-item" v-for="(tab, index) in tabs">
                    <a :class="['nav-link',{small: small, active: tab.localActive, disabled: tab.disabled}]"
                       :href="tab.href"
                       @click.prevent.stop="setTab(index)"
                       v-if="!tab.headHtml"
                        v-html="tab.title"
                    ></a>
                    <div :class="['tab-head',{small: small, active: tab.localActive, disabled: tab.disabled}]"
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
    </div>
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
             * Move to next tab
             */
            nextTab() {
                this.setTab(this.currentTab + 1);
            },

            /**
             * Move to previous tab
             */
            previousTab() {
                this.setTab(this.currentTab - 1);
            },

            /**
             * Set active tab on the tabs collection and the child 'tab' component
             */
            setTab(index, force) {
                // Prevent setting same tab!
                if (!force && index === this.currentTab) {
                    return;
                }

                const tab = this.tabs[index];

                // Don't go beyond indexes!
                if (!tab) {
                    return;
                }

                // Ignore disabled
                if (tab.disabled) {
                    return;
                }

                // Deactivate previous active tab
                if (this.tabs[this.currentTab]) {
                    this.$set(this.tabs[this.currentTab], 'localActive', false);
                }

                // Set new tab as active
                this.$set(tab, 'localActive', true);

                // Update currentTab
                this.currentTab = index;
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

                // Set initial active tab
                let tabIndex = this.currentTab;

                if (this.currentTab === null || this.currentTab === undefined) {
                    this.tabs.forEach((tab, index) => {
                        if (tab.active) {
                            tabIndex = index;
                        }
                    });
                }

                // Workaround to fix problem when currentTab is removed
                if (tabIndex > this.tabs.length - 1) {
                    tabIndex = this.tabs.length - 1;
                }

                this.setTab(tabIndex || 0, true);
            }
        },
        mounted() {
            this.updateTabs();

            // Observe Child changes so we can notify tabs change
            observeDom(this.$refs.tabsContainer, this.updateTabs.bind(this), {subtree: false});
        }
    };

</script>
