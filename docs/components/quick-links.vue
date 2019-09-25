<template>
  <nav :class="['bd-quick-links', 'mb-3', { 'd-none': !quickLinksVisible }]">
    <header>
      <b-button
        v-b-toggle.bd-quick-links-collapse
        class="font-weight-bold"
        variant="outline-secondary"
        size="sm"
        block
      >
        <span v-if="quickLinksExpanded">Hide</span>
        <span v-else>Show</span>
        page table of contents
      </b-button>
    </header>
    <b-collapse id="bd-quick-links-collapse" v-model="quickLinksExpanded" tag="ul">
      <li v-for="h2 in toc.toc" :key="h2.href">
        <b-link :href="h2.href" @click="scrollIntoView($event, h2.href)">
          <span v-html="h2.label"></span>
        </b-link>
        <ul v-if="h2.toc && h2.toc.length > 0" :key="`sub-${h2.href}`">
          <li v-for="h3 in h2.toc" :key="h3.href">
            <b-link :href="h3.href" @click="scrollIntoView($event, h3.href)">
              <span v-html="h3.label"></span>
            </b-link>
          </li>
        </ul>
      </li>
    </b-collapse>
  </nav>
</template>

<style scoped lang="scss">
#bd-quick-links-collapse {
  list-style-type: square;
  border-left: 5px solid #ccc;
  padding-left: 2.5rem;
  margin-top: 1rem;

  ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
</style>

<script>
import { offsetTop, scrollTo } from '~/utils'

export default {
  name: 'BDVToc',
  data() {
    return {
      toc: [],
      offset: 0,
      quickLinksExpanded: false,
      quickLinksVisible: false
    }
  },
  created() {
    // TODO: the TOC will be pre-processed when emitted
    this.$root.$on('docs-set-toc', toc => {
      // Reset visible/expanded states
      this.quickLinksVisible = false
      this.quickLinksExpanded = false
      // Update the TOC content
      this.toc = toc
      // Re-position the quick links
      this.positionQuickLinks()
    })
  },
  mounted() {
    // Set the correct offset based on the header height
    const $header = document.body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
    // Re-position the quick links
    this.positionQuickLinks()
  },
  methods: {
    isArray(value) {
      return Array.isArray(value)
    },
    scrollIntoView(evt, href) {
      evt.preventDefault()
      evt.stopPropagation()
      // We use an attribute `querySelector()` rather than `getElementByID()`,
      // as some auto-generated ID's are invalid or not unique
      const id = (href || '').replace(/#/g, '')
      const $el = document.body.querySelector(`[id="${id}"]`)
      if ($el) {
        // Get the document scrolling element
        const scroller = document.scrollingElement || document.documentElement || document.body
        // Scroll heading into view (minus offset to account for nav top height
        scrollTo(scroller, offsetTop($el) - 70, 100, () => {
          // Set a tab index so we can focus header for a11y support
          $el.tabIndex = -1
          // Focus the heading
          $el.focus()
        })
      }
    },
    positionQuickLinks() {
      // Move the quick links to the correct position, if possible
      if (typeof document !== 'undefined') {
        const $body = document.body
        const $referenceNode = $body.querySelector('.bd-lead') || $body.querySelector('h1')
        if ($referenceNode) {
          // IE 11 doesn't support the `node.after()` method, and appears
          // that the polyfill doesn't polyfill this method
          $referenceNode.insertAdjacentElement('afterend', this.$el)
        }
        // Make the quick links visible
        // We hide them initially to make the position change not that distracting
        this.quickLinksVisible = true
      }
    }
  }
}
</script>
