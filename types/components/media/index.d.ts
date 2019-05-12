//
// Media
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const MediaPlugin: MediaPlugin
export default MediaPlugin
export interface MediaPlugin extends BvPlugin {}

// Component: b-media
export interface BMedia extends Vue {}

// Component: b-media-aside
export interface BMediaAside extends Vue {}

// Component: b-media-body
export interface BMediaBody extends Vue {}
