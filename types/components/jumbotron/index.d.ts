//
// Jumbotron
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const Jumbotron: Jumbotron
export default Jumbotron
export interface Jumbotron extends BvPlugin {}

// Component: b-jumbotron
export interface BJumbotron extends Vue {}
