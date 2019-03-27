import { loadFixture, testVM } from '../../../tests/utils'

/*
// For migration to test utils
const items1 = [
  { text: 'Home', href: '/' },
  { text: 'Admin', to: '/admin', active: false },
  { html: '<b>Manage</b>', href: '/admin/manage' },
  // Test with non object
  'Library'
]
const items2 = [
  { text: 'Home', href: '/' },
  { text: 'Admin', href: '/admin', active: true },
  { text: 'Manage', href: '/admin/manage' },
  { text: 'Library', href: '/admin/manage/library' }
]
*/

describe('breadcrumb', () => {
  beforeEach(loadFixture(__dirname, 'breadcrumb'))
  testVM()

  it('should apply Bootstrap breadcrumb classes', async () => {
    const {
      app: { $refs }
    } = window
    const $ol = $refs.breadcrumb1

    expect($ol.classList.contains('breadcrumb')).toBe(true)

    Array.from($ol.children).forEach($li => {
      if ($li.tagName === 'LI') {
        expect($li.classList.contains('breadcrumb-item')).toBe(true)
      }
    })
  })

  it('should apply active class to active item', async () => {
    const {
      app: {
        $refs: { breadcrumb2: crumb2 },
        items2
      }
    } = window

    items2.forEach((item, i) => {
      if (item.active) {
        expect(crumb2.children[i].classList.contains('active')).toBe(true)
      }
    })
  })

  it('should apply aria-current to active class element', async () => {
    const {
      app: {
        $refs: { breadcrumb2: crumb2 },
        items2
      }
    } = window
    const $listItems = Array.from(crumb2.children)

    items2.forEach((item, i) => {
      if (item.active) {
        expect($listItems[i].firstElementChild.hasAttribute('aria-current')).toBe(true)
      } else {
        expect($listItems[i].firstElementChild.hasAttribute('aria-current')).toBe(false)
      }
    })
  })

  it('should default active class to last item only when no true active prop provided', async () => {
    const {
      app: {
        $refs: { breadcrumb1: crumb },
        items
      }
    } = window
    const $listItems = Array.from(crumb.children)
    const itemsLength = items.length

    items.forEach((item, i) => {
      const isLast = i === itemsLength - 1

      if (isLast) {
        expect($listItems[i].classList.contains('active')).toBe(true)
      } else {
        expect($listItems[i].classList.contains('active')).toBe(false)
      }
    })
  })
})
