import SectionToc from '~/components/section-toc'
import docsMixin from '~/plugins/docs-mixin'

// @vue/component
export default {
  name: 'BVDocsReferenceIndex',
  extends: SectionToc,
  mixins: [docsMixin]
}
