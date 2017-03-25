# Form File

On single file mode, when no file is selected or user cancels Browse dialog `v-model` is `null` indicating no file selected.
Also drop mode is enabled by default. it can disabled by setting `no-drop` prop.

### Multiple files
Multiple file uploading is supported by adding `multiple` prop to component.
In this case `v-model` is *always* an `Array`.   

### Directory mode

By adding `directory` prop, the user can select directories instead of files.
When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items.
The selected file system entries can be obtained using the `webkitEntries` property. 

**CAUTION** This is a non standard feature while being supported by latest Firefox and Chrome versions, and should not 
be relied for production.
[Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)

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


