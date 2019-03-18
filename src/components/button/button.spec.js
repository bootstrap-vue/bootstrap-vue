import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils'

/**
 * Button functionality to test:
 * - Style variants: [ 'primary','secondary','success','outline-success','warning','danger','link' ]
 * - Sizes: [ 'sm','','lg' ]
 * - Props: [ disabled, block ]
 * - elements: [ <button/>, <a/> ]
 */
const colorVariants = ['primary', 'secondary', 'success', 'warning', 'danger']
const outlineVariants = colorVariants.map(v => `outline-${v}`)
const variants = colorVariants.concat(outlineVariants, 'link')
const sizes = ['sm', '', 'lg']

const btnRefs = variants.reduce(
  (memo, variant) =>
    memo.concat(
      sizes.map(size => {
        return {
          variant,
          size,
          ref: `btn${size ? `_${size}` : ''}_${variant.replace(/-/g, '_')}`
        }
      })
    ),
  []
)

describe('button', () => {
  beforeEach(loadFixture(__dirname, 'button'))
  testVM()

  it('should contain class names', async () => {
    const {
      app: { $refs }
    } = window

    btnRefs.forEach(({ ref, variant, size }) => {
      // ref will contain an array of children because of v-for
      const vm = $refs[ref][0]

      let classList = ['btn', `btn-${variant}`]
      if (size) classList.push(`btn-${size}`)

      expect(vm).toHaveAllClasses(classList)
    })

    const vmBlockDisabled = $refs.btn_block_disabled
    expect(vmBlockDisabled).toHaveAllClasses(['btn', 'btn-block', 'disabled'])
  })

  it('should use <a> when given href', async () => {
    const {
      app: { $refs }
    } = window
    const btnRootNode = $refs.btn_href

    expect(btnRootNode).toBeElement('a')
    expect(btnRootNode.href).toBe('https://github.com/bootstrap-vue/bootstrap-vue')
  })

  it('should use the given tag', async () => {
    const {
      app: { $refs }
    } = window
    const btnRootNode = $refs.btn_div

    expect(btnRootNode).toBeElement('div')
  })

  it('should use button when no tag is given', async () => {
    const {
      app: { $refs }
    } = window
    const btnRootNode = $refs.btn_no_tag

    expect(btnRootNode).toBeElement('button')
  })

  it('should emit "click" event when clicked', async () => {
    const {
      app: { $refs }
    } = window
    const btn = $refs.btn_click
    const spy = jest.fn()

    btn.addEventListener('click', spy)
    btn.click()

    expect(spy).toHaveBeenCalled()
  })

  it('should "click" event should emit with native event object', async () => {
    const {
      app: { $refs }
    } = window
    const btn = $refs.btn_click
    let event = null

    btn.addEventListener('click', e => (event = e))
    btn.click()

    expect(event).toBeInstanceOf(MouseEvent)
  })

  it('should be disabled and not emit click event with `disabled` prop true', async () => {
    const {
      app: { $refs }
    } = window
    const btn = $refs.btn_block_disabled
    const spy = jest.fn()

    btn.addEventListener('click', spy)
    btn.click()

    expect(btn.disabled).toBe(true)
    expect(spy).not.toHaveBeenCalled()
  })

  it('should not have `.active` class and `aria-pressed` when pressed is null', async () => {
    const { app } = window
    const vm = app.$refs.btn_pressed

    await setData(app, 'btnToggle', null)
    await nextTick()

    expect(vm).not.toHaveClass('active')
    expect(vm.getAttribute('aria-pressed')).toBeNull()
    vm.click()
    expect(app.btnToggle).toBeNull()
  })

  it('should not have `.active` class and have `aria-pressed="false"` when pressed is false', async () => {
    const { app } = window
    const vm = app.$refs.btn_pressed

    await setData(app, 'btnToggle', false)
    await nextTick()

    expect(vm).not.toHaveClass('active')
    expect(vm.getAttribute('aria-pressed')).toBe('false')
  })

  it('should have `.active` class and have `aria-pressed="true"` when pressed is true', async () => {
    const { app } = window
    const vm = app.$refs.btn_pressed

    await setData(app, 'btnToggle', true)
    await nextTick()

    vm.click()

    expect(vm).toHaveClass('active')
    expect(vm.getAttribute('aria-pressed')).toBe('true')
  })

  it('pressed should have `.focus` class when focused', async () => {
    const { app } = window
    const btn = app.$refs.btn_pressed

    await setData(app, 'btnToggle', false)
    await nextTick()

    const focusinEvt = new FocusEvent('focusin')
    btn.dispatchEvent(focusinEvt)
    await nextTick()
    expect(btn).toHaveClass('focus')

    const focusoutEvt = new FocusEvent('focusout')
    btn.dispatchEvent(focusoutEvt)
    await nextTick()
    expect(btn).not.toHaveClass('focus')
  })

  it('should update the parent sync value on click and when pressed is not null', async () => {
    const { app } = window
    const vm = app.$refs.btn_pressed

    await setData(app, 'btnToggle', false)
    await nextTick()

    expect(app.btnToggle).toBe(false)
    expect(vm).not.toHaveClass('active')
    expect(vm.getAttribute('aria-pressed')).toBe('false')
    vm.click()
    await nextTick()
    expect(app.btnToggle).toBe(true)
    expect(vm).toHaveClass('active')
    expect(vm.getAttribute('aria-pressed')).toBe('true')
  })
})
