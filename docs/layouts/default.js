import { BASE_URL, GWT_BV_ORG, GWT_JS_ORG } from '~/constants'
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
      ],
      meta: [
        {
          hid: 'google-site-verification-bv-org',
          name: 'google-site-verification',
          content: GWT_BV_ORG
        },
        {
          hid: 'google-site-verification-js-org',
          name: 'google-site-verification',
          content: GWT_JS_ORG
        }
      ]
    }
  }
}
