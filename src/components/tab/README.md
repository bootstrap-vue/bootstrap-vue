# Tabs

> Create tabbable panes of local content.


## Basic usage

```html
<b-tabs>
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

Tabs support integrating with bootstrap cards. Just add the `card` property to
`<b-tabs>`. Note that you should add `no-body` prop on `<b-card>` element in order
to propertly decorate the card header and remove the extra padding introduced
by `card-body`.

```html
<b-card no-body>
    <b-tabs card>
        <b-tab title="Tab 1" active>
            Tab Contents
        </b-tab>
        <b-tab title="Tab 2">
            Tab Contents 2
        </b-tab>
    </b-tabs>
</b-card>

<!-- with-card.vue -->
```

## Pills variant

Just add `pills` property to `<b-tabs>`.

```html
<b-card no-body>
    <b-tabs pills card>
        <b-tab title="Tab 1" active>
            Tab Contents
        </b-tab>
        <b-tab title="Tab 2">
            Tab Contents 2
        </b-tab>
    </b-tabs>
</b-card>

<!-- tabs-pills.vue -->
```


## Fade animation

Fade is enabled by default when changing tabs. It can disabled with `no-fade` property.

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

### External controls

```html
<template>
  <div>
    <!-- Tabs with card integration -->
    <b-card no-body>
      <b-tabs small card v-model="tabIndex">
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

<!-- tabs-controls.vue -->
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
