<template>
  <div class="container">
    <div class="bd-content" v-html="readme" />
  </div>
</template>

<script>
import { misc as _meta } from '~/content'
import docsMixin from '~/plugins/docs-mixin'

const getReadMe = name =>
  import('~/markdown/misc/' + name + '/README.md' /* webpackChunkName: "docs/misc" */)

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
