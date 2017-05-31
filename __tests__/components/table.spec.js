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
    
    it('all example tables should have ARIA role', async() => {
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
        const thead = [...$refs.table_paginated.children].find(el => el && el.tagName === 'THEAD')
        expect(thead).toBeDefined();
        if (thead) {
            expect(thead.classList.contains('thead-inverse')).toBe(true)
        }
    })

    it('table_paginated tfoot should contain class thead-default', async() => {
        const { app: { $refs, $el } } = window
        const tfoot = [...$refs.table_paginated.children].find(el => el && el.tagName === 'TFOOT')
        expect(tfoot).toBeDefined();
        if (tfoot) {
            expect(tfoot.classList.contains('thead-default')).toBe(true)
        }
    })

    it('all examples have four columns', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]
        const columns = [ 4, 4, 4 ]

        tables.forEach((table, idx) => {
            const thead = [...$refs[table].$el.children].find(el => el && el.tagName === 'THEAD')
            expect(thead).toBeDefined();
            if (thead) {
                const tr = [...thead.children].find(el => el && el.tagName === 'TR')
                expect(tr).toBeDefined()
                if (tr) {
                    expect(tr.children.length).toBe(columns[idx])
                }
            }
        })

    })

    it('all examples should show the correct number of visible rows', async() => {
        const { app: { $refs, $el } } = window

        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]
        const rows = [ 12, 5, 4 ]

        tables.forEach((table, idx) => {
            const tbody = [...$refs[table].$el.children].find(el => el && el.tagName === 'TBODY')
            expect(tbody).toBeDefined()
            if (tbody) {
                expect(tbody.children.length).toBe(rows[idx])
            }
        })

    })

    it('all examples have sortable & unsortable headers', async() => {
        const { app: { $refs, $el } } = window
        
        const tables = [ 'table_basic', 'table_paginated', 'table_inverse' ]
        const sortables = [ true, true, false, false ]

        tables.forEach( table => {
            const thead = [...$refs[table].$el.children].find(el => el && el.tagName === 'THEAD')
            expect(thead).toBeDefined()
            if (thead) {
                const tr = [...thead.children].find(el => el && el.tagName === 'TR')
                expect(tr).toBeDefined()
                if (tr) {
                    sortables.forEach((sortable, idx) => {
                        const th = tr.children[idx]
                        expect(th).toBeDefined()
                        expect(th.tagName).toBe('TH')
                        if (th) {
                            expect(th.classList.contains('sorting')).toBe(sortable)
                        }
                    })
                }
            }
        })

    })

    it('table_paginated has sortable & unsortable footers', async() => {
        const { app: { $refs, $el } } = window
        
        const sortables = [ true, true, false, false ]
        const tfoot = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'TFOOT')

        expect(tfoot).toBeDefined()

        if (tfoot) {
            const tr = [...tfoot.children].find(el => el && el.tagName === 'TR')
            expect(tr).toBeDefined()
            if (tr) {
                sortables.forEach((sortable, idx) => {
                    const th = tr.children[idx]
                    expect(th).toBeDefined()
                    expect(th.tagName).toBe('TH')
                    if (th) {
                        expect(th.classList.contains('sorting')).toBe(sortable)
                    }
                })
            }
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

});
