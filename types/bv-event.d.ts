import Vue, {Component } from 'vue'

//
// Generic BvEvent Object
//
export interface BvEvent {
  readonly type: string
  readonly cancelable: boolean
  readonly nativeEvent: any
  readonly target: any
  readonly relatedTarget: any
  readonly defaultPrevented: boolean
  readonly vueTarget: Vue | Component | null
  readonly componentId: string | null
  preventDefault: () => void
  // Catch all
  [key: string]: any
}
