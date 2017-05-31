import {loadFixture, testVM} from '../helpers';

describe('table', async() => {
    beforeEach(loadFixture('table'));
    testVM();

    it('all examples should contain class names', async() => {
        const { app: { $refs, $el } } = window
        let thead
        let tfoot

        expect($refs.table_basic).toHaveAllClasses([
            'table', 'b-table', 'table-striped', 'table-hover'
        ])

        expect($refs.table_paginated).toHaveAllClasses([
            'table', 'b-table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm', 'table-responsive'
        ])
        thead = $refs.table_paginated.$el.children[0]
        expect(thead.classList && thead.classList.contains('thead-inverse')).toBe(true)
        tfoot = $refs.table_paginated.$el.children[2]
        expect(tfoot.classList && tfoot.classList.contains('thead-default')).toBe(true)

        expect($refs.table_inverse).toHaveAllClasses([
            'table', 'b-table', 'table-sm', 'table-bordered', 'table-inverse'
        ])
        thead = $refs.table_innverse.$el.children[0]
        expect(thead.classList && thead.classList.contains('thead-default')).toBe(true)
    })
    
    it('table_basic should have thead and tbody', async() => {
        const { app: { $refs, $el } } = window

        const parts = [...$refs.table_basic.$el.children]

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead && thead.tagName === 'THEAD').toBe(true)

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody && tbody.tagName === 'TBODY').toBe(true)

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot && tfoot.tagName === 'TFOOT').toBe(false)
    })

    it('table_paginated should have thead and tbody and tfoot', async() => {
        const { app: { $refs, $el } } = window

        const parts = [...$refs.table_basic.$el.children]

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead && thead.tagName === 'THEAD').toBe(true)

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody && tbody.tagName === 'TBODY').toBe(true)

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot && tfoot.tagName === 'TFOOT').toBe(true)
    })

    it('table_inverse should have thead and tbody', async() => {
        const { app: { $refs, $el } } = window

        const table = $refs.table_basic.$el

        const thead = parts.find(el => el.tagName && el.tagName === 'THEAD')
        expect(thead && thead.tagName === 'THEAD').toBe(true)

        const tbody = parts.find(el => el.tagName && el.tagName === 'TBODY')
        expect(tbody && tbody.tagName === 'TBODY').toBe(true)

        const tfoot = parts.find(el => el.tagName && el.tagName === 'TFOOT')
        expect(tfoot && tfoot.tagName === 'TFOOT').toBe(false)
    })

    it('all examples have four columns', async() => {
        const { app: { $refs, $el } } = window
        let tr
        let th

        tr = $refs.table_basic.$el.children[0].children[0]
        expect(tr && tr.children.length > 4).toBe(true)

        tr = $refs.table_paginated.$el.children[0].children[0]
        expect(tr && tr.children.length > 4).toBe(true)

        tr = $refs.table_inverse.$el.children[0].children[0]
        expect(tr && tr.children.length > 4).toBe(true)
    })

    it('all examples should show the correct number of rows', async() => {
        const { app: { $refs, $el } } = window
        let tbody

        tbody = $refs.table_basic.$el.children[1]
        expect(tbody && tbody.children.length === 12).toBe(true)

        tbody = $refs.table_paginated.$el.children[1]
        expect(tbody && tbody.children.length === 5).toBe(true)

        tbody = $refs.table_inverse.$el.children[1];
        expect(tbody && tbody.children.length === 4).toBe(true)
    })

    it('all examples have sortable headers', async() => {
        const { app: { $refs, $el } } = window
        let tr
        let th

        tr = $refs.table_basic.$el.children[0].children[0]
        th = tr.children[0]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[1]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[2]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)
        th = tr.children[3]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)

        tr = $refs.table_paginated.$el.children[0].children[0]
        th = tr.children[0]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[1]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[2]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)
        th = tr.children[3]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)

        tr = $refs.table_inverse.$el.children[0].children[0]
        th = tr.children[0]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[1]
        expect(th.classList && th.classList.contains('sorting')).toBe(true)
        th = tr.children[2]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)
        th = tr.children[3]
        expect(th.classList && th.classList.contains('sorting')).toBe(false)
    })

    it('all examples should have variant success on 3rd row', async() => {
        const { app: { $refs, $el } } = window
        let tbody
        let tr

        tr = $refs.table_basic.$el.children[1].children[2];
        expect(tr && tr.classList && tr.classList.contains('table-success')).toBe(true)

        tr = $refs.table_paginated.$el.children[1].children[2];
        expect(tr && tr.classList && tr.classList.contains('table-success')).toBe(true)

        tr = $refs.table_inverse.$el.children[1].children[2];
        expect(tr && tr.classList && tr.classList.contains('bg-success')).toBe(true)
    })

});
