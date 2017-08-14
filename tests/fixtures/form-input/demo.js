window.app = new Vue({
    el: '#app',
    data: {
        text: ''
    },
    methods: {
        format(value) {
            return value.toLowerCase();
        }
    }
});
