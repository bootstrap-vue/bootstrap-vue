import CarbonAd from '~/components/carbon-ad'
import QuickLinks from '~/components/quick-links.vue'
import Section from '~/components/section'
import { parseReadme } from '~/utils'

export default {
  name: 'BVMainDocs',
  props: {
    titleLead: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    readme: {
      type: String,
      default: ''
    },
    meta: {
      type: Object,
      default: null
    },
    tag: {
      type: String,
      default: 'main'
    }
  },
  render(h) {
    const docsPath = this.$route.path
    const { titleLead, body } = parseReadme(this.readme || '')
    const { version } = this.meta || {}

    // Lead section
    const $leadSection = h(Section, {
      key: `lead-${docsPath}`,
      props: { tag: 'header', play: false },
      domProps: { innerHTML: titleLead || '' }
    })

    // Available since section
    let $availableSinceSection = h()
    if (version) {
      $availableSinceSection = h(Section, { key: `avail-${docsPath}`, props: { play: false } }, [
        h('p', { staticClass: 'font-italic' }, [
          'Available in BootstrapVue since ',
          h('code', { staticClass: 'text-nowrap' }, `v${version}`)
        ])
      ])
    }

    // Carbon Ad
    const $carbonAd = h(CarbonAd, { key: `ad-${docsPath}` })

    // Quick links
    const $quickLinks = h(QuickLinks, { key: `quick-${docsPath}` })

    // Body section
    const $bodySection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: body || '' }
    })

    return h(this.tag, { staticClass: 'bd-main' }, [
      $leadSection,
      $availableSinceSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      this.$scopedSlots.default ? this.$scopedSlots.default() : this.$slots.default
    ])
  }
}
