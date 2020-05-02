export default {
  render(h) {
    name: 'BVDReload',
    return(
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
