import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import {
  bootstrapVersion,
  defaultConfig,
  nuxtVersion,
  portalVueVersion,
  vueVersion
} from '~/content'
import readme from '~/markdown/intro/README.md'

export default {
  name: 'BDVDocs',
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
      bootstrapVersion,
      defaultConfig,
      nuxtVersion,
      portalVueVersion,
      readme,
      vueVersion
    }
  }
}
