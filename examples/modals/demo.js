new Vue({
    el: '#app',
    data: {
        name: '',
        names: [],
    },
    methods: {
        onSave() {
            if (!this.name) {
                alert('Please enter your name');
                return false;
            }
            this.names.push(this.name);
            this.name = '';
        }
    }
});
