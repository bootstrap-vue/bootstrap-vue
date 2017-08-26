# Popover

> The Popover feature, which provides a tooltip-like behavior, can be easily applied to any interactive
element via the `<b-popover>` component or `v-b-popover` directive.

## `<b-popover>` Component Usage
```html
<template>
<div>
  
  <h4 class="mt-sm-4 ms-sm-4 text-muted">Placement</h4>
  <div class="row">
    <div class="col-md-3 my-1 text-center"
         v-for="placement in ['top', 'left', 'right', 'bottom']">
      <b-btn :id="'exPopover1-'+placement" variant="primary">{{ placement }}</b-btn>
      <b-popover :target-id="'exPopover1-'+placement"
                 :placement="placement"
                 title="Popover!"
                 :content="placement">
      </b-popover>
    </div>
  </div>


  <h4 class="mt-sm-4 ms-sm-4 text-muted">Content via properties or slots</h4>
  <div class="row">
    <div class="col-md-6 my-1 text-center">
      <b-btn id="exPopover2" variant="primary">Using properties</b-btn>
      <b-popover target-id="exPopover2" 
          title="Prop Examples"
          triggers="hover focus"
          content="Embedding content using properties is easy">
      </b-popover>
    </div>
    <div class="col-md-6 my-1 text-center">
      <b-btn id="exPopover3" variant="primary">Using slots</b-btn>
      <b-popover target-id="exPopover3">
         <template slot="title">Content via Slots</template>
         Embedding content <span class="text-danger">using slots</span> affords you
         <em>greater <strong>control.</strong></em> and basic HTML support/
      </b-popover>
    </div>
  </div>

</div>  
</template>

<!-- popover-1.vue -->
```

### Advanced usage with reactive content

```html
<template>
<div>
  <h4 class="mt-sm-4 ms-sm-4 text-muted">Reactive Content</h4>
  <div class="row">
    <div class="col-12 my-3 text-center">
      <b-btn id="exPopoverReactive1" variant="primary">Using slots</b-btn>
    </div>
  </div>

  <b-popover target-id="exPopoverReactive1" trigger="click" ref="popover">
     <template slot="title">Interactive Content</template>
     <b-form-group label="Name" description="Enter your name">
        <b-form-input size="sm" v-model="input1"></b-form-input>
     </b-form-group>
     <b-form-group label="Color" description="Pick a color">
       <b-form-select size="sm" v-model="input2" :options="options"></b-form-select>
     </b-form-group>
     <b-card title="data from above">
       <p class="card-text">Name: <strong>{{ input1 }}</strong></p>
       <p class="card-text">Color: <strong>{{ input2 }}</strong></p>
     </b-card>
     <b-btn @click="onCancel" variant="danger">Cancel</b-btn>
     <b-btn @click="onOk" variant="primary">Ok</b-btn>
  </b-popover>

</div>  
</template>
<script>
  export default {
    data: {
      input1: '',
      input2: '',
      options: [{text:'- Chose 1 -', value:''},'Red','Green','Blue']
    },
    methods: {
      onCancel() {
        this.$refs.popover.$emit('close');
      },
      onOk() {
        if (!this.input1 || !this.input2) {
          alert('Please enter something');
        } else {
          alert('Thats great!');
          this.$refs.popover.$emit('close');
        }
      }
    }
  };
</script>
<!-- popover-2.vue -->
```

## `v-b-popover` Directive Usage

```html
<template>
<div>

  <h4 class="mt-sm-4 ms-sm-4 text-muted">Placement</h4>
  <div class="row">
    <div class="col-md-3 my-1 text-center">
      <b-btn v-b-popover.top="'I am Top'" title="Popover!" variant="primary">Top</b-btn>
    </div>
    <div class="col-md-3 my-1 text-center">
      <b-btn v-b-popover.left="'I am Left'" title="Popover!" variant="primary">Left</b-btn>
    </div>
    <div class="col-md-3 my-1 text-center">
      <b-btn v-b-popover.right="'I am Right'" title="Popover!" variant="primary">Right</b-btn>
    </div>
    <div class="col-md-3 my-1 text-center">
      <b-btn v-b-popover.bottom="'I am Bottom'" title="Popover!" variant="primary">Bottom</b-btn>
    </div>
  </div>

</div>
</template>

<!-- popover-directive-1.vue -->
```

Refer to the [`v-b-popover` directive](/docs/directives/popover) documentation for detailed
information on the directive usage.
