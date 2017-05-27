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
