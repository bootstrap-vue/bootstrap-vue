new Vue({
    el: '#app',
    data: {
        value: 'third',
        items: [{
            text: 'Toggle this custom radio',
            value: 'first'
        }, {
            text: 'Or toggle this other custom radio',
            value: 'second'
        }, {
            text: 'This one is Disabled',
            value: 'third',
            disabled: true
        }]
    },
});
