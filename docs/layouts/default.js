import Footer from '~/components/footer'
import Header from '~/components/header'

const BASE_URL = 'https://bootstrap-vue.org'

export default {
  name: 'BVDefaultLayout',
  render: h => [h(Header), h('nuxt'), h(Footer)],
  head() {
    // Add conanonical URL so all site variations are
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
