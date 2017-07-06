import BaseAdapter from './base-adapter';

export default class LocalAdapter extends BaseAdapter {
    /**
     * Table adapter with all data in memory
     * @constructor
     */
    constructor(options) {
        super(options);
    }

    getItems() {
        // Apply filter
        let items = this.filterItems(this.items);

        // Apply Sort
        if (this.sortBy) {
            items = items.sort((a, b) => this.sortCompare(a[this.sortBy], b[this.sortBy]) * (this.sortDesc ? 1 : -1));
        }

        // Apply pagination
        if (this.perPage) {
            items = items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        }

        return items;
    }


}

