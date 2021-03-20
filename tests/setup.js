import '@testing-library/jest-dom'
import { config as vtuConfig } from '@vue/test-utils'

// Don't stub `<transition>` and `<transition-group>` components
vtuConfig.global.stubs.transition = false
vtuConfig.global.stubs['transition-group'] = false
