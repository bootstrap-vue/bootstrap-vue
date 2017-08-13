window.app = new Vue({
    el: '#app',
    data: {
        items: [{
            text: 'Home',
            link: 'https://bootstrap-vue.github.io'
        }, {
            text: 'Admin',
            to: '#',
            active: false
        }, {
            text: 'Manage',
            link: '#'
        }, {
            text: 'Library',
        }],
        items2: [{
            text: 'Home',
            link: 'https://bootstrap-vue.github.io'
        }, {
            text: 'Admin',
            link: '#',
            active: true
        }, {
            text: 'Manage',
            link: '#'
        }, {
            text: 'Library',
        }]
    },
});
