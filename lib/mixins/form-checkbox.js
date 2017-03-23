export default {
    computed: {
        checkboxClass() {
            return {
                'custom-control': this.custom,
                'form-check-inline': this.inline
            };
        }
    }
};

