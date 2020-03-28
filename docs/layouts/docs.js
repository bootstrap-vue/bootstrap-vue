import BVBreadcrumbs from '~/components/breadcrumbs.vue'
import BVFeedback from '~/components/feedback'
import BVFooter from '~/components/footer'
import BVHeader from '~/components/header'
import BVSearch from '~/components/search'
import BVSidebar from '~/components/sidebar.vue'
import BVToc from '~/components/toc.vue'

export default {
  name: 'BVDocsLayout',
  render(h) {
    const $sidebarCol = h(
      'b-col',
      {
        staticClass: 'bd-sidebar border-bottom-0',
        props: { cols: 12, md: 3, xl: 2 }
      },
      [h(BVSearch), h(BVSidebar)]
    )
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
    const $row = h('b-row', { class: ['flex-xl-nowrap2'] }, [$sidebarCol, $contentCol, $tocCol])
    const $container = h('b-container', { props: { fluid: true } }, [$row])
    return h('div', {}, [h(BVHeader), $container, h(BVFooter, { props: { isDocs: true } })])
  }
}
