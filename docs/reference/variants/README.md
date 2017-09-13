# Variants

> Below are the variants available when using the default Bootstrap V4 CSS.
When using Boostrap-Vue components, the variants are refered to
by their varaint name, rather than by the underlying CSS classname

## Base variants:
* `primary` - <span class="text-primary">Primary</span>
* `secondary` - <span class="text-secondary">Secondary</span>
* `success` - <span class="text-success">Succes</span>
* `warning` - <span class="text-warning">Warning</span>
* `danger` - <span class="text-danger">danger</span>
* `info` - <span class="text-info">Info</span>
* `light` - <span class="text-light">Light</span> 
* `dark` - <span class="text-dark">Dark</span>

The base variants will translate to various Bootstrap V4 contextual class
names based on the compoennt (and variant purpose) where they are used.

## Alert variants
All the **base variants**

These translate to class names `alert-<variant>`.


## Badge variants
All the **base variants**

These translate to class names `badge-<variant>.`


## Button variants
All the **base variants** plus:
* `outline-<base variant>`

These translate to class names `btn-<variant>`.


## Background and border variants
All the **base variants** plus:
* `transparent`

These translate to class names `bg-<variant>` for backgrounds and
`border-<variant>` for borders.


## Text variants
All the **base variants** plus:
* `muted`
* `white`
* `black`

These translate to class names `text-<variant>`

## Using variant classes

You may also use the underlying class names directly on elements (and some component)
via th etandard HTML `class="..."` attribute.
