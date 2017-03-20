import Vue from 'vue';
import HighlightJs from 'highlightjs';

Vue.directive('code', {
    bind(el) {
        HighlightJs.highlightBlock(el);
    }
});
