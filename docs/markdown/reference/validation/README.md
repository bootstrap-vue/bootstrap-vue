# Form Validation

BootstrapVue does not include form validation by default; we leave that up to the many existing form
validation plugins. Below are some examples of plugins and how they may be integrated.

## Vuelidate

Vuelidate provides "Simple, lightweight model-based validation for Vue.js". Installation
instructions and other documentation can be found at https://monterail.github.io/vuelidate.

### Vuelidate Example

This example shows how to add different validation and feedback to two form fields, as well as
dynamically disable the submit button based on the form validity.

This is a verbose example designed to show how BootstrapVue and Vuelidate interact; in larger
applications, you'd likely want to abstract some of the functionality, such as creating a standard
error message component.

```html
<template>
  <b-form @submit="onSubmit">
    <b-form-group id="exampleInputGroup1" label="Name" label-for="exampleInput1">
      <b-form-input
        id="exampleInput1"
        type="text"
        v-model="form.name"
        :state="$v.form.name.$dirty ? !$v.name.$error : null"
        aria-describedby="input1LiveFeedback"
        placeholder="Enter name"
      />
      <b-form-invalid-feedback id="input1LiveFeedback">
        This is a required field and must be at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="exampleInputGroup2" label="Food" label-for="exampleInput2">
      <b-form-select
        id="exampleInput2"
        :options="foods"
        :state="$v.form.food.$dirty ? !$v.name.$error : null"
        v-model="form.food"
      />
      <b-form-invalid-feedback id="input2LiveFeedback">
        This is a required field
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Submit</b-button>
  </b-form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import validators from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        foods: ['apple', 'orange'],
        form: {}
      }
    },
    mixins: [validationMixin],
    validations: {
      form: {
        food: {
          required: validators.required
        },
        name: {
          required: validators.required,
          minLength: validators.minLength(3)
        }
      }
    },
    methods: {
      onSubmit() {
        // form submit logic
      }
    }
  }
</script>
```

## vee-validate

[vee-validate](https://github.com/baianat/vee-validate) is a plugin for Vue.js that allows you to
validate input fields and display errors. It has full support for `vue-i18n` and provides fairly
good out of the box error messages.

**Important**

You **must** configure `vee-validate`'s fields property or it will conflict with the `:fields`
property of `b-table` (and possibly other components) when it injects itself.

```js
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  // this is the default
  inject: true,
  // important to name this something other than 'fields'
  fieldsBagName: 'veeFields'
})
```

### vee-validate Example

Same example as above, just modified for vee-validate:

```html
<template>
  <b-form @submit="onSubmit">
    <b-form-group id="exampleInputGroup1" label="Name" label-for="exampleInput1">
      <b-form-input
        id="exampleInput1"
        type="text"
        v-model="form.name"
        v-validate="{required: true, min:2}"
        :state="validateState('form.name')"
        aria-describedby="input1LiveFeedback"
        placeholder="Enter name"
      />
      <b-form-invalid-feedback id="input1LiveFeedback">
        This is a required field and must be at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group id="exampleInputGroup2" label="Food" label-for="exampleInput2">
      <b-form-select
        id="exampleInput2"
        :options="foods"
        v-validate="{required: true}"
        :state="validateState('form.foods')"
        v-model="form.food"
      />
      <b-form-invalid-feedback id="input2LiveFeedback">
        This is a required field
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="form.errors.any()">Submit</b-button>
  </b-form>
</template>

<script>
  export default {
    data() {
      return {
        foods: ['apple', 'orange'],
        form: {}
      }
    },
    methods: {
      onSubmit() {
        // form submit logic
      },
      validateState(ref) {
        if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
          return !this.errors.has(ref)
        }
        return null
      }
    }
  }
</script>
```
