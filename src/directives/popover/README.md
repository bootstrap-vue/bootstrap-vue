# Popovers

> Documentation and examples for adding BootstrapVue popovers to any element on your site, using
> Bootstrap v4 CSS for styling and animations. Popovers can be triggered by hovering, focusing, or
> clicking an element, and can contain both content and a title heading. Popovers are tooltips on
> steroids.

## Overview

Use the `v-b-popover` directive on any **element** or **component** where you would like a popover
to appear.

```html
<div class="text-center my-3">
  <b-button v-b-popover.hover="'I am popover content!'" title="Popover Title">Hover Me</b-button>
</div>

<!-- b-popover.vue -->
```

Things to know when using the popover directive:

- Popovers rely on the 3rd party library [Popper.js](https://popper.js.org/) for positioning.
- Popovers require BootstrapVue's custom SCSS/CSS in order to function correctly, and for variants.
- If both title and content is not provided (or are an empty string), the popover will not show.
- Specify container: 'body' (default) to avoid rendering problems in more complex components (like
  input groups, button groups, etc).
- Triggering popovers on hidden elements will not work.
- Popovers for `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, popovers will be centered. Use
  white-space: nowrap; on your `<a>`s, `<b-link>`s or `<router-link>`s b to avoid this behavior.
- Elements that trigger popovers should be in the document tab sequence. Add `tabindex="0"` if
  required.

## Positioning

Twelve options are available for positioning: `top`, `topleft`, `topright`, `right`, `righttop`,
`rightbottom`, `bottom`, `bottomleft`, `bottomright`, `left`, `lefttop`, and `leftbottom` aligned.
Positioning is relative to the trigger element.

<div class="bd-example bd-example-popover-static">
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: calc(50% - 8px)"></div>
    <h3 class="popover-header">Popover top</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="right: 0px"></div>
    <h3 class="popover-header">Popover topleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-top bs-popover-top-docs">
    <div class="arrow" style="left: 0px"></div>
    <h3 class="popover-header">Popover topright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: calc(50% - 4px)"></div>
    <h3 class="popover-header">Popover right</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="bottom: 0px"></div>
    <h3 class="popover-header">Popover righttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-right bs-popover-right-docs">
    <div class="arrow" style="top: 0px"></div>
    <h3 class="popover-header">Popover rightbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: calc(50% - 8px)"></div>
    <h3 class="popover-header">Popover bottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="right: 0px"></div>
    <h3 class="popover-header">Popover bottomleft</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-bottom bs-popover-bottom-docs">
    <div class="arrow" style="left: 0px"></div>
    <h3 class="popover-header">Popover bottomright</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: calc(50% - 4px)"></div>
    <h3 class="popover-header">Popover left</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="bottom: 0px"></div>
    <h3 class="popover-header">Popover lefttop</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>
  <div class="popover b-popover bs-popover-left bs-popover-left-docs">
    <div class="arrow" style="top: 0px"></div>
    <h3 class="popover-header">Popover leftbottom</h3>
    <div class="popover-body">
      Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
      quam venenatis vestibulum.
    </div>
  </div>

  <div class="clearfix"></div>
</div>

**Live example**

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.top="'Popover!'" variant="primary">Top</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.right="'Popover!'" variant="primary">Right</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.left="'Popover!'" variant="primary">Left</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottom="'Popover!'" variant="primary">Bottom</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.topright="'Popover!'" variant="primary">Top right</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.topleft="'Popover!'" variant="primary">Top left</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottomright="'Popover!'" variant="primary">Bottom right</b-button>
      </b-col>
       <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottomleft="'Popover!'" variant="primary">Bottom left</b-button>
      </b-col>
     <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.lefttop="'Popover!'" variant="primary">Left top</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.leftbottom="'Popover!'" variant="primary">Left bottom</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.righttop="'Popover!'" variant="primary">right top</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.rightbottom="'Popover!'" variant="primary">right bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-positioning.vue -->
```

## Triggers

Popovers can be triggered (opened/closed) via any combination of `click`, `hover` and `focus`. The
default trigger is `click`. Or a trigger of `manual` can be specified, where the popover can only be
opened or closed [programmatically](#hiding-and-showing-popovers-via-root-events).

If a popover has more than one trigger, then all triggers must be cleared before the popover will
close. I.e. if a popover has the trigger `focus click`, and it was opened by `focus`, and the user
then clicks the trigger element, they must click it again **and** move focus to close the popover.

```html
<div>
  <b-container fluid>
    <h5>Triggers</h5>
    <b-row class="text-center">
      <b-col md="6" class="py-3">
        <b-button v-b-popover="'Popover!'" variant="outline-success">Click (default)</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.hover="'Popover!'" variant="outline-success">Hover</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.focus="'Popover!'" variant="outline-success">Focus</b-button>
      </b-col>
      <b-col md="6" class="py-3">
        <b-button v-b-popover.hover.focus="'Popover!'" variant="outline-success">Hover + Focus</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-triggers.vue -->
```

### Making popovers work for keyboard and assistive technology users

You should only add popovers to HTML elements that are traditionally keyboard-focusable and
interactive (such as links, buttons, or form controls). Although arbitrary HTML elements (such as
`<span>`s) can be made focusable by adding the `tabindex="0"` attribute, this will add potentially
annoying and confusing tab stops on non-interactive elements for keyboard users. In addition, most
assistive technologies currently do not announce the popover in this situation.

Additionally, do not rely solely on `hover` as the trigger for your popover, as this will make your
popovers _impossible to trigger for keyboard-only users_.

### Caveats with `focus` trigger on `<button>` elements

For proper cross-browser and cross-platform behavior when using only the `focus` trigger, you must
use an element that renders the `<a>` tag, not the `<button>` tag, and you also must include a
`tabindex="0"` attribute.

The following will generate an `<a>` that looks like a button:

```html
<b-button
  href="#"
  tabindex="0"
  v-b-popover.focus="'Popover content'"
  title="Popover title"
>
  Link button with popover directive
</b-button>
```

### Dismiss on next click (self dismissing)

Use the `focus` trigger by itself to dismiss popovers on the next click that the user makes. `focus`
also makes the popover activate on both `focus` and `click` (as a click makes the element receive
focus, assuming it is in the tab sequence of the page).

You can, however, specify your trigger as `click blur`, which will make only a click activate the
popover, and either a click on the element - _or losing focus to another element or part of the
document_ - will close the popover.

This `blur` trigger must be used in combination with the `click` trigger.

The following example shows the `click blur` use case. Popovers will only open on click of the
button, and will close either on click of the button, or a click anywhere else (or a focus change
via pressing the <kbd>Tab</kbd> key). Some call this behavior _self dismissing_.

```html
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.click.blur="'Content'" title="Popover" variant="primary">Click</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-dismiss-next-click.vue -->
```

## Heading and content

There are several options for provisioning the title and content of a popover.

By default, popover will use the `title` attribute of the element as the popover heading, and the
content is passed as a string to the `v-b-popover` directive. The title and content can also be
passed as an object to `v-b-popover` in the form of

<!-- eslint-disable no-unused-vars -->

```js
const options = {
  title: 'This is the title',
  content: 'This is the content'
}
```

If your content has basic HTML markup, then you will also need to set the `html` property to true,
or use the directive modifier `html`

<!-- eslint-disable no-unused-vars -->

```js
// Object format with HTML:
const options = {
  title: 'This is the <strong>title</strong>',
  content: 'This is the <em>content<em>',
  html: true
}
```

Title and content can also be function references, which are called each time the popover is opened.
To make a value returned by the function reactive while open, set the title or content to a _new_
function reference whenever the content changes.

```html
<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover="'Content!'" title="Title from title attribute" variant="success">
          Title + Content
        </b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button
          v-b-popover.hover="{title:'Popover', content:'This is the content of popover'}"
          variant="success"
        >
          Config Object
        </b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover="popoverData" variant="success">Config from data</b-button>
      </b-col>
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.html="popoverMethod" title="Popover with HTML" variant="success">
          Method
        </b-button>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col cols="12" class="py-3">
        <b-button v-b-popover.hover="popoverConfig" variant="success">Config Object</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        counter: 0,
        timer: null
      }
    },
    computed: {
      popoverConfig() {
        // Both title and content specified as a function in this example
        // and will be called the each time the popover is opened
        return {
          html: true,
          title: () => {
            // Note this is called only when the popover is opened
            return 'Hello <b>Popover:</b> ' + ++this.counter
          },
          content: () => {
            // Note this is called only when the popover is opened
            return 'The date is:<br><em>' + new Date() + '</em>'
          }
        }
      },
      popoverData() {
        return {
          title: 'Popover Title',
          content: 'The date is ' + this.date
        }
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.date = new Date()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      popoverMethod() {
        // Returns the content as a string
        // Will be called each time the popover is opened
        return '<strong>' + new Date() + '</strong>'
      }
    }
  }
</script>

<!-- b-popover-content.vue -->
```

## Variants and custom class

BootstrapVue's popovers support contextual color variants via our custom CSS, either by using
directive modifiers or config options:

```html
<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col>
        <b-button
          v-b-popover.hover.v-danger="{ content: 'Popover content' }"
          title="Danger variant"
        >
          Danger Modifier
        </b-button>
      </b-col>
      <b-col>
        <b-button
          v-b-popover.hover="{ variant: 'info',  content: 'Popover content' }"
          title="Info variant"
        >
          Info Config
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<!-- b-popover-variants.vue -->
```

Bootstrap default theme variants are: `danger`, `warning`, `success`, `primary`, `secondary`,
`info`, `light`, and `dark`. You can change or add additional variants via Bootstrap
[SCSS variables](/docs/reference/theming)

A custom class can be applied to the popover outer wrapper <div> by using the customClass option
property:

```html
<b-button
  v-b-popover.hover="{ customClass: 'my-popover-class', content: 'Popover content' }"
  title="Popover"
>
  Button
</b-button>
```

## Directive syntax and usage

```html
<b-button v-b-popover:[container].[mod].[mod].[...].[mod]="<value>">Button</b-button>
```

Where `[container]` can be (optional):

- An element ID (minus the `#`) to place the popover markup in, when visible
- If not provided, popovers are appended to the `<body>` when visible

Where `[mod]` can be (all optional):

- Positioning: `top`, `bottom`, `left`, `right`, `auto`; or the offset alignment positions
  `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, or
  `rightbottom` (last one found wins, defaults to `right`).
- Event trigger: `click`, `hover`, `focus`, `blur` (if none specified, defaults to `click`. The
  `blur` trigger is a close handler only, and if specified by itself, will be converted to `focus`).
  Use `manual` if you only want to control the visibility manually.
- `nofade` to turn off animation.
- `html` to enable rendering raw HTML. by default HTML is escaped and converted to text.
- A delay value in the format of `d###` (where `###` is in ms, defaults to `50`), applied to both
  `hide` and `show`.
- A show delay value in the format of `ds###` (where `###` is in ms, defaults to `50`), applied to
  `show` trigger only.
- A hide delay value in the format of `dh###` (where `###` is in ms, defaults to `50`), applied to
  `hide` trigger only.
- An offset value in pixels in the format of `o###` (where `###` is the number of pixels, defaults
  to `0`. Negative values are allowed). Note if an offset is supplied, then the alignment positions
  will fallback to one of `top`, `bottom`, `left`, or `right`.
- A boundary setting of `window` or `viewport`. The element to constrain the visual placement of the
  popover. If not specified, the boundary defaults to the trigger element's scroll parent (in most
  cases this will suffice).
- A contextual variant in the form of `v-XXX` (where `XXX` is the color variant name).

Where `<value>` can be (optional):

- A string containing the **content** of the popover
- A function reference to generate the **content** of the popover (receives one argument which is a
  reference to the DOM element triggering the popover)
- An object containing more complex configuration of popover, See below for available options.

**Options configuration object properties:**

| Property            | Type                                | Default          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation`         | Boolean                             | `true`           | Apply a CSS fade transition to the popover.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `container`         | String ID or HTMLElement or `false` | `false`          | Appends the popover to a specific element. Example: `container: '#body'`. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element - which will prevent the popover from floating away from the triggering element during a window resize. When set to `false` the popover will be appended to `body`, or if the trigger element is inside a modal it will append to the modal's container. |
| `delay`             | Number or Object                    | `50`             | Delay showing and hiding the popover (ms). If a number is supplied, delay is applied to both hide/show. Object structure is: `delay: { "show": 500, "hide": 100 }`                                                                                                                                                                                                                                                                                                          |
| `html`              | Boolean                             | `false`          | Allow HTML in the popover. If true, HTML tags in the popover's title and content will be rendered in the tooltip. If false, the title and content will be inserted as plain text. Use text if you're worried about XSS attacks.                                                                                                                                                                                                                                             |
| `placement`         | String or Function                  | `'top'`          | How to position the popover - `auto`, `top`, `bottom`, `left`, `right`, `topleft`, `topright`, `bottomleft`, `bottomright`, `lefttop`, `leftbottom`, `righttop`, or `rightbottom`. When `auto` is specified, it will dynamically reorient the tooltip.                                                                                                                                                                                                                      |
| `title`             | String or Function                  | `''`             | Default title value if title attribute isn't present. If a function is given, it must return a string.                                                                                                                                                                                                                                                                                                                                                                      |
| `content`           | String or Function                  | `''`             | Default content value. If a function is given, it must return a string.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `trigger`           | String                              | `'hover focus'`  | How tooltip is triggered: `click`, `hover`, `focus`. You may pass multiple triggers; separate them with a space. Specify `'manual'` if you are only going to show and hide the tooltip programmatically.                                                                                                                                                                                                                                                                    |
| `offset`            | Number or String                    | `0`              | Offset of the popover relative to its target. For more information refer to Popper.js's offset docs.                                                                                                                                                                                                                                                                                                                                                                        |
| `fallbackPlacement` | String or Array                     | `'flip'`         | Allow to specify which position Popper will use on fallback. Can be `flip`, `clockwise`, `counterclockwise` or an array of placements. For more information refer to Popper.js's behavior docs.                                                                                                                                                                                                                                                                             |
| `boundary`          | String ID or HTMLElement            | `'scrollParent'` | The container that the popover will be constrained visually. The default should suffice in most cases, but you may need to change this if your target element is in a small container with overflow scroll. Supported values: `'scrollParent'` (default), `'viewport'`, `'window'`, or a reference to an HTML element.                                                                                                                                                      |
| `boundaryPadding`   | Number                              | `5`              | Amount of pixel used to define a minimum distance between the boundaries and the popover. This makes sure the popover always has a little padding between the edges of its container.                                                                                                                                                                                                                                                                                       |
| `variant`           | String                              | `null`           | Contextual color variant for the popover.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `customClass`       | String                              | `null`           | A custom classname to apply to the popover outer wrapper element.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `id`                | String                              | `null`           | An ID to use on the popover root element. If none is provided, one will automatically be generated. If you do provide an ID, it _must_ be guaranteed to be unique on the rendered page.                                                                                                                                                                                                                                                                                     |
| `disabled`          | Boolean                             | `false`          | Set to `true` to disable the popover                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Usage

**Simplest usage:**

```
v-b-popover="'This is a Popover!'"
```

or use the element's `title` attribute for the popover header:

```
v-b-popover title="This is a popover header"
v-b-popover="'This is popover content'" title="This is popover header"
```

or provide an object for title and content:

```
v-b-popover="{title:'Popover header', content:'Popover content'}"
```

**Enable HTML content/title:**

```html
v-b-popover.html="'<em>Emphasis</em> in content'" title="<strong>Bolded title</strong>"
```

**Placement examples:**

```
v-b-popover.top
```

**Trigger examples:**

```
v-b-popover => Default of click
v-b-popover.hover => Hover only
v-b-popover.click => Click only
v-b-popover.hover.focus => Both hover and focus
```

**Combo:**

```
v-b-popover.hover.bottom => Show on hover and place at bottom
v-b-popover.bottom.hover => Same as above
v-b-popover.bottom.click.html => Show on click and place at bottom with HTML content
```

## Hiding and showing popovers via \$root events

You can close (hide) **all open popovers** by emitting the `bv::hide::popover` event on \$root:

```js
this.$root.$emit('bv::hide::popover')
```

To close a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if one
was provided in the config object) as the first argument:

```js
this.$root.$emit('bv::hide::popover', 'my-trigger-button-id')
```

To open a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if one
was provided in the config object) as the first argument when emitting the `bv::show::popover`
event:

```js
this.$root.$emit('bv::show::popover', 'my-trigger-button-id')
```

To open all popovers simultaneously, omit the `id` argument when emitting the `bv::show::popover`
event.

These events work for both the component **and** directive versions of popover.

Note the **trigger element** must exist in the DOM and be in a visible state in order for the
popover to instantiate and show.

## Disabling and enabling popovers via \$root events

You can disable **all** popovers by emitting the `bv::disable::popover` event on \$root:

```js
this.$root.$emit('bv::disable::popover')
```

To disable a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if
one was provided in the config object) as the first argument:

```js
this.$root.$emit('bv::disable::popover', 'my-trigger-button-id')
```

To enable a **specific popover**, pass the trigger element's `id`, or the `id` of the popover (if
one was provided in the config object) as the first argument when emitting the `bv::enable::popover`
event:

```js
this.$root.$emit('bv::enable::popover', 'my-trigger-button-id')
```

To enable all popovers simultaneously, omit the `id` argument when emitting the
`bv::enable::popover` event.

These events work for both the component and directive versions of popover.

Note the **trigger element** must exist in the DOM in order for the popover to be enabled or
disabled.

## See also

- [`v-b-tooltip` directive](/docs/directives/tooltip)
- [`<b-popover>` component](/docs/components/popover)
- [`<b-tooltip>` component](/docs/components/tooltip)

<!-- Directive reference section auto generated from directive package.json -->
