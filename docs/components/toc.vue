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
        @click="scrollTargetIntoView($event, h2.href)"
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
          @click="scrollTargetIntoView($event, h3.href)"
        >
          <span v-html="h3.label"></span>
        </b-nav-item>
      </b-nav>
    </li>
  </b-nav>
</template>

<script>
import { scrollTargetIntoView } from '~/utils'

export default {
  name: 'BVToc',
  data() {
    return {
      toc: {},
      offset: 0
    }
  },
  created() {
    this.$root.$on('docs-set-toc', toc => {
      this.toc = toc
    })
  },
  mounted() {
    const $header = document.body.querySelector('header.navbar')
    if ($header) {
      this.offset = $header.offsetHeight + 6
    }
  },
  methods: {
    scrollTargetIntoView,
    isArray(value) {
      return Array.isArray(value)
    }
  }
}
</script>
