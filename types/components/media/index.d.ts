//
// Media
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Media: Media
export default Media
export interface Media extends BvPlugin {}

// Component: b-media
export interface BMedia extends Vue {}

// Component: b-media-aside
export interface BMediaAside extends Vue {}

// Component: b-media-body
export interface BMediaBody extends Vue {}
