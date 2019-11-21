import { BFormTags } from './form-tags'
import { BFormTag } from './form-tag'
import { pluginFactory } from '../../utils/plugins'

const FormTagsPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BFormTags,
    BTags: BFormTags,
    BFormTag,
    BTag: BFormTag
  }
})

export { FormTagsPlugin, BFormTags, BFormTag }
