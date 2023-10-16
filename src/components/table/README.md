# Table

> For displaying tabular data, `<b-table>` supports pagination, filtering, sorting, custom
> rendering, various style options, events, and asynchronous data. For simple display of tabular
> data without all the fancy features, BootstrapVue provides two lightweight alternative components
> [`<b-table-lite>`](#light-weight-tables) and [`<b-table-simple>`](#simple-tables).

**Example: Basic usage**

```html
<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table.vue -->
```

## Items (record data)

`items` is the table data in array format, where each record (row) data are keyed objects. Example
format:

<!-- eslint-disable no-unused-vars -->

```js
const items = [
  { age: 32, first_name: 'Cyndi' },
  { age: 27, first_name: 'Havij' },
  { age: 42, first_name: 'Robert' }
]
```

`<b-table>` automatically samples the first row to extract field names (the keys in the record
data). Field names are automatically "humanized" by converting `kebab-case`, `snake_case`, and
`camelCase` to individual words and capitalizes each word. Example conversions:

- `first_name` becomes `First Name`
- `last-name` becomes `Last Name`
- `age` becomes `Age`
- `YEAR` remains `YEAR`
- `isActive` becomes `Is Active`

These titles will be displayed in the table header, in the order they appear in the **first** record
of data. See the [Fields](#fields-column-definitions) section below for customizing how field
headings appear.

**Note:** Field order is not guaranteed. Fields will typically appear in the order they were defined
in the first row, but this may not always be the case depending on the version of browser in use.
See section [Fields (column definitions)](#fields-column-definitions) below to see how to guarantee
the order of fields, and to override the headings generated.

Record data may also have additional special reserved name keys for colorizing rows and individual
cells (variants), and for triggering additional row detail. The supported optional item record
modifier properties (make sure your field keys do not conflict with these names):

| Property        | Type    | Description                                                                                                                                                                                                                                                |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_cellVariants` | Object  | Bootstrap contextual state applied to individual cells. Keyed by field (See the [Color Variants](/docs/reference/color-variants) for supported values). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set). |
| `_rowVariant`   | String  | Bootstrap contextual state applied to the entire row (See the [Color Variants](/docs/reference/color-variants) for supported values). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set)                    |
| `_showDetails`  | Boolean | Used to trigger the display of the `row-details` scoped slot. See section [Row details support](#row-details-support) below for additional information                                                                                                     |

**Example: Using variants for table cells**

```html
<template>
  <div>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' }
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' }
        ]
      }
    }
  }
</script>

<!-- b-table-variants.vue -->
```

`items` can also be a reference to a _provider_ function, which returns an `Array` of items data.
Provider functions can also be asynchronous:

- By returning `null` (or `undefined`) and calling a callback, when the data is ready, with the data
  array as the only argument to the callback,
- By returning a `Promise` that resolves to an array.

See the ["Using Items Provider functions"](#using-items-provider-functions) section below for more
details.

### Table item notes and warnings

- Avoid manipulating record data in place, as changes to the underlying items data will cause either
  the row or entire table to be re-rendered. See [Primary Key](#primary-key), below, for ways to
  minimize Vue's re-rendering of rows.
- `items` array records should be a simple object and **must** avoid placing data that may have
  circular references in the values within a row. `<b-table>` serializes the row data into strings
  for sorting and filtering, and circular references will cause stack overflows to occur and your
  app to crash!

## Fields (column definitions)

The `fields` prop is used to customize the table columns headings, and in which order the columns of
data are displayed. The field object keys (i.e. `age` or `first_name` as shown below) are used to
extract the value from each item (record) row, and to provide additional features such as enabling
[sorting](#sorting) on the column, etc.

Fields can be provided as a _simple array_ or an _array of objects_. **Internally the fields data
will be normalized into the _array of objects_ format**. Events or slots that include the column
`field` data will be in the normalized field object format (array of objects for `fields`, or an
object for an individual `field`).

### Fields as a simple array

Fields can be a simple array, for defining the order of the columns, and which columns to display:

**Example: Using `array` fields definition**

```html
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table-fields-array.vue -->
```

### Fields as an array of objects

Fields can be a an array of objects, providing additional control over the fields (such as sorting,
formatting, etc.). Only columns (keys) that appear in the fields array will be shown:

**Example: Using array of objects fields definition**

```html
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: false
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            variant: 'danger'
          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table-fields-array-of-objects.vue -->
