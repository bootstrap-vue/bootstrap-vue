# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.2...v1.0.0-beta.5) (2017-08-21)


### Bug Fixes

* **alert:** Emit dismiss-count-down at 0 seconds ([#839](https://github.com/bootstrap-vue/bootstrap-vue/issues/839)) ([8dc90bb](https://github.com/bootstrap-vue/bootstrap-vue/commit/8dc90bb))
* **alert:** Fix auto-dimissing alert "bug" ([#897](https://github.com/bootstrap-vue/bootstrap-vue/issues/897)) ([eccd63e](https://github.com/bootstrap-vue/bootstrap-vue/commit/eccd63e))
* **badge:** badge default variant ([1403ec4](https://github.com/bootstrap-vue/bootstrap-vue/commit/1403ec4))
* **badge:** Default variant changed ([8d3be9e](https://github.com/bootstrap-vue/bootstrap-vue/commit/8d3be9e))
* **badge:** Default variant no longer exists in V4.beta ([#875](https://github.com/bootstrap-vue/bootstrap-vue/issues/875)) ([5fc14d2](https://github.com/bootstrap-vue/bootstrap-vue/commit/5fc14d2))
* **card:**  change prop no-block to no-body ([#826](https://github.com/bootstrap-vue/bootstrap-vue/issues/826)) ([664bc98](https://github.com/bootstrap-vue/bootstrap-vue/commit/664bc98))
* **card:** Fix classes, variants, borders [v4-beta] ([#815](https://github.com/bootstrap-vue/bootstrap-vue/issues/815)) ([fc26811](https://github.com/bootstrap-vue/bootstrap-vue/commit/fc26811))
* **carousel:** boolean typo ([6a95410](https://github.com/bootstrap-vue/bootstrap-vue/commit/6a95410))
* **carousel:** Detect transitionend event name ([fa07949](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa07949))
* **carousel:** Ensure slideshow restarts when reaching the end ([e175c36](https://github.com/bootstrap-vue/bootstrap-vue/commit/e175c36))
* **carousel:** ESLint ([8222222](https://github.com/bootstrap-vue/bootstrap-vue/commit/8222222))
* **carousel:** Handle older opera oTransitionEnd event ([#899](https://github.com/bootstrap-vue/bootstrap-vue/issues/899)) ([5afb591](https://github.com/bootstrap-vue/bootstrap-vue/commit/5afb591))
* **carousel:** minor fixes ([6b4f497](https://github.com/bootstrap-vue/bootstrap-vue/commit/6b4f497))
* **carousel:** oldVal! ([3ae2e2e](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ae2e2e))
* **carousel:** Typo ([4c80576](https://github.com/bootstrap-vue/bootstrap-vue/commit/4c80576))
* **carousel:** Typo in transition ([9693872](https://github.com/bootstrap-vue/bootstrap-vue/commit/9693872))
* **coursel:** Ensure minimum interval of 1 second ([467ec27](https://github.com/bootstrap-vue/bootstrap-vue/commit/467ec27))
* **docs:** Minor update to navbar example ([4a62e1b](https://github.com/bootstrap-vue/bootstrap-vue/commit/4a62e1b))
* **dropdown:** Fix focus/hover custom CSS ([0cbbfb5](https://github.com/bootstrap-vue/bootstrap-vue/commit/0cbbfb5))
* **dropdown:** focus on first item on show ([40a1347](https://github.com/bootstrap-vue/bootstrap-vue/commit/40a1347))
* **dropdown:** twbs/bootstrap[#23329](https://github.com/bootstrap-vue/bootstrap-vue/issues/23329) ([fab5d22](https://github.com/bootstrap-vue/bootstrap-vue/commit/fab5d22))
* **dropdown.js:** import clickout as a mixin ([#896](https://github.com/bootstrap-vue/bootstrap-vue/issues/896)) ([1ba47e5](https://github.com/bootstrap-vue/bootstrap-vue/commit/1ba47e5))
* **dropdowns:** Focus dropdown item on hover ([#823](https://github.com/bootstrap-vue/bootstrap-vue/issues/823)) ([2e863d9](https://github.com/bootstrap-vue/bootstrap-vue/commit/2e863d9))
* **form-control-static:** change class to form-control-plaintext ([66eda01](https://github.com/bootstrap-vue/bootstrap-vue/commit/66eda01))
* **form-group:** use new prop labelCols over old computedLabelCols ([#878](https://github.com/bootstrap-vue/bootstrap-vue/issues/878)) ([b6aa317](https://github.com/bootstrap-vue/bootstrap-vue/commit/b6aa317))
* **form-input:** Fix reactivity (issue [#817](https://github.com/bootstrap-vue/bootstrap-vue/issues/817)) ([88e2dbb](https://github.com/bootstrap-vue/bootstrap-vue/commit/88e2dbb))
* **form-input:** use :value instead of v-model ([fcff25d](https://github.com/bootstrap-vue/bootstrap-vue/commit/fcff25d))
* **form-textarea:** not respecting rows when max-rows provided ([e8bf4b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/e8bf4b3))
* **forms:** Adjustments to form-textarea and form-input ([#880](https://github.com/bootstrap-vue/bootstrap-vue/issues/880)) ([79a7aa8](https://github.com/bootstrap-vue/bootstrap-vue/commit/79a7aa8))
* **forms:** BS4.beta form/input validation styles & components ([#847](https://github.com/bootstrap-vue/bootstrap-vue/issues/847)) ([00e2b6f](https://github.com/bootstrap-vue/bootstrap-vue/commit/00e2b6f))
* **link:** default href to null ([716ce45](https://github.com/bootstrap-vue/bootstrap-vue/commit/716ce45))
* **link:** ensure target is vue component before #emit ([200f31b](https://github.com/bootstrap-vue/bootstrap-vue/commit/200f31b))
* **link:** if nothing is provided default href to # ([86533fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/86533fa))
* **nav-item-dropdown:** add show class ([921dac5](https://github.com/bootstrap-vue/bootstrap-vue/commit/921dac5))
* **nav-item-dropdown:** Fix focus/hover custom CSS ([e38576c](https://github.com/bootstrap-vue/bootstrap-vue/commit/e38576c))
* **navbar:** breakpoint control ([72cd58d](https://github.com/bootstrap-vue/bootstrap-vue/commit/72cd58d))
* **navbar:** breakpoint not working ([42ca902](https://github.com/bootstrap-vue/bootstrap-vue/commit/42ca902))
* **navbar-brand:** fix pluckProps call for link ([9dadfbc](https://github.com/bootstrap-vue/bootstrap-vue/commit/9dadfbc))
* **pagination:** Change classes from .hidden-* to .d-* ([#840](https://github.com/bootstrap-vue/bootstrap-vue/issues/840)) ([0f543a1](https://github.com/bootstrap-vue/bootstrap-vue/commit/0f543a1))
* **pagination-nav:** Fix link-gen and page-gen ([6746cb1](https://github.com/bootstrap-vue/bootstrap-vue/commit/6746cb1))
* **pagination-nav:** Update v-model on click ([188adea](https://github.com/bootstrap-vue/bootstrap-vue/commit/188adea))
* **progress:** make progress-bar respect parent show-* props ([9fc726d](https://github.com/bootstrap-vue/bootstrap-vue/commit/9fc726d))
* **table:** filtered event not firing when filter cleared (issue [#859](https://github.com/bootstrap-vue/bootstrap-vue/issues/859)) ([#863](https://github.com/bootstrap-vue/bootstrap-vue/issues/863)) ([8ff2623](https://github.com/bootstrap-vue/bootstrap-vue/commit/8ff2623))
* **table:** fix for row-hovered event ([2448666](https://github.com/bootstrap-vue/bootstrap-vue/commit/2448666))
* **table:** Sorting directions & arrows ([de1de97](https://github.com/bootstrap-vue/bootstrap-vue/commit/de1de97))
* **table:** workaround for Vue 2.4 SSR rendering bug ([dc8d238](https://github.com/bootstrap-vue/bootstrap-vue/commit/dc8d238))
* **tabs:** Better handling of active tab and transitions ([#903](https://github.com/bootstrap-vue/bootstrap-vue/issues/903)) ([d5b81dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/d5b81dd))
* **tabs:** update to use card-block ([d881c37](https://github.com/bootstrap-vue/bootstrap-vue/commit/d881c37))


### Features

* **addEventListenerOnce:** add to utils ([0869ffd](https://github.com/bootstrap-vue/bootstrap-vue/commit/0869ffd))
* **addEventListenerOnce:** New utility function ([6b4efdf](https://github.com/bootstrap-vue/bootstrap-vue/commit/6b4efdf))
* **badge:** functional component ([#820](https://github.com/bootstrap-vue/bootstrap-vue/issues/820)) ([8c172c1](https://github.com/bootstrap-vue/bootstrap-vue/commit/8c172c1))
* **btn-group:** functional component for button-group ([#822](https://github.com/bootstrap-vue/bootstrap-vue/issues/822)) ([6891e9f](https://github.com/bootstrap-vue/bootstrap-vue/commit/6891e9f))
* **button:** set light as default variant ([2a72576](https://github.com/bootstrap-vue/bootstrap-vue/commit/2a72576))
* **card:** add card-body functional component & card-img fixes ([#843](https://github.com/bootstrap-vue/bootstrap-vue/issues/843)) ([f88ab23](https://github.com/bootstrap-vue/bootstrap-vue/commit/f88ab23))
* **card:** change card-block to card-body ([30d35a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/30d35a7))
* **card:** functional components for card ([#827](https://github.com/bootstrap-vue/bootstrap-vue/issues/827)) ([2089252](https://github.com/bootstrap-vue/bootstrap-vue/commit/2089252))
* **carousel:** Add img slot to carousel-slide ([#879](https://github.com/bootstrap-vue/bootstrap-vue/issues/879)) ([9d789e7](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d789e7))
* **carousel:** Transition event with setTimeout fallback ([8e6fc42](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e6fc42))
* **carousel:** Use transitionend event instead of setTimeout ([192dfb8](https://github.com/bootstrap-vue/bootstrap-vue/commit/192dfb8))
* **docs:** prepare for 1.0.0-beta ([8e46552](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e46552))
* **dropdown:** Add auto ID generation ([#888](https://github.com/bootstrap-vue/bootstrap-vue/issues/888)) ([25a20f2](https://github.com/bootstrap-vue/bootstrap-vue/commit/25a20f2))
* **dropdowns:** functional dropdown sub-components and testing ([#848](https://github.com/bootstrap-vue/bootstrap-vue/issues/848)) ([2bd562b](https://github.com/bootstrap-vue/bootstrap-vue/commit/2bd562b))
* **form:** Swith to functional component ([#865](https://github.com/bootstrap-vue/bootstrap-vue/issues/865)) ([c9f054d](https://github.com/bootstrap-vue/bootstrap-vue/commit/c9f054d))
* **form-file:** Propagate `capture` attribute to file input ([d7e4f8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/d7e4f8a))
* **form-row:** New functional component ([#844](https://github.com/bootstrap-vue/bootstrap-vue/issues/844)) ([1e0f313](https://github.com/bootstrap-vue/bootstrap-vue/commit/1e0f313))
* **form-select:** add key for v-for ([299a2ea](https://github.com/bootstrap-vue/bootstrap-vue/commit/299a2ea))
* **form-text:** New functional component ([#846](https://github.com/bootstrap-vue/bootstrap-vue/issues/846)) ([2ed7470](https://github.com/bootstrap-vue/bootstrap-vue/commit/2ed7470))
* **forms:** Auto ID generation client side if no id prop provided ([#882](https://github.com/bootstrap-vue/bootstrap-vue/issues/882)) ([da39b86](https://github.com/bootstrap-vue/bootstrap-vue/commit/da39b86))
* **input-group:** Add prop tag to change root element type ([800add6](https://github.com/bootstrap-vue/bootstrap-vue/commit/800add6))
* **list-group:** new list-group functional components ([#861](https://github.com/bootstrap-vue/bootstrap-vue/issues/861)) ([c516d89](https://github.com/bootstrap-vue/bootstrap-vue/commit/c516d89))
* **media:** new functional media components ([#872](https://github.com/bootstrap-vue/bootstrap-vue/issues/872)) ([91ff681](https://github.com/bootstrap-vue/bootstrap-vue/commit/91ff681))
* **nav:** new functional nav components ([#864](https://github.com/bootstrap-vue/bootstrap-vue/issues/864)) ([ecec23d](https://github.com/bootstrap-vue/bootstrap-vue/commit/ecec23d))
* **navbar:** change navbar-toggelable to navbar-expand-* ([1fab033](https://github.com/bootstrap-vue/bootstrap-vue/commit/1fab033))
* **pagination-nav:** New navigation pagination component ([#816](https://github.com/bootstrap-vue/bootstrap-vue/issues/816)) ([3a4272c](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a4272c))
* **progress:** Add height prop ([#837](https://github.com/bootstrap-vue/bootstrap-vue/issues/837)) ([8a52b93](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a52b93))
* **progress:** Support for multiple progress bars ([#889](https://github.com/bootstrap-vue/bootstrap-vue/issues/889)) ([76c613c](https://github.com/bootstrap-vue/bootstrap-vue/commit/76c613c))
* **table:** Include native event object with row-* and head-* events ([#892](https://github.com/bootstrap-vue/bootstrap-vue/issues/892)) ([92d2794](https://github.com/bootstrap-vue/bootstrap-vue/commit/92d2794))
* link, breadcrumb, & button functional components ([#830](https://github.com/bootstrap-vue/bootstrap-vue/issues/830)) ([cdbef2d](https://github.com/bootstrap-vue/bootstrap-vue/commit/cdbef2d))



<a name="0.20.2"></a>
## [0.20.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.1...v0.20.2) (2017-08-11)


### Bug Fixes

* **carousel:** Handle changes in slide content ([#809](https://github.com/bootstrap-vue/bootstrap-vue/issues/809)) ([6949e5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/6949e5f))
* **collapse:** Close collapse when clicked in navbar ([#803](https://github.com/bootstrap-vue/bootstrap-vue/issues/803)) ([3fdfbff](https://github.com/bootstrap-vue/bootstrap-vue/commit/3fdfbff))
* **docs:** button update example ([#804](https://github.com/bootstrap-vue/bootstrap-vue/issues/804)) ([fb375aa](https://github.com/bootstrap-vue/bootstrap-vue/commit/fb375aa))
* **form-checkbox:** Better focus handling in button mode ([06e1c7b](https://github.com/bootstrap-vue/bootstrap-vue/commit/06e1c7b))
* **form-radio:** Better focus handling in button mode ([#801](https://github.com/bootstrap-vue/bootstrap-vue/issues/801)) ([a9bfbde](https://github.com/bootstrap-vue/bootstrap-vue/commit/a9bfbde))
* **navbar-brand:** Removed erroneous this in template ([#806](https://github.com/bootstrap-vue/bootstrap-vue/issues/806)) ([0842043](https://github.com/bootstrap-vue/bootstrap-vue/commit/0842043))
* **table:** workaround for Vue 2.4 SSR rendering bug ([ab7767f](https://github.com/bootstrap-vue/bootstrap-vue/commit/ab7767f))
* **v-play:** disable vue global errorHandler ([9a7bdaf](https://github.com/bootstrap-vue/bootstrap-vue/commit/9a7bdaf))



<a name="0.20.1"></a>
## [0.20.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.0...v0.20.1) (2017-08-10)



<a name="0.20.0"></a>
# [0.20.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.19.0...v0.20.0) (2017-08-10)


### Bug Fixes

* **carousel:** Unable to reach last slide ([3628bcb](https://github.com/bootstrap-vue/bootstrap-vue/commit/3628bcb))
* **docs:** broken setup page ([9d60069](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d60069))
* **docs:** Minor update to file-input example ([763a35a](https://github.com/bootstrap-vue/bootstrap-vue/commit/763a35a))
* **docs:** myToggle0 ([a0ef988](https://github.com/bootstrap-vue/bootstrap-vue/commit/a0ef988))
* **docs:** serve fonts on https ([51209dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/51209dd))
* **form-input:** isTextArea varname correction ([#785](https://github.com/bootstrap-vue/bootstrap-vue/issues/785)) ([cb44652](https://github.com/bootstrap-vue/bootstrap-vue/commit/cb44652))
* **form-radio:** Add missing classes in button mode ([#779](https://github.com/bootstrap-vue/bootstrap-vue/issues/779)) ([ed4f4ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed4f4ef))
* **tabs:** Tabls not clickable (issue [#789](https://github.com/bootstrap-vue/bootstrap-vue/issues/789)) ([#790](https://github.com/bootstrap-vue/bootstrap-vue/issues/790)) ([c234580](https://github.com/bootstrap-vue/bootstrap-vue/commit/c234580))
* **tests:** Set jest max workers to 1 ([f16fd8d](https://github.com/bootstrap-vue/bootstrap-vue/commit/f16fd8d))


### Features

* **alert:** Hide dismiss button for auto-dismissing alerts ([#791](https://github.com/bootstrap-vue/bootstrap-vue/issues/791)) ([080bb20](https://github.com/bootstrap-vue/bootstrap-vue/commit/080bb20))
* **docs:** changelog page ([b2482cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/b2482cb))
* **table:** Add row-dblclicked event ([#780](https://github.com/bootstrap-vue/bootstrap-vue/issues/780)) ([1aaf915](https://github.com/bootstrap-vue/bootstrap-vue/commit/1aaf915))



<a name="0.19.0"></a>
# [0.19.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.18.0...v0.19.0) (2017-08-09)


### Bug Fixes

* **alert:** add missing colon for binding `aria-label` ([#768](https://github.com/bootstrap-vue/bootstrap-vue/issues/768)) ([93b009f](https://github.com/bootstrap-vue/bootstrap-vue/commit/93b009f))
* **alert:** Event args array in meta.json ([c9e3fd2](https://github.com/bootstrap-vue/bootstrap-vue/commit/c9e3fd2))
* **alert:** use v-model to update show value ([#721](https://github.com/bootstrap-vue/bootstrap-vue/issues/721)) ([9b380d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/9b380d0))
* **button:** Minor code update ([378b932](https://github.com/bootstrap-vue/bootstrap-vue/commit/378b932))
* **carousel:** Prevent going to slide if transitioning (issue [#764](https://github.com/bootstrap-vue/bootstrap-vue/issues/764)) ([#765](https://github.com/bootstrap-vue/bootstrap-vue/issues/765)) ([a2ab664](https://github.com/bootstrap-vue/bootstrap-vue/commit/a2ab664))
* **collapse:** reference to this.$el ([eb01295](https://github.com/bootstrap-vue/bootstrap-vue/commit/eb01295))
* **componentdoc:** Typo in required prop ([762d088](https://github.com/bootstrap-vue/bootstrap-vue/commit/762d088))
* **docs:** Adjust header tags CSS specificity (issue [#753](https://github.com/bootstrap-vue/bootstrap-vue/issues/753)) ([#755](https://github.com/bootstrap-vue/bootstrap-vue/issues/755)) ([25280ae](https://github.com/bootstrap-vue/bootstrap-vue/commit/25280ae))
* **docs:** conform args and fix spelling ([#659](https://github.com/bootstrap-vue/bootstrap-vue/issues/659)) ([ed9906a](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed9906a))
* **docs:** fix invalid JSON trailing commas ([a635176](https://github.com/bootstrap-vue/bootstrap-vue/commit/a635176))
* **docs:** Fix typo in _component.vue ([b90e92a](https://github.com/bootstrap-vue/bootstrap-vue/commit/b90e92a))
* **docs:** typo in button docs ([8cd3ea1](https://github.com/bootstrap-vue/bootstrap-vue/commit/8cd3ea1))
* **docs:** update README.md for Bootstrap version ([#692](https://github.com/bootstrap-vue/bootstrap-vue/issues/692)) ([5165531](https://github.com/bootstrap-vue/bootstrap-vue/commit/5165531))
* **docs.vue:** Fix link to edit setup doc ([#641](https://github.com/bootstrap-vue/bootstrap-vue/issues/641)) ([836db33](https://github.com/bootstrap-vue/bootstrap-vue/commit/836db33)), closes [#639](https://github.com/bootstrap-vue/bootstrap-vue/issues/639)
* **dropdown:** Clear leftover active state on menu open (fixes [#664](https://github.com/bootstrap-vue/bootstrap-vue/issues/664)) ([80c1ceb](https://github.com/bootstrap-vue/bootstrap-vue/commit/80c1ceb))
* **dropdown:** Emit shown and hidden events (issue [#757](https://github.com/bootstrap-vue/bootstrap-vue/issues/757)) ([814e94c](https://github.com/bootstrap-vue/bootstrap-vue/commit/814e94c))
* **dropdowns:** Change how dropdown items are highlighted ([#717](https://github.com/bootstrap-vue/bootstrap-vue/issues/717)) ([a02270e](https://github.com/bootstrap-vue/bootstrap-vue/commit/a02270e))
* **form fieldset:** 'label for' prop not being applied to label - ARIA ([#669](https://github.com/bootstrap-vue/bootstrap-vue/issues/669)) ([aafea81](https://github.com/bootstrap-vue/bootstrap-vue/commit/aafea81))
* **form-radio:** extra this in template ([cc4a442](https://github.com/bootstrap-vue/bootstrap-vue/commit/cc4a442))
* **modal:** Event args list in meta.json ([7b8ce01](https://github.com/bootstrap-vue/bootstrap-vue/commit/7b8ce01))
* **modal:** meta.json property order consistency ([3d204a4](https://github.com/bootstrap-vue/bootstrap-vue/commit/3d204a4))
* **navbar-brand:** Refactored component logic ([#759](https://github.com/bootstrap-vue/bootstrap-vue/issues/759)) ([c752fc8](https://github.com/bootstrap-vue/bootstrap-vue/commit/c752fc8))
* **pagination:** Added missing href & ARIA adjustments ([#693](https://github.com/bootstrap-vue/bootstrap-vue/issues/693)) ([7091262](https://github.com/bootstrap-vue/bootstrap-vue/commit/7091262))
* **pagination:** Improved ARIA roles and attributes ([#741](https://github.com/bootstrap-vue/bootstrap-vue/issues/741)) ([b12b06e](https://github.com/bootstrap-vue/bootstrap-vue/commit/b12b06e))
* **popover.js:** destroy check for trigger & classes (issue [#735](https://github.com/bootstrap-vue/bootstrap-vue/issues/735)) ([30fa778](https://github.com/bootstrap-vue/bootstrap-vue/commit/30fa778))
* **root-listeners:** apply listen-on-root mixin to other components ([#684](https://github.com/bootstrap-vue/bootstrap-vue/issues/684)) ([f2b7b44](https://github.com/bootstrap-vue/bootstrap-vue/commit/f2b7b44))
* **scrollspy:** Adjust throttle default ([3d6eb98](https://github.com/bootstrap-vue/bootstrap-vue/commit/3d6eb98))
* **scrollspy:** Adjustments to the resizeThrottle scheduler ([#640](https://github.com/bootstrap-vue/bootstrap-vue/issues/640)) ([bfaef7d](https://github.com/bootstrap-vue/bootstrap-vue/commit/bfaef7d))
* **table:** aria-labeledby set to header element ([e13e093](https://github.com/bootstrap-vue/bootstrap-vue/commit/e13e093))
* **table:** Remove redundant ARIA roles from b-table ([#662](https://github.com/bootstrap-vue/bootstrap-vue/issues/662)) ([6919cc5](https://github.com/bootstrap-vue/bootstrap-vue/commit/6919cc5))
* **tabs:** Default current tab to null (issue [#687](https://github.com/bootstrap-vue/bootstrap-vue/issues/687)) ([#701](https://github.com/bootstrap-vue/bootstrap-vue/issues/701)) ([bc7ca26](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc7ca26))
* **toggle:** Remove $root listener on unbind (Issue [#680](https://github.com/bootstrap-vue/bootstrap-vue/issues/680)) ([#698](https://github.com/bootstrap-vue/bootstrap-vue/issues/698)) ([ec5000c](https://github.com/bootstrap-vue/bootstrap-vue/commit/ec5000c))


### Features

* **button:** Add pressed prop to place button in active state ([#715](https://github.com/bootstrap-vue/bootstrap-vue/issues/715)) ([61a104f](https://github.com/bootstrap-vue/bootstrap-vue/commit/61a104f))
* **button:** refactor toggle button focus handler ([#730](https://github.com/bootstrap-vue/bootstrap-vue/issues/730)) ([3ab3d89](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ab3d89))
* **carousel:** Add v-model support (issue [#743](https://github.com/bootstrap-vue/bootstrap-vue/issues/743)) ([#744](https://github.com/bootstrap-vue/bootstrap-vue/issues/744)) ([028eb5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/028eb5f))
* **checkbox:** Add indeterminate state prop ([#720](https://github.com/bootstrap-vue/bootstrap-vue/issues/720)) ([2271e7a](https://github.com/bootstrap-vue/bootstrap-vue/commit/2271e7a))
* **collapse:** apply bootstrap classes during transition stages (issue [#565](https://github.com/bootstrap-vue/bootstrap-vue/issues/565)) ([#707](https://github.com/bootstrap-vue/bootstrap-vue/issues/707)) ([947d253](https://github.com/bootstrap-vue/bootstrap-vue/commit/947d253))
* **collapse:** Close navbar collapse when clicked in nav/navbar (issue [#712](https://github.com/bootstrap-vue/bootstrap-vue/issues/712)) ([#714](https://github.com/bootstrap-vue/bootstrap-vue/issues/714)) ([f104dc0](https://github.com/bootstrap-vue/bootstrap-vue/commit/f104dc0))
* **Event:** standard evt obj emulates native Event ([#726](https://github.com/bootstrap-vue/bootstrap-vue/issues/726)) ([919344b](https://github.com/bootstrap-vue/bootstrap-vue/commit/919344b))
* **form-checkbox:** Support button style checkbox ([#729](https://github.com/bootstrap-vue/bootstrap-vue/issues/729)) ([740d7cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/740d7cb))
* **form-input:** Add autocomplete prop ([#750](https://github.com/bootstrap-vue/bootstrap-vue/issues/750)) ([d686787](https://github.com/bootstrap-vue/bootstrap-vue/commit/d686787))
* **form-input:** Pass input element to formatter (issue [#772](https://github.com/bootstrap-vue/bootstrap-vue/issues/772)) ([#773](https://github.com/bootstrap-vue/bootstrap-vue/issues/773)) ([da77f15](https://github.com/bootstrap-vue/bootstrap-vue/commit/da77f15))
* **form-radio:** ARIA - Add IDs to individual radios ([#663](https://github.com/bootstrap-vue/bootstrap-vue/issues/663)) ([1de785e](https://github.com/bootstrap-vue/bootstrap-vue/commit/1de785e))
* **form-radio:** Support button style radios ([#728](https://github.com/bootstrap-vue/bootstrap-vue/issues/728)) ([c7c150f](https://github.com/bootstrap-vue/bootstrap-vue/commit/c7c150f))
* **form-select:** Add multiple select support (issue [#619](https://github.com/bootstrap-vue/bootstrap-vue/issues/619)) ([#731](https://github.com/bootstrap-vue/bootstrap-vue/issues/731)) ([19bf2f5](https://github.com/bootstrap-vue/bootstrap-vue/commit/19bf2f5))
* **form-select:** Allow selectSize to be set when not in multiple mode (Issue [#761](https://github.com/bootstrap-vue/bootstrap-vue/issues/761)) ([#762](https://github.com/bootstrap-vue/bootstrap-vue/issues/762)) ([6f04090](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f04090))
* **listenonroot:** Use a constant for private property name ([#700](https://github.com/bootstrap-vue/bootstrap-vue/issues/700)) ([26c8a3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/26c8a3e))
* **modal:** Make enforceFocus configurable ([#706](https://github.com/bootstrap-vue/bootstrap-vue/issues/706)) ([f1ab80b](https://github.com/bootstrap-vue/bootstrap-vue/commit/f1ab80b))
* **navbar-brand:** New component <b-navbar-brand> ([#710](https://github.com/bootstrap-vue/bootstrap-vue/issues/710)) ([721292c](https://github.com/bootstrap-vue/bootstrap-vue/commit/721292c))
* **pagination:** Add alignment prop ([#745](https://github.com/bootstrap-vue/bootstrap-vue/issues/745)) ([a8e83a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/a8e83a7))
* **readme:** add david dep badge ([#724](https://github.com/bootstrap-vue/bootstrap-vue/issues/724)) ([435a857](https://github.com/bootstrap-vue/bootstrap-vue/commit/435a857))
* **table:** add field data formatter prop ([#739](https://github.com/bootstrap-vue/bootstrap-vue/issues/739)) ([9da94a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/9da94a6))
* **table:** Add syncable sort-by and sort-desc props ([#742](https://github.com/bootstrap-vue/bootstrap-vue/issues/742)) ([c8ad5a3](https://github.com/bootstrap-vue/bootstrap-vue/commit/c8ad5a3))
* **table:** Emit event when local filtering changes number of result items - issue [#650](https://github.com/bootstrap-vue/bootstrap-vue/issues/650) ([#652](https://github.com/bootstrap-vue/bootstrap-vue/issues/652)) ([1b2a36a](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b2a36a))
* **toggle directives:** allow simple elements to use directive ([#651](https://github.com/bootstrap-vue/bootstrap-vue/issues/651)) ([3361911](https://github.com/bootstrap-vue/bootstrap-vue/commit/3361911))
* **utils:** transpiler friendly polyfills and methods ([#658](https://github.com/bootstrap-vue/bootstrap-vue/issues/658)) ([2ee9ed6](https://github.com/bootstrap-vue/bootstrap-vue/commit/2ee9ed6))
* **utils:** wrap-up as ES6 module ([#656](https://github.com/bootstrap-vue/bootstrap-vue/issues/656)) ([b5f7cfc](https://github.com/bootstrap-vue/bootstrap-vue/commit/b5f7cfc))



<a name="0.18.0"></a>
# [0.18.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.17.1...v0.18.0) (2017-07-04)


### Bug Fixes

* **docs:** Collapse meta.jso typo fix ([6191bed](https://github.com/bootstrap-vue/bootstrap-vue/commit/6191bed))
* Remove usage of es2015 Array.prototype.includes ([#589](https://github.com/bootstrap-vue/bootstrap-vue/issues/589)) ([b3fc095](https://github.com/bootstrap-vue/bootstrap-vue/commit/b3fc095))
* **button-toolbar:** keynav better element visibility test ([5c33b8e](https://github.com/bootstrap-vue/bootstrap-vue/commit/5c33b8e))
* **button-toolbar:** Typo on property `keyNav` ([#600](https://github.com/bootstrap-vue/bootstrap-vue/issues/600)) ([60b1fd8](https://github.com/bootstrap-vue/bootstrap-vue/commit/60b1fd8))
* **docs:** add root wrapper to templates ([ff6432d](https://github.com/bootstrap-vue/bootstrap-vue/commit/ff6432d))
* **docs:** Fix ScrollSpy example ([0365208](https://github.com/bootstrap-vue/bootstrap-vue/commit/0365208))
* **docs:** form-radio typo fix ([db6d5d7](https://github.com/bootstrap-vue/bootstrap-vue/commit/db6d5d7))
* **docs:** form-select docs typo fix ([630e02f](https://github.com/bootstrap-vue/bootstrap-vue/commit/630e02f))
* **docs:** table example markup ([d3d7437](https://github.com/bootstrap-vue/bootstrap-vue/commit/d3d7437))
* **form:** Emit native submit on component ([#636](https://github.com/bootstrap-vue/bootstrap-vue/issues/636)) ([0ba6f94](https://github.com/bootstrap-vue/bootstrap-vue/commit/0ba6f94)), closes [#588](https://github.com/bootstrap-vue/bootstrap-vue/issues/588)
* **form controls:** Apply only required props & classes ([#609](https://github.com/bootstrap-vue/bootstrap-vue/issues/609)) ([c773f79](https://github.com/bootstrap-vue/bootstrap-vue/commit/c773f79))
* **form-checkbox:** Remove duplicate computed prop ([f47ab79](https://github.com/bootstrap-vue/bootstrap-vue/commit/f47ab79))
* **form-file:** remove inputClass ([2415617](https://github.com/bootstrap-vue/bootstrap-vue/commit/2415617))
* **form-options:** pull out custom text field for object notation ([#625](https://github.com/bootstrap-vue/bootstrap-vue/issues/625)) ([83cec54](https://github.com/bootstrap-vue/bootstrap-vue/commit/83cec54)), closes [#622](https://github.com/bootstrap-vue/bootstrap-vue/issues/622)
* **form-radio:** isChecked to work with arrays & non-arrays. ([#629](https://github.com/bootstrap-vue/bootstrap-vue/issues/629)) ([578d451](https://github.com/bootstrap-vue/bootstrap-vue/commit/578d451)), closes [#623](https://github.com/bootstrap-vue/bootstrap-vue/issues/623)
* **form-radio, form-checkbox:** Set autocomplete off ([#616](https://github.com/bootstrap-vue/bootstrap-vue/issues/616)) ([e127313](https://github.com/bootstrap-vue/bootstrap-vue/commit/e127313))
* **modal:** use listenOnRoot mixin ([#593](https://github.com/bootstrap-vue/bootstrap-vue/issues/593)) ([531a6ab](https://github.com/bootstrap-vue/bootstrap-vue/commit/531a6ab))
* **nav-toggle:** typo in method name ([5e0bb2a](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e0bb2a))
* **table demo.html:** remove deprecated fieldset prop ([#630](https://github.com/bootstrap-vue/bootstrap-vue/issues/630)) ([18e8547](https://github.com/bootstrap-vue/bootstrap-vue/commit/18e8547))


### Features

* **docs:** live demo ([#602](https://github.com/bootstrap-vue/bootstrap-vue/issues/602)) ([843057e](https://github.com/bootstrap-vue/bootstrap-vue/commit/843057e))
* **docs:** Native event capturing docs ([#605](https://github.com/bootstrap-vue/bootstrap-vue/issues/605)) ([c2c200b](https://github.com/bootstrap-vue/bootstrap-vue/commit/c2c200b))
* **dropdowns:** Various optimizations for dropdown components  ([#627](https://github.com/bootstrap-vue/bootstrap-vue/issues/627)) ([56d29b0](https://github.com/bootstrap-vue/bootstrap-vue/commit/56d29b0))
* **form controls:** Add required attribute and related ARIA support ([#613](https://github.com/bootstrap-vue/bootstrap-vue/issues/613)) ([3db70a4](https://github.com/bootstrap-vue/bootstrap-vue/commit/3db70a4))
* **form controls:** Optimize props ([#604](https://github.com/bootstrap-vue/bootstrap-vue/issues/604)) ([35a5db6](https://github.com/bootstrap-vue/bootstrap-vue/commit/35a5db6))
* **form-fieldset:** Add alias of b-form-group ([eebe36d](https://github.com/bootstrap-vue/bootstrap-vue/commit/eebe36d))
* **form-fieldset:** label, description, and feedback slots, deprecate label-size ([#598](https://github.com/bootstrap-vue/bootstrap-vue/issues/598)) ([e253dae](https://github.com/bootstrap-vue/bootstrap-vue/commit/e253dae))
* **form-input:** support aria-invalid attribute ([#610](https://github.com/bootstrap-vue/bootstrap-vue/issues/610)) ([d676d8f](https://github.com/bootstrap-vue/bootstrap-vue/commit/d676d8f))
* **form-radio:** Add support for aria-invalid ([#612](https://github.com/bootstrap-vue/bootstrap-vue/issues/612)) ([69e449f](https://github.com/bootstrap-vue/bootstrap-vue/commit/69e449f))
* **form-select:** Add aria-invalid support ([#611](https://github.com/bootstrap-vue/bootstrap-vue/issues/611)) ([1d20f8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/1d20f8a))
* **mixin:** Automate event registration & removal on root vm ([#581](https://github.com/bootstrap-vue/bootstrap-vue/issues/581)) ([be5f834](https://github.com/bootstrap-vue/bootstrap-vue/commit/be5f834))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/0.17.0...0.17.1) (2017-06-30)


### Bug Fixes

* **tooltip:** inline-block element for wrappers ([#572](https://github.com/bootstrap-vue/bootstrap-vue/issues/572)) ([4b680ee](https://github.com/bootstrap-vue/bootstrap-vue/commit/4b680ee))
