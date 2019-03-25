import BBadge from './badge'
import { installFactory } from '../../utils/plugins'

const components = {
  BBadge
}

export default {
  install: installFactory({ components })
}
