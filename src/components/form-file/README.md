# Form File Input

> Customized, cross-browser consistent, file input control that supports single file, multiple
> files, and directory upload (for browsers that support directory mode)

```html
<template>
  <div>
    <!-- Styled -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
    />
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

    <!-- Plain mode -->
    <b-form-file v-model="file2" class="mt-3" plain />
    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null,
        file2: null
      }
    }
  }
</script>

<!-- b-form-file.vue -->
```

For cross browser consistency, Form file defaults to the Bootstrap custom file input to replace the
browser defaults. They’re built on top of semantic and accessible markup, so it is a solid
replacement for the default file input.

## Single file (default)

On single file mode, when no file is selected or user cancels Browse dialog, `v-model` is `null`
indicating no file selected. When a file is selected the return value will be a JavaScript
[`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instance.

## Multiple files

Multiple file uploading is supported by adding `multiple` prop to component. In this case `v-model`
is _always_ an `Array`. When no files are selected, an empty array will be returned. When a file or
files are selected the return value will be an array of JavaScript
[`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instances.

## Directory mode

By adding `directory` prop, the user can select directories instead of files. When a directory is
selected, the directory and its entire hierarchy of contents are included in the set of selected
items. The selected file system entries can be obtained using the `webkitEntries` property.

**CAUTION** This is a non standard feature while being supported by latest Firefox and Chrome
versions, and should not be relied for production.
[Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)

Directory mode is not supported when the file input is in plain mode.

## Drag and Drop support

Drop mode is enabled by default. It can disabled by setting the `no-drop` prop. `no-drop`has no
effect in plain mode.

You can optionally set a different placeholder while dragging via the `drop-placeholder` prop. The
default is no drop placeholder text. Only plain text is supported. HTML and components are not
supported. The `drop-placeholder` prop has no effect if `no-drop`is set or in `plain` mode,

## Limiting to certain file types

You can limit the file types by setting the `accept` prop to a string containing the allowed file
type(s). To specify more than one type, separate the values with a comma.

```html
<div>
  <!-- Accept all image formats by IANA media type wildcard-->
  <b-form-file accept="image/*" />

  <!-- Accept specific image formats by IANA type -->
  <b-form-file accept="image/jpeg, image/png, image/gif" />

  <!-- Accept specific image formats by extension -->
  <b-form-file accept=".jpg, .png, .gif" />
</div>
```

To accept any file type, leave `accept` as null (default). You can mix and match IANA media types
and extensions.

Refer to [IANA Media Types](http://www.iana.org/assignments/media-types/) for a complete list of
standard media types.

**Note:** Not all browsers support or respect the `accept` attribute on file inputs.

## Customize the placeholder text

Use the prop `placeholder` to change the prompt text that is shown when no files are selected. Only
plain text is supported. HTML and components are not supported.

## Customize browse button label

If you want to globally change `Browse` label, you can add something like this to your global
stylesheets. Also it is advised to use
[:lang()](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang) for multi-language sites.

```css
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Browse';
}
```

Alternatively you can set the content of the custom file browse button text via the `browse-text`
prop. Note, only plain text is supported. HTML and components are not supported.

## Non custom file input

You can have `<b-form-file>` render a browser native file input by setting the `plain` prop. Note
that many of the customer form-file features do not apply when `plain` is set.

## Contextual state feedback

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you’ll want to use a particular state for specific types of feedback:

- `'invalid'` is great for when there’s a blocking or required field. A user must fill in this field
  properly to submit the form.
- `'valid'` is ideal for situations when you have per-field validation throughout a form and want to
  encourage a user through the rest of the fields.
- `null` Displays no validation state

To apply one of the contextual state icons on `<b-form-file`, set the `state` prop to `'invalid'`
(or `false`), `'valid'` ( or `true`), or `null`.

## Accessibility

When using the custom version of `<b-form-file>` input which hides the original input, it is
**highly recommended** that you supply a document unique ID string via the `id` prop. This will
automatically render the extra ARIA attributes required to improve usability for persons using
assistive technologies.

## Clearing the file selection

With inputs of type file, normally the `v-model` is uni-directional (meaning you cannot pre-set the
selected files). However, you can clear the file input's selected files by setting the `v-model` to
either `null`, an empty string, or an empty array).

Alternatively, `<b-form-file>` provides a `reset()` method that can be called to clear the file
input. To take advantage of the `reset()` method, you will need to obtain a reference to the
`<b-form-file>` component.

```html
<template>
  <div>
    <b-form-file v-model="file" ref="fileinput" class="mb-2" />

    <b-button @click="clearFiles" class="mr-2">Reset via method</b-button>
    <b-button @click="file = null">Reset via v-model</b-button>

    <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null
      }
    },
    methods: {
      clearFiles() {
        this.$refs.fileinput.reset()
      }
    }
  }
</script>

<!-- b-form-file-reset.vue -->
```

**Implementation note:** As not all browsers allow setting a value of a file input (even to null or
an empty string), `b-form-input` employs a technique that works cross-browser that involves changing
the input type to null and then back to type file.

<!-- Component reference added automatically from component package.json -->
