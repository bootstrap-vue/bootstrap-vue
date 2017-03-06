<template>
  <div style="display: none">
    <div :id="id"
         :class="{ modal:true,fade: fade, show: animateModal || !fade }"
         style="display: block"
         @click="onClickOut($event)">
      <div :class="['modal-dialog','modal-'+size]" role="document" style="z-index: 9999">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="modal-header"></slot>
          </div>
          <div class="modal-body">
            <slot name="modal-body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" :class="{ fade: fade, show: animateBackdrop || !fade }"></div>
  </div>
</template>

<script>
import {csstransitions} from '../utils/helpers';

// this is directly linked to the bootstrap animation timing in _modal.scss
// // for browsers that do not support transitions like IE9 just change slide immediately
const TRANSITION_DURATION = csstransitions() ? 300 : 0;

export default {
    replace: true,
    computed: {},
    data() {
        return {
            animateBackdrop: false,
            animateModal: false,
            visible: false
        };
    },
    props: {
        id: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'md'
        },
        fade: {
            type: Boolean,
            default: true
        },
        closeOnBackdrop: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        show() {
            this.visible = true;
            this.$el.style.display = 'block';
            this._body = document.querySelector('body');
            const _this = this;
      // wait for the display block, and then add class "show" class on the modal
            this._modalAnimation = setTimeout(() => {
                _this.animateBackdrop = true;
                this._modalAnimation = setTimeout(() => {
                    _this._body.classList.add('modal-open');
                    _this.animateModal = true;
                    _this.$root.$emit('shown::modal', this.id);
                }, (_this.fade) ? TRANSITION_DURATION : 0);
            }, 0);
        },
        hide() {
            this.visible = false;
            const _this = this;
      // first animate modal out
            this.animateModal = false;
            this._modalAnimation = setTimeout(() => {
        // wait for animation to complete and then hide the backdrop
                _this.animateBackdrop = false;
                this._modalAnimation = setTimeout(() => {
                    _this._body.classList.remove('modal-open');
          // no hide the modal wrapper
                    _this.$el.style.display = 'none';
                    _this.$root.$emit('hidden::modal', this.id);
                }, (_this.fade) ? TRANSITION_DURATION : 0);
            }, (_this.fade) ? TRANSITION_DURATION : 0);
        },
        onClickOut(e) {
      // if backdrop clicked, hide modal
            if (this.closeOnBackdrop && e.target.id && e.target.id === this.id) {
                this.hide();
            }
        },
        pressedButton(e) {
            if( !this.visible ) {
                // if not visible don't do anything
                return;
            }

            // support for esc key press
            const key = e.which || e.keyCode;
            if (key === 27) { // 27 is esc
                this.hide();
            }
        }
    },
    created() {
        const hub = this.$root;
        hub.$on('show::modal', id => id === this.id && this.show());
        hub.$on('hide::modal', id => id === this.id && this.hide());
    },
    mounted() {
        document.addEventListener('keydown', this.pressedButton);
    },
    destroyed() {
        clearTimeout(this._modalAnimation);
        document.removeEventListener('keydown', this.pressedButton);
    }
};

</script>
