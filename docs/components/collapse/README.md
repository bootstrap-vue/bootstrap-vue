# Collapse

> The Bootstrap collapse plugin allows you to toggle content on your pages with a few classes.

Other elements can easily toggle collapse using `v-b-toggle` directive.

```html
<!-- Using modifiers -->
<b-btn v-b-toggle.collapse1>Toggle Collapse</b-btn>

<!-- Using value -->
<b-btn v-b-toggle="'collapse1'">Toggle Collapse</b-btn>
```

The component's collapsed state can also be set with `v-model`.

```html
<b-btn @click="showCollapse = !showCollapse">Toggle Collapse</b-btn>

<b-collapse v-model="showCollapse" id="collapse1">
    <b-card>
      I should start open!
    </b-card>
</b-collapse>

<script>
{
    // inside the vue
    data() {
        return {
            showCollapse: true
        }
    }
}
</script>
```

### Accodion Support

Turn a group of collapses into an accordion by supplying the accordion group
identifier via hte `accordion` prop.

```html
<b-btn class='d-block" v-b-toggle.collapse1>Collapsible Group 1</b-btn>
<b-collapse id="collapse1" accodion="my-accordion" visible>
    <b-card>
      Accordion Panel 1<br>
      I start opened because <code>visible</code> is <code>true</code>
    </b-card>
</b-collapse>
<b-btn class='d-block" v-b-toggle.collapse2>Collapsible Group 2</b-btn>
<b-collapse id="collapse2" accodion="my-accordion">
    <b-card>
      Accordion Panel 2
    </b-card>
</b-collapse>
<b-btn class='d-block" v-b-toggle.collapse3>Collapsible Group 3</b-btn>
<b-collapse id="collapse3" accodion="my-accordion">
    <b-card>
      Accordion Panel 3
    </b-card>
</b-collapse>
```
