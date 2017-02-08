<template>
    <div :class="['btn-group',show?'show':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle']"
                  id="dropdownMenuButton"
                  @click="click"
                  aria-haspopup="true"
                  :aria-expanded="show"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled">
            {{text}}
        </b-button>

        <b-button class="dropdown-toggle dropdown-toggle-split"
                  v-if="split"
                  @click="toggle"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        >
            <span class="sr-only">Toggle Dropdown</span>
        </b-button>

        <div :class="['dropdown-menu',right?'dropdown-menu-right':'']" v-if="show">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        props: {
            split: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: null,
            },
            variant: {
                type: String,
                default: null,
            },
            dropup: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false,
            },
        },
        mounted(){
            document.documentElement.addEventListener('click', () => this.setState(false),true);
        },
        methods: {
            toggle(){
                this.setState(!this.show);
            },
            setState(state) {
                if (this.show == state) return; // Avoid duplicated emits
                this.show = state;

                if (this.show) {
                    this.$emit('shown');
                } else {
                    this.$emit('hidden');
                }
            },
            click(){
                if (this.split)
                    this.$emit('click');
                else
                    this.toggle();
            }
        },
    }

</script>
