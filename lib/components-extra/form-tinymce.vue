<template>
  <component :is="tag"
             :id="id || null"
             :disabled="disabled && tag === 'textarea'"
             :class="componentClasses"
             ref="ed"
             v-html="value"></component>
</template>

<script>
  const inBrowser = document !== undefined && window !== undefined;

  // Requires TinyMCE to be loaded first. v4.6.4 and up preferably
  // import tinymce from 'tinymce';

  import { warn } from '../utils';
  import { keys, assign } from '../utils/object';

  // Utility function to determine if element is within viewport
  function isElementInView(el) {
    if (el && document.body.contains(el)) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    return false;
  }

  // Merge two objects and return a new object
  function merge(a,b) {
    return assign(
      {},
      (a && keys(a).length > 0) ? a : {},
      (b && keys(b).length > 0) ? b : {}
    );
  }

  // Returns an option object is the 2nd arg is truthy and has keys
  function objToOption(key, obj) {
    const o = {};
    if (obj && keys(obj).length > 0) {
      o[key] = obj;
    }
    return o;
  }

  export default {
    model: {
      prop: 'value',
      event: 'value'
    },
    data() {
      return {
        // Saved Content
        content: this.initial || this.value || '',
        // Reference to tinymce editor instance
        editor: null
      };
    },
    props: {
      // Form Control options
      id: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      noFormControl: {
        // Dont add class `form-control`
        type: Boolean,
        default: false
      },
      // Initial value for editor content, if provided
      initial: {
        type: String,
        default: '',
        editor: null
      },
      // Current value for v-model
      value: {
        type: String,
        default: ''
      },
      // component element tag
      tag: {
        type: String,
        default: 'div'
      },
      // tinymce options
      options: {
        type: Object,
        default: {}
      },
      // tinymce helper options
      toolbar: {
        type: [String, Array, Boolean],
        default: null
      },
      toolbarSize: {
        type: String,
        default: ''
      },
      menu: {
        type: Object,
        default: null
      },
      menubar: {
        type: [String, Boolean],
        default: null
      },
      plugins: {
        type: String,
        default: null
      },
      externalPlugins: {
        type: Object,
        defult: null
      },
      hideStatusbar: {
        type: Boolean,
        default: false
      },
      validElements: {
        type: String,
        default: null
      },
      extendedValidElements: {
        type: String,
        default: null
      },
      invalidElements: {
        type: String,
        default: null
      },
      contentCss: {
        type: [String, Array, Boolean],
        default: null
      },
      contentStyle: {
        type: [String, Array, Boolean],
        default: null
      },
      bodyClass: {
        type: String,
        default: null
      },
      // Editor and preview minimum height
      minHeight: {
        type: Number,
        defunat: null
      }
    },

    computed: {
      isEditing() {
        return !this.disabled;
      },
      componentClasses() {
        if (this.noFormControl) {
            return [];
        }
        return [
          'form-control',
          (!this.isEditing && this.tag !== 'textarea') ? 'form-control-static' : ''
        ]
      },
      componentStyles() {
        if (this.minHeight && this.minHeight > 0) {
          return { minHeight: this.minHeight + 'px'};
        } 
        return {};
      },
      btnSize() {
        // Toolbar button size options object
        let size = this.toolbarSize;
        if (size ==='sm') {
          size = 'small';
        } else if (size === 'lg') {
          size = 'large'
        }
        return size ? { toolbar_items_size: size } : {};
      },
      opts() {
        // Generate tinymce init options

        const options = assign({}, (this.options && keys(this.options).length > 0) ? this.options : {});

        // Ensure there isn't a 'selector' property, as we use 'target' (below)
        opts.selector = null;
        delete opts.selector;

        // Merge options. Helper props take precidence over this.options
        const opts = assign(
          options,
          objToOption('menu', merge(options.menu, this.menu)),
          objToOption('external_plugins', merge(options.external_plugins, this.externalPlugins)),
          (this.menubar === null || this.menubar === '' || this.menubar === true) ? {} : { menubar: this.menubar },
          (this.toolbar === null || this.toolbar === '' || this.toolbar === true) ? {} : { toolbar: this.toolbar },
          this.plugins ? { plugins: this.plugins } : {},
          this.btnSize,
          this.hideStatusbar ? { statusbar: false } : {},
          this.validElements ? { valid_elements: this.validElements } : {},
          this.extendedValidElements ? { extended_valid_elements: this.extendedValidElements } : {},
          this.invalidElements ? { ivalid_elements: this.invalidElements } : {},
          this.contentCss ? { content_css: this.contentCss } : {},
          this.bodyClass ? { body_class: this.bodyClass } : {},
          this.contentStyle ? { content_style: this.contntStyle } : {},
          (this.minHeight && this.minHeight > 0) ? { min_height: this.minHeight }, {},
          {
            branding: false,
            target: this.$refs.ed,
            hidden_input: false,
            setup: this.setupMce
          }
        );

        // Return the computed options
        return opts;
      }
    },

    watch: {
      isEditing(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        if (newVal) {
          // Enable Editor
          this.showEditor();
        } else {
          // Disble Editor
          this.hideEditor();
        }
      },
      busy(busyState, oldVal) {
        if (busyState === oldVal || !this.editor) {
          return;
        }
        // Set/Clear editor busy State
        this.editor.setProgressState(busyState);
      },
      readonly(roState, oldVal) {
        if (roState === oldVal || !this.editor) {
          return;
        }
        this.editor.setMode(roState ? 'readonly' : 'design');
      }
    },

    methods: {
      setupMce(editor) {
        // Save a reference of the editor instance
        this.editor = editor;

        // Set the intial content when the editor opens
        editor.on('init', (edEvt) => {
          if (this.content) {
            editor.setContent(this.content);
          }
          if (!this.noFormControl) {
              // Add class form-control to allow fieldssets to apply state styling
              editor.editorContainer.classList.add('form-control');
          }
          this.$emit('value', editor.getContent());
          editor.save();
          editor.setDirty(false);
          editor.undoManager.clear();
          editor.setMode(this.readonly ? 'readonly' : 'design');
          editor.setProgressState(this.busy);
        });

        // When the editor is removed
        editor.on('remove', () => {
          // Ensure our original element is visible (tinymce forgets to do this)
          this.$refs.ed.removeAttribute('aria-hidden');
          this.$refs.ed.style.display = '';
          this.clearFullScreen();
          this.editor = null;
        });

        // Handle content update
        editor.on('NodeChange Change KeyUp', () => {
          this.$emit('value', editor.getContent());
        });

        // Handle change event
        editor.on('change', (edEvt) => {
          this.$emit('change', editor.getContent(), edEvt);
        });

        // When the editor is considred dirty
        editor.on('dirty', (edEvt) => {
          this.$emit('dirty', edEvt);
        });

        // When the editor is focused
        editor.on('focus', (edEvt) => {
          this.$emit('focus', edEvt);
        });

        // When the editor is blurred
        editor.on('blur', (edEvt) => {
          this.$emit('blur', edEvt);
        });

        // When the editor leaves fullscreen mode
        editor.on('FullscreenStateChanged', (edEvt) => {
          const el = this.$refs.ed.parentElement;
          if (!edEvt.state && document.body.contains(el) && !isElementInView(el)) {
            // Out of full screen mode, so scroll input back in view if not in view
            el.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
          this.$emit('fullscreen', edEvt.state);
        });

        if (this.options && this.options.setup && typeof this.options.setup === 'function') {
          // Call user supplied setup function, and pass an insatnce of this for optional reference
          this.options.setup(editor, this);
        }
      },
      showEditor() {
        // Instantiate the editor
        tinymce.init(this.opts);
        this.$emit('shown', editor);
      },
      hideEditor() {
        // Remove tinymce instance, and update disabled prop
        if (this.editor) {
          // Hide editor
          this.editor.hide();
          this.editor.remove();
          this.editor = null;
        }

        // Update disabled.sync prop
        this.$emit('update:disabled', true);

        // Emit hidden event
        this.$emit('hidden');
      },
      destroyEditor() {
        // Remove tinymce instance
        if (this.editor) {
          this.editor.hide();
          this.editor.remove();
          this.editor = null;
        }
        this.$refs.ed.removeAttribute('aria-hidden');
        this.$refs.ed.style.display = '';
        this.clearFullScreen();
      },
      clearFullScreen() {
        // Fix when removing editor when in full screen mode (classes aren't always removed)
        document.body.classList.remove('mce-fullscreen');
        document.getElementsByTagName('html')[0].classList.remove('mce-fullscreen')
        const el = this.$refs.ed.parentElement;
        if (el && document.body.contains(el) && !isElementInView(el)) {
          // Ensure this component is still visible on screen
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      },
      triggerSave(edEvt) {
        // save button clicked. stop native form from submitting
        edEvt.stopPropagation();
        edEvt.preventDefault();

        this.$emit('value', this.editor.getContent());

        // Our custom event
        let doSave = true;
        let doHide = true;
        let content = this.editor.getConttent();
        const evt = {
          cancel(hide) {
            doSave = false;
            doHide = Boolean(hide);
          },
          preventHide() {
            doHide = true;
          },
          setContent(c) {
            content = c;
          },
          isDirty: this.editor.isDirty(),
          content: content,
          windowManager: this.editor.windowManager
        };

        this.$emit('save', evt);

        if (doSave) {
          // Assume save was succesfull
          this.editorSetContent(content);
          this.editor.save();
          this.content = this.editorGetContent();
          this.editor.startContent = this.content;
          this.editor.setDirty(false);
          this.editor.undoManager.clear();
          this.$emit('value', this.content);
        }

        if (doHide) {
          // Hide the editor
          this.hideEditor();
        }

        this.$emit('saved', doClose, doSave);
      },
      triggerCancel(edEvt) {
        // Cancel button clicked
        edEvt.stopPropagation();
        edEvt.preventDefault();

        // Our custom event
        let doClose = true;
        let doRevert = false;
        const evt = {
          preventClose(revert) {
            doClose = false;
            doRevert = Boolean
          },
          revert() {
            doRevert = true;
          },
          isDirty: this.editor.isDirty(),
          content: this.editor.getContent(),
          windowManager: this.editor.windowManager
        };

        this.$emit('cancel', evt);

        if (doRevert) {
          this.content = this.editor.startContent;
          this.editor.setContent(this.content);
          this.editor.setDirty(false);
          this.editor.undoManager.clear();
          this.$emit('value', this.content);
        }

        if (doClose) {
          this.editor.setDirty(false);
          this.editor.undoManager.clear();
          this.hideEditor();
        }

        this.emit('cancelled', doClose, doRevert);
      }
    },

    mounted() {
      if (!tinymce) {
        warn('b-form-tinymce: tinymce not loaded. please load tinymce first.')
      } else {
        // initially display the editor?
        if (this.isEditing) {
          this.$nextTick(() => {
            this.showEditor();
          });
        }
      }
    },

    beforeDestroy() {
      // Remove the editor
      this.destroyEditor();
      this.editor = null;
    }
  };
</script>
