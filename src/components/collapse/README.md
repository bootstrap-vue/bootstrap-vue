# Collapse

> Easily toggle visibility of almost any content on your pages. Includes support for making
> accordions.

```html
<div>
  <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <p class="card-text">Collapse contents Here</p>
      <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>Hello!</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
</div>

<!-- b-collapse.vue -->
```

## Usage

Other elements can easily toggle `<b-collapse>` components using the `v-b-toggle` directive.

```html
<div>
  <!-- Using modifiers -->
  <b-button v-b-toggle.collapse-2 class="m-1">Toggle Collapse</b-button>

  <!-- Using value -->
  <b-button v-b-toggle="'collapse-2'" class="m-1">Toggle Collapse</b-button>

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>I am collapsible content!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-usage.vue -->
```

## Initial visibility (start expanded)

To make the `<b-collapse>` show initially, set the `visible` prop:

```html
<div>
  <b-button v-b-toggle.collapse-3 class="m-1">Toggle Collapse</b-button>
  <b-collapse visible id="collapse-3">
    <b-card>I should start open!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-visible.vue -->
```

## `v-model` support

The component's collapsed (visible) state can also be set with `v-model` which binds internally to
the `visible` prop.

Note, when using `v-model` to control `<b-collapse>`, the `aria-*` attributes and class `collapsed`
are not automatically placed on the trigger button (as is the case when using the `v-b-toggle`
directive). In this example we **must control the attributes ourselves** for proper accessibility
support.

```html
<template>
  <div>
    <b-button
      :class="showCollapse ? 'collapsed' : null"
      :aria-expanded="showCollapse ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="showCollapse = !showCollapse"
    >
      Toggle Collapse
    </b-button>
    <b-collapse id="collapse-4" v-model="showCollapse" class="mt-2">
      <b-card>I should start open!</b-card>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showCollapse: true
      }
    }
  }
</script>

<!-- b-collapse-v-model.vue -->
```

## Trigger multiple collapse elements

You can even collapse multiple `<b-collapse>` components via a single `v-b-toggle` by providing
multiple target IDs using modifiers:

```html
<div>
  <!-- Single button triggers two "<b-collapse>" components -->
  <b-button v-b-toggle.collapse-a.collapse-b>Toggle Both Collapse A and B</b-button>

  <!-- Elements to collapse -->
  <b-collapse id="collapse-a" class="mt-2">
    <b-card>I am collapsible content A!</b-card>
  </b-collapse>
  <b-collapse id="collapse-b" class="mt-2">
    <b-card>I am collapsible content B!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-trigger-multiple.vue -->
```

## Accordion support

Turn a group of `<b-collapse>` components into an accordion by supplying an accordion group
identifier via the `accordion` prop. Note that only one collapse in an accordion group can be open
at a time.

```html
<template>
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block href="#" v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `
      }
    }
  }
</script>

<!-- b-accordion.vue -->
```

**Notes:**

- When using accordion mode, make sure you place the trigger elements and `<b-collapse>` components
  inside an element with `role="tablist"` and set `role="tab"` on each trigger element's container
  (each trigger element should be wrapped) in order to help screen reader users navigate the
  accordion group.
- If using the `v-model` feature of `<b-collapse>` in accordion mode, do not bind the `v-model` or
  `visible` prop of all the collapses in the accordion group to the same variable!
- Ensure, at most, only one `<b-collapse>` in the accordion group has the `visible` prop and/or
  `v-model` set to `true`. Only one collapse in an accordion group can be open at a time.

## Hiding and showing content in the toggle button based on collapse state

When using the `v-b-toggle` directive, the class `collapsed` will automatically be placed on the
trigger element when the collapse is closed, and removed when open. You can use this class to
display or hide content within the toggle via custom CSS:

**Example HTML markup:**

```html
<div>
  <b-button v-b-toggle.my-collapse>
    <span class="when-opened">Close</span> <span class="when-closed">Open</span> My Collapse
  </b-button>
  <b-collapse id="my-collapse">
    <!-- Content here -->
  </b-collapse>
</div>
```

**Example Custom CSS:**

```css
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
```

## 'Global' \$root instance events

Using `$root` instance it is possible to emit and listen events somewhere out of a component, where
`<b-collapse>` is used. In short, `$root` behaves like a global event emitters and listener. Details
about `$root` instance can be found in
[the official Vue docs](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-the-Root-Instance).

### Listening to collapses state changes via \$root events

To listen to any collapse state changes, use:

```js
export default {
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      console.log('collapseId:', collapseId)
      console.log('isJustShown:', isJustShown)
    })
  }
}
```

where `collapseId` is collapse id which changed its state; `isJustShown` is true/false, i.e.
shown/hidden collapse.

### Toggling collapses via \$root events

To toggle (open/close) a **specific collapse**, pass the collapse `id`:

```js
this.$root.$emit('bv::toggle::collapse', 'my-collapse-id')
```

## Accessibility

The `v-b-toggle` directive will automatically add the ARIA attributes `aria-controls` and
`aria-expanded` to the component that the directive appears on (as well as add the class `collapsed`
when not expanded). `aria-expanded` will reflect the state of the target `<b-collapse>` component,
while `aria-controls` will be set to the ID(s) of the target `<b-collapse>` component(s).

If using `v-model` to set the visible state instead of the directive `v-b-toggle`, you will be
required to, on the toggle element, add the `aria-controls` and other appropriate attributes and
classes yourself.

While the `v-b-toggle` directive can be placed on almost any HTML element or Vue component, it is
recommended to use a button or link (or similar component) to act as your toggler. Otherwise your
trigger elements may be inaccessible to keyboard or screen reader users. If you do place them on
something other than a button or link (or similar component), you should add the attributes
`tabindex="0"` and `role="button"` to allow users of assistive technology to reach your trigger
element.

When using accordion mode, make sure you place the trigger elements and `<b-collapse>` components
inside an element with `role="tablist"` and set `role="tab"` on each trigger element's container in
order to help screen reader users navigate the accordion group. Unfortunately, BootstrapVue cannot
apply those roles for you automatically, as it depends on your final document markup.

<!-- Component reference added automatically from component package.json -->
