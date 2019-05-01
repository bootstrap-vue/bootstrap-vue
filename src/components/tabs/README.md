# Tabs

> Create a widget of tabbable panes of _local content_. The tabs component is built upon navs and
> cards internally, and provides full keyboard navigation control of the tabs.

For navigation based tabs (i.e. tabs that would change the URL), use the
[`<b-nav>`](/docs/components/nav) component instead.

## Basic usage

```html
<div>
  <b-tabs content-class="mt-3">
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>

<!-- b-tabs.vue -->
```

**Tip:** You should supply each child `<b-tab>` component a unique `key` value if dynamically adding
or removing `<b-tab>` components (i.e. `v-if` or for loops). The `key` attribute is a special Vue
attribute, see https://vuejs.org/v2/api/#key).

## Cards integration

Tabs support integrating with Bootstrap cards. Just add the `card` property to `<b-tabs>`. and place
it inside a `<b-card>` component. Note that you should add the`no-body` prop on the `<b-card>`
component in order to properly decorate the card header and remove the extra padding introduced by
`card-body`.

```html
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Tab 1" active>
        <b-card-text>Tab Contents 1</b-card-text>
      </b-tab>
      <b-tab title="Tab 2">
        <b-card-text>Tab Contents 2</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-card.vue -->
```

When `<b-tabs>` is in `card` mode, each `<b-tab>` sub-component will automatically have the
`card-body` class applied (this class provides the padding around the tab content). To disable the
`card-body` class, set the `no-body` prop on the `<b-tab>` sub component.

```html
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab no-body title="Picture 1">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=21"></b-card-img>
        <b-card-footer>Picture 1 footer</b-card-footer>
      </b-tab>

      <b-tab no-body title="Picture 2">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=25"></b-card-img>
        <b-card-footer>Picture 2 footer</b-card-footer>
      </b-tab>

      <b-tab no-body title="Picture 3">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=26"></b-card-img>
        <b-card-footer>Picture 3 footer</b-card-footer>
      </b-tab>

      <b-tab title="Text">
        <b-card-title>This tab does not have the <code>no-body</code> prop set</b-card-title>
        <b-card-text>
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
          consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex
          consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt
          veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua
          esse irure.
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-card-no-body.vue -->
```

**Note:** Setting the `no-body` prop on `<b-tab>` will have no affect when `<b-tabs>` is not in
`card` mode (as the `card-body` class is only set when in `card` mode).

Refer to the [Cards documentation](/docs/components/card) for more details on card components.

## Pills variant

Tabs use the `tabs` styling by default. Just add `pills` property to `<b-tabs>` for the pill style
variant.

```html
<div>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-pills.vue -->
```

## Fill and justify

<span class="badge badge-info small">NEW in 2.0.0-rc19</span>

Force your `<b-tabs>` controls to extend the full available width.

### Fill

To proportionately fill all available space with your tab controls, set the `fill` prop. Notice that
all horizontal space is occupied, but not every control has the same width.

```html
<div>
  <b-tabs content-class="mt-3" fill>
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Very, very long title"><p>I'm the tab with the very, very long title</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>

<!-- b-tabs-fill.vue -->
```

### Justified

For equal-width controls, use the `justified` prop instead. All horizontal space will be occupied by
the controls, but unlike using `fill` above, every control will be the same width.

```html
<div>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Very, very long title"><p>I'm the tab with the very, very long title</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>

<!-- b-tabs-justified.vue -->
```

## Alignment

<span class="badge badge-info small">NEW in 2.0.0-rc19</span>

To align your tab controls, use the `align` prop. Available values are `left`, `center` and `right`.

```html
<div>
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>

<!-- b-tabs-alignment.vue -->
```

## Bottom placement of tab controls

Visually move the tab controls to the bottom by setting the prop `end`.

```html
<div>
  <b-card no-body>
    <b-tabs pills card end>
      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-bottom.vue -->
```

**Caveats:**

- Bottom placement visually works best with the `pills` variant. When using the default `tabs`
  variant, you may want to provided your own custom styling classes, as Bootstrap V4 CSS assumes the
  tabs will always be placed on the top of the tabs content.
- To provide a better user experience with bottom placed controls, ensure that the content of each
  tab pane is the same height and fits completely within the visible viewport, otherwise the user
  will need to scroll up to read the start of the tabbed content.

