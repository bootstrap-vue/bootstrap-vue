<template>
  <Main>
    <Section>
      <h1 :id="id" tabindex="-1">
        <span class="bd-content-title">{{ groupTitle }}</span>
      </h1>
      <nav class="bd-section-contents" :aria-labelledby="id">
        <ul>
          <li v-for="page in pages" :key="page.slug">
            <b-link :to="`/docs/${slug}/${page.slug}`" active-class="">
              {{ page.title }}
            </b-link>
          </li>
        </ul>
      </nav>
    <Section>
  </Main>
</template>

<style scoped>
.bd-section-contents ul {
  list-item-style: square;
}
</style>

<script>
import Main from '~/components/main'
import Section from '~/components/section'
import { nav } from '~/content'

export default {
  layout: 'docs',
  components: {
    Main,
    Section
  },
  computed: {
    id() {
      return `bd-section-toc-${this.slug}`
    },
    slug() {
      return this.$route.path.split('/')[1] || ''
    },
    group() {
      return nav[this.slug] || {}
    },
    groupTitle() {
      return this.group.title || ''
    },
    pages() {
      return this.group.pages || []
    }
  }
}
</script>
