<template>
  <main class="container">
    <div class="bd-content" v-html="readme" v-play></div>
    <section class="bd-content">
      <h2 id="directive-reference">{{ metaTitle }} Directive Reference</h2>
      <importdoc :meta="meta"></importdoc>
    </section>
  </main>
</template>

<script>
import importdoc from '~/components/importdoc.vue';
import { directives as _meta } from "~/content";
import docsMixin from "~/plugins/docs-mixin";
import startCase from 'lodash/startCase'

const getReadMe = name => import('~/../src/directives/' + name + '/README.md' /* webpackChunkName: "docs/directives" */)

export default {
  mixins: [docsMixin],
  components: { importdoc },
  computed: {
    metaTitle () {
      return startCase(this.meta.title)
    }
  },
  layout: "docs",
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
