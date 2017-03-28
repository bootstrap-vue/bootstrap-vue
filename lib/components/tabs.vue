<template>
    <div class="tabs">
        <ul :class="['nav','nav-' + navStyle]">
            <li class="nav-item" v-for="(item, index) in items">
                <a :class="['nav-link',{small: small, active: item.active, disabled: item.disabled}]" href="#" @click.prevent.stop="setActive(index)">
                    {{item.title}}
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        replace: true,
        data() {
            const currentTab = this.value || 0;
            return {
                currentTab,
                items: []
            };
        },
        props: {
            fade: {
                type: Boolean,
                default: true
            },
            small: {
                type: Boolean,
                default: false
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
             * Get an index of an active tab
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
             * Set active tab on the items collection and the child 'tab' component
             */
            setActive(index) {
                // ignore disabled
                if (this.items[index].disabled) {
                    return;
                }

                // Deactivate previous active tab
                const activeTab = this.getActive();
                if (activeTab !== -1) {
                    this.items[activeTab].active = false;
                    this.$set(this.items[activeTab], 'active', false);
                }

                this.$set(this.items[index], 'active', true);
                this.items[index].active = true;
                this.$root.$emit('changed::tab', this.items[index].id);

                // Store currentActive
                this.currentTab = index;
            }
        },
        mounted() {
            const items = this.$slots.default.filter(item => item.componentInstance || false);
            this.items = items.map(item => item.componentInstance);
            this.items.forEach(function (item) {
                this.$set(item, 'fade', this.fade);
            }, this);

            // If no active tab, set the first one by default
            if (this.getActive() === -1) {
                this.setActive(this.currentTab);
            }
        },
        destroyed() {
            clearTimeout(this._tabAnimation);
        }
    };

</script>
