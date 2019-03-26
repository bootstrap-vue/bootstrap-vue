import BLink from './link'
import { installFactory } from '../../utils/plugins'

const components = {
  BLink
}

export default {
  install: installFactory({ components })
}
