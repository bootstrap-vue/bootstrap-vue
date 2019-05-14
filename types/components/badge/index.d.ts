//
// Badge
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const BadgePlugin: BadgePlugin
export default BadgePlugin
export interface BadgePlugin extends BvPlugin {}

// Component: b-badge
export declare class BBadge extends Vue {}
