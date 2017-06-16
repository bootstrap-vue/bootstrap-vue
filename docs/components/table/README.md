# Tables

> For tabular data. Tables support pagination, custom rendering, and asynchronous data.

### `fields` prop
The `fields` prop is used to display table columns. 
keys are used to extract real value from each row.
Example format:
```js
{
    name: {
        label: 'Person Full name',
        sortable: true
    },
    age: {
        label: 'Person age',
        sortable: false
    }
}
```
Supported field properties:

| Property | Type | Description
| ---------| ---- | -----------
| `label` | String | Appears in the table header
| `sortable` | Boolean | Enable sorting on this column
| `variant` | String | Apply contextual class to column (`active`, `success`, `info`, `warning`, `danger`)
| `class` | String or Array | Class name (or array of class names) to add to `th` and `td` in the column

*Field properties, if not present, default to null*

### `items` Prop
`items` are real table data record objects in array format. Example format:

```js
[
    {
        _rowVariant: 'success', // Displays record green
        age: 27,
        name: 'Havij'
    },
    {
        _rowVariant: 'danger', // Displays record red
        age: 42,
        name: 'Robert'
    }
]
```

Supported optional item record modifier properties (make sure your field keys do not conflict with these names):

| Property | Type | Description
| ---------| ---- | -----------
| `_rowVariant` | String | Bootstrap contextual state applied to row (`active`, `success`, `info`, `warning`, `danger`)
| `state` | String | **deprecated** in favour of `_rowVariant`

**Note** `state` is deprecated. `_rowVariant`, if present in the record, will be prefered.

`items` can also be a reference to a *provider* function, which returns an `Array` of items data.
Provider functions can also be asynchronous:
- By returning `null` (or `undefined`) and calling a callback, when the data is 
ready, with the data array as the only argument to the callback,
- By returning a `Promise` that resolves to an array.

See the **"Using Items Provider functions"** section below for more details.


