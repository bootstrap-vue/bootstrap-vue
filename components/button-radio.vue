<template>
    <div class="btn-group" data-toggle="buttons">
        <label :class="['btn', btnVariant, btnSize, {disabled:item.disabled, active:selection == item.value}]"
               v-for="item in list">
            <input
                    type="radio"
                    name="options"
                    :value="item.value"
                    autocomplete="off"
                    v-model="selection"
                    :disabled="item.disabled"
                    v-html="item.text"
            />
        </label>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selection: '',
                model: {}
            };
        },
        computed: {
            btnVariant() {
                return !this.variant || this.variant === `default` ? `btn-secondary` : `btn-${this.variant}`;
            },
            btnSize() {
                return !this.size || this.size === `default` ? `` : `btn-${this.size}`;
            }
        },
        props: {
            list: {
                type: Array,
                default: [],
                required: true
            },
            size: {
                type: String,
                default: 'md'
            },
            variant: {
                type: String,
                default: 'default'
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            selection: {
                handler() {
                    // set the model based on selection
                    if (this.returnObject) {
                        this.list.forEach(item => {
                            if (item.value === this.selection) {
                                this.model = item;
                            }
                        });
                    } else {
                        this.model = this.selection;
                    }
                    // Emit an event
                    this.$root.$emit('changed::button-radio', this.model);
                },
                deep: true
            }
        },
        mounted() {
            // handle initial selection
            this.selection = this.model.value;
        }
    };
</script>
