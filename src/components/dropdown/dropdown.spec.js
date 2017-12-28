import { loadFixture, testVM } from '../../../tests/utils'

describe('dropdown', async () => {
  beforeEach(loadFixture(__dirname, 'dropdown'))
  testVM()

  it('should work', async () => {
    const { app: { $refs } } = window
    const dds = Object.keys($refs).map(ref => $refs[ref])

    dds.forEach(dd => {
      expect(dd._isVue).toBe(true)
      expect(dd).toHaveClass('dropdown')
    })
  })

  it('should work with shorthand component tag names', async () => {
    const { app: { $refs } } = window
    const { dd_5 } = $refs // eslint-disable-line camelcase

    expect(dd_5).toBeComponent('b-dd')
  })

  /*
    // This test complains somewhat due to mising Range functions in JSDOM
    // Commenting out for now
    it("should open only one dropdown at a time", async () => {
        const { app: { $refs } } = window;
        const dds = Object.keys($refs).map(ref => $refs[ref]);

        // Without async iterators, just use a for loop.
        for (let i = 0; i < dds.length; i++) {
            Array.from(dds[i].$el.children)
                .find(node => node.tagName === "BUTTON" && node.id === `${dds[i].safeId('_BV_toggle_')}`)
                .click();
            // Await the next render after click triggers dropdown.
            await nextTick();
            const openDds = dds.filter(dd => dd.$el.classList.contains("show"));
            expect(openDds.length).toBe(1);
        }
    });
*/

  it('should not have a toggle caret when no-caret is true', async () => {
    const { app: { $refs } } = window
    const { dd_7 } = $refs // eslint-disable-line camelcase

    const toggle = Array.from(dd_7.$el.children)
      .find(node => node.tagName === 'BUTTON' && node.id === `${dd_7.safeId('_BV_toggle_')}`)
    expect(toggle).not.toHaveClass('dropdown-toggle')
  })

  it('should have a toggle caret when no-caret and split are true', async () => {
    const { app: { $refs } } = window
    const { dd_8 } = $refs // eslint-disable-line camelcase

    const toggle = Array.from(dd_8.$el.children)
      .find(node => node.tagName === 'BUTTON' && node.id === `${dd_8.safeId('_BV_toggle_')}`)
    expect(toggle).toHaveClass('dropdown-toggle')
  })
  /*
  it('boundary set to viewport should have class position-static', async () => {
    const {app: {$refs}} = window
    const {dd_9} = $refs

    expect(dd_9).toHaveClass('position-static')
  })

  it('boundary not set should not have class position-static', async () => {
    const {app: {$refs}} = window
    const {dd_1} = $refs

    expect(dd_1).not.toHaveClass('position-static')
  })
  */
  it('dd-item should render as link by default', async () => {
    const {app: {$refs}} = window
    const {dd_6} = $refs // eslint-disable-line camelcase

    expect(Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'link')).toBeElement('a')
  })

  it('dd-item-button should render as button', async () => {
    const {app: {$refs}} = window
    const {dd_6} = $refs // eslint-disable-line camelcase

    expect(Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'button')).toBeElement('button')
  })

  it('dd-item-button should emit click event', async () => {
    const {app: {$refs}} = window
    const {dd_6} = $refs // eslint-disable-line camelcase

    const spy = jest.fn()

    dd_6.$parent.$root.$on('clicked::link', spy)

    const buttonItem = Array.from(dd_6.$refs.menu.children).find(node => node.innerHTML === 'button')
    buttonItem.click()

    expect(spy).toHaveBeenCalled()
  })

  it('dd-divider should render', async () => {
    const {app: {$refs}} = window
    const {dd_6} = $refs // eslint-disable-line camelcase

    expect(Array.from(dd_6.$refs.menu.children).filter(node => node.classList.contains('dropdown-divider')).length).toBe(1)
  })

  it('.dropdown menu aria-labelledby should target `_BV_button_` when not in split mode', async () => {
    const { app: { $refs } } = window
    const { dd_1 } = $refs // eslint-disable-line camelcase

    const menu = Array.from(dd_1.$el.children)
      .find(node => node.attributes.role && node.attributes.role.value === 'menu')

    expect(menu.attributes['aria-labelledby'].value).toMatch(/_BV_button_$/)
  })
})
