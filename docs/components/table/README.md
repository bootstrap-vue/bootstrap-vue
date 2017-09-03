# Tables

> For displaying tabular data. `<b-table>` supports pagination, filtering, sorting,
custom rendering, events, and asynchronous data.

#### **Contents** 
- [**Items (record data)**](#items-record-data-)
- [**Fields (column definitions)**](#fields-column-definitions-)
- [**Custom Data Rendering**](#custom-data-rendering)
- [**Header/Footer custom rendering via scoped slots**](#header-footer-custom-rendering-via-scoped-slots)
- [**v-model binding**](#-v-model-binding)
- [**Filtering**](#filtering)
- [**Sorting**](#sorting)
- [**Using Items Provider Functions**](#using-items-provider-functions)
- [**Server Side Rendering**](#server-side-rendering)
- [**Complete Example**](#complete-example)
- [**Table options**](#table-options)

**Example 1: Basic usage**
```html
<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
const items = [
  { isActive: true,  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true,  age: 38, first_name: 'Jami', last_name: 'Carney' },
  { isActive: false, age: 27, first_name: 'Essie', last_name: 'Dunlap' },
  { isActive: true,  age: 40, first_name: 'Thor', last_name: 'Macdonald' },
  { isActive: false, age: 26, first_name: 'Mitzi', last_name: 'Navarro' },
  { isActive: false, age: 22, first_name: 'Genevive', last_name: 'Wilson' },
  { isActive: true,  age: 38, first_name: 'John', last_name: 'Carney' },
  { isActive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
];

export default {
  data: {
    items: items
  }
}
</script>

<!-- table-basic-1.vue -->
```

## Items (record data)
`items` is the table data in array format, where each record (row) data are
keyed objects. Example format:

```js
[
    { age: 32, first_name: 'Cyndi' },
    { age: 27, first_name: 'Havij' },
    { age: 42, first_name: 'Robert' }
]
```
`<b-table>` automatically samples the first row to extract field names (they keys in the
record data). Field names are automatically "humanized" by converting `kebab-case`, `snake_case`, 
and `camelCase` to individual words and capitalizes each word. Example conversions:

 - `first_name` becomes `First Name`
 - `last-name` becomes `Last Name`
 - `age` becoms `Age`
 - `YEAR` becomes `Year`
 - `isActive` becomes `Is Active`

These titles wil be displayed in the table header, in the order they appear in the
**first** record of data.  See the [**Fields**](#fields-column-definitions-) section below for cusomizing how field
headings appear.

Record data may also have additional special reserved name keys for colorizing
rows and individual cells (variants). Supported optional item record modifier properties
(make sure your field keys do not conflict with these names):

| Property | Type | Description
| ---------| ---- | -----------
| `_cellVariants` | Object | Bootstrap contextual state applied to individual cells. Keyed by field (Supported values: `active`, `success`, `info`, `warning`, `danger`)
| `_rowVariant` | String | Bootstrap contextual state applied to row (Supported values: `active`, `success`, `info`, `warning`, `danger`)

**Example 2: Using variants for table cells**
```html
<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
const items = [
  { isActive: true,  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  {
    isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson',
    _rowVariant: 'danger'
  },
  { 
    isActive: true,  age: 40, first_name: 'Thor', last_name: 'Macdonald',
    _cellVariants: { isActive: 'success', age: 'info', first_name: 'warning' }
  },
  { isAactive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
];

export default {
  data: {
    items: items
  }
}
</script>

<!-- table-variants-1.vue -->
```

`items` can also be a reference to a *provider* function, which returns an `Array` of items data.
Provider functions can also be asynchronous:
- By returning `null` (or `undefined`) and calling a callback, when the data is
ready, with the data array as the only argument to the callback,
- By returning a `Promise` that resolves to an array.

See the [**"Using Items Provider functions"**](#using-items-provider-functions) section below for more details.

## Fields (column definitions)
The `fields` prop is used to customize the table columns headings,
and in which order the columns of data are displayed. The field object keys
(i.e. `age` or `first_name` as shown below) are used to extract the value from
each item (record) row, and to provide additional fetures such as sorting

### Fields as a simple array
Fields can be a simple array, for defining the order of the columns, and
which columns to display:

**Example 3: Using `array` fields definition**
```html
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  data: {
    // Note 'isActive' is left out and will not appear in the rendered table
    fields: [ 'first_name', 'last_name', 'age' ],
    items: [
      { isActive: true,  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true,  age: 38, first_name: 'Jami', last_name: 'Carney' },
      { isActive: false, age: 27, first_name: 'Essie', last_name: 'Dunlap' }
    ]
  }
};
</script>

<!-- table-fields-1.vue -->
```

### Fields as an object
Also fields can be a an object providing additional control over the fields (such
as sorting, formatting, etc). Only columns listed in the fields object will be shown,
and will be shown in the order defined in the object:

**Example 4: Using `object` fields definition**
```html
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  data: {
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
      age: {
          label: 'Person age',
          sortable: true,
          // Variant applies to teh whole column, including the header and footer
          variant: 'danger'
      }
    },
    items: [
      { isActive: true,  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true,  age: 38, first_name: 'Jami', last_name: 'Carney' },
      { isAactive: false, age: 29, first_name: 'Dick', last_name: 'Dunlap' }
    ]
  }
};
</script>

<!-- table-fields-2.vue -->
```

When fields is provided as an object, the following field properties are available:

| Property | Type | Description
| ---------| ---- | -----------
| `class` | String or Array | Class name (or array of class names) to add to `<th>` **and** `<td>` in the column
| `formatter` | String or Function | A formatter callback function, can be used instead of slots for real table fields (i.e. fields, that have corresponding data at items array).
| `label` | String | Appears in the columns table header (and footer if `foot-clone` is set). Defaults to the field's key
| `sortable` | Boolean | Enable sorting on this column
| `tdClass` | String or Array | Class name (or array of class names) to add to data `<td>` cells in the column
| `thClass` | String or Array | Class name (or array of class names) to add to header/footer `<th>` cell
| `thStyle` | Object | JavaScript object representing CSS styles you would like to apply to the table field `<th>`
| `variant` | String | Apply contextual class to the `<th>` **and** `<td>` in the column (`active`, `success`, `info`, `warning`, `danger`)

>**Notes:**
 >- _Field properties, if not present, default to `null` unless otherwise stated above._
 >- _`thClass` and `tdClass` will not work with classes that are defined in scoped CSS_
 >- _For information on the syntax supported by `thStyle`, see
[Class and Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles)
in the Vue.js guide._
 >- _Any additional properties added to the field objects will be left intact - so you can access
them via the named scoped slots for custom data, header, and footer rendering._

For information and usage about scoped slots and formatters, refer to
the [**Custom Data Rendering**](#custom-data-rendering) section below.

## Custom Data Rendering
Custom rendering for each data field in a row is possible using either 
[scoped slots](http://vuejs.org/v2/guide/components.html#Scoped-Slots) or formatter callback function.

### Scoped Field Slots
Scoped slots give you greater control over how the record data apepars.
If you want to add an extra field which does not exist in the records,
just add it to the `fields` array, And then reference the field(s) in the scoped
slot(s).  

**Example 5: Custom data rendering with `slots`**
```html
<template>
  <div>
  <b-table :fields="fields" :items="items">
    <!-- A virtual column -->
    <template slot="index" scope="data">
      {{data.index + 1}}
    </template>
    <!-- A custom formatted column -->
    <template slot="name" scope="data">
      {{data.value.first}} {{data.value.last}}
    </template>
    <!-- A virtual composite column -->
    <template slot="nameage" scope="data">
      {{data.item.name.first}} is {{data.item.age}} years old
    </template>
  </b-table>
  </div>
</template>

<script>
export default {
  data: {
    fields: {
      index: {
        // A virtual column that doesn't exist in items
        label: 'Index'
      },
      name: {
        // A column that needs custom formatting
        label: 'Full Name'
      },
      age: {
        // A regular column
        label: 'Sex'
      },
      sex: {
        // A regular column
        label: 'Sex'
      },
      nameage: {
        // A virtual column made up from two fields
        label: 'First name and age'
      }
    },
    items: [
      { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
      { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
      { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
      { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
    ]
  }
}
</script>

<!-- table-data-slots.vue -->
```

The slot's scope variable (`data` in the above sample) will have the following properties:

| Property | Type | Description
| -------- | ---- | -----------
| `index` | Number | The row number (indexed from zero)
| `item` | Object | The entire record (i.e. `items[index]`) for this row (deep clone)
| `value` | Any | The value for this key in the record (`null` or `undefined` if a virtual column)


>**Note:** *`index` will not always be the actual row's index number, as it is
computed after pagination and filtering have been applied to the original
table data. The `index` value will refer to the **displayed row number**. This
number will align with the indexes from the optional `v-model` bound variable.*

`<b-table>` always deep clones the items array data before pagination, sorting,
filtering and display. Hence any changes made to the item data passed to
the custom rendered slot will **not** affect the original provided items array.

When placing inputs, buttons, selects or links within a data cell scoped slot,
be sure to add a `@click.stop` handler (which can be empty) to prevent the
click on the input, button, select, or link, from triggering the `row-clicked`
event:

```html
<template slot="actions" scope="cell">
  <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
  <b-btn size="sm" @click.stop="details(cell.item,cell.index,$event.target)">Details</b-btn>
</template>
```

### Formatter callback

One more option to customize field output is to use formatter callback function.
To enable this field's property `formatter` is used. Value of this property may be 
String or function reference. In case of String value, function must be defined at parent component's methods, 
to provide formatter as `Function`, it must be declared at global scope (window or as global mixin at Vue). 

Callback function accepts three arguments - `value`, `key`, `row`.

**Example 6: Custom data rendering with formatter callback function**
```html
<template>
  <div>
  <b-table :fields="fields" :items="items">
<template slot="name" scope="data">
      <a :href="data.index+1">{{data.item.name}}</a>
    </template>

  </b-table>
  </div>
</template>

<script>
export default {
  data: {
    fields: {
      name: {
        // A column that needs custom formatting
        label: 'Full Name',
        formatter:'fullName'
      },
      age: {
        // A regular column
        label: 'Sex'
      },
      sex: {
        // A regular column
        label: 'Sex'
      },
    },
    items: [
      { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
      { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
      { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
      { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
    ]
  }, 
  methods: {
      fullName(value){
          return `${value.first} ${value.last}`
      }
  }
}
</script>

<!-- table-data-formatter.vue -->
```
## Header/Footer custom rendering via scoped slots
It is also possible to provide custom rendering for the tables `thead` and
`tfoot` elements. Note by default the table footer is not rendered unless
`foot-clone` is set to `true`.

Scoped slots for the header and footer cells uses a special naming
convetion of `HEAD_<fieldkey>` and `FOOT_<fieldkey>` respectivly. if a `FOOT_`
slot for a field is not provided, but a `HEAD_` slot is provided, then
the footer will use the `HEAD_` slot content.

```html
<b-table :fields="fields" :items="items"  foot-clone>
  <template slot="name" scope="data">
    <!-- A custom formatted data column cell -->
    {{data.value.first}} {{data.value.last}}
  </template>
  <template slot="HEAD_name" scope="data">
    <!-- A custom formatted header cell for field 'name' -->
    <em>{{data.label}}</em>
  </template>
  <template slot="FOOT_name" scope="data">
    <!-- A custom formatted footer cell  for field 'name' -->
    <strong>{{data.label}}</strong>
  </template>
</b-table>
```

The slot's scope variable (`data` in the above example) will have the following properties:

| Property | Type | Description
| -------- | ---- | -----------
| `column` | String | The fields's `key` value
| `field` | Object | the field's object (from the `fields` prop)
| `label` | String | The fileds label value (also available as `data.field.label`)

When placing inputs, buttons, selects or links within a `HEAD_` or `FOOT_` slot,
be sure to add a `@click.stop` handler (which can be empty) to prevent the
click on the input, button, select, or link, from triggering a change in sorting,
or a `head-clicked` event.

```html
<template slot="HEAD_actions" scope="foo">
  <!-- We use click.stop here to prevent 'sort-changed' or 'head-clicked' events -->
  <input tyep="checkbox" :value="foo.column" v-model="selected" @click.stop>
</template>
```


## `v-model` binding
If you bind a variable to the `v-model` prop, the contents of this variable will
be the currently disaplyed item records (zero based index, up to `page-size` - 1).
This variable (the `value` prop) should usually be treated as readonly.

The records within the v-model are a filtered/paginated shallow copy of `items`, and
hence any changes to a record's properties in the v-model will be reflected in
the original `items` array (except when `items` is set to a provider function).
Deleting a record from the v-model will **not** remove the record from the
original items array.

>**Note:** *Do not bind any value directly to the `value` prop. Use the `v-model` binding.*

## Filtering
Filtering, when used, is aplied to the original items array data, and hence it is not
possible to filter data based on custom rendering of virtual columns. The items row data
is stringified and the filter searches that stringified data (excluding any properties
that begin with an underscore (`_`) and the deprecated property `state`.

The `filter` can be a string, a `RegExp` or a `function` reference.  If a function
is provided, the first argument is the original item record data object. The
function should return `true` if the record matches your criteria or `false` if
the record is to be filtered out.

When local filtering is applied, and the resultant number of items change, `<b-table>`
will emit the `filtered` event, passing a single argument which is the complete list of
items passing the filter routine. Treat this argument as read-only.

## Sorting
As mentioned above in the [**Fields**](#fields-column-definitions-) section above, you can make columns sortable. Clciking on
sortable a column header will sort the column in ascending direction, while clicking
on it again will switch the direction or sorting.  Clicking on a non-sortable column
will clear the sorting.

You can control which column is pre-sorted and the order of sorting (ascending or
descending). To pre-specify the column to be sorted, set the `sort-by` prop to 
the field's key.  Set the sort direction by setting `sort-desc` to either `true`
(for descending) or `false` (for ascending, the default).

The props `sort-by` and `sort-desc` can be turned into _two-way_ props by adding the `.sync`
modifier. Your bound variables will then be updated accordingly based on the current sort critera.
See the [Vue docs](http://vuejs.org/v2/guide/components.html#sync-Modifier) for details
on the `.sync` prop modifier

### Sort-Compare routine
The built-in default `sort-compare` function sorts the specified field `key` based
on the data in the underlying record object. The field value is first stringified
if it is an object, and then sorted.

The default `sort-compare` routine **cannot** sort virtual columns, nor sort based
on the custom rendering of the field data (which is used only for presentation).
For this reason, you can provide your own custom sort compare routine by passing a
function reference to the prop `sort-compare`.

The `sort-compare` routine is passed three arguments. The first two arguments
(`a` and `b`) are the record objects for the rows being compared, and the third
argument is the field `key` being sorted on. The routine should return
either `-1`, `0`, or `1` based on the result of the comparing of the two records.

The default sort-compare routine works as follows:

```js
if (typeof a[key] === 'number' && typeof b[key] === 'number') {
    // If both compared fields are native numbers
    return a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0);
} else {
    // Stringify the field data and use String.localeCompare
    return toString(a[key]).localeCompare(toString(b[key]), undefined, {
        numeric: true
    });
}
```
## Using Items Provider Functions
As mentioned under the [**Items**](#items-record-data-) prop section, it is possible to use a function to provide
the row data (items), by specifying a function reference via the `items` prop.

The provider function is called with the following signature:

```js
    provider(ctx, [callback])
```

The `ctx` is the context object associated with the table state, and contains the
following five properties:

| Property | Type | Description
| -------- | ---- | -----------
| `currentPage` | Number | The current page number (starting from 1, the value of the `current-page` prop)
| `perPage` | Number | The maximum number of rows per page to display (the value of the `per-page` prop)
| `filter` | String or RegExp or Function | the value of the `Filter` prop
| `sortBy` | String | The current column key being sorted, or `null` if not sorting
| `sortDesc` | Boolean | The current sort direction (`true` for descending, `false` for ascending)

The second argument `callback` is an optional parameter for when using the callback asynchronous method.

**Example 7: returning an array of data (synchronous):**
```js
function myProvider(ctx) {
    let items = [];

    // perform any items processing needed

    // Must return an array
    return items || [];
}
```

**Example 8: Using callback to return data (asynchronous):**
```js
function myProvider(ctx, callback) {
    let params = '?page=' + ctx.currentPage + '&size=' + ctx.perPage;

    this.fetchData('/some/url' + params).then((data) => {
        // Pluck the array of items off our axios response
        let items = data.items;
        // Provide the array of items to the callabck
        callback(items);
    }).catch(error => {
        callback([])
    });

    // Must return null or undefined to signal b-table that callback is being used
    return null;
}
```

**Example 9: Using a Promise to return data (asynchronous):**
```js
function myProvider(ctx) {
    let promise = axios.get('/some/url?page=' + ctx.currentPage + '&size=' + ctx.perPage);

    // Must return a promise that resolves to an array of items
    return promise.then((data) => {
        // Pluck the array of items off our axios response
        let items = data.items;
        // Must return an array of items or an empty array if an error occurred
        return(items || []);
    });
}
```

`<b-table>` automatically tracks/controls it's `busy` state, however it provides
a `busy` prop that can be used either to override inner `busy`state, or to monitor
`<b-table>`'s current busy state in your application using the 2-way `.sync` modifier.

>**Note:** _in order to allow `<b-table>` fully track it's `busy` state, custom items
provider function should handle errors from data sources and return an empty
array to `<b-table>`._

`<b-table>` provides a `busy` prop that will flag the table as busy, which you can
set to `true` just before your async fetch, and then set it to `false` once you have
your data, and just before you send it to the table for display. Example:

```html
<b-table id="my-table" :busy.sync="isBusy" :items="myProvider" :fields="fields" ....>
</b-table>
```
```js
data () {
    return {
        isBusy = false
    };
}
methods: {
    myProvider(ctx) {
        // Here we don't set isBusy prop, so busy state will be handled by table itself
        // this.isBusy = true;
        let promise = axios.get('/some/url');

        return promise.then((data) => {
            const items = data.items;
            // Here we could override the busy state, setting isBusy to false
            // this.isBusy = false;
            return(items);
        }).catch(error => {
            // Here we could override the busy state, setting isBusy to false
            // this.isBusy = false;
            // Returning an empty array, allows table to correctly handle busy state in case of error
            return [];
        });
    }
 }
```

>**Notes:**
>- _If you manually place the table in the `busy` state, the items provider will
__not__ be called/refreshed until the `busy` state has been set to `false`._
>- _All click related and hover events, and sort-changed events will __not__ be
 emiited when in the `busy` state (either set automatically during provider update,
 or when manually set)._

### Provider Paging, Filtering, and Sorting
By default, the items provider function is responsible for **all paging, filtering, and sorting**
of the data, before passing it to `b-table` for display.

You can disable provider paging, filtering, and sorting (individually) by setting the
following `b-table` prop(s) to `true`:

| Prop | Type | Default | Description
| ---- | ---- | ------- | -----------
| `no-provider-paging` | Boolean | `false` | When `true` enables the use of `b-table` local data pagination
| `no-provider-sorting` | Boolean | `false` | When `true` enables the use of `b-table` local sorting
| `no-provider-filtering` | Boolean | `false` |When `true` enables the use of `b-table` local filtering

When `no-provider-paging` is `false` (default), you should only return at
maximum, `perPage` number of records.

>**Note** _`<b-table>` needs reference to your pagination and filtering values in order to
trigger the calling of the provider function.  So be sure to bind to the `per-page`,
`current-page` and `filter` props on `b-table` to trigger the provider update function call
(unless you have the respective `no-provider-*` prop set to `true`)._

### Event based refreshing of data:
You may also trigger the refresh of the provider function by emitting the
event `table::refresh` on `$root` with the single argument being the `id` of your `b-table`.
You must have a unique ID on your table for this to work.

```js
    this.$root.$emit('table::refresh', 'my-table');
```

Or by calling the refresh method on the table reference
```html
<b-table ref="table" ... >
</b-table>
```
```js
    this.$refs.table.refresh();
```

These refresh event/methods are only applicable when `items` is a provider function.

### Detection of sorting change:
By listening on `<b-table>` `sort-changed` event, you can detect when the sorting key
and direction have changed.

```html
<b-table @sort-changed="sortingChanged" ...>
</b-table>
```

The `sort-changed` event provides a single argument of the table's current state context object.
This context object has the same format as used by items provider functions.

```js
methods: {
    sortingChanged(ctx) {
        // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
        // ctx.sortDesc ==> true if sorting descending, false otherwise
    }
}
```

You can also obtain the current sortBy and sortDesc values by using the `:sort-by.sync` and
`:sort-desc.sync` two-way props respectively (see section [**Sorting**](#sorting) above for details).

```html
<b-table :sort-by.sync="mySortBy" :sort-desc.sync="mySortDesc" ...>
</b-table>
```

## Server Side Rendering
Special care must be taken when using server side rendering (SSR) and an `items` provider
function. Make sure you handle any special situations that may be needed server side
when fetching your data!

## Complete Example

```html
<template>
<div>
  <div class="my-1 row">
    <div class="col-md-6">
      <b-form-fieldset horizontal label="Rows per page" :label-cols="6">
        <b-form-select :options="pageOptions" v-model="perPage" />
      </b-form-fieldset>
    </div>
    <div class="col-md-6">
      <b-form-fieldset horizontal label="Filter" :label-cols="3">
        <b-form-input v-model="filter" placeholder="Type to Search" />
      </b-form-fieldset>
    </div>
  </div>

  <div class="row my-1">
    <div class="col-sm-8">
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
    </div>
    <div class="col-sm-4 text-md-right">
      <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
    </div>
  </div>

  <!-- Main table element -->
  <b-table striped hover show-empty
           :items="items"
           :fields="fields"
           :current-page="currentPage"
           :per-page="perPage"
           :filter="filter"
           :sort-by.sync="sortBy"
           :sort-desc.sync="sortDesc"
           @filtered="onFiltered"
  >
    <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
    <template slot="isActive" scope="row">{{row.value?'Yes :)':'No :('}}</template>
    <template slot="actions" scope="row">
      <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
      <b-btn size="sm" @click.stop="details(row.item,row.index,$event.target)">Details</b-btn>
    </template>
  </b-table>

  <p>
    Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
  </p>

  <!-- Details modal -->
  <b-modal id="modal1" @hide="resetModal" ok-only>
    <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
    <pre>{{ modalDetails.data }}</pre>
  </b-modal>

</div>
</template>

<script>
const items = [
  { isActive: true,  age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
  { _rowVariant: 'success',
    isActive: false, age: 9,  name: { first: 'Mini', last: 'Navarro' } },
  { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
  { isActive: true,  age: 38, name: { first: 'Jami', last: 'Carney' } },
  { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
  { isActive: true,  age: 40, name: { first: 'Thor', last: 'Macdonald' } },
  { _cellVariants: { age: 'danger', isActive: 'warning' },
    isActive: true,  age: 87, name: { first: 'Larsen', last: 'Shaw' } },
  { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
  { isActive: false, age: 22, name: { first: 'Genevive', last: 'Wilson' } },
  { isActive: true,  age: 38, name: { first: 'John', last: 'Carney' } },
  { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
];

export default {
  data: {
    items: items,
    fields: {
      name:     { label: 'Person Full name', sortable: true },
      age:      { label: 'Person age', sortable: true, 'class': 'text-center'  },
      isActive: { label: 'is Active' },
      actions:  { label: 'Actions' }
    },
    currentPage: 1,
    perPage: 5,
    totalRows: items.length,
    pageOptions: [{text:5,value:5},{text:10,value:10},{text:15,value:15}],
    sortBy: null,
    sortDesc: false,
    filter: null,
    modalDetails: { index:'', data:'' }
  },
  methods: {
    details(item, index, button) {
      this.modalDetails.data = JSON.stringify(item, null, 2);
      this.modalDetails.index = index;
      this.$root.$emit('show::modal','modal1', button);
    },
    resetModal() {
      this.modalDetails.data = '';
      this.modalDetails.index = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
}
</script>

<!-- table-complete-1.vue -->
```
## Table options
`<b-table>` provides several props to alter the style of the table:

| prop | Description
| ---- | -----------
| `striped` | Add zebra-striping to the table rows within the `<tbody>`
| `bordered` | For borders on all sides of the table and cells.
| `inverse` | Invert the colors — with light text on dark backgrounds
| `small` | To make tables more compact by cutting cell padding in half.
| `hover` | To enable a hover highlighting state on table rows within a `<tbody>`
| `responsive` | Create responsive table to make it scroll horizontally on small devices (under 768px)
| `foot-clone` | Turns on the table footer, and defaults with the same contents a the table header
| `head-variant` | Use `default` or `inverse` to make `<thead>` appear light or dark gray, respectively
| `foot-variant` | Use `default` or `inverse` to make `<tfoot>` appear light or dark gray, respectively. Has no effect if `foot-clone` is not set


