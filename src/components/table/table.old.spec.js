import { loadFixture, testVM } from '../../../tests/utils'

describe('table', () => {
  beforeEach(loadFixture(__dirname, 'table'))
  testVM()

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
})
