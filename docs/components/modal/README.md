# Modals

>  Modals are streamlined, but flexible dialog prompts powered by JavaScript.
  They support a number of use cases from user notification to completely custom content and feature
  a handful of helpful sub-components, sizes, accessibility, and more.

```html
<template>
<div>
  <b-btn v-b-modal.modal1>Launch demo modal</b-btn>

  <!-- Main UI -->
  <div class="mt-3 mb-3">
    Submitted Names:
    <ul>
      <li v-for="n in names">{{n}}</li>
    </ul>
  </div>

  <!-- Modal Component -->
  <b-modal id="modal1" title="Submit your name" @ok="submit" @shown="clearName">
    
    <form @submit.stop.prevent="submit">
      <b-form-input type="text" placeholder="Enter your name" v-model="name"></b-form-input>
    </form>
    
  </b-modal>
</div>  
</template>

<script>
export default {
  data: {
    name: '',
    names: []
  },
  methods: {
    clearName() {
        this.name = '';
      },
      submit(e) {
        if (!this.name) {
          alert('Please enter your name');
          return e.cancel();
        }
        
        this.names.push(this.name);
        this.name = '';
      }
  }
}
</script>

<!-- modal.vue -->
```

`<b-modal>`, by default, has an **OK** and a **Close** button in the footer. These buttons can
be cusomized by setting various props on the component. You can cusomize the size of the buttons,
disable the **OK** button, hide the **Close** button (i.e. OK Only), and provide custom
button content using the `ok-title` and `close-title` props, or using the named
slots `modal-ok` and `modal-close`.

`<b-modal>` supports close on ESC (enabled by default), close on backdrop click (enabled by default), and 
the `X` close button in the header (enabled by default). These features may be disabled by setting the the
props `no-close-on-esc`, `no-close-on-backdrop`, and `hide-header-close` respectively.

You can override the modal title via the named slot `modal-title`, override the
header completely via the `modal-header` slot, and override the footer completely
via the `modal-footer` slot. Note when using the `modal-footer` slot the default
**OK** and **Close** buttons will not be present. If you use the `modal-header`
slot the default header `X` close button will not be present, nor can you use
the `modal-title` slot.


### Toggle Modal Visibility
There are several methods that you can employ to toggle he visibility of `<b-modal>`.

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

Focus will automatically be returned to the trigger element once the modal closes.
See the  **Accessibility** section below for details.

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

The `hide()` method accepts an optional argument. See section **Prevent Closing**
below for details.

#### Using `v-model` property.

`v-model` property is always automatically synced with `<b-modal>` visible state
and you can show/hide using `v-model`.

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

You can emit `show::modal` and `hide::modal` event on `$root` with first
argument which is the modal's id:

```html
<b-button @click="showModal" ref="btnShow">
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
        // Return focus to our Open Modal button
        // See accessibility below for additional return-focus methods
        this.$refs.btnShow.$el.focus();
    }
}
```


### Prevent Closing
To prevent `<b-modal>` from closing (for example when validation fails)
you can call the `cancel()` method of the event object passed to your `ok` (**OK** button),
`cancel` (**Close** button) and `hide` event handlers.

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

Note that events `ok` and `cancel` are emitted by modal's built in **OK** and **Close**
buttons respectively. These events will, by default, not be emitted if you have provided your own 
buttons in the `modal-footer` slot or have hidden the footer. In this case use the `hide` event
to control cancelling of the modal close.

The close event object contans a single property and a single method:

| Propery or Method | Type | Description
| ------------ | ------ | --------------------------------------------
| `e.cancel()` | Method | When called prevents the modal from closing
| `isOK` | Property | Will be one of: `true` (Default **OK** Clicked), `false` (Default **Close** clicked), the argument provided to the `hide()` method, or `undefined` otherwise (i.e. close on Esc, or close on backdrop click)

You can set the value of `isOK` by passing an argument to the component's
`hide()` method for advanced control. Note: The `ok` and `cancel` events
will be only emitted when the argument to `hide()` is strictly `true`
or `fase` respectively. The argument passed to `hide()` will be placed into the
`isOK` property of the close event object.


### Modal sizing
The width of `<b-modal>` can be set via the `size` prop to `lg`, `sm` or `md` (default).


### Accessibility
`<b-modal>` provides several accessibility features, including auto focus, return
focus, and keyboard (tab) _focus containment_.

For `aria-labelledby` and `aria-described` by attributes to appear on the
modal, you **must** supply an `id` attribute on `<b-modal>`. `aria-labeledby` will
not be present if you have the header hidden.


#### Auto Focus
`<b-modal>` will autofocus the first visible, non-disabled, focusble element found 
in the modal, searching in the following order:
- Modal body
- Modal footer
- Modal header

If a focusble element is not found, then the entire modal will be focused.

You can pre-focus an element within the `<b-modal>` by listening to the `<b-modal>` `shown` event, and 
call the element's `focus()` method. `<b-modal>` will not attempt to autofocus if
an element already has focus within the `<b-modal>`.

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

To disable the auto-focus feature, add the prop `no-auto-focus` on
`<b-modal>`. This will disable searching for a focusable element within 
body, footer, and header. With `no-auto-focus` set, the modal-content
will be focused instead, unless you have pre-focused an element within.

`no-auto-focus`may be required when you have modal with long body content (without 
focusable items in th modal body) that causes the modal to overflow the
height of the viewport, and in-turn automatically scrolls down to the footer buttons.

#### Returning focus to the triggering element on modal close

For accessibility reasons, it is desireable to return focus to the element
that triggered the opening of the modal, when the modal closes.  `<b-modal>`
provides several methods and options for returning focus to the triggering element.

##### Specify Return Focus Element via the `return-focus` Prop:

You can also specify an element to return focus to, when modal closes, by setting
the `return-focus` prop to one of the folowing:
- A CSS Query Selector string (or an element ID prepended with `#`)
- A component reference (which is mounted on a focusable element, such as `<b-button>`)
- A reference to a DOM element that is focusable

If the passed in element is not focusable, then the browser will determine
what has focus (usually `<body>`, which is not desireable)

This method for returning focus is handy when you use the `<b-modal>` methods `show()`
and `hide()`, or the `v-model` prop. Note this property takes
precedence over other methods of specifying the return focus element.

##### Auto Return Focus:

When `<b-modal>` is opened via the `v-b-modal` directive on an element, focus will be
returned to this element automatically when `<b-modal>` closes, unless an element has
been specified via the `return-focus` prop.

##### Specify Return Focus via Event:

When using the `show::modal` event (emitted on `$root`), you can specify a second argument
which is the element to return focus to.  This argument accepts the same types
as the `return-focus` prop.

```js
this.$root.$emit('show::modal', 'modal1', '#focusThisOnClose');
```

Tip: if using a click event (or similar) to trigger modal to open, pass the
event's `target` property:

```html
<b-btn @click="$root.$emit.('show::modal', 'modal1', $event.target)">
  Open Modal
</b-btn>
```

Note: If the `<b-modal>` has the `return-focus` prop set, then the element specified
via the event will be ignored.

#### Keyboard Navigation
When tabbing through elements within a `<b-modal>`, if focus attempts to leave the modal into the document,
Focus will be brought back into the modal.

In some circumstances, you may have a need to disable the enforce focus feature. You can do so
by setting the prop `no-enforce-focus`.


