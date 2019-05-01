//
// Jumbotron
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const JumbotronPlugin: JumbotronPlugin
export default JumbotronPlugin
export interface JumbotronPlugin extends BvPlugin {}

// Component: b-jumbotron
export interface BJumbotron extends Vue {}