**Note:** _the `bottom` prop has been deprecated in favor of the `end` prop._

## Vertical tabs

Have the tab controls placed on the lefthand side by setting the `vertical` prop to `true`. Vertical
tabs work with or without `card` mode enabled.

```html
<div>
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab Contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-vertical.vue -->
```

Visually move the tab controls to the right hand side by setting the `end` prop:

```html
<div>
  <b-card no-body>
    <b-tabs pills card vertical end>
      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab Contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-vertical-end.vue -->
```

The width of the vertical tab controls will expand to fit the width of the tab title. To control the
width, set a [width utility class](/docs/reference/size-props#sizing-utility-classes) via the prop
`nav-wrapper-class`. You can use values such as `w-25` (25% width), `w-50` (50% width), etc., or
column classes such as `col-2`, `col-3`, etc.

```html
<div>
  <b-card no-body>
    <b-tabs pills card vertical nav-wrapper-class="w-50">
      <b-tab title="Tab 1" active><b-card-text>Tab Contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab Contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab Contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
</div>

<!-- b-tabs-vertical-width.vue -->
```

Vertical placement visually works best with the `pills` variant. When using the default `tabs`
variant, you may want to provided your own custom styling classes, as Bootstrap V4 CSS assumes the
tab controls will always be placed on the top of the tabs content.

**Note:** _overflowing text may occur if your width is narrower than the tab title. You may need
additional custom styling._

## Active classes

To apply classes to the currently active control or tab use the `active-nav-item-class` and
`active-tab-class` props.

```html
<div>
  <b-tabs
    active-nav-item-class="font-weight-bold text-uppercase text-danger"
    active-tab-class="font-weight-bold text-success"
    content-class="mt-3"
  >
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>

<!-- b-tabs-classes.vue -->
```

## Fade animation

Fade is enabled by default when changing tabs. It can disabled with `no-fade` property.

## Add tabs without content

If you want to add extra tabs that do not have any content, you can put them in `tabs` slot:

```html
<div>
  <b-tabs>
    <!-- Add your b-tab components here -->
    <template slot="tabs">
      <b-nav-item href="#" @click="() => {}">Another tab</b-nav-item>
      <li class="nav-item align-self-center">Plain Text</li>
    </template>
  </b-tabs>
</div>

<!-- b-tabs-item-slot.vue -->
```

**Note:** extra (contentless) tab buttons should be a `<b-nav-item>` or have the class `nav-item`
with a root element of `<li>` and class `nav-item` for proper rendering and semantic markup.

## Add custom content to tab title

If you want to add custom content to tab title, like HTML code, icons, or another non-interactive
Vue component, this possible by using `title` slot of `<b-tab>`.

```html
<div>
  <b-tabs>
    <b-tab active>
      <template slot="title">
        <b-spinner type="grow" small></b-spinner> I'm <i>Custom</i> <strong>Title</strong>
      </template>
      <p class="p-3">Tab Contents 1</p>
    </b-tab>

    <b-tab>
      <template slot="title">
        <b-spinner type="border" small></b-spinner> Tab 2
      </template>
      <p class="p-3">Tab Contents 2</p>
    </b-tab>
  </b-tabs>
</div>

<!-- b-tabs-title-slot.vue -->
```

**Do not** place interactive elements/components inside the title slot. The tab button is a link
which does not support child interactive elements per the HTML5 spec.

## Apply custom classes to the generated nav-tabs or pills

The tab selectors are based on Bootstrap V4's `nav` markup ( i.e.
`ul.nav > li.nav-item > a.nav-link`). In some situations, you may want to add classes to the `<li>`
(nav-item) and/or the `<a>` (nav-link) on a per tab basis. To do so, simply supply the classname to
the `title-item-class` prop (for the `<li>` element) or `title-link-class` prop (for the `<a>`
element). Value's can be passed as a string or array of strings.

**Note:** _The `active` class is automatically applied to the active tabs `<a>` element. You may
need to accommodate your custom classes for this._

