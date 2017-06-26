# Alerts

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

### Alert contextual variants
For proper styling, use one of the four required contextual variants by setting the
`variant` prop to one of the following: `info`, `success`, `warning` or `danger`.
The default is `info`.

#### Conveying meaning to assistive technologies:
Using color variants to add meaning only provides a visual indication, which will not
be conveyed to users of assistive technologies – such as screen readers. Ensure that
information denoted by the color is either obvious from the content itself (e.g. the
visible text), or is included through alternative means, such as additional text hidden
with the .sr-only class.

### Additional content inside alerts
Alerts can also contain additional HTML elements like headings and paragraphs,
which will be styles with the apropriate color matching the variant.

#### Color of links within alerts:
Use the `.alert-link` utility class to quickly provide matching colored links
within any alert.

### Dismissing
Using the `dismissible` prop it’s possible to dismiss any alert inline. This will add 
a close `X` button.  use the `dismiss-label` to change the hidden label text associated
with the dismiss button.

#### Auto dismissing alerts:
To create an alert that dismisses automatically after a period of time, set 
the `show` prop to the number of seconds you would like the alert to remain visible for.
