<template>
  <main class="container">
    <div class="bd-content" v-html="readme"></div>
  </main>
</template>

<script>
import hljs from 'highlight.js'
import docsMixin from '~/plugins/docs-mixin'
import { misc as _meta, defaultConfig } from '~/content'

const getReadMe = name =>
  import(`~/markdown/misc/${name}/README.md` /* webpackChunkName: "docs/misc" */)

export default {
  layout: 'docs',
  mixins: [docsMixin],
  validate({ params }) {
    return Boolean(_meta[params.slug])
  },
  async asyncData({ params }) {
    let readme = (await getReadMe(params.slug)).default
    readme = readme.replace(
      '{{ defaultConfig }}',
      hljs.highlight('json', JSON.stringify(defaultConfig || {}, undefined, 2)).value
    )
    const meta = _meta[params.slug]
    return { readme, meta }
  }
}
</script>
