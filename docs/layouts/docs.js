import BVAd from '~/components/ad'
import BVBreadcrumbs from '~/components/breadcrumbs.vue'
import BVFeedback from '~/components/feedback'
import BVFooter from '~/components/footer'
import BVHeader from '~/components/header'
import BVQuickLinks from '~/components/quick-links.vue'
import BVSearch from '~/components/search'
import BVSidebar from '~/components/sidebar.vue'
import BVToc from '~/components/toc.vue'

export default {
  name: 'BVDocsLayout',
  data() {
    return {
      hasToc: false,
      contentElements: ['ad', 'quick-links'],
      contentElementsVisible: false
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
    renderAd() {
      return ['/', '/play'].indexOf(this.currentPath) === -1
    }
  },
  created() {
    this.$root.$on('docs-set-toc', toc => {
      // Only needed so we can set/clear aria-hidden on the TOC nav wrapper
      this.hasToc = Boolean(toc && toc.toc)

      // Re-position the content elements
      this.$nextTick(() => {
        this.positionContentElements()
      })
    })
  },
  mounted() {
    // Position the content elements and show them afterwards
    this.$nextTick(() => {
      this.positionContentElements()
      this.contentElementsVisible = true
    })
  },
  methods: {
    // Move the elements to the correct position, if possible
    positionContentElements() {
      const $body = document.body
      const $referenceNode = $body.querySelector('.bd-lead') || $body.querySelector('h1')
      if ($referenceNode) {
        // Get the content elements by their ref names
        // Ensure the refs exits
        const $contentElements = this.contentElements
          .map(name => {
            const $node = this.$refs[name]
            return $node ? $node.$el || $node : null
          })
          .filter(v => !!v)
        // We add the elements in reverse order after the `$referenceNode`
        // to ensure the correct order
        $contentElements.reverse().forEach($contentElement => {
          // IE 11 doesn't support the `node.after()` method, and appears
          // that the polyfill doesn't polyfill this method
          $referenceNode.insertAdjacentElement('afterend', $contentElement)
        })
      }
    }
  },
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
        this.renderAd
          ? h(BVAd, {
              class: { invisible: !this.contentElementsVisible },
              // We apply the route path as key to change the ad on every page
              key: this.currentPath,
              ref: 'ad'
            })
          : h(),
        h(BVQuickLinks, {
          class: 'd-xl-none',
          directives: [{ name: 'show', value: this.contentElementsVisible }],
          ref: 'quick-links'
        }),
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
