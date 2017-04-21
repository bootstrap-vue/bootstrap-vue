# Modals

>  Modals are streamlined, but flexible dialog prompts powered by JavaScript.
  They support a number of use cases from user notification to completely custom content and feature
  a handful of helpful sub-components, sizes, and more.

### Toggle Modal

##### Using `v-b-modal` directive (recommended)

Other elements can easily show modals using `v-b-modal` directive.

```html
<!-- Using modifiers --> 
<b-btn v-b-modal.modal1>Show Modal</b-btn>

<!-- Using value --> 
<b-btn v-b-modal="'modal1'">Show Modal</b-btn>
```

##### Using `show()` and `hide()` component methods.

You can access modal using `ref` attribute and then call this methods.

##### Using `v-model` property.

`v-model` property is always automatically synced with modal state and you can show/hide using v-model.

##### Directly emit events
You can emit `show::modal` and `hide::modal` event with single argument which is modal's id.

#### Prevent Closing

To prevent modal from closing (for example when validation fails) you can use event object passed to `ok`, `cancel` and `hidden` events.
 
```html
<b-modal @hidden="save">
```

```js
methods: {
    save(e) {
        if(!this.saved) {
          return e.cancel();
        }
    }
}
```
