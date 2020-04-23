# Form

> BootstrapVue form component and helper components that optionally support inline form styles and
> validation states. Pair them up with other BootstrapVue form control components for an easy
> customized, and responsive, layout with a consistent look and feel.

## Introduction to forms and controls

Be sure to use an appropriate `type` on all inputs (e.g., `email` for email address or `number` for
numerical information) to take advantage of newer input controls like email verification, number
selection, and more.

Here's a quick example to demonstrate BootstrapVue's form styles. Keep reading for documentation on
supported components, form layout, and more.

```html
<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<!-- b-form.vue -->
```

## Inline form

Use the `inline` prop on `<b-form>` to display a series of labels, form controls, and buttons on a
single horizontal row. Form controls within inline forms vary slightly from their default states.

- Controls are `display: flex`, collapsing any HTML white space and allowing you to provide
  alignment control with spacing and flexbox utilities.
- Controls and input groups receive `width: auto` to override the Bootstrap default width: 100%.
- Controls **only appear inline in viewports that are at least 576px wide** to account for narrow
  viewports on mobile devices.

You may need to manually address the width and alignment of individual form controls with
[spacing utilities](/docs/reference/spacing-classes) (as shown below). Lastly, be sure to always
include a `<label>` with each form control, even if you need to hide it from non-screenreader
visitors with class `.sr-only`.

```html
<div>
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Jane Doe"
    ></b-input>

    <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input id="inline-form-input-username" placeholder="Username"></b-input>
    </b-input-group>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

    <b-button variant="primary">Save</b-button>
  </b-form>
</div>

<!-- b-form-inline.vue -->
```

Custom form controls and selects are also supported.

```html
<div>
  <b-form inline>
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
    <b-form-select
      id="inline-form-custom-select-pref"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="[{ text: 'Choose...', value: null }, 'One', 'Two', 'Three']"
      :value="null"
    ></b-form-select>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember my preference</b-form-checkbox>

    <b-button variant="primary">Save</b-button>
  </b-form>
</div>

<!-- b-form-inline-custom.vue -->
```

**Note:** _`<b-form-group>` is not supported in `inline` forms due to layout conflicts._

### Alternatives to hidden labels

Assistive technologies such as screen readers will have trouble with your forms if you don't include
a label for every input. For these inline forms, you can hide the labels using the `.sr-only` class.
There are further alternative methods of providing a label for assistive technologies, such as the
`aria-label`, `aria-labelledby` or `title` attributes. If none of these are present, assistive
technologies may resort to using the `placeholder` attribute, if present, but note that use of
`placeholder` as a replacement for other labelling methods is not advised.

## Related form control and layout components

See also:

- [`<b-form-input>`](/docs/components/form-input) Textual and text-like inputs
- [`<b-form-textarea>`](/docs/components/form-textarea) Text area inputs
- [`<b-form-select>`](/docs/components/form-select) Select input
- [`<b-form-radio>`](/docs/components/form-radio) Radio Inputs
- [`<b-form-checkbox>`](/docs/components/form-checkbox) Checkbox Inputs
- [`<b-form-file>`](/docs/components/form-file) File Input
- [`<b-form-datepicker>`](/docs/components/form-datepicker) Date picker input
- [`<b-form-spinbutton>`](/docs/components/form-spinbutton) Numerical range spinbutton input
- [`<b-form-tags>`](/docs/components/form-tags) Customizable tag input
- [`<b-form-timepicker>`](/docs/components/form-timepicker) Time picker custom form input
- [`<b-form-rating>`](/docs/components/form-rating) Star rating custom form input and display
- [`<b-button>`](/docs/components/button) Buttons
- [`<b-form-group>`](/docs/components/form-group) Form input wrapper to generate form-groups that
  support labels, help text and feedback
- [`<b-input-group>`](/docs/components/input-group) Form inputs with add-ons
- [`<b-form-row>`](/docs/components/layout) Create grid rows and columns with tighter margins
  (available via the [Layout and grid components](/docs/components/layout))

## Form helper components

The following helper components are available with the `Form` plugin:

- `<b-form-text>` Help text blocks for inputs
- `<b-form-invalid-feedback>` Invalid feedback text blocks for input `invalid` states
- `<b-form-valid-feedback>` Valid feedback text blocks for input `valid` states
- `<b-form-datalist>` Easily create a `<datalist>` for use with `<b-form-input>` or plain `<input>`

### Form text helper

