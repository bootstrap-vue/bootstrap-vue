# Tables

> For tabular data. Tables support pagination and custom rendering.

### fields
Fields prop is used to display table columns. 
keys are used to extract real value from each raw.
Example format:
```js
{
    name: {
        label: 'Person Full name',
        sortable: true,
        invisible:true // Dynamically remove the field if needed from the table.
    },
    age: {
        label: 'Person age',
        sortable: false
    }
}
```
**Supported field properties:**

| Property | Type | Description
| ---------| ---- | -----------
| label | String | Appears in the table header
| sortable | Boolean | Enable sorting on this column
| class | String | Class name (or space separated classes) to add to `th` and `td`
| invisible | Boolean | Make column visually removed from the table (visibility:hidden)

*Field properties, if not present, default to null*

### items
Items are real table data records. Example format:

```js
[
    {
        state: 'success', // Displays record green 
        age: 27,
        name: 'Havij'
    }
]
```

**Supported item record modifier properties (make sure your field keys do not conflict with these names):**

| Property | Type | Description
| ---------| ---- | -----------
| state | String | Bootstrap contextual state applied to row (`active`, `success`, `info`, `warning`, `danger`)


### Custom rendering
Custom rendering for each field is possible using **scoped slots**.
If you want to add an extra field which does not exits on records, just add it to `fields` array.  Example:

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
        A regular column
        label: 'Sex'
    },
    nameage: {
        // A virtual column
        label: 'First name and age'
    }
 },
 items: [
    {
        name: {
            first: 'John',
            last: 'Doe'
        },
        sex: 'Male',
        age: 42
    },
    {
        name: {
            first: 'Jane',
            last: 'Doe'
        },
        sex: 'Female',
        age: 36
    }
 ]
```

```html
<template slot="index" scope="data">
    <!-- A Virtul column -->
    {{data.index + 1}}
</template>
<template slot="name" scope="data">
    <!-- A custom formatted column -->
    {{data.value.first}} {{data.value.last}}
</template>
<template slot="nameage" scope="data">
    <!-- A Virtul column -->
    {{data.item.first}} is {{data.item.age}} years old
</template>
```

will render a table like so:

| Index | Full Name | Sex | First name and age
| ----- | --------- | --- | ------------------
| 1 | John Doe | Male | John is 42 years old
| 2 | Jane Doe | Female | Jane is 36 years old


The slot's scope variable (`data` in the above example) will have the following properties:

| Property | Type | Description
| -------- | ---- | -----------
| value | Any | The value for this key in the record (`null` if a virtual column)
| item | Object | The entire record (i.e. `items[index]`) for this row
| index | Number | The row number (zero based)
