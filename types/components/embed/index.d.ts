//
// Embed
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const EmbedPlugin: EmbedPlugin
export default EmbedPlugin
export interface EmbedPlugin extends BvPlugin {}

// Component: b-embed
export interface BEmbed extends Vue {}
