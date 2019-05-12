import BMedia from './media'
import BMediaAside from './media-aside'
import BMediaBody from './media-body'
import { installFactory } from '../../utils/plugins'

const components = {
  BMedia,
  BMediaAside,
  BMediaBody
}

export { BMedia, BMediaAside, BMediaBody }

export default {
  install: installFactory({ components })
}
