import SectionToc from '~/components/section-toc'
import docsMixin from '~/plugins/docs-mixin'

// @vue/component
export default {
  name: 'BVDocsComponentsIndex',
  extends: SectionToc,
  mixins: [docsMixin]
}
