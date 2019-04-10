<template>
  <main class="container">
    <div v-play class="bd-content" v-html="readme"></div>
  </main>
</template>

<script>
import { reference as referenceMeta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'

const getReadMe = name =>
  import(`~/markdown/reference/${name}/README.md` /* webpackChunkName: "docs/reference" */)

export default {
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(referenceMeta[params.slug])
  },
  async asyncData({ params }) {
    const readme = (await getReadMe(params.slug)).default
    const meta = referenceMeta[params.slug]
    return { readme, meta }
  }
}
</script>
