import {loadFixture, testVM, setData, nextTick, sleep} from '../helpers';

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

    it('all example tables should have ARIA role="grid"', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach(table => {
            expect($refs[table].$el.getAttribute('role')).toBe('grid')
        })
    })

    it('each data row should have ARIA role "row"', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        tables.forEach(table => {
            const vm = $refs[table]
            const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
            expect(tbody).toBeDefined()
            if (tbody) {
                const trs = [...tbody.children]
                expect(trs.length).toBe(vm.perPage || app.items.length)
                trs.forEach( tr => {
                    expect(tr.getAttribute('role')).toBe('row')
                })
            }
        })
    })

    it('all example tables should have attribute aria-busy="false" when busy is false', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        await setData(app, 'isBusy', false)
        await nextTick()

        tables.forEach(table => {
            expect($refs[table].$el.getAttribute('aria-busy')).toBe('false')
        })
    })

    it('table_paginated should have attribute aria-busy="true" when busy is true', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app

        await setData(app, 'isBusy', true)
        await nextTick()
        expect($refs.table_paginated.$el.getAttribute('aria-busy')).toBe('true')

        await setData(app, 'isBusy', false)
        await nextTick()
        expect($refs.table_paginated.$el.getAttribute('aria-busy')).toBe('false')
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

    it('all examples should have variant "success" on 1st row', async() => {
        const { app: { $refs, $el } } = window
        const app = window.app

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]

        const items = app.items.slice()
        items[0]._rowVariant = 'success'
        await setData(app, 'items', items)
        await nextTick()

        tables.forEach((table, idx) => {
            const vm = $refs[table]
            const tbody = [...vm.$el.children].find(el => el && el.tagName == 'TBODY')
            expect(tbody).toBeDefined();
            if (tbody) {
                const tr = tbody.children[0]
                const variant = vm.inverse ? 'bg-success' : 'table-success'
                expect(Boolean(tr) && Boolean(tr.classList) && tr.classList.contains(variant)).toBe(true)
            }
        })
    })

    it('table_basic should contain custom formatted columns', async() => {
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

    it('table_paginated should contain custom formatted columns', async() => {
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

    it('table_paginated should contain custom formatted headers', async() => {
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

    it('table_paginated should contain custom formatted footers', async() => {
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
        const spy = jest.fn()

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            // We need between 11 and 14 ites for this test
            expect(app.items.length > 10).toBe(true)
            expect(app.items.length < 15).toBe(true)

            vm.$on('input', spy)

            // Page size to be less then number of items
            await setData(app, 'currentPage', 1)
            await setData(app, 'perPage', 10)
            await nextTick()
            expect(vm.perPage).toBe(10)
            expect(vm.value.length).toBe(10)
            expect(tbody.children.length).toBe(10)

            // Goto page 2, should have length 1
            await setData(app, 'currentPage', 2)
            await nextTick()
            expect(vm.value.length).toBe(app.items.length - 10)
            expect(tbody.children.length).toBe(app.items.length - 10)

            expect(spy).toHaveBeenCalled()
        }
    })

    it('table_paginated filtering works', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const app = window.app
        const spy = jest.fn()

        expect(vm.showEmpty).toBe(true)
        expect(app.items.length > 10).toBe(true)
        expect(app.items.length < 15).toBe(true)
        
        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            expect(app.items.length > 1).toBe(true)
            
            vm.$on('input', spy)

            // Set page size to max number of items
            await setData(app, 'currentPage', 1)
            await setData(app, 'perPage', 15)
            await nextTick()
            expect(vm.value.length).toBe(app.items.length)
            expect(tbody.children.length).toBe(app.items.length)

            // Apply Fiter
            await setData(app, 'filter', String(app.items[0].name.last))
            await nextTick()
            expect(vm.value.length < app.items.length).toBe(true)
            expect(tbody.children.length < app.items.length).toBe(true)
            
            // Empty filter alert
            await setData(app, 'filter', 'ZZZZZZZZZZZZZZZZZzzzzzzzzzzzzzzzzz........')
            await nextTick()
            expect(vm.value.length).toBe(0)
            expect(tbody.children.length).toBe(1)
            expect(tbody.children[0].children[0].textContent).toContain(vm.emptyFilteredText)

            expect(spy).toHaveBeenCalled();
        }
    })

    it('table_paginated shows empty message when no items', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_paginated
        const app = window.app
        const spy = jest.fn()

        expect(vm.showEmpty).toBe(true)

        const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
        expect(tbody).toBeDefined()
        if (tbody) {
            expect(app.items.length > 10).toBe(true)
            expect(app.items.length < 15).toBe(true)

            vm.$on('input', spy)

            // Set page size to show all items
            await setData(app, 'currentPage', 1)
            await setData(app, 'perPage', 15)
            await nextTick()
            expect(vm.value.length).toBe(app.items.length)
            expect(tbody.children.length).toBe(app.items.length)

            // Set items to empty list
            await setData(app, 'items', [])
            await nextTick()
            expect(app.items.length).toBe(0)
            expect(vm.value.length).toBe(0)
            expect(tbody.children.length).toBe(1)
            expect(tbody.textContent).toContain(vm.emptyText)

            expect(spy).toHaveBeenCalled();
        }
    })

    it('table_provider should emit a refreshed event for providerArray', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_provider
        const spy = jest.fn()

        await setData(app, 'providerType', 'array')
        await nextTick()
        await sleep(100)

        vm.$on('refreshed', spy)
        vm.refresh();
        await nextTick()
        await sleep(100)

        expect(spy).toHaveBeenCalled()
        // expect(vm.value.length).toBe(app.items.length)
    })

    it('table_provider should emit a refreshed event for providerCallback', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_provider
        const spy = jest.fn()

        await setData(app, 'providerType', 'callback')
        await nextTick()
        await sleep(100)

        vm.$on('refreshed', spy)
        vm.refresh();
        await nextTick()
        await sleep(100)

        expect(spy).toHaveBeenCalled()
    })

    it('table_provider should emit a refreshed event for providerPromise', async() => {
        const { app: { $refs, $el } } = window
        const vm = $refs.table_provider
        const spy = jest.fn()

        await setData(app, 'providerType', 'promise')
        await nextTick()
        await sleep(100)

        vm.$on('refreshed', spy)
        vm.refresh();
        await nextTick()
        await sleep(100)

        expect(spy).toHaveBeenCalled()
    })

});
