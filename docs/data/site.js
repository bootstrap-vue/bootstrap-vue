// eslint-disable-next-line import/extensions
import pkg from '../../package.json';

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
                {title: 'Breadcrumb'},
                {title: 'Buttons'},
                {title: 'Button group'},
                {title: 'Dropdowns'},
                {title: 'Form Inputs'},
                {title: 'Form Fieldset'},
                {title: 'Form Radio'},
                {title: 'Form Checkbox'},
                {title: 'Form Select'},
                {title: 'Nav'},
                {title: 'NavBar'},
                {title: 'Pagination'},
                {title: 'Popover', new: true},
                {title: 'Tables', new: true}
            ]
        }
    ]
}
;
