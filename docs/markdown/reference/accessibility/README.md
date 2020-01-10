# Accessibility

> A brief overview of BootstrapVue's features and limitations for the creation of accessible
> content.

## Overview and Limitations

BootstrapVue will automatically add in the appropriate accessibility markup for most interactive
components. But the overall accessibility of any project built with Bootstrap and BootstrapVue
depends in large part on the author's markup, additional styling, and scripting they've included.
However, provided that these have been implemented correctly, it should be perfectly possible to
create websites and applications with BootstrapVue that fulfill
<a href="https://www.w3.org/TR/WCAG20/" target="_blank" rel="noopener">
<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0</a> (A/AA/AAA),
<a href="https://www.section508.gov/" target="_blank" rel="noopener">Section 508</a> and similar
accessibility standards and requirements.

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
<a href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank" rel="noopener">
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

## Testing your application for accessibility

It is highly recommended to test your app for accessibility before deployment. Note that some
countries even have laws
[requiring all websites to be accessible](https://webaim.org/articles/laws/world/).

There are just two main things to think about when making your web app accessible:

- Defining the right keyboard behavior. BootstrapVue provides keyboard control for most of our
  components, but you should make sure your custom components are also keyboard accessible.
- Making it possible for screen readers to understand your app. Bootstrap, in most situations, will
  automatically set the correct `role` and `aria-*` attributes on our components. You should also
  make sure that all of your custom components provide the correct roles and attributes (use
  semantic HTML elements and markup where possible).

Steps you should do for testing:

- Try using the _keyboard only_ to see if all interactive components can be reached and controlled.
  Ensure that controls have focus styling so that the user knows which interactive element they are
  on. Remember, keyboard user _cannot_ trigger an element's `hover` state.
- Use a screen reader (combined with keyboard only) to navigate and interact with your app. There
  are several free screen readers available for various operating systems and browsers. Remember
  that screen reader users can only "see" what they hear.
- See how your app looks and works when increasing the zoom level (and/or font size) of your
  browser.

## Additional resources

- [Bootstrap v4 Accessibility Documentation](https://getbootstrap.com/docs/4.4/getting-started/accessibility/)
- [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20/)
- [The A11Y Project](https://a11yproject.com/)
- [MDN accessibility documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Tenon.io Accessibility Checker](https://tenon.io/)
- [Colour Contrast Analyser (CCA)](https://developer.paciellogroup.com/resources/contrastanalyser/)
- ["HTML CodeSniffer" bookmarklet for identifying accessibility issues](https://github.com/squizlabs/HTML_CodeSniffer)
