export default {
  name: 'BVDReload',
  render(h) {
    return h(
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
  }
}
