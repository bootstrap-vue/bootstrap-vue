import { isArray } from '../utils/array';
import { keys } from '../utils/object';

export default {
    props: {
        options: {
            type: [Array, Object],
            default() { 
                return [];
            }
        },
        valueField: {
            type: String,
            default: 'value'
        },
        textField: {
            type: String,
            default: 'text'
        },
        disabledField: {
            type: String,
            default: 'disabled'
        }
    },
    computed: {
        formOptions() {
            let options = this.options || [];

            if (isArray(options)) {
                // Normalize flat arrays to Array of Objects
                options = options.map(option => {
                    if (typeof option === 'object') {
                        return {
                            value: option[this.valueField],
                            text: option[this.textField],
                            disabled: option[this.disabledField] || false
                        };
                    }

                    return {
                        text: String(option),
                        value: option,
                        disabled: false
                    };
                });
            } else {
                // Normalize Objects keys to Array of Objects
                options = keys(options).map(key => {
                    let option = options[key] || {};

                    // Resolve text
                    if (typeof option !== 'object') {
                        option = {[this.textField]: String(option)};
                    }
                    // Resolve text field (uses key as text if not provided)
                    if (option[this.textField] === 0) {
                        option.text = option[this.textField];
                    } else {
                        option.text = option[this.textField] || key;
                    }

                    // Resolve value (uses null/undef value if not provided)
                    option.value = option[this.valueField];

                    // Resolve disabled
                    option.disabled = option[this.disabledField] || false;

                    return option;
                });
            }
            // Return nomalized options array
            return options;
        }
    }
};
