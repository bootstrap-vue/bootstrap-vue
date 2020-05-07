import { config as vtuConfig } from '@vue/test-utils'
import { TransitionGroupStub, TransitionStub } from './components'

vtuConfig.stubs['transition-group'] = TransitionGroupStub
vtuConfig.stubs.transition = TransitionStub
