# Form Validation

> BootstrapVue does not include form validation by default; we leave that up to the many existing
> form validation plugins. Below are some examples of plugins and how they may be integrated.

## Vuelidate

[Vuelidate](https://github.com/vuelidate/vuelidate/) provides "Simple, lightweight model-based
validation for Vue.js". Installation instructions and other documentation can be found at
https://vuelidate.netlify.com/.

### Vuelidate example

This example shows how to add different validation and feedback to two form fields, as well as
dynamically disable the submit button based on the form validity.

This is a verbose example designed to show how BootstrapVue and Vuelidate interact; in larger
applications, you'd likely want to abstract some of the functionality, such as creating a standard
error message component.

```html
<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
        <b-form-input
          id="example-input-1"
          name="example-input-1"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          aria-describedby="input-1-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
        <b-form-select
          id="example-input-2"
          name="example-input-2"
          v-model="$v.form.food.$model"
          :options="foods"
          :state="$v.form.food.$dirty ? !$v.form.food.$error : null"
          aria-describedby="input-2-live-feedback"
        ></b-form-select>

        <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        foods: ['apple', 'orange'],
        form: {
          name: null,
          food: null
        }
      }
    },
    validations: {
      form: {
        food: {
          required
        },
        name: {
          required,
          minLength: minLength(3)
        }
      }
    },
    methods: {
      onSubmit() {
        this.$v.form.$touch()
        if (this.$v.form.$anyError) {
          return
        }

        // Form submit logic
      }
    }
  }
</script>
```

## VeeValidate

[VeeValidate](https://logaretm.github.io/vee-validate/) is a plugin for Vue.js that allows you to
validate input fields and display errors. It has full support for
[Vue I18n](https://kazupon.github.io/vue-i18n/) and provides fairly good out of the box error
messages.

**Important**

You **must** configure `vee-validate`'s `fields` property or it will conflict with the `:fields`
property of `<b-table>` (and possibly other components) when it injects itself.

```js
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})
```

### VeeValidate example

Same example as above, just modified for VeeValidate:

```html
<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
        <b-form-input
          id="example-input-1"
          name="example-input-1"
          v-model="form.name"
          v-validate="{ required: true, min: 3 }"
          :state="validateState('example-input-1')"
          aria-describedby="input-1-live-feedback"
        ></b-form-input>

        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
        <b-form-select
          id="example-input-2"
          name="example-input-2"
          v-model="form.food"
          v-validate="{ required: true }"
          :options="foods"
          :state="validateState('example-input-2')"
          aria-describedby="input-2-live-feedback"
        ></b-form-select>

        <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="veeErrors.any()">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foods: ['apple', 'orange'],
        form: {
          name: null,
          food: null
        }
      }
    },
    methods: {
      validateState(ref) {
        if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
          return !this.veeErrors.has(ref)
        }
        return null
      },
      onSubmit() {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            return
          }

          // Form submit logic
        })
      }
    }
  }
</script>
```
