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
const minorRe = /^(\d+\.\d+)(\..+)$/
// RegExp to grab the major version from a full version
const majorRe = /^(\d+)(\.\d+\..+)$/

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
      bootstrapVersionMinor: bootstrapVersion.replace(minorRe, '$1'),
      bootstrapVersionMajor: bootstrapVersion.replace(majorRe, '$1'),
      defaultConfig,
      nuxtVersion,
      nuxtVersionMinor: nuxtVersion.replace(minorRe, '$1'),
      nuxtVersionMajor: nuxtVersion.replace(majorRe, '$1'),
      portalVueVersion,
      portalVueVersionMinor: portalVueVersion.replace(minorRe, '$1'),
      portalVueVersionMajor: portalVueVersion.replace(majorRe, '$1'),
      readme,
      vueVersion,
      vueVersionMinor: '2.5',
      vueVersionMajor: vueVersion.replace(majorRe, '$1')
    }
  }
}
