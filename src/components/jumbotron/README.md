# Jumbotron

> A lightweight, flexible component that can optionally extend the entire viewport to showcase key
> marketing messages on your site.

You can set the heading and lead text via the `header` and `lead` props, or use the named slots
`header` and `lead` if you need HTML support.

Anything else between the opening and closing tags will be rendered at the bottom of the jumbotron.

**Usage with props:**

```html
<div>
  <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
    <p>For more information visit website</p>
    <b-button variant="primary" href="#">More Info</b-button>
  </b-jumbotron>
</div>

<!-- b-jumbotron.vue -->
```

**Usage with slots:**

```html
<div>
  <b-jumbotron>
    <template v-slot:header>BootstrapVue</template>

    <template v-slot:lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4">

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>

    <b-button variant="primary" href="#">Do Something</b-button>
    <b-button variant="success" href="#">Do Something Else</b-button>
  </b-jumbotron>
</div>

<!-- b-jumbotron-using-slots.vue -->
```

## Options

### Header

Control which tag is rendered for the header by setting the `header-tag` to the appropriate HTML
element. The default is `h1`. Both the prop `header` and slot `header` will be rendered inside this
tag. If both the prop and the slot are specified, the slot will be shown.

Control the overall size of the header text by setting the `header-level` prop to a value between
`1` and `4` - with `1` being the largest and `4` being smallest. The default value is `3`.

### Lead text

Control which tag is rendered for the lead text by setting the `lead-tag` to the desired HTML
element. The default is `p`. Both the prop `lead` and slot `lead` will be rendered inside this tag.
If both the prop and the slot are specified, the slot will be shown.

## Fluid width

To make `<b-jumbotron>` full width, and without rounded corners, set the `fluid` prop. The inner
content will automatically be placed into a `<b-container>` (fixed width at the various
breakpoints). To change this to a fluid container, set the `container-fluid` prop. The
`container-fluid` prop has no effect if the `fluid` prop is not set

## Component tag

By default, `<b-jumbotron>` will render its root element as a `div`. Change the element tag to any
other appropriate element by setting the `tag` prop to the desired element tag name.

## Variants

Control the overall background variant with the `bg-variant` prop ( set to `info`, `danger`,
`warning`, `light`, `dark`, etc), the border variant with the `border-variant` prop, and the text
variant with `text-variant` prop. All three props default to `null`, which will instruct the
jumbotron to use the default styling.

```html
<div>
  <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
    <template v-slot:header>BootstrapVue</template>

    <template v-slot:lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4">

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>
  </b-jumbotron>
</div>

<!-- b-jumbotron-variants.vue -->
```

<!-- Component reference added automatically from component package.json -->
