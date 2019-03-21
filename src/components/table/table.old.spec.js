import { loadFixture, testVM, setData, nextTick } from '../../../tests/utils'

describe('table', () => {
  beforeEach(loadFixture(__dirname, 'table'))
  testVM()

  it('table_paginated thead should contain class thead-dark', async () => {
    const {
      app: { $refs }
    } = window
    const thead = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'THEAD')
    expect(thead).toBeDefined()
    if (thead) {
      expect(thead.classList.contains('thead-dark')).toBe(true)
    }
  })

  it('table_paginated tfoot should contain class thead-light', async () => {
    const {
      app: { $refs }
    } = window
    const tfoot = [...$refs.table_paginated.$el.children].find(el => el && el.tagName === 'TFOOT')
    expect(tfoot).toBeDefined()
    if (tfoot) {
      expect(tfoot.classList.contains('thead-light')).toBe(true)
    }
  })

  it('all examples should have variant "success" on 1st row', async () => {
    const {
      app: { $refs }
    } = window
    const app = window.app

    const tables = ['table_basic', 'table_paginated', 'table_dark']

    const items = app.items.slice()
    items[0]._rowVariant = 'success'
    await setData(app, 'items', items)
    await nextTick()

    tables.forEach((table, idx) => {
      const vm = $refs[table]
      const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
      expect(tbody).toBeDefined()
      if (tbody) {
        const tr = tbody.children[0]
        const variant = vm.dark ? 'bg-success' : 'table-success'
        expect(Boolean(tr) && Boolean(tr.classList) && tr.classList.contains(variant)).toBe(true)
      }
    })
  })

  it('table_basic should contain custom formatted columns', async () => {
    const { app } = window
    const vm = app.$refs.table_basic

    const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
    expect(tbody).toBeDefined()
    if (tbody) {
      const tr = [...tbody.children].find(el => el && el.tagName === 'TR')
      expect(tr).toBeDefined()
      if (tr) {
        expect(tr.children[0].textContent).toContain(
          vm.items[0].name.first + ' ' + vm.items[0].name.last
        )
        expect(tr.children[1].textContent).toContain(String(vm.items[0].age))
        expect(tr.children[3].children[0].tagName).toBe('BUTTON')
      }
    }
  })

  it('table_paginated should contain custom formatted headers', async () => {
    const {
      app: { $refs }
    } = window

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

  it('table_paginated should contain custom formatted footers', async () => {
    const {
      app: { $refs }
    } = window

    await nextTick()

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

  it('non-sortable header th should not emit a sort-changed event when clicked and prop no-sort-reset is set', async () => {
    const {
      app: { $refs }
    } = window
    const vm = $refs.table_no_sort_reset
    const spy = jest.fn()
    const fieldKeys = Object.keys(vm.fields)

    vm.$on('sort-changed', spy)
    const thead = [...vm.$el.children].find(el => el && el.tagName === 'THEAD')
    expect(thead).toBeDefined()
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
            expect(spy).not.toHaveBeenCalled()
            expect(vm.context.sortBy).toBe(sortBy)
          }
          spy.mockClear()
        })
      }
    }
  })

  it('all example tables should have custom formatted cells', async () => {
    const {
      app: { $refs }
    } = window

    const tables = ['table_basic', 'table_paginated', 'table_dark']
    await nextTick()

    tables.forEach((table, idx) => {
      const vm = $refs[table]
      const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
      expect(tbody).toBeDefined()
      if (tbody) {
        const tr = tbody.children[0]
        expect(tr).toBeDefined()
        expect(
          Boolean(tr.children[0]) &&
            Boolean(tr.children[0].classList) &&
            tr.children[0].classList.contains('bg-primary')
        ).toBe(true)
        expect(
          Boolean(tr.children[1]) &&
            Boolean(tr.children[1].classList) &&
            tr.children[1].classList.contains('bg-primary') &&
            tr.children[1].classList.contains('text-dark')
        ).toBe(true)
        expect(
          Boolean(tr.children[2]) &&
            Boolean(tr.children[2].classList) &&
            tr.children[2].classList.contains('bg-danger')
        ).toBe(true)
        expect(
          Boolean(tr.children[3]) &&
            Boolean(tr.children[3].classList) &&
            tr.children[3].classList.contains('bg-primary') &&
            tr.children[3].classList.contains('text-light')
        ).toBe(true)
        expect(
          Boolean(tr.children[0]) &&
            Boolean(tr.children[0].attributes) &&
            tr.children[0].getAttribute('title') === 'Person Full name'
        ).toBe(true)
        expect(
          Boolean(tr.children[2]) &&
            Boolean(tr.children[2].attributes) &&
            tr.children[2].getAttribute('title') === 'is Active'
        ).toBe(true)
        expect(
          Boolean(tr.children[3]) &&
            Boolean(tr.children[3].attributes) &&
            tr.children[3].getAttribute('title') === 'Actions'
        ).toBe(true)
      }
    })
  })

  it('should set row classes', async () => {
    // Classes that children rows must contain
    const classesTest = {
      'tr-start-with-l': [1, 7],
      'tr-last-name-macdonald': [0, 6]
    }
    const { app } = window
    const vm = app.$refs.table_style_row
    const tbody = [...vm.$el.children].find(el => el && el.tagName === 'TBODY')
    expect(tbody).toBeDefined()
    for (const className in classesTest) {
      const children = classesTest[className]
      for (let childIndex = 0, len = tbody.children.length - 1; childIndex < len; ++childIndex) {
        const hasClass = children.indexOf(childIndex) >= 0
        expect(
          Boolean(tbody.children[childIndex]) &&
            Boolean(tbody.children[childIndex].classList) &&
            tbody.children[childIndex].classList.contains(className)
        ).toBe(hasClass)
      }
    }
  })
})
