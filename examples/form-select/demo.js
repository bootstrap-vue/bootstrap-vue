new Vue({
    el: '#app',
    data: {
        selected: 'default',
        defaultOption: {
            text: 'Please select some item',
            value: 'default'
        },
        options: [{
            text: 'This is First option',
            value: 'a'
        }, {
            text: 'Default Selected Option',
            value: 'b'
        }, {
            text: 'This is another option',
            value: 'c'
        }, {
            text: 'This one is disabled',
            value: 'd',
            disabled: true
        }]
    },
});
