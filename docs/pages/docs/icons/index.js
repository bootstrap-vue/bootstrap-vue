import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { icons as iconsMeta } from '~/content'
import readme from '~/../src/icons/README.md'
import { iconNames } from '~/../src/index'

export default {
  name: 'BDVIcons',
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
      readme: readme,
      // key for icons meta is '' (empty slug)
      meta: iconsMeta[''],
      // List of icon components [BIconIconName, ...]
      iconNames: iconNames.filter(name => name !== 'BIcon'),
      // Used in the template README for filtering icons
      iconFilter: ''
    }
  },
  computed: {
    computedIconNames() {
      const rx = /^BIcon/
      const kebabRx = /\B([A-Z])/g
      return this.iconNames.map(name => {
        return name.replace(rx, '')
          .replace(kebabRx, '-$1')
          .toLowerCase()
      })
    },
    filteredIcons() {
      const search = this.iconFilter.toLowerCase().trim()
      const terms = search.split(/\s+/)
      if (terms.length === 0) {
        return this.computedIconNames
      }
      return this.computedIconNames.filter(name => {
        return terms.every(term => name.indexOf(term) !== -1)
      })
    }
  }
}
