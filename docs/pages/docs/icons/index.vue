import Main from '~/components/main'
import Section from '~/components/section'
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
    Section
  },
  mixins: [docsMixin],
  data() {
    return {
      readme: readme,
      meta: iconsMeta || {}
    }
  },
  computed: {}
}
