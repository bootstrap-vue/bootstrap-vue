//
// Card
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const CardPlugin: CardPlugin
export default CardPlugin
export interface CardPlugin extends BvPlugin {}

// Component: b-card
export interface BCard extends Vue {}

// Component: b-card-header
export interface BCardHeader extends Vue {}

// Component: b-card-footer
export interface BCardFooter extends Vue {}

// Component: b-card-body
export interface BCardBody extends Vue {}

// Component: b-card-title
export interface BCardTitle extends Vue {}

// Component: b-card-subtitle
export interface BCardSubtitle extends Vue {}

// Component: b-card-img
export interface BCardImg extends Vue {}

// Component: b-card-img-lazy
export interface BCardImgLazy extends Vue {}

// Component: b-card-text
export interface BCardText extends Vue {}

// Component: b-card-group
export interface BCardGroup extends Vue {}
