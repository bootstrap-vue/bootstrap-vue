import Vue from 'vue'

//
// Generic BvEvent Object
//
export type BvEvent {
  readonly type: string
  readonly cancelable: boolean
  readonly nativeEvent: any
  readonly target: any
  readonly relatedTarget: any
  readonly defaultPrevented: boolean
  readonly vueTarget: Vue | null
  readonly componentId: string | null
  preventDefault: () => void
  // Catch all
  [key: string]: any
}