### Custom Data Rendering
Custom rendering for each data field in a row is possible using
[scoped slots](http://vuejs.org/v2/guide/components.html#Scoped-Slots).
If you want to add an extra field which does not exist in the records,
just add it to the `fields` array.  Example:

```js
 fields: {
    index: {
        // A virtual column
        label: 'Index'
    },
    name: {
        // A column that needs custom formatting
        label: 'Full Name'
    },
    sex: {
        // A regular column
        label: 'Sex'
    },
    nameage: {
        // A virtual column
        label: 'First name and age'
    }
 },
 items: [
    {
        name: { first: 'John', last: 'Doe' },
        sex: 'Male',
        age: 42
    },
    {
        name: { first: 'Jane', last: 'Doe' },
        sex: 'Female',
        age: 36
    }
 ]
```

```html
<b-table :fields="fields" :items="items">
  <template slot="index" scope="data">
    <!-- A Virtul column -->
    {{data.index + 1}}
  </template>
  <template slot="name" scope="data">
    <!-- A custom formatted column -->
    {{data.value.first}} {{data.value.last}}
  </template>
  <template slot="nameage" scope="data">
    <!-- A Virtul composite column -->
    {{data.item.name.first}} is {{data.item.age}} years old
  </template>
</b-table>
```

will render a table like so:

| Index | Full Name | Sex | First name and age
| ----- | --------- | --- | ------------------
| 1 | John Doe | Male | John is 42 years old
| 2 | Jane Doe | Female | Jane is 36 years old


The slot's scope variable (`data` in the above example) will have the following properties:

| Property | Type | Description
| -------- | ---- | -----------
| `value` | Any | The value for this key in the record (`null` or `undefined` if a virtual column)
| `item` | Object | The entire record (i.e. `items[index]`) for this row
| `index` | Number | The row number (zero based)

**Note** that `index` will not always be the actual row's index number, as it is 
computed after pagination and filtering have been applied to the origional
table data. The `index` value will refer to the displayed row number. This
number will align with the indexes from the optional `v-model` bound variable.


### Header/Footer Custom Rendering
It is also possible to provide custom rendering for the tables `thead` and
`tfoot` elements. Note by default the table footer is not rendered unless
`foot-clone` is set to `true`.

Scoped slots for the header and footer cells uses a special naming
convetion of `HEAD_<fieldkey>` and `FOOT_<fieldkey>` respectivly. if a `FOOT_`
slot for a field is not provided, but a `HEAD_` slot is provided, then
the footer will use the `HEAD_` slot.

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
| `label` | String | The fileds label value (also available as `data.field.label`)
| `column` | String | The fields's `key` value
| `field` | Object | the field's object (from the `fields` prop)


### `v-model` Binding
If you bind a variable to the `v-model` prop, the contents of this variable will
be the currently disaplyed item records. This variable (the `value` prop) should
be treated as readonly. Do not bind any value directly to the `value` prop. Use
the `v-model` binding.


### Using Items Provider Functions
As mentioned under the `items` prop section, it is possible to use a function to provide 
the row data (items), by specifying a function reference via the `items` prop.

**Note:** The `items-provider` prop has been deprecaated in favour of providing a function
reference to the `items` prop. A console warning will be issued if `items-provider` is used.

The providerfunction is called with the following signature:

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

The second argument `callback` is an optional parameter for when when using the callback asynchronous method.

**Example 1: returning an array of data (synchronous):**
```js
function myProvider(ctx) {
    let items = [];

    // perform any items processing needed
    
    // Must rturn an array
    return items || [];
}
```

**Example 2: Using callback to return data (asynchronous):**
```js
function myProvider(ctx, callback) {
    let params = '?page=' + ctx.currentPage + '&size=' + ctx.perPage;

    this.fetchData('/some/url' + params).then((data) => {
        // Pluck the array of items off our axios response
        let items = data.items;
        // Provide the array of items to the callabck
        callback(items);
    })

    // Must return null or undefined
    return null;
}
```

**Example 3: Using a Promise to return data (asynchronous):**
```js
function myProvider(ctx) {
    let promise = axios.get('/some/url?page=' + ctx.currentPage + '&size=' + ctx.perPage);

    // Must return a promise that resolves to an array of items
    return promise.then((data) => {
        // Pluck the array of items off our axios response
        let items = data.items;
        // Must return an array of items
        return(items);
    });
}
```

`b-table` provides a `busy` prop that will flag the table as busy, which you can 
set to `true` just before your async fetch, and then set it to `false` once you have your data, and just 
before you send it to the table for display. Example:

```html
<b-table id="my-table" :busy="isBusy" :items="myProvider" :fields="fields" ....>
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
        this.isBusy = true
        let promise = axios.get('/some/url');

        return promise.then((data) => {
            const items = data.items;
            this.isBusy = false
            return(items);
        });
    }
 }
```

By default, the items provider function is responsible for **all** paging, filtering, and sorting 
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

Note that `b-table` needs refernce to your pagination and filtering values in order to
trigger the calling of the provider function.  So be sure to bind to the `per-page`,
`current-page` and `filter` props on `b-table` to trigger the provider update function call
(unless you have the `no-provider-` respective prop set to `true`).

**Event based refreshing of data:**
You may also trigger the refresh of the provider function by emitting the 
event `table::refresh` on `$oot` with the single argument being the `id` of your `b-table`.
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


**Detection of sorting change:**
By listening on `b-table`'s `sort-changed` event, you can detect when the sorting key and direction have changed.

```html
<b-table @sort-changed="sortingChanged" ...>
</b-table>
```

The `sort-changed` event provides a single argument of the table's current state context object.
This context object has the same format as used by items provider functions.

```js
methods: {
    sortingChanged(ctx) {
        // ctx.sortBy ==> Field key for sorting by (or null for no sorting)
        // ctx.sortDesc => true if sorting descending, false otherwise
    }
}
```


### Server Side Rendering
Special care must be taken when using server side rendering (SSR) and an `items` provider
function. Make sure you handle any special situations that may be needed server side
when fetching your data.

