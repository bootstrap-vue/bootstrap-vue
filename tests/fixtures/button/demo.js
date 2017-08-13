window.app = new Vue({
    el: '#app',
    methods: {
        handleClick(event) {
            alert('You clicked, I listened.')
        },
    },
    data: {
        btnToggle: null
    }
});
