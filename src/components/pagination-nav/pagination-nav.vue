<style>
    .b-pagination .page-item {
        user-select: none;
    }
    .b-pagination .page-item.disabled {
        cursor: not-allowed;
        opacity: .65;
    }
    .b-pagination .page-item .page-link.active:focus {
        box-shadow: 0 0 0 3px rgba(0,123,255,.5);
        z-index: 1;
    }
</style>

<script>
import bLink, { pickLinkProps } from '../link/link';
import { assign } from '../../utils/object';
import { KeyCodes } from '../../utils';
import { paginationMixin } from '../../mixins';

// Props needed for router links
const routerProps = pickLinkProps('activeClass','exactActiveClass','append','exact','replace','target','rel');

// Props object
const props = assign(
    // pagination-nav specific props
    {
        numberOfPages: {
            type: Number,
            default: 1
        },
        baseUrl: {
            type: String,
            default: '/'
        },
        useRouter: {
            type: Boolean,
            default: false
        },
        linkGen: {
            type: Function,
            default: null
        },
        pageGen: {
            type: Function,
            default: null
        }
    },
    // Router specific props
    routerProps
);

export default {
    components: { bLink },
    mixins: [ paginationMixin ],
    render(h) {
        const t = this;
        const buttons = [];

        // Factory function for prev/next/first/last buttons
        const makeEndBtns = (linkTo, ariaLabel, btnText, pageTest) => {
            let button;
            pageTest = pageTest || linkTo; // Page # to test against to disable
            if (t.disabled || t.isActive(pageTest)) {
                button = h(
                    'li',
                    {
                        class: [ 'page-item', 'disabled' ],
                        attrs: { role: 'none presentation', 'aria-hidden': 'true' }
                    },
                    [ h('span', { class: ['page-link'], domProps: { innerHTML: btnText } }) ]
                );
            } else {
                button = h(
                    'li',
                    {
                        class: [ 'page-item' ],
                        attrs: { role: "none presentation" }
                    },
                    [ h(
                        'b-link',
                        {
                            class: ['page-link'],
                            props: t.linkProps(linkTo),
                            attrs: { role: 'menuitem', tabindex: '-1', 'aria-label': ariaLabel },
                            on: { click: (evt) => { t.onClick(linkTo) } }
                        },
                        [ h('span', { attrs: { 'aria-hidden': 'true' }, domProps: { innerHTML: btnText } }) ]
                    ) ]
                );
            }
            return button;
        };

        // Ellipsis factory
        const makeEllipsis = () => {
            return h(
                'li',
                {
                    class: [ 'page-item', 'disabled', 'd-none', 'd-sm-flex' ],
                    attrs: { role: 'separator' }
                },
                [ h('span', { class: ['page-link'], domProps: { innerHTML: t.ellipsisText } }) ]
            );
        }

        // Goto First Page button
        buttons.push(t.hideGotoEndButtons ? h(false) : makeEndBtns(1, t.labelFirstPage, t.firstText));

        // Goto Previous page button
        buttons.push(makeEndBtns(t.currentPage - 1, t.labelPrevPage, t.prevText, 1));
        
        // First Ellipsis Bookend
        buttons.push(t.showFirstDots ? makeEllipsis() : h(false));

        // Individual Page links
        t.pageList.forEach((page) => {
            let inner;
            let pageNum = t.makePage(page.number);
            if (t.disabled) {
                 inner = h('span', { class: [ 'page-link' ], domProps: { innerHTML: pageNum } } );
            } else {
                inner = h(
                    'b-link',
                    {
                        class: t.pageLinkClasses(page),
                        props: t.linkProps(page.number),
                        attrs: {
                            role: 'menuitemradio',
                            tabindex: t.isActive(page.number) ? '0' : '-1',
                            'aria-label': `${t.labelPage} ${page.number}`,
                            'aria-checked': t.isActive(page.number) ? 'true' : 'false',
                            'aria-posinset': page.number,
                            'aria-setsize': t.numberOfPages
                        },
                        domProps: { innerHTML: pageNum },
                        on: { click: (evt) => { t.onClick(page.number) } }
                    }
                );
            }
            buttons.push(h(
                'li',
                {
                    key: page.number,
                    class: t.pageItemClasses(page),
                    attrs: { role: 'none presentation' }
                },
                [ inner ]
            ));
        });

        // Last Ellipsis Bookend
        buttons.push(t.showLastDots ? makeEllipsis() : h(false));

        // Goto Next page button
        buttons.push(makeEndBtns(t.currentPage + 1, t.labelNextPage, t.nextText, t.numberOfPages));

        // Goto Last Page button
        buttons.push(t.hideGotoEndButtons ? h(false) : makeEndBtns(t.numberOfPages, t.labelLastPage, t.lastText));

        // Assemble the above list of paginatiom buttons
        const pagination = h(
            'ul',
            {
                ref: 'ul',
                class: [ 'pagination', 'b-pagination', t.btnSize, t.alignment ],
                attrs: {
                    role: 'menubar',
                    'aria-disabled': t.disabled ? 'true' : 'false',
                    'aria-label': t.ariaLabel || null
                },
                on: {
                    keydown: (evt) => {
                        const keyCode = evt.keyCode;
                        const shift = evt.shiftKey;
                        if (keyCode === KeyCodes.LEFT) {
                            evt.preventDefault();
                            shift ? t.focusFirst() : t.focusPrev();
                        } else if (keyCode === KeyCodes.RIGHT) {
                            evt.preventDefault();
                            shift ? t.focusLast() : t.focusNext();
                        }
                    }
                }
            },
            buttons
        );

        // Wrap it in a `nav` element
        return h('nav', {}, [ pagination ]);
    },
    props,
    methods: {
        onClick(pageNum) {
            this.currentPage = pageNum;
        },
        makeLink(pagenum) {
            if (this.linkGen && typeof this.linkGen === 'function') {
                return this.linkGen(pagenum);
            }
            const link = `${this.baseUrl}${pagenum}`;
            return this.useRouter ? { path: link } : link;
        },
        makePage(pagenum) {
            if (this.pageGen && typeof this.pageGen === 'function') {
                return this.pageGen(pagenum);
            }
            return pagenum;
        },
        linkProps(pagenum) {
            const link = this.makeLink(pagenum);
            let props = {
                href: typeof link === 'string' ? link : void 0,
                target: this.target || null,
                rel: this.rel || null,
                disabled: this.disabled
            };
            if (this.useRouter || typeof link === 'object') {
                props = assign(props, {
                    to: link,
                    exact: this.exact,
                    activeClass: this.activeClass,
                    exactActiveClass: this.exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            }
            return props;
        }
    }
};
</script>
