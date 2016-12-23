<template>
    <div :class="['btn-group',open?'open':'',dropup?'dropup':'']">

        <b-button :class="[split?'':'dropdown-toggle']"
                  id="dropdownMenuButton"
                  @click="click"
                  aria-haspopup="true"
                  :aria-expanded="open"
                  :variant="variant"
                  :size="size"
                  :disabled="disabled"
        >
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

        <div :class="['dropdown-menu',right?'dropdown-menu-right':'']" v-if="open">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                open: false
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
                this.setState(!this.open);
            },
            setState(state) {
                if (this.open == state) return; // Avoid duplicated emits
                this.open = state;

                if (this.open) {
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