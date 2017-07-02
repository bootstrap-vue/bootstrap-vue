# Tabs

> Tabs is an extension of navs, to create tabbable panes of local content, even via dropdown menus.

```html
<template>
<div>
  <!-- Tabs with card integration -->
  <b-card no-block>
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
    </b-tabs>

  </b-card>

  <!-- Control buttons-->
  <div class="text-center">
    <b-button-group class="mt-2">
      <b-btn @click="$refs.tabs.previousTab()">Previous</b-btn>
      <b-btn @click="$refs.tabs.nextTab()">Next</b-btn>
    </b-button-group>
    <br>
    <span class="text-muted">Current Tab: {{tabIndex}}</span>
  </div>

  <br>
  <br>

  <b-card no-block>
    <b-tabs card>
      <!-- Render Tabs -->
      <b-tab :title="`Tab ${i}`" v-for="i in tabs" :key="i">
        Tab Contents {{i}}
        <b-btn size="sm" variant="danger" class="float-right" @click="()=>closeTab(i)">Close tab
        </b-btn>
      </b-tab>

      <!-- Newtab Button (Using tabs slot) -->
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
    tabIndex: null,
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

<!-- tabs.vue -->
```

### Basic usage

```html
<b-tabs>
  <b-tab title="first" active>
    I'm the first fading tab
  </b-tab>
  <b-tab title="second" >
    I'm the second tab content
  </b-tab>
  <b-tab title="disabled" disabled>
    <b-card>I'm the card in tab</b-card>
  </b-tab>
</b-tabs>
```

### Cards Integration

Tabs support integrating with bootstrap cards. Just add `card` property. Note that you should add `no-block` prop on `<b-card>` element in order to decorate header.

```html
<b-card no-block>
    <b-tabs ref="tabs" v-model="tabIndex" card>
        <b-tab title="Tab 1" active>
            Tab Contents
        </b-tab>
    </b-tabs>
</b-card>
```

### Pills variant

Just add `pills` property to tabs component.

### Fade

Fade is enabled by default when changing tabs. It can disabled with `no-fade` property.

### Add Tabs without content

If you want to add extra tabs that do not have any content, you can put them in `tabs` slot:

```html
    <b-tabs>
    
        <!-- Add your tabs here-->
    
        <template slot="tabs">
            <b-nav-item to="#" @click="onClick">Another tab</b-nav-item>
        </template>
    </b-tabs>
```
