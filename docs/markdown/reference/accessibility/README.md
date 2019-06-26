# Accessibility

> A brief overview of BootstrapVue's features and limitations for the creation of accessible
> content.

## Overview and Limitations

BootstrapVue will automatically add in the appropriate accessibility markup for most interactive
components. But the overall accessibility of any project built with Bootstrap and BootstrapVue
depends in large part on the author's markup, additional styling, and scripting they've included.
However, provided that these have been implemented correctly, it should be perfectly possible to
create websites and applications with BootstrapVue that fulfill
<a href="https://www.w3.org/TR/WCAG20/"><abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
2.0</a> (A/AA/AAA), <a href="https://www.section508.gov/">Section 508</a> and similar accessibility
standards and requirements.

## Structural markup

BootstrapVue's custom components have been optimized for accessible/semantic generated HTML markup
out of the box. This documentation aims to provide developers with best practice examples to
demonstrate the use of Bootstrap itself and illustrate appropriate semantic markup, including ways
in which potential accessibility concerns can be addressed.

Most component documentation pages include an accessibility section (or sections) noting best
practices and limitations.

## Interactive components

BootstrapVue's interactive components — such as modal dialogs, dropdown menus and custom tooltips —
are designed to work for touch, mouse and keyboard users. Through the use of relevant
<a href="https://www.w3.org/WAI/standards-guidelines/aria/">
<abbr title="Web Accessibility Initiative">WAI</abbr>-<abbr title="Accessible Rich Internet Applications">ARIA</abbr>
</a> roles and attributes, these components should also be understandable and operable using
assistive technologies (such as screen readers).

Because BootstrapVue's components are purposely designed to be fairly generic, authors may need to
include further <abbr title="Accessible Rich Internet Applications">ARIA</abbr> roles and
attributes, as well as JavaScript behavior, to more accurately convey the precise nature and
functionality of their component. This is usually noted in the documentation.

## Color contrast

Most colors that currently make up Bootstrap V4's default palette — used throughout the framework
for things such as button variations, alert variations, form validation indicators — lead to
<em>insufficient</em> color contrast (below the recommended
[WCAG 2.0 color contrast ratio of 4.5:1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html))
when used against a light background. Authors will need to manually modify/extend these default
colors to ensure adequate color contrast ratios.

Refer to the [Theming](/docs/reference/theming) section for customizing Bootstrap's SCSS.

## Visually hidden content

Content which should be visually hidden, but remain accessible to assistive technologies such as
screen readers, can be styled using the `.sr-only` class. This can be useful in situations where
additional visual information or cues (such as meaning denoted through the use of color) need to
also be conveyed to non-visual users.

```html
<p class="text-danger">
  <span class="sr-only">Danger: </span>
  This action is not reversible
</p>
```

For visually hidden interactive controls, such as traditional "skip" links, class `.sr-only` can be
combined with the `.sr-only-focusable` class. This will ensure that the control becomes visible once
focused (for sighted keyboard users).

```html
<a class="sr-only sr-only-focusable" href="#content">Skip to main content</a>
```

## Reduced motion

Bootstrap includes support for the
[`prefers-reduced-motion` media feature](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion).
In browsers/environments that allow the user to specify their preference for reduced motion, most
CSS transition effects in Bootstrap (for instance, when a modal dialog is opened or closed, or the
sliding animation in carousels) will be disabled.

If you are expecting animations and/or transitions to work and they are not, then you may have the
reduced motion (no animation) setting enabled in your operating system control panel.

## Additional resources

- <a href="https://getbootstrap.com/docs/4.3/getting-started/accessibility/" rel="noopener">Bootstrap
  v4 Accessibility Documentation</a>
- <a href="https://www.w3.org/TR/WCAG20/" rel="noopener">Web Content Accessibility Guidelines (WCAG)
  2.0</a>
- <a href="https://a11yproject.com/" rel="noopener">The A11Y Project</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility" rel="noopener">MDN
  accessibility documentation</a>
- <a href="https://tenon.io/" rel="noopener">Tenon.io Accessibility Checker</a>
- <a href="https://developer.paciellogroup.com/resources/contrastanalyser/" rel="noopener">Colour
  Contrast Analyser (CCA)</a>
- <a href="https://github.com/squizlabs/HTML_CodeSniffer" rel="noopener">"HTML CodeSniffer"
  bookmarklet for identifying accessibility issues</a>
