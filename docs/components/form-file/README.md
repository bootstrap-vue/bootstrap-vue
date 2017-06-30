# Form File Input

> Customized, cross-browser consistant, file input control that supports single file,
multiple files, and directory upload (for browsers that support directory mode)

For cross browser consistency, Form file defaults to the Bootstrap custom file
input to replace the browser defaults. They’re built on top of semantic and accessible
markup, so it is a solid replacement for the default file input.

### Single file (default)
On single file mode, when no file is selected or user cancels Browse dialog, `v-model` is `null`
indicating no file selected. When a file is selected the return value will be a javascript
[`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instance.

### Multiple files
Multiple file uploading is supported by adding `multiple` prop to component.
In this case `v-model` is *always* an `Array`.  When no files are selected, an emopty array
will be returnd. When a file or files are selected the return value will be and aarray of
javascript [`File`](https://developer.mozilla.org/en/docs/Web/API/File) object instances.

### Directory mode
By adding `directory` prop, the user can select directories instead of files.
When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items.
The selected file system entries can be obtained using the `webkitEntries` property. 

**CAUTION** This is a non standard feature while being supported by latest Firefox and Chrome versions, and should not 
be relied for production.
[Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)

### Drag and Drop
Drop mode is enabled by default. it can disabled by setting the `no-drop` prop.

### Accept
You can limit the file types by setting the `accept` prop to a string containing the
allowed file type. To specify more than one value, separate the values with a comma.

```html
<!-- Accept all image formats by IANA media type wildcard-->
<b-form-file accept="image/*"></b-form-file>

<!-- Accept specific image formats by IANA type -->
<b-form-file accept="image/jpeg, image/png, image/gif"></b-form-file>

<!-- Accept specific image formats by extension -->
<b-form-file accept=".jpg, .png, .gif"></b-form-file>
```

To accept any file type, leve `accept` as null (default). You can mix and match IAMA
media types and extensions.

Refer to [IANA Media Types](http://www.iana.org/assignments/media-types/) for a complete
list of standard media types.

### Customizations
Language strings and chosen file name is injected using `data-` props to css `content`. 
Local customization can be easily done with provided props such as `placeholder`, `choose-label`, `selected-format` and `drop-label`.
If you want to globally change labels, you can add something like this to your global stylesheets.
Also it is advised to use [:lang()](https://developer.mozilla.org/en-US/docs/Web/CSS/:lang) for multi-language sites.

```css
/* Globally localize BootstrapVue file upload labels */

.custom-file-control::after {
    content: 'No files selected' !important;
}

.custom-file-control::before {
    content: 'Choose file' !important;
}

.custom-file .drop-here::before {
    content: 'Drop files here' !important;
}
```

### Non custom file input
You can have `b-form-file` render a browser native file input by setting the `plain` prop.

### Clearing the file selection
Because of limitations in the value binding with `<input type="file">` elements, `v-model` for `b-form-file`is
unidirectional, and cannot be used to set or clear the file(s) selection.  To get around this 
limitation `b-form-file` provides a `reset()` method that can be called to clear the file input.

To take advantage of the `reset()` method, you will need to obtain a reference to the `b-form-file` component:

```html
<div id="#app">
    <b-form-file v-model="file" ref="fileinput"></b-formfile>
    <b-button @click="clearFiles">Reset</b-button>
</div>
```

```js
window.app = new Vue({
    el: '#app',
    data: {
        file: null
    },
    methods: {
        clearFiles() {
            this.$refs.fileinput.reset();
        }
    }
});
```

