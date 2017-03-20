window.app = new Vue({
    el: '#app',
    data: {
        name: '',
        names: []
    },
    methods: {
        clearName() {
            this.name = "";
        },
        submit() {
            if (!this.name) {
                /* eslint-disable no-alert */
                alert('Please enter your name');
                return false;
            }
            this.names.push(this.name);
            this.name = '';
        }
    }
});
