# Tables

> For displaying tabular data. `<b-table>` supports pagination, filtering, sorting, custom
> rendering, events, and asynchronous data.

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
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
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
of data. See the [**Fields**](#fields-column-definitions-) section below for customizing how field
headings appear.

**Note:** Field order is not guaranteed. Fields will typically appear in the order they were defined
in the first row, but this may not always be the case depending on the version of browser in use.
See section [**Fields (column definitions)**](#fields-column-definitions-) below to see how to
guarantee the order of fields, and to override the headings generated.

Record data may also have additional special reserved name keys for colorizing rows and individual
cells (variants), and for triggering additional row detail. The supported optional item record
modifier properties (make sure your field keys do not conflict with these names):

| Property        | Type    | Description                                                                                                                                                                                                                                     |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_cellVariants` | Object  | Bootstrap contextual state applied to individual cells. Keyed by field (Supported values: `active`, `success`, `info`, `warning`, `danger`). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set). |
| `_rowVariant`   | String  | Bootstrap contextual state applied to the entire row (Supported values: `active`, `success`, `info`, `warning`, `danger`). These variants map to classes `table-${variant}` or `bg-${variant}` (when the `dark` prop is set)                    |
| `_showDetails`  | Boolean | Used to trigger the display of the `row-details` scoped slot. See section [Row details support](#row-details-support) below for additional information                                                                                          |

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
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            isActive: false,
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger'
          },
          {
            isActive: true,
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { isActive: 'success', age: 'info', first_name: 'warning' }
          },
          { isActive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
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

See the [**"Using Items Provider functions"**](#using-items-provider-functions) section below for
more details.

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
[**sorting**](#sorting) on the column, etc.

Fields can be provided as a _simple array_, an _array of objects_, or an _object_. **Internally the
fields data will be normalized into the _array of objects_ format**. Events or slots that include
the column `field` data will be in the normalized field object format (array of objects for
`fields`, or an object for an individual `field`).

### Fields as a simple array

Fields can be a simple array, for defining the order of the columns, and which columns to display.
**(field order is guaranteed)**:

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
formatting, etc). Only columns (keys) that appear in the fields array will be shown **(field order
is guaranteed)**:

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

### Fields as an object

Also, fields can be a an object providing similar control over the fields as the _array of objects_
above does. Only columns listed in the fields object will be shown. The order of the fields will
typically be in the order they were defined in the object, although **field order is not guaranteed
(this may cause issues with Server Side Rendering and client rehydration)**.

**Example: Using object fields definition**

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
        fields: {
          last_name: {
            label: 'Person last name',
            sortable: true
          },
          first_name: {
            label: 'Person first name',
            sortable: false
          },
          foo: {
            // This key overrides `foo`!
            key: 'age',
            label: 'Person age',
            sortable: true
          },
          city: {
            key: 'address.city',
            sortable: true
          },
          'address.country': {
            label: 'Country',
            sortable: true
          }
        },
        items: [
          {
            isActive: true,
            age: 40,
            first_name: 'Dickerson',
            last_name: 'Macdonald',
            address: { country: 'USA', city: 'New York' }
          },
          {
            isActive: false,
            age: 21,
            first_name: 'Larsen',
            last_name: 'Shaw',
            address: { country: 'Canada', city: 'Toronto' }
          },
          {
            isActive: false,
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            address: { country: 'Australia', city: 'Sydney' }
          },
          {
            isActive: true,
            age: 38,
            first_name: 'Jami',
            last_name: 'Carney',
            address: { country: 'England', city: 'London' }
          }
        ]
      }
    }
  }
</script>

<!-- b-table-fields-object.vue -->
```

**Notes:**

- if a `key` property is defined in the field definition, it will take precedence over the key used
  to define the field.

### Field definition reference

The following field properties are recognized:

| Property        | Type                        | Description                                                                                                                                                                                                                                                                                                           |
| --------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`           | String                      | The key for selecting data from the record in the items array. Required when setting the `fields` via an array of objects.                                                                                                                                                                                            |
| `label`         | String                      | Appears in the columns table header (and footer if `foot-clone` is set). Defaults to the field's key (in humanized format) if not provided. It's possible to use empty labels by assigning an empty string `""` but be sure you also set `headerTitle` to provide non-sighted users a hint about the column contents. |
| `headerTitle`   | String                      | Text to place on the fields header `<th>` attribute `title`. Defaults to no `title` attribute.                                                                                                                                                                                                                        |
| `headerAbbr`    | String                      | Text to place on the fields header `<th>` attribute `abbr`. Set this to the unabbreviated version of the label (or title) if label (or title) is an abbreviation. Defaults to no `abbr` attribute.                                                                                                                    |
| `class`         | String or Array             | Class name (or array of class names) to add to `<th>` **and** `<td>` in the column.                                                                                                                                                                                                                                   |
| `formatter`     | String or Function          | A formatter callback function, can be used instead of (or in conjunction with) slots for real table fields (i.e. fields, that have corresponding data at items array). Refer to [**Custom Data Rendering**](#custom-data-rendering) for more details.                                                                 |
| `sortable`      | Boolean                     | Enable sorting on this column. Refer to the [**Sorting**](#sorting) Section for more details.                                                                                                                                                                                                                         |
| `sortDirection` | String                      | Set the initial sort direction on this column when it becomes sorted. Refer to the [**Change initial sort direction**](#Change-initial-sort-direction) Section for more details.                                                                                                                                      |
| `tdClass`       | String or Array or Function | Class name (or array of class names) to add to `<tbody>` data `<td>` cells in the column. If custom classes per cell are required, a callback function can be specified instead.                                                                                                                                      |
| `thClass`       | String or Array             | Class name (or array of class names) to add to `<thead>`/`<tfoot>` heading `<th>` cell.                                                                                                                                                                                                                               |
| `thStyle`       | Object                      | JavaScript object representing CSS styles you would like to apply to the table `<thead>`/`<tfoot>` field `<th>`.                                                                                                                                                                                                      |
| `variant`       | String                      | Apply contextual class to all the `<th>` **and** `<td>` in the column - `active`, `success`, `info`, `warning`, `danger`. These variants map to classes `thead-${variant}` (in the header), `table-${variant}` (in the body), or `bg-${variant}` (when table prop `dark` is set).                                     |
| `tdAttr`        | Object or Function          | JavaScript object representing additional attributes to apply to the `<tbody>` field `<td>` cell. If custom attributes per cell are required, a callback function can be specified instead.                                                                                                                           |
| `isRowHeader`   | Boolean                     | When set to `true`, the field's item data cell will be rendered with `<th>` rather than the default of `<td>`.                                                                                                                                                                                                        |

**Notes:**

- _Field properties, if not present, default to `null` (falsey) unless otherwise stated above._
- _`class`, `thClass`, `tdClass` etc. will not work with classes that are defined in scoped CSS_
- _For information on the syntax supported by `thStyle`, see
  [Class and Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)
  in the Vue.js guide._
- _Any additional properties added to the field objects will be left intact - so you can access them
  via the named scoped slots for custom data, header, and footer rendering._

For information and usage about scoped slots and formatters, refer to the
[**Custom Data Rendering**](#custom-data-rendering) section below.

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

`<b-table>` provides an additional prop `primary-key`, which you can use to identify the field key
that _uniquely_ identifies the row.

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
item data changes or data is sorted/filtered/edited), setting the `primary-key` prop (if you have a
unique identifier per row) can alleviate these issues.

Specifying the `primary-key` column is handy if you are using 3rd party table transitions or drag
and drop plugins, as they rely on having a consistent and unique per row `:key` value.

If `primary-key` is not provided, `<b-table>` will auto-generate keys based on the displayed row's
index number (i.e. position in the _displayed_ table rows). This may cause GUI issues such as sub
components/elements that are rendering with previous results (i.e. being re-used by Vue's render
patch optimization routines). Specifying a `primary-key` column can alleviate this issue (or you can
place a unique `:key` on your element/components in your custom formatted field slots).

## Table style options

### Table Styling

`<b-table>` provides several props to alter the style of the table:

| prop                | Type              | Description                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `striped`           | Boolean           | Add zebra-striping to the table rows within the `<tbody>`                                                                                                                                                                                                                                                                                          |
| `bordered`          | Boolean           | For borders on all sides of the table and cells.                                                                                                                                                                                                                                                                                                   |
| `borderless`        | Boolean           | removes inner borders from table.                                                                                                                                                                                                                                                                                                                  |
| `outlined`          | Boolean           | For a thin border on all sides of the table. Has no effect if `bordered` is set.                                                                                                                                                                                                                                                                   |
| `small`             | Boolean           | To make tables more compact by cutting cell padding in half.                                                                                                                                                                                                                                                                                       |
| `hover`             | Boolean           | To enable a hover highlighting state on table rows within a `<tbody>`                                                                                                                                                                                                                                                                              |
| `dark`              | Boolean           | Invert the colors — with light text on dark backgrounds (equivalent to Bootstrap V4 class `.table-dark`)                                                                                                                                                                                                                                           |
| `fixed`             | Boolean           | Generate a table with equal fixed-width columns (`table-layout: fixed;`)                                                                                                                                                                                                                                                                           |
| `foot-clone`        | Boolean           | Turns on the table footer, and defaults with the same contents a the table header                                                                                                                                                                                                                                                                  |
| `no-footer-sorting` | Boolean           | When `foot-clone` is true and the table is sortable, disables the sorting icons and click behaviour on the footer heading cells. Refer to the [**Sorting**](#sorting) section below for more details.                                                                                                                                              |
| `responsive`        | Boolean or String | Generate a responsive table to make it scroll horizontally. Set to `true` for an always responsive table, or set it to one of the breakpoints `'sm'`, `'md'`, `'lg'`, or `'xl'` to make the table responsive (horizontally scroll) only on screens smaller than the breakpoint. See [**Responsive tables**](#responsive-tables) below for details. |
| `stacked`           | Boolean or String | Generate a responsive stacked table. Set to `true` for an always stacked table, or set it to one of the breakpoints `'sm'`, `'md'`, `'lg'`, or `'xl'` to make the table visually stacked only on screens smaller than the breakpoint. See [**Stacked tables**](#stacked-tables) below for details.                                                 |
| `head-variant`      | String            | Use `'light'` or `'dark'` to make table header appear light or dark gray, respectively                                                                                                                                                                                                                                                             |
| `foot-variant`      | String            | Use `'light'` or `'dark'` to make table footer appear light or dark gray, respectively. If not set, `head-variant` will be used. Has no effect if `foot-clone` is not set                                                                                                                                                                          |

**Example: Basic table styles**

```html
<template>
  <div>
    <b-form-group label="Table Options">
      <b-form-checkbox v-model="striped" inline>Striped</b-form-checkbox>
      <b-form-checkbox v-model="bordered" inline>Bordered</b-form-checkbox>
      <b-form-checkbox v-model="borderless" inline>Borderless</b-form-checkbox>
      <b-form-checkbox v-model="outlined" inline>Outlined</b-form-checkbox>
      <b-form-checkbox v-model="small" inline>Small</b-form-checkbox>
      <b-form-checkbox v-model="hover" inline>Hover</b-form-checkbox>
      <b-form-checkbox v-model="dark" inline>Dark</b-form-checkbox>
      <b-form-checkbox v-model="fixed" inline>Fixed</b-form-checkbox>
      <b-form-checkbox v-model="footClone" inline>Foot Clone</b-form-checkbox>
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
      :items="items"
      :fields="fields"
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
        striped: false,
        bordered: false,
        borderless: false,
        outlined: false,
        small: false,
        hover: false,
        dark: false,
        fixed: false,
        footClone: false
      }
    }
  }
