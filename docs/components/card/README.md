# Cards

>  A card is a flexible and extensible content container. It includes options for headers and footers,
   a wide variety of content, contextual background colors, and powerful display options.

```html
<div>
    <!-- Simple -->
    <b-card class="mb-2" variant="success">Simple Card</b-card>

    <!-- Standard -->
    <b-card header="Card header text"
            class="mb-2"
            title="Card title"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
            Last updated 3 mins ago
        </small>
    </b-card>

    <b-card class="mb-2"
            title="Card title"
            sub-title="Card subtitle"
    >
        <h3 slot="header" class="m-0 p-0">Slot header</h3>
        <small slot="footer" class="text-muted">
            Last updated 3 mins ago
        </small>
    </b-card>

    <!-- With image -->
    <b-card img="http://placeskull.com/200/200/ABABAB/-1/0"
            title="Skulls are nice"
            class="mb-2"
    >
        This is my opinion :)
    </b-card>

    <!-- Overlay image -->
    <b-card overlay
            img="http://placeskull.com/200/200/E8117F/-1/0"
            class="mb-2"
    >
        Overlay cards are cute!
    </b-card>

  <!-- Group -->
  <b-card-group>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Basic Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Basic Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
  </b-card-group>

  <!-- Group -->
  <b-card-group deck>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Deck Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Deck Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
  </b-card-group>

  <!-- Group -->
  <b-card-group columns>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Column Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
    <b-card header="<code>b-card-group</code>"
            class="mb-2"
            title="Column Group"
            sub-title="Card subtitle"
    >
        <small slot="footer" class="text-muted">
        Last updated 3 mins ago
        </small>
    </b-card>
  </b-card-group>
</div>

<!-- card.vue -->
```
