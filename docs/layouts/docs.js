import DocBreadcrumbs from '~/components/doc-breadcrumbs.vue'
import Feedback from '~/components/feedback'
import Header from '~/components/header'
import Footer from '~/components/footer'
import Search from '~/components/search'
import QuickLinks from '~/components/quick-links.vue'
import Sidebar from '~/components/sidebar.vue'
import Toc from '~/components/toc.vue'

export default {
  name: 'BVDDocsLayout',
  data() {
    return {
      hasToc: false
    }
  },
  created() {
    // Only needed so we can set/clear aria-hidden on the TOC nav wrapper
    this.$root.$on('docs-set-toc', toc => {
      this.hasToc = Boolean(toc && toc.toc)
    })
  },
  render(h) {
    const $sidebarCol = h(
      'b-col',
      {
        staticClass: 'bd-sidebar border-bottom-0',
        props: { cols: 12, md: 3, xl: 2 }
      },
      [h(Search), h(Sidebar)]
    )
    const $contentCol = h(
      'b-col',
      {
        staticClass: 'bd-content',
        class: ['pb-md-3', 'pl-md-5'],
        props: { cols: 12, md: 9, xl: 8 }
      },
      [
        h(DocBreadcrumbs, { class: ['float-left', 'mt-2', 'mb-0', 'mb-lg-2'] }),
        h(Feedback, { class: ['float-right', 'mt-2', 'mb-0', 'mb-lg-2'] }),
        h('div', { class: ['clearfix', 'd-block'] }),
        h(QuickLinks, { class: 'd-xl-none' }),
        h('nuxt')
      ]
    )
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
      [h(Toc)]
    )
    const $row = h('b-row', { class: ['flex-xl-nowrap2'] }, [$sidebarCol, $contentCol, $tocCol])
    const $container = h('b-container', { props: { fluid: true } }, [$row])
    return h('div', {}, [h(Header), $container, h(Footer, { props: { isDocs: true } })])
  }
}