</script>

<!-- b-table-bordered.vue -->
```

### Row Styling

You can also style every row using the `tbody-tr-class` prop

| Property       | Type                      | Description                                                                                                                                                                    |
| -------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tbodyTrClass` | String, Array or Function | Classes to be applied to every row on the table. If a function is given, it will be called as `tbodyTrClass( item, type )` and it may return an `Array`, `Object` or `String`. |

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
        if (!item) return
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
            'heading 1': 'table cell',
            'heading 2': 'table cell',
            'heading 3': 'table cell',
            'heading 4': 'table cell',
            'heading 5': 'table cell',
            'heading 6': 'table cell',
            'heading 7': 'table cell',
            'heading 8': 'table cell',
            'heading 9': 'table cell',
            'heading 10': 'table cell'
          },
          {
            'heading 1': 'table cell',
            'heading 2': 'table cell',
            'heading 3': 'table cell',
            'heading 4': 'table cell',
            'heading 5': 'table cell',
            'heading 6': 'table cell',
            'heading 7': 'table cell',
            'heading 8': 'table cell',
            'heading 9': 'table cell',
            'heading 10': 'table cell'
          },
          {
            'heading 1': 'table cell',
            'heading 2': 'table cell',
            'heading 3': 'table cell',
            'heading 4': 'table cell',
            'heading 5': 'table cell',
            'heading 6': 'table cell',
            'heading 7': 'table cell',
            'heading 8': 'table cell',
            'heading 9': 'table cell',
            'heading 10': 'table cell'
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

### Stacked tables

An alternative to responsive tables, BootstrapVue includes the stacked table option (using custom
SCSS/CSS), which allow tables to be rendered in a visually stacked format. Make any table stacked
across _all viewports_ by setting the prop `stacked` to `true`. Or, alternatively, set a breakpoint
at which the table will return to normal table format by setting the prop `stacked` to one of the
breakpoint values `'sm'`, `'md'`, `'lg'`, or `'xl'`.

Column header labels will be rendered to the left of each field value using a CSS `::before` pseudo
element, with a width of 40%.

The prop `stacked` takes precedence over the `responsive` prop.

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
  [**Sorting**](#sorting) section below for sorting control information, as well as the
  [**complete example**](#complete-example) at the bottom of this page for an example of controlling
  sorting via the use of form controls.
- The slots `top-row` and `bottom-row` will be hidden when visually stacked.
- The table caption, if provided, will always appear at the top of the table when visually stacked.
- In an always stacked table, the table header and footer, and the fixed top and bottom row slots
  will not be rendered.

### Table busy state

`<b-table>` provides a `busy` prop that will flag the table as busy, which you can set to `true`
just before you update your items, and then set it to `false` once you have your items. When in the
busy state, the table will have the attribute `aria-busy="true"`.

During the busy state, the table will be rendered in a "muted" look (`opacity: 0.6`), using the
following custom CSS:

```css
/* Busy table styling */
table.b-table[aria-busy='false'] {
  opacity: 1;
}
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
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
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

Also see the [**Using Items Provider Functions**](#using-items-provider-functions) below for
additional information on the `busy` state.

**Note:** All click related and hover events, and sort-changed events will **not** be emitted when
the table is in the `busy` state.

### Table caption

Add an optional caption to your table via the prop `caption` or the named slot `table-caption` (the
slot takes precedence over the prop). The default Bootstrap V4 styling places the caption at the
bottom of the table:

```html
<template>
  <div>
    <b-table :items="items" :fields="fields">
      <template slot="table-caption">This is a table caption.</template>
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
      <template slot="table-caption">This is a table caption at the top.</template>
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

| Property  | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| `columns` | Number | The number of columns in the rendered table                                   |
| `fields`  | Array  | Array of field definition objects (normalized to the array of objects format) |

## Custom Data Rendering

Custom rendering for each data field in a row is possible using either
[scoped slots](http://vuejs.org/v2/guide/components.html#Scoped-Slots) or formatter callback
function.

### Scoped Field Slots

Scoped slots give you greater control over how the record data appears. If you want to add an extra
field which does not exist in the records, just add it to the `fields` array, And then reference the
field(s) in the scoped slot(s).

**Example: Custom data rendering with scoped slots**

```html
<template>
  <div>
    <b-table :fields="fields" :items="items">
      <!-- A virtual column -->
      <template slot="index" slot-scope="data">
        {{ data.index + 1 }}
      </template>

      <!-- A custom formatted column -->
      <template slot="name" slot-scope="data">
        {{ data.value.first }} {{ data.value.last }}
      </template>

      <!-- A virtual composite column -->
      <template slot="nameage" slot-scope="data">
        {{ data.item.name.first }} is {{ data.item.age }} years old
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

| Property         | Type     | Description                                                                                                                                                                                             |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index`          | Number   | The row number (indexed from zero) relative to the displayed rows                                                                                                                                       |
| `item`           | Object   | The entire raw record data (i.e. `items[index]`) for this row (before any formatter is applied)                                                                                                         |
| `value`          | Any      | The value for this key in the record (`null` or `undefined` if a virtual column), or the output of the field's `formatter` function (see below for information on field `formatter` callback functions) |
| `unformatted`    | Any      | The raw value for this key in the item record (`null` or `undefined` if a virtual column), before being passed to the field's `formatter` function                                                      |
| `detailsShowing` | Boolean  | Will be `true` if the row's `row-details` scoped slot is visible. See section [**Row details support**](#row-details-support) below for additional information                                          |
| `toggleDetails`  | Function | Can be called to toggle the visibility of the rows `row-details` scoped slot. See section [**Row details support**](#row-details-support) below for additional information                              |
| `rowSelected`    | Boolean  | Will be `true` if the row has been selected. See section [**Row select support**](#row-select-support) for additional information                                                                       |

**Notes:**

- _`index` will not always be the actual row's index number, as it is computed after filtering,
  sorting and pagination have been applied to the original table data. The `index` value will refer
  to the **displayed row number**. This number will align with the indexes from the optional
  `v-model` bound variable._

#### Displaying raw HTML

By default `b-table` escapes HTML tags in items data and results of formatter functions, if you need
to display raw HTML code in `b-table`, you should use `v-html` directive on an element in a in
scoped field slot

```html
<template>
  <div>
    <b-table :items="items">
      <span slot="html" slot-scope="data" v-html="data.value"></span>
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
  <string>Warning:</strong> Be cautious of using the <code>v-html</code> method to display user
  supplied content,  as it may make your application vulnerable to
  <a class="alert-link" href="https://en.wikipedia.org/wiki/Cross-site_scripting">
  <abbr title="Cross Site Scripting Attacks">XSS attacks</abbr></a>, if you do not first
  <a class="alert-link" href="https://en.wikipedia.org/wiki/HTML_sanitization">sanitize</a> the
  user supplied string.
</div>

### Formatter callback

One more option to customize field output is to use formatter callback function. To enable this
field's property `formatter` is used. Value of this property may be String or function reference. In
case of a String value, the function must be defined at the parent component's methods. Providing
formatter as a `Function`, it must be declared at global scope (window or as global mixin at Vue),
unless it has been bound to a `this` context.

The callback function accepts three arguments - `value`, `key`, and `item`, and should return the
formatted value as a string (HTML strings are not supported)

**Example: Custom data rendering with formatter callback function**

```html
<template>
  <div>
    <b-table :fields="fields" :items="items">
      <template slot="name" slot-scope="data">
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

## Custom empty/emptyfiltered rendering via slots

Aside from using `empty-text`, `empty-filtered-text`, `empty-html`, and `empty-filtered-html`, it is
also possible to provide custom rendering for tables that have no data to display using named slots.

In order for these slots to be shown, the `show-empty` attribute must be set and `items` must be
either falsy or an array of length 0.

```html
<div>
  <b-table :fields="fields" :items="items" show-empty>
    <template slot="empty" slot-scope="scope">
      <h4>{{ scope.emptyText }}</h4>
    </template>
    <template slot="emptyfiltered" slot-scope="scope">
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

## Header/Footer custom rendering via scoped slots

It is also possible to provide custom rendering for the tables `thead` and `tfoot` elements. Note by
default the table footer is not rendered unless `foot-clone` is set to `true`.

Scoped slots for the header and footer cells uses a special naming convention of `HEAD_<fieldkey>`
and `FOOT_<fieldkey>` respectively. if a `FOOT_` slot for a field is not provided, but a `HEAD_`
slot is provided, then the footer will use the `HEAD_` slot content.

```html
<div>
  <b-table :fields="fields" :items="items" foot-clone>
    <!-- A custom formatted data column cell -->
    <template slot="name" slot-scope="data">
      {{ data.value.first }} {{ data.value.last }}
    </template>

    <!-- A custom formatted header cell for field 'name' -->
    <template slot="HEAD_name" slot-scope="data">
      <em>{{ data.label }}</em>
    </template>

    <!-- A custom formatted footer cell  for field 'name' -->
    <template slot="FOOT_name" slot-scope="data">
      <strong>{{ data.label }}</strong>
    </template>
  </b-table>
</div>
```

The slots can be optionally scoped (`data` in the above example), and will have the following
properties:

| Property | Type   | Description                                                   |
| -------- | ------ | ------------------------------------------------------------- |
| `column` | String | The fields's `key` value                                      |
| `field`  | Object | the field's object (from the `fields` prop)                   |
| `label`  | String | The fields label value (also available as `data.field.label`) |

When placing inputs, buttons, selects or links within a `HEAD_` or `FOOT_` slot, note that
`head-clicked` event will not be emitted when the input, select, textarea is clicked (unless they
are disabled). `head-clicked` will never be emitted when clicking on links or buttons inside the
scoped slots (even when disabled)

### Adding additional rows to the header

If you wish to add additional rows to the header you may do so via the `thead-top` slot. This slot
is inserted before the header cells row, and is not encapsulated by `<tr>..</tr>` tags.

```html
<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
    >
      <template slot="thead-top" slot-scope="data">
        <tr>
          <th colspan="2">&nbsp;</th>
          <th>Type 1</th>
          <th colspan="3">Type 2</th>
          <th>Type 3</th>
        </tr>
      </template>
    </b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { name: "Stephen Hawking", id: 1, type1: false, type2a: true, type2b: false, type2c: false, type3: false },
          { name: "Johnny Appleseed", id: 2, type1: false, type2a: true, type2b: true, type2c: false, type3: false },
          { name: "George Washington", id: 3, type1: false, type2a: false, type2b: false, type2c: false, type3: true },
          { name: "Albert Einstein", id: 4, type1: true, type2a: false, type2b: false, type2c: true, type3: false },
          { name: "Isaac Newton", id: 5, type1: true, type2a: true, type2b: false, type2c: true, type3: false },
        ],
        fields: [
          "name",
          { key: "id", label: "ID" },
          { key: "type1", label: "Type 1" },
          { key: "type2a", label: "Type 2A" },
          { key: "type2b", label: "Type 2B" },
          { key: "type2c", label: "Type 2C" },
          { key: "type3", label: "Type 3" }
        ]
      }
    }
  }
</script>

<!-- b-table-thead-top-slot.vue -->
```

Slot `thead-top` can be optionally scoped, receiving an object with the following properties:

| Property  | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| `columns` | Number | The number of columns in the rendered table                                   |
| `fields`  | Array  | Array of field definition objects (normalized to the array of objects format) |

## Row select support

You can make rows selectable, by using the prop `selectable`.

Users can easily change the selecting mode by setting the `select-mode` prop.

- `multi`: each click will select/deselect the row (default mode)
- `single`: only a single row can be selected at one time
- `range`: any row clicked is selected, any other deselected. the SHIFT key selects a range of rows,
  and CTRL/CMD click will toggle the selected row.

When a table is `selectable` and the user clicks on a row, `<b-table>` will emit the `row-selected`
event, passing a single argument which is the complete list of selected items. **Treat this argument
as read-only.**

```html
<template>
  <div>
    <b-form-group label="Selection mode:" label-cols-md="4">
      <b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
    </b-form-group>

    <b-table
      selectable
      :select-mode="selectMode"
      selectedVariant="success"
      :items="items"
      @row-selected="rowSelected"
    ></b-table>

    {{ selected }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modes: ['multi', 'single', 'range'],
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
      rowSelected(items) {
        this.selected = items
      }
    }
  }
</script>

<!-- b-table-selectable.vue -->
```

When table is selectable, it will have class `b-table-selectable`, and one of the following three
classes (depending on which mode is in use), on the `<table>` element:

- `b-table-select-single`
- `b-table-select-multi`
- `b-table-select-range`

When at least one row is selected the class `b-table-selecting` will be active on the `<table>`
element.

**Notes:**

- _Paging, filtering, or sorting will clear the selection. The `row-selected` event will be emitted
  with an empty array if needed._
- _Selected rows will have a class of `b-row-selected` added to them._
- _When the table is in `selectable` mode, all data item `<tr>` elements will be in the document tab
  sequence (`tabindex="0"`) for accessibility reasons._

## Row details support

If you would optionally like to display additional record information (such as columns not specified
in the fields definition array), you can use the scoped slot `row-details`, in combination with the
special item record Boolean property `_showDetails`.

If the record has it's `_showDetails` property set to `true`, **and** a `row-details` scoped slot
exists, a new row will be shown just below the item, with the rendered contents of the `row-details`
scoped slot.

In the scoped field slot, you can toggle the visibility of the row's `row-details` scoped slot by
calling the `toggleDetails` function passed to the field's scoped slot variable. You can use the
scoped fields slot variable `detailsShowing` to determine the visibility of the `row-details` slot.

**Note:** If manipulating the `_showDetails` property directly on the item data (i.e. not via the
`toggleDetails` function reference), the `_showDetails` properly **must** exist in the items data
for proper reactive detection of changes to it's value. Read more about
[Vue's reactivity limitations](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats).

**Available `row-details` scoped variable properties:**

| Property        | Type     | Description                                                               |
| --------------- | -------- | ------------------------------------------------------------------------- |
| `item`          | Object   | The entire row record data object                                         |
| `index`         | Number   | The current visible row number                                            |
| `fields`        | Array    | The normalized fields definition array (in the _array of objects_ format) |
| `toggleDetails` | Function | Function to toggle visibility of the row's details slot                   |

In the following example, we show two methods of toggling the visibility of the details: one via a
button, and one via a checkbox. We also have the third row details defaulting to have details
initially showing.

```html
<template>
  <div>
    <b-table :items="items" :fields="fields" striped>
      <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
          Details via check
        </b-form-checkbox>
      </template>

      <template slot="row-details" slot-scope="row">
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
