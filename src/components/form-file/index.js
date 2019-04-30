import BFormFile from './form-file'
import { installFactory } from '../../utils/plugins'

const components = {
  BFormFile,
  BFile: BFormFile
}

export { BFormFile }

export default {
  install: installFactory({ components })
}
