import { BASE_URL, GWT_BV_ORG, GWT_JS_ORG, GWT_BV_NETLIFY } from '~/constants'
import Footer from '~/components/footer'
import Header from '~/components/header'

export default {
  name: 'BVDefaultLayout',
  render(h) {
    return h('div', [h(Header), h('nuxt'), h(Footer)])
  },
  head() {
    return {
      link: [
        // Add canonical URL so all site variations are
        // indexed to the same primary URL
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${BASE_URL}${this.$route.path}`
        }
      ],
      meta: [
        // Add GWT site verification for *.bootstrap-vue.org
        {
          hid: 'google-site-verification-bv-org',
          name: 'google-site-verification',
          content: GWT_BV_ORG
        },
        // Add GWT site verification for bootstrap-vue.js.org (legacy)
        {
          hid: 'google-site-verification-js-org',
          name: 'google-site-verification',
          content: GWT_JS_ORG
        },
        // Add GWT site verification for bootstrap-vue.netlify.app (legacy)
        {
          hid: 'google-site-verification-netlify',
          name: 'google-site-verification',
          content: GWT_BV_NETLIFY
        }
      ]
    }
  }
}
