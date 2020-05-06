import CarbonAd from '~/components/carbon-ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import {
  bootstrapVersion,
  defaultConfig,
  nuxtVersion,
  popperVersion,
  portalVueVersion,
  version,
  vueVersion
} from '~/content'
import meta from '~/markdown/intro/meta.json'
import readmeData from '~/markdown/intro/README.md'

const { titleLead = '', body = '', baseTOC = {} } = readmeData

// RegExp to grab the minor version from a full version
const minorRE = /^(\d+\.\d+)(\..+)$/
// RegExp to grab the major version from a full version
const majorRE = /^(\d+)(\.\d+\..+)$/

// @vue/component
export default {
  name: 'BDVDocs',
  layout: 'docs',
  components: {
    CarbonAd,
    Main,
    QuickLinks,
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
      popperVersion,
      popperVersionMinor: popperVersion.replace(minorRE, '$1'),
      popperVersionMajor: popperVersion.replace(majorRE, '$1'),
      portalVueVersion,
      portalVueVersionMinor: portalVueVersion.replace(minorRE, '$1'),
      portalVueVersionMajor: portalVueVersion.replace(majorRE, '$1'),
      titleLead,
      body,
      baseTOC,
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
    meta() {
      return meta
    }
  },
  // We use a string template here so that the docs README can do interpolation
  template: `
    <Main>
      <Section tag="header">${titleLead}</Section>
      <CarbonAd key="ad-/docs"></CarbonAd>
      <QuickLinks key="quick-/docs"></QuickLinks>
      <Section>${body}</Section>
    </Main>`
}