```

### Field definition reference

The following field properties are recognized:

| Property            | Type                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`               | String                      | The key for selecting data from the record in the items array. Required when setting the `fields` via an array of objects. The `key` is also used for generating the [custom data rendering](#custom-data-rendering) and [custom header and footer](#header-and-footer-custom-rendering-via-scoped-slots) slot names.                                                                                                             |
| `label`             | String                      | Appears in the columns table header (and footer if `foot-clone` is set). Defaults to the field's key (in humanized format) if not provided. It's possible to use empty labels by assigning an empty string `""` but be sure you also set `headerTitle` to provide non-sighted users a hint about the column contents.                                                                                                             |
| `headerTitle`       | String                      | Text to place on the fields header `<th>` attribute `title`. Defaults to no `title` attribute.                                                                                                                                                                                                                                                                                                                                    |
| `headerAbbr`        | String                      | Text to place on the fields header `<th>` attribute `abbr`. Set this to the unabbreviated version of the label (or title) if label (or title) is an abbreviation. Defaults to no `abbr` attribute.                                                                                                                                                                                                                                |
| `class`             | String or Array             | Class name (or array of class names) to add to `<th>` **and** `<td>` in the column.                                                                                                                                                                                                                                                                                                                                               |
| `formatter`         | String or Function          | A formatter callback function or name of a method in your component, can be used instead of (or in conjunction with) scoped field slots. The formatter will be called with the syntax `formatter(value, key, item)`. Refer to [Custom Data Rendering](#custom-data-rendering) for more details.                                                                                                                                   |
| `sortable`          | Boolean                     | Enable sorting on this column. Refer to the [Sorting](#sorting) Section for more details.                                                                                                                                                                                                                                                                                                                                         |
| `sortKey`           | String                      | <span class="badge badge-secondary">v2.17.0+</span> Set the value of `sortBy` for the column in the emitted context when `no-local-sorting` is `true`.                                                                                                                                                                                                                                                                            |
| `sortDirection`     | String                      | Set the initial sort direction on this column when it becomes sorted. Refer to the [Change initial sort direction](#change-initial-sort-direction) Section for more details.                                                                                                                                                                                                                                                      |
| `sortByFormatted`   | Boolean or Function         | Sort the column by the result of the field's `formatter` callback function when set to `true`. Default is `false`. Boolean has no effect if the field does not have a `formatter`. Optionally accepts a formatter function _reference_ to format the value for sorting purposes only. Refer to the [Sorting](#sorting) Section for more details.                                                                                  |
| `filterByFormatted` | Boolean or Function         | Filter the column by the result of the field's `formatter` callback function when set to `true`. Default is `false`. Boolean has no effect if the field does not have a `formatter`. Optionally accepts a formatter function _reference_ to format the value for filtering purposes only. Refer to the [Filtering](#filtering) section for more details.                                                                          |
| `tdClass`           | String or Array or Function | Class name (or array of class names) to add to `<tbody>` data `<td>` cells in the column. If custom classes per cell are required, a callback function can be specified instead. The function will be called as `tdClass(value, key, item)` and it must return an `Array` or `String`.                                                                                                                                            |
| `thClass`           | String or Array             | Class name (or array of class names) to add to this field's `<thead>`/`<tfoot>` heading `<th>` cell.                                                                                                                                                                                                                                                                                                                              |
| `thStyle`           | Object                      | JavaScript object representing CSS styles you would like to apply to the table `<thead>`/`<tfoot>` field `<th>`.                                                                                                                                                                                                                                                                                                                  |
| `variant`           | String                      | Apply contextual class to all the `<th>` **and** `<td>` in the column - `active`, `success`, `info`, `warning`, `danger`. These variants map to classes `thead-${variant}` (in the header), `table-${variant}` (in the body), or `bg-${variant}` (when the prop `dark` is set).                                                                                                                                                   |
| `tdAttr`            | Object or Function          | JavaScript object representing additional attributes to apply to the `<tbody>` field `<td>` cell. If custom attributes per cell are required, a callback function can be specified instead. The function will be called as `tdAttr(value, key, item)` and it must return an `Object`.                                                                                                                                             |
| `thAttr`            | Object or Function          | JavaScript object representing additional attributes to apply to the field's `<thead>`/`<tfoot>` heading `<th>` cell. If the field's `isRowHeader` is set to `true`, the attributes will also apply to the `<tbody>` field `<th>` cell. If custom attributes per cell are required, a callback function can be specified instead. The function will be called as `thAttr(value, key, item, type)` and it must return an `Object`. |
| `isRowHeader`       | Boolean                     | When set to `true`, the field's item data cell will be rendered with `<th>` rather than the default of `<td>`.                                                                                                                                                                                                                                                                                                                    |
| `stickyColumn`      | Boolean                     | When set to `true`, and the table in [responsive](#responsive-tables) mode or has [sticky headers](#sticky-headers), will cause the column to become fixed to the left when the table's horizontal scrollbar is scrolled. See [Sticky columns](#sticky-columns) for more details                                                                                                                                                  |

**Notes:**

- Field properties, if not present, default to `null` (falsey) unless otherwise stated above.
- `class`, `thClass`, `tdClass` etc. will not work with classes that are defined in scoped CSS,
  unless you are using VueLoader's
  [Deep selector](https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements).
- For information on the syntax supported by `thStyle`, see
  [Class and Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)
  in the Vue.js guide.
- Any additional properties added to the field definition objects will be left intact - so you can
  access them via the named scoped slots for custom data, header, and footer rendering.

For information and usage about scoped slots and formatters, refer to the
[Custom Data Rendering](#custom-data-rendering) section below.

Feel free to mix and match simple array and object array together:

<!-- eslint-disable no-unused-vars -->

```js
const fields = [
  { key: 'first_name', label: 'First' },
  { key: 'last_name', label: 'Last' },
  'age',
  'sex'
]
```

## Primary key

`<b-table>` provides an additional prop `primary-key`, which you can use to identify the _name_ of
the field key that _uniquely_ identifies the row.

The value specified by the primary column key **must be** either a `string` or `number`, and **must
be unique** across all rows in the table.

The primary key column does not need to appear in the displayed fields.

### Table row ID generation

When provided, the `primary-key` will generate a unique ID for each item row `<tr>` element. The ID
will be in the format of `{table-id}__row_{primary-key-value}`, where `{table-id}` is the unique ID
of the `<b-table>` and `{primary-key-value}` is the value of the item's field value for the field
specified by `primary-key`.

### Table render and transition optimization

The `primary-key` is also used by `<b-table>` to help Vue optimize the rendering of table rows.
Internally, the value of the field key specified by the `primary-key` prop is used as the Vue `:key`
value for each rendered item row `<tr>` element.

If you are seeing rendering issue (i.e. tooltips hiding or unexpected subcomponent re-usage when
item data changes or data is sorted/filtered/edited) or table row transitions are not working,
setting the `primary-key` prop (if you have a unique identifier per row) can alleviate these issues.

Specifying the `primary-key` column is handy if you are using 3rd party table transitions or drag
and drop plugins, as they rely on having a consistent and unique per row `:key` value.

If `primary-key` is not provided, `<b-table>` will auto-generate keys based on the displayed row's
index number (i.e. position in the _displayed_ table rows). This may cause GUI issues such as sub
components/elements that are rendering with previous results (i.e. being re-used by Vue's render
patch optimization routines). Specifying a `primary-key` column can alleviate this issue (or you can
place a unique `:key` on your element/components in your custom formatted field slots).

Refer to the [Table body transition support](#table-body-transition-support) section for additional
details.

## Table style options

### Table styling

`<b-table>` provides several props to alter the style of the table:

| prop                 | Type              | Description                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `striped`            | Boolean           | Add zebra-striping to the table rows within the `<tbody>`                                                                                                                                                                                                                                                                                      |
| `bordered`           | Boolean           | For borders on all sides of the table and cells.                                                                                                                                                                                                                                                                                               |
| `borderless`         | Boolean           | removes inner borders from table.                                                                                                                                                                                                                                                                                                              |
| `outlined`           | Boolean           | For a thin border on all sides of the table. Has no effect if `bordered` is set.                                                                                                                                                                                                                                                               |
| `small`              | Boolean           | To make tables more compact by cutting cell padding in half.                                                                                                                                                                                                                                                                                   |
| `hover`              | Boolean           | To enable a hover highlighting state on table rows within a `<tbody>`                                                                                                                                                                                                                                                                          |
| `dark`               | Boolean           | Invert the colors — with light text on dark backgrounds (equivalent to Bootstrap v4 class `.table-dark`)                                                                                                                                                                                                                                       |
| `fixed`              | Boolean           | Generate a table with equal fixed-width columns (`table-layout: fixed;`)                                                                                                                                                                                                                                                                       |
| `responsive`         | Boolean or String | Generate a responsive table to make it scroll horizontally. Set to `true` for an always responsive table, or set it to one of the breakpoints `'sm'`, `'md'`, `'lg'`, or `'xl'` to make the table responsive (horizontally scroll) only on screens smaller than the breakpoint. See [Responsive tables](#responsive-tables) below for details. |
| `sticky-header`      | Boolean or String | Generates a vertically scrollable table with sticky headers. Set to `true` to enable sticky headers (default table max-height of `300px`), or set it to a string containing a height (with CSS units) to specify a maximum height other than `300px`. See the [Sticky header](#sticky-headers) section below for details.                      |
| `stacked`            | Boolean or String | Generate a responsive stacked table. Set to `true` for an always stacked table, or set it to one of the breakpoints `'sm'`, `'md'`, `'lg'`, or `'xl'` to make the table visually stacked only on screens smaller than the breakpoint. See [Stacked tables](#stacked-tables) below for details.                                                 |
| `caption-top`        | Boolean           | If the table has a caption, and this prop is set to `true`, the caption will be visually placed above the table. If `false` (the default), the caption will be visually placed below the table.                                                                                                                                                |
| `table-variant`      | String            | Give the table an overall theme color variant.                                                                                                                                                                                                                                                                                                 |
| `head-variant`       | String            | Use `'light'` or `'dark'` to make table header appear light or dark gray, respectively                                                                                                                                                                                                                                                         |
| `foot-variant`       | String            | Use `'light'` or `'dark'` to make table footer appear light or dark gray, respectively. If not set, `head-variant` will be used. Has no effect if `foot-clone` is not set                                                                                                                                                                      |
| `foot-clone`         | Boolean           | Turns on the table footer, and defaults with the same contents a the table header                                                                                                                                                                                                                                                              |
| `no-footer-sorting`  | Boolean           | When `foot-clone` is true and the table is sortable, disables the sorting icons and click behaviour on the footer heading cells. Refer to the [Sorting](#sorting) section below for more details.                                                                                                                                              |
| `no-border-collapse` | Boolean           | Disables the default of collapsing of the table borders. Mainly for use with [sticky headers](#sticky-headers) and/or [sticky columns](#sticky-columns). Will cause the appearance of double borders in some situations.                                                                                                                       |

**Note:** The table style options `fixed`, `stacked`, `caption-top`, `no-border-collapse`, sticky
headers, sticky columns and the table sorting feature, all require BootstrapVue's custom CSS.

**Example: Basic table styles**

```html
<template>
  <div>
    <b-form-group label="Table Options" label-cols-lg="2" v-slot="{ ariaDescribedby }">
      <b-form-checkbox v-model="striped" :aria-describedby="ariaDescribedby" inline>Striped</b-form-checkbox>
      <b-form-checkbox v-model="bordered" :aria-describedby="ariaDescribedby" inline>Bordered</b-form-checkbox>
      <b-form-checkbox v-model="borderless" :aria-describedby="ariaDescribedby" inline>Borderless</b-form-checkbox>
      <b-form-checkbox v-model="outlined" :aria-describedby="ariaDescribedby" inline>Outlined</b-form-checkbox>
      <b-form-checkbox v-model="small" :aria-describedby="ariaDescribedby" inline>Small</b-form-checkbox>
      <b-form-checkbox v-model="hover" :aria-describedby="ariaDescribedby" inline>Hover</b-form-checkbox>
      <b-form-checkbox v-model="dark" :aria-describedby="ariaDescribedby" inline>Dark</b-form-checkbox>
      <b-form-checkbox v-model="fixed" :aria-describedby="ariaDescribedby" inline>Fixed</b-form-checkbox>
      <b-form-checkbox v-model="footClone" :aria-describedby="ariaDescribedby" inline>Foot Clone</b-form-checkbox>
      <b-form-checkbox v-model="noCollapse" :aria-describedby="ariaDescribedby" inline>No border collapse</b-form-checkbox>
    </b-form-group>

    <b-form-group label="Head Variant" label-cols-lg="2" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="headVariant"
        :aria-describedby="ariaDescribedby"
        class="mt-lg-2"
      >
        <b-form-radio :value="null" inline>None</b-form-radio>
        <b-form-radio value="light" inline>Light</b-form-radio>
        <b-form-radio value="dark" inline>Dark</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form-group label="Table Variant" label-for="table-style-variant" label-cols-lg="2">
      <b-form-select
        id="table-style-variant"
        v-model="tableVariant"
        :options="tableVariants"
      >
        <template #first>
          <option value="">-- None --</option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :no-border-collapse="noCollapse"
      :items="items"
      :fields="fields"
      :head-variant="headVariant"
      :table-variant="tableVariant"
    ></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ],
        tableVariants: [
          'primary',
          'secondary',
          'info',
          'danger',
          'warning',
          'success',
          'light',
          'dark'
        ],
        striped: false,
        bordered: false,
        borderless: false,
        outlined: false,
        small: false,
        hover: false,
        dark: false,
        fixed: false,
        footClone: false,
        headVariant: null,
        tableVariant: '',
        noCollapse: false
      }
    }
  }
</script>

<!-- b-table-bordered.vue -->
```

### Row styling and attributes

You can also style every row using the `tbody-tr-class` prop, and optionally supply additional
attributes via the `tbody-tr-attr` prop:

| Property         | Type                      | Description                                                                                                                                                                    |
| ---------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tbody-tr-class` | String, Array or Function | Classes to be applied to every row on the table. If a function is given, it will be called as `tbodyTrClass( item, type )` and it may return an `Array`, `Object` or `String`. |
| `tbody-tr-attr`  | Object or Function        | Attributes to be applied to every row on the table. If a function is given, it will be called as `tbodyTrAttr( item, type )` and it must return an `Object`.                   |

When passing a function reference to `tbody-tr-class` or `tbody-tr-attr`, the function's arguments
will be as follows:

- `item` - The item record data associated with the row. For rows that are not associated with an
  item record, this value will be `null` or `undefined`
- `type` - The type of row being rendered. `'row'` for an item row, `'row-details'` for an item
  details row, `'row-top'` for the fixed row top slot, `'row-bottom'` for the fixed row bottom slot,
  or `'table-busy'` for the table busy slot.

**Example: Basic row styles**

```html
<template>
  <div>
    <b-table :items="items" :fields="fields" :tbody-tr-class="rowClass"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'awesome') return 'table-success'
      }
    }
  }
</script>

<!-- b-table-styled-row.vue -->
```

### Responsive tables

Responsive tables allow tables to be scrolled horizontally with ease. Make any table responsive
across all viewports by setting the prop `responsive` to `true`. Or, pick a maximum breakpoint with
which to have a responsive table up to by setting the prop `responsive` to one of the breakpoint
values: `sm`, `md`, `lg`, or `xl`.

**Example: Always responsive table**

```html
<template>
  <div>
    <b-table responsive :items="items"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell'
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell'
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell'
          }
        ]
      }
    }
  }
</script>

<!-- b-table-responsive.vue -->
```

**Responsive table notes:**

- _Possible vertical clipping/truncation_. Responsive tables make use of `overflow-y: hidden`, which
  clips off any content that goes beyond the bottom or top edges of the table. In particular, this
  may clip off dropdown menus and other third-party widgets.
- Using props `responsive` and `fixed` together will **not** work as expected. Fixed table layout
  uses the first row (table header in this case) to compute the width required by each column (and
  the overall table width) to fit within the width of the parent container &mdash; without taking
  cells in the `<tbody>` into consideration &mdash; resulting in table that may not be responsive.
  To get around this limitation, you would need to specify widths for the columns (or certain
  columns) via one of the following methods:
  - Use `<col>` elements within the [`table-colgroup` slot](#table-colgroup) that have widths set
    (e.g. `<col style="width: 20rem">`), or
  - Wrap header cells in `<div>` elements, via the use of
    [custom header rendering](#header-and-footer-custom-rendering-via-scoped-slots), which have a
    minimum width set on them, or
  - Use the `thStyle` property of the [field definition object](#field-definition-reference) to set
    a width for the column(s), or
  - Use custom CSS to define classes to apply to the columns to set widths, via the `thClass` or
    `class` properties of the [field definition object](#field-definition-reference).

### Stacked tables

An alternative to responsive tables, BootstrapVue includes the stacked table option (using custom
SCSS/CSS), which allow tables to be rendered in a visually stacked format. Make any table stacked
across _all viewports_ by setting the prop `stacked` to `true`. Or, alternatively, set a breakpoint
at which the table will return to normal table format by setting the prop `stacked` to one of the
breakpoint values `'sm'`, `'md'`, `'lg'`, or `'xl'`.

Column header labels will be rendered to the left of each field value using a CSS `::before` pseudo
element, with a width of 40%.

The `stacked` prop takes precedence over the [`sticky-header`](#sticky-headers) prop and the
[`stickyColumn`](#sticky-columns) field definition property.

**Example: Always stacked table**

```html
<template>
  <div>
    <b-table stacked :items="items"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    }
  }
</script>

<!-- b-table-stacked.vue -->
```

**Note: When the table is visually stacked:**

- The table header (and table footer) will be hidden.
- Custom rendered header slots will not be shown, rather, the fields' `label` will be used.
- The table **cannot** be sorted by clicking the rendered field labels. You will need to provide an
  external control to select the field to sort by and the sort direction. See the
  [Sorting](#sorting) section below for sorting control information, as well as the
  [complete example](#complete-example) at the bottom of this page for an example of controlling
  sorting via the use of form controls.
- The slots `top-row` and `bottom-row` will be hidden when visually stacked.
- The table caption, if provided, will always appear at the top of the table when visually stacked.
- In an always stacked table, the table header and footer, and the fixed top and bottom row slots
  will not be rendered.

BootstrapVue's custom CSS is required in order to support stacked tables.

### Table caption

Add an optional caption to your table via the prop `caption` or the named slot `table-caption` (the
slot takes precedence over the prop). The default Bootstrap v4 styling places the caption at the
bottom of the table:

```html
<template>
  <div>
    <b-table :items="items" :fields="fields">
      <template #table-caption>This is a table caption.</template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    }
  }
