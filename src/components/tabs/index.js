import BTabs from './tabs'
import BTab from './tab'
import { installFactory } from '../../utils/plugins'

const components = {
  BTabs,
  BTab
}

export default {
  install: installFactory({ components })
}
