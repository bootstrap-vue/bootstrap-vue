<template>
    <fieldset :class="['form-group',this.stacked?'custom-controls-stacked':'',inputState]">
        <label :class="['custom-control','custom-radio']" v-for="item in items">
            <input
                    v-model="localValue"
                    class="custom-control-input"
                    type="radio"
                    :id="item.id"
                    :name="name"
                    :value="item[valueKey]"
                    :disabled="item.disabled"
            >
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">{{item[textKey]}}</span>
        </label>
    </fieldset>
</template>


<script>
    import {uniqueId} from '../utils/helpers';

    export default {
        data() {
            return {
                localValue: this.value
            };
        },
        computed: {
            inputState() {
                return this.state ? `has-${this.state}` : '';
            }
        },
        props: {
            value: {
                default: null
            },
            valueKey: {
                type: String,
                default: 'value'
            },
            textKey: {
                type: String,
                default: 'text'
            },
            name: {
                type: String,
                default: uniqueId
            },
            items: {
                type: Array,
                default: () => [],
                required: true
            },
            stacked: {
                type: Boolean,
                default: false
            },
            state: {
                type: String,
                default: null
            },
            returnObject: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            localValue(value, old_value) {
                if (value === old_value) {
                    return;
                }
                if (this.returnObject) {
                    this.items.forEach(item => {
                        if (item.value === value) {
                            value = item;
                        }
                    });
                }
                this.$emit('input', value);
            }
        }
    };

</script>
