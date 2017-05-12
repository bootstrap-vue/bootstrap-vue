<template>
    <div :class="classObject"
         role="toolbar"
         :tabindex="keyNav ? '0' : null"
         @focusin.self="focusFirst"
         @keydown.left="focusNext($event,true)"
         @keydown.up="focusNext($event,true)"
         @keydown.right="focusNext($event,false)"
         @keydown.down="focusNext($event,false)"
         @keydown.shift.left="focusFirst($event)"
         @keydown.shift.up="focusFirst($event)"
         @keydown.shift.right="focusLast($event)"
         @keydown.shift.down="focusLast($event)"
    >
        <slot></slot>
    </div>
</template>

<script>
    const ITEM_SELECTOR = [
        '.btn:not(.disabled):not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        '.form-control:not(.disabled):not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'select:not(.disabled):not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'input[type="checkbox"]:not(.disabled):not([disabled]):not([style*="display: none"]):not([style*="display:none"])',
        'input[type="radio"]:not(.disabled):not([disabled]):not([style*="display: none"]):not([style*="display:none"])'
    ].join(',');

    export default {
        computed: {
            classObject() {
                return [
                    'btn-toolbar',
                    (this.justify && !this.vertical) ? 'justify-content-between' : ''
                ];
            }
        },
        props: {
            justify: {
                type: Boolean,
                default: false
            },
            KeyNav: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            setItemFocus(item) {
                this.$nextTick(() => {
                    item.focus();
                });
            },
            focusNext(e, prev) {
                if (!this.keyNav) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                const items = this.getItems();
                if (items.length < 1) {
                    return;
                }
                let index = items.indexOf(e.target);
                if (prev && index > 0) {
                    index--;
                } else if (!prev && index < items.length - 1) {
                    index++;
                }
                if (index < 0) {
                    index = 0;
                }
                this.setItemFocus(items[index]);
            },
            focusFirst(e) {
                if (!this.keyNav) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                const items = this.getItems();
                if (items.length > 0) {
                    this.setItemFocus(items[0]);
                }
            },
            focusLast(e) {
                if (!this.keyNav) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                const items = this.getItems();
                if (items.length > 0) {
                    this.setItemFocus([items.length - 1]);
                }
            },
            getItems() {
                const items = Array.prototype.slice.call(this.$el.querySelectorAll(ITEM_SELECTOR));
                items.forEach(item => {
                    // Ensure tabfocus is -1 on any new elements
                    item.tabIndex = -1;
                });
                return items;
            }
        },
        mounted() {
            if (this.keyNav) {
                // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
                this.getItems();
            }
        }
    };
</script>
