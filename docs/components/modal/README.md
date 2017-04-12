# Modals

>  Modals are streamlined, but flexible dialog prompts powered by JavaScript.
  They support a number of use cases from user notification to completely custom content and feature
  a handful of helpful sub-components, sizes, and more.

Other elements can easily show modals using `v-b-modal` directive.

```html
    <!-- Using modifiers --> 
    <b-btn v-b-modal.modal1>Show Modal</b-btn>
    
    <!-- Using value --> 
    <b-btn v-b-modal="'modal1'">Show Modal</b-btn>
```

**Prevent Closing**

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