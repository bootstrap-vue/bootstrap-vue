# Forms Radio

> For even more customization and cross browser consistency, 
use our completely custom form elements to replace the browser defaults.
They’re built on top of semantic and accessible markup, so they’re solid replacements for any default form control.

`options` can be an array or a key-value object.
In all of forms this fields are available :
 
- **`text`** Display text
- **`value`** The selected text which will be set on `v-model`
- **`disabled`** Disables item for selection

**Array**

```js
[ 
	'A', 
	'B',
	'C',
	{text:'D', disabled: true}
]
```

**Object**

```js
{
      a: 'Item A',
      b: 'Item B',
      c: 'Item C',
      d: {text: 'D', disabled: true}
}
```

**Array of objects**

```js
[
	{ text: 'Item 1', value: 'first' }, 
	{ text: 'Item 2', value: 'second' }, 
	{ text: 'Item 3', value: 'third', disabled: true }
]
```