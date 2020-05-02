import CarbonAd from '~/components/carbon-ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links'
import Section from '~/components/section'
import { mergeData } from 'vue-functional-data-merge'

// @vue/component
export default {
  name: 'BVMainDocs',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'main'
    },
    titleLead: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    meta: {
      type: Object,
      default: null
    }
  },
  render(h, { props, data, children }) {
    const { tag, titleLead, body, meta } = props
    const { version } = meta || {}

    // Lead section
    const $leadSection = h(Section, {
      props: { tag: 'header', play: false },
      domProps: { innerHTML: titleLead || '' }
    })

    // Available since section
    let $availableSinceSection = h()
    if (version) {
      $availableSinceSection = h(Section, { props: { play: false } }, [
        h('p', { staticClass: 'font-italic' }, [
          'Available in BootstrapVue since ',
          h('code', { staticClass: 'text-nowrap' }, `v${version}`)
        ])
      ])
    }

    // Carbon Ad
    const $carbonAd = h(CarbonAd)

    // Quick links
    const $quickLinks = h(QuickLinks)

    // Body section
    const $bodySection = h(Section, {
      props: { play: true },
      domProps: { innerHTML: body || '' }
    })

    return h(Main, mergeData(data, { props: { tag } }), [
      $leadSection,
      $availableSinceSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      children
    ])
  }
}
