//
// Progress
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const Progress: Progress
export default Progress
export interface Progress extends BvPlugin {}

// Component: b-progress
export interface BProgress extends Vue {}

// Component: b-progress-bar
export interface BProgressBar extends Vue {}
