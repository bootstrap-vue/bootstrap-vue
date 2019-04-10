<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme"></div>
    <section class="bd-content">
      <anchored-heading id="directive-reference" level="2">
        {{ metaTitle }} Directive Reference
      </anchored-heading>
      <importdoc :meta="meta"></importdoc>
    </section>
  </main>
</template>

<script>
import AnchoredHeading from '~/components/anchored-heading'
import Importdoc from '~/components/importdoc.vue'
import { directives as directivesMeta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import startCase from 'lodash/startCase'

const getReadMe = name =>
  import(`~/../src/directives/${name}/README.md` /* webpackChunkName: "docs/directives" */)

export default {
  components: {
    AnchoredHeading,
    Importdoc
  },
  mixins: [docsMixin],
  computed: {
    metaTitle() {
      return startCase(this.meta.title)
    }
  },
  layout: 'docs',
  validate({ params }) {
    return Boolean(directivesMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = await getReadMe(params.slug)
    const meta = directivesMeta[params.slug]
    return {
      readme: readme.default,
      meta
    }
  }
}
</script>
