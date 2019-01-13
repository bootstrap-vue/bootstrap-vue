<template>
  <div>
    <m-nav />
    <b-container fluid>
      <b-row class="flex-xl-nowrap2">
        <b-col cols="12" md="3" xl="2" class="bd-sidebar">
          <m-search />
          <m-sidebar />
        </b-col>

        <b-col xl="2" class="d-none d-xl-block bd-toc pt-4">
          <m-toc />
        </b-col>

        <b-col cols="12" md="9" xl="8" class="pb-md-3 pl-md-5 bd-content">
          <b-button-group class="my-2 float-right">
            <b-btn size="sm" variant="light" :href="issueURL" target="_blank">Report an issue</b-btn>
            <b-btn size="sm" variant="light" :href="editPageURL" target="_blank">Edit this page</b-btn>
          </b-button-group>

          <nuxt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import mSidebar from '~/components/sidebar.vue'
import mNav from '~/components/nav.vue'
import mToc from '~/components/toc.vue'

// Import search.vue async in a separate chunk
const mSearch = () =>
  import('~/components/search.vue' /* webpackChunkName: "mSearch" */).then(m => m.default || m)

export default {
  components: { mSidebar, mNav, mSearch, mToc },
  computed: {
    editPageURL() {
      const base = 'https://github.com/bootstrap-vue/bootstrap-vue/tree/dev'
      let path = '/'
      const name = this.$route.name
      const slug = this.$route.params.slug
      if (name === 'docs') {
        path = `/docs/markdown/intro/README.md`
      } else if (name === 'docs-components-slug') {
        path = `/src/components/${slug}/README.md`
      } else if (name === 'docs-directives-slug') {
        path = `/src/directives/${slug}/README.md`
      } else if (name === 'docs-reference-slug') {
        path = `/docs/markdown/reference/${slug}/README.md`
      } else if (name === 'docs-misc-slug') {
        if (slug === 'changelog') {
          path = `/CHANGELOG.md`
        } else if (slug === 'contributing') {
          path = `/CONTRIBUTING.md`
        }
      }
      return base + path
    },
    issueURL() {
      // Add appreciate query params for proper issue title
      return 'https://github.com/bootstrap-vue/bootstrap-vue/issues/new?title=Docs'
    }
  }
}
</script>
