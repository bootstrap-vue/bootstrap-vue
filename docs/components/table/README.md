# Tables

> For tabular data. Tables support pagination and custom rendering.

### fields
Fields prop is used to display table columns. 
keys are used to extract real value from each raw.
Example format:
```js
name: {
    label: 'Person Full name',
    sortable: true,
    invisible:true // Dynamically remove the field if needed from the table.
},
age: {
    label: 'Person age',
    sortable: false
}
```
Supported field properties:

| Property | Type | Description
| ---------| ---- | -----------
| label | String | Appears in the table header
| sortable | Boolean | Enable sorting on this column
| class | String | Class name (or space separated classes) to add to `th` and `td`
| invisible | Boolean | Make column visually removed from the table (visibility:hidden)

Field properties default to null

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

Supported item record modifier properties (make sure your field keys do not conflict with these names):

| Property | Type | Description
| ---------| ---- | -----------
| state | String | Bootstrap contextual state applied to row (`active`, `success`, `info`, `warning`, `danger`)


### Custom rendering
Custom rendering for each field is possible using **scoped slots**.
If you want to add an extra field which does not exits on records, just add it to `fields` array.  Example:
 
```html
<template slot="name" scope="field">
      {{field.name.first}} {{field.name.last}}
</template>
```
