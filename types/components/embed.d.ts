//
// Embed
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Embed: Embed
export default Embed
export interface Embed extends BvPlugin {}

// Component: b-embed
export interface BEmbed extends Vue {}