</script>

<!-- b-table-caption.vue -->
```

You can have the caption placed at the top of the table by setting the `caption-top` prop to `true`:

```html
<template>
  <div>
    <b-table :items="items" :fields="fields" caption-top>
      <template #table-caption>This is a table caption at the top.</template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    }
  }
</script>

<!-- b-table-caption-top.vue -->
```

You can also use [custom CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side) to
control the caption positioning.

### Table colgroup

Use the named slot `table-colgroup` to specify `<colgroup>` and `<col>` elements for optional
grouping and styling of table columns. Note the styles available via `<col>` elements are limited.
Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup) for details and
usage of `<colgroup>`

Slot `table-colgroup` can be optionally scoped, receiving an object with the following properties:

| Property  | Type   | Description                                                                                                     |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `columns` | Number | The number of columns in the rendered table                                                                     |
| `fields`  | Array  | Array of field definition objects (normalized to the [array of objects](#fields-as-an-array-of-objects) format) |

When provided, the content of the `table-colgroup` slot will be placed _inside_ of a `<colgroup>`
element. there is no need to provide your own outer `<colgroup>` element. When a series of table
columns should be grouped for assistive technology reasons (for conveying logical column
associations, use a `<col span="#">` element (with `#` replaced with the number of grouped columns)
to group the series of columns.

**Tip:** In some situations when trying to set column widths via `style` or `class` on the `<col>`
element, you may find that placing the table in `fixed` header width (table fixed layout mode) mode,
combined with `responsive` (horizontal scrolling) mode will help, although you will need to have
explicit widths, or minimum widths, via a style or a class for each column's respective `<col>`
element. For example:

```html
<b-table fixed responsive :items="items" :fields="fields" ... >
  <template #table-colgroup="scope">
    <col
      v-for="field in scope.fields"
      :key="field.key"
      :style="{ width: field.key === 'foo' ? '120px' : '180px' }"
    >
  </template>
  <!-- additional table slots here if needed -->
</b-table>
```

### Table busy state

`<b-table>` provides a `busy` prop that will flag the table as busy, which you can set to `true`
just before you update your items, and then set it to `false` once you have your items. When in the
busy state, the table will have the attribute `aria-busy="true"`.

During the busy state, the table will be rendered in a "muted" look (`opacity: 0.6`), using the
following custom CSS:

```css
/* Busy table styling */
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
```

You can override this styling using your own CSS.

You may optionally provide a `table-busy` slot to show a custom loading message or spinner whenever
the table's busy state is `true`. The slot will be placed in a `<tr>` element with class
`b-table-busy-slot`, which has one single `<td>` with a `colspan` set to the number of fields.

**Example of `table-busy` slot usage:**

```html
<template>
  <div>
    <b-button @click="toggleBusy">Toggle Busy State</b-button>

    <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isBusy: false,
        items: [
          { first_name: 'Dickerson', last_name: 'MacDonald', age: 40 },
          { first_name: 'Larsen', last_name: 'Shaw', age: 21 },
          { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
          { first_name: 'Jami', last_name: 'Carney', age: 38 }
        ]
      }
    },
    methods: {
      toggleBusy() {
        this.isBusy = !this.isBusy
      }
    }
  }
</script>

<!-- b-table-busy-slot.vue -->
```

Also see the [Using Items Provider Functions](#using-items-provider-functions) below for additional
information on the `busy` state.

**Notes:**

- All click related and hover events, and sort-changed events will **not** be emitted when the table
  is in the `busy` state.
- Busy styling and slot are not available in the `<b-table-lite>` component.

## Custom data rendering

Custom rendering for each data field in a row is possible using either
[scoped slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) or a formatter callback
function, or a combination of both.

### Scoped field slots

Scoped field slots give you greater control over how the record data appears. You can use scoped
slots to provided custom rendering for a particular field. If you want to add an extra field which
does not exist in the records, just add it to the [`fields`](#fields-column-definitions) array, and
then reference the field(s) in the scoped slot(s). Scoped field slots use the following naming
syntax: `'cell(' + field key + ')'`.

You can use the default _fall-back_ scoped slot `'cell()'` to format any cells that do not have an
explicit scoped slot provided.

**Example: Custom data rendering with scoped slots**

```html
<template>
  <div>
    <b-table small :fields="fields" :items="items" responsive="sm">
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
      </template>

      <!-- A virtual composite column -->
      <template #cell(nameage)="data">
        {{ data.item.name.first }} is {{ data.item.age }} years old
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          // A virtual column that doesn't exist in items
          'index',
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex',
          // A virtual column made up from two fields
          { key: 'nameage', label: 'First name and age' }
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
        ]
      }
    }
  }
</script>

<!-- b-table-data-slots.vue -->
```

The slot's scope variable (`data` in the above sample) will have the following properties:

| Property         | Type     | Description                                                                                                                                                               |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index`          | Number   | The row number (indexed from zero) relative to the _displayed_ rows                                                                                                       |
| `item`           | Object   | The entire raw record data (i.e. `items[index]`) for this row (before any formatter is applied)                                                                           |
| `value`          | Any      | The value for this key in the record (`null` or `undefined` if a virtual column), or the output of the field's [`formatter` function](#formatter-callback)                |
| `unformatted`    | Any      | The raw value for this key in the item record (`null` or `undefined` if a virtual column), before being passed to the field's [`formatter` function](#formatter-callback) |
| `field`          | Object   | The field's normalized field definition object                                                                                                                            |
| `detailsShowing` | Boolean  | Will be `true` if the row's `row-details` scoped slot is visible. See section [Row details support](#row-details-support) below for additional information                |
| `toggleDetails`  | Function | Can be called to toggle the visibility of the rows `row-details` scoped slot. See section [Row details support](#row-details-support) below for additional information    |
| `rowSelected`    | Boolean  | Will be `true` if the row has been selected. See section [Row select support](#row-select-support) for additional information                                             |
| `selectRow`      | Function | When called, selects the current row. See section [Row select support](#row-select-support) for additional information                                                    |
| `unselectRow`    | Function | When called, unselects the current row. See section [Row select support](#row-select-support) for additional information                                                  |

**Notes:**

- `index` will not always be the actual row's index number, as it is computed after filtering,
  sorting and pagination have been applied to the original table data. The `index` value will refer
  to the **displayed row number**. This number will align with the indexes from the optional
  [`v-model` bound](#v-model-binding) variable.
- When using the new Vue 2.6 `v-slot` syntax, note that slot names **cannot** contain spaces, and
  when using in-browser DOM templates the slot names will _always_ be lower cased. To get around
  this, you can pass the slot name using Vue's
  [dynamic slot names](https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names)

#### Displaying raw HTML

By default `b-table` escapes HTML tags in items data and results of formatter functions, if you need
to display raw HTML code in `b-table`, you should use `v-html` directive on an element in a in
scoped field slot.

```html
<template>
  <div>
    <b-table :items="items">
      <template #cell(html)="data">
        <span v-html="data.value"></span>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            text: 'This is <i>escaped</i> content',
            html: 'This is <i>raw <strong>HTML</strong></i> <span style="color:red">content</span>'
          }
        ]
      }
    }
  }
</script>

<!-- b-table-html-data-slots.vue -->
```

<p class="alert alert-danger">
  <strong>Warning:</strong> Be cautious of using the <code>v-html</code> method to display user
  supplied content,  as it may make your application vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</p>

### Formatter callback

Optionally, you can customize field output by using a formatter callback function. To enable this,
the field's `formatter` property is used. The value of this property may be String or function
reference. In case of a String value, the function must be defined at the parent component's
methods. When providing `formatter` as a `Function`, it must be declared at global scope (window or
as global mixin at Vue, or as an anonymous function), unless it has been bound to a `this` context.

The callback function accepts three arguments - `value`, `key`, and `item`, and should return the
formatted value as a string (HTML strings are not supported)

**Example: Custom data rendering with formatter callback function**

```html
<template>
  <div>
    <b-table :fields="fields" :items="items">
      <template #cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'name',
            label: 'Full Name',
            formatter: 'fullName'
          },
          // A regular column
          'age',
          {
            // A regular column with custom formatter
            key: 'sex',
            formatter: value => {
              return value.charAt(0).toUpperCase()
            }
          },
          {
            // A virtual column with custom formatter
            key: 'birthYear',
            label: 'Calculated Birth Year',
            formatter: (value, key, item) => {
              return new Date().getFullYear() - item.age
            }
          }
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'female', age: 62 }
        ]
      }
    },
    methods: {
      fullName(value) {
        return `${value.first} ${value.last}`
      }
    }
  }
</script>

<!-- b-table-data-formatter.vue -->
```

## Header and Footer custom rendering via scoped slots

It is also possible to provide custom rendering for the tables `thead` and `tfoot` elements. Note by
default the table footer is not rendered unless `foot-clone` is set to `true`.

Scoped slots for the header and footer cells uses a special naming convention of
`'head(<fieldkey>)'` and `'foot(<fieldkey>)'` respectively. if a `'foot(...)'` slot for a field is
not provided, but a `'head(...)'` slot is provided, then the footer will use the `'head(...)'` slot
content.

You can use a default _fall-back_ scoped slot `'head()'` or `'foot()'` to format any header or
footer cells that do not have an explicit scoped slot provided.

```html
<template>
  <div>
    <b-table :fields="fields" :items="items" foot-clone>
      <!-- A custom formatted data column cell -->
      <template #cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>

      <!-- A custom formatted header cell for field 'name' -->
      <template #head(name)="data">
        <span class="text-info">{{ data.label.toUpperCase() }}</span>
      </template>

      <!-- A custom formatted footer cell for field 'name' -->
      <template #foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template #foot()="data">
        <i>{{ data.label }}</i>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex'
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
        ]
      }
    }
  }
</script>

<!-- b-table-head-foot-slots.vue -->
```

The slots can be optionally scoped (`data` in the above example), and will have the following
properties:

| Property        | Type   | Description                                                                               |
| --------------- | ------ | ----------------------------------------------------------------------------------------- |
| `column`        | String | The fields's `key` value                                                                  |
| `field`         | Object | the field's object (from the `fields` prop)                                               |
| `label`         | String | The fields label value (also available as `data.field.label`)                             |
| `selectAllRows` | Method | Select all rows (applicable if the table is in [`selectable`](#row-select-support) mode   |
| `clearSelected` | Method | Unselect all rows (applicable if the table is in [`selectable`](#row-select-support) mode |

When placing inputs, buttons, selects or links within a `head(...)` or `foot(...)` slot, note that
`head-clicked` event will not be emitted when the input, select, textarea is clicked (unless they
are disabled). `head-clicked` will never be emitted when clicking on links or buttons inside the
scoped slots (even when disabled)

**Notes:**

- When using the new Vue 2.6 `v-slot` syntax, note that slot names **cannot** contain spaces, and
  when using in-browser DOM templates the slot names will _always_ be lower cased. To get around
  this, you can pass the slot name using Vue's
  [dynamic slot names](https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names)

### Adding additional rows to the header

If you wish to add additional rows to the header you may do so via the `thead-top` slot. This slot
is inserted before the header cells row, and is not automatically encapsulated by `<tr>..</tr>`
tags. It is recommended to use the BootstrapVue [table helper components](#table-helper-components),
rather than native browser table child elements.

```html
<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      responsive="sm"
    >
      <template #thead-top="data">
        <b-tr>
          <b-th colspan="2"><span class="sr-only">Name and ID</span></b-th>
          <b-th variant="secondary">Type 1</b-th>
          <b-th variant="primary" colspan="3">Type 2</b-th>
          <b-th variant="danger">Type 3</b-th>
        </b-tr>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { name: 'Stephen Hawking', id: 1, type1: false, type2a: true, type2b: false, type2c: false, type3: false },
          { name: 'Johnny Appleseed', id: 2, type1: false, type2a: true, type2b: true, type2c: false, type3: false },
          { name: 'George Washington', id: 3, type1: false, type2a: false, type2b: false, type2c: false, type3: true },
          { name: 'Albert Einstein', id: 4, type1: true, type2a: false, type2b: false, type2c: true, type3: false },
          { name: 'Isaac Newton', id: 5, type1: true, type2a: true, type2b: false, type2c: true, type3: false },
        ],
        fields: [
          'name',
          { key: 'id', label: 'ID' },
          { key: 'type1', label: 'Type 1' },
          { key: 'type2a', label: 'Type 2A' },
          { key: 'type2b', label: 'Type 2B' },
          { key: 'type2c', label: 'Type 2C' },
          { key: 'type3', label: 'Type 3' }
        ]
      }
    }
  }
