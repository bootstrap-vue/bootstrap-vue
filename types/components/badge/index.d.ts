//
// Badge
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Badge: Badge
export default Badge
export interface Badge extends BvPlugin {}

// Component: b-badge
export interface BBadge extends Vue {}
