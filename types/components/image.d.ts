//
// Image
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Image: Image
export default Image
export interface Image extends BvPlugin {}

// Component: b-img
export interface BImg extends Vue {}

// Component: b-img-lazy
export interface BImgLazy extends Vue {}
