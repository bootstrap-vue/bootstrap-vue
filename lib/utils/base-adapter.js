export default class BaseAdapter {
    /**
     * Base Table adapter
     * @constructor
     */
    constructor(options) {
        this.options = options;

        this.sortDesc = false;
        this.sortBy = null;
        this.filter = null;
    }

    getItems() {
        return [];
    }

    /**
     * [Util] Returns string representation of a row
     * @param v
     * @returns String
     */
    static stringValue(v) {
        if (!v) {
            return '';
        }

        if (v instanceof Object) {
            return Object.keys(v).map(k => this.stringValue(v[k])).join(' ');
        }

        return String(v);
    }

    /**
     * [Util] Compare rows a and b
     * @param a
     * @param b
     * @returns {number}
     */
    static sortCompare(a, b) {
        return this.stringValue(a).localeCompare(this.stringValue(b), undefined, {numeric: true});
    }

    /**
     * [Util] Applies regex filter
     * @param items
     * @param regex
     */
    static regexFilter(items, regex) {
        return items.filter(item => {
            const test = regex.test(toString(item));
            regex.lastIndex = 0;
            return test;
        });
    }

    /**
     * [Util] Applies general filtering
     * @param items
     */
    filterItems(items) {
        if (!this.filter) {
            return items;
        }

        if (this.filter instanceof RegExp) {
            return this.regexFilter(items, this.filter);
        }

        const regex = new RegExp('.*' + this.filter + '.*', 'ig');
        return this.regexFilter(items, regex);
    }

    /**
     * Set SortBy field
     * @param sortBy
     */
    setSortBy(sortBy) {
        this.sortBy = sortBy;
    }

    /**
     * toggle Sort Desc
     */
    toggleSortDesc() {
        this.sortDesc = !this.sortDesc;
    }
}

