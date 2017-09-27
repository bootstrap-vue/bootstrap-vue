<template>
    <component :is="tag" :id="safeId()" :class="['tabs', 'tabs-'+position]">
        <b-row>
            <b-col cols="12" :class="[{'order-12': computedPosition === 'right'||computedPosition === 'bottom','card-header': card && position !== 'bottom','card-footer': card && position === 'bottom'}]">
                <ul :class="['nav','nav-' + navStyle,card && position !== 'bottom' ? 'card-header-'+navStyle : null,card && position === 'bottom' ? 'card-footer-'+navStyle : null,{'flex-column': isVertical}]"
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
            </b-col>

            <b-col cols="12" :id="safeId('_BV_tab_container_')" :class="['tab-content',{'card-block': card && !isVertical,'card-content': card && isVertical}]" ref="tabsContainer">
                <slot></slot>
                <slot name="empty" v-if="!tabs || !tabs.length"></slot>
            </b-col>
        </b-row>
    </component>
</template>

<script>
    import {observeDom} from '../utils';
    import {idMixin} from '../mixins';
    import bContainer from './container';
    import bRow from './row';
    import bCol from './col';

    export default {
        mixins: [idMixin],
        components: {bContainer, bRow, bCol},
        data() {
            return {
                currentTab: this.value,
                tabs: []
            };
        },
        props: {
            tag: {
                type: String,
                default: 'b-container'
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
            },
            position: {
                type: String,
                default: 'top'
            },
            verticalColumnClass: {
                type: String
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
            },
            isVertical() {
                return this.position === 'left' || this.position === 'right'
            },
            computedPosition() {
                if (this.bottom) {
                    warn('b-tabs: prop bottom has been deprecated. Use position="bottom" instead')
                    return 'bottom'
                }

                return this.position
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

<style lang="scss">
@import "../../node_modules/bootstrap/scss/_functions.scss";
@import "../../node_modules/bootstrap/scss/_variables.scss";
@import "../../node_modules/bootstrap/scss/mixins/_hover.scss";
@import "../../node_modules/bootstrap/scss/mixins/_border-radius.scss";

.tabs-bottom {
  .nav-tabs {
    border-bottom: 0;
    border-top: $nav-tabs-border-width solid $nav-tabs-border-color;

    .nav-item {
      margin-bottom: 0;
      margin-top: -$nav-tabs-border-width;
    }

    .nav-link {
      @include border-top-radius(0);
      @include border-bottom-radius($nav-tabs-border-radius);

      @include hover-focus {
        border-color: $nav-tabs-link-hover-border-color $nav-tabs-link-hover-border-color $nav-tabs-border-color;
      }

      &.disabled {
        color: $nav-link-disabled-color;
        background-color: transparent;
        border-color: transparent;
      }
    }

    .dropdown-menu {
      // Make dropdown border overlap tab border
      margin-top: 0;
      margin-bottom: -$nav-tabs-border-width;
      // Remove the top rounded corners here since there is a hard edge above the menu
      @include border-bottom-radius(0);
      @include border-top-radius($nav-tabs-border-radius);
    }
  }

  .card-footer {
    padding: $card-spacer-y $card-spacer-x;
    background-color: $card-cap-bg;
    border-top: $card-border-width solid $card-border-color;

    &:last-child {
      @include border-radius(0 0 $card-inner-border-radius $card-inner-border-radius);
    }
  }

  .card-footer-tabs {
    margin-right: -($card-spacer-x / 2);
    margin-top: -$card-spacer-y;
    margin-left: -($card-spacer-x / 2);
    border-top: 0;
  }
}

.tabs-left {
  .nav-tabs {
    border-bottom: 0;
    border-right: $nav-tabs-border-width solid $nav-tabs-border-color;

    .nav-item {
      margin-bottom: 0;
      margin-right: -$nav-tabs-border-width;
    }

    .nav-link {
      @include border-top-radius(0);
      @include border-left-radius($nav-tabs-border-radius);
    }

    .dropdown-menu {
      // Make dropdown border overlap tab border
      margin-top: 0;
      margin-bottom: -$nav-tabs-border-width;
      // Remove the top rounded corners here since there is a hard edge above the menu
      @include border-top-radius($nav-tabs-border-radius);
      @include border-bottom-radius(0);
    }
  }

  .card-header {
    padding: $card-spacer-x ($grid-gutter-width / 2) $card-spacer-x ($grid-gutter-width / 2);
    margin-left: ($grid-gutter-width / 2);
    margin-right: 0; // Removes the default margin-bottom of <hN>
    border-bottom: 0;
    border-right: $card-border-width solid $card-border-color;

    &:first-child {
      @include border-radius($card-inner-border-radius 0 0 $card-inner-border-radius);
    }
  }

  .card-header-tabs {
    margin-top: -($card-spacer-x / 2);
    margin-right: -($grid-gutter-width / 2);
    margin-bottom: -($card-spacer-x / 2);
    border-right: 0;
  }

  .tab-content {
    margin-right: ($grid-gutter-width / 2);
    padding-left: ($grid-gutter-width / 2);
    padding-right: ($grid-gutter-width / 2);
  }

  .card-content {
    padding-top: $card-spacer-x;
    padding-bottom: $card-spacer-x;
  }
}

.tabs-right {
  .nav-tabs {
    border-bottom: 0;
    border-left: $nav-tabs-border-width solid $nav-tabs-border-color;

    .nav-item {
      margin-bottom: 0;
      margin-left: -$nav-tabs-border-width;
    }

    .nav-link {
      @include border-top-radius(0);
      @include border-right-radius($nav-tabs-border-radius);
    }

    .dropdown-menu {
      // Make dropdown border overlap tab border
      margin-top: 0;
      margin-bottom: -$nav-tabs-border-width;
      // Remove the top rounded corners here since there is a hard edge above the menu
      @include border-top-radius($nav-tabs-border-radius);
      @include border-bottom-radius(0);
    }
  }

  .card-header {
    padding: $card-spacer-x ($grid-gutter-width / 2) $card-spacer-x ($grid-gutter-width / 2);
    margin-right: ($grid-gutter-width / 2);
    margin-left: 0; // Removes the default margin-bottom of <hN>
    border-bottom: 0;
    border-left: $card-border-width solid $card-border-color;

    &:first-child {
      @include border-radius(0 $card-inner-border-radius $card-inner-border-radius 0);
    }
  }

  .card-header-tabs {
    margin-top: -($card-spacer-x / 2);
    margin-left: -($grid-gutter-width / 2);
    margin-bottom: -($card-spacer-x / 2);
    border-left: 0;
  }

  .tab-content {
    margin-left: ($grid-gutter-width / 2);
    padding-left: ($grid-gutter-width / 2);
    padding-right: ($grid-gutter-width / 2);
  }

  .card-content {
    padding-top: $card-spacer-x;
    padding-bottom: $card-spacer-x;
  }
}
</style>
