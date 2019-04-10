<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme"></div>

    <section class="bd-content">
      <anchored-heading id="component-reference" level="2">
        Component reference
      </anchored-heading>

      <!-- Component reference information -->
      <componentdoc
        v-for="meta in meta.components"
        :key="meta.component"
        :component="meta.component"
        :events="meta.events"
        :root-event-listeners="meta.rootEventListeners"
        :slots="meta.slots"
        :aliases="meta.aliases"
      ></componentdoc>

      <!-- Component importing information -->
      <importdoc :meta="meta"></importdoc>
    </section>
  </main>
</template>

<script>
import AnchoredHeading from '~/components/anchored-heading'
import Componentdoc from '~/components/componentdoc'
import Importdoc from '~/components/importdoc'
import docsMixin from '~/plugins/docs-mixin'
import { components as componentsMeta } from '~/content'

const getReadMe = name =>
  import(`~/../src/components/${name}/README.md` /* webpackChunkName: "docs/components" */)

export default {
  layout: 'docs',
  components: {
    Componentdoc,
    Importdoc,
    AnchoredHeading
  },
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(componentsMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = componentsMeta[params.slug]
    return { readme, meta }
  }
}
</script>
