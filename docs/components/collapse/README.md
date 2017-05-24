# Collapse

> The Bootstrap collapse plugin allows you to toggle content on your pages with a few classes.

Other elements can easily toggle collapse using `v-b-toggle` directive.

```html
    <!-- Using modifiers -->
    <b-btn v-b-toggle.collapse1>Toggle Collapse</b-btn>

    <!-- Using value -->
    <b-btn v-b-toggle="'collapse1'">Toggle Collapse</b-btn>
```

The collapse component can be toggled open initially using the `showOnInit` prop.

```html
<b-btn v-b-toggle.collapse1>Toggle Collapse</b-btn>

<b-collapse show-on-init id="collapse1">

    <b-card>
      I should start open!

      <b-btn v-b-toggle.collapse2 size="sm">Toggle Inner Collapse</b-btn>

      <b-collapse id=collapse2 class="mt-2">
        <b-card>
          But I'll start closed.
        </b-card>
      </b-collapse>

    </b-card>

  </b-collapse>
```
