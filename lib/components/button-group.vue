<template>
    <div :class="classObject"
         :role="toolbar ? 'toolbar' : 'group'"
         :tabindex="isKeyNav ? '0' : null"
         @focusin.self="focusFirst"
         @keydown.left="focusNext($event,true)"
         @keydown.up="focusNext($event,true)"
         @keydown.right="focusNext($event,false)"
         @keydown.down="focusNext($event,false)"
         @keydown.shift.left="focusFirst"
         @keydown.shift.up="focusFirst"
         @keydown.shift.right="focusLast"
         @keydown.shift.down="focusLast"
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
                    'btn-' + (this.toolbar ? 'toolbar' : 'group'),
                    this.vertical ? 'btn-group-vertical' : '',
                    (this.justify && !this.virtical) ? 'justify-content-between' : '',
                    this.size ? ('btn-group-' + this.size) : ''
                ];
            },
            isKeyNav() {
                return this.toolbar && this.toolbarkeyNav;
            }
        },
        props: {
            vertical: {
                type: Boolean,
                default: false
            },
            toolbar: {
                type: Boolean,
                default: false
            },
            justify: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: null
            },
            toobarKeyNav: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            focusNext(e, prev) {
                if (!this.isKeyNav) {
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
                items[index].focus();
            },
            focusFirst() {
                if (!this.isKeyNav) {
                    return;
                }
                const items = this.getItems();
                if (items.length > 0) {
                    items[0].focus();
                }
            },
            focusLast() {
                if (!this.isKeyNav) {
                    return;
                }
                const items = this.getItems();
                if (items.length > 0) {
                    items[items.length - 1].focus();
                }
            },
            getItems() {
                const items = Array.prototype.slice.call(this.$el.querySelectorAll(ITEM_SELECTOR));
                items.forEach(item => {
                    // Ensure tabfocus is -1 on any new elements
                    item.setAttribute('tabindex','-1');
                });
                return items;
            }
        },
        mounted() {
            if (this.isKeyNav) {
                // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
                getItems();
            }
        }
    };
</script>
