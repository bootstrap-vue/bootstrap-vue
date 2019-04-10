<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme"></div>

    <section class="bd-content">
      <anchored-heading id="directive-reference" level="2">
        {{ metaTitle }} Directive Reference
      </anchored-heading>

      <!-- Directive importing information -->
      <importdoc :meta="meta"></importdoc>
    </section>
  </main>
</template>

<script>
import startCase from 'lodash/startCase'
import AnchoredHeading from '~/components/anchored-heading'
import Importdoc from '~/components/importdoc.vue'
import docsMixin from '~/plugins/docs-mixin'
import { directives as directivesMeta } from '~/content'

const getReadMe = name =>
  import(`~/../src/directives/${name}/README.md` /* webpackChunkName: "docs/directives" */)

export default {
  layout: 'docs',
  components: {
    Importdoc,
    AnchoredHeading
  },
  mixins: [docsMixin],
  computed: {
    metaTitle() {
      return startCase(this.meta.title)
    }
  },
  validate({ params }) {
    return Boolean(directivesMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = directivesMeta[params.slug]
    return { readme, meta }
  }
}
</script>
