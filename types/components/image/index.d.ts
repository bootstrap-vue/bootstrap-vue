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
export interface BImg extends Vue {}

// Component: b-img-lazy
export interface BImgLazy extends Vue {}
