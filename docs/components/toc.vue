<template>
  <b-nav
    v-b-scrollspy="{ offset }"
    class="section-nav"
    vertical
  >
    <b-nav-item
      v-if="toc.title && toc.top"
      :href="toc.top"
      class="toc-entry mb-2"
      link-classes="font-weight-bold"
      @click="scrollIntoView($event, toc.top)"
    >
      <span v-html="toc.title"></span>
    </b-nav-item>

    <li
      v-for="h2 in toc.toc"
      :key="h2.href"
      class="nav-item toc-entry toc-h2 mb-1"
    >
      <b-link
        :href="h2.href"
        class="nav-link"
        @click="scrollIntoView($event, h2.href)"
      >
        <span v-html="h2.label"></span>
      </b-link>
      <b-nav
        v-if="h2.toc && h2.toc.length > 0"
        :key="`sub-${h2.href}`"
        vertical
      >
        <b-nav-item
          v-for="h3 in h2.toc"
          :key="h3.href"
          :href="h3.href"
          class="toc-entry toc-h3"
          @click="scrollIntoView($event, h3.href)"
        >
          <span v-html="h3.label"></span>
        </b-nav-item>
      </b-nav>
    </li>
  </b-nav>
</template>

<script>
import { makeTOC, offsetTop, scrollTo } from '~/utils'

export default {
  name: 'BDVToc',
  data() {
    return {
      readme: '',
      meta: null,
      offset: 0
    }
  },
  computed: {
    toc() {
      return makeTOC(this.readme, this.meta)
    }
  },
  mounted() {
    const $header = document.body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
    this.$root.$on('setTOC', (readme, meta) => {
      this.readme = readme
      this.meta = meta || null
    })
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
    }
  }
}
</script>
