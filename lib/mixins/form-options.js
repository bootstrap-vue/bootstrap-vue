import isArray from '../utils/isArray';

export default {
    computed: {
        formOptions() {
            let options = this.options || {};

            if (isArray(options)) {
                // Normalize flat arrays to object Array
                options = options.map(option => {
                    if (typeof option === 'object') {
                        return {
                            value: option[this.valueField],
                            text: option[this.textField],
                            disabled: option.disabled || false
                        };
                    }

                    return {text: String(option), value: option || {}};
                });
            } else {
                // Normalize Objects keys to Array
                options = Object.keys(options).map(value => {
                    let option = options[value] || {};

                    // Resolve text
                    if (typeof option !== 'object') {
                        option = {text: String(option)};
                    }

                    // Resolve value (uses key as value if not provided)
                    option.value = option[this.valueField] || value;
                    
                    // Resolve text field (uses key as value if not provided)
                    option.text = option[this.textField] || value;

                    return option;
                });
            }

            return options;
        },
        selectedValue() {
            const formOptions = this.formOptions;
            for (let i = 0; i < formOptions.length; i++) {
                if (formOptions[i].value === this.localValue) {
                    if (this.returnObject) {
                        return formOptions[i];
                    }
                    return formOptions[i].value;
                }
            }
        }
    },
    props: {
        valueField: {
            type: [String],
            default: 'value'
        },
        textField: {
            type: [String],
            default: 'text'
        }
    },
    watch: {
        localValue(value, old_value) {
            if (value === old_value) {
                return;
            }
            this.$emit('input', this.selectedValue);
        },
        value(value, old_value) {
            if (value === old_value) {
                return;
            }
            this.localValue = value;
        }
    }
};
