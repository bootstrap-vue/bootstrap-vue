<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme" />
    <section class="bd-content">
      <h2 id="directive-reference">{{ metaTitle }} Directive Reference</h2>
      <importdoc :meta="meta" />
    </section>
  </main>
</template>

<script>
import importdoc from '~/components/importdoc.vue'
import { directives as _meta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import startCase from 'lodash/startCase'

const getReadMe = name =>
  import('~/../src/directives/' + name + '/README.md' /* webpackChunkName: "docs/directives" */)

export default {
  components: { importdoc },
  mixins: [docsMixin],
  computed: {
    metaTitle() {
      return startCase(this.meta.title)
    }
  },
  layout: 'docs',
  validate({ params }) {
    return Boolean(_meta[params.slug])
  },
  async asyncData({ params }) {
    const readme = await getReadMe(params.slug)
    const meta = _meta[params.slug]
    return {
      readme: readme.default,
      meta
    }
  }
}
</script>
