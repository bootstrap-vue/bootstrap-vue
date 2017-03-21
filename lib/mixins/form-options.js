export default {
    computed: {
        formOptions() {
            let options = this.options || {};

            if (Array.isArray(options)) {
                // Normalize flat arrays to object array
                options = options.map(option => {
                    if (typeof option === 'object') {
                        return option || {}; // Type of null is object
                    }

                    return {text: String(option), value: option || {}};
                });
            } else {
                // Normalize Objects to Array
                options = Object.keys(options).map(value => {
                    let option = options[value] || {};

                    // Resolve text
                    if (typeof option !== 'object') {
                        option = {text: String(option)};
                    }
                    // Resolve value
                    if (!option.value) {
                        option.value = value;
                    }
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
    watch: {
        localValue(value, old_value) {
            if (value === old_value) {
                return;
            }
            this.$emit('input', this.selectedValue);
        }
    }
};
