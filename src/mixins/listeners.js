import { isVue2 } from '../vue'
import { makePropCacheMixin } from '../utils/cache'
import { keys } from '../utils/object'

export default makePropCacheMixin(
  isVue2 ? '$attrs' : '$listeners',
  'bvListeners',
  isVue2
    ? data =>
        keys(data).reduce(
          (result, key) => (key.indexOf('on') === 0 ? { ...result, [key]: data[key] } : result),
          {}
        )
    : null
)
