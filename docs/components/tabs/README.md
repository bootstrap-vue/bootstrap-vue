# Tabs

> Tabs is an extension of navs, to create tabbable panes of local content, even via dropdown menus.


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