</script>

<!-- b-table-thead-top-slot.vue -->
```

Slot `thead-top` can be optionally scoped, receiving an object with the following properties:

| Property        | Type   | Description                                                                               |
| --------------- | ------ | ----------------------------------------------------------------------------------------- |
| `columns`       | Number | The number of columns in the rendered table                                               |
| `fields`        | Array  | Array of field definition objects (normalized to the array of objects format)             |
| `selectAllRows` | Method | Select all rows (applicable if the table is in [`selectable`](#row-select-support) mode   |
| `clearSelected` | Method | Unselect all rows (applicable if the table is in [`selectable`](#row-select-support) mode |

### Creating a custom footer

If you need greater layout control of the content of the `<tfoot>`, you can use the optionally
scoped slot `custom-foot` to provide your own rows and cells. Use BootstrapVue's
[table helper sub-components](#table-helper-components) `<b-tr>`, `<b-th>`, and `<b-td>` to generate
your custom footer layout.

Slot `custom-foot` can be optionally scoped, receiving an object with the following properties:

| Property  | Type   | Description                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| `columns` | Number | The number of columns in the rendered table                                                |
| `fields`  | Array  | Array of field definition objects (normalized to the array of objects format)              |
| `items`   | Array  | Array of the currently _displayed_ items records - after filtering, sorting and pagination |

**Notes:**

- The `custom-foot` slot will **not** be rendered if the `foot-clone` prop has been set.
- `head-clicked` events are not be emitted when clicking on `custom-foot` cells.
- Sorting and sorting icons are not available for cells in the `custom-foot` slot.
- The custom footer will not be shown when the table is in visually stacked mode.

## Custom empty and emptyfiltered rendering via slots

Aside from using `empty-text`, `empty-filtered-text`, `empty-html`, and `empty-filtered-html`, it is
also possible to provide custom rendering for tables that have no data to display using named slots.

In order for these slots to be shown, the `show-empty` attribute must be set and `items` must be
either falsy or an array of length 0.

```html
<div>
  <b-table :fields="fields" :items="items" show-empty>
    <template #empty="scope">
      <h4>{{ scope.emptyText }}</h4>
    </template>
    <template #emptyfiltered="scope">
      <h4>{{ scope.emptyFilteredText }}</h4>
    </template>
  </b-table>
</div>
```

The slot can optionally be scoped. The slot's scope (`scope` in the above example) will have the
following properties:

| Property            | Type   | Description                                        |
| ------------------- | ------ | -------------------------------------------------- |
| `emptyHtml`         | String | The `empty-html` prop                              |
| `emptyText`         | String | The `empty-text` prop                              |
| `emptyFilteredHtml` | String | The `empty-filtered-html` prop                     |
| `emptyFilteredText` | String | The `empty-filtered-text` prop                     |
| `fields`            | Array  | The `fields` prop                                  |
| `items`             | Array  | The `items` prop. Exposed here to check null vs [] |

## Advanced features

### Sticky headers

Use the `sticky-header` prop to enable a vertically scrolling table with headers that remain fixed
(sticky) as the table body scrolls. Setting the prop to `true` (or no explicit value) will generate
a table that has a maximum height of `300px`. To specify a maximum height other than `300px`, set
the `sticky-header` prop to a valid CSS height (including units), i.e. `sticky-header="200px"`.
Tables with `sticky-header` enabled will also automatically become always responsive horizontally,
regardless of the [`responsive`](#responsive-tables) prop setting, if the table is wider than the
available horizontal space.

```html
<template>
  <div>
    <b-table sticky-header :items="items" head-variant="light"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' }
        ]
      }
    }
  }
</script>

<!-- b-table-sticky-header.vue -->
```

**Sticky header notes:**

- The `sticky-header` prop has no effect if the table has the [`stacked`](#stacked-tables) prop set.
- Sticky header tables are wrapped inside a vertically scrollable `<div>` with a maximum height set.
- BootstrapVue's custom CSS is required in order to support `sticky-header`.
- Bootstrap v4 uses the CSS style `border-collapse: collapsed` on table elements. This prevents the
  borders on the sticky header from "sticking" to the header, and hence the borders will scroll when
  the body scrolls. To get around this issue, set the prop `no-border-collapse` on the table (note
  that this may cause double width borders when using features such as `bordered`, etc.).
- The sticky header feature uses CSS style `position: sticky` to position the headings. Internet
  Explorer does not support `position: sticky`, hence for IE 11 the table headings will scroll with
  the table body.

### Sticky columns

Columns can be made sticky, where they stick to the left of the table when the table has a
horizontal scrollbar. To make a column a sticky column, set the `stickyColumn` prop in the
[field's header definition](#field-definition-reference). Sticky columns will only work when the
table has either the `sticky-header` prop set and/or the [`responsive`](#responsive-tables) prop is
set.

**Example: Sticky columns and headers**

```html
<template>
  <div>
    <div class="mb-2">
      <b-form-checkbox v-model="stickyHeader" inline>Sticky header</b-form-checkbox>
      <b-form-checkbox v-model="noCollapse" inline>No border collapse</b-form-checkbox>
    </div>
    <b-table
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse"
      responsive
      :items="items"
      :fields="fields"
    >
      <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
      <template #head(id)="scope">
        <div class="text-nowrap">Row ID</div>
      </template>
      <template #head()="scope">
        <div class="text-nowrap">
          Heading {{ scope.label }}
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stickyHeader: true,
        noCollapse: false,
        fields: [
          { key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary' },
          'a',
          'b',
          { key: 'c', stickyColumn: true, variant: 'info' },
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l'
        ],
        items: [
          { id: 1, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 2, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 3, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 4, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 5, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 6, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 7, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 8, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 9, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 10, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 }
        ]
      }
    }
  }
</script>

<!-- table-sticky-columns.vue -->
```

**Sticky column notes:**

- Sticky columns has no effect if the table has the [`stacked`](#stacked-tables) prop set.
- Sticky columns tables require either the `sticky-header` and/or `responsive` modes, and are
  wrapped inside a horizontally scrollable `<div>`.
- When you have multiple columns that are set as `stickyColumn`, the columns will stack over each
  other visually, and the left-most sticky columns may "peek" out from under the next sticky column.
  To get around this behaviour, make sure your latter sticky columns are the same width or wider
  than previous sticky columns.
- Bootstrap v4 uses the CSS style `border-collapse: collapsed` on table elements. This prevents any
  borders on the sticky columns from "sticking" to the column, and hence those borders will scroll
  when the body scrolls. To get around this issue, set the prop `no-border-collapse` on the table
  (note that this may cause double width borders when using features such as `bordered`, etc.).
- BootstrapVue's custom CSS is required in order to support sticky columns.
- The sticky column feature uses CSS style `position: sticky` to position the column cells. Internet
  Explorer does not support `position: sticky`, hence for IE 11 the sticky column will scroll with
  the table body.

### Row details support

If you would optionally like to display additional record information (such as columns not specified
in the fields definition array), you can use the scoped slot `row-details`, in combination with the
special item record Boolean property `_showDetails`.

If the record has its `_showDetails` property set to `true`, **and** a `row-details` scoped slot
exists, a new row will be shown just below the item, with the rendered contents of the `row-details`
scoped slot.

In the scoped field slot, you can toggle the visibility of the row's `row-details` scoped slot by
calling the `toggleDetails` function passed to the field's scoped slot variable. You can use the
scoped fields slot variable `detailsShowing` to determine the visibility of the `row-details` slot.

**Note:** If manipulating the `_showDetails` property directly on the item data (i.e. not via the
`toggleDetails` function reference), the `_showDetails` properly **must** exist in the items data
for proper reactive detection of changes to its value. Read more about
[Vue's reactivity limitations](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats).

**Available `row-details` scoped variable properties:**

| Property        | Type     | Description                                                                                                                   |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `item`          | Object   | The entire row record data object                                                                                             |
| `index`         | Number   | The current visible row number                                                                                                |
| `fields`        | Array    | The normalized fields definition array (in the _array of objects_ format)                                                     |
| `toggleDetails` | Function | Function to toggle visibility of the row's details slot                                                                       |
| `rowSelected`   | Boolean  | Will be `true` if the row has been selected. See section [Row select support](#row-select-support) for additional information |
| `selectRow`     | Function | When called, selects the current row. See section [Row select support](#row-select-support) for additional information        |
| `unselectRow`   | Function | When called, unselects the current row. See section [Row select support](#row-select-support) for additional information      |

Note: the row select related scope properties are only available in `<b-table>`.

In the following example, we show two methods of toggling the visibility of the details: one via a
button, and one via a checkbox. We also have the third row details defaulting to have details
initially showing.

```html
<template>
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
          Details via check
        </b-form-checkbox>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'show_details'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            isActive: false,
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _showDetails: true
          },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table-details.vue -->
