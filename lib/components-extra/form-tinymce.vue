<template>
  <component :is="tag"
             :id="id || null"
             :disabled="disabled && tag === 'textarea'"
             :readonly="readonly && tag === 'textarea'"
             :class="componentClasses"
             ref="ed"
             v-html="value"></component>
</template>

<script>
  const inBrowser = document !== undefined && window !== undefined;

  // Requires TinyMCE to be loaded first. v4.6.4 and up
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
    cont o = {};
    if (obj && keys(obj).length > 0) {
      o[key] = obj;
    }
    return o;
  }

  export default {
    data() {
      return {
        content: this.initial || this.value || '',
        revert: this.initial || this.value || ''
      };
    },
    props {
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

      // Initial value for editor content, if provided
      initial: {
        type: String,
        default: '',
        editor: null
      }
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
        default {}
      }
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
      noStatusbar: {
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
      invalidElements {
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

      // Custom button/menu items text
      saveText: {
        type: String,
        default: 'Save'
      },
      cancelText: {
        type: String,
        default: 'Cancel'
      }
    },
    watch: {
      isEditing(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        if (newVal) {
          // Enable Editor
          this.enableEditor();
        } else {
          // Disble Editor
          this.disableEditor();
        }
      },
      value(newVal, oldVal) {
        if (newVal === oldVal || !this.editor) {
          return;
        }
        // New value received, so update editor
        this.editor.setContent(newVal);
        // Return value as "sanitized" by tinymce
        this.emit('input', this.editor.getContent());
      },
      busy(busyState, oldVal) {
        if (busyState === oldVal || !this.editor) {
          return;
        }
        // Set/Clear editor busy State
        this.setBusyState(busyState);
      }
    },
    computed: {
      isEditing() {
        return !this.readonly && !this.disabled;
      },
      componentClasses() {
        return [
          'form-control',
          (!isEditing && this.tag !== 'textarea') ? 'form-control-static' : ''
        ]
      },
      btnSize() {
        // Toobr button size options object
        let size = this.toolbarSize;
        if (size ==='sm') {
          size = 'small';
        } else if (size === 'lg') {
          size = 'large'
        }
        return size ? { toolbr_items_siz: size } : {};
      },
      opts() {
        // Generate tinymce init options

        cont options = assign({}, (this.options && keys(this.options).length > 0) ? this.options : {});

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
          {
            target: this.$refs.ed,
            hidden_input: false,
            setup: this.setupMce
          }
        );

        // Ensure there isn't a 'selector' property, as we use 'target'
        delete opts.selector || opts.selector = null;

        // Return the computed options
        return opts;
      }
    },
    methods: {
      setupMce(editor) {
        // Save a reference of the editor instance
        this.editor = editor;

        // Handle content update
        editor.on('NodeChange Change KeyUp', () => {
          this.$emit('input', editor.getContent());
          this.$emit('change', editor, editor.getContent());
        });

        // Handle change event
        editor.on('change', (edEvt) => {
          this.$emit('change', editor.getContent(), edEvt);
        });

        // Set the content when the editor opens
        editor.on('init', (edEvt) => {
          if (this.content) {
            editor.setContent(this.content);
          }
          // Add class form-control to allow fieldssets to apply state styling
          editor.editorContainer.classList.add('form-control');

          this.$emit('input', editor.getContent())
          this.setBusyState(this.busy);
          this.$emit('shown', edEvt);
        });

        // When the editor is removed
        editor.on('remove', () => {
          this.editor = null;
          this.$emit('hidden');
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
        });

        // Add our custom save button and menu item
        const bvSave = {
          text: this.saveText || 'Save',
          icon: false,
          cmd: 'bvSave'
        };
        editor.addCommand('bvCancel', this.triggerSave, this);
        editor.addButton('bv_save', bvSave);
        editor.addMenuItem('bv_save', bvSave);

        // Add our custom cancel button and menu item
        const bvCancel = {
          text: this.cancelText || 'Cancel',
          icon: false,
          cmd: 'bvCancel'
        };
        editor.addCommand('bvCancel', this.triggerCancel, this);
        editor.addButton('bv_cancel', bvCancel);
        editor.addMenuItem('bv_cancel', bvCancel);

        if (this.options && this.options.setup && typeof this.options.setup === 'function') {
          // Call user supplied setup function, and pass an insatnce of this for optional reference
          this.options.setup(editor, this);
        }
      },
      enableEditor() {
        // Enable tinymce instance
        if (!this.editor) {
          // Grab latest options
          this.setOpts();
          this.$nextTick(() => tinymce.init(this.opts));
        }
      },
      disableEditor() {
        // Remove tinymce instance
        if (this.editor) {
          this.editor.execCommand('mceFocus', false);
          // Remove editor
          this.editor.remove();
          this.editor = null;
        }
        this.clearFullScreen();
      },
      clearFullScreen() {
        // Fix when removing editor when in full screen mode (classes aren't always removed)
        document.body.classList.remove('mce-fullscreen');
        document.getElementsByTagName('html')[0].classList.remove('mce-fullscreen')
        const el = this.$ref.ed.parentElement;
        if (el && document.body.contains(el) && !isElementInView(el)) {
          // Ensure this component is still visible on screen
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      },
      setBusyState(state) {
        if (this.editor) {
          this.editor.setProgressState(state);
        }
      },
      triggerSave() {
        if (!this.editor) {
          return;
        }
        let cancelled = false;
        const evt = {
          cancel() { cancelled = true; }
        };
        const val = this.editor.getContent();
        this.emit('save', evt, this.editor.getContent());
        if (cancelled) {
          // User canceled save
          this.editor.setContent(this.content)
          this.$emit('input', this.content)
        } else {
          this.content = this.editor.getContent();
          this.emit('input', this.content);
        }
      },
      triggerCancel() {
        if (!this.editor) {
          return;
        }
        let cancelled = false;
        let reverted = false;
        const evt = {
          cancel(r) {
            cancelled = true;
            reverted = Boolean(r);
          }
        };
        this.emit('cancel',evt);
        if (!cancelled) {
          if (reverted) {
            this.content = this.revert;
          }
          this.editor.setContent(this.content)
          this.$emit('input', this.content)
          this.disableEditor();
        }
      }
    },
    mounted() {
      if (!tinymce)
        warn('b-form-tinymce: tinymce not loaded. please load tinymce first.')
      } else {
        // initially display the editor?
        if (this.isEditing) {
          this.$nextTick(this.enableEditor);
        }
      }
    },
    beforeDestroy() {
      // Disable editor
      this.disableEditor();
      this.editor = null;
    }
  };
</script>

