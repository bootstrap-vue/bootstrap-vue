<template>
    <b-link :class="['dropdown-item',{ disabled }]"
            :to="to"
            :href="href"
            :disabled="disabled"
            tabindex="-1"
            role="menuitem"
            @click="dropdown_click"
            @click.native="dropdown_click"
    >
        <slot></slot>
    </b-link>
</template>

<script>
    import bLink from './link.vue';

    export default {
        extends: bLink,
        components: {bLink},
        methods: {
            dropdown_click(e) {
                if (!this.disabled) {
                    this.$root.$emit('shown::dropdown', this);
                }

                this.click(e);
            }
        }
    };
</script>