```

### Row select support

You can make rows selectable, by using the `<b-table>` prop `selectable`.

Users can easily change the selecting mode by setting the `select-mode` prop.

- `'multi'`: Each click will select/deselect the row (default mode)
- `'single'`: Only a single row can be selected at one time
- `'range'`: Any row clicked is selected, any other deselected. <kbd>Shift</kbd> + click selects a
  range of rows, and <kbd>Ctrl</kbd> (or <kbd>Cmd</kbd>) + click will toggle the selected row.

When a table is `selectable` and the user clicks on a row, `<b-table>` will emit the `row-selected`
event, passing a single argument which is the complete list of selected items. **Treat this argument
as read-only.**

Rows can also be programmatically selected and unselected via the following exposed methods on the
`<b-table>` instance (i.e. via a reference to the table instance via `this.$refs`):

| Method                 | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `selectRow(index)`     | Selects a row with the given `index` number.                                                         |
| `unselectRow(index)`   | Unselects a row with the given `index` number.                                                       |
| `selectAllRows()`      | Selects all rows in the table, except in `single` mode in which case only the first row is selected. |
| `clearSelected()`      | Unselects all rows.                                                                                  |
| `isRowSelected(index)` | Returns `true` if the row with the given `index` is selected, otherwise it returns `false`.          |

**Programmatic row selection notes:**

- `index` is the zero-based index of the table's **visible rows**, after filtering, sorting, and
  pagination have been applied.
- In `single` mode, `selectRow(index)` will unselect any previous selected row.
- Attempting to `selectRow(index)` or `unselectRow(index)` on a non-existent row will be ignored.
- The table must be `selectable` for any of these methods to have effect.
- You can disable selection of rows via click events by setting the `no-select-on-click` prop. Rows
  will then only be selectable programmatically.

**Row select notes:**

- [Sorting](#sorting), [filtering](#filtering), or [paginating](#pagination) the table will **clear
  the active selection**. The `row-selected` event will be emitted with an empty array (`[]`) if
  needed.
- When the table is in `selectable` mode, all data item `<tr>` elements will be in the document tab
  sequence (`tabindex="0"`) for [accessibility](#accessibility) reasons, and will have the attribute
  `aria-selected` set to either `'true'` or `'false'` depending on the selected state of the row.
- When a table is `selectable`, the table will have the attribute `aria-multiselect` set to either
  `'false'` for `single` mode, and `'true'` for either `multi` or `range` modes.

When a `<b-table>` is selectable, it will have class `b-table-selectable` and one of the following
three classes (depending on which mode is in use) on the `<table>` element:

- `b-table-select-single`
- `b-table-select-multi`
- `b-table-select-range`

When at least one row is selected, the class `b-table-selecting` will be active on the `<table>`
element. Rows that are selected rows will have a class of `b-table-row-selected` applied to the
`<tr>` element.

Use the prop `selected-variant` to apply a Bootstrap theme color to the selected row(s). Note, due
to the order that the table variants are defined in Bootstrap's CSS, any row-variant _might_ take
precedence over the `selected-variant`. You can set `selected-variant` to an empty string if you
will be using other means to convey that a row is selected (such as a scoped field slot in the below
example).

The `selected-variant` can be any of the
[standard (or custom) Bootstrap base color variants](/docs/reference/color-variants), or the special
[table `active` variant](/docs/reference/color-variants#table-variants) (the default) which takes
precedence over any specific row or cell variants.

For accessibility reasons (specifically for color blind users, or users with color contrast issues),
it is highly recommended to always provide some other visual means of conveying that a row is
selected, such as a virtual column as shown in the example below.

```html
<template>
  <div>
    <b-form-group
      label="Selection mode:"
      label-for="table-select-mode-select"
      label-cols-md="4"
    >
      <b-form-select
        id="table-select-mode-select"
        v-model="selectMode"
        :options="modes"
        class="mb-3"
      ></b-form-select>
    </b-form-group>

    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button size="sm" @click="selectThirdRow">Select 3rd row</b-button>
      <b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button>
    </p>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modes: ['multi', 'single', 'range'],
        fields: ['selected', 'isActive', 'age', 'first_name', 'last_name'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        selectMode: 'multi',
        selected: []
      }
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
      selectThirdRow() {
        // Rows are indexed from 0, so the third row is index 2
        this.$refs.selectableTable.selectRow(2)
      },
      unselectThirdRow() {
        // Rows are indexed from 0, so the third row is index 2
        this.$refs.selectableTable.unselectRow(2)
      }
    }
  }
</script>

<!-- b-table-selectable.vue -->
```

### Table body transition support

Vue transitions and animations are optionally supported on the `<tbody>` element via the use of
Vue's `<transition-group>` component internally. Three props are available for transitions support
(all three default to undefined):

| Prop                        | Type   | Description                                                       |
| --------------------------- | ------ | ----------------------------------------------------------------- |
| `tbody-transition-props`    | Object | Object of transition-group properties                             |
| `tbody-transition-handlers` | Object | Object of transition-group event handlers                         |
| `primary-key`               | String | String specifying the field to use as a unique row key (required) |

To enable transitions you need to specify `tbody-transition-props` and/or
`tbody-transition-handlers`, and must specify which field key to use as a unique key via the
`primary-key` prop. Your data **must have** a column (specified by setting the `primary-key` prop to
the _name_ of the field) that has a **unique value per row** in order for transitions to work
properly. The `primary-key` field's _value_ can either be a unique string or number. The field
specified does not need to appear in the rendered table output, but it **must** exist in each row of
your items data.

You must also provide CSS to handle your transitions (if using CSS transitions) in your project.

For more information of Vue's list rendering transitions, see the
[Vue JS official docs](https://vuejs.org/v2/guide/transitions.html#List-Move-Transitions).

In the example below, we have used the following custom CSS:

```css
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
```

```html
<template>
  <div>
    <b-table
      id="table-transition-example"
      :items="items"
      :fields="fields"
      striped
      small
      primary-key="a"
      :tbody-transition-props="transProps"
    ></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transProps: {
          // Transition name
          name: 'flip-list'
        },
        items: [
          { a: 2, b: 'Two', c: 'Moose' },
          { a: 1, b: 'Three', c: 'Dog' },
          { a: 3, b: 'Four', c: 'Cat' },
          { a: 4, b: 'One', c: 'Mouse' }
        ],
        fields: [
          { key: 'a', sortable: true },
          { key: 'b', sortable: true },
          { key: 'c', sortable: true }
        ]
      }
    }
  }
</script>

<!-- b-table-transitions.vue -->
```

### `v-model` binding

If you bind a variable to the `v-model` prop, the contents of this variable will be the currently
displayed item records (zero based index, up to `page-size` - 1). This variable (the `value` prop)
should usually be treated as _readonly_.

The records within the `v-model` are a filtered/paginated _shallow copy_ of `items`, and hence any
changes to a record's properties in the `v-model` will be reflected in the original `items` array
(except when `items` is set to a provider function). Deleting a record from the `v-model` array will
**not** remove the record from the original items array nor will it remove it from the displayed
rows.

**Note:** Do not bind any value directly to the `value` prop. Use the `v-model` binding.

## Sorting

As mentioned in the [Fields](#fields-column-definitions) section above, you can make columns
sortable in `<b-table>`. Clicking on a sortable column header will sort the column in ascending
direction (smallest first), while clicking on it again will switch the direction of sorting to
descending (largest first). Clicking on a non-sortable column will clear the sorting (the prop
`no-sort-reset` can be used to disable this feature).

You can control which column is pre-sorted and the order of sorting (ascending or descending). To
pre-specify the column to be sorted, set the `sort-by` prop to the field's key. Set the sort
direction by setting `sort-desc` to either `true` (for descending) or `false` (for ascending, the
default).

- **Ascending**: Items are sorted lowest to highest (i.e. `A` to `Z`) and will be displayed with the
  lowest value in the first row with progressively higher values in the following rows.
- **Descending**: Items are sorted highest to lowest (i.e. `Z` to `A`) and will be displayed with
  the highest value in the first row with progressively lower values in the following rows.

The props `sort-by` and `sort-desc` can be turned into _two-way_ (syncable) props by adding the
`.sync` modifier. Your bound variables will then be updated accordingly based on the current sort
criteria. See the [Vue docs](https://vuejs.org/v2/guide/components.html#sync-Modifier) for details
on the `.sync` prop modifier.

Setting `sort-by` to a column that is not defined in the fields as `sortable` will result in the
table not being sorted.

When the prop `foot-clone` is set, the footer headings will also allow sorting by clicking, even if
you have custom formatted footer field headers. To disable the sort icons and sorting via heading
clicks in the footer, set the `no-footer-sorting` prop to true.

```html
<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    ></b-table>

    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table-sorting.vue -->
```

### Sort icon alignment

By default the sorting icons appear right aligned in the header cell. You can change the icons to be
left aligned by setting the prop `sort-icon-left` on `<b-table>`.

```html
<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
    ></b-table>

    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<!-- b-table-sorting-left.vue -->
```

### Customizing the sort icons

The sorting icons are generated via the use of SVG background images. The icons can be altered by
updating BootstrapVue's SASS/SCSS variables and recompiling the SCSS source code. Refer to the
[theming](/docs/reference/theming) section for details on customizing Bootstrap and BootstrapVue's
generated CSS.

### Sort-compare routine

The internal built-in default `sort-compare` function sorts the specified field `key` based on the
data in the underlying record object (or by formatted value if a field has a formatter function, and
the field has its `sortByFormatted` property is set to `true`). The field value is first stringified
if it is an object and then sorted.

**Notes:**

- The built-in `sort-compare` routine **cannot** sort based on the custom rendering of the field
  data: scoped slots are used only for _presentation only_, and do not affect the underlying data.
- Fields that have a [`formatter` function](#formatter-callback) (virtual field or regular field)
  can be sorted by the value returned via the formatter function if the
  [field](#field-definition-reference) property `sortByFormatted` is set to `true`. Optionally you
  can pass a formatter function reference to `sortByFormatted` to format the value before sorting.
  The default is `false` which will sort by the original field value. This is only applicable for
  the built-in sort-compare routine.
- By default, the internal sorting routine will sort `null`, `undefined`, or empty string values
  first (less than any other values). To sort so that `null`, `undefined` or empty string values
  appear last (greater than any other value), set the `sort-null-last` prop to `true`.

For customizing the sort-compare handling, refer to the
[Custom sort-compare routine](#custom-sort-compare-routine) section below.

### Internal sorting and locale handling

The internal sort-compare routine uses
[`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
for comparing the stringified column value (if values being compared are not both `Number` or both
`Date` types). The browser native `localeCompare()` method accepts a `locale` string (or array of
locale strings) and an `options` object for controlling how strings are sorted. The default options
are `{ numeric: true }`, and the locale is `undefined` (which uses the browser default locale).

You can change the locale (or locales) via the `sort-compare-locale` prop to set the locale(s) for
sorting, as well as pass sort options via the `sort-compare-options` prop.

