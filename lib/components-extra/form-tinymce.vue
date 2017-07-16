<template>
  <component :is="tag"
             :id="id || null"
             :name="(name && tag === 'textarea') ? name : null"
             :disabled="disabled && tag === 'textarea'"
             :required="required && tag === 'textarea'"
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
  import formMixin from '../mixins/form';

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
    mixins: [formMixin],
    data() {
      return {
        // Saved Content
        content: this.initial || this.value || '',
        // Reference to tinymce editor instance
        editor: null
      };
    },
    props: {
      // id, name, disabled, required from form mixin
      readonly: {
        type: Boolean,
        default: false
      },
      // Form Control options
      noFormControl: {
        // Dont add class `form-control`
        type: Boolean,
        default: false
      },
      // Initial value for editor content, if provided
      initial: {
        type: String,
        default: ''
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
      mceOptions: {
        type: Object,
        default: {}
      },
      // tinymce helper options
      mceToolbar: {
        type: [String, Array, Boolean],
        default: null
      },
      mceToolbarSize: {
        type: String,
        default: ''
      },
      mceMenu: {
        type: Object,
        default: null
      },
      mceMenubar: {
        type: [String, Boolean],
        default: null
      },
      mcePlugins: {
        type: String,
        default: null
      },
      mceExternalPlugins: {
        type: Object,
        defult: null
      },
      mceHideStatusbar: {
        type: Boolean,
        default: false
      },
      mceValidElements: {
        type: String,
        default: null
      },
      mceExtendedValidElements: {
        type: String,
        default: null
      },
      mceInvalidElements: {
        type: String,
        default: null
      },
      mceContentCss: {
        type: [String, Array, Boolean],
        default: null
      },
      mceContentStyle: {
        type: [String, Array, Boolean],
        default: null
      },
      mceBodyClass: {
        type: String,
        default: null
      },
      // Editor and preview minimum height
      mceMinHeight: {
        type: Number,
        defunat: null
      }
    },

    computed: {
      isEditing() {
        return !this.disabled || (this.editor && !this.editor.isHidden());
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
        if (this.mceMinHeight && this.mceMinHeight > 0) {
          return { minHeight: this.mceMinHeight + 'px'};
        } 
        return {};
      },
      btnSize() {
        // Toolbar button size options object
        let size = this.mceToolbarSize;
        if (size ==='sm') {
          size = 'small';
        } else if (size === 'lg') {
          size = 'large'
        }
        return size ? { toolbar_items_size: size } : {};
      },
      opts() {
        // Generate tinymce init options

        const options = assign({}, (this.mceOptions && keys(this.mceOptions).length > 0) ? this.mceOptions : {});

        // Ensure there isn't a 'selector' property, as we use 'target' (below)
        opts.selector = null;
        delete opts.selector;

        // Merge options. Helper props take precidence over this.options
        const opts = assign(
          options,
          objToOption('menu', merge(options.menu, this.mceMenu)),
          objToOption('external_plugins', merge(options.external_plugins, this.mceExternalPlugins)),
          (this.mceMenubar === null || this.mceMenubar === '' || this.mceMenubar === true) ? {} : { menubar: this.mceMenubar },
          (this.mceToolbar === null || this.mceToolbar === '' || this.mceToolbar === true) ? {} : { toolbar: this.mceToolbar },
          this.mcePlugins ? { plugins: this.mcePlugins } : {},
          this.btnSize,
          this.mceHideStatusbar ? { statusbar: false } : {},
          this.mceValidElements ? { valid_elements: this.mceValidElements } : {},
          this.mceExtendedValidElements ? { extended_valid_elements: this.mceExtendedValidElements } : {},
          this.mceInvalidElements ? { ivalid_elements: this.mceInvalidElements } : {},
          this.mceContentCss ? { content_css: this.mceContentCss } : {},
          this.mceBodyClass ? { body_class: this.mceBodyClass } : {},
          this.mceContentStyle ? { content_style: this.mceContntStyle } : {},
          (this.mceMinHeight && this.mceMinHeight > 0) ? { min_height: this.mceMinHeight }, {},
          {
            branding: false,
            target: this.$refs.ed,
            hidden_input: false,
            setup: this.setupMce
          }
        );

        // Do not allow 'save' plugin (as it conflicts with our save handlers)
        if (opts.plugins && /\bsave\b/.test(opts.plugins) {
            opts.plugins = opts.plugins.replace(/\bsave\b/g, '').replace(/\s\s+/g, ' ').trim();
        }

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
      opts(newVal, oldVal) {
        if (newVal === oldVal || !this.editor) {
          return;
        }
        // Reconfigure Editor
        // this.editor.settings = newVal;
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

        // Custom save button/menu
        editor.addCommand('bvSave', this.triggerSave, this);
        const bvSave = {
          text: 'Save',
          icon: 'save',
          disbled: true,
          cmd: 'bvSave',
          onpostrender: function() {
            // Handle enabling/disbleing of save button/menu
            const self = this;
            editor.on('NodeChange dirty change'), function(evt) {
              self.disabled(!editor.isDirty());
            }
          }
        };
        editor.addButton('save', bvSave);
        editor.addMenuItem('save', bvSave);

        // Custom save button/menu
        editor.addCommand('bvCancel', this.triggerCancel, this);
        const bvCancel = {
          text: 'Cancel',
          icon: false,
          disbled: false,
          cmd: 'bvCancel'
        };
        editor.addButton('cancel', bvCancel);
        editor.addMenuItem('cancel', bvCancel);

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
          type: 'save',
          target: edEvt.target,
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
          this.editor.nodeChanged();
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
          type: 'cancel',
          target: edEvt.target,
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
          this.editor.nodeChanged();
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
      // Initialize the editor
      if (!tinymce) {
        warn('b-form-tinymce: tinymce not loaded. please load tinymce first.')
      } else if (parseInt(tinymce.majorVersion,10) !== 4 && parseFloat(tinymce.minorVersion) < 6) {
        warn('b-form-tinymce: tinymce version 4.6 or greater is needed.')
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
