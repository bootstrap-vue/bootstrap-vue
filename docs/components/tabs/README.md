# Tabs

> Tabs is an extension of navs, to create tabbable panes of local content, even via dropdown menus.


## Basic usage

```html
<b-tabs pills>
  <b-tab title="first" active>
    <br>I'm the first fading tab
  </b-tab>
  <b-tab title="second" >
    <br>I'm the second tab content
  </b-tab>
  <b-tab title="disabled" disabled>
    <br>Disabled tab!
  </b-tab>
</b-tabs>

<!-- basic.vue -->
```

## Cards Integration

Tabs support integrating with bootstrap cards. Just add the `card` property. Note
that you should add `no-body` prop on `<b-card>` element in order to decorate header
and remove the extra padding.

```html
<b-card no-body>
    <b-tabs ref="tabs" card>
        <b-tab title="Tab 1" active>
            <p>Tab Contents</p>
        </b-tab>
        <b-tab title="Tab 2">
            <p>Tab Contents 2</p>
        </b-tab>
    </b-tabs>
</b-card>

<!-- with-card.vue -->
```

## Pills variant

Just add `pills` property to tabs component.

## Fade animation

Fade is enabled by default when changing tabs. It can disabled with `no-fade` property.

## Position

With the `position` property you can determine on which side of the content the tabs will be placed.

### Top

This is the default position for the tabs, see previous examples

### Bottom

```html
<b-tabs position="bottom">
  <b-tab title="first" active>
    <p>I'm the first fading tab</p>
  </b-tab>
  <b-tab title="second" >
    <p>I'm the second tab content</p>
  </b-tab>
  <b-tab title="disabled" disabled>
    <p>Disabled tab!</p>
  </b-tab>
</b-tabs>

<!-- tabs-bottom.vue -->
```

### Left

For `left` and `right` positions you can set the `vertical-breakpoint` property to determine for which screensize the tabs and
content should be placed above each other.

Set the `vertical-tab-cols` property to control the width of the tabs column.


```html
<b-tabs pills position="left" vertical-breakpoint="md" vertical-tab-cols="auto">
  <b-tab title="first" active>
    <p>I'm the first fading tab</p>
  </b-tab>
  <b-tab title="second" >
    <p>I'm the second tab content</p>
  </b-tab>
  <b-tab title="disabled" disabled>
    <p>Disabled tab!</p>
  </b-tab>
</b-tabs>

<!-- tabs-left.vue -->
```

### Right

```html
<b-card no-body>
    <b-tabs card position="right" vertical-breakpoint="sm" vertical-tab-cols="6">
      <b-tab title="first" active>
        <p>I'm the first fading tab</p>
      </b-tab>
      <b-tab title="second" >
        <p>I'm the second tab content</p>
      </b-tab>
      <b-tab title="disabled" disabled>
        <p>Disabled tab!</p>
      </b-tab>
    </b-tabs>
</b-card>

<!-- tabs-right.vue -->
```

## Add Tabs without content

If you want to add extra tabs that do not have any content, you can put them in `tabs` slot:

```html
<b-tabs>
  <!-- Add your b-tab components here-->
  <template slot="tabs">
      <b-nav-item to="#" @click="onClick">Another tab</b-nav-item>
  </template>
</b-tabs>
```

## Advanced Examples

### Navigation

```html
<template>
  <div>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs small card ref="tabs" v-model="tabIndex">
        <b-tab title="General">
          I'm the first fading tab
        </b-tab>
        <b-tab title="Edit profile">
          I'm the second tab
          <b-card>I'm the card in tab</b-card>
        </b-tab>
        <b-tab title="Premium Plan" disabled>
          Sibzamini!
        </b-tab>
        <b-tab title="Info">
          I'm the last tab
        </b-tab>
      </b-tabs>
    </b-card>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-btn @click="tabIndex--">Previous</b-btn>
        <b-btn @click="tabIndex++">Next</b-btn>
      </b-button-group>
      <br>
      <span class="text-muted">Current Tab: {{tabIndex}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data: {
      tabIndex: 0
    },
  }
</script>

<!-- tabs-navigation.vue -->
```

### Dynamic Tabs

```html
<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs -->
        <b-tab :title="`Tab ${i}`" v-for="i in tabs" :key="i">
          Tab Contents {{i}}
          <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">
            Close tab
          </b-btn>
        </b-tab>

        <!-- New Tab Button (Using tabs slot) -->
        <b-nav-item slot="tabs" @click.prevent="newTab" href="#">
          +
        </b-nav-item>

        <!-- Render this if no tabs -->
        <div slot="empty" class="text-center text-muted">
          There are no open tabs
          <br> Open a new tab using + button.
        </div>
      </b-tabs>
    </b-card>

  </div>
</template>

<script>
  export default {
    data: {
      tabs: [],
      tabCounter: 0
    },
    methods: {
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1);
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++);
      }
    }
  }
</script>

<!-- dynamic-tabs.vue -->
```

## Component Reference
