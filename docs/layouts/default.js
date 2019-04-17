import Footer from '~/components/footer'
import Header from '~/components/header'

export default {
  name: 'BVDDefaultLayout',
  functional: true,
  render: h => [h(Header), h('nuxt'), h(Footer)]
}