Display a block of help text below an input with the `<b-form-text>` helper component. text is
displayed with a muted color and slightly smaller font-size.

**Tip:** Help text should be explicitly associated with the form control it relates to using the
`aria-describedby` attribute. This will ensure that assistive technologies, such as screen readers,
will announce this help text when the user focuses or enters the control.

```html
<div>
  <b-form @submit.stop.prevent>
    <label for="text-password">Password</label>
    <b-input type="password" id="text-password" aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Your password must be 8-20 characters long, contain letters and numbers, and must not
      contain spaces, special characters, or emoji.
    </b-form-text>
   </b-form>
</div>

<!-- b-form-help-text.vue -->
```

### Feedback helpers

The `<b-form-valid-feedback>` and `<b-form-invalid-feedback>` helper components will display
feedback (based on input state) as a block of colored text. They rely on being placed after an input
(sibling) and will show based on the browser native validation state of the input. To force them to
show, set the prop `force-show` to `true`, or bind the controls `state` to the `state` prop of the
feedback helper, or set the `was-validated` class on a parent element (such as a form). See the
**Validation** section below for additional details.

Use the optional Boolean prop `tooltip` to change the display from a block to a static tooltip
style. The feedback will typically appear below the form control. When this mode is enabled, it is
important that the parent container have a `position: relative:` css style (or `position-relative`
class). Note that tooltip style feedback may, since its positioning is static, obscure other inputs,
labels, etc.

**Note:** Some form controls, such as
[`<b-form-radio>`](/docs/components/form-radio#contextual-states),
[`<b-form-checkbox>`](/docs/components/form-checkbox#contextual-states), and
[`<b-form-file>`](/docs/components/form-file) have wrapper elements which will prevent the feedback
text from automatically showing (as the feedback component is not a direct sibling of the form
control's input). Use the feedback component's `state` prop (bound to the state of the form control)
or the `force-show` prop to display the feedback.

```html
<template>
  <div>
    <b-form  @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
      <b-input v-model="userId" :state="validation" id="feedback-user"></b-input>
      <b-form-invalid-feedback :state="validation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
     </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: ''
      }
    },
    computed: {
      validation() {
        return this.userId.length > 4 && this.userId.length < 13
      }
    }
  }
</script>

<!-- b-form-feedback-example.vue -->
```

### Datalist helper

For browsers that support
[`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) elements, the
`<b-form-datalist>` helper component will allow you to quickly create a `<datalist>` and child
`<option>` elements via an array passed to the `options` prop.

You may also manually provide `<option>` elements inside `<b-form-datalist>`. They will appear below
any `<option>` elements generated from the `options` prop.

```html
<template>
  <label for="input-with-list">Input with datalist</label>
  <b-form-input list="input-list" id="input-with-list"></b-form-input>
  <b-form-datalist id="input-list" :options="options"></b-form-datalist>
</template>

<script>
export default {
  data() {
    return {
      options: ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange']
    }
  }
}
</script>

<!-- b-form-datalist-example.vue -->
```

`<b-form-datalist>` is also available via the shorter alias of `<b-datalist>`.

See also:

- [`<b-form-input> datalist`](/docs/components/form-input#datalist-support) for datalist usage.
- [`<b-form-select>` `options` prop](/docs/components/form-select#options-property) docs for details
  on the formats and helper props associated with `options`.

## Validation

Disable browser native HTML5 validation by setting the `novalidate` prop to true on `<b-form>`.

Set the `validated` prop, on `<b-form>`, to `true` to add the Bootstrap v4 `.was-validated` class to
the form to trigger validation states

All of the form controls support a `state` prop, which can be used to set the form control into one
of three contextual states:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form.
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields.
- `null` Displays no validation state (neither valid nor invalid)

Refer to the
[Bootstrap v4 Form Validation Documentation](https://getbootstrap.com/docs/4.4/components/forms/#validation)
for details on the new Bootstrap v4 validation states.

### Validation mechanisms

Using 3<sup>rd</sup> party Vue-based validation libraries with BootstrapVue:

- BootstrapVue [Form validation reference section](/docs/reference/validation)

Additional resources:

- [Bootstrap v4: Form Validation Documentation](https://getbootstrap.com/docs/4.4/components/forms/#validation)
- [MDN: Learn Form Validation - Using JavaScript API](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#Validating_forms_using_JavaScript)
- [MDN: HTML5 Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
- [MDN: Validity State API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

<!-- Component reference added automatically from component package.json -->
