# Popover

> The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
element via the `<b-popover>` component or [`v-b-popover`](/docs/directives/popover) directive.

## `<b-popover>` Component Usage
```html
<template>
  <b-container fluid>

    <h5 class="my-3">Placement</h5>
    <b-row>
      <b-col md="3" class="py-4 text-center"
           v-for="placement in ['top', 'left', 'right', 'bottom']">
        <b-btn :id="'exPopover1-'+placement" variant="primary">
          {{ placement }}
        </b-btn>
        <b-popover :target-id="'exPopover1-'+placement"
                   :placement="placement"
                   title="Popover!"
                   :content="placement">
        </b-popover>
      </b-col>
    </b-row>

    <h5 class="my-3">Content via properties or slots</h5>
    <b-row>
      <b-col md="6" class="py-4 text-center">
        <b-btn id="exPopover2" variant="primary">Using properties</b-btn>
        <b-popover target-id="exPopover2" 
            title="Prop Examples"
            triggers="hover focus"
            content="Embedding content using properties is easy">
        </b-popover>
      </b-col>
      <b-col md="6" class="py-4 text-center">
        <b-btn id="exPopover3" variant="primary">Using slots</b-btn>
        <b-popover target-id="exPopover3">
           <template slot="title">Content via Slots</template>
           Embedding content <span class="text-danger">using slots</span> affords you
           <em>greater <strong>control.</strong></em> and basic HTML support/
        </b-popover>
      </b-col>
    </b-row>

  </b-container>  
</template>

<!-- popover-1.vue -->
```

### Advanced usage with reactive content

You can even make your popover content interactive:

```html
<template>
  <div>
    <div class="my-3">
      <b-btn id="exPopoverReactive1" variant="primary">Reactive Content Using Slots</b-btn>
    </div>
    <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text" style="max-width:20rem;">
        Name: <strong>{{ input1Return }}</strong><br>
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card>

    <b-popover target-id="exPopoverReactive1" @show="clearValues" trigger="click" ref="popover">
      <template slot="title">
        <b-btn @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        Interactive Content
      </template>
      <b-form-group label="Name" class="mb-1" description="Enter your name">
        <b-form-input size="sm" v-model="input1"></b-form-input>
      </b-form-group>
      <b-form-group label="Color" class="mb-1" description="Pick a color">
        <b-form-select size="sm" v-model="input2" :options="options"></b-form-select>
      </b-form-group>
      <b-alert show>
        <h6>Values:</h6>
        Name: <strong>{{ input1 }}</strong><br>
        Color: <strong>{{ input2 }}</strong>
      </b-alert>
      <b-btn @click="onCancel" size="sm" variant="danger">Cancel</b-btn>
      <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>
    </b-popover>
  </div>  
</template>

<script>
  export default {
    data: {
      input1: '',
      input2: '',
      options: [{text:'- Chose 1 -', value:''},'Red','Green','Blue']
      input1Return: '',
      input2Return: '',
    },
    methods: {
      onClose() {
        this.$refs.popover.$emit('close');
      },
      onCancel() {
        this.$refs.popover.$emit('close');
      },
      onOk() {
        if (!this.input1 || !this.input2) {
          alert('Please enter something');
        } else {
          alert('Thats great!');
          this.$refs.popover.$emit('close');
          this.input1Retrun = this.input1;
          this.input2Return = this.input2;
        }
      },
      clearValues() {
        // This is called just before the popover is shown
        this.input1 = '';
        this.input2 = '';
        this.input1Retrun = '';
        this.input2Return = '';
      }
    }
  };
</script>

<!-- popover-2.vue -->
```
### Component usage notes:
The `<b-popover>` component inserts a hidden (`display:none`) `<div>` container
element at the point in the DOM where the `<b-popover>` component is placed.  This may 
affect layout and/or styling of components such as `<b-button-group>`, `<b-button-toolbar>`,
and `<b-input-group>`. To avoid these posible layout issues, place the `<b-popover>`
component **outside** of theese types of components.

The target element **must** exist in the document before `<b-popover>` is mounted.
If the target element is not found during mount, the popover will never open. Always
place your `<b-popover>` component lower in the DOM than your target element.

## `v-b-popover` Directive Usage

Just need quick popovers without too much markup? Use the `v-b-popover` directive:

```html
<template>
    <b-coltainer fluid>

      <h4 class="mt-sm-4 ms-sm-4 text-muted">Placement</h4>
      <b-row>
        <b-col md="3" class="py-3 text-center">
          <b-btn v-b-popover.top="'I am Top'" title="Popover!" variant="primary">Top</b-btn>
        </b-col>
        <b-col md="3" class="py-3 text-center">
          <b-btn v-b-popover.left="'I am Left'" title="Popover!" variant="primary">Left</b-btn>
        </b-col>
        <b-col md="3" class="py-3 text-center">
          <b-btn v-b-popover.right="'I am Right'" title="Popover!" variant="primary">Right</b-btn>
        </b-col>
        <b-col md="3" class="py-3 text-center">
          <b-btn v-b-popover.bottom="'I am Bottom'" title="Popover!" variant="primary">Bottom</b-btn>
        </b-col>
      </b-row>

    </b-container>
</template>

<!-- popover-directive-1.vue -->
```

Refer to the [`v-b-popover` directive](/docs/directives/popover) documentation for detailed
information on the directive usage.
