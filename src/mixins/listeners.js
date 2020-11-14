import { isVue2 } from '../vue'
import { makePropCacheMixin } from '../utils/cache'
import { isPlainObject } from '../utils/inspect'
import { keys } from '../utils/object'
import { lowerFirst } from '../utils/string'

// --- Constants ---

const LISTENER_KEY_PREFIX = 'on'

// --- Helper methods ---

const normalizeProp = data =>
  isPlainObject(data)
    ? keys(data).reduce(
        (result, key) =>
          key.indexOf(LISTENER_KEY_PREFIX) === 0
            ? { ...result, [lowerFirst(key.substring(LISTENER_KEY_PREFIX.length))]: data[key] }
            : result,
        {}
      )
    : data

// --- Mixin ---
export default makePropCacheMixin(
  isVue2 ? '$listeners' : '$attrs',
  'bvListeners',
  isVue2 ? null : normalizeProp
)
