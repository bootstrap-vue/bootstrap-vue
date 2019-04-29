import Vue from 'vue'

//
// Generic BvEvent Object
//
export type BvEvent {
  type: string
  cancelable: boolean
  nativeEvent: any
  target: any
  relatedTarget: any
  defaultPrevented: boolean
  vueTarget: Vue | null
  componentId: string | null
  preventDefault: () => void
  // Catch all
  [key: string]: any
}
