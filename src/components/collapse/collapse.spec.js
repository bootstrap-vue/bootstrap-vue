import { loadFixture, testVM, nextTick, setData } from '../../../tests/utils'
import Collapse from './collapse'
import { mount } from '@vue/test-utils'

// Helper method for awaiting an animation frame
const waitAF = () => new Promise(resolve => requestAnimationFrame(resolve))

describe('collapse', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(Collapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    // const rootWrapper = createWrapper(wrapper.vm.$root)
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(Collapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test'
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.display).toEqual('none')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('should mount as visible when prop visible is true', async () => {
    const wrapper = mount(Collapse, {
      attachToDocument: true,
      propsData: {
        // 'id' is a required prop
        id: 'test',
        visible: true
      },
      slots: {
        default: '<div>foobar</div>'
      },
      stubs: {
        // Disable use of default test transitionStub component
        transition: false
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
    await wrapper.vm.$nextTick()
    await waitAF()
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.classes()).toContain('collapse')
    expect(wrapper.element.style.display).toEqual('')
    expect(wrapper.find('div > div').exists()).toBe(true)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.destroy()
  })
})

describe('collapse (legacy)', () => {
  beforeEach(loadFixture(__dirname, 'collapse'))
  testVM()

  it('Accordion example should have appropriate CSS "display"', async () => {
    const {
      app: { $refs }
    } = window

    expect($refs.accordion_1.$el.style.display).toBe('')
    expect($refs.accordion_2.$el.style.display).toBe('none')
    expect($refs.accordion_3.$el.style.display).toBe('none')
  })

  it('v-model example should change state on data update', async () => {
    const { app } = window

    const btn = app.$refs.collapse_vmod_btn
    const col = app.$refs.collapse_vmod

    expect(app.showCollapse).toBe(true)
    expect(col.$el.classList.contains('show')).toBe(true)
    expect(btn.getAttribute('aria-expanded')).toBe('true')

    await setData(app, 'showCollapse', false)
    await nextTick()

    expect(app.showCollapse).toBe(false)
    await nextTick()

    expect(col.$el.classList.contains('show')).toBe(false)
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('basic example should change visibility on click', async () => {
    const {
      app: { $refs }
    } = window

    const btn = $refs.collapse_mod_btn
    const col = $refs.collapse_mod

    expect(col.$el.style.display).toBe('none')
    expect(btn.getAttribute('aria-expanded')).toBe('false')

    btn.click()
    await nextTick()

    expect(col.$el.style.display).toBe('')
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('accordion example should change visibility on click', async () => {
    const {
      app: { $refs }
    } = window
    const btn1 = $refs.accordion_1_btn
    const col1 = $refs.accordion_1
    const btn2 = $refs.accordion_2_btn
    const col2 = $refs.accordion_2
    const btn3 = $refs.accordion_3_btn
    const col3 = $refs.accordion_3

    expect(btn1.getAttribute('aria-expanded')).toBe('true')
    expect(btn2.getAttribute('aria-expanded')).toBe('false')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(true)
    expect(col2.show).toBe(false)
    expect(col3.show).toBe(false)

    btn2.click()
    await nextTick()

    expect(btn1.getAttribute('aria-expanded')).toBe('false')
    expect(btn2.getAttribute('aria-expanded')).toBe('true')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(false)
    expect(col2.show).toBe(true)
    expect(col3.show).toBe(false)

    btn2.click()
    await nextTick()

    expect(btn1.getAttribute('aria-expanded')).toBe('false')
    expect(btn2.getAttribute('aria-expanded')).toBe('false')
    expect(btn3.getAttribute('aria-expanded')).toBe('false')

    expect(col1.show).toBe(false)
    expect(col2.show).toBe(false)
    expect(col3.show).toBe(false)
  })
})
