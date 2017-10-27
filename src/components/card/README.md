# Cards

> A card is a flexible and extensible content container. It includes options for headers and footers,
a wide variety of content, contextual background colors, and powerful display options.

Cards are built with as little markup and styles as possible, but still manage to deliver a
ton of control and customization. Built with flexbox, they offer easy alignment and mix well
with other components.

`<b-card>` has no fixed width to start, so they’ll naturally fill the full width of its
parent element. This is easily customized via styles or standard Bootstrap V4 sizing clases.

Change the default `div` root tag to any other HTML element by specifying via the `tag` prop

```html
<div>
  <b-card title="Card Title"
          img-src="https://lorempixel.com/600/300/food/5/"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div>

<!-- card-1.vue -->
```

## Content types

Cards support a wide variety of content, including images, text, list groups,
links and more. Below are examples of what’s supported.

### Card Body

The building block of a card is the `.card-body` section which provides a padded
section within a card. By default the `<b-card>` content is placed in the
`.card-body` section:

```html
<b-card class="text-center">
  This is some text within the default card block.
</b-card>

<!-- card-body-1.vue -->
```

Disable the `.card-body` section (and associated padding) by setting the prop `no-body`.

```html
<b-card no-body class="text-center">
  This is some text without the default card body section. Notice the lack of padding.
</b-card>

<!-- card-body-2.vue -->
```

Note that with `no-body` enabled, `title` and `sub-title` will not be rendered.

Use the `<b-card-body>` sub-componet to place your own `.card-body` anywhere
in a `<b-card>` component with `no-body` set.

#### Titles, text, and links

*Card titles* are adding via the `title` prop, and *sub titles* are added via the
`sub-title` prop. Links can be added and placed next to each other by adding
the `.card-link` class to a <a> tag (or `<b-link>`).

With class `.card-text`, text can be added to the card. Text within `.card-text`
can also be styled with the standard HTML tags.

```html
<div>
    <b-card title="Card title"
            sub-title="Card subtitle">
        <p class="card-text">
            Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
        </p>
        <a href="#"
           class="card-link">Card link</a>
        <b-link href="#"
                class="card-link">Another link</b-link>
    </b-card>
</div>

<!-- card-text-1.vue -->
```

### Images

The prop `img-src` places an image on the top of the card, and use the `img-alt` prop to
specify a string to be placed in the image's `alt` attribute. The image specified
by the `img-src` prop will be responsive and will adjust it's width when the width of the
card is changed.

```html
<div>
    <b-card-group deck>
        <b-card img-src="https://placekitten.com/1000/300"
                img-alt="Card image"
                img-top>
            <p class="card-text">
                Some quick example text to build on the card and make up the bulk of the card's content.
            </p>
        </b-card>
        <b-card img-src="https://placekitten.com/1000/300"
                img-alt="Card image"
                img-bottom>
            <p class="card-text">
                Some quick example text to build on the card and make up the bulk of the card's content.
            </p>
        </b-card>
    </b-card-group>
</div>

<!-- card-img-1.vue -->
```

Place the image in the background of the card by setting the boolean prop `overlay`:

```html
<div>
  <b-card overlay
          img-src="https://lorempixel.com/900/250/sports/6/"
          img-alt="Card Image"
          text-variant="white"
          title="Image Overlay"
          sub-title="Subtitle">
    <p class="card-text">
      Some quick example text to build on the card and make
      up the bulk of the card's content.
    </p>
  </b-card>
</div>

<!-- card-img-2.vue -->
```

### Header and footer

Add an optional header and/or footer within a card via the `header`/`footer`
props or named slots. You can control the wrapper element tags used by setting
the `header-tag` and `footer-tag` props (both default is `div`)

```html
<div>
    <b-card-group deck>
        <b-card header="featured"
                header-tag="header"
                footer="Card Footer"
                footer-tag="footer"
                title="Title">
            <p class="card-text">Header and footers using props.</p>
            <b-button href="#"
                      variant="primary">Go somewhere</b-button>
        </b-card>
        <b-card title="Title"
                header-tag="header"
                footer-tag="footer">
            <h6 slot="header"
                class="mb-0">Header Slot</h6>
            <em slot="footer">Footer Slot</em>
            <p class="card-text">Header and footers using slots.</p>
            <b-button href="#"
                      variant="primary">Go somewhere</b-button>
        </b-card>
    </b-card-group>
</div>

<!-- card-header-footer-1.vue -->
```

