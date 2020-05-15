import '@testing-library/jest-dom'
import { config as vtuConfig } from '@vue/test-utils'

// Don't stub `<transition>` and `<transition-group>` components
vtuConfig.stubs.transition = false
vtuConfig.stubs['transition-group'] = false
