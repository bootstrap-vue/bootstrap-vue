import Vue from 'vue';
import highlightJs from 'highlightjs';
import marked from 'marked';

marked.setOptions({
    highlight: (code, lang) => highlightJs.highlightAuto(code, lang).value
});

Vue.directive('markdown', {
    inserted(el) {
        el.innerHTML = marked((el.innerHTML || '').trim());
    }
});
