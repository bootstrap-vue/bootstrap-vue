//
// Link
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Link: Link
export default Link
export interface Link extends BvPlugin {}

// Component: b-link
export interface BLink extends Vue {}
