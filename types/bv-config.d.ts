import Vue, { PluginFunction, PluginObject } from 'vue'
import { BvPlugin } from './bv-plugin'

declare const BVConfigPlugin: BVConfigPlugin
export default BVConfigPlugin
export interface BVConfigPlugin extends BvPlugin {}
