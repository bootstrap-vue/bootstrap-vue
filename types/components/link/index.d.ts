//
// Link
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const LinkPlugin: LinkPlugin
export default LinkPlugin
export interface LinkPlugin extends BvPlugin {}

// Component: b-link
export interface BLink extends Vue {}
