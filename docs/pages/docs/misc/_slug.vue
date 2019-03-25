<tempalte>
  <div class="container">
    <div class="bd-content" v-html="readme" />
  </div>
</template>

<script>
import { misc as _meta, defaultConfig } from '~/content'
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
    const meta = _meta[params.slug]
    let readme = await getReadMe(params.slug)
    readme = readme.default
    /*
    if (params.slug === 'settings') {
      // Replace the defaultConfig placeholder (if found)
      readme = readme.replace('{{ defaultConfig }}', JSON.stringify(defaultConfig, 2))
    }
    */
    return {
      readme,
      meta
    }
  }
}
</script>
