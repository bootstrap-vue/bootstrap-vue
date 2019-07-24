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

// RegExp to grab the minor version from a full version
const minorRE = /^(\d+\.\d+)(\..+)$/
// RegExp to grab the major version from a full version
const majorRE = /^(\d+)(\.\d+\..+)$/

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
      bootstrapVersionMinor: bootstrapVersion.replace(minorRE, '$1'),
      bootstrapVersionMajor: bootstrapVersion.replace(majorRE, '$1'),
      defaultConfig,
      nuxtVersion,
      nuxtVersionMinor: nuxtVersion.replace(minorRE, '$1'),
      nuxtVersionMajor: nuxtVersion.replace(majorRE, '$1'),
      portalVueVersion,
      portalVueVersionMinor: portalVueVersion.replace(minorRE, '$1'),
      portalVueVersionMajor: portalVueVersion.replace(majorRE, '$1'),
      readme,
      vueVersion,
      vueVersionMinor: '2.5',
      vueVersionMajor: vueVersion.replace(majorRE, '$1')
    }
  }
}
