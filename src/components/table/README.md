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
