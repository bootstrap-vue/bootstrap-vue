export default {
  render(h) {
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
