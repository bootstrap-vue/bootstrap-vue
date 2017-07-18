# Columns

>  Bootstrap includes a powerful mobile-first flexbox grid system for building layouts of all shapes and sizes.
   It’s based on a 12 column layout and has multiple tiers, one for each [media query range](https://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints). BootstrapVue helps simplify using the predefined classes.

```html
<div id="app">
    <div class="container">
        <div class="row">
            <b-col>
                <h2>Grid Columns</h2>
            </b-col>
        </div>
    </div>
    <div class="bv-example-row">
        <div class="container">

            <div class="row">
                <b-col class="header">
                    <h3>Equal Width</h3>
                </b-col>
            </div>
            <div class="row">
                <b-col>1 of 2</b-col>
                <b-col>1 of 2</b-col>
            </div>
            <div class="row">
                <b-col>1 of 3</b-col>
                <b-col>1 of 3</b-col>
                <b-col>1 of 3</b-col>
            </div>

            <div class="row">
                <b-col class="header">
                    <h3>Setting one column width</h3>
                </b-col>
            </div>
            <div class="row">
                <b-col>1 of 3</b-col>
                <b-col cols="5">2 of 3 (cols = 5)</b-col>
                <b-col>3 of 3</b-col>
            </div>
            <div class="row">
                <b-col>1 of 3</b-col>
                <b-col cols="6">2 of 3 (cols = 6)</b-col>
                <b-col>3 of 3</b-col>
            </div>


            <div class="row">
                <b-col class="header">
                    <h3>Variable width content</h3>
                </b-col>
            </div>
            <div class="row justify-content-md-center">
                <b-col col
                       lg="2">1 of 3</b-col>
                <b-col cols="12"
                       md="auto">Variable width content</b-col>
                <b-col col
                       lg="2">3 of 3</b-col>
            </div>
            <div class="row">
                <b-col>1 of 3</b-col>
                <b-col cols="12"
                       md="auto">Variable width content</b-col>
                <b-col col
                       lg="2">3 of 3</b-col>
            </div>


            <div class="row">
                <b-col class="header">
                    <h3>Equal-width multi-row</h3>
                </b-col>
            </div>
            <div class="row">
                <b-col>col</b-col>
                <b-col>col</b-col>
                <div class="w-100"></div>
                <b-col>col</b-col>
                <b-col>col</b-col>
            </div>

            <div class="row">
                <b-col class="header">
                    <h3>All breakpoints</h3>
                </b-col>
            </div>
            <div class="row">
                <b-col>col</b-col>
                <b-col>col</b-col>
                <b-col>col</b-col>
                <b-col>col</b-col>
            </div>
            <div class="row">
                <b-col cols="8">col-8</b-col>
                <b-col cols="4">col-4</b-col>
            </div>

            <div class="row">
                <b-col class="header">
                    <h3>Stacked to horizontal</h3>
                </b-col>
            </div>
            <div class="row">
                <b-col sm="8">col-sm-8</b-col>
                <b-col sm="4">col-sm-4</b-col>
            </div>
            <div class="row">
                <b-col sm>col-sm</b-col>
                <b-col sm>col-sm</b-col>
                <b-col sm>col-sm</b-col>
            </div>

            <div class="row">
                <b-col class="header">
                    <h3>Mix and match</h3>
                </b-col>
            </div>
            <!-- Stack the columns on mobile by making one full-width and the other half-width -->
            <div class="row">
                <b-col md="8">.col .col-md-8</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
            </div>

            <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
            <div class="row">
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
                <b-col cols="6"
                       md="4">.col-6 .col-md-4</b-col>
            </div>

            <!-- Columns are always 50% wide, on mobile and desktop -->
            <div class="row">
                <b-col cols="6">.col-6</b-col>
                <b-col cols="6">.col-6</b-col>
            </div>
        </div>
    </div>
</div>

<!-- col.vue -->
```
