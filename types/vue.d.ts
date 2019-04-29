/**
 * Augment the typings of Vue.js
 */
import Vue from "vue"
import { BvModal } from "./modal"
import { BvToast } from "./toast"

declare module "vue/types/vue" {
  interface Vue {
    $BvModal: BvModal
    $bvToast: BvToast
  }
}