### Kitchen sink Example

Mix and match multiple content types to create the card you need, or throw everything in
there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in
a fixed-width card.

```html
<div>
    <b-card no-body
            style="max-width: 20rem;"
            img-src="https://placekitten.com/380/200"
            img-alt="Image"
            img-top>
        <h4 slot="header">Hello World</h4>
        <b-card-body>
            <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
        </b-card-body>
        <b-list-group flush>
            <b-list-group-item>Cras justo odio</b-list-group-item>
            <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item>Vestibulum at eros</b-list-group-item>
        </b-list-group>
        <b-card-body>
            <a href="#"
               class="card-link">Card link</a>
            <a href="#"
               class="card-link">Another link</a>
        </b-card-body>
        <b-card-footer>This is a footer</b-card-footer>
        <b-card-img src="https://placekitten.com/480/210"
                    alt="Image"
                    bottom></b-card-img>
    </b-card>
</div>

<!-- card-kitchen-1.vue -->
```

## Text variants

By default, cards use dark text and assume a light background. You can reverse that by
toggling the color of text within, as well as that of the card’s sub-components,
via the prop `text-variant`. Then, specify a dark background variant.

```html
<b-card  bg-variant="dark" text-variant="white" title="Card Title">
  <p class="card-text">
    With supporting text below as a natural lead-in to additional content.
  </p>
  <b-button href="#" variant="primary">Go somewhere</b-button>
</b-card>

<!-- card-text-1.vue -->
```

## Background and Border variants

Cards include their own variant style for quickly changing the background-color and
of a card via the `bg-variant` and `border-variant` props. Darker solid variants my require setting the
prop `text-variant` to adjust the text color.

### Solid

```html
<div>
    <b-card-group deck
                  class="mb-3">
        <b-card bg-variant="primary"
                text-variant="white"
                header="Primary"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card bg-variant="secondary"
                text-variant="white"
                header="Secondary"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card bg-variant="success"
                text-variant="white"
                header="Success"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
    </b-card-group>
    <b-card-group deck
                  class="mb-3">
        <b-card bg-variant="info"
                text-variant="white"
                header="Info"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card bg-variant="warning"
                text-variant="white"
                header="Warning"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card bg-variant="danger"
                text-variant="white"
                header="Danger"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
    </b-card-group>
    <b-card-group deck
                  class="mb-3">
        <b-card bg-variant="light"
                header="Light"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card bg-variant="dark"
                header="Dark"
                text-variant="white"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
        <b-card header="Default"
                class="text-center">
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </b-card>
    </b-card-group>
</div>

<!-- card-variants-1.vue -->
```

### Bordered

```html
<div>
  <b-card-group deck class="mb-3">
    <b-card border-variant="primary"
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
    <b-card border-variant="secondary"
            header="Secondary"
            header-border-variant="secondary"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
    <b-card border-variant="success"
            header="Success"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
  </b-card-group>
  <b-card-group deck class="mb-3">
    <b-card border-variant="info"
            header="Info"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
    <b-card border-variant="warning"
            header="Warning"
            header-bg-variant="transparent"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
    <b-card border-variant="danger"
            header="Danger"
            header-border-variant="danger"
            header-text-variant="danger"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
  </b-card-group>
  <b-card-group deck class="mb-3">
    <b-card border-variant="light"
            header="Light"
            class="text-center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
    <b-card border-variant="dark"
            header="Dark"
            align="center">
      <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </b-card>
  </b-card-group>
</div>

<!-- card-variants-2.vue -->
```

#### Variant to class mapping

BootstrapVue `<b-card>` variants are directly mapped to Bootstrap V4 card classes by
pre-pending `bg-` (for solid) or `border-` (for bordered) to the above variant names.

### Header and Footer variants

