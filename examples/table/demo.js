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
        selectedRecords: [],
        visibleRecords: [],
        isBusy: false,
        providerType: 'array',
        items: [
            {
                isActive: true,
                age: 40,
                name: { first: 'Dickerson', last: 'Macdonald' }
            }, {
                isActive: false,
                age: 21,
                name: { first: 'Larsen', last: 'Shaw' }
            }, {
                isActive: false,
                age: 26,
                _rowVariant: 'success',
                name: { first: 'Mitzi', last: 'Navarro' }
            }, {
                isActive: false,
                age: 22,
                name: { first: 'Geneva', last: 'Wilson' }
            }, {
                isActive: true,
                age: 38,
                name: { first: 'Jami', last: 'Carney'  }
            }, {
                isActive: false,
                age: 27,
                name: { first: 'Essie', last: 'Dunlap' }
            }, {
                isActive: true,
                age: 65,
                name: { first: 'Alfred', last: 'Macdonald' }
            }, {
                isActive: false,
                age: 21,
                name: { first: 'Lauren', last: 'Shaw' }
            }, {
                isActive: false,
                age: 29,
                name: { first: 'Mini', last: 'Navarro' }
            }, {
                isActive: false,
                age: 22,
                name: { first: 'Frank', last: 'Wilson' }
            }, {
                isActive: true,
                age: 38,
                name: { first: 'Jami-Lee', last: 'Curtis' }
            }, {
                isActive: false,
                age: 72,
                name: { first: 'Elsie', last: 'Dunlap' }
            }
        ]
    },
    methods: {
        details(item) {
            /* eslint-disable no-alert */
            alert(JSON.stringify(item));
        },
        provider(ctx, cb) {
            const items = this.items.slice();
            if (this.providerType === 'callback') {
                setTimeout(() => {
                    cb(items);
                }, 1)
                return;
            } else if (this.providerType === 'promise') {
                const p = new Promise(resolve => setTimeout(resolve, 1));
                return p.then(() => {
                   return items;
                });
            } else {
                return items;
            }
        }
    }
});

