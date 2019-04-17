import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { bootstrapVersion, vueVersion, nuxtVersion, portalVueVersion, defaultConfig } from '~/content'
import readme from '~/markdown/intro/README.md'

export default {
  name: 'BDDocs',
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
      readme,
      bootstrapVersion,
      portalVueVersion,
      vueVersion,
      nuxtVersion,
      defaultConfig
    }
  }
}
