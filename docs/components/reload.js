import Section from './section'

// @vue/component
export default {
  name: 'BVReload',
  render(h) {
    const $heading = h('h1', [
      h('span', { staticClass: 'bd-content-title' }, 'Updated documentation')
    ])
    const $lead = h(
      'p',
      { staticClass: 'lead' },
      'Updated documentation is available. Please reload.'
    )
    const $button = h(
      'b-button',
      {
        props: { variant: 'primary' },
        on: {
          click: () => {
            window.location.reload(true)
          }
        }
      },
      'Reload page'
    )
    return h(Section, [$heading, $lead, h('p', [$button])])
  }
}
