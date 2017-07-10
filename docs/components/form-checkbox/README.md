# Form Checkbox Input

> For cross browser consistency, `<b-form-checkbox>` uses Bootstrap's custom
checkbox input to replace the browser default checkbox input. It is built on top of
semantic and accessible markup, so it is a solid replacement for the default checkbox input.

**Example 1:** Single checkbox
```html
<template>
  <div>
    <b-form-checkbox id="checkbox1" v-model="state" value="accepted" unchecked-value="not_accepted">
      I accept terms and use
    </b-form-checkbox>

    <div>State: <strong>{{state}}</strong></div>
  </div>
</template>

<script>
export default {
    data: {
        state: 'please_accept'
    }
}
</script>

<!-- form-checkbox-1.vue -->
```

**Example 2:** Multiple choice checkboxes
```html
<template>
  <div>
    <b-form-fieldset id="fieldset2"
                     :label="label"
                     label-for="checkboxes2"
                     :description="desc"
                     :state="state"
                     :feedback="feedback"
    >
      <div role="group" id="checkboxes2">
        <b-form-checkbox v-model="selected" name="flavour" value="orange">Orange</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="apple">Apple</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="pineapple">Pineapple</b-form-checkbox>
        <b-form-checkbox v-model="selected" name="flavour" value="grape">Grape</b-form-checkbox>
      </div>
    </b-form-fieldset>
    <hr>
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data: {
    label: 'Choose Your Flavours:',
    desc: 'Select at most <b>2</b> flavours',
    selected: [] // Must be an array reference!
  },
  computed: {
    feedback() {
       if (this.selected.length > 2) {
         return "Don't be greedy!";
       } else if (this.selected.length === 1) {
         return 'Select one more...';
       }
       return '';
    },
    state() {
       if (this.selected.length > 2) {
         return 'danger';
       } else if (this.selected.length === 2) {
         return 'success';
       } else if (this.selected.length === 1) {
         return 'warning';
       }
       return '';
    }
  }
}
</script>

<!-- form-checkbox-2.vue -->
```

### Values
By default, `<b-form-checkbox>` value will be `true` when checked and `false` when unchecked.
You can customize the checked and unchecked values by specifying the `value` and `unchecked-value`
properties.

`v-model` binds to the `checked` property.  When you have multiple checkboxes that bind to a
single data state variable, you **must** provide an array reference `[]` to your `v-model`!

Note that when `v-model` is bound to multiple checkboxes, the `unchecked-value` is not used.
Only the value(s) of the chcekboxes will be returned in the `v-model` bound array. You
should provide unique values for each checkbox's `value` prop.


### Multiple checkboxes and accessibility
When binding multiple checkboxes together, you should set the `name` prop to the same value for
all checkboxes in the group, as well as wrap the group in a `<div>` (or other block element)
which has the aria attribute `role="group"`. This will inform users of assitive technologies
that the checkboxes are related.

When placing the group of checkboxes inside a `<b-form-fieldset>`, set a unique `id` on the
element with `role="group"` and set the `label-for` prop of the `<b-form-fieldet>` to
this `id` value (see **Example 2** above).  Whenever using grouped checkboxes, it is
recommended that they be placed in a `<b-form-fieldset>` component to associate a `<label>`
with the entire group of checkboxes.


### Contextual states
To apply contextual state colors to `<b-form-checkbox>`, it must be wrapped in
a `<b-form-fieldset>` component (which has the `state` prop set to the state you
would like), or wrapped in another element - such as a `<div>` - which has one
of the standard Bootstrap V4 `.has-*` state class applied.


### Non custom check inputs
You can have `b-form-checkbox` render a browser native chechbox input by setting the `plain` prop.


### See also
- [`<b-form-fieldset>`](./form-fieldset)

