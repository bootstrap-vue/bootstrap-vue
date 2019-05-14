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
export declare class BMedia extends Vue {}

// Component: b-media-aside
export declare class BMediaAside extends Vue {}

// Component: b-media-body
export declare class BMediaBody extends Vue {}
