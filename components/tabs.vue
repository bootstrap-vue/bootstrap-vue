<template>
    <div class="tabs">
        <ul :class="['nav','nav-' + navStyle]">
            <li class="nav-item" v-for="(item,index) in items" @click="setActive(index)">
                <span :class="['nav-link','btn',btnSize,item.active ? 'active' : '',item.disabled ? 'disabled' : '']">
                    {{item.title}}
                </span>
            </li>
        </ul>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {csstransitions} from '../utils/helpers';

    // this is directly linked to the bootstrap animation timing in _tabs.scss
    // for browsers that do not support transitions like IE9 just change slide immediately
    const TRANSITION_DURATION = csstransitions() ? 150 : 0;

    // export component object
    export default {
        replace: true,
        data() {
            const currentTab = this.value || 0;
            return {
                currentTab,
                items: []
            };
        },
        computed: {
            btnSize() {
                return !this.size || this.size === 'default' ? '' : `btn-${this.size}`;
            }
        },
        props: {
            fade: {
                type: Boolean,
                default: true
            },
            size: {
                type: String,
                default: 'md'
            },
            value: {
                type: Number,
                default: 0
            },
            navStyle: {
                type: String,
                default: 'tabs'
            }
        },
        watch: {
            currentTab(val) {
                this.$emit('input', val);
            },
            value(val) {
                this.setActive(val);
            }
        },
        methods: {

            /**
             * get an index of an active tab
             * @return {Number}
             */
            getActive() {
                let active = -1;
                this.items.forEach((item, index) => {
                    if (item.active) {
                        active = index;
                    }
                });
                return active;
            },

            /**
             * set active tab on the items collection and the child 'tab' component
             */
            setActive(index) {
                // ignore disabled
                if (this.items[index].disabled) {
                    return;
                }

                // deactivate previous active tab
                const activeTab = this.getActive();
                if (activeTab !== -1) {
                    // setting animate to false will trigger fade out effect
                    this.items[activeTab].active = false;
                    this.$set(this.$children[activeTab], 'animate', false);
                    this.$set(this.$children[activeTab], 'active', false);
                }

                // set new active tab and animate (if fade flag is set to true)
                this.$set(this.$children[index], 'active', true);
                this._tabAnimation = setTimeout(() => {
                    // setting animate to true will trigger fade in effect
                    this.items[index].active = true;
                    this.$set(this.$children[index], 'animate', true);
                    this.$root.$emit('changed::tab', this.items[index].id);
                }, this.fade ? TRANSITION_DURATION : 0);

                // store currentActive
                this.currentTab = index;
            }
        },
        mounted() {
            // if no active tab, set the first one by default
            if (this.getActive() === -1) {
                this.setActive(this.currentTab);
            }
        },
        destroyed() {
            clearTimeout(this._tabAnimation);
        }
    };

</script>
