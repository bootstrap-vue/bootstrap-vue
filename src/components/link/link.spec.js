import { loadFixture, testVM } from '../../../tests/utils'
import { propsFactory, pickLinkProps, omitLinkProps, props as linkProps } from './link'

describe('link', () => {
  beforeEach(loadFixture(__dirname, 'link'))
  testVM()

  it('should render <a>', async () => {
    const { app } = window
    expect(app.$refs.plain).toBeElement('a')
  })

  it('should default href to `#`', async () => {
    const { app } = window
    expect(app.$refs.plain.getAttribute('href')).toBe('#')
  })

  it('should apply given href', async () => {
    const { app } = window
    expect(app.$refs.href.getAttribute('href')).toBe(app.href)
  })

  it("should default rel to `noopener` when target==='_blank'", async () => {
    const { app } = window
    expect(app.$refs.target.getAttribute('rel')).toBe('noopener')
  })

  it("should render the given rel to when target==='_blank'", async () => {
    const { app } = window
    expect(app.$refs.rel.getAttribute('rel')).toBe('alternate')
  })

  it("should add '.active' class when prop active=true", async () => {
    const { app } = window
    expect(app.$refs.active).toHaveClass('active')
  })

  it('should not add aria-disabled when not disabled', async () => {
    const { app } = window
    expect(app.$refs.plain.hasAttribute('aria-disabled')).toBe(false)
  })

  it("should add aria-disabled==='true' when disabled", async () => {
    const { app } = window
    expect(app.$refs.disabled.getAttribute('aria-disabled')).toBe('true')
  })

  it("should add '.disabled' class when prop disabled=true", async () => {
    const { app } = window
    expect(app.$refs.disabled).toHaveClass('disabled')
  })

  it('should set href to string `to` prop', async () => {
    const { app } = window
    expect(app.$refs.to_string.getAttribute('href')).toBe(app.href)
  })

  it('should set href to path from `to` prop', async () => {
    const { app } = window
    expect(app.$refs.to_path.getAttribute('href')).toBe(app.href)
  })

  it('should NOT invoke click handler bound by Vue when disabled and clicked on', async () => {
    const { app } = window
    app.$refs.click_disabled.click()
    expect(app.disabledClickSpy).not.toHaveBeenCalled()
  })

  it("should NOT invoke click handler bound using 'addEventListener' when disabled and clicked on", async () => {
    const { app } = window
    const spy = jest.fn()
    app.$refs.click_disabled.addEventListener('click', spy)
    app.$refs.click_disabled.click()
    expect(spy).not.toHaveBeenCalled()
  })

  it("should NOT emit 'clicked::link' on $root when clicked on", async () => {
    const { app } = window
    const spy = jest.fn()
    app.$root.$on('clicked::link', spy)
    app.$refs.click_disabled.click()
    expect(spy).not.toHaveBeenCalled()
  })

  it('should invoke click handler when clicked on', async () => {
    const { app } = window
    app.$refs.click.click()
    expect(app.clickSpy).toHaveBeenCalled()
    const firstCallArguments = app.clickSpy.mock.calls[0]
    expect(firstCallArguments[0]).toBeInstanceOf(Event)
  })

  it("should emit 'clicked::link' on $root when clicked on", async () => {
    const { app } = window
    const spy = jest.fn()
    app.$root.$on('clicked::link', spy)
    app.$refs.click.click()
    expect(spy).toHaveBeenCalled()
  })

  describe('propsFactory() helper', () => {
    it('works', async () => {
      expect(propsFactory()).toEqual(linkProps)
      expect(propsFactory()).not.toBe(linkProps)
    })
  })

  describe('pickLinkProps() helper', () => {
    it('works', async () => {
      expect(pickLinkProps([])).toEqual({})
      expect(pickLinkProps(['append'])).toEqual({ append: linkProps.append })
      expect(pickLinkProps('to')).toEqual({ to: linkProps.to })
      expect(pickLinkProps(['append', 'routerTag'])).toEqual({
        append: linkProps.append,
        routerTag: linkProps.routerTag
      })
    })
  })

  describe('omitLinkProps() helper', () => {
    it('works', async () => {
      expect(omitLinkProps([])).toEqual({ ...linkProps })
      const propsOmitted = Object.keys(linkProps).filter(p => p !== 'to' && p !== 'append')
      expect(omitLinkProps(propsOmitted)).toEqual({
        to: linkProps.to,
        append: linkProps.append
      })
    })
  })
})
