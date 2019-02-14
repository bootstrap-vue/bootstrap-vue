<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme" />

    <section class="bd-content">
      <h2 id="component-reference">{{ startCase(meta.title) }} Component Reference</h2>

      <!-- main component reference information -->
      <componentdoc
        :component="meta.component"
        :events="meta.events"
        :root-event-emitters="meta.rootEventEmitters"
        :slots="meta.slots"
        :aliases="meta.aliases"
      />

      <!-- sub-component reference information -->
      <componentdoc
        v-for="meta in meta.components"
        :key="meta.component"
        :component="meta.component"
        :events="meta.events"
        :slots="meta.slots"
        :aliases="meta.aliases"
      />

      <!-- Component importing information -->
      <importdoc :meta="meta" />
    </section>
  </main>
</template>

<script>
import componentdoc from '~/components/componentdoc.vue'
import importdoc from '~/components/importdoc.vue'
import { components as _meta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'
import startCase from 'lodash/startCase'

const getReadMe = name =>
  import('~/../src/components/' + name + '/README.md' /* webpackChunkName: "docs/components" */)

export default {
  components: { componentdoc, importdoc },
  mixins: [docsMixin],
  layout: 'docs',
  methods: {
    startCase
  },
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