The `sort-compare-locale` prop defaults to `undefined`, which uses the browser (or Node.js runtime)
default locale. The prop `sort-compare-locale` can either accept a
[BCP 47 language tag](https://tools.ietf.org/html/rfc5646) string or an _array_ of such tags. For
more details on locales, please see
[Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
on MDN.

The `sort-compare-options` prop accepts an object containing any of the following properties:

- `localeMatcher`: The locale matching algorithm to use. Possible values are `'lookup'` and
  `'best fit'`. The default is `'best fit'`. For information about this option, see the
  [MDN Intl page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation)
  for details.
- `sensitivity`: Which differences in the strings should lead to _non-zero_ compare result values.
  Possible values are:
  - `'base'`: Only strings that differ in base letters compare as unequal. Examples: `a ≠ b`,
    `a = á`, `a = A`.
  - `'accent'`: Only strings that differ in base letters or accents and other diacritic marks
    compare as unequal. Examples: `a ≠ b`, `a ≠ á`, `a = A`.
  - `'case'`: Only strings that differ in base letters or case compare as unequal. Examples:
    `a ≠ b`, `a = á`, `a ≠ A`.
  - `'variant'`: **(default)** Strings that differ in base letters, accents and other diacritic
    marks, or case compare as unequal. Other differences _may also_ be taken into consideration.
    Examples: `a ≠ b`, `a ≠ á`, `a ≠ A`.
- `ignorePunctuation`: Whether punctuation should be ignored. Possible values are `true` and
  `false`. The default is `false`.
- `numeric`: Whether numeric collation should be used, such that `'1' < '2' < '10'`. Possible values
  are `true` and `false`. The default is `false`. Note that implementations (browsers, runtimes) are
  not required to support this property, and therefore it might be ignored.
- `caseFirst`: Whether upper case or lower case should sort first. Possible values are `'upper'`,
  `'lower'`, or `'false'` (use the locale's default). The default is `'false'`. Implementations are
  not required to support this property.
- `'usage'`: **Always** set to `'sort'` by `<b-table>`

**Example 1:** If you want to sort German words, set `sort-compare-locale="de"` (in German, `ä`
sorts _before_ `z`) or Swedish set `sort-compare-locale="sv"` (in Swedish, `ä` sorts _after_ `z`)

**Example 2:** To compare numbers that are strings numerically, and to ignore case and accents:

```html
<b-table :sort-compare-options="{ numeric: true, sensitivity: 'base' }" ...>
```

**Notes:**

- Refer to
  [MDN `String.prototype.localeCompare()` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
  for details on the options object property values.
- Refer to
  [MDN locales documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)
  for details on locale values.
- Not all browsers (or Node.js) support the `locale` and `options` with
  `String.prototype.localeCompare()`. Refer to [Can I use](https://caniuse.com/localecompare) for
  browser support. For Node.js, you may need to add in
  [Intl support](https://nodejs.org/api/intl.html) for handling locales, other than the default, to
  prevent [SSR hydration mismatch errors](https://ssr.vuejs.org/guide/hydration.html).

### Custom sort-compare routine

You can provide your own custom sort compare routine by passing a function reference to the prop
`sort-compare`. The `sort-compare` routine is passed seven (7) arguments, of which the last 4 are
optional:

- the first two arguments (`a` and `b`) are the _record objects_ for the rows being compared
- the third argument is the field `key` being sorted on (`sortBy`)
- the fourth argument (`sortDesc`) is the order `<b-table>` will be displaying the records (`true`
  for descending, `false` for ascending)
- the fifth argument is a reference to the field's [formatter function](#formatter-callback) or the
  field's `filterByFormatted` value if it is a function reference. If not formatter is found this
  value will be `undefined`. You will need to call this method to get the formatted field value:
  `valA = formatter(a[key], key, a)` and `valB = formatter(b[key], key, b)`, if you need to sort by
  the formatted value. This will be `undefined` if the field's `sortByFormatted` property is not
  `true` or is not a formatter function _reference_, or the fields formatter function cannot be
  found.
- the sixth argument is the value of the `sort-compare-options` prop (default is
  `{ numeric: true }`)
- the seventh argument is the value of the `sort-compare-locale` prop (default is `undefined`)

The sixth and seventh arguments can be used if you are using the
[`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
method to compare strings.

In most typical situations, you only need to use the first three arguments. The fourth argument -
sorting direction - should not normally be used, as `b-table` will handle the direction, and this
value is typically only needed when special handling of how `null` and/or `undefined` values are
sorted (i.e. sorting `null`/`undefined` first or last).

The routine should return either `-1` (or a negative value) for `a[key] < b[key]` , `0` for
`a[key] === b[key]`, or `1` (or a positive value) for `a[key] > b[key]`.

Your custom sort-compare routine can also return `null` or `false`, to fall back to the _built-in
sort-compare routine_ for the particular `key`. You can use this feature (i.e. by returning `null`)
to have your custom sort-compare routine handle _only_ certain fields (keys) such as the special
case of virtual (scoped slot) columns, and have the internal (built in) sort-compare handle all
_other_ fields.

The default sort-compare routine works similar to the following. Note the fourth argument (sorting
direction) is **not** used in the sort comparison:

<!-- eslint-disable no-unused-vars, no-undef -->

```js
function sortCompare(aRow, bRow, key, sortDesc, formatter, compareOptions, compareLocale) {
  const a = aRow[key] // or use Lodash `_.get()`
  const b = bRow[key]
  if (
    (typeof a === 'number' && typeof b === 'number') ||
    (a instanceof Date && b instanceof Date)
  ) {
    // If both compared fields are native numbers or both are native dates
    return a < b ? -1 : a > b ? 1 : 0
  } else {
    // Otherwise stringify the field data and use String.prototype.localeCompare
    return toString(a).localeCompare(toString(b), compareLocale, compareOptions)
  }
}

// Helper function to stringify the values of an Object
function toString(value) {
  if (value === null || typeof value === 'undefined') {
    return ''
  } else if (value instanceof Object) {
    return Object.keys(value)
      .sort()
      .map(key => toString(value[key]))
      .join(' ')
  } else {
    return String(value)
  }
}
```

### Disable local sorting

If you want to handle sorting entirely in your app, you can disable the local sorting in `<b-table>`
by setting the prop `no-local-sorting` to `true`, while still maintaining the sortable header
functionality (via `sort-changed` or `context-changed` events as well as syncable props).

You can use the syncable props `sort-by.sync` and `sort-desc.sync` to detect changes in sorting
column and direction.

Also, When a sortable column header (or footer) is clicked, the event `sort-changed` will be emitted
with a single argument containing the context object of `<b-table>`. See the
[Detection of sorting change](#detection-of-sorting-change) section below for details about the
sort-changed event and the context object.

When `no-local-sorting` is `true`, the `sort-compare` prop has no effect.

### Change initial sort direction

Control the order in which ascending and descending sorting is applied when a sortable column header
is clicked, by using the `sort-direction` prop. The default value `'asc'` applies ascending sort
first (when a column is not currently sorted). To reverse the behavior and sort in descending
direction first, set it to `'desc'`.

If you don't want the current sorting direction to change when clicking another sortable column
header, set `sort-direction` to `'last'`. This will maintain the sorting direction of the previously
sorted column.

For individual column initial sort direction (which applies when the column transitions from
unsorted to sorted), specify the property `sortDirection` in `fields`. See the
[Complete Example](#complete-example) below for an example of using this feature.

## Filtering

Filtering, when used, is applied by default to the **original items** array data. `b-table` provides
several options for how data is filtered.

It is currently not possible to filter based on result of formatting via
[scoped field slots](#scoped-field-slots).

### Built in filtering

The item's row data values are stringified (see the sorting section above for how stringification is
done) and the filter searches that stringified data (excluding any of the special properties that
begin with an underscore `'_'`). The stringification also, by default, includes any data not shown
in the presented columns.

With the default built-in filter function, the `filter` prop value can either be a string or a
`RegExp` object (regular expressions should _not_ have the `/g` global flag set).

If the stringified row contains the provided string value or matches the RegExp expression then it
is included in the displayed results.

Set the `filter` prop to `null` or an empty string to clear the current filter.

### Built in filtering options

There are several options for controlling what data the filter is applied against.

- The `filter-ignored-fields` prop accepts an array of _top-level_ (immediate properties of the row
  data) field keys that should be ignored when filtering.
- The `filter-included-fields` prop accepts an array of _top-level_ (immediate properties of the row
  data) field keys that should used when filtering. All other field keys not included in this array
  will be ignored. This feature can be handy when you want to filter on specific columns. If the
  specified array is empty, then _all_ fields are included, except those specified via the prop
  `filter-ignored-fields`. If a field key is specified in both `filter-ignored-fields` and
  `filter-included-fields`, then `filter-included-fields` takes precedence.
- Normally, `<b-table>` filters based on the stringified record data. If the field has a `formatter`
  function specified, you can optionally filter based on the result of the formatter by setting the
  [field definition property](#field-definition-reference) `filterByFormatted` to `true`. If the
  field does not have a formatter function, this option is ignored. You can optionally pass a
  formatter function _reference_, to be used for filtering only, to the field definition property
  `filterByFormatted`.

The props `filter-ignored-fields` and `filter-included-fields`, and the field definition property
`filterByFormatted` have no effect when using a [custom filter function](#custom-filter-function),
or [items provider](#using-items-provider-functions) based filtering.

### Custom filter function

You can also use a custom filter function, by setting the prop `filter-function` to a reference of
custom filter test function. The filter function will be passed two arguments:

- the original item row record data object. **Treat this argument as read-only.**
- the content of the `filter` prop (could be a string, RegExp, array, or object)

The function should return `true` if the record matches your criteria or `false` if the record is to
be filtered out.

For proper reactive updates to the displayed data, when not filtering you should set the `filter`
prop to `null` or an empty string (and not an empty object or array). The filter function will not
be called when the `filter` prop is a falsey value.

The display of the `empty-filter-text` relies on the truthiness of the `filter` prop.

### Filter events

When local filtering is applied, and the resultant number of items change, `<b-table>` will emit the
`filtered` event with a two arguments:

- an array reference which is the complete list of items passing the filter routine. **Treat this
  argument as read-only.**
- the number of records that passed the filter test (the length of the first argument)

Setting the prop `filter` to null or an empty string will clear local items filtering.

### Debouncing filter criteria changes

<span class="badge badge-warning small">deprecated in v2.1.0</span> Use the `debounce` feature of
[`<b-form-input>`](/docs/components/form-input#debounce-support) instead.

If you have a text input tied to the `filter` prop of `<b-table>`, the filtering process will occur
for each character typed by the user. With large items datasets, this process can take a while and
may cause the text input to appear sluggish.

To help alleviate this type of situation, `<b-table>` accepts a debounce timeout value (in
milliseconds) via the `filter-debounce` prop. The default is `0` (milliseconds). When a value
greater than `0` is provided, the filter will wait for that time before updating the table results.
If the value of the `filter` prop changes before this timeout expires, the filtering will be once
again delayed until the debounce timeout expires.

When used, the suggested value of `filter-debounce` should be in the range of `100` to `200`
milliseconds, but other values may be more suitable for your use case.

The use of this prop can be beneficial when using provider filtering with
[items provider functions](#using-items-provider-functions), to help reduce the number of calls to
your back end API.

### Filtering notes

See the [Complete Example](#complete-example) below for an example of using the `filter` feature.

## Pagination

`<b-table>` supports built in pagination of item data. You can control how many rows are displayed
at a time by setting the `per-page` prop to the maximum number of rows you would like displayed, and
use the `current-page` prop to specify which page to display (starting from page `1`). If you set
`current-page` to a value larger than the computed number of pages, then no rows will be shown.

You can use the [`<b-pagination>`](/docs/components/pagination) component in conjunction with
`<b-table>` for providing control over pagination.

Setting `per-page` to `0` (default) will disable the local items pagination feature.

## Using items provider functions

As mentioned under the [Items](#items-record-data) prop section, it is possible to use a function to
provide the row data (items), by specifying a function reference via the `items` prop.

The provider function is called with the following signature:

<!-- eslint-disable no-undef -->

```js
provider(ctx, [callback])
```

The `ctx` is the context object associated with the table state, and contains the following
properties:

| Property      | Type                       | Description                                                                       |
| ------------- | -------------------------- | --------------------------------------------------------------------------------- |
| `currentPage` | Number                     | The current page number (starting from 1, the value of the `current-page` prop)   |
| `perPage`     | Number                     | The maximum number of rows per page to display (the value of the `per-page` prop) |
| `filter`      | String or RegExp or Object | The value of the `filter` prop                                                    |
| `sortBy`      | String                     | The current column key being sorted, or an empty string if not sorting            |
| `sortDesc`    | Boolean                    | The current sort direction (`true` for descending, `false` for ascending)         |
| `apiUrl`      | String                     | The value provided to the `api-url` prop. `null` if none provided.                |

The second argument `callback` is an optional parameter for when using the callback asynchronous
method.

**Example: returning an array of data (synchronous):**

<!-- eslint-disable no-unused-vars, prefer-const -->

```js
function myProvider() {
  let items = []

  // Perform any items processing needed

  // Must return an array
  return items || []
}
```

**Example: Using callback to return data (asynchronous):**

<!-- eslint-disable no-unused-vars, node/no-callback-literal -->

```js
function myProvider(ctx, callback) {
  const params = '?page=' + ctx.currentPage + '&size=' + ctx.perPage

  this.fetchData('/some/url' + params)
    .then(data => {
      // Pluck the array of items off our axios response
      const items = data.items
      // Provide the array of items to the callback
      callback(items)
    })
    .catch(() => {
      callback([])
    })

  // Must return null or undefined to signal b-table that callback is being used
  return null
}
```

**Example: Using a Promise to return data (asynchronous):**

<!-- eslint-disable no-unused-vars, no-undef -->

```js
function myProvider(ctx) {
  const promise = axios.get('/some/url?page=' + ctx.currentPage + '&size=' + ctx.perPage)

  // Must return a promise that resolves to an array of items
  return promise.then(data => {
    // Pluck the array of items off our axios response
    const items = data.items
    // Must return an array of items or an empty array if an error occurred
    return items || []
  })
}
```

**Example: Using an async function (semi-synchronous):**

Using an async method to return an items array is possible:

<!-- eslint-disable no-unused-vars, no-undef -->

```js
async function myProvider(ctx) {
  try {
    const response = await axios.get(`/some/url?page=${ctx.currentPage}&size=${ctx.perPage}`)
    return response.items
  } catch (error) {
    return []
  }
}
```

Note that not all browsers support `async/await` natively. For browsers that do not support `async`
methods, you will need to transpile your code.

### Automated table busy state

`<b-table>` automatically tracks/controls its `busy` state when items provider functions are used,
however it also provides a `busy` prop that can be used either to override the inner `busy` state,
or to monitor `<b-pagination>`'s current busy state in your application using the 2-way `.sync`
modifier.

**Note:** in order to allow `<b-table>` fully track its `busy` state, the custom items provider
function should handle errors from data sources and return an empty array to `<b-table>`.

**Example: usage of busy state**

```html
<template>
  <div>
    <b-table
      id="my-table"
      :busy.sync="isBusy"
      :items="myProvider"
      :fields="fields"
      ...
    ></b-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isBusy: false
      }
    }
    methods: {
      myProvider () {
        // Here we don't set isBusy prop, so busy state will be
        // handled by table itself
        // this.isBusy = true
        let promise = axios.get('/some/url')

        return promise.then((data) => {
          const items = data.items
          // Here we could override the busy state, setting isBusy to false
          // this.isBusy = false
          return(items)
        }).catch(error => {
          // Here we could override the busy state, setting isBusy to false
          // this.isBusy = false
          // Returning an empty array, allows table to correctly handle
          // internal busy state in case of error
          return []
        })
      }
    }
  }
</script>
```

If using an `async/await` provider:

<!-- eslint-disable no-unused-vars, no-undef -->

```js
async function myProvider(ctx) {
  this.isBusy = true
  try {
    const response = await axios.get(`/some/url?page=${ctx.currentPage}&size=${ctx.perPage}`)
    this.isBusy = false
    return response.items
  } catch (error) {
    this.isBusy = false
    return []
  }
}
```

**Notes:**

- If you manually place the table in the `busy` state, the items provider will **not** be
  called/refreshed until the `busy` state has been set to `false`.
- All click related and hover events, and sort-changed events will **not** be emitted when in the
  `busy` state (either set automatically during provider update, or when manually set).

### Provider paging, filtering, and sorting

By default, the items provider function is responsible for **all paging, filtering, and sorting** of
the data, before passing it to `b-table` for display.

You can disable provider paging, filtering, and sorting (individually) by setting the following
`b-table` prop(s) to `true`:

| Prop                    | Type    | Default | Description                                                    |
| ----------------------- | ------- | ------- | -------------------------------------------------------------- |
| `no-provider-paging`    | Boolean | `false` | When `true` enables the use of `b-table` local data pagination |
| `no-provider-sorting`   | Boolean | `false` | When `true` enables the use of `b-table` local sorting         |
| `no-provider-filtering` | Boolean | `false` | When `true` enables the use of `b-table` local filtering       |

When `no-provider-paging` is `false` (default), you should only return at maximum, `perPage` number
of records.

**Notes:**

- `<b-table>` needs reference to your pagination and filtering values in order to trigger the
  calling of the provider function. So be sure to bind to the `per-page`, `current-page` and
  `filter` props on `b-table` to trigger the provider update function call (unless you have the
  respective `no-provider-*` prop set to `true`).
- The `no-local-sorting` prop has no effect when `items` is a provider function.
- When using provider filtering, you may find that setting the
  [`debounce` prop on `<b-form-input>`](/docs/components/form-input#debounce-support) to a value
  greater than `100` ms will help minimize the number of calls to your back end API as the user
  types in the criteria.

### Force refreshing of table data

You may also trigger the refresh of the provider function by emitting the event `refresh::table` on
`$root` with the single argument being the `id` of your `b-table`. You must have a unique ID on your
table for this to work.

```js
this.$root.$emit('bv::refresh::table', 'my-table')
```

Or by calling the `refresh()` method on the table reference

```html
<div>
  <b-table ref="table" ... ></b-table>
</div>
```

```js
this.$refs.table.refresh()
```

**Note:** If the table is in the `busy` state (i.e. a provider update is currently running), the
refresh will wait until the current update is completed. If there is currently a refresh pending and
a new refresh is requested, then only one refresh will occur.

### Detection of sorting change

By listening on `<b-table>` `sort-changed` event, you can detect when the sorting key and direction
have changed.

```html
<div>
  <b-table @sort-changed="sortingChanged" ... ></b-table>
</div>
```

The `sort-changed` event provides a single argument of the table's current state context object.
This context object has the same format as used by items provider functions.

<!-- eslint-disable no-unused-vars -->

```js
export default {
  methods: {
    sortingChanged(ctx) {
      // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
      // ctx.sortDesc ==> true if sorting descending, false otherwise
    }
  }
}
```

You can also obtain the current sortBy and sortDesc values by using the `:sort-by.sync` and
`:sort-desc.sync` two-way props respectively (see section [Sorting](#sorting) above for details).

```html
<div>
  <b-table :sort-by.sync="mySortBy" :sort-desc.sync="mySortDesc" ... ></b-table>
</div>
```

### Server side rendering

Special care must be taken when using server side rendering (SSR) and an `items` provider function.
Make sure you handle any special situations that may be needed server side when fetching your data!

When `<b-table>` is mounted in the document, it will automatically trigger a provider update call.

## Light-weight tables

`<b-table-lite>` provides a great alternative to `<b-table>` if you just need simple display of
tabular data. The `<b-table-lite>` component provides all of the styling and formatting features of
`<b-table>` (including row details and stacked support), while **excluding** the following features:

- Filtering
- Sorting
- Pagination
- Items provider support
- Selectable rows
- Busy table state and styling
- Fixed top and bottom rows
- Empty row support

### Table lite as a plugin

The `TablePlugin` includes `<b-table-lite>`. For convenience, BootstrapVue also provides a
`TableLitePlugin` which installs only `<b-table-lite>`. `TableLitePlugin` is available as a top
level named export.

## Simple tables

The `<b-table-simple>` component gives the user complete control over the rendering of the table
content, while providing basic Bootstrap v4 table styling. `<b-table-simple>` is a wrapper component
around the `<table>` element. Inside the component, via the `default` slot, you can use any or all
of the BootstrapVue [table helper components](#table-helper-components): `<b-thead>`, `<b-tfoot>`,
`<b-tbody>`, `<b-tr>`, `<b-th>`, `<b-td>`, and the HTML5 elements `<caption>`, `<colgroup>` and
`<col>`. Contrary to the component's name, one can create simple or complex table layouts with
`<b-table-simple>`.

`<b-table-simple>` provides basic styling options via props: `striped`, `bordered`, `borderless`,
`outlined`, `small`, `hover`, `dark`, `fixed`, `responsive` and `sticky-header`. Note that `stacked`
mode is available but requires some additional markup to generate the cell headings, as described in
the [Simple tables and stacked mode](#simple-tables-and-stacked-mode) section below. Sticky columns
are also supported, but also require a bit of additional markup to specify which columns are to be
sticky. See below for more information on using [sticky columns](#simple-tables-and-sticky-columns).

Since `b-table-simple` is just a wrapper component, of which you will need to render content inside,
it does not provide any of the advanced features of `<b-table>` (i.e. row events, head events,
sorting, pagination, filtering, foot-clone, items, fields, etc.).

```html
<div>
  <b-table-simple hover small caption-top responsive>
    <caption>Items sold in August, grouped by Country and City:</caption>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="2">Region</b-th>
        <b-th colspan="3">Clothes</b-th>
        <b-th colspan="2">Accessories</b-th>
      </b-tr>
      <b-tr>
        <b-th>Country</b-th>
        <b-th>City</b-th>
        <b-th>Trousers</b-th>
        <b-th>Skirts</b-th>
        <b-th>Dresses</b-th>
        <b-th>Bracelets</b-th>
        <b-th>Rings</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th rowspan="3">Belgium</b-th>
        <b-th class="text-right">Antwerp</b-th>
        <b-td>56</b-td>
        <b-td>22</b-td>
        <b-td>43</b-td>
        <b-td variant="success">72</b-td>
        <b-td>23</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Gent</b-th>
        <b-td>46</b-td>
        <b-td variant="warning">18</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
        <b-td variant="danger">15</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Brussels</b-th>
        <b-td>51</b-td>
        <b-td>27</b-td>
        <b-td>38</b-td>
        <b-td>69</b-td>
        <b-td>28</b-td>
      </b-tr>
      <b-tr>
        <b-th rowspan="2">The Netherlands</b-th>
        <b-th class="text-right">Amsterdam</b-th>
        <b-td variant="success">89</b-td>
        <b-td>34</b-td>
        <b-td>69</b-td>
        <b-td>85</b-td>
        <b-td>38</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Utrecht</b-th>
        <b-td>80</b-td>
        <b-td variant="danger">12</b-td>
        <b-td>43</b-td>
        <b-td>36</b-td>
        <b-td variant="warning">19</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="7" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</div>

<!-- b-table-simple.vue -->
```

When in `responsive` or `sticky-header` mode, the `<table>` element is wrapped inside a `<div>`
element. If you need to apply additional classes to the `<table>` element, use the `table-class`
prop.

Any additional attributes given to `<b-table-simple>` will always be applied to the `<table>`
element.

### Simple tables and stacked mode

A bit of additional markup is required on your `<b-table-simple>` body cells when the table is in
stacked mode. Specifically, BootstrapVue uses a special data attribute to create the cell's heading,
of which you can supply to `<b-td>` or `<b-th>` via the `stacked-heading` prop. Only plain strings
are supported (not HTML markup), as we use the pseudo element `::before` and css `content` property.

Here is the same table as above, set to be always stacked, which has the extra markup to handle
stacked mode (specifically for generating the cell headings):

```html
<div>
  <b-table-simple hover small caption-top stacked>
    <caption>Items sold in August, grouped by Country and City:</caption>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="2">Region</b-th>
        <b-th colspan="3">Clothes</b-th>
        <b-th colspan="2">Accessories</b-th>
      </b-tr>
      <b-tr>
        <b-th>Country</b-th>
        <b-th>City</b-th>
        <b-th>Trousers</b-th>
        <b-th>Skirts</b-th>
        <b-th>Dresses</b-th>
        <b-th>Bracelets</b-th>
        <b-th>Rings</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th rowspan="3" class="text-center">Belgium (3 Cities)</b-th>
        <b-th stacked-heading="City" class="text-left">Antwerp</b-th>
        <b-td stacked-heading="Clothes: Trousers">56</b-td>
        <b-td stacked-heading="Clothes: Skirts">22</b-td>
        <b-td stacked-heading="Clothes: Dresses">43</b-td>
        <b-td stacked-heading="Accessories: Bracelets" variant="success">72</b-td>
        <b-td stacked-heading="Accessories: Rings">23</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Gent</b-th>
        <b-td stacked-heading="Clothes: Trousers">46</b-td>
        <b-td stacked-heading="Clothes: Skirts" variant="warning">18</b-td>
        <b-td stacked-heading="Clothes: Dresses">50</b-td>
        <b-td stacked-heading="Accessories: Bracelets">61</b-td>
        <b-td stacked-heading="Accessories: Rings" variant="danger">15</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Brussels</b-th>
        <b-td stacked-heading="Clothes: Trousers">51</b-td>
        <b-td stacked-heading="Clothes: Skirts">27</b-td>
        <b-td stacked-heading="Clothes: Dresses">38</b-td>
        <b-td stacked-heading="Accessories: Bracelets">69</b-td>
        <b-td stacked-heading="Accessories: Rings">28</b-td>
      </b-tr>
      <b-tr>
        <b-th rowspan="2" class="text-center">The Netherlands (2 Cities)</b-th>
        <b-th stacked-heading="City">Amsterdam</b-th>
        <b-td stacked-heading="Clothes: Trousers" variant="success">89</b-td>
        <b-td stacked-heading="Clothes: Skirts">34</b-td>
        <b-td stacked-heading="Clothes: Dresses">69</b-td>
        <b-td stacked-heading="Accessories: Bracelets">85</b-td>
        <b-td stacked-heading="Accessories: Rings">38</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Utrecht</b-th>
        <b-td stacked-heading="Clothes: Trousers">80</b-td>
        <b-td stacked-heading="Clothes: Skirts" variant="danger">12</b-td>
        <b-td stacked-heading="Clothes: Dresses">43</b-td>
        <b-td stacked-heading="Accessories: Bracelets">36</b-td>
        <b-td stacked-heading="Accessories: Rings" variant="warning">19</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="7" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</div>

<!-- b-table-simple-stacked.vue -->
```

Like `<b-table>` and `<b-table-lite>`, table headers (`<thead>`) and footers (`<tfoot>`) are
visually hidden when the table is visually stacked. If you need a header or footer, you can do so by
creating an extra `<b-tr>` inside of the `<b-tbody>` component (or in a second `<b-tbody>`
component), and set a role of `columnheader` on the child `<b-th>` cells, and use Bootstrap v4
[responsive display utility classes](/docs/reference/utility-classes) to hide the extra row (or
`<b-tbody>`) above a certain breakpoint when the table is no longer visually stacked (the breakpoint
should match the stacked table breakpoint you have set), i.e. `<b-tr class="d-md-none">` would hide
the row on medium and wider screens, while `<b-tbody class="d-md-none">` would hide the row group on
medium and wider screens.

**Note:** stacked mode with `<b-table-simple>` requires that you use the BootstrapVue
[table helper components](#table-helper-components). Use of the regular `<tbody>`, `<tr>`, `<td>`
and `<th>` element tags will not work as expected, nor will they automatically apply any of the
required accessibility attributes.

### Simple tables and sticky columns

Sticky columns are supported with `<b-table-simple>`, but you will need to set the `sticky-column`
prop on each table cell (in the `thead`, `tbody`, and `tfoot` row groups) in the column that is to
be sticky. For example:

```html
<b-table-simple responsive>
  <b-thead>
    <b-tr>
      <b-th sticky-column>Sticky Column Header</b-th>
      <b-th>Heading 1</b-th>
      <b-th>Heading 2</b-th>
      <b-th>Heading 3</b-th>
      <b-th>Heading 4</b-th>
    </b-tr>
  </b-thead>
  <b-tbody>
    <b-tr>
      <b-th sticky-column>Sticky Column Row Header</b-th>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
    </b-tr>
    <b-tr>
      <b-th sticky-column>Sticky Column Row Header</b-th>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
    </b-tr>
  </b-tbody>
  <b-tfoot>
    <b-tr>
      <b-th sticky-column>Sticky Column Footer</b-th>
      <b-th>Heading 1</b-th>
      <b-th>Heading 2</b-th>
      <b-th>Heading 3</b-th>
      <b-th>Heading 4</b-th>
    </b-tr>
  </b-tfoot>
</b-table-simple>
```

As with `<b-table>` and `<b-table-lite>`, sticky columns are not supported when the `stacked` prop
is set on `<b-table-simple>`.

### Table simple as a plugin

The `TablePlugin` includes `<b-table-simple>` and all of the helper components. For convenience,
BootstrapVue also provides a `TableSimplePlugin` which installs `<b-table-simple>` and all of the
helper components. `TableSimplePlugin` is available as a top level named export.

## Table helper components

BootstrapVue provides additional helper child components when using `<b-table-simple>`, or the named
slots `top-row`, `bottom-row`, `thead-top`, and `custom-foot` (all of which accept table child
elements). The helper components are as follows:

- `b-tbody` (`<b-table-simple>` only)
- `b-thead` (`<b-table-simple>` only)
- `b-tfoot` (`<b-table-simple>` only)
- `b-tr`
- `b-td`
- `b-th`

These components are optimized to handle converting variants to the appropriate classes (such as
handling table `dark` mode), and automatically applying certain accessibility attributes (i.e.
`role`s and `scope`s). They also can generate the stacked table, and sticky header and column,
markup. Components `<b-table>` and `<b-table-lite>` use these helper components internally.

In the [Simple tables](#simple-tables) example, we are using the helper components `<b-thead>`,
`<b-tbody>`, `<b-tr>`, `<b-th>`, `<b-td>` and `<b-tfoot>`. While you can use regular table child
elements (i.e. `<tbody>`, `<tr>`, `<td>`, etc.) within `<b-table-simple>`, and the named slots
`top-row`, `bottom-row`, and `thead-top`, it is recommended to use these BootstrapVue table `<b-t*>`
helper components. Note that there are no helper components for `<caption>`, `<colgroup>` or
`<col>`, so you may use these three HTML5 elements directly in `<b-table-simple>`.

- Table helper components `<b-tr>`, `<b-td>` and `<b-th>` all accept a `variant` prop, which will
  apply one of the Bootstrap theme colors (custom theme colors are supported via
  [theming](/docs/reference/theming).) and will automatically adjust to use the correct variant
  class based on the table's `dark` mode.
- The helper components `<b-thead>`, `<b-tfoot>` accept a `head-variant` and `foot-variant` prop
  respectively. Supported values are `'dark'`, `'light'` or `null` (`null` uses the default table
  background). These variants also control the text color (light text for `'dark'` variant, and dark
  text for the `'light'` variant).
- Accessibility attributes `role` and `scope` are automatically set on `<b-th>` and `<b-td>`
  components based on their location (thead, tbody, or tfoot) and their `rowspan` or `colspan`
  props. You can override the automatic `scope` and `role` values by setting the appropriate
  attribute on the helper component.
- For `<b-tbody>`, `<b-thead>`, and `<b-tfoot>` helper components, the appropriate default `role` of
  `'rowgroup'` will be applied, unless you override the role by supplying a `role` attribute.
- For the `<b-tr>` helper component, the appropriate default `role` of `'row'` will be applied,
  unless you override the role by supplying a `role` attribute. `<b-tr>` does not add a `scope`.
- The `<b-tbody>` element supports rendering a Vue `<transition-group>` when either, or both, of the
  `tbody-transition-props` and `tbody-transition-handlers` props are used. See the
  [Table body transition support](#table-body-transition-support) section for more details.

## Accessibility

The `<b-table>` and `<b-table-lite>` components, when using specific features, will attempt to
provide the best accessibility markup possible.

When using `<b-table-simple>` with the helper table components, elements will have the appropriate
roles applied by default, of which you can optionally override. When using click handlers on the
`<b-table-simple>` helper components, you will need to apply appropriate `aria-*` attributes, and
set `tabindex="0"` to make the click actions accessible to screen reader and keyboard-only users.
You should also listen for `@keydown.enter.prevent` to handle users pressing <kbd>Enter</kbd> to
trigger your click on cells or rows (required for accessibility for keyboard-only users).

### Heading accessibility

When a column (field) is sortable (`<b-table>` only) or there is a `head-clicked` listener
registered (`<b-table>` and `<b-table-lite>`), the header (and footer) `<th>` cells will be placed
into the document tab sequence (via `tabindex="0"`) for accessibility by keyboard-only and screen
reader users, so that the user may trigger a click (by pressing <kbd>Enter</kbd> on the header
cells.

### Data row accessibility

When the table is in `selectable` mode (`<b-table>` only, and prop `no-select-on-click` is not set),
or if there is a `row-clicked` event listener registered (`<b-table>` and `<b-table-lite>`), all
data item rows (`<tr>` elements) will be placed into the document tab sequence (via `tabindex="0"`)
to allow keyboard-only and screen reader users the ability to click the rows by pressing
<kbd>Enter</kbd> or <kbd>Space</kbd>.

When the table items rows are placed in the document tab sequence (`<b-table>` and
`<b-table-lite>`), they will also support basic keyboard navigation when focused:

- <kbd>Down</kbd> will move to the next row
- <kbd>Up</kbd> will move to the previous row
- <kbd>End</kbd> or <kbd>Down</kbd>+<kbd>Shift</kbd> will move to the last row
- <kbd>Home</kbd> or <kbd>Up</kbd>+<kbd>Shift</kbd> will move to the first row
- <kbd>Enter</kbd> or <kbd>Space</kbd> to click the row.

### Row event accessibility

Note the following row based events/actions (available with `<b-table>` and `<b-table-lite>`) are
not considered accessible, and should only be used if the functionality is non critical or can be
provided via other means:

- `row-dblclicked`
- `row-contextmenu`
- `row-hovered`
- `row-unhovered`
- `row-middle-clicked`

Note that the `row-middle-clicked` event is not supported in all browsers (i.e. IE, Safari and most
mobile browsers). When listening for `row-middle-clicked` events originating on elements that do not
support input or navigation, you will often want to explicitly prevent other default actions mapped
to the down action of the middle mouse button. On Windows this is usually autoscroll, and on macOS
and Linux this is usually clipboard paste. This can be done by preventing the default behaviour of
the `mousedown` or `pointerdown` event.

Additionally, you may need to avoid opening a default system or browser context menu after a right
click. Due to timing differences between operating systems, this too is not a preventable default
behaviour of `row-middle-clicked`. Instead, this can be done by preventing the default behaviour of
the `row-contextmenu` event.

It is recommended you test your app in as many browser and device variants as possible to ensure
your app handles the various inconsistencies with events.

## Complete example

```html
<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="age">Age</b-form-checkbox>
            <b-form-checkbox value="isActive">Active</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
          { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
          {
            isActive: false,
            age: 9,
            name: { first: 'Mini', last: 'Navarro' },
            _rowVariant: 'success'
          },
          { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
          { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
          { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
          {
            isActive: true,
            age: 87,
            name: { first: 'Larsen', last: 'Shaw' },
            _cellVariants: { age: 'danger', isActive: 'warning' }
          },
          { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
          { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
          { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
        ],
        fields: [
          { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
          { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
          {
            key: 'isActive',
            label: 'Is Active',
            formatter: (value, key, item) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<!-- b-table-complete.vue -->
```

<!-- Component reference added automatically from component package.json -->
