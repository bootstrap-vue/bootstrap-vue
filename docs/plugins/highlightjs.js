import Vue from 'vue';
import HighlightJs from 'highlightjs';

Vue.directive('code',{
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        // Focus the element
        HighlightJs.highlightBlock(el)
    }
});