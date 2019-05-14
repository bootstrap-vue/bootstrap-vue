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
export declare class BListGroup extends Vue {}

// Component: b-list-group-item
export declare class BListGroupItem extends Vue {}
