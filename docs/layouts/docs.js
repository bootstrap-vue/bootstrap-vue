import Feedback from '~/components/feedback'
import Header from '~/components/header'
import Search from '~/components/search'
import Sidebar from '~/components/sidebar.vue'
import Toc from '~/components/toc.vue'

export default {
  name: 'BVDDocsLayout',
  functional: true,
  render: h => {
    const $sidebarCol = h(
      'b-col',
      {
        staticClass: 'bd-sidebar',
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
        h(Feedback, { class: ['float-right', 'mt-2', 'mb-0', 'mb-lg-2'] }),
        h('div', { class: ['clearfix', 'd-bock', 'd-lg-none'] }),
        h('nuxt')
      ]
    )
    const $tocCol = h(
      'b-col',
      {
        staticClass: 'bd-toc',
        class: ['d-none', 'd-xl-block'],
        props: { xl: 2 }
      },
      [h(Toc)]
    )
    const $row = h('b-row', { class: ['flex-xl-nowrap2'] }, [$sidebarCol, $contentCol, $tocCol])
    const $container = h('b-container', { props: { fluid: true } }, [$row])
    return [h(Header), $container]
  }
}