```html
<template>
  <div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Tab 1" :title-link-class="linkClass(0)">Tab Contents 1</b-tab>
        <b-tab title="Tab 2" :title-link-class="linkClass(1)">Tab Contents 2</b-tab>
        <b-tab title="Tab 3" :title-link-class="linkClass(2)">Tab Contents 3</b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabIndex: 0
      }
    },
    methods: {
      linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['bg-primary', 'text-light']
        } else {
          return ['bg-light', 'text-info']
        }
      }
    }
  }
</script>

<!-- b-tabs-with-classes.vue -->
```

## Keyboard navigation

Keyboard navigation is enabled by default for ARIA compliance with tablists when a tab button has
focus.

| Keypress                                                              | Action                                         |
| --------------------------------------------------------------------- | ---------------------------------------------- |
| <kbd>LEFT</kbd> or <kbd>UP</kbd>                                      | Activate the previous non-disabled tab         |
| <kbd>RIGHT</kbd> or <kbd>DOWN</kbd>                                   | Activate the next non-disabled tab             |
| <kbd>SHIFT</kbd>+<kbd>LEFT</kbd> or <kbd>SHIFT</kbd>+<kbd>UP</kbd>    | Activate the first non-disabled tab            |
| <kbd>HOME</kbd>                                                       | Activate the first non-disabled tab            |
| <kbd>SHIFT</kbd>+<kbd>RIGHT</kbd> or <kbd>SHIFT</kbd>+<kbd>DOWN</kbd> | Activate the last non-disabled tab             |
| <kbd>END</kbd>                                                        | Activate the last non-disabled tab             |
| <kbd>TAB</kbd>                                                        | Move focus to the active tab content           |
| <kbd>SHIFT</kbd>+<kbd>TAB</kbd>                                       | Move focus to the previous control on the page |

Disable keyboard navigation by setting the prop `no-key-nav`. Behavior will now default to regular
browser navigation with TAB key.

| Keypress                        | Action                                                 |
| ------------------------------- | ------------------------------------------------------ |
| <kbd>TAB</kbd>                  | Move to the next tab button or control on the page     |
| <kbd>SHIFT</kbd>+<kbd>TAB</kbd> | Move to the previous tab button or control on the page |
| <kbd>ENTER</kbd>                | Activate current focused button's tab                  |

## Programmatically activating and deactivating tabs

Use the `<b-tabs>` `v-model` to control which tab is active by setting the `v-model` to the index
(zero-based) of the tab to be shown (see example below).

Alternatively, you can use the `active` prop on each `<b-tab>` with the `.sync` modifier to activate
the tab, or to detect if a particular tab is active.

Each `<b-tab>` instance also provides two public methods to activate or deactivate the tab. The
methods are `.activate()` and `.deactivate()`, respectively. If activation or deactivation fails
(i.e. a tab is disabled or no tab is available to move activation to), then the currently active tab
will remain active and the method will return `false`. You will need a reference to the `<b-tab>` in
order to use these methods.

## Advanced examples

### External controls using `v-model`

```html
<template>
  <div>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="General">I'm the first fading tab</b-tab>
        <b-tab title="Edit profile">
          I'm the second tab
          <b-card>I'm the card in tab</b-card>
        </b-tab>
        <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
        <b-tab title="Info">I'm the last tab</b-tab>
      </b-tabs>
    </b-card>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button @click="tabIndex--">Previous</b-button>
        <b-button @click="tabIndex++">Next</b-button>
      </b-button-group>

      <div class="text-muted">Current Tab: {{ tabIndex }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabIndex: 1
      }
    }
  }
</script>

<!-- b-tabs-controls.vue -->
```

### Dynamic tabs + tabs slot

```html
<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique `key` to each tab -->
        <b-tab v-for="i in tabs" :key="`dyn-tab-${i}`" :title="`Tab ${i}`">
          Tab Contents {{ i }}
          <b-button size="sm" variant="danger" class="float-right" @click="() => closeTab(i)">
            Close tab
          </b-button>
        </b-tab>

        <!-- New Tab Button (Using tabs slot) -->
        <template slot="tabs">
          <b-nav-item @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
        </template>

        <!-- Render this if no tabs -->
        <div slot="empty" class="text-center text-muted">
          There are no open tabs<br>
          Open a new tab using the <b>+</b> button above.
        </div>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs: [],
        tabCounter: 0
      }
    },
    methods: {
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
      }
    }
  }
</script>

<!-- b-tabs-dynamic.vue -->
```

<!-- Component reference added automatically from component package.json -->
