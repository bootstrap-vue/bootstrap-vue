# Jumbotron

>  A lightweight, flexible component that can optionally extend the entire viewport to
   showcase key marketing messages on your site.

You set the heading and lead text via hte `header` and `lead` props, or use the
names slots `header` and `lead` if you need HTML support.

Anything else betwen the opening and closing tags will be renderd at teh bottom of the
jumbotron.

**Usage with props:**
```html
<b-jumbotron header="Bootstrap Vue" lead="Bootstrap 4 Components for Vue.js 2" >
  <p>For more information visit website</p>
  <b-btn variant="primary" href="#">Docs</b-btn>
</b-jumbotron>

<!-- jumbotron-1.vue -->
```

**Usage with slots:**
```html
<b-jumbotronlead="Bootstrap 4 Components for Vue.js 2" >
  <template slot="header">
    Bootstrap Vue
  </template>
  <template slot="lead">
    This is a simple hero unit, a simple jumbotron-style component for
    calling extra attention to featured content or information.
  </template>
  <hr class="my-4">
  <p>
    It uses utility classes for typography and spacing to space content
    out within the larger container.
  </p>
  <b-btn variant="primary" href="#">Do Something</b-btn>
</b-jumbotron>

<!-- jumbotron-2.vue -->
```

## Options

### Header
Control which tag is rendered for the header by setting the `header-tag` to the
approriate HTML element. the default is `h1`. Both the prop `header` and slot `header`
will be rendered inside this tag. If both the prop and the slot are specified, the
slot will be shown.

Control the overall size of the header text by setting the `header-level` prop to
a value between `1` and `4`, with `1` being the largest and `4` being smallest. The
default value is `3`.

### Lead
Control which tag is rendered for the lead by setting the `lead-tag` to the
approriate HTML element. the default is `p`. Both the prop `lead` and slot `lead`
will be rendered inside this tag. If both the prop and the slot are specified, the
slot will be shown.

## Fluid width
To make the jumbotron full width, and without rounded corners, set the `fluid`
prop. The innter content will automatically be placed in to a `<b-container>`
(fixed width at the various breakpoints). To change this to a fluid container,
set the `container-fluid` prop.

## Component tag
By default, `<b-jumbotron>` will render it's root element as a `div`. Change
the element tag to any other by setting the `tag` prop to the appropriate tag name.

## Variants
Conmtrol the overall background variant with the `bg-variant` prop (`info`, `danger`,
`light`, `dark`, etc), the border vriant with `border-variant` prop, and the text variant with
`text-variant` prop.
