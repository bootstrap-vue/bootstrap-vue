import Section from './section'

export default {
  name: 'BVDReload',
  render(h) {
    const $lead = h('p', { staticClass: 'lead' }, 'Updated documentation available. Please reload.')
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
    return h(Section, [$lead, h('p', [$button])])
  }
}
