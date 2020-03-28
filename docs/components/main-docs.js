import CarbonAd from '~/components/carbon-ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links.vue'
import Section from '~/components/section'
import { parseReadme } from '~/utils'

export default {
  name: 'BVMainDocs',
  props: {
    readme: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'main'
    }
  },
  computed: {
    docs() {
      return parseReadme(this.readme || '')
    },
    titleLead() {
      return this.docs.titleLead || ''
    },
    body() {
      return this.docs.body || this.readme
    },
    docsPath() {
      return this.$route.path
    }
  },
  render(h) {
    // Lead section
    const $leadSection = h(Section, {
      props: { play: false },
      domProps: { innerHTML: this.titleLead }
    })
    // CarbonAd
    const $carbonAd = h(CarbonAd, { key: `ad-${this.docPath}` })
    // Quick links
    const $quickLinks = h(QuickLinks, { key: `quick-${this.docsPath}` })
    // Body section
    const $bodySection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: this.body }
    })

    return h(Main, { props: { tag: this.tag }, staticClass: 'bd-main' }, [
      $leadSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      this.$scopedSlots.default ? this.$scopedSlots.default() : this.$slots.default
    ])
  }
}
