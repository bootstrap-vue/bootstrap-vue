//
// ListGroup
//
import Vue from 'vue'
import { BvPlugin } from '../bv-plugin'

// Plugin
declare const ListGroup: ListGroup
export default ListGroup
export interface ListGroup extends BvPlugin {}

// Component: b-list-group
export interface BListGroup extends Vue {}

// Component: b-list-group-item
export interface BListGroupItem extends Vue {}
