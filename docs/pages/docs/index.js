import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import {
  bootstrapVersion,
  defaultConfig,
  nuxtVersion,
  portalVueVersion,
  version,
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
      version,
      vueVersion,
      vueVersionMinor: vueVersion.replace(minorRE, '$1'),
      vueVersionMajor: vueVersion.replace(majorRE, '$1')
    }
  },
  computed: {
    hrefBootstrapBrowserDevices() {
      const minorVersion = this.bootstrapVersionMinor
      return `//getbootstrap.com/docs/${minorVersion}/getting-started/browsers-devices`
    },
    // TODO: pull this from the meta.json file
    meta() {
      return {
        title: 'Getting started',
        description:
          "Get started with BootstrapVue, based on the world's most popular framework - Bootstrap v4, for building responsive, mobile-first sites using Vue.js"
      }
    }
  }
}
