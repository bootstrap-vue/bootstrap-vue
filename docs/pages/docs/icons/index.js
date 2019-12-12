import Main from '~/components/main'
import Section from '~/components/section'
import IconsTable from '~/components/icons-table'
import docsMixin from '~/plugins/docs-mixin'
import { icons as iconsMeta } from '~/content'
import readme from '~/../src/icons/README.md'

export default {
  name: 'BDVIcons',
  layout: 'docs',
  // We use a string template here so that the docs README can do interpolation
  template: `<Main><Section>${readme}</Section></Main>`,
  components: {
    Main,
    Section,
    IconsTable
  },
  mixins: [docsMixin],
  data() {
    return {
      readme: readme,
      // key for icons meta is '' (empty slug)
      meta: iconsMeta['']
    }
  },
  mounted() {
    // Debug
    console.log('iconsMeta data:', iconsMeta)
  }
}
