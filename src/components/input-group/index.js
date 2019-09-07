import { BInputGroup } from './input-group'
import { BInputGroupAddon } from './input-group-addon'
import { BInputGroupPrepend } from './input-group-prepend'
import { BInputGroupAppend } from './input-group-append'
import { BInputGroupText } from './input-group-text'
import { pluginFactory } from '../../utils/plugins'

const InputGroupPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BInputGroup,
    BInputGroupAddon,
    BInputGroupPrepend,
    BInputGroupAppend,
    BInputGroupText
  }
})

export {
  InputGroupPlugin,
  BInputGroup,
  BInputGroupAddon,
  BInputGroupPrepend,
  BInputGroupAppend,
  BInputGroupText
}
