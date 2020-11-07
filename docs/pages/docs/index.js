import CarbonAd from '~/components/carbon-ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import {
  bootstrapIconsCount,
  bootstrapVersion,
  bootstrapVersionMajor,
  bootstrapVersionMinor,
  nuxtVersion,
  nuxtVersionMajor,
  nuxtVersionMinor,
  popperVersion,
  popperVersionMajor,
  popperVersionMinor,
  portalVueVersion,
  portalVueVersionMajor,
  portalVueVersionMinor,
  version,
  vueVersion,
  vueVersionMajor,
  vueVersionMinor
} from '~/content'
import meta from '~/markdown/intro/meta.json'
import readmeData from '~/markdown/intro/README.md'

const { titleLead = '', body = '', baseTOC = {} } = readmeData

// @vue/component
export default {
  name: 'BDVDocs',
  components: {
    CarbonAd,
    Main,
    QuickLinks,
    Section
  },
  mixins: [docsMixin],
  layout: 'docs',
  data() {
    return {
      bootstrapVersion,
      bootstrapVersionMinor,
      bootstrapVersionMajor,
      bootstrapIconsCount,
      nuxtVersion,
      nuxtVersionMinor,
      nuxtVersionMajor,
      popperVersion,
      popperVersionMinor,
      popperVersionMajor,
      portalVueVersion,
      portalVueVersionMinor,
      portalVueVersionMajor,
      titleLead,
      body,
      baseTOC,
      version,
      vueVersion,
      vueVersionMinor,
      vueVersionMajor
    }
  },
  computed: {
    bootstrapBrowserDevicesHref() {
      const { bootstrapVersionMinor: version } = this
      return `https://getbootstrap.com/docs/${version}/getting-started/browsers-devices`
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
