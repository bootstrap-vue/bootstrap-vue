import { BASE_URL } from '~/constants'
import Footer from '~/components/footer'
import Header from '~/components/header'

export default {
  name: 'BVDefaultLayout',
  render(h) {
    return h('div', [h(Header), h('nuxt'), h(Footer)])
  },
  head() {
    // Add canonical URL so all site variations are
    // indexed to the same primary URL
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${BASE_URL}${this.$route.path}`
        }
      ]
    }
  }
}
