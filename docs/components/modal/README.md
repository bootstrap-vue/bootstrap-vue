# Modals

>  Modals are streamlined, but flexible dialog prompts powered by JavaScript.
  They support a number of use cases from user notification to completely custom content and feature
  a handful of helpful sub-components, sizes, accessibility, and more.

Modals, by default, have an OK and a Cancel button.  These buttons can be cusomized
by setting various props on the component.

### Toggle Modal Visibility

#### Using `v-b-modal` directive (recommended)

Other elements can easily show modals using `v-b-modal` directive.

```html
<!-- Using modifiers --> 
<b-btn v-b-modal.modal1>Show Modal</b-btn>

<!-- Using value --> 
<b-btn v-b-modal="'modal1'">Show Modal</b-btn>

<!-- the modal -->
<b-modal id="modal1">
    Hello From Modal 1!
</b-modal>
```

#### Using `show()` and `hide()` component methods.

You can access modal using `ref` attribute and then call the `show()` or `hide()` methods.

```html
<b-button @click="showModal">
    Open Modal
</b-button>
<b-modal ref="my_modal">
    Hello From My Modal!
    <b-btn @click="hideModal">Close Me</b-btn>
</b-modal>
```

```js
methods: {
    showModal() {
        this.$refs.my_modal.show();
    },
    hideModal() {
        this.$refs.my_modal.hide();
    }
}
```

#### Using `v-model` property.

`v-model` property is always automatically synced with modal state and you
can show/hide using v-model.

```html
<b-button @click="modalShow = !modalShow">
    Open Modal
</b-button>
<b-modal v-model="modalshow">
    Hello From Modal!
</b-modal>
```

```js
data: {
    modalShow: false
}
```

When using the `v-model` property, do not use the `visible` property at the same time.


#### Directly emiting events

You can emit `show::modal` and `hide::modal` event on `$root` with single
argument which is the modal's id.

```html
<b-button @click="showModal">
    Open Modal
</b-button>
<b-modal id="modal1">
    Hello From My Modal!
    <b-btn @click="hideModal">Close Me</b-btn>
</b-modal>
```

```js
methods: {
    showModal() {
        this.$root.$emit('show::modal','modal1');
    },
    hideModal() {
        this.$root.$emit('hide::modal','modal1');
    }
}
```


### Prevent Closing

To prevent modal from closing (for example when validation fails)
you can call the `cancel()` method of the event object passed to the `ok`,
`cancel` and `hide` component events.

Note that events `ok` and `cancel` are emitted by modal's built in **OK** and **Cancel**
buttons respectively. These events will not be emiited if you have provided your own 
buttons in the `footer` slot or have hidden the footer. In this case use the `hide` event
to control cancelling of the modal close.

```html
<b-modal @hide="save">
    Hello From Modal!
    <b-alert variant="danger" :show="message ? true : false">
        {{ message }}
    </b-alert>
</b-modal>
```

```js
data: {
    saved: false,
    message: null
},
methods: {
    save(e) {
        if(!this.saved) {
            this.message = 'Please save your work';
            return e.cancel();
        } else {
            this.message = null;
        }
    }
}
```

### Accesibility

`b-modal` provides several accessibility features, including auto focus, return
focus, and keyboard (tab) _focus containment_.

For `aria-labelledby` and `aria-described` by attributes to appear on the
modal, you **must** supply an `id` attribute on `b-modal`. `aria-labeledby` will
not be present if you have the header hidden.

#### Auto Focus

Modal will autofocus the first visible, non-disabled, focusble element found 
in the modal, searching in the following order:
- Modal body
- Modal footer
- Modal header

If a focusble element is not found, then the entire modal will be focused.

You can pre-focus an element within the modal by listening to modal's `shown` event, and 
call the element's `focus()` method. Modal will not attempt to autofocus if
an element already has focus within the modal.

```html
<b-modal @shown="focusMyElement">
    <b-button>I Don't Have Focus</b-button>
    <br>
    <b-form-input type="text"></b-form-input>
    <br>
    <!-- element to gain focus when modal is opened -->
    <b-form-input ref="focusThis" type="text"></b-form-input>
    <br>
    <b-form-input type="text"></b-form-input>
    <br>
</b-modal>
```

```js
methods: {
    focusMyElement(e) {
        this.$refs.focusThis.focus();
    }
}
```

#### Returning focus to the triggering element

##### Specify Return Focus Element via the `return-focus` Prop

You can also specify an element to return focus to, when modal closes, by setting
the `return-focus` prop to one of the folowing:
- A CSS Query Selector string (or an element ID prepended with `#`)
- A component reference (which is mounted on a focusable element, such as `b-button`)
- A reference to a DOM element that is focusable

If the passed in element is not focusable, then the browser will determine
what has focus (usually `body`)

This method for returning focus is handy when you use the modal's `show()`
and `hide()` methods, or the `v-model` prop. Note this property takes
precedence over other methods of specifying the return focus element.

##### Auto Return Focus

When modal is opened via the `v-b-modal` directive on an element, focus will be
returend to this element automatically when modal closes, unless an element has
been specified via the `return-focus` prop.

##### Specify Return Focus via Event

When using the `show::modal` event (emitted on `$root`), you can specify a second argument
which is the element to return focus to.  This argument accepts the same types
as the `return-focus` prop.

```js
this.$root.$emit('show::modal', 'modal1', '#focusThisOnClose');
```

Tip: if using a click evnet (or similar) to trigger modal to open, pass the
event's `target` property:

```html
<b-btn @click="$root.$emit.('show::modal', 'modal1', $event.target)">
  Open Modal
</b-btn>
```

Note: If the modal has the `return-focus` prop set, then the element specified
via the event will be ignored.

#### Keyboard Navigation
When tabbing through elements within a modal, if focus attempts to leave the modal into the document,
Focus will be brought back into the modal.


