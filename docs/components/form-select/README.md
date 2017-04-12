# Form Select

> Custom `<select>` menus need only a custom class, .custom-select to trigger the custom styles.

`options` can be an array or a key-value object. Available fields:
 
- **`text`** Display text
- **`value`** The selected text which will be set on `v-model`
- **`disabled`** Disables item for selection

If you want to customize fields (for example using `name` field for display text) you can easily change them using `text-field` and `value-field` props.

**Array**

```js
['A', 'B', 'C', {text:'D', disabled: true}, 'E', 'F']
```

**Array of objects**

```js
[
 {text: 'Item 1', value: 'first'}, 
 {text: 'Item 2', value: 'second'}, 
 {text: 'Item 3', value: 'third', disabled: true}
]
```

**Object**

Keys are mapped to value and values are mapped to option object. 

```js
{
  a: 'Item A',
  b: 'Item B',
  c: 'Item C',
  d: {text: 'D', disabled: true},
  e: {text: 'D', value:'overridden_value'}
}
```