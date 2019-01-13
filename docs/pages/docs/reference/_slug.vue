<template>
  <div class="container">
    <div v-play class="bd-content" v-html="readme" />
  </div>
</template>

<script>
import { reference as _meta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'

const getReadMe = name =>
  import('~/markdown/reference/' + name + '/README.md' /* webpackChunkName: "docs/reference" */)

export default {
  mixins: [docsMixin],
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
