window.app = new Vue({
    el: '#app',
    data: {
        fields: {
            name: {
                label: 'Person Full name',
                sortable: true
            },
            age: {
                label: 'Person age',
                sortable: true
            },
            isActive: {
                label: 'is Active'
            },
            actions: {
                label: 'Actions'
            }
        },
        currentPage: 1,
        perPage: 5,
        filter: null,
        items: [{
            isActive: true,
            age: 40,
            name: {
                first: 'Dickerson',
                last: 'Macdonald'
            }

        }, {
            isActive: false,
            age: 21,
            name: {
                first: 'Larsen',
                last: 'Shaw'
            }

        }, {
            isActive: false,
            age: 26,
            state: 'success',
            name: {
                first: 'Mitzi',
                last: 'Navarro'
            }

        }, {
            isActive: false,
            age: 22,
            name: {
                first: 'Geneva',
                last: 'Wilson'
            }

        }, {
            isActive: true,
            age: 38,
            name: {
                first: 'Jami',
                last: 'Carney'
            }

        }, {
            isActive: false,
            age: 27,
            name: {
                first: 'Essie',
                last: 'Dunlap'
            }

        }, {
            isActive: true,
            age: 40,
            name: {
                first: 'Dickerson',
                last: 'Macdonald'
            }

        }, {
            isActive: false,
            age: 21,
            name: {
                first: 'Larsen',
                last: 'Shaw'
            }

        }, {
            isActive: false,
            age: 26,
            name: {
                first: 'Mitzi',
                last: 'Navarro'
            }

        }, {
            isActive: false,
            age: 22,
            name: {
                first: 'Geneva',
                last: 'Wilson'
            }

        }, {
            isActive: true,
            age: 38,
            name: {
                first: 'Jami',
                last: 'Carney'
            }

        }, {
            isActive: false,
            age: 27,
            name: {
                first: 'Essie',
                last: 'Dunlap'
            }

        }]
    },
    methods: {
        details(item) {
            /* eslint-disable no-alert */
            alert(JSON.stringify(item));
        }
    }
});

