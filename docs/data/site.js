// eslint-disable-next-line import/extensions
import pkg from "../../package.json";

export default {
    version: pkg.version,

    nav: [
        {
            title: 'Getting started',
            slug: '',
            pages: []
        },
        {
            title: 'Components',
            slug: 'components',
            pages: [
                {title: 'Alerts'},
                {title: 'Badge'},
                {title: 'Breadcrumb'},
                {title: 'Buttons'},
                {title: 'Button group'},
                {title: 'Card', new: true},
                {title: 'Collapse'},
                {title: 'Dropdowns'},
                {title: 'Form Inputs'},
                {title: 'Form Checkbox'},
                {title: 'Form Radio'},
                {title: 'Form Select'},
                {title: 'Form Fieldset'},
                {title: 'Jumbotron', new: true},
                {title: 'List Group', new: true},
                {title: 'Modals'},
                {title: 'Nav'},
                {title: 'NavBar'},
                {title: 'Pagination'},
                {title: 'Popover'},
                {title: 'Progress'},
                {title: 'Tables'},
                {title: 'Tooltips', new: true}
            ]
        }
    ]
}
;
