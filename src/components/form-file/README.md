# Form File

> Customized, cross-browser consistent, file input control that supports single file, multiple
> files, and directory upload (for browsers that support directory mode).

```html
<template>
  <div>
    <!-- Styled -->
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>

    <!-- Plain mode -->
    <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file1: null,
        file2: null
      }
    }
  }
</script>

<!-- b-form-file.vue -->
```

For cross browser consistency, `<b-form-file>` defaults to the Bootstrap custom file input to
replace the browser defaults. They're built on top of semantic and accessible markup, so it is a
solid replacement for the default file input.

## Single file (default)

On single file mode, when no file is selected or user cancels the "Browse" dialog, `v-model` is
`null` indicating no file selected. When a file is selected the return value will be a JavaScript
[`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instance.

## Multiple files

Multiple file uploading is supported by adding `multiple` prop to component. In this case `v-model`
is _always_ an `Array`. When no files are selected, an empty array will be returned. When a file or
files are selected the return value will be an array of JavaScript
[`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instances.

## Directory mode

<div class="alert alert-warning small mb-3">
  <p class="mb-0">
    <strong>CAUTION:</strong> Directory mode is a <em>non-standard</em> feature. While being
    supported by all modern browsers, it should not be relied on for production.
    Read more on <a class="alert-link" href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory">MDN</a>
    and <a class="alert-link" href="https://caniuse.com/input-file-directory">Can I use</a>.
  </p>
</div>

By adding the `directory` prop, a user can select directories instead of files. When a directory is
selected, the directory and its entire hierarchy of contents are included in the set of selected
items.

When in `directory` mode, files are returned in a nested array format by default. i.e.

```
dirA/
  - fileA1
  - fileA2
  - dirB/
    - fileB1
  - dirC/
    - fileC1
    - fileC2
dirD/
  - fileD1
```

will be returned as (or similar, file/directory order may vary):

```
[[fileA1, fileA2, [fileB1], [fileC1, fileC2]], [fileD1]]
```

If you set the `no-traverse` prop, the array will be flattened:

```
[fileA1, fileA2, fileB1, fileC1, fileC2, fileD1]
```

Each file entry will have a special `$path` prop that will contain the relative path of each file.
For nested directory structures, BootstrapVue uses its own routine to determine the relative path,
otherwise it relies on
[`File.webkitRelativePath`](https://developer.mozilla.org/en-US/docs/Web/API/File/webkitRelativePath).

Directory mode is also supported when the file input is in [`plain` mode](#non-custom-file-input) on
**most** modern browsers.

## Drag and Drop support

Drop mode is enabled by default. It can disabled by setting the `no-drop` prop. `no-drop` has no
effect in [`plain` mode](#non-custom-file-input) (some browsers support dropping files onto a plain
input file).

You can optionally set a different placeholder while dragging via the `drop-placeholder` prop or the
scoped `drop-placeholder` slot. The prop only supports plain text. Use the slot for custom HTML
markup. The slot takes precedence over the prop. The `drop-placeholder` prop/slot has no effect if
`no-drop` is set or in [`plain` mode](#non-custom-file-input).

Note that native browser constraints (such as `required`) will not work with drop mode, as the
hidden file input does not handle the drag and drop functionality and will have zero files selected.

## Limiting to certain file types

You can limit the file types by setting the `accept` prop to a string containing the allowed file
type(s). To specify more than one type, separate the values with a comma.

```html
<div>
  <!-- Accept all image formats by IANA media type wildcard-->
  <b-form-file accept="image/*"></b-form-file>

  <!-- Accept specific image formats by IANA type -->
  <b-form-file accept="image/jpeg, image/png, image/gif"></b-form-file>

  <!-- Accept specific image formats by extension -->
  <b-form-file accept=".jpg, .png, .gif"></b-form-file>
</div>
```

To accept any file type, leave `accept` as `null` (default). You can mix and match IANA media types
and extensions.

Refer to [IANA Media Types](https://www.iana.org/assignments/media-types/) for a complete list of
standard media types.

**Note:** Not all browsers support or respect the `accept` attribute on file inputs.

For drag and drop, BootstrapVue uses an internal file type checking routine and will filter out
files that do not have the correct IANA media type or extension.

## Customizing

`<b-form-file>`, when not in [`plain` mode](#non-custom-file-input), provides several features for
customizing its appearance.

### Control sizing

Use the `size` prop to control the visual size of the input. The default size is considered `md`
(medium). Optional sizes are `lg` (large) and `sm` (small). These sizes line up with the sizes
available on other form controls.

```html
<div>
  <b-form-group label="Small:" label-cols-sm="2" label-size="sm">
    <b-form-file id="file-small" size="sm"></b-form-file>
  </b-form-group>

  <b-form-group label="Default:" label-cols-sm="2">
    <b-form-file id="file-default"></b-form-file>
  </b-form-group>

  <b-form-group label="Large:" label-cols-sm="2" label-size="lg">
    <b-form-file id="file-large" size="lg"></b-form-file>
  </b-form-group>
</div>

<!-- form-file-sizes.vue -->
```

**Note:** Bootstrap v4.x does not natively support sizes for the custom file control. However,
BootstrapVue includes custom SCSS/CSS that adds support for sizing the custom file input control.

### Customize the placeholder text

Use the `placeholder` prop or the scoped `placeholder` slot to change the prompt text that is shown
when no files are selected. The prop only supports plain text. Use the slot for custom HTML markup.
The slot takes precedence over the prop.

### Customize browse button label

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

### File name formatter function

Set the prop `file-name-formatter` to a function that accepts three arguments:

| Argument             | Type  | Description                                                                   |
| -------------------- | ----- | ----------------------------------------------------------------------------- |
| [1] `files`          | Array | Flat array of `File` objects                                                  |
| [2] `filesTraversed` | Array | Array of arrays of `File` objects when in [`directory` mode](#directory-mode) |
| [3] `names`          | Array | Flat array of file names (strings)                                            |

The function should return a single formatted string (HTML is not supported). The formatter will not
be called if no files are selected.

```html
<template>
  <b-form-file multiple :file-name-formatter="formatNames"></b-form-file>
</template>

<script>
  export default {
    methods: {
      formatNames(files) {
        return files.length === 1 ? files[0].name : `${files.length} files selected`
      }
    }
  }
</script>

<!-- file-formatter-function.vue -->
```

### File name formatting via scoped slot

Alternatively, you can use the scoped slot `file-name` to render the file names. The scoped slot
will receive the following properties:

| Property         | Type  | Description                                                                   |
| ---------------- | ----- | ----------------------------------------------------------------------------- |
| `files`          | Array | Flat array of `File` objects                                                  |
| `filesTraversed` | Array | Array of arrays of `File` objects when in [`directory` mode](#directory-mode) |
| `names`          | Array | Flat array of file names (strings)                                            |

All three properties are always arrays, regardless of the setting of the `multiple` prop.

```html
<template>
  <b-form-file multiple>
   <template slot="file-name" slot-scope="{ names }">
     <b-badge variant="dark">{{ names[0] }}</b-badge>
     <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
       + {{ names.length - 1 }} More files
     </b-badge>
   </template>
  </b-form-file>
</template>

<!-- file-formatter-slot.vue -->
```

When using the `file-name` slot, the `file-name-formatter` prop is ignored. The slot **will not** be
rendered when there are no file(s) selected.

## Non custom file input

You can have `<b-form-file>` render a browser native file input by setting the `plain` prop. Note
that many of the custom features do not apply when `plain` is set.

## Contextual state feedback

Bootstrap includes validation styles for `valid` and `invalid` states on most form controls.

Generally speaking, you'll want to use a particular state for specific types of feedback:

- `false` (denotes invalid state) is great for when there's a blocking or required field. A user
  must fill in this field properly to submit the form
- `true` (denotes valid state) is ideal for situations when you have per-field validation throughout
  a form and want to encourage a user through the rest of the fields
- `null` displays no validation state (neither valid nor invalid)

To apply one of the contextual state icons on `<b-form-file>`, set the `state` prop to `false` (for
invalid), `true` (for valid), or `null` (no validation state).

**Note:** Contextual states are **not** supported when in [`plain` mode](#non-custom-file-input).

## Autofocus

When the `autofocus` prop is set on `<b-form-file>`, the input will be auto-focused when it is
inserted (i.e. **mounted**) into the document, or re-activated when inside a Vue `<keep-alive>`
component. Note that this prop **does not** set the `autofocus` attribute on the input, nor can it
tell when the input becomes visible.

## Accessibility

When using the custom version of `<b-form-file>` input which hides the original input, it is
**highly recommended** that you supply a document unique ID string via the `id` prop. This will
automatically render the extra ARIA attributes required to improve usability for persons using
assistive technologies.

## Clearing the file selection

With inputs of type file, normally the `v-model` is uni-directional (meaning you cannot pre-set the
selected files). However, you can clear the file input's selected files by setting the `v-model` to
either `null` (for single mode) or an empty array `[]` (for
[`multiple`](#multiple-files)/[`directory`](#directory-mode) mode).

Alternatively, `<b-form-file>` provides a `reset()` method that can be called to clear the file
input. To take advantage of the `reset()` method, you will need to obtain a reference to the
`<b-form-file>` component.

```html
<template>
  <div>
    <b-form-file v-model="file" ref="file-input" class="mb-2"></b-form-file>

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
        this.$refs['file-input'].reset()
      }
    }
  }
</script>

<!-- b-form-file-reset.vue -->
```

## Implementation notes

As not all browsers allow setting a value of a file input (even to `null` or an empty string),
`b-form-input` employs a technique that works cross-browser that involves changing the input type to
`null` and then immediately back to type `file`.

Nested file structures in [`directory` mode](#directory-mode) require `Promise` support in the
browser. If targeting your app for older browsers, such as IE 11, please include a polyfill that
provides `Promise` support. If `Promise` support is not detected, files will always be in a flat
file structure.

Due to a ["bug" in Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=138987), nested
file structures in [`directory` mode](#directory-mode) are currently only supported when directories
are [dropped](#drag-and-drop-support) on the file input. When selecting them via the "Browse" dialog
they will always be in a flattened array structure. Mozilla implemented the behavior
[the same way as Chromium.](https://bugzilla.mozilla.org/show_bug.cgi?id=1326031)

<!-- Component reference added automatically from component package.json -->
