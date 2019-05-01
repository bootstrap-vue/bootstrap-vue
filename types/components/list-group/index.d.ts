//
// ListGroup
//
import Vue from 'vue'
import { BvPlugin } from '../../bv-plugin'

// Plugin
declare const ListGroupPlugin: ListGroupPlugin
export default ListGroupPlugin
export interface ListGroupPlugin extends BvPlugin {}

// Component: b-list-group
export interface BListGroup extends Vue {}

// Component: b-list-group-item
export interface BListGroupItem extends Vue {}