You can also apply the solid and border variants individually to card headers and footers
via the `header-bg-variant`, `header-border-variant`,  `header-text-variant`,
`footer-bg-variant`, `footer-border-variant`, and `footer-text-variant` props.

```html
<div>
  <b-card header="Card Header"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          footer="Card Footer"
          footer-tag="footer"
          footer-bg-variant="success"
          footer-border-variant="dark"
          title="Title"
          style="max-width: 20rem;"
  >
    <p class="card-text">Header and footers variants.</p>
  </b-card>
</div>

<!-- card-header-footer-variant.vue -->
```

### Conveying meaning to assistive technologies

Using color to add meaning only provides a visual indication, which will not be conveyed
to users of assistive technologies – such as screen readers. Ensure that information denoted
by the color is either obvious from the content itself (e.g. the visible text), or is
included through alternative means, such as additional text hidden with the `.sr-only` class.

## Card Groups

In addition to styling the content within cards, BootstrapVue includes a `<b-card-group>`
component for laying out series of cards. For the time being, these layout options are
not yet responsive.

### Default card group
Use card groups to render cards as a single, attached element with equal width and
height columns. Card groups use display: flex; to achieve their uniform sizing.

When using card groups with footers, their content will automatically line up.

```html
<div>
    <b-card-group>
        <b-card title="Title"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit
                longer.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
        <b-card title="Title"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This card has supporting text below as a natural lead-in to additional content.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
        <b-card title="Title"
                img-src="https://placekitten.com/g/300/450"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
    </b-card-group>
</div>

<!-- card-group-1.vue -->
```

### Card deck groups
Need a set of equal width and height cards that aren’t attached to one another? Use
card decks by setting the `deck` prop. And just like with regular card groups,
card footers in decks will automatically line up.

```html
<div>
    <b-card-group deck>
        <b-card title="Title"
                img-src="https://lorempixel.com/300/300/"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a
                natural lead-in to additional content. This content
                is a little bit longer.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
        <b-card title="Title"
                img-src="https://lorempixel.com/300/300/"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This card has supporting text below as a natural lead-in
                to additional content.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
        <b-card title="Title"
                img-src="https://lorempixel.com/300/300/"
                img-alt="Img"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </b-card>
    </b-card-group>
</div>

<!-- card-group-2.vue -->
```

### Card column groups
Cards can be organized into Masonry-like columns with by wrapping them in a `<b-card-group>`
with the prop `columns` set. Cards are built with CSS column properties instead of flexbox for
easier alignment. Cards are ordered from top to bottom and left to right.

Heads up! Your mileage with card columns may vary. To prevent cards breaking across
columns, we must set them to display: inline-block as column-break-inside: avoid
isn’t a bulletproof solution yet.

```html
<div>
    <b-card-group columns>
        <b-card title="Card title that wraps to a new line"
                img-src="https://placekitten.com/g/400/450"
                img-fluid
                img-alt="image"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit
                longer.
            </p>
        </b-card>
        <b-card header="Quote">
            <blockquote class="blockquote mb-0">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
        </b-card>
        <b-card title="Title"
                img-src="https://placekitten.com/500/350"
                img-fluid
                img-alt="image"
                img-top>
            <p class="card-text">
                This card has supporting text below as a natural lead-in to additional content.
            </p>
            <small class="text-muted">Last updated 3 mins ago</small>
        </b-card>
        <b-card bg-variant="primary"
                text-variant="white">
            <blockquote class="card-blockquote">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                </p>
                <footer>
                    <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
                </footer>
            </blockquote>
        </b-card>
        <b-card title="Title">
            <p class="card-text">
                This card has supporting text below as a natural lead-in to additional content.
            </p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </b-card>
        <b-card img-src="https://lorempixel.com/400/400/"
                img-fluid
                img-alt="image"
                overlay>
        </b-card>
        <b-card img-src="https://lorempixel.com/400/200/"
                img-fluid
                img-alt="image"
                img-top>
            <p class="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content
                than the first.
            </p>
            <div slot="footer">
                <small class="text-muted">Footer Text</small>
            </div>
        </b-card>
    </b-card-group>
</div>

<!-- card-group-3.vue -->
```

## Component Reference
