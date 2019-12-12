import Main from '~/components/main'
import Section from '~/components/section'
import docsMixin from '~/plugins/docs-mixin'
import { icons as iconsMeta } from '~/content'
const getReadMe = () => import(`~/../src/icons/README.md` /* webpackChunkName: "docs/icons" */)

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
  async asyncData({ params }) {
    const readme = (await getReadMe()).default
    const meta = iconMeta
    return { readme, meta }
  },
  data() {
    return {}
  },
  computed: {}
}
