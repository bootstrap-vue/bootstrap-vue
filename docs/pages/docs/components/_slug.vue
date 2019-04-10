<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme"></div>

    <section class="bd-content">
      <anchored-heading id="component-reference" level="2">
        {{ startCase(meta.title) }} Component Reference
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
import { components as componentsMeta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import startCase from 'lodash/startCase'

const getReadMe = name =>
  import(`~/../src/components/${name}/README.md` /* webpackChunkName: "docs/components" */)

export default {
  components: {
    Componentdoc,
    Importdoc,
    AnchoredHeading
  },
  mixins: [docsMixin],
  layout: 'docs',
  async asyncData({ params }) {
    const readme = await getReadMe(params.slug)
    const meta = componentsMeta[params.slug]

    return {
      readme: readme.default,
      meta
    }
  },
  methods: {
    startCase
  },
  validate({ params }) {
    return Boolean(componentsMeta[params.slug])
  }
}
</script>
