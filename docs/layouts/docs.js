import { BASE_URL, GWT_BV_ORG, GWT_JS_ORG } from '~/constants'
import BVBreadcrumbs from '~/components/breadcrumbs'
import BVFeedback from '~/components/feedback'
import BVFooter from '~/components/footer'
import BVHeader from '~/components/header'
import BVSearch from '~/components/search'
import BVSidebar from '~/components/sidebar'
import BVToc from '~/components/toc'

export default {
  name: 'BVDocsLayout',
  data() {
    return {
      hasToc: false
    }
  },
  created() {
    this.$root.$on('docs-set-toc', toc => {
      // Only needed so we can set/clear aria-hidden on the TOC nav wrapper
      this.hasToc = Boolean(toc && toc.toc)
    })
  },
  render(h) {
    // Header
    const $header = h(BVHeader)

    // Sidebar column
    const $sidebarCol = h(
      'b-col',
      {
        staticClass: 'bd-sidebar border-bottom-0',
        props: { cols: 12, md: 3, xl: 2 }
      },
      [h(BVSearch), h(BVSidebar)]
    )

    // Content column
    const $contentCol = h(
      'b-col',
      {
        staticClass: 'bd-content',
        class: ['pb-md-3', 'pl-md-5'],
        props: { cols: 12, md: 9, xl: 8 }
      },
      [
        h(BVBreadcrumbs, { class: ['float-left', 'mt-2', 'mb-0', 'mb-lg-2'] }),
        h(BVFeedback, { class: ['float-right', 'mt-2', 'mb-0', 'mb-lg-2'] }),
        h('div', { class: ['clearfix', 'd-block'], ref: 'clearfix' }),
        h('nuxt')
      ]
    )

    // TOC column
    const $tocCol = h(
      'b-col',
      {
        staticClass: 'bd-toc',
        class: ['d-none', 'd-xl-block'],
        props: { tag: 'nav', xl: 2 },
        attrs: {
          'aria-label': 'Secondary navigation',
          'aria-hidden': this.hasToc ? null : 'true'
        }
      },
      [h(BVToc)]
    )

    // Container
    const $container = h('b-container', { props: { fluid: true } }, [
      h('b-row', { class: ['flex-xl-nowrap2'] }, [$sidebarCol, $contentCol, $tocCol])
    ])

    // Footer
    const $footer = h(BVFooter, { props: { isDocs: true } })

    return h('div', [$header, $container, $footer])
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
        // Add GWT site verification for bootstrap-vue.js.org
        {
          hid: 'google-site-verification-js-org',
          name: 'google-site-verification',
          content: GWT_JS_ORG
        }
      ]
    }
  }
}
