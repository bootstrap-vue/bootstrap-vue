//
// Image
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ImagePlugin: ImagePlugin
export default ImagePlugin
export interface ImagePlugin extends BvPlugin {}

// Component: b-img
export declare class BImg extends Vue {}

// Component: b-img-lazy
export declare class BImgLazy extends Vue {}
