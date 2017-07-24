# Collapse

> The Bootstrap `<b-collapse>` component and `v-b-toggle` directive allows you to
  toggle content visibility on your pages.

**Example 1:** Basic collapse
```html
<div>
  <p>
  <b-btn v-b-toggle.collapse1 variant="primary">Toggle Collapse</b-btn>
  </p>

  <b-collapse id="collapse1">
  <b-card>
      Collapse contents Here
      <b-btn v-b-toggle.collapse2 size="sm">Toggle Inner Collapse</b-btn>
      <b-collapse id=collapse2 class="mt-2">
      <b-card>Hello!</b-card>
      </b-collapse>
  </b-card>
  </b-collapse>
</div>
  
<!-- collapse-1.vue -->
```

**Example 2:** Accordion 
```html
<div>
  <b-btn block v-b-toggle.accordion1 variant="primary">Accordion 1</b-btn>
  <b-collapse id="accordion1" visible accordion="my-accordion">
    <b-card>
        Accordion 1 contents Here
    </b-card>
  </b-collapse>
  <b-btn block class="mt-1" v-b-toggle.accordion2 variant="primary">Accordion 2</b-btn>
  <b-collapse id="accordion2" accordion="my-accordion">
    <b-card>
        Accordion 2 contents Here
    </b-card>
  </b-collapse>
  <b-btn block class="mt-1" v-b-toggle.accordion3 variant="primary">Accordion 3</b-btn>
  <b-collapse id="accordion3" accordion="my-accordion">
    <b-card>
        Accordion 3 contents Here
    </b-card>
  </b-collapse>
</div>
  
<!-- collapse-2.vue -->
```

Other elements can easily toggle `<b-collapse>` components using the `v-b-toggle` directive.

```html
<!-- Using modifiers -->
<b-btn v-b-toggle.collapse1>Toggle Collapse</b-btn>

<!-- Using value -->
<b-btn v-b-toggle="'collapse1'">Toggle Collapse</b-btn>

<!-- element to collapse -->
<b-collapse id="collapse1">
    <b-card>
      I am collapsable content!
    </b-card>
</b-collapse>
```

To make the `<b-collapse>` show initially, set the `visible` prop:

```html
<b-btn v-b-toggle.collapse1>Toggle Collapse</b-btn>

<b-collapse visible id="collapse1">
    <b-card>
      I should start open!
    </b-card>
</b-collapse>
```

The component's collapsed (visible) state can also be set with `v-model` which binds to the visible prop:

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

You can even collapse multiple `<b-collapse>` components via a single `v-b-toggle` by 
providing multiple target ids using modifers:

```html
<b-btn v-b-toggle.collapse1.collapse2>Toggle Collapse 1 and 2</b-btn>

<!-- elements to collapse -->
<b-collapse id="collapse1">
    <b-card>
      I am collapsable content 1!
    </b-card>
</b-collapse>
<b-collapse id="collapse2">
    <b-card>
      I am collapsable content 2!
    </b-card>
</b-collapse>
```


### Accordion Support

Turn a group of `<b-collapse>` components into an accordion by supplying
an accordion group identifier via the `accordion` prop:

```html
<b-btn block v-b-toggle.collapse1>Collapsible Group 1</b-btn>
<b-collapse id="collapse1" accordion="my-accordion" visible>
    <b-card>
      Accordion Panel 1<br>
      I start opened because <code>visible</code> is <code>true</code>
    </b-card>
</b-collapse>
<b-btn block class="mt-2" v-b-toggle.collapse2>Collapsible Group 2</b-btn>
<b-collapse id="collapse2" accordion="my-accordion">
    <b-card>
      Accordion Panel 2
    </b-card>
</b-collapse>
<b-btn block class="mt-2" v-b-toggle.collapse3>Collapsible Group 3</b-btn>
<b-collapse id="collapse3" accordion="my-accordion">
    <b-card>
      Accordion Panel 3
    </b-card>
</b-collapse>
```

**Notes:**
- If using the `v-model` feature of `<b-collaspe>` in accordion mode, do not
bind the `v-model` or `visible` of all the collapses in the accordion group to the same variable.
- Ensure, at most, only one `<b-collapse>` in the accordion group has the `visible` 
prop and/or `v-model` set to `true`.

### Accessibility
The `v-b-toggle` directive will automatically add the ARIA attributes `aria-controls` and `aria-expanded`
to the component that the directive appears on.  `aria-expanded` will reflect the state of 
the tartget `<b-collapse>` component, while `aria-controls` will be set to the ID(s) 
of the target `<b-collapse>` component(s).

