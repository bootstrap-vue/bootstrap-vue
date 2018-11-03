import { mergeData } from 'vue-functional-data-merge'
import InputGroupAddon, { commonProps } from './input-group-addon'

export default {
  functional: true,
  props: commonProps,
  render (h, { data, children }) {
    // pass all our props/attrs down to child, and set`append` to false
    return h(InputGroupAddon,
             mergeData(data, { props: {append: false} }),
             children
    )
  }
}
