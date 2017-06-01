import {loadFixture, testVM} from '../helpers';

describe('table', async() => {
    beforeEach(loadFixture('table'));
    testVM();

    it('all example tables should contain class names', async() => {
        const { app: { $refs, $el } } = window

        expect($refs.table_basic).toHaveAllClasses([
            'table', 'b-table', 'table-striped', 'table-hover'
        ])

        expect($refs.table_paginated).toHaveAllClasses([
            'table', 'b-table', 'table-sm', 'table-striped', 'table-bordered', 'table-hover', 'table-responsive'
        ])

        expect($refs.table_inverse).toHaveAllClasses([
            'table', 'b-table', 'table-sm', 'table-bordered', 'table-inverse'
        ])
    })
    
    it('all example tables should have ARIA role="grid"', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach(table => {
            expect($refs[table].$el.getAttribute('role')).toBe('grid')
        })
    })

    it('all example tables should have attribute aria-busy="false"', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach(table => {
            expect($refs[table].$el.getAttribute('aria-busy')).toBe('false')
        })
    })

    it('table_basic should have thead and tbody', async() => {
        const { app: { $refs, $el } } = window

        const parts = [...$refs.table_basic.$el.children]

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead).toBeDefined()

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot).not.toBeDefined()
    })

    it('table_paginated should have thead, tbody and tfoot', async() => {
        const { app: { $refs, $el } } = window

        const parts = [...$refs.table_paginated.$el.children]

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead).toBeDefined()

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined()
    })

    it('table_inverse should have thead and tbody', async() => {
        const { app: { $refs, $el } } = window

        const parts = [...$refs.table_inverse.$el.children]

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead).toBeDefined()

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot).not.toBeDefined()
    })

    it('table_paginated thead should contain class thead-inverse', async() => {
        const { app: { $refs, $el } } = window
        const thead = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'THEAD')
        expect(thead).toBeDefined();
        if (thead) {
            expect(thead.classList.contains('thead-inverse')).toBe(true)
        }
    })

    it('table_paginated tfoot should contain class thead-default', async() => {
        const { app: { $refs, $el } } = window
        const tfoot = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined();
        if (tfoot) {
            expect(tfoot.classList.contains('thead-default')).toBe(true)
        }
    })

    it('all examples have correct number of columns', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach((table, idx) => {
            const vm = $refs[table]
            const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD')
            expect(thead).toBeDefined();
            if (thead) {
                const tr = [...thead.children].find(el => el && el.tagName === 'TR')
                expect(tr).toBeDefined()
                if (tr) {
                    expect(tr.children.length).toBe(Object.keys(vm.fields).length)
                }
            }
        })

    })

    it('all examples should show the correct number of visible rows', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach((table, idx) => {
            const vm = $refs[table]
            const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
            expect(tbody).toBeDefined()
            if (tbody) {
                expect(tbody.children.length).toBe(vm.perPage || app.items.length)
            }
        })

    })

    it('all examples have sortable & unsortable headers', async() => {
        const { app: { $refs, $el } } = window
        
        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]
        const sortables = [ true, true, false, false ]

        tables.forEach( table => {
            const vm = $refs[table]
            const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD')
            expect(thead).toBeDefined()
            if (thead) {
                const tr = [...thead.children].find(el => el && el.tagName === 'TR')
                expect(tr).toBeDefined()
                if (tr) {
                    const fieldKeys = Object.keys(vm.fields)
                    const ths = [...tr.children]
                    expect(ths.length).toBe(fieldKeys.length)
                    ths.forEach((th, idx) => {
                        expect(th.classList.contains('sorting')).toBe(vm.fields[fieldKeys[idx]].sortable || false)
                    })
                }
            }
        })
    })

    it('table_paginated has sortable & unsortable footers', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const fieldKeys = Object.keys(vm.fields)

        const tfoot = [...vm.$el.children].find(el => el && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined()
        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                const ths = [...tr.children]
                expect(ths.length).toBe(fieldKeys.length)
                ths.forEach((th, idx) => {
                    expect(th.classList.contains('sorting')).toBe(vm.fields[fieldKeys[idx]].sortable || false)
                })
            }
        }
    })

    it('sortable columns should have ARIA labels in thead', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const ariaLabel = vm.labelSortDesc

        const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD')
        expect(thead).toBeDefined()
        if (thead) {
            const tr = [...thead.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].getAttribute('aria-label')).toBe(ariaLabel)
                expect(tr.children[1].getAttribute('aria-label')).toBe(ariaLabel)
                expect(tr.children[2].getAttribute('aria-label')).toBe(null)
                expect(tr.children[3].getAttribute('aria-label')).toBe(null)
            }
        }
    })

    it('sortable columns should have ARIA labels in tfoot', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const ariaLabel = vm.labelSortDesc

        const tfoot = [...vm.$el.children].find(el => el && el.tagName === 'THEAD')
        expect(tfoot).toBeDefined()
        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].getAttribute('aria-label')).toBe(ariaLabel)
                expect(tr.children[1].getAttribute('aria-label')).toBe(ariaLabel)
                expect(tr.children[2].getAttribute('aria-label')).toBe(null)
                expect(tr.children[3].getAttribute('aria-label')).toBe(null)
            }
        }
    })

    it('each data row should have ARIA role "row"', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            const trs = [...tbody.children]
            expect(trs.length).toBe(vm.perPage)
            trs.forEach( tr => {
                expect(tr.getAttribute('role')).toBe('row')
            })
        }
    })

    it('all examples should have variant success on 3rd row', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]
        const classes = [ 'table-success', 'table-success', 'bg-success' ]

        tables.forEach((table, idx) => {
            const tbody = [...$refs[table].$el.children].find(el => el && el.tagName == 'TBODY')
            expect(tbody).toBeDefined();
            if (tbody) {
                const tr = tbody.children[2]
                expect(Boolean(tr) && Boolean(tr.classList) && tr.classList.contains(classes[idx])).toBe(true)
            }
        });

    })

    it('table_basic should contain custom formated columns', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app
        const vm = $refs.table_basic

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            const tr = [...tbody.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].textContent).toContain(vm.items[0].name.first + ' ' + vm.items[0].name.last)
                expect(tr.children[1].textContent).toContain(String(vm.items[0].age))
                expect(tr.children[3].children[0].tagName).toBe('BUTTON')
            }
        }
    })

    it('table_paginated should contain custom formated columns', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app
        const vm = $refs.table_basic

        const tbody = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            const tr = [...tbody.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].textContent).toContain(vm.items[0].name.first + ' ' + vm.items[0].name.last)
                expect(tr.children[1].textContent).toContain(String(vm.items[0].age))
                expect(tr.children[3].children[0].tagName).toBe('INPUT')
            }
        }
    })

    it('table_paginated should contain custom formated headers', async() => {
        const { app: { $refs, $el } } = window

        const thead = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'THEAD')
        expect(thead).toBeDefined()
        if (thead) {
            const tr = [...thead.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].textContent).toContain('Person Full name')
                expect(tr.children[1].textContent).toContain('Person age')
                expect(tr.children[2].textContent).toContain('is Active')
                expect(tr.children[3].textContent).toContain('Select')
            }
        }
    })

    it('table_paginated should contain custom formated footers', async() => {
        const { app: { $refs, $el } } = window

        const tfoot = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined()
        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                expect(tr.children[0].textContent).toContain('Showing 5 People')
                expect(tr.children[1].textContent).toContain('Person age')
                expect(tr.children[2].textContent).toContain('is Active')
                expect(tr.children[3].textContent).toContain('Selected: 0')
            }
        }
    })

    it('each data row should emit a row-clicked event with the item,index when clicked', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const spy = jest.fn()

        vm.$on('row-clicked', spy)
        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY');
        expect(tbody).toBeDefined();
        if (tbody) {
            const trs = [...tbody.children]
            expect(trs.length).toBe(vm.perPage)
            trs.forEach((tr, idx) => {
                tr.click()
                expect(spy).toHaveBeenCalledWith(vm.value[idx], idx)
            })
        }
    })

    it('each header th should emit a head-clicked event with key,field when clicked', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const spy = jest.fn()
        const fieldKeys = Object.keys(vm.fields)

        vm.$on('head-clicked', spy)
        const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD');
        expect(thead).toBeDefined()
        if (thead) {
            const tr = [...thead.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                const ths = [...tr.children]
                expect(ths.length).toBe(fieldKeys.length)
                ths.forEach((th, idx) => {
                    th.click()
                    expect(spy).toHaveBeenCalledWith(fieldKeys[idx], vm.fields[fieldKeys[idx]])
                })
            }
        }
    })

    it('each footer th should emit a head-clicked event with key,field when clicked', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const spy = jest.fn()
        const fieldKeys = Object.keys(vm.fields)

        vm.$on('head-clicked', spy)
        const tfoot = [...vm.$el.children].find(el => el && el.tagName === 'TFOOT');
        expect(tfoot).toBeDefined()
        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                const ths = [...tr.children]
                expect(ths.length).toBe(fieldKeys.length)
                ths.forEach((th, idx) => {
                    th.click()
                    expect(spy).toHaveBeenCalledWith(fieldKeys[idx], vm.fields[fieldKeys[idx]])
                })
            }
        }
    })

    it('sortable header th should emit a sort-changed event with context when clicked and sort changed', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const spy = jest.fn()
        const fieldKeys = Object.keys(vm.fields);

        vm.$on('sort-changed', spy)
        const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD');
        expect(thead).toBeDefined();
        if (thead) {
            const tr = [...thead.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                let sortBy = null
                const ths = [...tr.children]
                expect(ths.length).toBe(fieldKeys.length)
                ths.forEach((th, idx) => {
                    th.click()
                    if (vm.fields[fieldKeys[idx]].sortable) {
                        expect(spy).toHaveBeenCalledWith(vm.context)
                        expect(vm.context.sortBy).toBe(fieldKeys[idx])
                        sortBy = vm.context.sortBy
                    } else {
                        if (sortBy) {
                            expect(spy).toHaveBeenCalledWith(vm.context)
                            expect(vm.context.sortBy).toBe(null)
                            sortBy = null
                        } else {
                            expect(spy).not.toHaveBeenCalled()
                            expect(vm.context.sortBy).toBe(null)
                        }
                    }
                    spy.mockClear()
                })
            }
        }
    })

    it('sortable footer th should emit a sort-changed event with context when clicked and sort changed', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const spy = jest.fn()
        const fieldKeys = Object.keys(vm.fields);

        vm.$on('sort-changed', spy)
        const tfoot = [...vm.$el.children].find(el => el && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined()
        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                let sortBy = null
                const ths = [...tr.children]
                expect(ths.length).toBe(fieldKeys.length)
                ths.forEach((th, idx) => {
                    th.click()
                    if (vm.fields[fieldKeys[idx]].sortable) {
                        expect(spy).toHaveBeenCalledWith(vm.context)
                        expect(vm.context.sortBy).toBe(fieldKeys[idx])
                        sortBy = vm.context.sortBy
                    } else {
                        if (sortBy) {
                            expect(spy).toHaveBeenCalledWith(vm.context)
                            expect(vm.context.sortBy).toBe(null)
                            sortBy = null
                        } else {
                            expect(spy).not.toHaveBeenCalled()
                            expect(vm.context.sortBy).toBe(null)
                        }
                    }
                    spy.mockClear()
                })
            }
        }
    })

    it('table_paginated pagination works', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const app = window.app

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            expect(app.items.length > 1).toBe(true)
            
            app.currentPage = 1
            app.perPage = app.items.length - 1
            
            expect(tbody.children.length).toBe(vm.perPage)
            expect(vm.value.length).toBe(vm.perPage)

            app.currentPage = 2
            expect(tbody.children.length).toBe(1)
            expect(vm.value.length).toBe(1)
        }
    })

    it('table_paginated filtering works', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const app = window.app

        expect(vm.showEmpty).toBe(true)
        
        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            expect(app.items.length > 1).toBe(true)
            
            app.currentPage = 1
            app.perPage = app.items.length
            
            expect(tbody.children.length).toBe(app.items.length)
            expect(vm.value.length).toBe(app.items.length)

            app.filter = app.items[0].name.last
            expect(tbody.children.length < app.items.length).toBe(true)
            expect(vm.value.length < app.items.length).toBe(true)
            
            // Empty filter alert
            app.filter = 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
            expect(tbody.children.length).toBe(1)
            expect(vm.value.length).toBe(0)
            expect(tbody.textContent).toContain(vm.emptyFilteredText)
        }
    })

    it('table_paginated shows empty message when no items', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const app = window.app

        expect(vm.showEmpty).toBe(true)

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            expect(app.items.length > 1).toBe(true)
            
            app.currentPage = 1
            app.perPage = app.items.length
            
            expect(tbody.children.length).toBe(app.items.length)
            expect(vm.value.length).toBe(app.items.length)

            app.items = []
            expect(app.items.length).toBe(0)
            expect(vm.value.length).toBe(0)
            expect(tbody.children.length).toBe(1)
            expect(tbody.textContent).toContain(vm.emptyText)
        }
    })
});
