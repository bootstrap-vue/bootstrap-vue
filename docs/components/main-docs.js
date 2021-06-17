import CarbonAd from '~/components/carbon-ad'
import Main from '~/components/main'
import QuickLinks from '~/components/quick-links'
import Reload from '~/components/reload'
import Section from '~/components/section'
import { mergeData } from 'vue-functional-data-merge'
import { bootstrapVersion, vueVersion } from '~/content'

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
    },
    loadError: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, data, children }) {
    const { tag, titleLead, body, meta, loadError } = props
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

    // Error handler
    const $error = loadError ? h(Reload) : h()

    // Carbon Ad
    const $carbonAd = h(CarbonAd)

    // Quick links
    const $quickLinks = h(QuickLinks)

    // Body section
    const $bodySectionContent = h({
      delimiters: ['[[', ']]'], // change the delimiters to avoid conflicts with code examples
      data() {
        return {
          bootstrapVersion,
          vueVersion
        }
      },
      template: `<div>${body}</div>`
    })

    const $bodySection = h(
      Section,
      {
        props: { play: true }
      },
      [$bodySectionContent]
    )

    return h(Main, mergeData(data, { props: { tag } }), [
      $leadSection,
      $error,
      $availableSinceSection,
      $carbonAd,
      $quickLinks,
      $bodySection,
      children
    ])
  }
}
