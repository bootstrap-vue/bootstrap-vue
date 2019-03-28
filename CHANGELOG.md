# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit
guidelines.

<a name="2.0.0-rc.15"></a>

## [v2.0.0-rc.16](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.15...v2.0.0-rc.16)

Released 2019-03-28

### Bug Fixes v2.0.0-rc.16

- **collapse/toggle:** persist toggle state on element and prevent multiple state emits (closes
  [#2923](https://github.com/bootstrap-vue/bootstrap-vue/issues/2923))
  ([#2924](https://github.com/bootstrap-vue/bootstrap-vue/issues/2924))
  ([6f899fc](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f899fc))
- **docs:** drop self-closing tags + build system improvements (fixes
  [#2882](https://github.com/bootstrap-vue/bootstrap-vue/issues/2882))
  ([#2893](https://github.com/bootstrap-vue/bootstrap-vue/issues/2893))
  ([310c7dc](https://github.com/bootstrap-vue/bootstrap-vue/commit/310c7dc))
- **dropdown:** fix `no-caret` prop when dropleft (fixes
  [#2909](https://github.com/bootstrap-vue/bootstrap-vue/issues/2909))
  ([#2910](https://github.com/bootstrap-vue/bootstrap-vue/issues/2910))
  ([3bef981](https://github.com/bootstrap-vue/bootstrap-vue/commit/3bef981))
- **table:** fix broken aria-labels for sortable columns + break out code into additional mixins +
  tests ([#2884](https://github.com/bootstrap-vue/bootstrap-vue/issues/2884))
  ([ddc2006](https://github.com/bootstrap-vue/bootstrap-vue/commit/ddc2006))
- **table:** fix range selection
  ([#2865](https://github.com/bootstrap-vue/bootstrap-vue/issues/2865))
  ([da49558](https://github.com/bootstrap-vue/bootstrap-vue/commit/da49558))
- **table:** fix SSR mismatch errors
  ([#2897](https://github.com/bootstrap-vue/bootstrap-vue/issues/2897))
  ([6c1940d](https://github.com/bootstrap-vue/bootstrap-vue/commit/6c1940d))
- **utils/dom:** update closest routine to support SVG
  ([#2901](https://github.com/bootstrap-vue/bootstrap-vue/issues/2901))
  ([9d4408d](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d4408d))

### Features v2.0.0-rc.16

- add BOOTSTRAP_VUE_NO_WARN environment variable to hide warnings
  ([#2826](https://github.com/bootstrap-vue/bootstrap-vue/issues/2826))
  ([44d0351](https://github.com/bootstrap-vue/bootstrap-vue/commit/44d0351))
- **alert:** remove need for custom CSS for fade transition
  ([#2925](https://github.com/bootstrap-vue/bootstrap-vue/issues/2925))
  ([0910b22](https://github.com/bootstrap-vue/bootstrap-vue/commit/0910b22))
- **carousel:** add no-hover-pause prop
  ([#2888](https://github.com/bootstrap-vue/bootstrap-vue/issues/2888))
  ([8a503ec](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a503ec))
- **core:** create configurable base global configuration
  ([#2905](https://github.com/bootstrap-vue/bootstrap-vue/issues/2905))
  ([8018bdf](https://github.com/bootstrap-vue/bootstrap-vue/commit/8018bdf))
- **form-checkbox/radio:** allow no label in plain mode (fixes
  [#2911](https://github.com/bootstrap-vue/bootstrap-vue/issues/2911))
  ([#2912](https://github.com/bootstrap-vue/bootstrap-vue/issues/2912))
  ([6f38d9d](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f38d9d))
- **form-file:** add in prop and scoped slot for formatting selected file names
  ([#2902](https://github.com/bootstrap-vue/bootstrap-vue/issues/2902))
  ([f53b5f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/f53b5f8))
- **forms:** new b-form-datalist helper component
  ([#2899](https://github.com/bootstrap-vue/bootstrap-vue/issues/2899))
  ([e9a8e85](https://github.com/bootstrap-vue/bootstrap-vue/commit/e9a8e85))
- **table:** add basic keyboard nav when table has row-clicked handler or is selctable (closes
  [#2869](https://github.com/bootstrap-vue/bootstrap-vue/issues/2869))
  ([#2870](https://github.com/bootstrap-vue/bootstrap-vue/issues/2870))
  ([ddcd66a](https://github.com/bootstrap-vue/bootstrap-vue/commit/ddcd66a))

<a name="2.0.0-rc.15"></a>

## [v2.0.0-rc.15](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.14...v2.0.0-rc.15)

Released: 2019-03-18

### Bug Fixes v2.0.0-rc.15

- **carousel:** fix touchmove handler to re-enable swipe gestures
  ([#2844](https://github.com/bootstrap-vue/bootstrap-vue/issues/2844))
  ([a067f8c](https://github.com/bootstrap-vue/bootstrap-vue/commit/a067f8c))
- **form-radio/form-checkbox:** ensure required prop propagated in group mode (fixes
  [#2839](https://github.com/bootstrap-vue/bootstrap-vue/issues/2839))
  ([#2842](https://github.com/bootstrap-vue/bootstrap-vue/issues/2842))
  ([fc24589](https://github.com/bootstrap-vue/bootstrap-vue/commit/fc24589))
- **pagination-nav:** fix race condition with clicking prev/next buttons
  ([#2834](https://github.com/bootstrap-vue/bootstrap-vue/issues/2834))
  ([42f14e1](https://github.com/bootstrap-vue/bootstrap-vue/commit/42f14e1))
- **table:** allow string for pagination prop types
  ([#2824](https://github.com/bootstrap-vue/bootstrap-vue/issues/2824))
  ([31d2044](https://github.com/bootstrap-vue/bootstrap-vue/commit/31d2044))
- **table:** don't emit row-clicked when user is selecting text (Closes
  [#2791](https://github.com/bootstrap-vue/bootstrap-vue/issues/2791))
  ([ecf0689](https://github.com/bootstrap-vue/bootstrap-vue/commit/ecf0689))
- **util/loose-equal:** handle comparing sparse arrays
  ([#2813](https://github.com/bootstrap-vue/bootstrap-vue/issues/2813))
  ([6ac8ade](https://github.com/bootstrap-vue/bootstrap-vue/commit/6ac8ade))
- **utils/get:** handle cases when field value is not array or object (closes
  [#2807](https://github.com/bootstrap-vue/bootstrap-vue/issues/2807))
  ([#2808](https://github.com/bootstrap-vue/bootstrap-vue/issues/2808))
  ([c656fa3](https://github.com/bootstrap-vue/bootstrap-vue/commit/c656fa3))
- **utisl/observeDom:** make sure to check for browser enviroment
  ([#2838](https://github.com/bootstrap-vue/bootstrap-vue/issues/2838))
  ([8471f31](https://github.com/bootstrap-vue/bootstrap-vue/commit/8471f31))

### Features v2.0.0-rc.15

- **docs:** get recommended `Vue.js` and `Bootstrap` version from `package.json`
  ([#2840](https://github.com/bootstrap-vue/bootstrap-vue/issues/2840))
  ([3a6702e](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a6702e))
- **pagination-nav:** auto-detect current page based on $route/URL. Add support array of links
  ([#2836](https://github.com/bootstrap-vue/bootstrap-vue/issues/2836))
  ([65e12f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/65e12f8))
- **table:** new option to disable footer sorting
  ([#2802](https://github.com/bootstrap-vue/bootstrap-vue/issues/2802))
  ([bc443a3](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc443a3))

<a name="2.0.0-rc.14"></a>

## [v2.0.0-rc.14](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.13...v2.0.0-rc.14)

Released: 2019-03-08

### Bug Fixes v2.0.0-rc.14

- **docs:** correct and validate component meta information
  ([#2665](https://github.com/bootstrap-vue/bootstrap-vue/issues/2665))
  ([#2650](https://github.com/bootstrap-vue/bootstrap-vue/issues/2650))
  ([29147ca](https://github.com/bootstrap-vue/bootstrap-vue/commit/29147ca))
- **dom-utils:** check for `el.classList` existence
  ([#2713](https://github.com/bootstrap-vue/bootstrap-vue/issues/2713))
  ([#2714](https://github.com/bootstrap-vue/bootstrap-vue/issues/2714))
  ([4ff8b05](https://github.com/bootstrap-vue/bootstrap-vue/commit/4ff8b05))
- **form-file:** fix v-model update watcher
  ([#2695](https://github.com/bootstrap-vue/bootstrap-vue/issues/2695))
  ([abf9d6e](https://github.com/bootstrap-vue/bootstrap-vue/commit/abf9d6e))
- **form-input:** allow number type for form-inputs via form-text mixin
  ([#2738](https://github.com/bootstrap-vue/bootstrap-vue/issues/2738))
  ([ec91788](https://github.com/bootstrap-vue/bootstrap-vue/commit/ec91788))
- **modal:** modal stacking position fix
  ([#2677](https://github.com/bootstrap-vue/bootstrap-vue/issues/2677))
  ([#2681](https://github.com/bootstrap-vue/bootstrap-vue/issues/2681))
  ([ff4c4c9](https://github.com/bootstrap-vue/bootstrap-vue/commit/ff4c4c9))
- **nav-item:** move listeners to link element
  ([#2755](https://github.com/bootstrap-vue/bootstrap-vue/issues/2755))
  ([40b19a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/40b19a7))
- **nuxt-module:** fix default inclusion of CSS files
  ([#2629](https://github.com/bootstrap-vue/bootstrap-vue/issues/2629))
  ([#2701](https://github.com/bootstrap-vue/bootstrap-vue/issues/2701))
  ([afbb650](https://github.com/bootstrap-vue/bootstrap-vue/commit/afbb650))
- **pagination:** avoid using domProps innerText
  ([#2744](https://github.com/bootstrap-vue/bootstrap-vue/issues/2744))
  ([#2757](https://github.com/bootstrap-vue/bootstrap-vue/issues/2757))
  ([d10f804](https://github.com/bootstrap-vue/bootstrap-vue/commit/d10f804))
- **pagination:** correct pagination props/slots/event docs and fix ellipsis slot
  ([#2699](https://github.com/bootstrap-vue/bootstrap-vue/issues/2699))
  ([25e04e1](https://github.com/bootstrap-vue/bootstrap-vue/commit/25e04e1))
- **radio/check group:** remove redundant size class from the group container
  ([#2743](https://github.com/bootstrap-vue/bootstrap-vue/issues/2743))
  ([#2761](https://github.com/bootstrap-vue/bootstrap-vue/issues/2761))
  ([0639588](https://github.com/bootstrap-vue/bootstrap-vue/commit/0639588))
- **tabs:** fix initial value handling
  ([#2656](https://github.com/bootstrap-vue/bootstrap-vue/issues/2656))
  ([#2661](https://github.com/bootstrap-vue/bootstrap-vue/issues/2661))
  ([2708c74](https://github.com/bootstrap-vue/bootstrap-vue/commit/2708c74))
- **tabs:** prevent double input event on mount, and add additional tests
  ([#2748](https://github.com/bootstrap-vue/bootstrap-vue/issues/2748))
  ([c462e0a](https://github.com/bootstrap-vue/bootstrap-vue/commit/c462e0a))
- **util/html:** ensure argument is a string
  ([#2770](https://github.com/bootstrap-vue/bootstrap-vue/issues/2770))
  ([#2775](https://github.com/bootstrap-vue/bootstrap-vue/issues/2775))
  ([356247f](https://github.com/bootstrap-vue/bootstrap-vue/commit/356247f))
- **utils:** add back array notation support to `get()` util
  ([#2689](https://github.com/bootstrap-vue/bootstrap-vue/issues/2689))
  ([9e824a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/9e824a5))
- **utils:** make `looseEqual()` util compliant with Vue.js spec
  ([#2651](https://github.com/bootstrap-vue/bootstrap-vue/issues/2651))
  ([1b6a994](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b6a994))

### Features v2.0.0-rc.14

- **card-img-lazy:** new card-img-lazy sub-component
  ([#2647](https://github.com/bootstrap-vue/bootstrap-vue/issues/2647))
  ([d2e1f8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/d2e1f8a))
- **docs:** add heading anchor links
  ([#2698](https://github.com/bootstrap-vue/bootstrap-vue/issues/2698))
  ([fd6cbef](https://github.com/bootstrap-vue/bootstrap-vue/commit/fd6cbef))
- **form-checkbox/radio:** code improvements, test suites, and docs update
  ([#2718](https://github.com/bootstrap-vue/bootstrap-vue/issues/2718))
  ([#2721](https://github.com/bootstrap-vue/bootstrap-vue/issues/2721))
  ([285a2e1](https://github.com/bootstrap-vue/bootstrap-vue/commit/285a2e1))
- **form-input:** Added support for datalists to text form-inputs
  ([#2781](https://github.com/bootstrap-vue/bootstrap-vue/issues/2781))
  ([0339ad8](https://github.com/bootstrap-vue/bootstrap-vue/commit/0339ad8))
- **form-textarea:** add `noAutoShrink` prop
  ([#2664](https://github.com/bootstrap-vue/bootstrap-vue/issues/2664))
  ([#2666](https://github.com/bootstrap-vue/bootstrap-vue/issues/2666))
  ([a29c40c](https://github.com/bootstrap-vue/bootstrap-vue/commit/a29c40c))
- **modal:** add modal-backdrop slot
  ([#2688](https://github.com/bootstrap-vue/bootstrap-vue/issues/2688))
  ([ce18ffd](https://github.com/bootstrap-vue/bootstrap-vue/commit/ce18ffd))
- **modal:** add toggle method and root event
  ([#2708](https://github.com/bootstrap-vue/bootstrap-vue/issues/2708))
  ([#2709](https://github.com/bootstrap-vue/bootstrap-vue/issues/2709))
  ([f67218e](https://github.com/bootstrap-vue/bootstrap-vue/commit/f67218e))
- **modal:** add variant prop for header close button
  ([#2765](https://github.com/bootstrap-vue/bootstrap-vue/issues/2765))
  ([b7e95d9](https://github.com/bootstrap-vue/bootstrap-vue/commit/b7e95d9))
- **nuxt-module:** add tree-shaking support to Nuxt module
  ([#2654](https://github.com/bootstrap-vue/bootstrap-vue/issues/2654))
  ([9aaf32f](https://github.com/bootstrap-vue/bootstrap-vue/commit/9aaf32f))
- **table:** add IDs to tbody > tr elements if primary-key provided
  ([#2693](https://github.com/bootstrap-vue/bootstrap-vue/issues/2693))
  ([#2694](https://github.com/bootstrap-vue/bootstrap-vue/issues/2694))
  ([3d72404](https://github.com/bootstrap-vue/bootstrap-vue/commit/3d72404))
- **table:** added `thead-top` slot to table
  ([#2489](https://github.com/bootstrap-vue/bootstrap-vue/issues/2489))
  ([#2653](https://github.com/bootstrap-vue/bootstrap-vue/issues/2653))
  ([fbb549c](https://github.com/bootstrap-vue/bootstrap-vue/commit/fbb549c))
- **table:** better default rendering of unformatted object values
  ([#2733](https://github.com/bootstrap-vue/bootstrap-vue/issues/2733))
  ([ee84672](https://github.com/bootstrap-vue/bootstrap-vue/commit/ee84672))
- **table:** make some slots available either as scoped or unscoped
  ([#2740](https://github.com/bootstrap-vue/bootstrap-vue/issues/2740))
  ([ab7937e](https://github.com/bootstrap-vue/bootstrap-vue/commit/ab7937e))
- **util/get, table:** handle edge case where user has dot in actual item data field key (Closes
  ([#2762](https://github.com/bootstrap-vue/bootstrap-vue/issues/2762))
  ([#2764](https://github.com/bootstrap-vue/bootstrap-vue/issues/2764))
  ([ee52844](https://github.com/bootstrap-vue/bootstrap-vue/commit/ee52844))

### Performance Improvements v2.0.0-rc.14

- **table:** minor tweaks to primary key usage
  ([#2741](https://github.com/bootstrap-vue/bootstrap-vue/issues/2741))
  ([d083385](https://github.com/bootstrap-vue/bootstrap-vue/commit/d083385))

<a name="2.0.0-rc.13"></a>

## [v2.0.0-rc.13](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.12...v2.0.0-rc.13)

Released: 2019-02-18

### Bug Fixes v2.0.0-rc.13

- **breadcrumb-item:** Fix `to` prop handling
  ([#2578](https://github.com/bootstrap-vue/bootstrap-vue/issues/2578))
  ([fba9df3](https://github.com/bootstrap-vue/bootstrap-vue/commit/fba9df3))
- **build:** don't include babel runtime
  ([#2590](https://github.com/bootstrap-vue/bootstrap-vue/issues/2590))
  ([20828fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/20828fa))
- **build:** Add [@babel](https://github.com/babel)/runtime to devDependencies
  ([#2569](https://github.com/bootstrap-vue/bootstrap-vue/issues/2569))
  ([83a253b](https://github.com/bootstrap-vue/bootstrap-vue/commit/83a253b))
- **card:** fix array spread error when no-body is set and no content
  ([5040566](https://github.com/bootstrap-vue/bootstrap-vue/commit/5040566)
- **docs:** change \@include to \@import in the Nuxt plugin module section
  ([4fad60a](https://github.com/bootstrap-vue/bootstrap-vue/commit/4fad60a))
- **docs:** correct typos ([#2592](https://github.com/bootstrap-vue/bootstrap-vue/issues/2592))
  ([9883f8f](https://github.com/bootstrap-vue/bootstrap-vue/commit/9883f8f))
- **docs:** Correct typos in carousel docs
  ([#2585](https://github.com/bootstrap-vue/bootstrap-vue/issues/2585))
  ([87a721f](https://github.com/bootstrap-vue/bootstrap-vue/commit/87a721f))
- **docs:** fix broken link in form-textarea docs
  ([#2598](https://github.com/bootstrap-vue/bootstrap-vue/issues/2598))
  ([07162e1](https://github.com/bootstrap-vue/bootstrap-vue/commit/07162e1))
- **docs:** fix broken links ([#2635](https://github.com/bootstrap-vue/bootstrap-vue/issues/2635))
  ([fa90f3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa90f3e))
- **docs:** Fix directive import paths
  ([#2570](https://github.com/bootstrap-vue/bootstrap-vue/issues/2570))
  ([2475542](https://github.com/bootstrap-vue/bootstrap-vue/commit/2475542))
- **docs:** fix grid options table layout issue
  ([#2630](https://github.com/bootstrap-vue/bootstrap-vue/issues/2630))
  ([86a882f](https://github.com/bootstrap-vue/bootstrap-vue/commit/86a882f))
- **docs:** Improve wording in footer
  ([#2576](https://github.com/bootstrap-vue/bootstrap-vue/issues/2576))
  ([af7e36e](https://github.com/bootstrap-vue/bootstrap-vue/commit/af7e36e))
- **form-input:** Allow number as value type
  ([#2583](https://github.com/bootstrap-vue/bootstrap-vue/issues/2583))
  ([dfaf34e](https://github.com/bootstrap-vue/bootstrap-vue/commit/dfaf34e))
- **modal:** better backdrop clickout handling
  ([#2597](https://github.com/bootstrap-vue/bootstrap-vue/issues/2597))
  ([#2608](https://github.com/bootstrap-vue/bootstrap-vue/issues/2608))
  ([11c7524](https://github.com/bootstrap-vue/bootstrap-vue/commit/11c7524))
- **nuxt plugin:** fix typo with bootstrap vue css import properties
  ([#2618](https://github.com/bootstrap-vue/bootstrap-vue/issues/2618))
  ([8581090](https://github.com/bootstrap-vue/bootstrap-vue/commit/8581090))
- **utils/get:** handle case where passed object is undefined
  ([#2623](https://github.com/bootstrap-vue/bootstrap-vue/issues/2623))
  ([#2624](https://github.com/bootstrap-vue/bootstrap-vue/issues/2624))
  ([eb07b19](https://github.com/bootstrap-vue/bootstrap-vue/commit/eb07b19))
- **utils/loose-equal:** Make `looseEqual()` util handle File object comparison correctly
  ([#2640](https://github.com/bootstrap-vue/bootstrap-vue/issues/2640))
  ([401d3e9](https://github.com/bootstrap-vue/bootstrap-vue/commit/401d3e9))
- Fix Html casing for props ([#2594](https://github.com/bootstrap-vue/bootstrap-vue/issues/2594))
  ([3772bf5](https://github.com/bootstrap-vue/bootstrap-vue/commit/3772bf5))
- Temporary fix for validation icon positioning
  ([#2599](https://github.com/bootstrap-vue/bootstrap-vue/issues/2599))
  ([#2607](https://github.com/bootstrap-vue/bootstrap-vue/issues/2607))
  ([7168989](https://github.com/bootstrap-vue/bootstrap-vue/commit/7168989))

### Features v2.0.0-rc.13

- **forms:** add state prop to invalid and valid feedback + docs update
  ([#2611](https://github.com/bootstrap-vue/bootstrap-vue/issues/2611))
  ([9df8dac](https://github.com/bootstrap-vue/bootstrap-vue/commit/9df8dac))
- **nuxt:** module improvements
  ([#2593](https://github.com/bootstrap-vue/bootstrap-vue/issues/2593))
  ([0795fea](https://github.com/bootstrap-vue/bootstrap-vue/commit/0795fea))
- **table:** add support for scoped empty slots
  ([#2641](https://github.com/bootstrap-vue/bootstrap-vue/issues/2641))
  ([7917557](https://github.com/bootstrap-vue/bootstrap-vue/commit/7917557))
- **table:** don't show empty row slot if table busy and busy slot provided
  ([#2565](https://github.com/bootstrap-vue/bootstrap-vue/issues/2565))
  ([#2572](https://github.com/bootstrap-vue/bootstrap-vue/issues/2572))
  ([6fd31a4](https://github.com/bootstrap-vue/bootstrap-vue/commit/6fd31a4))

<a name="2.0.0-rc.12"></a>

## [v2.0.0-rc.12](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.11...v2.0.0-rc.12)

Released: (2019-02-14)

### Bug Fixes v2.0.0-rc.12

- **alert:** target custom transition CSS to the alert component
  ([#2205](https://github.com/bootstrap-vue/bootstrap-vue/issues/2205))
  ([0a48268](https://github.com/bootstrap-vue/bootstrap-vue/commit/0a48268))
- **b-img-lazy:** better initial inView check + new show prop
  ([#1755](https://github.com/bootstrap-vue/bootstrap-vue/issues/1755))
  ([#2382](https://github.com/bootstrap-vue/bootstrap-vue/issues/2382))
  ([2416bad](https://github.com/bootstrap-vue/bootstrap-vue/commit/2416bad))
- **breadcrumb-item:** correctly set domProps when no children provided
  ([523e3a2](https://github.com/bootstrap-vue/bootstrap-vue/commit/523e3a2))
- **breadcrumb-link:** correctly use html/text
  ([8b086a9](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b086a9))
- **card:** Drop `img-fluid` property
  ([#2548](https://github.com/bootstrap-vue/bootstrap-vue/issues/2548))
  ([cfc685f](https://github.com/bootstrap-vue/bootstrap-vue/commit/cfc685f))
- **card:** fix card and sub component render issues.
  ([#2062](https://github.com/bootstrap-vue/bootstrap-vue/issues/2062))
  ([#2125](https://github.com/bootstrap-vue/bootstrap-vue/issues/2125))
  ([430371f](https://github.com/bootstrap-vue/bootstrap-vue/commit/430371f))
- **carousel:** setInterval memory leak when no slides provided
  ([#2399](https://github.com/bootstrap-vue/bootstrap-vue/issues/2399))
  ([ac2a708](https://github.com/bootstrap-vue/bootstrap-vue/commit/ac2a708))
- **ci:** remove test-beta
  ([1076f3f](https://github.com/bootstrap-vue/bootstrap-vue/commit/1076f3f))
- **ci:** remove test-beta
  ([0fec992](https://github.com/bootstrap-vue/bootstrap-vue/commit/0fec992))
- **ci:** test on current vue
  ([e3282bd](https://github.com/bootstrap-vue/bootstrap-vue/commit/e3282bd))
- **collapse:** when is-nav, do better checking of click events
  ([#2222](https://github.com/bootstrap-vue/bootstrap-vue/issues/2222))
  ([#2225](https://github.com/bootstrap-vue/bootstrap-vue/issues/2225))
  ([8b96e1e](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b96e1e))
- **collapse/toggle:** "collapsed" class cleared when component updated
  ([#2102](https://github.com/bootstrap-vue/bootstrap-vue/issues/2102))
  ([#1798](https://github.com/bootstrap-vue/bootstrap-vue/issues/1798))
  ([6d33cae](https://github.com/bootstrap-vue/bootstrap-vue/commit/6d33cae))
- **dependencies:** replace opencollective with opencollective-postintall
  ([#2067](https://github.com/bootstrap-vue/bootstrap-vue/issues/2067))
  ([fa26882](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa26882))
- **docs:** Updaate links to bootstrap v4.3 docs
  ([b5d5499](https://github.com/bootstrap-vue/bootstrap-vue/commit/b5d5499))
- **docs:** Button - fix typo ([#1962](https://github.com/bootstrap-vue/bootstrap-vue/issues/1962))
  ([dcbfcf9](https://github.com/bootstrap-vue/bootstrap-vue/commit/dcbfcf9))
- **docs:** change b-input-group attribute 'left' to 'prepend'
  ([#2017](https://github.com/bootstrap-vue/bootstrap-vue/issues/2017))
  ([d471502](https://github.com/bootstrap-vue/bootstrap-vue/commit/d471502))
- **docs:** Collapse - typo fix
  ([#1964](https://github.com/bootstrap-vue/bootstrap-vue/issues/1964))
  ([becaa98](https://github.com/bootstrap-vue/bootstrap-vue/commit/becaa98))
- **docs:** create local marked-loader.js
  ([#2380](https://github.com/bootstrap-vue/bootstrap-vue/issues/2380))
  ([06cfb47](https://github.com/bootstrap-vue/bootstrap-vue/commit/06cfb47))
- **docs:** Embed - fix typos ([#1965](https://github.com/bootstrap-vue/bootstrap-vue/issues/1965))
  ([ae7101e](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae7101e))
- **docs:** Fix broken examples
  ([1d599a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/1d599a5))
- **docs:** Fix broken links. ([#2517](https://github.com/bootstrap-vue/bootstrap-vue/issues/2517))
  ([#2528](https://github.com/bootstrap-vue/bootstrap-vue/issues/2528))
  ([c4b7e1e](https://github.com/bootstrap-vue/bootstrap-vue/commit/c4b7e1e))
- **docs:** Fix console errors and improve `play` directive
  ([#2176](https://github.com/bootstrap-vue/bootstrap-vue/issues/2176))
  ([cc02130](https://github.com/bootstrap-vue/bootstrap-vue/commit/cc02130))
- **docs:** fix issue with playground export button and improved error catching
  ([#2197](https://github.com/bootstrap-vue/bootstrap-vue/issues/2197))
  ([c69ffbc](https://github.com/bootstrap-vue/bootstrap-vue/commit/c69ffbc))
- **docs:** fix modal docs typo
  ([#2507](https://github.com/bootstrap-vue/bootstrap-vue/issues/2507))
  ([524db85](https://github.com/bootstrap-vue/bootstrap-vue/commit/524db85))
- **docs:** fix playground hang issues.
  ([#1843](https://github.com/bootstrap-vue/bootstrap-vue/issues/1843))
  ([#2177](https://github.com/bootstrap-vue/bootstrap-vue/issues/2177))
  ([5bdc2e6](https://github.com/bootstrap-vue/bootstrap-vue/commit/5bdc2e6))
- **docs:** fix typo in collapse events doc
  ([d8f5d69](https://github.com/bootstrap-vue/bootstrap-vue/commit/d8f5d69))
- **docs:** fixes broken styling of docs navigation
  ([#1911](https://github.com/bootstrap-vue/bootstrap-vue/issues/1911))
  ([95a5012](https://github.com/bootstrap-vue/bootstrap-vue/commit/95a5012))
- **docs:** guarantee css load order
  ([#2274](https://github.com/bootstrap-vue/bootstrap-vue/issues/2274))
  ([8841f6b](https://github.com/bootstrap-vue/bootstrap-vue/commit/8841f6b))
- **docs:** improve CSS load ordering
  ([#2255](https://github.com/bootstrap-vue/bootstrap-vue/issues/2255))
  ([e193362](https://github.com/bootstrap-vue/bootstrap-vue/commit/e193362))
- **docs:** fix input group prepend slot typo
  ([#2059](https://github.com/bootstrap-vue/bootstrap-vue/issues/2059))
  ([3c3cd8d](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c3cd8d))
- **docs:** Layout - fix typo ([#1966](https://github.com/bootstrap-vue/bootstrap-vue/issues/1966))
  ([c5a37d3](https://github.com/bootstrap-vue/bootstrap-vue/commit/c5a37d3))
- **docs:** missing dash and typo fix
  ([#1850](https://github.com/bootstrap-vue/bootstrap-vue/issues/1850))
  ([7b5fde8](https://github.com/bootstrap-vue/bootstrap-vue/commit/7b5fde8))
- **docs:** typo fix ([#2009](https://github.com/bootstrap-vue/bootstrap-vue/issues/2009))
  ([9e0eb67](https://github.com/bootstrap-vue/bootstrap-vue/commit/9e0eb67))
- **docs:** Update links to Bootstrap V4.2
  ([#2370](https://github.com/bootstrap-vue/bootstrap-vue/issues/2370))
  ([470a083](https://github.com/bootstrap-vue/bootstrap-vue/commit/470a083))
- **docs:** vue-loader v15 changes
  ([#2005](https://github.com/bootstrap-vue/bootstrap-vue/issues/2005))
  ([449a712](https://github.com/bootstrap-vue/bootstrap-vue/commit/449a712))
- **dropdown:** Add back missing `click` events
  ([#2460](https://github.com/bootstrap-vue/bootstrap-vue/issues/2460))
  ([c5d858f](https://github.com/bootstrap-vue/bootstrap-vue/commit/c5d858f))
- **dropdown:** add missing TAB keyCode.
  ([#1577](https://github.com/bootstrap-vue/bootstrap-vue/issues/1577)
  ([#2140](https://github.com/bootstrap-vue/bootstrap-vue/issues/2140))
  ([5e5c5c9](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e5c5c9))
- **dropdown:** focus menu container before emitting shown event.
  ([#2520](https://github.com/bootstrap-vue/bootstrap-vue/issues/2520))
  ([#2527](https://github.com/bootstrap-vue/bootstrap-vue/issues/2527))
  ([1649c00](https://github.com/bootstrap-vue/bootstrap-vue/commit/1649c00))
- **dropdown:** fix item click event timing
  ([#2251](https://github.com/bootstrap-vue/bootstrap-vue/issues/2251))
  ([e620e07](https://github.com/bootstrap-vue/bootstrap-vue/commit/e620e07))
- **dropdown:** Menu focusout close handling
  ([#2252](https://github.com/bootstrap-vue/bootstrap-vue/issues/2252))
  ([1853954](https://github.com/bootstrap-vue/bootstrap-vue/commit/1853954))
- **dropdown:** fix typo in README
  ([#1939](https://github.com/bootstrap-vue/bootstrap-vue/issues/1939))
  ([#1942](https://github.com/bootstrap-vue/bootstrap-vue/issues/1942))
  ([8a2ca5e](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a2ca5e))
- **dropdown:** Use custom CSS for `no-caret` option
  ([#1473](https://github.com/bootstrap-vue/bootstrap-vue/issues/1473))
  ([#2136](https://github.com/bootstrap-vue/bootstrap-vue/issues/2136))
  ([2eb706f](https://github.com/bootstrap-vue/bootstrap-vue/commit/2eb706f))
- **dropdown-item-button:** Add support for `active` state
  ([#2212](https://github.com/bootstrap-vue/bootstrap-vue/issues/2212))
  ([4b9e6c0](https://github.com/bootstrap-vue/bootstrap-vue/commit/4b9e6c0))
- **dropdown, button, link:** various bug fixes and aria fixes
  ([#1814](https://github.com/bootstrap-vue/bootstrap-vue/issues/1814))
  ([#1817](https://github.com/bootstrap-vue/bootstrap-vue/issues/1817))
  ([#2159](https://github.com/bootstrap-vue/bootstrap-vue/issues/2159))
  ([e79270d](https://github.com/bootstrap-vue/bootstrap-vue/commit/e79270d))
- **fom-input:** revert changes from PR
  [#1841](https://github.com/bootstrap-vue/bootstrap-vue/issues/1841)
  ([#2174](https://github.com/bootstrap-vue/bootstrap-vue/issues/2174))
  ([aacc7c0](https://github.com/bootstrap-vue/bootstrap-vue/commit/aacc7c0))
- **form-control:** remove interim class fixes from bootstrap 4.0.x
  ([#1896](https://github.com/bootstrap-vue/bootstrap-vue/issues/1896))
  ([#2265](https://github.com/bootstrap-vue/bootstrap-vue/issues/2265))
  ([64bdf69](https://github.com/bootstrap-vue/bootstrap-vue/commit/64bdf69))
- **form-file:** fix `input` event loop on `reset()` in multiple mode
  ([#2289](https://github.com/bootstrap-vue/bootstrap-vue/issues/2289))
  ([f483c7b](https://github.com/bootstrap-vue/bootstrap-vue/commit/f483c7b))
- **form-file:** Add prop to allow customization of browse button text
  ([#2143](https://github.com/bootstrap-vue/bootstrap-vue/issues/2143))
  ([#2168](https://github.com/bootstrap-vue/bootstrap-vue/issues/2168))
  ([56c26da](https://github.com/bootstrap-vue/bootstrap-vue/commit/56c26da))
- **form-file:** fix drag and drop feature
  ([#2169](https://github.com/bootstrap-vue/bootstrap-vue/issues/2169))
  ([07bfc29](https://github.com/bootstrap-vue/bootstrap-vue/commit/07bfc29))
- **form-file:** fix issue with "accept" values
  ([#1526](https://github.com/bootstrap-vue/bootstrap-vue/issues/1526))
  ([#2008](https://github.com/bootstrap-vue/bootstrap-vue/issues/2008))
  ([963d478](https://github.com/bootstrap-vue/bootstrap-vue/commit/963d478))
- **form-group:** add missing disabled prop
  ([#2106](https://github.com/bootstrap-vue/bootstrap-vue/issues/2106))
  ([#1798](https://github.com/bootstrap-vue/bootstrap-vue/issues/1798))
  ([4971c06](https://github.com/bootstrap-vue/bootstrap-vue/commit/4971c06))
- **form-group:** allow label alignment on label when not horizontal
  ([#2284](https://github.com/bootstrap-vue/bootstrap-vue/issues/2284))
  ([c306b18](https://github.com/bootstrap-vue/bootstrap-vue/commit/c306b18))
- **form-input:** bug fixes and add new features
  ([#2100](https://github.com/bootstrap-vue/bootstrap-vue/issues/2100))
  ([0299159](https://github.com/bootstrap-vue/bootstrap-vue/commit/0299159))
- **form-input:** custom-range style adjustments
  ([#2122](https://github.com/bootstrap-vue/bootstrap-vue/issues/2122))
  ([1917c15](https://github.com/bootstrap-vue/bootstrap-vue/commit/1917c15))
- **form-state:** explicitly handle when state is set to empty string.
  ([#2166](https://github.com/bootstrap-vue/bootstrap-vue/issues/2166))
  ([#2167](https://github.com/bootstrap-vue/bootstrap-vue/issues/2167))
  ([805a7fe](https://github.com/bootstrap-vue/bootstrap-vue/commit/805a7fe))
- **input-group:** Fix size styling issues for input types range and color
  ([3ba1230](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ba1230))
- **input-group:** Minor fixes and documentation update
  ([#2128](https://github.com/bootstrap-vue/bootstrap-vue/issues/2128))
  ([afe1cd0](https://github.com/bootstrap-vue/bootstrap-vue/commit/afe1cd0))
- **input-group:** Styling fix for dropdowns, radio and checkbox groups
  ([#2114](https://github.com/bootstrap-vue/bootstrap-vue/issues/2114)
  ([#1560](https://github.com/bootstrap-vue/bootstrap-vue/issues/1560)
  ([#2118](https://github.com/bootstrap-vue/bootstrap-vue/issues/2118))
  ([ed31bcd](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed31bcd))
- **link:** use `active` class when manually placed into active state
  ([#2405](https://github.com/bootstrap-vue/bootstrap-vue/issues/2405))
  ([8f13ede](https://github.com/bootstrap-vue/bootstrap-vue/commit/8f13ede))
- **list-group-item:** set button type to 'button' when button in mode or tag=button
  ([#2192](https://github.com/bootstrap-vue/bootstrap-vue/issues/2192))
  ([#2194](https://github.com/bootstrap-vue/bootstrap-vue/issues/2194))
  ([4322ccb](https://github.com/bootstrap-vue/bootstrap-vue/commit/4322ccb))
- **modal:** better enforce focus handler
  ([#2215](https://github.com/bootstrap-vue/bootstrap-vue/issues/2215))
  ([9628de2](https://github.com/bootstrap-vue/bootstrap-vue/commit/9628de2))
- **modal:** clear modal paddingLeft and paddingRight if no Scrollbar in adjustDialog()
  ([#2050](https://github.com/bootstrap-vue/bootstrap-vue/issues/2050))
  ([80f1d6e](https://github.com/bootstrap-vue/bootstrap-vue/commit/80f1d6e))
- **modal:** handle edge cases where modal is shown/hidden in rapid succession
  ([#2236](https://github.com/bootstrap-vue/bootstrap-vue/issues/2236))
  ([#2270](https://github.com/bootstrap-vue/bootstrap-vue/issues/2270))
  ([e4a7bab](https://github.com/bootstrap-vue/bootstrap-vue/commit/e4a7bab))
- **modal:** Handle enforce focus when modals are stacked
  ([#2175](https://github.com/bootstrap-vue/bootstrap-vue/issues/2175))
  ([#2211](https://github.com/bootstrap-vue/bootstrap-vue/issues/2211))
  ([7d768d1](https://github.com/bootstrap-vue/bootstrap-vue/commit/7d768d1))
- **modal:** prevent scrolling on .modal-content focus
  ([#1748](https://github.com/bootstrap-vue/bootstrap-vue/issues/1748)
  ([#2060](https://github.com/bootstrap-vue/bootstrap-vue/issues/2060))
  ([df9efad](https://github.com/bootstrap-vue/bootstrap-vue/commit/df9efad))
- **modal:** Show/Hide when once prevented
  ([#2275](https://github.com/bootstrap-vue/bootstrap-vue/issues/2275))
  ([9758dfd](https://github.com/bootstrap-vue/bootstrap-vue/commit/9758dfd))
- **nav-item-dropdown:** close menu when clicked outside
  ([#2202](https://github.com/bootstrap-vue/bootstrap-vue/issues/2202))
  ([#2198](https://github.com/bootstrap-vue/bootstrap-vue/issues/2198))
  ([9e3e33e](https://github.com/bootstrap-vue/bootstrap-vue/commit/9e3e33e))
- **navbar:** Support always expanded navbar
  ([#2209](https://github.com/bootstrap-vue/bootstrap-vue/issues/2209))
  ([#2210](https://github.com/bootstrap-vue/bootstrap-vue/issues/2210))
  ([7c3737c](https://github.com/bootstrap-vue/bootstrap-vue/commit/7c3737c))
- **observe-dom:** fix comment typo
  ([#2084](https://github.com/bootstrap-vue/bootstrap-vue/issues/2084))
  ([8b41913](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b41913))
- **package.json:** prevent css and scss from being tree shaken out in docs
  ([#2271](https://github.com/bootstrap-vue/bootstrap-vue/issues/2271))
  ([44fd864](https://github.com/bootstrap-vue/bootstrap-vue/commit/44fd864))
- **package.json:** flag most of bootstrap-vue as being side effect free
  ([#2268](https://github.com/bootstrap-vue/bootstrap-vue/issues/2268))
  ([5a77532](https://github.com/bootstrap-vue/bootstrap-vue/commit/5a77532))
- **pagination:** adjust aria label defaults
  ([#2508](https://github.com/bootstrap-vue/bootstrap-vue/issues/2508))
  ([#2529](https://github.com/bootstrap-vue/bootstrap-vue/issues/2529))
  ([9790dc2](https://github.com/bootstrap-vue/bootstrap-vue/commit/9790dc2))
- **pagination:** fix component name in `package.json`
  ([#2541](https://github.com/bootstrap-vue/bootstrap-vue/issues/2541))
  ([331dc46](https://github.com/bootstrap-vue/bootstrap-vue/commit/331dc46))
- **pagination:** fix escaped chars
  ([#2479](https://github.com/bootstrap-vue/bootstrap-vue/issues/2479))
  ([1efd59c](https://github.com/bootstrap-vue/bootstrap-vue/commit/1efd59c))
- **pagination:** set default total rows to 0
  ([#2498](https://github.com/bootstrap-vue/bootstrap-vue/issues/2498))
  ([#2526](https://github.com/bootstrap-vue/bootstrap-vue/issues/2526))
  ([c3227a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/c3227a6))
- **pagination pagination-nav:** v-model active class fix + keypress click fix
  ([#1985](https://github.com/bootstrap-vue/bootstrap-vue/issues/1985))
  ([#1629](https://github.com/bootstrap-vue/bootstrap-vue/issues/1629))
  ([#2299](https://github.com/bootstrap-vue/bootstrap-vue/issues/2299))
  ([9afba6c](https://github.com/bootstrap-vue/bootstrap-vue/commit/9afba6c))
- **popover:** Add directive to component plugin
  ([#2115](https://github.com/bootstrap-vue/bootstrap-vue/issues/2115))
  ([e39a855](https://github.com/bootstrap-vue/bootstrap-vue/commit/e39a855))
- **popover:** fixes close emit argument
  ([#1937](https://github.com/bootstrap-vue/bootstrap-vue/issues/1937))
  ([8b9db28](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b9db28))
- **router-link:** remove default values for active-class and exact-active-class
  ([#2387](https://github.com/bootstrap-vue/bootstrap-vue/issues/2387))
  ([#2388](https://github.com/bootstrap-vue/bootstrap-vue/issues/2388))
  ([e3e30b8](https://github.com/bootstrap-vue/bootstrap-vue/commit/e3e30b8))
- **safeId:** trigger id creation/update after mount
  ([#1978](https://github.com/bootstrap-vue/bootstrap-vue/issues/1978))
  ([#2161](https://github.com/bootstrap-vue/bootstrap-vue/issues/2161))
  ([48218fe](https://github.com/bootstrap-vue/bootstrap-vue/commit/48218fe))
- **scss:** import input-group.scss once at most
  ([#2239](https://github.com/bootstrap-vue/bootstrap-vue/issues/2239))
  ([2e7dcfa](https://github.com/bootstrap-vue/bootstrap-vue/commit/2e7dcfa))
- **select:** Wait for the v-model value to update before emitting change event on form select
  ([#2207](https://github.com/bootstrap-vue/bootstrap-vue/issues/2207))
  ([7a860ee](https://github.com/bootstrap-vue/bootstrap-vue/commit/7a860ee))
- **tab:** fix typo aria-lablelledby
  ([#1959](https://github.com/bootstrap-vue/bootstrap-vue/issues/1959))
  ([#954](https://github.com/bootstrap-vue/bootstrap-vue/issues/954)
  ([5933955](https://github.com/bootstrap-vue/bootstrap-vue/commit/5933955))
- **table:** allow filtering on false values and sorting date objects
  ([#2485](https://github.com/bootstrap-vue/bootstrap-vue/issues/2485))
  ([#2544](https://github.com/bootstrap-vue/bootstrap-vue/issues/2544))
  ([79315d6](https://github.com/bootstrap-vue/bootstrap-vue/commit/79315d6))
- **table:** Clear selection when data change
  ([#2267](https://github.com/bootstrap-vue/bootstrap-vue/issues/2267))
  ([e381f38](https://github.com/bootstrap-vue/bootstrap-vue/commit/e381f38))
- **table:** Emit v-model input event only when computedItems changes
  ([#2231](https://github.com/bootstrap-vue/bootstrap-vue/issues/2231))
  ([#2254](https://github.com/bootstrap-vue/bootstrap-vue/issues/2254))
  ([f0fb9af](https://github.com/bootstrap-vue/bootstrap-vue/commit/f0fb9af))
- **table:** fix filtered event, fix emptyFilter message w/filter function, fix reactivity of filter
  sub routines, fix empty header label accessibility issue
  ([#1989](https://github.com/bootstrap-vue/bootstrap-vue/issues/1989))
  ([#1517](https://github.com/bootstrap-vue/bootstrap-vue/issues/1517))
  ([#2149](https://github.com/bootstrap-vue/bootstrap-vue/issues/2149))
  ([e0e1eee](https://github.com/bootstrap-vue/bootstrap-vue/commit/e0e1eee))
- **table:** generate TR key using serialized item or primary key if provided
  ([#2410](https://github.com/bootstrap-vue/bootstrap-vue/issues/2410))
  ([#2416](https://github.com/bootstrap-vue/bootstrap-vue/issues/2416))
  ([6e22d99](https://github.com/bootstrap-vue/bootstrap-vue/commit/6e22d99))
- **table:** only call provider once DOM is fully updated
  ([#1904](https://github.com/bootstrap-vue/bootstrap-vue/issues/1904))
  ([#1955](https://github.com/bootstrap-vue/bootstrap-vue/issues/1955))
  ([ae7147e](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae7147e))
- **table:** Preserve aria-rowcount and aria-describedby if provided
  ([#1801](https://github.com/bootstrap-vue/bootstrap-vue/issues/1801))
  ([#2195](https://github.com/bootstrap-vue/bootstrap-vue/issues/2195))
  ([e0cdca0](https://github.com/bootstrap-vue/bootstrap-vue/commit/e0cdca0))
- **table:** return empty string if cell value is null or undefined
  ([#1502](https://github.com/bootstrap-vue/bootstrap-vue/issues/1502))
  ([#2139](https://github.com/bootstrap-vue/bootstrap-vue/issues/2139))
  ([b62f8f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/b62f8f4))
- **table:** selectable range mode update and minor fixes
  ([#2326](https://github.com/bootstrap-vue/bootstrap-vue/issues/2326))
  ([ef281d1](https://github.com/bootstrap-vue/bootstrap-vue/commit/ef281d1))
- **tabs:** fix `tabIndex` prop type
  ([#2459](https://github.com/bootstrap-vue/bootstrap-vue/issues/2459))
  ([05ef65a](https://github.com/bootstrap-vue/bootstrap-vue/commit/05ef65a))
- **tabs:** Emit click on b-tab instance when button clicked
  ([#2512](https://github.com/bootstrap-vue/bootstrap-vue/issues/2512))
  ([#2530](https://github.com/bootstrap-vue/bootstrap-vue/issues/2530))
  ([8e129a3](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e129a3))
- **tabs:** Fix tab titleLinkClass and titleItemClass handling
  ([#2448](https://github.com/bootstrap-vue/bootstrap-vue/issues/2448))
  ([36400f5](https://github.com/bootstrap-vue/bootstrap-vue/commit/36400f5))
- **tabs:** various fixes and improvements
  ([#2327](https://github.com/bootstrap-vue/bootstrap-vue/issues/2327))
  ([#2148](https://github.com/bootstrap-vue/bootstrap-vue/issues/2148))
  ([#2403](https://github.com/bootstrap-vue/bootstrap-vue/issues/2403))
  ([#2180](https://github.com/bootstrap-vue/bootstrap-vue/issues/2180))
  ([#2442](https://github.com/bootstrap-vue/bootstrap-vue/issues/2442))
  ([de11a8f](https://github.com/bootstrap-vue/bootstrap-vue/commit/de11a8f))
- **toolpop mixin:** allow boundary type to be HTMLElement
  ([#2229](https://github.com/bootstrap-vue/bootstrap-vue/issues/2229))
  ([#2233](https://github.com/bootstrap-vue/bootstrap-vue/issues/2233))
  ([8b8272b](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b8272b))
- **tooltip docs** typo corrected in tooltips
  ([#1930](https://github.com/bootstrap-vue/bootstrap-vue/issues/1930))
  ([5e4fbe4](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e4fbe4))
- **tooltip:** Add directive to component plugin
  ([#2116](https://github.com/bootstrap-vue/bootstrap-vue/issues/2116))
  ([e5bb09e](https://github.com/bootstrap-vue/bootstrap-vue/commit/e5bb09e))
- **utils/loose-equal:** check dates in looseEqual util
  ([#2123](https://github.com/bootstrap-vue/bootstrap-vue/issues/2123))
  ([8a8d0f0](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a8d0f0))
- relax prop type checks to prevent vue warns
  ([835eccf](https://github.com/bootstrap-vue/bootstrap-vue/commit/835eccf))
- typo in form-radio watcher ([#1943](https://github.com/bootstrap-vue/bootstrap-vue/issues/1943))
  ([9ab23ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/9ab23ef))
- use stable nuxt opencollective
  ([#1885](https://github.com/bootstrap-vue/bootstrap-vue/issues/1885))
  ([876f4a1](https://github.com/bootstrap-vue/bootstrap-vue/commit/876f4a1))

### Features v2.0.0-rc.12

- **breadcrumb-link:** support html
  ([#2522](https://github.com/bootstrap-vue/bootstrap-vue/issues/2522))
  ([c2ee63e](https://github.com/bootstrap-vue/bootstrap-vue/commit/c2ee63e))
- **build:** replace uglify-es with terser
  ([#2238](https://github.com/bootstrap-vue/bootstrap-vue/issues/2238))
  ([bd95ad8](https://github.com/bootstrap-vue/bootstrap-vue/commit/bd95ad8))
- **button:** Make button tag configurable
  ([#1929](https://github.com/bootstrap-vue/bootstrap-vue/issues/1929))
  ([afcadd9](https://github.com/bootstrap-vue/bootstrap-vue/commit/afcadd9))
- **card:** include custom styles for card-img-left and card-img-right
  ([#2292](https://github.com/bootstrap-vue/bootstrap-vue/issues/2292))
  ([a72d494](https://github.com/bootstrap-vue/bootstrap-vue/commit/a72d494))
- **card:** new helper sub-components
  ([#2375](https://github.com/bootstrap-vue/bootstrap-vue/issues/2375))
  ([ff25314](https://github.com/bootstrap-vue/bootstrap-vue/commit/ff25314))
- **card:** support left and right image placement
  ([#1981](https://github.com/bootstrap-vue/bootstrap-vue/issues/1981))
  ([66194a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/66194a6))
- **carousel:** add support for swipe on touch screens
  ([#2409](https://github.com/bootstrap-vue/bootstrap-vue/issues/2409))
  ([46a6763](https://github.com/bootstrap-vue/bootstrap-vue/commit/46a6763))
- **carousel:** support crossfade animation
  ([#2406](https://github.com/bootstrap-vue/bootstrap-vue/issues/2406))
  ([15d8a2c](https://github.com/bootstrap-vue/bootstrap-vue/commit/15d8a2c))
- **carousel:** use provide and inject for sub-component communication
  ([#2407](https://github.com/bootstrap-vue/bootstrap-vue/issues/2407))
  ([7f92318](https://github.com/bootstrap-vue/bootstrap-vue/commit/7f92318))
- **css:** create SCSS versions of CSS
  ([#2218](https://github.com/bootstrap-vue/bootstrap-vue/issues/2218))
  ([d6ba6db](https://github.com/bootstrap-vue/bootstrap-vue/commit/d6ba6db))
- **css:** Add SCSS support ([#2201](https://github.com/bootstrap-vue/bootstrap-vue/issues/2201))
  ([#2221](https://github.com/bootstrap-vue/bootstrap-vue/issues/2221))
  ([f8326a2](https://github.com/bootstrap-vue/bootstrap-vue/commit/f8326a2))
- **docs:** Allow sub-components to show reference info for slots and events
  ([#2132](https://github.com/bootstrap-vue/bootstrap-vue/issues/2132))
  ([52c960b](https://github.com/bootstrap-vue/bootstrap-vue/commit/52c960b))
- **docs:** conditionally load babel-standalone only on browsers that need transpilation
  ([#2294](https://github.com/bootstrap-vue/bootstrap-vue/issues/2294))
  ([1578732](https://github.com/bootstrap-vue/bootstrap-vue/commit/1578732))
- **docs:** Improve code example markup and prettier integration
  ([#2440](https://github.com/bootstrap-vue/bootstrap-vue/issues/2440))
  ([74ad932](https://github.com/bootstrap-vue/bootstrap-vue/commit/74ad932))
- **docs:** Prettify with `prettier`
  ([#2427](https://github.com/bootstrap-vue/bootstrap-vue/issues/2427))
  ([9463138](https://github.com/bootstrap-vue/bootstrap-vue/commit/9463138))
- **docs:** use babel-standalone in playground/v-play to support IE
  ([#2286](https://github.com/bootstrap-vue/bootstrap-vue/issues/2286))
  ([46f8d4b](https://github.com/bootstrap-vue/bootstrap-vue/commit/46f8d4b))
- **dropdown:** support 'href', 'to' and 'variant' in split button mode
  ([#1960](https://github.com/bootstrap-vue/bootstrap-vue/issues/1960))
  ([#2301](https://github.com/bootstrap-vue/bootstrap-vue/issues/2301))
  ([31b7d19](https://github.com/bootstrap-vue/bootstrap-vue/commit/31b7d19))
- **dropdown:** support for form controls and free flow text
  ([#2434](https://github.com/bootstrap-vue/bootstrap-vue/issues/2434))
  ([7e8a2d5](https://github.com/bootstrap-vue/bootstrap-vue/commit/7e8a2d5))
- **dropdown:** use provide and inject
  ([#2431](https://github.com/bootstrap-vue/bootstrap-vue/issues/2431))
  ([3df90ea](https://github.com/bootstrap-vue/bootstrap-vue/commit/3df90ea))
- **dropdown:** Add `dropright` and `dropleft` direction support
  ([#2117](https://github.com/bootstrap-vue/bootstrap-vue/issues/2117))
  ([#2108](https://github.com/bootstrap-vue/bootstrap-vue/issues/2108)
  ([e186639](https://github.com/bootstrap-vue/bootstrap-vue/commit/e186639))
- **form-checkbox:** support custom switch styling
  ([#2293](https://github.com/bootstrap-vue/bootstrap-vue/issues/2293))
  ([3508ea2](https://github.com/bootstrap-vue/bootstrap-vue/commit/3508ea2))
- **form-file:** reset file input when value set to null or empty string
  ([#2170](https://github.com/bootstrap-vue/bootstrap-vue/issues/2170))
  ([ab44375](https://github.com/bootstrap-vue/bootstrap-vue/commit/ab44375))
- **form-group:** Add multiple breakpoint support for label
  ([#2230](https://github.com/bootstrap-vue/bootstrap-vue/issues/2230))
  ([#2258](https://github.com/bootstrap-vue/bootstrap-vue/issues/2258))
  ([5e453f9](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e453f9))
- **form-input:** initial SCSS file
  ([#2217](https://github.com/bootstrap-vue/bootstrap-vue/issues/2217))
  ([923d20b](https://github.com/bootstrap-vue/bootstrap-vue/commit/923d20b))
- **form-input:** support custom-range input + validation and input styles
  ([#2120](https://github.com/bootstrap-vue/bootstrap-vue/issues/2120))
  ([013a737](https://github.com/bootstrap-vue/bootstrap-vue/commit/013a737))
- **form-input:** Use new form-text mixin and add trim and number modifiers
  ([#2204](https://github.com/bootstrap-vue/bootstrap-vue/issues/2204))
  ([3c9936e](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c9936e))
- **form-radio-check:** migrate to using provide/inject, add inline props
  ([#2241](https://github.com/bootstrap-vue/bootstrap-vue/issues/2241))
  ([c0a68d5](https://github.com/bootstrap-vue/bootstrap-vue/commit/c0a68d5))
- **form-select:** Expose focus and blur methods
  ([#2237](https://github.com/bootstrap-vue/bootstrap-vue/issues/2237))
  ([#2257](https://github.com/bootstrap-vue/bootstrap-vue/issues/2257))
  ([ded7679](https://github.com/bootstrap-vue/bootstrap-vue/commit/ded7679))
- **forms:** add form prop to all inputs
  ([#2154](https://github.com/bootstrap-vue/bootstrap-vue/issues/2154))
  ([#2172](https://github.com/bootstrap-vue/bootstrap-vue/issues/2172))
  ([6009d72](https://github.com/bootstrap-vue/bootstrap-vue/commit/6009d72))
- **forms:** add support for tooltip-style feedback text
  ([#2188](https://github.com/bootstrap-vue/bootstrap-vue/issues/2188))
  ([5203436](https://github.com/bootstrap-vue/bootstrap-vue/commit/5203436))
- **link:** Add support for nuxt-link
  ([#2384](https://github.com/bootstrap-vue/bootstrap-vue/issues/2384))
  ([4bd462a](https://github.com/bootstrap-vue/bootstrap-vue/commit/4bd462a))
- **list-group:** support horizontal layout
  ([#2536](https://github.com/bootstrap-vue/bootstrap-vue/issues/2536))
  ([10fa210](https://github.com/bootstrap-vue/bootstrap-vue/commit/10fa210))
- **modal:** add 'aria-modal="true"' to modal when open
  ([#2314](https://github.com/bootstrap-vue/bootstrap-vue/issues/2314))
  ([dbf4920](https://github.com/bootstrap-vue/bootstrap-vue/commit/dbf4920))
- **modal:** Add `dialogClass` prop
  ([#2465](https://github.com/bootstrap-vue/bootstrap-vue/issues/2465))
  ([34ae267](https://github.com/bootstrap-vue/bootstrap-vue/commit/34ae267))
- **modal:** add support for scrollable modal dialog content
  ([#2535](https://github.com/bootstrap-vue/bootstrap-vue/issues/2535))
  ([5c01faf](https://github.com/bootstrap-vue/bootstrap-vue/commit/5c01faf))
- **modal:** Make stackable optional
  ([#2259](https://github.com/bootstrap-vue/bootstrap-vue/issues/2259))
  ([2322044](https://github.com/bootstrap-vue/bootstrap-vue/commit/2322044))
- **modal:** Support multiple modals open at once
  ([#2164](https://github.com/bootstrap-vue/bootstrap-vue/issues/2164))
  ([2709902](https://github.com/bootstrap-vue/bootstrap-vue/commit/2709902))
- **pagination:** added slots for first, prev, next, last, and ellipsis
  ([#1870](https://github.com/bootstrap-vue/bootstrap-vue/issues/1870))
  ([#1980](https://github.com/bootstrap-vue/bootstrap-vue/issues/1980))
  ([1b7e7de](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b7e7de))
- **popover/tooltip:** Add `boundaryPadding` prop to override Popper.js default padding
  ([#2475](https://github.com/bootstrap-vue/bootstrap-vue/issues/2475))
  ([c8ad487](https://github.com/bootstrap-vue/bootstrap-vue/commit/c8ad487))
- **security:** Strip HTML script tags before inserting content into DOM
  ([#1974](https://github.com/bootstrap-vue/bootstrap-vue/issues/1974))
  ([#1665](https://github.com/bootstrap-vue/bootstrap-vue/issues/1665))
  ([#2129](https://github.com/bootstrap-vue/bootstrap-vue/issues/2129))
  ([#2134](https://github.com/bootstrap-vue/bootstrap-vue/issues/2134))
  ([#1931](https://github.com/bootstrap-vue/bootstrap-vue/issues/1931))
  ([6dde0cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/6dde0cb))
  ([ba6f3f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/ba6f3f8))
- **security:** strip html tags
  ([#2479](https://github.com/bootstrap-vue/bootstrap-vue/issues/2479))
  ([3c6ba3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c6ba3e))
- **spinner:** Support Bootstrap V4.2 spinner component
  ([#2306](https://github.com/bootstrap-vue/bootstrap-vue/issues/2306))
  ([bf3994f](https://github.com/bootstrap-vue/bootstrap-vue/commit/bf3994f))
- **table:** "Debounce" providerFunction and refresh methods
  ([#2393](https://github.com/bootstrap-vue/bootstrap-vue/issues/2393))
  ([d5f0462](https://github.com/bootstrap-vue/bootstrap-vue/commit/d5f0462))
- **table:** add borderless prop
  ([#2300](https://github.com/bootstrap-vue/bootstrap-vue/issues/2300))
  ([dabe150](https://github.com/bootstrap-vue/bootstrap-vue/commit/dabe150))
- **table:** Add row-unhovered event
  ([#1874](https://github.com/bootstrap-vue/bootstrap-vue/issues/1874))
  ([a87cad1](https://github.com/bootstrap-vue/bootstrap-vue/commit/a87cad1))
- **table:** add support for transitions on tbody element
  ([#1821](https://github.com/bootstrap-vue/bootstrap-vue/issues/1821))
  ([#2450](https://github.com/bootstrap-vue/bootstrap-vue/issues/2450))
  ([91514af](https://github.com/bootstrap-vue/bootstrap-vue/commit/91514af))
- **table:** add table row middle click (auxclicked) event
  ([#2425](https://github.com/bootstrap-vue/bootstrap-vue/issues/2425))
  ([23250a2](https://github.com/bootstrap-vue/bootstrap-vue/commit/23250a2))
- **table:** Add table-busy slot for loading status
  ([#1859](https://github.com/bootstrap-vue/bootstrap-vue/issues/1859))
  ([#2196](https://github.com/bootstrap-vue/bootstrap-vue/issues/2196))
  ([a654a61](https://github.com/bootstrap-vue/bootstrap-vue/commit/a654a61))
- **table:** create initial SCSS file
  ([#2216](https://github.com/bootstrap-vue/bootstrap-vue/issues/2216))
  ([db0b483](https://github.com/bootstrap-vue/bootstrap-vue/commit/db0b483))
- switch to PascalCase name for all components
  ([#2305](https://github.com/bootstrap-vue/bootstrap-vue/issues/2305))
  ([6179e61](https://github.com/bootstrap-vue/bootstrap-vue/commit/6179e61))
- **table:** pass sortDesc to user provided sortCompare routine
  ([#1994](https://github.com/bootstrap-vue/bootstrap-vue/issues/1994))
  ([a8e4103](https://github.com/bootstrap-vue/bootstrap-vue/commit/a8e4103))
- **table:** Remove need to add `click.stop` on inputs/links/buttons inside rows
  ([#2214](https://github.com/bootstrap-vue/bootstrap-vue/issues/2214))
  ([7d8662b](https://github.com/bootstrap-vue/bootstrap-vue/commit/7d8662b))
- **table:** Add support for selectable rows
  ([#1790](https://github.com/bootstrap-vue/bootstrap-vue/issues/1790))
  ([#2260](https://github.com/bootstrap-vue/bootstrap-vue/issues/2260))
  ([5b1cb90](https://github.com/bootstrap-vue/bootstrap-vue/commit/5b1cb90))
- **table:** Split computedItems into multiple methods
  ([#1893](https://github.com/bootstrap-vue/bootstrap-vue/issues/1893))
  ([bb1c550](https://github.com/bootstrap-vue/bootstrap-vue/commit/bb1c550))
- **table:** Support contextmenu event binding for table rows
  ([#2064](https://github.com/bootstrap-vue/bootstrap-vue/issues/2064))
  ([1eced46](https://github.com/bootstrap-vue/bootstrap-vue/commit/1eced46))
- **table:** Support sorting on nested object properties
  ([#1868](https://github.com/bootstrap-vue/bootstrap-vue/issues/1868))
  ([b699e4b](https://github.com/bootstrap-vue/bootstrap-vue/commit/b699e4b))

### Performance Improvements v2.0.0-rc.12

- **events:** use passive event listeners where possible
  ([#2435](https://github.com/bootstrap-vue/bootstrap-vue/issues/2435))
  ([a01dee4](https://github.com/bootstrap-vue/bootstrap-vue/commit/a01dee4))
- **modal:** Get scrollbar width just before modal opens rather than mount
  ([#1800](https://github.com/bootstrap-vue/bootstrap-vue/issues/1800))
  ([#2165](https://github.com/bootstrap-vue/bootstrap-vue/issues/2165))
  ([e1729b4](https://github.com/bootstrap-vue/bootstrap-vue/commit/e1729b4))
- **modal:** optimize model.resetScrollbar
  ([#1831](https://github.com/bootstrap-vue/bootstrap-vue/issues/1831))
  ([#1837](https://github.com/bootstrap-vue/bootstrap-vue/issues/1837))
  ([a622358](https://github.com/bootstrap-vue/bootstrap-vue/commit/a622358))
- **pkg:** remove lodash dependency from src
  ([#2523](https://github.com/bootstrap-vue/bootstrap-vue/issues/2523))
  ([b34ada3](https://github.com/bootstrap-vue/bootstrap-vue/commit/b34ada3))
- **progress:** use provide and inject for inter component communication
  ([#2540](https://github.com/bootstrap-vue/bootstrap-vue/issues/2540))
  ([80b7e5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/80b7e5f))
- **utils/dom:** use passive event listeners where possible
  ([#2419](https://github.com/bootstrap-vue/bootstrap-vue/issues/2419))
  ([78fe776](https://github.com/bootstrap-vue/bootstrap-vue/commit/78fe776))
- only call vueUse in main index.js entrypoint
  ([#2542](https://github.com/bootstrap-vue/bootstrap-vue/issues/2542))
  ([c0d469b](https://github.com/bootstrap-vue/bootstrap-vue/commit/c0d469b))

<a name="2.0.0-rc.11"></a>

## [v2.0.0-rc.11](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.10...v2.0.0-rc.11)

Released: 2018-05-20

### Bug Fixes v2.0.0-rc.11

- **form-input:** force update formatted value
  ([#1845](https://github.com/bootstrap-vue/bootstrap-vue/issues/1845))
  ([497cc6e](https://github.com/bootstrap-vue/bootstrap-vue/commit/497cc6e))

<a name="2.0.0-rc.10"></a>

## [v2.0.0-rc.10](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.9...v2.0.0-rc.10)

Released: 2018-05-17

### Bug Fixes v2.0.0-rc.10

- **docs:** Fix duplicate keys in events table
  ([#1786](https://github.com/bootstrap-vue/bootstrap-vue/issues/1786))
  ([fa60d56](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa60d56))
- **docs:** incorrect closing <b-form-file> tag
  ([#1838](https://github.com/bootstrap-vue/bootstrap-vue/issues/1838))
  ([69e410d](https://github.com/bootstrap-vue/bootstrap-vue/commit/69e410d))
- **docs:** Remove incorrect code added during debugging
  ([#1787](https://github.com/bootstrap-vue/bootstrap-vue/issues/1787))
  ([9911507](https://github.com/bootstrap-vue/bootstrap-vue/commit/9911507))
- **form-input:** always return formatted value
  ([#1839](https://github.com/bootstrap-vue/bootstrap-vue/issues/1839))
  ([77cc97b](https://github.com/bootstrap-vue/bootstrap-vue/commit/77cc97b))
- **tab:** fix the delay in tab transition
  ([#1812](https://github.com/bootstrap-vue/bootstrap-vue/issues/1812))
  ([#1806](https://github.com/bootstrap-vue/bootstrap-vue/issues/1806))
  ([5a7a290](https://github.com/bootstrap-vue/bootstrap-vue/commit/5a7a290))
- **table:** fix aria-rowcount ([#1836](https://github.com/bootstrap-vue/bootstrap-vue/issues/1836))
  ([e3e5439](https://github.com/bootstrap-vue/bootstrap-vue/commit/e3e5439))

### Features v2.0.0-rc.10

- **alert:** Add fade prop ([#1785](https://github.com/bootstrap-vue/bootstrap-vue/issues/1785))
  ([0999b4c](https://github.com/bootstrap-vue/bootstrap-vue/commit/0999b4c))
- **breadcrumb-link:** support children elements
  ([#1832](https://github.com/bootstrap-vue/bootstrap-vue/issues/1832))
  ([#1833](https://github.com/bootstrap-vue/bootstrap-vue/issues/1833))
  ([42175f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/42175f8))
- **dropdown:** make show/hide events cancelable . also adds toggle event
  ([#1807](https://github.com/bootstrap-vue/bootstrap-vue/issues/1807))
  ([4136bd9](https://github.com/bootstrap-vue/bootstrap-vue/commit/4136bd9))
- **table:** Add no-sort-reset prop
  ([#1784](https://github.com/bootstrap-vue/bootstrap-vue/issues/1784))
  ([26aaeab](https://github.com/bootstrap-vue/bootstrap-vue/commit/26aaeab))
- **table:** Add the sort-direction prop
  ([#1783](https://github.com/bootstrap-vue/bootstrap-vue/issues/1783))
  ([#1788](https://github.com/bootstrap-vue/bootstrap-vue/issues/1788))
  ([9e1959d](https://github.com/bootstrap-vue/bootstrap-vue/commit/9e1959d))

<a name="2.0.0-rc.9"></a>

## [v2.0.0-rc.9](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.8...v2.0.0-rc.9)

Released: 2018-04-27

### Bug Fixes v2.0.0-rc.9

- **docs:** typo in docs plugin
  ([#1777](https://github.com/bootstrap-vue/bootstrap-vue/issues/1777))
  ([fb50c6f](https://github.com/bootstrap-vue/bootstrap-vue/commit/fb50c6f))
- **dropdown:** aria-labbeledby for dropdowns
  ([8efa7ee](https://github.com/bootstrap-vue/bootstrap-vue/commit/8efa7ee))
- **form-input:** revert step, min and max props
  ([#1767](https://github.com/bootstrap-vue/bootstrap-vue/issues/1767))
  ([1ce1a20](https://github.com/bootstrap-vue/bootstrap-vue/commit/1ce1a20))
- **img-lazy:** typo ([#1778](https://github.com/bootstrap-vue/bootstrap-vue/issues/1778))
  ([11d113c](https://github.com/bootstrap-vue/bootstrap-vue/commit/11d113c))
- **tooltip:** typo in comment ([#1779](https://github.com/bootstrap-vue/bootstrap-vue/issues/1779))
  ([ef253f7](https://github.com/bootstrap-vue/bootstrap-vue/commit/ef253f7))

### Features v2.0.0-rc.9

- **table:** support custom attributes per table cell in a column
  ([#1760](https://github.com/bootstrap-vue/bootstrap-vue/issues/1760))
  ([fc083e5](https://github.com/bootstrap-vue/bootstrap-vue/commit/fc083e5))

<a name="2.0.0-rc.8"></a>

## [v2.0.0-rc.8](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.7...v2.0.0-rc.8)

Released: 2018-04-17

### Bug Fixes v2.0.0-rc.8

- **docs:** fix table refresh event name
  ([#1692](https://github.com/bootstrap-vue/bootstrap-vue/issues/1692))
  ([01e223c](https://github.com/bootstrap-vue/bootstrap-vue/commit/01e223c))
- default export in TypeScript definitions
  ([cd7e310](https://github.com/bootstrap-vue/bootstrap-vue/commit/cd7e310))

<a name="2.0.0-rc.7"></a>

## [v2.0.0-rc.7](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.6...v2.0.0-rc.7)

Released: 2018-04-16

### Bug Fixes v2.0.0-rc.7

- **table:** typo in README.md ([#1729](https://github.com/bootstrap-vue/bootstrap-vue/issues/1729))
  ([8d0e186](https://github.com/bootstrap-vue/bootstrap-vue/commit/8d0e186))
- **tabs:** change default key nav to avoid breaking changes
  ([#1733](https://github.com/bootstrap-vue/bootstrap-vue/issues/1733))
  ([a6dea02](https://github.com/bootstrap-vue/bootstrap-vue/commit/a6dea02))
- **tabs:** rename prop to no-key-nav, update docs
  ([491d698](https://github.com/bootstrap-vue/bootstrap-vue/commit/491d698))
- **tabs:** typo in tabs ([#1735](https://github.com/bootstrap-vue/bootstrap-vue/issues/1735))
  ([89eff3c](https://github.com/bootstrap-vue/bootstrap-vue/commit/89eff3c))

### Features v2.0.0-rc.7

- add basic typescript declarations
  ([#1721](https://github.com/bootstrap-vue/bootstrap-vue/issues/1721))
  ([3c040f0](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c040f0))
- **form-input:** add step, min and max props for use with number type
  ([40ff380](https://github.com/bootstrap-vue/bootstrap-vue/commit/40ff380))
- **table:** support custom classes per table cell in a column
  ([d05d6b6](https://github.com/bootstrap-vue/bootstrap-vue/commit/d05d6b6))
- **tabs:** add key nav prop like button toolbar has
  ([#1733](https://github.com/bootstrap-vue/bootstrap-vue/issues/1733))
  ([bc3b82b](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc3b82b))
- **tabs/noNavStyle:** added related prop and check
  ([91c7257](https://github.com/bootstrap-vue/bootstrap-vue/commit/91c7257))

<a name="2.0.0-rc.6"></a>

## [v2.0.0-rc.6](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.4...v2.0.0-rc.6)

Released: 2018-04-02

### Bug Fixes v2.0.0-rc.6

- **text-area:** correctly handle input event
  ([#1714](https://github.com/bootstrap-vue/bootstrap-vue/issues/1714))
  ([5e2973d](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e2973d))

<a name="2.0.0-rc.5"></a>

## [v2.0.0-rc.5](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.4...v2.0.0-rc.5)

Released: 2018-04-02

### Bug Fixes v2.0.0-rc.5

- **card:** duplicate header and footer slots with no-body
  ([#1713](https://github.com/bootstrap-vue/bootstrap-vue/issues/1713),
  [#1680](https://github.com/bootstrap-vue/bootstrap-vue/issues/1680))
  ([2bd0e71](https://github.com/bootstrap-vue/bootstrap-vue/commit/2bd0e71))

**NOTE** Vue `2.5.15` has known issues with card slots. Please upgrade to `2.5.16` or newer
versions.

<a name="2.0.0-rc.4"></a>

## [v2.0.0-rc.4](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.3...v2.0.0-rc.4)

Released: 2018-04-01

### Bug Fixes v2.0.0-rc.4

- **build:** don't exclude lodash.get
  ([543c3c2](https://github.com/bootstrap-vue/bootstrap-vue/commit/543c3c2))
- **card:** pass children instead of default prop to sub-components
  ([63b35e3](https://github.com/bootstrap-vue/bootstrap-vue/commit/63b35e3))

### Features v2.0.0-rc.4

- **test:** test against multi versions of vue
  ([25d0b13](https://github.com/bootstrap-vue/bootstrap-vue/commit/25d0b13))

### Performance Improvements v2.0.0-rc.4

- **docs:** only import debounce from lodash
  ([a6abd6d](https://github.com/bootstrap-vue/bootstrap-vue/commit/a6abd6d))

<a name="2.0.0-rc.3"></a>

## [v2.0.0-rc.3](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.2...v2.0.0-rc.3)

Released: 2018-04-01

### Bug Fixes v2.0.0-rc.3

- **contributing:** Improve the commit guidelines
  ([c506280](https://github.com/bootstrap-vue/bootstrap-vue/commit/c506280))
- **modal:** Correct the internal btn variable names
  ([301f2e4](https://github.com/bootstrap-vue/bootstrap-vue/commit/301f2e4)), closes
  [#1650](https://github.com/bootstrap-vue/bootstrap-vue/issues/1650)
- **select:** Fix issues with form-select
  ([#1673](https://github.com/bootstrap-vue/bootstrap-vue/issues/1673))
  ([e3336c5](https://github.com/bootstrap-vue/bootstrap-vue/commit/e3336c5)), closes
  [#1658](https://github.com/bootstrap-vue/bootstrap-vue/issues/1658)
- **table:** import lodash.get from "dependencies"
  ([#1697](https://github.com/bootstrap-vue/bootstrap-vue/issues/1697))
  ([4d620a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/4d620a5))

### Features v2.0.0-rc.3

- **dropdown, nav-item-dropdown:** support menuClass and extraMenuClasses
  ([#1683](https://github.com/bootstrap-vue/bootstrap-vue/issues/1683))
  ([3da5f18](https://github.com/bootstrap-vue/bootstrap-vue/commit/3da5f18))
- **modal:** add `modalClass` property to `bModal`
  ([#1682](https://github.com/bootstrap-vue/bootstrap-vue/issues/1682))
  ([c7a10ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/c7a10ef))
- **table:** add field to the table column data cell slots
  ([#1705](https://github.com/bootstrap-vue/bootstrap-vue/issues/1705))
  ([e013d59](https://github.com/bootstrap-vue/bootstrap-vue/commit/e013d59))

### Performance Improvements v2.0.0-rc.3

- **docs:** lodash dependency
  ([a02f10d](https://github.com/bootstrap-vue/bootstrap-vue/commit/a02f10d))

<a name="2.0.0-rc.2"></a>

## [v2.0.0-rc.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.1...v2.0.0-rc.2)

Released: 2018-03-06

### Features v2.0.0-rc.2

- **popovers / tooltips:** Accept an HTMLElement as a valid target
  ([a375452](https://github.com/bootstrap-vue/bootstrap-vue/commit/a375452))
- **tab:** add title slot ([#1586](https://github.com/bootstrap-vue/bootstrap-vue/pull/1586))
  ([724b453](https://github.com/bootstrap-vue/bootstrap-vue/commit/724b453))
- **table:** Use object's property as a key
  ([#1614](https://github.com/bootstrap-vue/bootstrap-vue/pull/1614))
  ([4464f0a](https://github.com/bootstrap-vue/bootstrap-vue/commit/4464f0a))
- **tooltip:** Allow a function as a tooltip target attribute
  ([#1493](https://github.com/bootstrap-vue/bootstrap-vue/pull/1493))
  ([048c3d4](https://github.com/bootstrap-vue/bootstrap-vue/commit/048c3d4))

### Bug Fixes v2.0.0-rc.2

- **modal:** fix v-b-modal directive unbinding
  ([#1617](https://github.com/bootstrap-vue/bootstrap-vue/pull/1617))
  ([3f6a86a](https://github.com/bootstrap-vue/bootstrap-vue/commit/3f6a86a))
- **table:** avoid HTML injection in table data
  ([63d8097](https://github.com/bootstrap-vue/bootstrap-vue/commit/63d8097))
- **table:** allow empty labels
  ([5ee0923](https://github.com/bootstrap-vue/bootstrap-vue/commit/5ee0923))
- **table:** Ignore BV keys when auto-discovering table fields
  ([#1641](https://github.com/bootstrap-vue/bootstrap-vue/pull/1641))
  ([f56f3e8](https://github.com/bootstrap-vue/bootstrap-vue/commit/f56f3e8))
- **select:** Always pass selectSize to selects
  ([#1640](https://github.com/bootstrap-vue/bootstrap-vue/pull/1640))
  ([2c725f6](https://github.com/bootstrap-vue/bootstrap-vue/commit/2c725f6))
- **docs:** use "prepend" and "append" for input-group
  ([#1593](https://github.com/bootstrap-vue/bootstrap-vue/pull/1593))
  ([5b7ee09](https://github.com/bootstrap-vue/bootstrap-vue/commit/5b7ee09cb494b4c243929d8fbc28976e8330b420))
- **docs:** fix splash button styling
  ([11484b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/11484b3))
- **docs:** fix typo in docs ([#1555](https://github.com/bootstrap-vue/bootstrap-vue/pull/1555))
  ([c927377](https://github.com/bootstrap-vue/bootstrap-vue/commit/c927377))
- **docs:** spelling correction in comment
  ([#1568](https://github.com/bootstrap-vue/bootstrap-vue/issues/1568))
  ([e0e4006](https://github.com/bootstrap-vue/bootstrap-vue/commit/e0e4006))
- polyfill HTMLElement for SSR
  ([d4dd9b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/d4dd9b3))

<a name="2.0.0-rc.1"></a>

## [v2.0.0-rc.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.0...v2.0.0-rc.1)

Released: 2018-01-25

### Bug Fixes v2.0.0-rc.1

- call `removeEventListener` on the right element
  ([#1557](https://github.com/bootstrap-vue/bootstrap-vue/issues/1557))
  ([cf2bfca](https://github.com/bootstrap-vue/bootstrap-vue/commit/cf2bfca)), closes
  [#1391](https://github.com/bootstrap-vue/bootstrap-vue/issues/1391)
- **form-group:** replace .col-form-legend with .col-form-label
  ([ac2d4dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/ac2d4dd))
- **input-group:** fix dropdown rounded corners. closes
  [#1560](https://github.com/bootstrap-vue/bootstrap-vue/issues/1560).
  ([7df01ff](https://github.com/bootstrap-vue/bootstrap-vue/commit/7df01ff))
- **modal:** hide dropdown on click.
  ([#1528](https://github.com/bootstrap-vue/bootstrap-vue/issues/1528))
  ([3ad8a9a](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ad8a9a))

### Performance Improvements v2.0.0-rc.1

- **id mixin:** make localId\_ a computed field
  ([873b0e7](https://github.com/bootstrap-vue/bootstrap-vue/commit/873b0e7))

<a name="2.0.0-rc.0"></a>

## [v2.0.0-rc.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.4.0...v2.0.0-rc.0)

Released: 2018-01-23

[**Full change list**](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.5.0...v2.0.0-rc.0)

With `v2.0.0` release, BootstrapVue is compatible with final stable release of Bootstrap `v4.0.0`
and beyond.

- If you are using any custom theme which was based on BS beta, there may be minor problems to be
  fixed. Please ensure to review [migrate guide](https://getbootstrap.com/docs/4.0/migration).
- With this release, we have removed majority of CSS fixes. If you are using ES builds, you may have
  to add a `css-loader` to make it working probably.
- `input-group-addon` API has been changed and `left/right` changed into `prepend/append`. Please
  refer to the docs for more information.

<a name="1.5.0"></a>

## [v1.5.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.4.1...v1.5.0) (2018-01-23)

### Features v1.5.0

- **dropdown:** add toggleClass prop
  ([#1485](https://github.com/bootstrap-vue/bootstrap-vue/issues/1485))
  ([da16cc0](https://github.com/bootstrap-vue/bootstrap-vue/commit/da16cc0))
- **nav-item-dropdown:** add extra-toggle-classes prop with tests and docs. closes
  [#1550](https://github.com/bootstrap-vue/bootstrap-vue/issues/1550).
  ([#1555](https://github.com/bootstrap-vue/bootstrap-vue/issues/1555))
  ([7967018](https://github.com/bootstrap-vue/bootstrap-vue/commit/7967018))

<a name="1.4.1"></a>

## [v1.4.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.4.0...v1.4.1) (2018-01-14)

### Bug Fixes v1.4.1

- **alert:** import button-close in alert with a name matching tag.
  ([#1523](https://github.com/bootstrap-vue/bootstrap-vue/issues/1523)) fixes
  [#1522](https://github.com/bootstrap-vue/bootstrap-vue/issues/1522).
  ([51b527f](https://github.com/bootstrap-vue/bootstrap-vue/commit/51b527f))
- **docs play:** prevent duplicate key errors in console output
  ([#1476](https://github.com/bootstrap-vue/bootstrap-vue/issues/1476))
  ([68deee1](https://github.com/bootstrap-vue/bootstrap-vue/commit/68deee1))
- **dropdown:** fix condition for when position-static is applied
  ([#1477](https://github.com/bootstrap-vue/bootstrap-vue/issues/1477))
  ([1717edb](https://github.com/bootstrap-vue/bootstrap-vue/commit/1717edb))
- **dropdown:** fixed aria-labbeledby for non-split dropdowns
  ([d597dbc](https://github.com/bootstrap-vue/bootstrap-vue/commit/d597dbc))
- **dropdown:** prevent toggle click from closing in collapsed navbar
  ([#1475](https://github.com/bootstrap-vue/bootstrap-vue/issues/1475))
  ([24ef1e6](https://github.com/bootstrap-vue/bootstrap-vue/commit/24ef1e6)), closes
  [#1474](https://github.com/bootstrap-vue/bootstrap-vue/issues/1474)
- **id:** fixed check for \_uid in client side id generator
  ([#1499](https://github.com/bootstrap-vue/bootstrap-vue/issues/1499))
  ([f3fe0f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/f3fe0f4))

### Performance Improvements v1.4.1

- **dropdown:** changed 'this' to 't'
  ([#1500](https://github.com/bootstrap-vue/bootstrap-vue/issues/1500))
  ([ace3e94](https://github.com/bootstrap-vue/bootstrap-vue/commit/ace3e94))

<a name="1.4.0"></a>

## [v1.4.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.3.0...v1.4.0)

Released: 2017-12-15

### Bug Fixes v1.4.0

- **button:** allow custom size classes to be passed to the size prop
  ([#1389](https://github.com/bootstrap-vue/bootstrap-vue/issues/1389))
  ([41a46b2](https://github.com/bootstrap-vue/bootstrap-vue/commit/41a46b2))
- **carousel:** clear timers on beforeDestroy
  ([fa1c083](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa1c083))
- **carousel:** remove un-needed `aria-` atribute on slides
  ([#1448](https://github.com/bootstrap-vue/bootstrap-vue/issues/1448))
  ([260919f](https://github.com/bootstrap-vue/bootstrap-vue/commit/260919f))
- **carousel:** uncaught typeerror on empty slides.
  ([#1401](https://github.com/bootstrap-vue/bootstrap-vue/issues/1401))
  ([cadae79](https://github.com/bootstrap-vue/bootstrap-vue/commit/cadae79))
- **dropdown:** use class `position-static` instead of inline style
  ([#1451](https://github.com/bootstrap-vue/bootstrap-vue/issues/1451))
  ([fc49325](https://github.com/bootstrap-vue/bootstrap-vue/commit/fc49325))
- **dropdowns:** prevent memory leak on destroy
  ([#1392](https://github.com/bootstrap-vue/bootstrap-vue/issues/1392))
  ([839418e](https://github.com/bootstrap-vue/bootstrap-vue/commit/839418e)), closes
  [#1391](https://github.com/bootstrap-vue/bootstrap-vue/issues/1391)
- **form-group:** import b-form-row directly from layout
  ([8dcce39](https://github.com/bootstrap-vue/bootstrap-vue/commit/8dcce39))
- **form-radio-group:** prepare for Bootstrap V4.beta.3
  ([39eb237](https://github.com/bootstrap-vue/bootstrap-vue/commit/39eb237))
- **form-radio-group:** prepare for Bootstrap V4.beta.3
  ([5b659d1](https://github.com/bootstrap-vue/bootstrap-vue/commit/5b659d1))
- **id mixin:** set prop type to String
  ([9a6eaa5](https://github.com/bootstrap-vue/bootstrap-vue/commit/9a6eaa5))
- **list-group:** disabled button items
  ([#1444](https://github.com/bootstrap-vue/bootstrap-vue/issues/1444))
  ([c037b38](https://github.com/bootstrap-vue/bootstrap-vue/commit/c037b38))
- **modal:** rounded-top class no longer needed when header variant applied
  ([#1433](https://github.com/bootstrap-vue/bootstrap-vue/issues/1433))
  ([ecf1bf5](https://github.com/bootstrap-vue/bootstrap-vue/commit/ecf1bf5))
- **modal:** update centered modal margins to align with BSV4.beta.3 update
  ([f7e80a8](https://github.com/bootstrap-vue/bootstrap-vue/commit/f7e80a8))
- **table:** better custom css specificity for when nesting tables
  ([7acccb9](https://github.com/bootstrap-vue/bootstrap-vue/commit/7acccb9))
- **table:** correct fixd-top row scoped slot properties
  ([debf8e2](https://github.com/bootstrap-vue/bootstrap-vue/commit/debf8e2))
- **table:** initial busy of true always makes table busy
  ([#1400](https://github.com/bootstrap-vue/bootstrap-vue/issues/1400))
  ([029e4d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/029e4d0)), closes
  [#1398](https://github.com/bootstrap-vue/bootstrap-vue/issues/1398)
- detach clickout listener in beforeDestroy
  ([b290cad](https://github.com/bootstrap-vue/bootstrap-vue/commit/b290cad))
- **table:** use stable sort algorithm to prevent SSR issues
  ([#1399](https://github.com/bootstrap-vue/bootstrap-vue/issues/1399))
  ([21b33f2](https://github.com/bootstrap-vue/bootstrap-vue/commit/21b33f2))
- **tooltip+popover:** auto-append to `.modal-content` instead of `.modal`
  ([#1465](https://github.com/bootstrap-vue/bootstrap-vue/issues/1465))
  ([b53715c](https://github.com/bootstrap-vue/bootstrap-vue/commit/b53715c)), closes
  [#1464](https://github.com/bootstrap-vue/bootstrap-vue/issues/1464)
- remove listenOnRoot handlers in beforeDestroy
  ([e594490](https://github.com/bootstrap-vue/bootstrap-vue/commit/e594490))
- SFC transpilation in es buld ([#1410](https://github.com/bootstrap-vue/bootstrap-vue/issues/1410))
  ([3ef9572](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ef9572))

### Features v1.4.0

- **dropdowns:** add boundary prop for controlling placement constraint
  ([#1440](https://github.com/bootstrap-vue/bootstrap-vue/issues/1440))
  ([01498cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/01498cb))
- **form-group:** new label-size prop
  ([b8311e5](https://github.com/bootstrap-vue/bootstrap-vue/commit/b8311e5))
- **form-group:** new label-size prop
  ([#1422](https://github.com/bootstrap-vue/bootstrap-vue/issues/1422))
  ([dcffb5c](https://github.com/bootstrap-vue/bootstrap-vue/commit/dcffb5c))
- **form-group:** new prop for label-class, deprecate prop feedback in favor of invalid-feedback
  ([#1412](https://github.com/bootstrap-vue/bootstrap-vue/issues/1412))
  ([44f13a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/44f13a5))
- **form-group:** render label element if prop label-for set + horizontal layout optimizations
  ([#1423](https://github.com/bootstrap-vue/bootstrap-vue/issues/1423))
  ([ce164bf](https://github.com/bootstrap-vue/bootstrap-vue/commit/ce164bf))
- **form-group:** set aria-describedby attribute on input if label-for provided
  ([#1431](https://github.com/bootstrap-vue/bootstrap-vue/issues/1431))
  ([6bd12bb](https://github.com/bootstrap-vue/bootstrap-vue/commit/6bd12bb))
- **modal:** new props for adding classes to header, body and footer
  ([#1462](https://github.com/bootstrap-vue/bootstrap-vue/issues/1462))
  ([bc67a2d](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc67a2d))
- **pagination+pagination-nav:** remove need for custom active focus style
  ([#1384](https://github.com/bootstrap-vue/bootstrap-vue/issues/1384))
  ([ecd9b6a](https://github.com/bootstrap-vue/bootstrap-vue/commit/ecd9b6a))
- **table:** add responsive stacked table option
  ([#1407](https://github.com/bootstrap-vue/bootstrap-vue/issues/1407))
  ([26c35ba](https://github.com/bootstrap-vue/bootstrap-vue/commit/26c35ba))
- **table:** add toggleDetails method to scoped item slots
  ([#1404](https://github.com/bootstrap-vue/bootstrap-vue/issues/1404))
  ([e02fa49](https://github.com/bootstrap-vue/bootstrap-vue/commit/e02fa49))
- **tabs:** add name to helper component for better debugging
  ([51ef9e3](https://github.com/bootstrap-vue/bootstrap-vue/commit/51ef9e3))
- **tabs:** add no-body prop to b-tab
  ([#1385](https://github.com/bootstrap-vue/bootstrap-vue/issues/1385))
  ([af36c0e](https://github.com/bootstrap-vue/bootstrap-vue/commit/af36c0e))
- **tooltip+popover:** add boundary element config option (positioning constraint)
  ([#1439](https://github.com/bootstrap-vue/bootstrap-vue/issues/1439))
  ([08fd7ce](https://github.com/bootstrap-vue/bootstrap-vue/commit/08fd7ce))
- **tooltip+popover:** programmatically disable/enable tooltip or popover
  ([#1387](https://github.com/bootstrap-vue/bootstrap-vue/issues/1387))
  ([c83e0d5](https://github.com/bootstrap-vue/bootstrap-vue/commit/c83e0d5))
- **v-b-modal:** set role="button" if trigger element is not a button
  ([aa45d3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/aa45d3e))
- **v-b-toggle:** add role 'button' when trigger is not a button
  ([c2dd2d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/c2dd2d0))

### Performance Improvements v1.4.0

- **dropdowns:** use non reactive property to store popper.js instance
  ([#1416](https://github.com/bootstrap-vue/bootstrap-vue/issues/1416))
  ([379d9a8](https://github.com/bootstrap-vue/bootstrap-vue/commit/379d9a8))
- evalute slots() once in functional component render functions
  ([#1438](https://github.com/bootstrap-vue/bootstrap-vue/issues/1438))
  ([3c42477](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c42477))

<a name="1.3.0"></a>

## [v1.3.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.2.0...v1.3.0)

Relased: 2017-11-29

### Bug Fixes v1.3.0

- **button:** allow custom size classes to be passed to the size prop
  ([#1389](https://github.com/bootstrap-vue/bootstrap-vue/issues/1389))
  ([96fb934](https://github.com/bootstrap-vue/bootstrap-vue/commit/96fb934))
- **carousel:** clear timers on beforeDestroy
  ([53ea1b4](https://github.com/bootstrap-vue/bootstrap-vue/commit/53ea1b4))
- **carousel:** uncaught typeerror on empty slides.
  ([#1401](https://github.com/bootstrap-vue/bootstrap-vue/issues/1401))
  ([a2ee9b6](https://github.com/bootstrap-vue/bootstrap-vue/commit/a2ee9b6))
- **dropdowns:** prevent memory leak on destroy
  ([#1392](https://github.com/bootstrap-vue/bootstrap-vue/issues/1392))
  ([05a5c50](https://github.com/bootstrap-vue/bootstrap-vue/commit/05a5c50)), closes
  [#1391](https://github.com/bootstrap-vue/bootstrap-vue/issues/1391)
- **form-group:** import b-form-row directly from layout
  ([b43d7c8](https://github.com/bootstrap-vue/bootstrap-vue/commit/b43d7c8))
- **id mixin:** set prop type to String
  ([37ab5cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/37ab5cb))
- **table:** better custom css specificity for when nesting tables
  ([4a2d121](https://github.com/bootstrap-vue/bootstrap-vue/commit/4a2d121))
- **table:** correct fixd-top row scoped slot properties
  ([7e042f1](https://github.com/bootstrap-vue/bootstrap-vue/commit/7e042f1))
- **table:** initial busy of true always makes table busy
  ([#1400](https://github.com/bootstrap-vue/bootstrap-vue/issues/1400))
  ([5daa0df](https://github.com/bootstrap-vue/bootstrap-vue/commit/5daa0df)), closes
  [#1398](https://github.com/bootstrap-vue/bootstrap-vue/issues/1398)
- **table:** use stable sort algorithm to prevent SSR issues
  ([#1399](https://github.com/bootstrap-vue/bootstrap-vue/issues/1399))
  ([552c438](https://github.com/bootstrap-vue/bootstrap-vue/commit/552c438))
- detach clickout listener in beforeDestroy
  ([89618de](https://github.com/bootstrap-vue/bootstrap-vue/commit/89618de))
- detach listenOnRoot handlers in beforeDestroy
  ([7f7eba1](https://github.com/bootstrap-vue/bootstrap-vue/commit/7f7eba1))
- SFC transpilation in es buld ([#1410](https://github.com/bootstrap-vue/bootstrap-vue/issues/1410))
  ([ce80809](https://github.com/bootstrap-vue/bootstrap-vue/commit/ce80809))

### Features v1.3.0

- **form-group:** new prop for label-class, deprecate prop feedback in favor of invalid-feedback
  ([#1412](https://github.com/bootstrap-vue/bootstrap-vue/issues/1412))
  ([7d61cb4](https://github.com/bootstrap-vue/bootstrap-vue/commit/7d61cb4))
- **pagination+pagination-nav:** remove need for custom active focus style
  ([#1384](https://github.com/bootstrap-vue/bootstrap-vue/issues/1384))
  ([1e1b099](https://github.com/bootstrap-vue/bootstrap-vue/commit/1e1b099))
- **table:** add responsive stacked table option
  ([#1407](https://github.com/bootstrap-vue/bootstrap-vue/issues/1407))
  ([df23115](https://github.com/bootstrap-vue/bootstrap-vue/commit/df23115))
- **table:** add toggleDetails method to scoped item slots
  ([#1404](https://github.com/bootstrap-vue/bootstrap-vue/issues/1404))
  ([a9c4b7d](https://github.com/bootstrap-vue/bootstrap-vue/commit/a9c4b7d))
- **tabs:** add name to helper component for better debugging
  ([51ef9e3](https://github.com/bootstrap-vue/bootstrap-vue/commit/51ef9e3))
- **tabs:** add no-body prop to b-tab
  ([#1385](https://github.com/bootstrap-vue/bootstrap-vue/issues/1385))
  ([ef3ff06](https://github.com/bootstrap-vue/bootstrap-vue/commit/ef3ff06))
- **tooltip+popover:** programmatically disable/enable tooltip or popover
  ([#1387](https://github.com/bootstrap-vue/bootstrap-vue/issues/1387))
  ([8104cb4](https://github.com/bootstrap-vue/bootstrap-vue/commit/8104cb4))

## [v1.2.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.1.0...v1.2.0)

Released: 2017-11-20

### Bug Fixes v1.2.0

- **ci:** auto deploy docs from master branch
  ([22e432d](https://github.com/bootstrap-vue/bootstrap-vue/commit/22e432d))
- **form-file:** invalid/valid feedback display for plain file input missing in Bootstrap V4
  ([#1373](https://github.com/bootstrap-vue/bootstrap-vue/issues/1373))
  ([85ab0d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/85ab0d0))
- **form-textarea:** initial value population
  ([#1370](https://github.com/bootstrap-vue/bootstrap-vue/issues/1370))
  ([a08a46e](https://github.com/bootstrap-vue/bootstrap-vue/commit/a08a46e)), closes
  [#1368](https://github.com/bootstrap-vue/bootstrap-vue/issues/1368)
- **table:** fix outlined table
  ([e81b107](https://github.com/bootstrap-vue/bootstrap-vue/commit/e81b107))
- **tabs:** lazy prop regression
  ([#1372](https://github.com/bootstrap-vue/bootstrap-vue/issues/1372))
  ([844cd81](https://github.com/bootstrap-vue/bootstrap-vue/commit/844cd81)), closes
  [#1371](https://github.com/bootstrap-vue/bootstrap-vue/issues/1371)

### Features v1.2.0

- **modal:** fix for overflowing centered modal to scroll
  ([#1363](https://github.com/bootstrap-vue/bootstrap-vue/issues/1363))
  ([3b3ba32](https://github.com/bootstrap-vue/bootstrap-vue/commit/3b3ba32))
- **pagination+pagination-nav:** disabled styling now works in BS V4.beta.2
  ([#1381](https://github.com/bootstrap-vue/bootstrap-vue/issues/1381))
  ([d51349f](https://github.com/bootstrap-vue/bootstrap-vue/commit/d51349f))
- **tabs:** vertical tabs + new props for adding classes to inner elements
  ([#1362](https://github.com/bootstrap-vue/bootstrap-vue/issues/1362))
  ([51d0e03](https://github.com/bootstrap-vue/bootstrap-vue/commit/51d0e03))
- **tooltip+popover:** ability to programmatically show and hide tooltip and popover
  ([#1366](https://github.com/bootstrap-vue/bootstrap-vue/issues/1366))
  ([360b337](https://github.com/bootstrap-vue/bootstrap-vue/commit/360b337))

## [v1.1.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.2...v1.1.0)

Released: 2017-11-18

### Bug Fixes v1.1.0

- **button-close:** switch to slots() from children
  ([#1345](https://github.com/bootstrap-vue/bootstrap-vue/issues/1345))
  ([9c997b7](https://github.com/bootstrap-vue/bootstrap-vue/commit/9c997b7))
- **form-check+radio mixin:** pull state from parent group
  ([6845014](https://github.com/bootstrap-vue/bootstrap-vue/commit/6845014))
- **form-checkbox:** apply form state class to hidden inputs
  ([710369c](https://github.com/bootstrap-vue/bootstrap-vue/commit/710369c))
- **form-radio:** apply form state to hidden input element
  ([3074ecc](https://github.com/bootstrap-vue/bootstrap-vue/commit/3074ecc))
- **form-textarea:** monitor localValue instead of value when calculating lines
  ([9f3439f](https://github.com/bootstrap-vue/bootstrap-vue/commit/9f3439f))
- **input-group:** correct input-group right addon via prop
  ([#1317](https://github.com/bootstrap-vue/bootstrap-vue/issues/1317))
  ([061abc5](https://github.com/bootstrap-vue/bootstrap-vue/commit/061abc5))
- **link:** take link out of tab sequence if disabled
  ([#1347](https://github.com/bootstrap-vue/bootstrap-vue/issues/1347))
  ([360588a](https://github.com/bootstrap-vue/bootstrap-vue/commit/360588a))
- **link:** restore original tabindex when not disabled
  ([cfdf0b9](https://github.com/bootstrap-vue/bootstrap-vue/commit/cfdf0b9))
- **modal:** modal-open body class lost when switching between modals
  ([#1327](https://github.com/bootstrap-vue/bootstrap-vue/issues/1327))
  ([99e146f](https://github.com/bootstrap-vue/bootstrap-vue/commit/99e146f)), closes
  [#1325](https://github.com/bootstrap-vue/bootstrap-vue/issues/1325)
- **popover+tooltip:** content not restored after hiding all popovers with 'bv::hide::popover'
  ([#1323](https://github.com/bootstrap-vue/bootstrap-vue/issues/1323))
  ([94488c6](https://github.com/bootstrap-vue/bootstrap-vue/commit/94488c6)), closes
  [#1322](https://github.com/bootstrap-vue/bootstrap-vue/issues/1322)
- **popover+tooltip:** improve blur trigger handling
  ([c08b815](https://github.com/bootstrap-vue/bootstrap-vue/commit/c08b815))

### Features v1.1.0

- **eslint:** update settings to remove editor errors
  ([#792](https://github.com/bootstrap-vue/bootstrap-vue/issues/792))
  ([c33d1d4](https://github.com/bootstrap-vue/bootstrap-vue/commit/c33d1d4))
- **form-file:** Use `label` as wrapper element + name-spaced custom CSS
  ([#1353](https://github.com/bootstrap-vue/bootstrap-vue/issues/1353))
  ([e2bc891](https://github.com/bootstrap-vue/bootstrap-vue/commit/e2bc891))
- **form-group:** add valid feedback support
  ([#1360](https://github.com/bootstrap-vue/bootstrap-vue/issues/1360))
  ([7f3535b](https://github.com/bootstrap-vue/bootstrap-vue/commit/7f3535b))
- **nuxt:** add bvCSS option. resolves
  [#1351](https://github.com/bootstrap-vue/bootstrap-vue/issues/1351).
  ([3a7517f](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a7517f))
- **package:** add lint by default for tests
  ([f1ca71e](https://github.com/bootstrap-vue/bootstrap-vue/commit/f1ca71e))
- **package:** use es build by default
  ([142d517](https://github.com/bootstrap-vue/bootstrap-vue/commit/142d517))
- **table:** add outlined option
  ([#1355](https://github.com/bootstrap-vue/bootstrap-vue/issues/1355))
  ([7ba183e](https://github.com/bootstrap-vue/bootstrap-vue/commit/7ba183e))
- **table:** caption positioning prop
  ([#1341](https://github.com/bootstrap-vue/bootstrap-vue/issues/1341))
  ([7c86e66](https://github.com/bootstrap-vue/bootstrap-vue/commit/7c86e66))

### Performance Improvements v1.1.0

- **alert:** convert template to render function
  ([#1308](https://github.com/bootstrap-vue/bootstrap-vue/issues/1308))
  ([8b0c7cd](https://github.com/bootstrap-vue/bootstrap-vue/commit/8b0c7cd))
- **build:** reduce minified code size
  ([#1337](https://github.com/bootstrap-vue/bootstrap-vue/issues/1337))
  ([9d0ae3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d0ae3e))
- **button-toolbar:** convert template to render function
  ([#1315](https://github.com/bootstrap-vue/bootstrap-vue/issues/1315))
  ([765bfe3](https://github.com/bootstrap-vue/bootstrap-vue/commit/765bfe3))
- **carousel:** convert templates to render functions
  ([#1339](https://github.com/bootstrap-vue/bootstrap-vue/issues/1339))
  ([13f429f](https://github.com/bootstrap-vue/bootstrap-vue/commit/13f429f))
- **collapse:** convert template to render function
  ([#1316](https://github.com/bootstrap-vue/bootstrap-vue/issues/1316))
  ([722ea12](https://github.com/bootstrap-vue/bootstrap-vue/commit/722ea12))
- **dropdowns:** convert templates to render functions
  ([#1314](https://github.com/bootstrap-vue/bootstrap-vue/issues/1314))
  ([3168e93](https://github.com/bootstrap-vue/bootstrap-vue/commit/3168e93))
- **form-checkboxes:** convert templates to render functions
  ([#1338](https://github.com/bootstrap-vue/bootstrap-vue/issues/1338))
  ([49bc50b](https://github.com/bootstrap-vue/bootstrap-vue/commit/49bc50b))
- **form-file:** convert template to render function
  ([#1329](https://github.com/bootstrap-vue/bootstrap-vue/issues/1329))
  ([ec96f82](https://github.com/bootstrap-vue/bootstrap-vue/commit/ec96f82))
- **form-group:** convert template to render function
  ([#1332](https://github.com/bootstrap-vue/bootstrap-vue/issues/1332))
  ([f409392](https://github.com/bootstrap-vue/bootstrap-vue/commit/f409392))
- **form-input:** convert template to render function
  ([#1330](https://github.com/bootstrap-vue/bootstrap-vue/issues/1330))
  ([12f0423](https://github.com/bootstrap-vue/bootstrap-vue/commit/12f0423))
- **form-radios:** convert templates to render functions
  ([#1336](https://github.com/bootstrap-vue/bootstrap-vue/issues/1336))
  ([3a2aa0a](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a2aa0a))
- **form-select:** convert template to render function
  ([#1333](https://github.com/bootstrap-vue/bootstrap-vue/issues/1333))
  ([9adfc12](https://github.com/bootstrap-vue/bootstrap-vue/commit/9adfc12))
- add event KeyCode constants in utils
  ([#1346](https://github.com/bootstrap-vue/bootstrap-vue/issues/1346))
  ([714d748](https://github.com/bootstrap-vue/bootstrap-vue/commit/714d748))
- **form-textarea:** convert template to render function
  ([#1331](https://github.com/bootstrap-vue/bootstrap-vue/issues/1331))
  ([5293e71](https://github.com/bootstrap-vue/bootstrap-vue/commit/5293e71))
- **img-lazy:** convert template to render function
  ([#1309](https://github.com/bootstrap-vue/bootstrap-vue/issues/1309))
  ([1736eb9](https://github.com/bootstrap-vue/bootstrap-vue/commit/1736eb9))
- **modal:** convert template to render function
  ([#1340](https://github.com/bootstrap-vue/bootstrap-vue/issues/1340))
  ([bb7ec04](https://github.com/bootstrap-vue/bootstrap-vue/commit/bb7ec04))
- **navbar-toggle:** convert template to render function
  ([#1313](https://github.com/bootstrap-vue/bootstrap-vue/issues/1313))
  ([88657fb](https://github.com/bootstrap-vue/bootstrap-vue/commit/88657fb))
- **pagination+pagination-nav:** convert templates to render function
  ([#1348](https://github.com/bootstrap-vue/bootstrap-vue/issues/1348))
  ([e04291f](https://github.com/bootstrap-vue/bootstrap-vue/commit/e04291f))
- **popover:** convert template to render function
  ([#1311](https://github.com/bootstrap-vue/bootstrap-vue/issues/1311))
  ([de24eec](https://github.com/bootstrap-vue/bootstrap-vue/commit/de24eec))
- **progress:** convert template to render function
  ([#1312](https://github.com/bootstrap-vue/bootstrap-vue/issues/1312))
  ([20d7d0b](https://github.com/bootstrap-vue/bootstrap-vue/commit/20d7d0b))
- **table:** convert template to render function
  ([#1350](https://github.com/bootstrap-vue/bootstrap-vue/issues/1350))
  ([6a1ef4f](https://github.com/bootstrap-vue/bootstrap-vue/commit/6a1ef4f))
- **tabs:** convert templates to render functions
  ([#1319](https://github.com/bootstrap-vue/bootstrap-vue/issues/1319))
  ([b45f550](https://github.com/bootstrap-vue/bootstrap-vue/commit/b45f550))
- **tooltip:** convert template to render function
  ([#1310](https://github.com/bootstrap-vue/bootstrap-vue/issues/1310))
  ([c812cb0](https://github.com/bootstrap-vue/bootstrap-vue/commit/c812cb0))

## [v1.0.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.1...v1.0.2)

Released: 2017-11-07

### Bug Fixes v1.0.2

- **form-file:** control size not supported in BS V4
  ([#1305](https://github.com/bootstrap-vue/bootstrap-vue/issues/1305))
  ([e9a26cf](https://github.com/bootstrap-vue/bootstrap-vue/commit/e9a26cf)) Reverts
  [#1304](https://github.com/bootstrap-vue/bootstrap-vue/pull/1304)

## [v1.0.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0...v1.0.1)

Relesed: 2017-11-07

### Bug Fixes v1.0.1

- **build:** use esm bundle. resolves
  [#1296](https://github.com/bootstrap-vue/bootstrap-vue/issues/1296).
  ([06d40a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/06d40a5))
- **nuxt module:** wrong relative path to package.json
  ([#1298](https://github.com/bootstrap-vue/bootstrap-vue/issues/1298))
  ([e766e75](https://github.com/bootstrap-vue/bootstrap-vue/commit/e766e75))
- **form-file** missing formSizeMixin
  ([#1304](https://github.com/bootstrap-vue/bootstrap-vue/pull/1304))

## [v1.0.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0-beta.9...v1.0.0)

Released: 2017-11-05

**Version v1.0.0 marks BootstrapVue's departure from the beta development phase.**

BootstrapVue v1.0.0 is based on the latest Bootstrap v4.0.0-beta.2 CSS, although it should work
without major changes when Bootstrap V4.0.0-beta.3 is released.

Notable changes:

- Support for Bootstrap v4.0.0-beta.2
- New modularized build structure
- Dist code now available in `es` format for simpler importing of individual components
- Component groups and directives are now importable as Vue plugins
- `<b-table>` enhancements
- `<b-modal>` improvements and features
- Tooltip and popover fixes and new positioning options
- Form invalid-feedback fixes (via new BSV4.beta.2 CSS)
- Various fixes/improvements to form controls
- ARIA improvements
- Expanded documentation and examples

### Breaking Changes v1.0.0

v1.0.0 introduces a new source code structure. For those users that are importing individual
components, the path to the individual components has changed. Please reference the
[GitHub repo](https://github.com/bootstrap-vue/bootstrap-vue/) and
[documentation](https://bootstrap-vue.js.org/docs) for the new structure and information on
importing.

### Bug Fixes v1.0.0

- remove spacing between stacked buttons
  ([554e54a](https://github.com/bootstrap-vue/bootstrap-vue/commit/554e54a))
- **button:** don't overwrite user supplied tabindex if not disabled
  ([#1120](https://github.com/bootstrap-vue/bootstrap-vue/issues/1120))
  ([18f5129](https://github.com/bootstrap-vue/bootstrap-vue/commit/18f5129))
- **button-close:** hardcode `&times;` character to prevent SSR bailing
  ([b0dd1ba](https://github.com/bootstrap-vue/bootstrap-vue/commit/b0dd1ba))
- **button-group:** Bootstrap V4.beta.2 CSS changes
  ([1b4618f](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b4618f))
- **carousel:** minor adjustments to focusout/mouseout event handler
  ([#1239](https://github.com/bootstrap-vue/bootstrap-vue/issues/1239))
  ([330b70b](https://github.com/bootstrap-vue/bootstrap-vue/commit/330b70b))
- **dom utils:** use `getBoundingClientRect()` to determine element visibility
  ([#1203](https://github.com/bootstrap-vue/bootstrap-vue/issues/1203))
  ([6e2fff4](https://github.com/bootstrap-vue/bootstrap-vue/commit/6e2fff4))
- **dropdown:** Bootstrap V4.beta.2 now has better hover/focus styling
  ([#1224](https://github.com/bootstrap-vue/bootstrap-vue/issues/1224))
  ([0b8bc67](https://github.com/bootstrap-vue/bootstrap-vue/commit/0b8bc67))
- **form-checkbox-group:** support changes to button styles
  ([431eb02](https://github.com/bootstrap-vue/bootstrap-vue/commit/431eb02))
- **form-checkbox-group:** import `b-form-checkbox`
  ([09187ea](https://github.com/bootstrap-vue/bootstrap-vue/commit/09187ea))
- **form-file:** focus styling tweaks
  ([c3bc583](https://github.com/bootstrap-vue/bootstrap-vue/commit/c3bc583))
- **form-input:** BS V4.beta.2 is missing `width:100%` on readonly plaintext
  ([#1225](https://github.com/bootstrap-vue/bootstrap-vue/issues/1225))
  ([c37cef4](https://github.com/bootstrap-vue/bootstrap-vue/commit/c37cef4))
- **form-options:** handle object special cases
  ([#1099](https://github.com/bootstrap-vue/bootstrap-vue/issues/1099))
  ([1b17df3](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b17df3))
- **form-radio-group:** add support for `Boolean` value
  ([4cafb27](https://github.com/bootstrap-vue/bootstrap-vue/commit/4cafb27))
- **form-radio-group:** allow number type for checked
  ([#1089](https://github.com/bootstrap-vue/bootstrap-vue/issues/1089))
  ([8eccdbc](https://github.com/bootstrap-vue/bootstrap-vue/commit/8eccdbc)) CLoses
  [#1088](https://github.com/bootstrap-vue/bootstrap-vue/issues/1088)
- **form-radio-group:** support changes to button styles
  ([063e9d8](https://github.com/bootstrap-vue/bootstrap-vue/commit/063e9d8))
- **form-radio-group:** fix missing import of `b-form-radio`
  ([82bb078](https://github.com/bootstrap-vue/bootstrap-vue/commit/82bb078)) Closes
  [#1201](https://github.com/bootstrap-vue/bootstrap-vue/issues/1201)
- **form-select:** custom select now supports `multiple` attribute in V4.beta.2 CSS
  ([#1223](https://github.com/bootstrap-vue/bootstrap-vue/issues/1223))
  ([3a4262d](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a4262d))
- **img-lazy:** `alt` tag was being removed when image loaded
  ([f2fb99c](https://github.com/bootstrap-vue/bootstrap-vue/commit/f2fb99c)) Closes
  [#1179](https://github.com/bootstrap-vue/bootstrap-vue/issues/1179)
- **input-group:** BS V4.beta CSS no longer has the `has-${state}` classes
  ([#1155](https://github.com/bootstrap-vue/bootstrap-vue/issues/1155))
  ([9f4df16](https://github.com/bootstrap-vue/bootstrap-vue/commit/9f4df16))
- **link:** Only set attribute `aria-disabled` when actually disabled
  ([fe2c340](https://github.com/bootstrap-vue/bootstrap-vue/commit/fe2c340))
- **modal:** add outer wrapper div, so `lazy` modals will still have a \$ref when hidden
  ([7f7e6a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/7f7e6a7)) Closes
  [#1186](https://github.com/bootstrap-vue/bootstrap-vue/issues/1186)
- **modal:** ensure body scrollbar is removed if modal destroyed before being closed
  ([#1168](https://github.com/bootstrap-vue/bootstrap-vue/issues/1168))
  ([e0a4444](https://github.com/bootstrap-vue/bootstrap-vue/commit/e0a4444)) Closes
  [#1167](https://github.com/bootstrap-vue/bootstrap-vue/issues/1167)
- **modal:** modal jumps when dialog height changes
  ([#1182](https://github.com/bootstrap-vue/bootstrap-vue/issues/1182))
  ([126fe95](https://github.com/bootstrap-vue/bootstrap-vue/commit/126fe95))
- **nav-item-dropdown:** fix disabled in toggleClasses
  ([#1123](https://github.com/bootstrap-vue/bootstrap-vue/issues/1123))
  ([aabc54d](https://github.com/bootstrap-vue/bootstrap-vue/commit/aabc54d))
  vue/bootstrap-vue/issues/1228))
  ([87cfab4](https://github.com/bootstrap-vue/bootstrap-vue/commit/87cfab4))
- **pagination-nav:** ARIA tabing control
  ([92d0810](https://github.com/bootstrap-vue/bootstrap-vue/commit/92d0810))
- **progress:** apply height style correctly
  ([675c1c9](https://github.com/bootstrap-vue/bootstrap-vue/commit/675c1c9))
- **progress:** Bootstrap V4.beta.2 CSS height prop change
  ([#1217](https://github.com/bootstrap-vue/bootstrap-vue/issues/1217))
  ([a963ea3](https://github.com/bootstrap-vue/bootstrap-vue/commit/a963ea3)), closes
  [#1216](https://github.com/bootstrap-vue/bootstrap-vue/issues/1216)
- **progress:** Bootstrap V4.beta.2 missing progress bar transition
  ([1f1064f](https://github.com/bootstrap-vue/bootstrap-vue/commit/1f1064f26fd2b052500ffbed2f68d2cf3c2193f1))
- **table:** don't startcase field label when label explicitly given
  ([76a511f](https://github.com/bootstrap-vue/bootstrap-vue/commit/76a511f)) Closes
  [#1142](https://github.com/bootstrap-vue/bootstrap-vue/issues/1142)
- **tabs:** apply `small` class to parent `ul.nav`
  ([#1248](https://github.com/bootstrap-vue/bootstrap-vue/issues/1248))
  ([42f8a78](https://github.com/bootstrap-vue/bootstrap-vue/commit/42f8a78))
- **tooltip:** emit correct `$root` event name
  ([87e5eb2](https://github.com/bootstrap-vue/bootstrap-vue/commit/87e5eb2)) Closes
  [#1094](https://github.com/bootstrap-vue/bootstrap-vue/issues/1094)
- **tooltip+popover:** prevent orphaned tooltip/popover divs
  ([f8cdf26](https://github.com/bootstrap-vue/bootstrap-vue/commit/f8cdf26)) Closes
  [#1208](https://github.com/bootstrap-vue/bootstrap-vue/issues/1208)
- **package.json:** move Bootstrap back to devDep and update popper.js version
  ([#1228](https://github.com/bootstrap-

### Features v1.0.0

- make components & directives available as Vue plugins
  ([13d9a42](https://github.com/bootstrap-vue/bootstrap-vue/commit/13d9a42d9e3d9b076eef5d8de86b9e6aff73551f))
- new file structure and `es` build
  ([6cfcd54](https://github.com/bootstrap-vue/bootstrap-vue/commit/6cfcd545ccd362e8cc3a042be5e9f953d5f6a807))
- **badge:** support actionable (link) badges
  ([#1226](https://github.com/bootstrap-vue/bootstrap-vue/issues/1226))
  ([ba2b5b4](https://github.com/bootstrap-vue/bootstrap-vue/commit/ba2b5b4))
- **card:** add prop `body-class`
  ([#1250](https://github.com/bootstrap-vue/bootstrap-vue/issues/1250))
  ([23fc3be](https://github.com/bootstrap-vue/bootstrap-vue/commit/23fc3be)) Closes
  [1249](https://github.com/bootstrap-vue/bootstrap-vue/issues/1249)
- **col:** column offsets are now back with the release Bootstrap V4.0-.0-beta.2
- **docs:** various expanded examples and additions
- **dropdown:** optionally hide the dropdown toggle caret
  ([#1197](https://github.com/bootstrap-vue/bootstrap-vue/issues/1197))
  ([960877c](https://github.com/bootstrap-vue/bootstrap-vue/commit/960877c))
- **dropdown:** allow space and cursor down to trigger opening of menus
  ([#1159](https://github.com/bootstrap-vue/bootstrap-vue/issues/1159))
  ([1249f51](https://github.com/bootstrap-vue/bootstrap-vue/commit/1249f51))
- **form-group:** switch to fieldset + legend for better semantic markup and ARIA support
  ([#1129](https://github.com/bootstrap-vue/bootstrap-vue/issues/1129))
  ([7a62b75](https://github.com/bootstrap-vue/bootstrap-vue/commit/7a62b75))
- **form-radio + form-checkbox:** prep for BSV4.beta.3 plain checkbox/radio validation styling
  ([81989ab](https://github.com/bootstrap-vue/bootstrap-vue/commit/81989ab))
- **form-select:** emit `change` event on user interaction
  ([3cc0f05](https://github.com/bootstrap-vue/bootstrap-vue/commit/3cc0f05)) Closes
  [#959](https://github.com/bootstrap-vue/bootstrap-vue/issues/959)
- **modal:** add Bootstrap V4 anticipated verticaly centered modal
  ([#1246](https://github.com/bootstrap-vue/bootstrap-vue/issues/1246))
  ([4a8ce2c](https://github.com/bootstrap-vue/bootstrap-vue/commit/4a8ce2c))
- **navbar-nav:** new `b-navbar-nav` component
  ([#1231](https://github.com/bootstrap-vue/bootstrap-vue/issues/1231))
  ([4bdba0e](https://github.com/bootstrap-vue/bootstrap-vue/commit/4bdba0e))
- **packaging:** add nuxt module
  ([4c58c80](https://github.com/bootstrap-vue/bootstrap-vue/commit/4c58c80))
- **pagination:** better keyboard tab support + focus styling
  ([42b31da](https://github.com/bootstrap-vue/bootstrap-vue/commit/42b31da))
- **pagination-nav:** better tab/focus management
  ([adf8dcc](https://github.com/bootstrap-vue/bootstrap-vue/commit/adf8dcc))
- **table:** allow custom attributes in table cell (`td`)
  ([#1193](https://github.com/bootstrap-vue/bootstrap-vue/issues/1193))
  ([485adbf](https://github.com/bootstrap-vue/bootstrap-vue/commit/485adbf))
- **table:** BS V4.beta.2 new responsive breakpoints and `table-dark` class
  ([#1222](https://github.com/bootstrap-vue/bootstrap-vue/issues/1222))
  ([febdfd1](https://github.com/bootstrap-vue/bootstrap-vue/commit/febdfd1))
- **table:** pass computed fields array to details scoped slot
  ([0745ae8](https://github.com/bootstrap-vue/bootstrap-vue/commit/0745ae8a567c5a218c26c57fc89d8804d6da476c))
- **tabs:** new props for adding classes to nav tab
  ([c6d3642](https://github.com/bootstrap-vue/bootstrap-vue/commit/c6d3642fe590c50df1e8200a436f6dfe0bd3b3d8))
  Closes [#1265](https://github.com/bootstrap-vue/bootstrap-vue/issues/1265)
- **tooltip popover:** don't close if focus moves between trigger element and tooltip/popover
  ([#1093](https://github.com/bootstrap-vue/bootstrap-vue/issues/1093))
  ([87ffb4f](https://github.com/bootstrap-vue/bootstrap-vue/commit/87ffb4f))
- **tooltip+popover:** allow delay to be specified as object in component versions
  ([#1131](https://github.com/bootstrap-vue/bootstrap-vue/issues/1131))
  ([1a47c87](https://github.com/bootstrap-vue/bootstrap-vue/commit/1a47c87)) Closes
  [#1130](https://github.com/bootstrap-vue/bootstrap-vue/issues/1130)

### Documentation v1.0.0

- various typo fixes in docs
- **link:** Document the `<b-link>` component
  ([7e4dd97](https://github.com/bootstrap-vue/bootstrap-vue/commit/7e4dd9734d0751c004c8a6a3721fb8be06581ea9))

### Performance v1.0.0

- move repetitive plugin code to plugin.js utility
  ([6ba8c46](https://github.com/bootstrap-vue/bootstrap-vue/commit/6ba8c46da4b8abca145970bc506718c8a73b14b8))
- **dom-utils:** improve DOM utils code for speed, minification & tree-shaking
  ([e1e701b](https://github.com/bootstrap-vue/bootstrap-vue/commit/e1e701ba4ec8850117ccd5d983dc47898f961abb))
- **input-group:** convert to functional component
  ([bd4c3c3](https://github.com/bootstrap-vue/bootstrap-vue/commit/bd4c3c38ce0c4317b8a95e1ab4bae3ef06bd61ea))
- **navbar-toggle:** remove unused code
  ([1e95383](https://github.com/bootstrap-vue/bootstrap-vue/commit/1e95383959e48b6f926738b4d600967879c5c354))

## [v1.0.0-beta.9](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0-beta.8...v1.0.0-beta.9)

Released: 2017-09-21

## [v1.0.0-beta.8](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0-beta.7...v1.0.0-beta.8)

Released: 2017-09-21

### Breaking Changes v1.0.0-beta.8

v1.0.0-beta.8 introduces many improvements to form controls, but introduces a breaking change to
radio inputs. `<b-form-radio>` now only generates a single radio input. Use `<b-form-radio-group>`
to generate a series of radio inputs.

### Bug Fixes v1.0.0-beta.8

- **b-col:** handle bool style prop for sm,md,lg,xl
  ([#1042](https://github.com/bootstrap-vue/bootstrap-vue/issues/1042))
  ([3e7e17d](https://github.com/bootstrap-vue/bootstrap-vue/commit/3e7e17d)), closes
  [#1041](https://github.com/bootstrap-vue/bootstrap-vue/issues/1041)
- **carousel:** Prevent reflow trigger from being optimised out
  ([#995](https://github.com/bootstrap-vue/bootstrap-vue/issues/995))
  ([d765976](https://github.com/bootstrap-vue/bootstrap-vue/commit/d765976))
- **docs:** Adjust source link if component is a functional component
  ([9cc07a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/9cc07a7))
- **docs:** b-img fluid-grow example
  ([fe32515](https://github.com/bootstrap-vue/bootstrap-vue/commit/fe32515))
- **docs:** Fix modal-cancel slot name in meta.json
  ([a8772ac](https://github.com/bootstrap-vue/bootstrap-vue/commit/a8772ac))
- **docs:** Fix reference to modal-cancel slot in modal docs
  ([5747c6d](https://github.com/bootstrap-vue/bootstrap-vue/commit/5747c6d))
- **dropdown:** remove custom hover styling
  ([9c9c3bb](https://github.com/bootstrap-vue/bootstrap-vue/commit/9c9c3bb))
- **embed:** Validate type prop
  ([993116b](https://github.com/bootstrap-vue/bootstrap-vue/commit/993116b))
- **form-file:** Selected file name(s) not always showing
  ([565b0ab](https://github.com/bootstrap-vue/bootstrap-vue/commit/565b0ab))
- **form-group:** Not applying label-for prop value
  ([#1000](https://github.com/bootstrap-vue/bootstrap-vue/issues/1000))
  ([56a4e5e](https://github.com/bootstrap-vue/bootstrap-vue/commit/56a4e5e))
- **form-textarea:** correct CSS value for no resize
  ([b9bff5e](https://github.com/bootstrap-vue/bootstrap-vue/commit/b9bff5e))
- **form-textarea:** Set width to 100% if in plaintext mode
  ([01735e6](https://github.com/bootstrap-vue/bootstrap-vue/commit/01735e6))
- **jumbotron:** Accept string or number for header-level
  ([ff223a8](https://github.com/bootstrap-vue/bootstrap-vue/commit/ff223a8))
- **lform-group:** Missing return in target ID selection
  ([3323531](https://github.com/bootstrap-vue/bootstrap-vue/commit/3323531))
- **link:** clear router-link/href collision and remove old link mixin
  ([#1016](https://github.com/bootstrap-vue/bootstrap-vue/issues/1016))
  ([ed381f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed381f4)), closes
  [#940](https://github.com/bootstrap-vue/bootstrap-vue/issues/940)
- **link:** working href with router-link on ssr
  ([8a6f243](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a6f243))
- **modal:** Fix aria hidden attr and observeDom target element
  ([f099ac7](https://github.com/bootstrap-vue/bootstrap-vue/commit/f099ac7))
- **modal:** fix issue with lazy loading
  ([7557f52](https://github.com/bootstrap-vue/bootstrap-vue/commit/7557f52))
- **modal:** Minor bug fixes
  ([6cfc682](https://github.com/bootstrap-vue/bootstrap-vue/commit/6cfc682))
- **nav-item-dropdown:** remove custom hover styling
  ([c794fef](https://github.com/bootstrap-vue/bootstrap-vue/commit/c794fef))
- **nav-toggle:** Use new namespaced collape events
  ([6f87c23](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f87c23))
- **object mixin:** Add polyfill Object.is for IE
  ([beed2c3](https://github.com/bootstrap-vue/bootstrap-vue/commit/beed2c3))
- **observedom:** Adjustments to mutation type detection
  ([75e92d3](https://github.com/bootstrap-vue/bootstrap-vue/commit/75e92d3))
- **observedom:** Callback not being called for changes other than childList changes
  ([#1025](https://github.com/bootstrap-vue/bootstrap-vue/issues/1025))
  ([88cfaef](https://github.com/bootstrap-vue/bootstrap-vue/commit/88cfaef))
- **observedom:** Callback not being called for changes other than node insert/remove
  ([92ef7eb](https://github.com/bootstrap-vue/bootstrap-vue/commit/92ef7eb))
- **popover:** getting title from title attribute
  ([685de6a](https://github.com/bootstrap-vue/bootstrap-vue/commit/685de6a))
- **popover:** remove deprecated target-id prop
  ([472fa79](https://github.com/bootstrap-vue/bootstrap-vue/commit/472fa79))
- **popover+tooltip:** Allow indiviual component imports
  ([#999](https://github.com/bootstrap-vue/bootstrap-vue/issues/999))
  ([dcc7504](https://github.com/bootstrap-vue/bootstrap-vue/commit/dcc7504))
- **radios checkboxes:** Parent group should emit change event
  ([#1071](https://github.com/bootstrap-vue/bootstrap-vue/issues/1071))
  ([ac7c506](https://github.com/bootstrap-vue/bootstrap-vue/commit/ac7c506))
- **scrollspy:** fixes for various bugs
  ([#1063](https://github.com/bootstrap-vue/bootstrap-vue/issues/1063))
  ([97fccdd](https://github.com/bootstrap-vue/bootstrap-vue/commit/97fccdd))
- **scrollspy:** Handle .nav-link inside .nav-item active state
  ([6db094d](https://github.com/bootstrap-vue/bootstrap-vue/commit/6db094d))
- **scrollspy:** Handle nested nav-links when inside nav-item
  ([#1068](https://github.com/bootstrap-vue/bootstrap-vue/issues/1068))
  ([f4e017c](https://github.com/bootstrap-vue/bootstrap-vue/commit/f4e017c))
- **scrollspy:** Minor updates
  ([ce15b69](https://github.com/bootstrap-vue/bootstrap-vue/commit/ce15b69))
- **scrollspy:** Minor updates
  ([95f0840](https://github.com/bootstrap-vue/bootstrap-vue/commit/95f0840))
- **scrollspy:** Trigger refresh on transitionend event
  ([947b5e0](https://github.com/bootstrap-vue/bootstrap-vue/commit/947b5e0))
- **scrollspy:** typo ([ec36379](https://github.com/bootstrap-vue/bootstrap-vue/commit/ec36379))
- **scrollspy:** Use new offset and position dom utilities
  ([dc68eef](https://github.com/bootstrap-vue/bootstrap-vue/commit/dc68eef))
- **tabs:** Remove aria-expanded in favor of aria-seleted
  ([5790b39](https://github.com/bootstrap-vue/bootstrap-vue/commit/5790b39))
- **tooltip:** remove deprecated target-id prop
  ([a06d5a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/a06d5a6))
- Add lodash.startcase to dependancies
  ([febecfc](https://github.com/bootstrap-vue/bootstrap-vue/commit/febecfc))
- **tooltip popover:** illegal invocation errors when tooltip inside v-if elements
  ([#1057](https://github.com/bootstrap-vue/bootstrap-vue/issues/1057))
  ([c1353a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/c1353a7)), closes
  [#1032](https://github.com/bootstrap-vue/bootstrap-vue/issues/1032)
- **tooltip-popover:** Click not triggered for elements with inner HTML elements in Chrome
  ([#1006](https://github.com/bootstrap-vue/bootstrap-vue/issues/1006))
  ([39caf8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/39caf8a))
- **tooltip+popover:** Check if trigger element is in DOM during vsibility check
  ([55c4ff0](https://github.com/bootstrap-vue/bootstrap-vue/commit/55c4ff0))
- **tooltip+popover:** Remove relatedTarget on hidden event object
  ([8af36ba](https://github.com/bootstrap-vue/bootstrap-vue/commit/8af36ba))

### Features v1.0.0-beta.8

- **docs:** Add a new reference section
  ([#1050](https://github.com/bootstrap-vue/bootstrap-vue/issues/1050))
  ([7984117](https://github.com/bootstrap-vue/bootstrap-vue/commit/7984117))
- **docs:** Add aria roles to collapse accordion example
  ([2a34407](https://github.com/bootstrap-vue/bootstrap-vue/commit/2a34407))
- **docs:** Add TOC section in right hand column
  ([#1077](https://github.com/bootstrap-vue/bootstrap-vue/issues/1077))
  ([b9d15f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/b9d15f8))
- **docs:** Expanded alert docs and examples
  ([f1730ee](https://github.com/bootstrap-vue/bootstrap-vue/commit/f1730ee))
- **docs:** Hide TOC sub-sections when not `active`
  ([9d5a626](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d5a626))
- **docs:** New reference section wrt project relative urls and image based BootstrapVue components
  ([#1072](https://github.com/bootstrap-vue/bootstrap-vue/issues/1072))
  ([7809fb2](https://github.com/bootstrap-vue/bootstrap-vue/commit/7809fb2))
- **docs:** search support
  ([7916981](https://github.com/bootstrap-vue/bootstrap-vue/commit/7916981))
- **docs:** starter examples ([#1061](https://github.com/bootstrap-vue/bootstrap-vue/issues/1061))
  ([dfc615f](https://github.com/bootstrap-vue/bootstrap-vue/commit/dfc615f))
- **docs:** TOC add scroll into iview support
  ([d72f87a](https://github.com/bootstrap-vue/bootstrap-vue/commit/d72f87a))
- **docs:** Updated b-img examples
  ([3ec187a](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ec187a))
- **dom util:** new reflow, getBoundingClientRect, eventOn, eventOff methods
  ([#1052](https://github.com/bootstrap-vue/bootstrap-vue/issues/1052))
  ([346112d](https://github.com/bootstrap-vue/bootstrap-vue/commit/346112d))
- Use dom utils ([#1017](https://github.com/bootstrap-vue/bootstrap-vue/issues/1017))
  ([5ca9fe3](https://github.com/bootstrap-vue/bootstrap-vue/commit/5ca9fe3))
- **dom utils:** Add getById method
  ([d73ff01](https://github.com/bootstrap-vue/bootstrap-vue/commit/d73ff01))
- **dom utils:** Add offset and position methods
  ([baf15ca](https://github.com/bootstrap-vue/bootstrap-vue/commit/baf15ca))
- **dropdowns:** Add hide() and show() methods
  ([#1012](https://github.com/bootstrap-vue/bootstrap-vue/issues/1012))
  ([a2a9bc4](https://github.com/bootstrap-vue/bootstrap-vue/commit/a2a9bc4))
- **embed:** New component b-embed for responsive video embeds
  ([#985](https://github.com/bootstrap-vue/bootstrap-vue/issues/985))
  ([e29c429](https://github.com/bootstrap-vue/bootstrap-vue/commit/e29c429))
- **form-file:** Add focus styling for custom-file input
  ([#1033](https://github.com/bootstrap-vue/bootstrap-vue/issues/1033))
  ([72ffba9](https://github.com/bootstrap-vue/bootstrap-vue/commit/72ffba9))
- **form-input:** emit input event when lazy-formatter is true
  ([#1086](https://github.com/bootstrap-vue/bootstrap-vue/issues/1086))
  ([016591c](https://github.com/bootstrap-vue/bootstrap-vue/commit/016591c))
- **forms:** New handling of form-select, form-radios and form-checkboxes
  ([#994](https://github.com/bootstrap-vue/bootstrap-vue/issues/994))
  ([0a50398](https://github.com/bootstrap-vue/bootstrap-vue/commit/0a50398)), closes
  [#940](https://github.com/bootstrap-vue/bootstrap-vue/issues/940)
  [#940](https://github.com/bootstrap-vue/bootstrap-vue/issues/940)
- **modal:** Add lazy loaded modal support
  ([#1046](https://github.com/bootstrap-vue/bootstrap-vue/issues/1046))
  ([7afcf81](https://github.com/bootstrap-vue/bootstrap-vue/commit/7afcf81))
- **modal:** Add props to change the variant of the default modal buttons
  ([#1004](https://github.com/bootstrap-vue/bootstrap-vue/issues/1004))
  ([36acf4e](https://github.com/bootstrap-vue/bootstrap-vue/commit/36acf4e))
- **modal:** Improve modal transitions, padding adjustments, and aditional features
  ([#1024](https://github.com/bootstrap-vue/bootstrap-vue/issues/1024))
  ([dd5ddb0](https://github.com/bootstrap-vue/bootstrap-vue/commit/dd5ddb0))
- **nav-item-dropdown:** Add shorter aliases
  ([8986543](https://github.com/bootstrap-vue/bootstrap-vue/commit/8986543))
- **popover:** Add deactivated hook to component to hide popover
  ([4a70215](https://github.com/bootstrap-vue/bootstrap-vue/commit/4a70215))
- **popover+tooltip:** Add hide event listener on \$root
  ([#1003](https://github.com/bootstrap-vue/bootstrap-vue/issues/1003))
  ([6b12629](https://github.com/bootstrap-vue/bootstrap-vue/commit/6b12629))
- **table:** Allow fields to be an array of objects
  ([#1075](https://github.com/bootstrap-vue/bootstrap-vue/issues/1075))
  ([e2f90ff](https://github.com/bootstrap-vue/bootstrap-vue/commit/e2f90ff))
- **table:** New fixed prop, allow disable localSort, emit context-changed event, and style tweaks
  ([#1076](https://github.com/bootstrap-vue/bootstrap-vue/issues/1076))
  ([4447c7c](https://github.com/bootstrap-vue/bootstrap-vue/commit/4447c7c))
- **table:** Refactor field formatter support + optimized sort-compare handling
  ([#991](https://github.com/bootstrap-vue/bootstrap-vue/issues/991))
  ([b66f994](https://github.com/bootstrap-vue/bootstrap-vue/commit/b66f994))
- **tooltip:** Add deactivated hook to component
  ([ae605d3](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae605d3))
- **tooltip popover:** Better DOM change observation in component versions
  ([f723807](https://github.com/bootstrap-vue/bootstrap-vue/commit/f723807))
- **tooltip+popover:** Add container prop to component versions
  ([#983](https://github.com/bootstrap-vue/bootstrap-vue/issues/983))
  ([860cb3c](https://github.com/bootstrap-vue/bootstrap-vue/commit/860cb3c))
- **tooltip+popover:** Create mixin for common props and methods
  ([#1021](https://github.com/bootstrap-vue/bootstrap-vue/issues/1021))
  ([edc7b20](https://github.com/bootstrap-vue/bootstrap-vue/commit/edc7b20))
- **tooltip+popover:** Eight new placement options
  ([#1081](https://github.com/bootstrap-vue/bootstrap-vue/issues/1081))
  ([dae7855](https://github.com/bootstrap-vue/bootstrap-vue/commit/dae7855))
- dom utility methods ([#1013](https://github.com/bootstrap-vue/bootstrap-vue/issues/1013))
  ([7ed199d](https://github.com/bootstrap-vue/bootstrap-vue/commit/7ed199d))
- use babel ([5e653e6](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e653e6))

### Performance Improvements v1.0.0-beta.8

- **docs:** Better TOC SSR generation
  ([#1080](https://github.com/bootstrap-vue/bootstrap-vue/issues/1080))
  ([b3489d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/b3489d0))
- **pagination:** Move common code to pagination mixin
  ([#1069](https://github.com/bootstrap-vue/bootstrap-vue/issues/1069))
  ([0d41e83](https://github.com/bootstrap-vue/bootstrap-vue/commit/0d41e83))

## [v1.0.0-beta.7](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0-beta.6...v1.0.0-beta.7)

Released: 2017-09-01

### Bug Fixes v1.0.0-beta.7

- **docs:** Fix examples in b-img
  ([7607a00](https://github.com/bootstrap-vue/bootstrap-vue/commit/7607a00))
- **docs:** Fix multipe collapse example
  ([65ba276](https://github.com/bootstrap-vue/bootstrap-vue/commit/65ba276))
- **dropdowns:** Minor code update & comments
  ([54a2546](https://github.com/bootstrap-vue/bootstrap-vue/commit/54a2546))
- **form-textarea:** Max rows not respected if rows specified
  ([4762471](https://github.com/bootstrap-vue/bootstrap-vue/commit/4762471))
- **nav-dropdown:** Fix right alignment in <b-nav>
  ([#962](https://github.com/bootstrap-vue/bootstrap-vue/issues/962))
  ([9598763](https://github.com/bootstrap-vue/bootstrap-vue/commit/9598763))
- **scrollspy:** Undefined value during bind()
  ([#967](https://github.com/bootstrap-vue/bootstrap-vue/issues/967))
  ([5c35e07](https://github.com/bootstrap-vue/bootstrap-vue/commit/5c35e07))
- **tolltip+popover:** Hide original element title attribute
  ([#970](https://github.com/bootstrap-vue/bootstrap-vue/issues/970))
  ([82e46e6](https://github.com/bootstrap-vue/bootstrap-vue/commit/82e46e6))
- **tooltip:** ToolTip.fixTransition undefined value
  ([#960](https://github.com/bootstrap-vue/bootstrap-vue/issues/960))
  ([3c457e7](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c457e7)), closes
  [#956](https://github.com/bootstrap-vue/bootstrap-vue/issues/956)
- **tooltip:** visibility check
  ([df4a015](https://github.com/bootstrap-vue/bootstrap-vue/commit/df4a015))
- **tooltip+popover:** Hide tooltip/popover when \$route changes
  ([#965](https://github.com/bootstrap-vue/bootstrap-vue/issues/965))
  ([e403225](https://github.com/bootstrap-vue/bootstrap-vue/commit/e403225))
- this is not defined in props
  ([fe4ff06](https://github.com/bootstrap-vue/bootstrap-vue/commit/fe4ff06))
- **tooltip+popover components:** Delay instantiation on mounted()
  ([#969](https://github.com/bootstrap-vue/bootstrap-vue/issues/969))
  ([4fc18ec](https://github.com/bootstrap-vue/bootstrap-vue/commit/4fc18ec))
- **tooltip+popover components:** Emit events and minor adjustments
  ([#972](https://github.com/bootstrap-vue/bootstrap-vue/issues/972))
  ([cf7c538](https://github.com/bootstrap-vue/bootstrap-vue/commit/cf7c538))

### Features v1.0.0-beta.7

- **b-img-lazy:** Lazy loaded image component
  ([#943](https://github.com/bootstrap-vue/bootstrap-vue/issues/943))
  ([68138cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/68138cb))
- **docs:** Add accessibility information for popovers
  ([099b1b6](https://github.com/bootstrap-vue/bootstrap-vue/commit/099b1b6))
- **docs:** Additional tooltip component usage docs
  ([d8bf486](https://github.com/bootstrap-vue/bootstrap-vue/commit/d8bf486))
- **docs:** expanded popover component docs
  ([9f5dd75](https://github.com/bootstrap-vue/bootstrap-vue/commit/9f5dd75))
- **docs:** Expanded popover component docs
  ([ccd1c7c](https://github.com/bootstrap-vue/bootstrap-vue/commit/ccd1c7c))
- **docs:** Tooltip component documentation update
  ([c6b04a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/c6b04a6))
- **docs:** Update tooltip directive example
  ([72a37b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/72a37b3))
- **docs:** Updated popover directive examples
  ([3adbcb5](https://github.com/bootstrap-vue/bootstrap-vue/commit/3adbcb5))
- **jumbotron:** Add support for variants
  ([#973](https://github.com/bootstrap-vue/bootstrap-vue/issues/973))
  ([bd9bb7c](https://github.com/bootstrap-vue/bootstrap-vue/commit/bd9bb7c))
- **popover:** Add ability to disable fade animation in component version
  ([7161b5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/7161b5f))
- **tooltip:** Add ability to disable fade animation in component version
  ([36c428a](https://github.com/bootstrap-vue/bootstrap-vue/commit/36c428a))
- **tooltip+popover:** Allow element and component reference for target
  ([#980](https://github.com/bootstrap-vue/bootstrap-vue/issues/980))
  ([8785066](https://github.com/bootstrap-vue/bootstrap-vue/commit/8785066))
- **tooltips+popovers:** Add special blur "exit" trigger
  ([#974](https://github.com/bootstrap-vue/bootstrap-vue/issues/974))
  ([785b7a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/785b7a6))
- **tooltips+popovers:** Automatically hide when trigger element is no longer visible
  ([#978](https://github.com/bootstrap-vue/bootstrap-vue/issues/978))
  ([09eaaa2](https://github.com/bootstrap-vue/bootstrap-vue/commit/09eaaa2))

## [v1.0.0-beta.6](https://github.com/bootstrap-vue/bootstrap-vue/compare/v1.0.0-beta.5...v1.0.0-beta.6)

Released: 2017-08-30

### Bug Fixes v1.0.0-beta.6

- **alert:** show dismiss button when dismissible is true
  ([590cead](https://github.com/bootstrap-vue/bootstrap-vue/commit/590cead))
- **docs:** feedback doc in form group
  ([#934](https://github.com/bootstrap-vue/bootstrap-vue/issues/934))
  ([45881bb](https://github.com/bootstrap-vue/bootstrap-vue/commit/45881bb))
- **docs:** Side bar navigation not accessible on small screens
  ([#946](https://github.com/bootstrap-vue/bootstrap-vue/issues/946))
  ([4666b37](https://github.com/bootstrap-vue/bootstrap-vue/commit/4666b37))
- **dropdown:** hover/focus shading for active items
  ([b2b6ad9](https://github.com/bootstrap-vue/bootstrap-vue/commit/b2b6ad9))
- **dropdowns:** Allow gracefull fallback if Popper.js not defined
  ([#920](https://github.com/bootstrap-vue/bootstrap-vue/issues/920))
  ([41b5947](https://github.com/bootstrap-vue/bootstrap-vue/commit/41b5947))
- **dropdowns:** Migration to popper.js positioning
  ([#913](https://github.com/bootstrap-vue/bootstrap-vue/issues/913))
  ([116cb3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/116cb3e))
- **form-textarea:** Fix value reactivity
  ([aeb11be](https://github.com/bootstrap-vue/bootstrap-vue/commit/aeb11be))
- **nav-item-dropdown:** hover/focus shading for active items
  ([5bd2b23](https://github.com/bootstrap-vue/bootstrap-vue/commit/5bd2b23))
- **popove:** tooltip import
  ([8a75d10](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a75d10))
- **popover:** Remove old tether popover mixin
  ([#947](https://github.com/bootstrap-vue/bootstrap-vue/issues/947))
  ([e500836](https://github.com/bootstrap-vue/bootstrap-vue/commit/e500836))
- **progress-bar:** aria-valuenow fix
  ([f0b486e](https://github.com/bootstrap-vue/bootstrap-vue/commit/f0b486e))
- **progress-bar:** Minor adjutment to style calculation
  ([14819ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/14819ef))
- **progress-bar:** remove unessesary this in template
  ([c04df8c](https://github.com/bootstrap-vue/bootstrap-vue/commit/c04df8c))
- **scrollspy:** Make work with new nav-link functional component
  ([#909](https://github.com/bootstrap-vue/bootstrap-vue/issues/909))
  ([2ebba5d](https://github.com/bootstrap-vue/bootstrap-vue/commit/2ebba5d))
- **tabs:** minor logic update
  ([add0fb6](https://github.com/bootstrap-vue/bootstrap-vue/commit/add0fb6))
- **tabs:** Show first tab when set to active
  ([#912](https://github.com/bootstrap-vue/bootstrap-vue/issues/912))
  ([d920b1c](https://github.com/bootstrap-vue/bootstrap-vue/commit/d920b1c))

### Features v1.0.0-beta.6

- **b-col:** restore `.offset-*` col classes + new b-container and b-row components 🍾🍻🎉
  ([#929](https://github.com/bootstrap-vue/bootstrap-vue/issues/929))
  ([023f078](https://github.com/bootstrap-vue/bootstrap-vue/commit/023f078))
- **b-img:** New component ([#933](https://github.com/bootstrap-vue/bootstrap-vue/issues/933))
  ([c4358e0](https://github.com/bootstrap-vue/bootstrap-vue/commit/c4358e0))
- **carousel:** Use b-img component and id Mixin
  ([#945](https://github.com/bootstrap-vue/bootstrap-vue/issues/945))
  ([d95321b](https://github.com/bootstrap-vue/bootstrap-vue/commit/d95321b))
- **col:** BS4 column component ([#906](https://github.com/bootstrap-vue/bootstrap-vue/issues/906))
  ([9de80f8](https://github.com/bootstrap-vue/bootstrap-vue/commit/9de80f8))
- **docs:** Improved collapse examples and documentation
  ([541fada](https://github.com/bootstrap-vue/bootstrap-vue/commit/541fada))
- **img:** Add 'block' prop to set display mode to block
  ([6be7390](https://github.com/bootstrap-vue/bootstrap-vue/commit/6be7390))
- **jumbotron:** Convert to functional component
  ([#932](https://github.com/bootstrap-vue/bootstrap-vue/issues/932))
  ([5f2df53](https://github.com/bootstrap-vue/bootstrap-vue/commit/5f2df53))
- **layout:** alignment utilities 🛠
  ([#941](https://github.com/bootstrap-vue/bootstrap-vue/issues/941))
  ([3435ac5](https://github.com/bootstrap-vue/bootstrap-vue/commit/3435ac5))
- **popover:** import fix ([b24764f](https://github.com/bootstrap-vue/bootstrap-vue/commit/b24764f))
- **readme:** add package quality badge
  ([#907](https://github.com/bootstrap-vue/bootstrap-vue/issues/907))
  ([6bd9f52](https://github.com/bootstrap-vue/bootstrap-vue/commit/6bd9f52))
- New popper.js based tooltip/popover directives and components
  ([#923](https://github.com/bootstrap-vue/bootstrap-vue/issues/923))
  ([33c4cab](https://github.com/bootstrap-vue/bootstrap-vue/commit/33c4cab))
- **table:** easier usage ([019f8fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/019f8fa))
- **table:** Scoped slots for fixed top/bottom rows
  ([#908](https://github.com/bootstrap-vue/bootstrap-vue/issues/908))
  ([3c761e2](https://github.com/bootstrap-vue/bootstrap-vue/commit/3c761e2))
- **table:** use computedFields for easier usage
  ([b9980f0](https://github.com/bootstrap-vue/bootstrap-vue/commit/b9980f0))

## [v1.0.0-beta.5](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.2...v1.0.0-beta.5)

Released: 2017-08-21

### Bug Fixes v1.0.0-beta.5

- **alert:** Emit dismiss-count-down at 0 seconds
  ([#839](https://github.com/bootstrap-vue/bootstrap-vue/issues/839))
  ([8dc90bb](https://github.com/bootstrap-vue/bootstrap-vue/commit/8dc90bb))
- **alert:** Fix auto-dimissing alert "bug"
  ([#897](https://github.com/bootstrap-vue/bootstrap-vue/issues/897))
  ([eccd63e](https://github.com/bootstrap-vue/bootstrap-vue/commit/eccd63e))
- **badge:** badge default variant
  ([1403ec4](https://github.com/bootstrap-vue/bootstrap-vue/commit/1403ec4))
- **badge:** Default variant changed
  ([8d3be9e](https://github.com/bootstrap-vue/bootstrap-vue/commit/8d3be9e))
- **badge:** Default variant no longer exists in V4.beta
  ([#875](https://github.com/bootstrap-vue/bootstrap-vue/issues/875))
  ([5fc14d2](https://github.com/bootstrap-vue/bootstrap-vue/commit/5fc14d2))
- **card:** change prop no-block to no-body
  ([#826](https://github.com/bootstrap-vue/bootstrap-vue/issues/826))
  ([664bc98](https://github.com/bootstrap-vue/bootstrap-vue/commit/664bc98))
- **card:** Fix classes, variants, borders \[v4-beta\]
  ([#815](https://github.com/bootstrap-vue/bootstrap-vue/issues/815))
  ([fc26811](https://github.com/bootstrap-vue/bootstrap-vue/commit/fc26811))
- **carousel:** boolean typo
  ([6a95410](https://github.com/bootstrap-vue/bootstrap-vue/commit/6a95410))
- **carousel:** Detect transitionend event name
  ([fa07949](https://github.com/bootstrap-vue/bootstrap-vue/commit/fa07949))
- **carousel:** Ensure slideshow restarts when reaching the end
  ([e175c36](https://github.com/bootstrap-vue/bootstrap-vue/commit/e175c36))
- **carousel:** ESLint ([8222222](https://github.com/bootstrap-vue/bootstrap-vue/commit/8222222))
- **carousel:** Handle older opera oTransitionEnd event
  ([#899](https://github.com/bootstrap-vue/bootstrap-vue/issues/899))
  ([5afb591](https://github.com/bootstrap-vue/bootstrap-vue/commit/5afb591))
- **carousel:** minor fixes
  ([6b4f497](https://github.com/bootstrap-vue/bootstrap-vue/commit/6b4f497))
- **carousel:** oldVal! ([3ae2e2e](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ae2e2e))
- **carousel:** Typo ([4c80576](https://github.com/bootstrap-vue/bootstrap-vue/commit/4c80576))
- **carousel:** Typo in transition
  ([9693872](https://github.com/bootstrap-vue/bootstrap-vue/commit/9693872))
- **coursel:** Ensure minimum interval of 1 second
  ([467ec27](https://github.com/bootstrap-vue/bootstrap-vue/commit/467ec27))
- **docs:** Minor update to navbar example
  ([4a62e1b](https://github.com/bootstrap-vue/bootstrap-vue/commit/4a62e1b))
- **dropdown:** Fix focus/hover custom CSS
  ([0cbbfb5](https://github.com/bootstrap-vue/bootstrap-vue/commit/0cbbfb5))
- **dropdown:** focus on first item on show
  ([40a1347](https://github.com/bootstrap-vue/bootstrap-vue/commit/40a1347))
- **dropdown:** twbs/bootstrap[#23329](https://github.com/twbs/bootstrap/issues/23329)
  ([fab5d22](https://github.com/bootstrap-vue/bootstrap-vue/commit/fab5d22))
- **dropdown.js:** import clickout as a mixin
  ([#896](https://github.com/bootstrap-vue/bootstrap-vue/issues/896))
  ([1ba47e5](https://github.com/bootstrap-vue/bootstrap-vue/commit/1ba47e5))
- **dropdowns:** Focus dropdown item on hover
  ([#823](https://github.com/bootstrap-vue/bootstrap-vue/issues/823))
  ([2e863d9](https://github.com/bootstrap-vue/bootstrap-vue/commit/2e863d9))
- **form-control-static:** change class to form-control-plaintext
  ([66eda01](https://github.com/bootstrap-vue/bootstrap-vue/commit/66eda01))
- **form-group:** use new prop labelCols over old computedLabelCols
  ([#878](https://github.com/bootstrap-vue/bootstrap-vue/issues/878))
  ([b6aa317](https://github.com/bootstrap-vue/bootstrap-vue/commit/b6aa317))
- **form-input:** Fix reactivity (issue
  [#817](https://github.com/bootstrap-vue/bootstrap-vue/issues/817))
  ([88e2dbb](https://github.com/bootstrap-vue/bootstrap-vue/commit/88e2dbb))
- **form-input:** use :value instead of v-model
  ([fcff25d](https://github.com/bootstrap-vue/bootstrap-vue/commit/fcff25d))
- **form-textarea:** not respecting rows when max-rows provided
  ([e8bf4b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/e8bf4b3))
- **forms:** Adjustments to form-textarea and form-input
  ([#880](https://github.com/bootstrap-vue/bootstrap-vue/issues/880))
  ([79a7aa8](https://github.com/bootstrap-vue/bootstrap-vue/commit/79a7aa8))
- **forms:** BS4.beta form/input validation styles & components
  ([#847](https://github.com/bootstrap-vue/bootstrap-vue/issues/847))
  ([00e2b6f](https://github.com/bootstrap-vue/bootstrap-vue/commit/00e2b6f))
- **link:** default href to null
  ([716ce45](https://github.com/bootstrap-vue/bootstrap-vue/commit/716ce45))
- **link:** ensure target is vue component before #emit
  ([200f31b](https://github.com/bootstrap-vue/bootstrap-vue/commit/200f31b))
- **link:** if nothing is provided default href to #
  ([86533fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/86533fa))
- **nav-item-dropdown:** add show class
  ([921dac5](https://github.com/bootstrap-vue/bootstrap-vue/commit/921dac5))
- **nav-item-dropdown:** Fix focus/hover custom CSS
  ([e38576c](https://github.com/bootstrap-vue/bootstrap-vue/commit/e38576c))
- **navbar:** breakpoint control
  ([72cd58d](https://github.com/bootstrap-vue/bootstrap-vue/commit/72cd58d))
- **navbar:** breakpoint not working
  ([42ca902](https://github.com/bootstrap-vue/bootstrap-vue/commit/42ca902))
- **navbar-brand:** fix pluckProps call for link
  ([9dadfbc](https://github.com/bootstrap-vue/bootstrap-vue/commit/9dadfbc))
- **pagination:** Change classes from .hidden-_ to .d-_
  ([#840](https://github.com/bootstrap-vue/bootstrap-vue/issues/840))
  ([0f543a1](https://github.com/bootstrap-vue/bootstrap-vue/commit/0f543a1))
- **pagination-nav:** Fix link-gen and page-gen
  ([6746cb1](https://github.com/bootstrap-vue/bootstrap-vue/commit/6746cb1))
- **pagination-nav:** Update v-model on click
  ([188adea](https://github.com/bootstrap-vue/bootstrap-vue/commit/188adea))
- **progress:** make progress-bar respect parent show-\* props
  ([9fc726d](https://github.com/bootstrap-vue/bootstrap-vue/commit/9fc726d))
- **table:** filtered event not firing when filter cleared (issue
  [#859](https://github.com/bootstrap-vue/bootstrap-vue/issues/859))
  ([#863](https://github.com/bootstrap-vue/bootstrap-vue/issues/863))
  ([8ff2623](https://github.com/bootstrap-vue/bootstrap-vue/commit/8ff2623))
- **table:** fix for row-hovered event
  ([2448666](https://github.com/bootstrap-vue/bootstrap-vue/commit/2448666))
- **table:** Sorting directions & arrows
  ([de1de97](https://github.com/bootstrap-vue/bootstrap-vue/commit/de1de97))
- **table:** workaround for Vue 2.4 SSR rendering bug
  ([dc8d238](https://github.com/bootstrap-vue/bootstrap-vue/commit/dc8d238))
- **tabs:** Better handling of active tab and transitions
  ([#903](https://github.com/bootstrap-vue/bootstrap-vue/issues/903))
  ([d5b81dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/d5b81dd))
- **tabs:** update to use card-block
  ([d881c37](https://github.com/bootstrap-vue/bootstrap-vue/commit/d881c37))

### Features v1.0.0-beta.5

- **addEventListenerOnce:** add to utils
  ([0869ffd](https://github.com/bootstrap-vue/bootstrap-vue/commit/0869ffd))
- **addEventListenerOnce:** New utility function
  ([6b4efdf](https://github.com/bootstrap-vue/bootstrap-vue/commit/6b4efdf))
- **badge:** functional component
  ([#820](https://github.com/bootstrap-vue/bootstrap-vue/issues/820))
  ([8c172c1](https://github.com/bootstrap-vue/bootstrap-vue/commit/8c172c1))
- **btn-group:** functional component for button-group
  ([#822](https://github.com/bootstrap-vue/bootstrap-vue/issues/822))
  ([6891e9f](https://github.com/bootstrap-vue/bootstrap-vue/commit/6891e9f))
- **button:** set light as default variant
  ([2a72576](https://github.com/bootstrap-vue/bootstrap-vue/commit/2a72576))
- **card:** add card-body functional component & card-img fixes
  ([#843](https://github.com/bootstrap-vue/bootstrap-vue/issues/843))
  ([f88ab23](https://github.com/bootstrap-vue/bootstrap-vue/commit/f88ab23))
- **card:** change card-block to card-body
  ([30d35a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/30d35a7))
- **card:** functional components for card
  ([#827](https://github.com/bootstrap-vue/bootstrap-vue/issues/827))
  ([2089252](https://github.com/bootstrap-vue/bootstrap-vue/commit/2089252))
- **carousel:** Add img slot to carousel-slide
  ([#879](https://github.com/bootstrap-vue/bootstrap-vue/issues/879))
  ([9d789e7](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d789e7))
- **carousel:** Transition event with setTimeout fallback
  ([8e6fc42](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e6fc42))
- **carousel:** Use transitionend event instead of setTimeout
  ([192dfb8](https://github.com/bootstrap-vue/bootstrap-vue/commit/192dfb8))
- **docs:** prepare for 1.0.0-beta
  ([8e46552](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e46552))
- **dropdown:** Add auto ID generation
  ([#888](https://github.com/bootstrap-vue/bootstrap-vue/issues/888))
  ([25a20f2](https://github.com/bootstrap-vue/bootstrap-vue/commit/25a20f2))
- **dropdowns:** functional dropdown sub-components and testing
  ([#848](https://github.com/bootstrap-vue/bootstrap-vue/issues/848))
  ([2bd562b](https://github.com/bootstrap-vue/bootstrap-vue/commit/2bd562b))
- **form:** Swith to functional component
  ([#865](https://github.com/bootstrap-vue/bootstrap-vue/issues/865))
  ([c9f054d](https://github.com/bootstrap-vue/bootstrap-vue/commit/c9f054d))
- **form-file:** Propagate `capture` attribute to file input
  ([d7e4f8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/d7e4f8a))
- **form-row:** New functional component
  ([#844](https://github.com/bootstrap-vue/bootstrap-vue/issues/844))
  ([1e0f313](https://github.com/bootstrap-vue/bootstrap-vue/commit/1e0f313))
- **form-select:** add key for v-for
  ([299a2ea](https://github.com/bootstrap-vue/bootstrap-vue/commit/299a2ea))
- **form-text:** New functional component
  ([#846](https://github.com/bootstrap-vue/bootstrap-vue/issues/846))
  ([2ed7470](https://github.com/bootstrap-vue/bootstrap-vue/commit/2ed7470))
- **forms:** Auto ID generation client side if no id prop provided
  ([#882](https://github.com/bootstrap-vue/bootstrap-vue/issues/882))
  ([da39b86](https://github.com/bootstrap-vue/bootstrap-vue/commit/da39b86))
- **input-group:** Add prop tag to change root element type
  ([800add6](https://github.com/bootstrap-vue/bootstrap-vue/commit/800add6))
- **list-group:** new list-group functional components
  ([#861](https://github.com/bootstrap-vue/bootstrap-vue/issues/861))
  ([c516d89](https://github.com/bootstrap-vue/bootstrap-vue/commit/c516d89))
- **media:** new functional media components
  ([#872](https://github.com/bootstrap-vue/bootstrap-vue/issues/872))
  ([91ff681](https://github.com/bootstrap-vue/bootstrap-vue/commit/91ff681))
- **nav:** new functional nav components
  ([#864](https://github.com/bootstrap-vue/bootstrap-vue/issues/864))
  ([ecec23d](https://github.com/bootstrap-vue/bootstrap-vue/commit/ecec23d))
- **navbar:** change navbar-toggelable to navbar-expand-\*
  ([1fab033](https://github.com/bootstrap-vue/bootstrap-vue/commit/1fab033))
- **pagination-nav:** New navigation pagination component
  ([#816](https://github.com/bootstrap-vue/bootstrap-vue/issues/816))
  ([3a4272c](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a4272c))
- **progress:** Add height prop ([#837](https://github.com/bootstrap-vue/bootstrap-vue/issues/837))
  ([8a52b93](https://github.com/bootstrap-vue/bootstrap-vue/commit/8a52b93))
- **progress:** Support for multiple progress bars
  ([#889](https://github.com/bootstrap-vue/bootstrap-vue/issues/889))
  ([76c613c](https://github.com/bootstrap-vue/bootstrap-vue/commit/76c613c))
- **table:** Include native event object with row-_ and head-_ events
  ([#892](https://github.com/bootstrap-vue/bootstrap-vue/issues/892))
  ([92d2794](https://github.com/bootstrap-vue/bootstrap-vue/commit/92d2794))
- link, breadcrumb, & button functional components
  ([#830](https://github.com/bootstrap-vue/bootstrap-vue/issues/830))
  ([cdbef2d](https://github.com/bootstrap-vue/bootstrap-vue/commit/cdbef2d))

## [v0.20.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.1...v0.20.2)

Released: 2017-08-11

### Bug Fixes v0.20.2

- **carousel:** Handle changes in slide content
  ([#809](https://github.com/bootstrap-vue/bootstrap-vue/issues/809))
  ([6949e5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/6949e5f))
- **collapse:** Close collapse when clicked in navbar
  ([#803](https://github.com/bootstrap-vue/bootstrap-vue/issues/803))
  ([3fdfbff](https://github.com/bootstrap-vue/bootstrap-vue/commit/3fdfbff))
- **docs:** button update example
  ([#804](https://github.com/bootstrap-vue/bootstrap-vue/issues/804))
  ([fb375aa](https://github.com/bootstrap-vue/bootstrap-vue/commit/fb375aa))
- **form-checkbox:** Better focus handling in button mode
  ([06e1c7b](https://github.com/bootstrap-vue/bootstrap-vue/commit/06e1c7b))
- **form-radio:** Better focus handling in button mode
  ([#801](https://github.com/bootstrap-vue/bootstrap-vue/issues/801))
  ([a9bfbde](https://github.com/bootstrap-vue/bootstrap-vue/commit/a9bfbde))
- **navbar-brand:** Removed erroneous this in template
  ([#806](https://github.com/bootstrap-vue/bootstrap-vue/issues/806))
  ([0842043](https://github.com/bootstrap-vue/bootstrap-vue/commit/0842043))
- **table:** workaround for Vue 2.4 SSR rendering bug
  ([ab7767f](https://github.com/bootstrap-vue/bootstrap-vue/commit/ab7767f))
- **v-play:** disable vue global errorHandler
  ([9a7bdaf](https://github.com/bootstrap-vue/bootstrap-vue/commit/9a7bdaf))

## [v0.20.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.20.0...v0.20.1)

Released: 2017-08-10

## [v0.20.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.19.0...v0.20.0)

Released: 2017-08-10

### Bug Fixes v0.20.0

- **carousel:** Unable to reach last slide
  ([3628bcb](https://github.com/bootstrap-vue/bootstrap-vue/commit/3628bcb))
- **docs:** broken setup page
  ([9d60069](https://github.com/bootstrap-vue/bootstrap-vue/commit/9d60069))
- **docs:** Minor update to file-input example
  ([763a35a](https://github.com/bootstrap-vue/bootstrap-vue/commit/763a35a))
- **docs:** myToggle0 ([a0ef988](https://github.com/bootstrap-vue/bootstrap-vue/commit/a0ef988))
- **docs:** serve fonts on https
  ([51209dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/51209dd))
- **form-input:** isTextArea varname correction
  ([#785](https://github.com/bootstrap-vue/bootstrap-vue/issues/785))
  ([cb44652](https://github.com/bootstrap-vue/bootstrap-vue/commit/cb44652))
- **form-radio:** Add missing classes in button mode
  ([#779](https://github.com/bootstrap-vue/bootstrap-vue/issues/779))
  ([ed4f4ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed4f4ef))
- **tabs:** Tabls not clickable (issue
  [#789](https://github.com/bootstrap-vue/bootstrap-vue/issues/789))
  ([#790](https://github.com/bootstrap-vue/bootstrap-vue/issues/790))
  ([c234580](https://github.com/bootstrap-vue/bootstrap-vue/commit/c234580))
- **tests:** Set jest max workers to 1
  ([f16fd8d](https://github.com/bootstrap-vue/bootstrap-vue/commit/f16fd8d))

### Features v0.20.0

- **alert:** Hide dismiss button for auto-dismissing alerts
  ([#791](https://github.com/bootstrap-vue/bootstrap-vue/issues/791))
  ([080bb20](https://github.com/bootstrap-vue/bootstrap-vue/commit/080bb20))
- **docs:** changelog page
  ([b2482cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/b2482cb))
- **table:** Add row-dblclicked event
  ([#780](https://github.com/bootstrap-vue/bootstrap-vue/issues/780))
  ([1aaf915](https://github.com/bootstrap-vue/bootstrap-vue/commit/1aaf915))

## [v0.19.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.18.0...v0.19.0)

Released: 2017-08-09

### Bug Fixes v0.19.0

- **alert:** add missing colon for binding `aria-label`
  ([#768](https://github.com/bootstrap-vue/bootstrap-vue/issues/768))
  ([93b009f](https://github.com/bootstrap-vue/bootstrap-vue/commit/93b009f))
- **alert:** Event args array in meta.json
  ([c9e3fd2](https://github.com/bootstrap-vue/bootstrap-vue/commit/c9e3fd2))
- **alert:** use v-model to update show value
  ([#721](https://github.com/bootstrap-vue/bootstrap-vue/issues/721))
  ([9b380d0](https://github.com/bootstrap-vue/bootstrap-vue/commit/9b380d0))
- **button:** Minor code update
  ([378b932](https://github.com/bootstrap-vue/bootstrap-vue/commit/378b932))
- **carousel:** Prevent going to slide if transitioning (issue
  [#764](https://github.com/bootstrap-vue/bootstrap-vue/issues/764))
  ([#765](https://github.com/bootstrap-vue/bootstrap-vue/issues/765))
  ([a2ab664](https://github.com/bootstrap-vue/bootstrap-vue/commit/a2ab664))
- **collapse:** reference to this.\$el
  ([eb01295](https://github.com/bootstrap-vue/bootstrap-vue/commit/eb01295))
- **componentdoc:** Typo in required prop
  ([762d088](https://github.com/bootstrap-vue/bootstrap-vue/commit/762d088))
- **docs:** Adjust header tags CSS specificity (issue
  [#753](https://github.com/bootstrap-vue/bootstrap-vue/issues/753))
  ([#755](https://github.com/bootstrap-vue/bootstrap-vue/issues/755))
  ([25280ae](https://github.com/bootstrap-vue/bootstrap-vue/commit/25280ae))
- **docs:** conform args and fix spelling
  ([#659](https://github.com/bootstrap-vue/bootstrap-vue/issues/659))
  ([ed9906a](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed9906a))
- **docs:** fix invalid JSON trailing commas
  ([a635176](https://github.com/bootstrap-vue/bootstrap-vue/commit/a635176))
- **docs:** Fix typo in \_component.vue
  ([b90e92a](https://github.com/bootstrap-vue/bootstrap-vue/commit/b90e92a))
- **docs:** typo in button docs
  ([8cd3ea1](https://github.com/bootstrap-vue/bootstrap-vue/commit/8cd3ea1))
- **docs:** update README.md for Bootstrap version
  ([#692](https://github.com/bootstrap-vue/bootstrap-vue/issues/692))
  ([5165531](https://github.com/bootstrap-vue/bootstrap-vue/commit/5165531))
- **docs.vue:** Fix link to edit setup doc
  ([#641](https://github.com/bootstrap-vue/bootstrap-vue/issues/641))
  ([836db33](https://github.com/bootstrap-vue/bootstrap-vue/commit/836db33)), closes
  [#639](https://github.com/bootstrap-vue/bootstrap-vue/issues/639)
- **dropdown:** Clear leftover active state on menu open (fixes
  [#664](https://github.com/bootstrap-vue/bootstrap-vue/issues/664))
  ([80c1ceb](https://github.com/bootstrap-vue/bootstrap-vue/commit/80c1ceb))
- **dropdown:** Emit shown and hidden events (issue
  [#757](https://github.com/bootstrap-vue/bootstrap-vue/issues/757))
  ([814e94c](https://github.com/bootstrap-vue/bootstrap-vue/commit/814e94c))
- **dropdowns:** Change how dropdown items are highlighted
  ([#717](https://github.com/bootstrap-vue/bootstrap-vue/issues/717))
  ([a02270e](https://github.com/bootstrap-vue/bootstrap-vue/commit/a02270e))
- **form fieldset:** 'label for' prop not being applied to label - ARIA
  ([#669](https://github.com/bootstrap-vue/bootstrap-vue/issues/669))
  ([aafea81](https://github.com/bootstrap-vue/bootstrap-vue/commit/aafea81))
- **form-radio:** extra this in template
  ([cc4a442](https://github.com/bootstrap-vue/bootstrap-vue/commit/cc4a442))
- **modal:** Event args list in meta.json
  ([7b8ce01](https://github.com/bootstrap-vue/bootstrap-vue/commit/7b8ce01))
- **modal:** meta.json property order consistency
  ([3d204a4](https://github.com/bootstrap-vue/bootstrap-vue/commit/3d204a4))
- **navbar-brand:** Refactored component logic
  ([#759](https://github.com/bootstrap-vue/bootstrap-vue/issues/759))
  ([c752fc8](https://github.com/bootstrap-vue/bootstrap-vue/commit/c752fc8))
- **pagination:** Added missing href & ARIA adjustments
  ([#693](https://github.com/bootstrap-vue/bootstrap-vue/issues/693))
  ([7091262](https://github.com/bootstrap-vue/bootstrap-vue/commit/7091262))
- **pagination:** Improved ARIA roles and attributes
  ([#741](https://github.com/bootstrap-vue/bootstrap-vue/issues/741))
  ([b12b06e](https://github.com/bootstrap-vue/bootstrap-vue/commit/b12b06e))
- **popover.js:** destroy check for trigger & classes (issue
  [#735](https://github.com/bootstrap-vue/bootstrap-vue/issues/735))
  ([30fa778](https://github.com/bootstrap-vue/bootstrap-vue/commit/30fa778))
- **root-listeners:** apply listen-on-root mixin to other components
  ([#684](https://github.com/bootstrap-vue/bootstrap-vue/issues/684))
  ([f2b7b44](https://github.com/bootstrap-vue/bootstrap-vue/commit/f2b7b44))
- **scrollspy:** Adjust throttle default
  ([3d6eb98](https://github.com/bootstrap-vue/bootstrap-vue/commit/3d6eb98))
- **scrollspy:** Adjustments to the resizeThrottle scheduler
  ([#640](https://github.com/bootstrap-vue/bootstrap-vue/issues/640))
  ([bfaef7d](https://github.com/bootstrap-vue/bootstrap-vue/commit/bfaef7d))
- **table:** aria-labeledby set to header element
  ([e13e093](https://github.com/bootstrap-vue/bootstrap-vue/commit/e13e093))
- **table:** Remove redundant ARIA roles from b-table
  ([#662](https://github.com/bootstrap-vue/bootstrap-vue/issues/662))
  ([6919cc5](https://github.com/bootstrap-vue/bootstrap-vue/commit/6919cc5))
- **tabs:** Default current tab to null (issue
  [#687](https://github.com/bootstrap-vue/bootstrap-vue/issues/687))
  ([#701](https://github.com/bootstrap-vue/bootstrap-vue/issues/701))
  ([bc7ca26](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc7ca26))
- **toggle:** Remove \$root listener on unbind (Issue
  [#680](https://github.com/bootstrap-vue/bootstrap-vue/issues/680))
  ([#698](https://github.com/bootstrap-vue/bootstrap-vue/issues/698))
  ([ec5000c](https://github.com/bootstrap-vue/bootstrap-vue/commit/ec5000c))

### Features v0.19.0

- **button:** Add pressed prop to place button in active state
  ([#715](https://github.com/bootstrap-vue/bootstrap-vue/issues/715))
  ([61a104f](https://github.com/bootstrap-vue/bootstrap-vue/commit/61a104f))
- **button:** refactor toggle button focus handler
  ([#730](https://github.com/bootstrap-vue/bootstrap-vue/issues/730))
  ([3ab3d89](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ab3d89))
- **carousel:** Add v-model support (issue
  [#743](https://github.com/bootstrap-vue/bootstrap-vue/issues/743))
  ([#744](https://github.com/bootstrap-vue/bootstrap-vue/issues/744))
  ([028eb5f](https://github.com/bootstrap-vue/bootstrap-vue/commit/028eb5f))
- **checkbox:** Add indeterminate state prop
  ([#720](https://github.com/bootstrap-vue/bootstrap-vue/issues/720))
  ([2271e7a](https://github.com/bootstrap-vue/bootstrap-vue/commit/2271e7a))
- **collapse:** apply Bootstrap classes during transition stages (issue
  [#565](https://github.com/bootstrap-vue/bootstrap-vue/issues/565))
  ([#707](https://github.com/bootstrap-vue/bootstrap-vue/issues/707))
  ([947d253](https://github.com/bootstrap-vue/bootstrap-vue/commit/947d253))
- **collapse:** Close navbar collapse when clicked in nav/navbar (issue
  [#712](https://github.com/bootstrap-vue/bootstrap-vue/issues/712))
  ([#714](https://github.com/bootstrap-vue/bootstrap-vue/issues/714))
  ([f104dc0](https://github.com/bootstrap-vue/bootstrap-vue/commit/f104dc0))
- **Event:** standard evt obj emulates native Event
  ([#726](https://github.com/bootstrap-vue/bootstrap-vue/issues/726))
  ([919344b](https://github.com/bootstrap-vue/bootstrap-vue/commit/919344b))
- **form-checkbox:** Support button style checkbox
  ([#729](https://github.com/bootstrap-vue/bootstrap-vue/issues/729))
  ([740d7cb](https://github.com/bootstrap-vue/bootstrap-vue/commit/740d7cb))
- **form-input:** Add autocomplete prop
  ([#750](https://github.com/bootstrap-vue/bootstrap-vue/issues/750))
  ([d686787](https://github.com/bootstrap-vue/bootstrap-vue/commit/d686787))
- **form-input:** Pass input element to formatter (issue
  [#772](https://github.com/bootstrap-vue/bootstrap-vue/issues/772))
  ([#773](https://github.com/bootstrap-vue/bootstrap-vue/issues/773))
  ([da77f15](https://github.com/bootstrap-vue/bootstrap-vue/commit/da77f15))
- **form-radio:** ARIA - Add IDs to individual radios
  ([#663](https://github.com/bootstrap-vue/bootstrap-vue/issues/663))
  ([1de785e](https://github.com/bootstrap-vue/bootstrap-vue/commit/1de785e))
- **form-radio:** Support button style radios
  ([#728](https://github.com/bootstrap-vue/bootstrap-vue/issues/728))
  ([c7c150f](https://github.com/bootstrap-vue/bootstrap-vue/commit/c7c150f))
- **form-select:** Add multiple select support (issue
  [#619](https://github.com/bootstrap-vue/bootstrap-vue/issues/619))
  ([#731](https://github.com/bootstrap-vue/bootstrap-vue/issues/731))
  ([19bf2f5](https://github.com/bootstrap-vue/bootstrap-vue/commit/19bf2f5))
- **form-select:** Allow selectSize to be set when not in multiple mode (Issue
  [#761](https://github.com/bootstrap-vue/bootstrap-vue/issues/761))
  ([#762](https://github.com/bootstrap-vue/bootstrap-vue/issues/762))
  ([6f04090](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f04090))
- **listenonroot:** Use a constant for private property name
  ([#700](https://github.com/bootstrap-vue/bootstrap-vue/issues/700))
  ([26c8a3e](https://github.com/bootstrap-vue/bootstrap-vue/commit/26c8a3e))
- **modal:** Make enforceFocus configurable
  ([#706](https://github.com/bootstrap-vue/bootstrap-vue/issues/706))
  ([f1ab80b](https://github.com/bootstrap-vue/bootstrap-vue/commit/f1ab80b))
- **navbar-brand:** New component <b-navbar-brand>
  ([#710](https://github.com/bootstrap-vue/bootstrap-vue/issues/710))
  ([721292c](https://github.com/bootstrap-vue/bootstrap-vue/commit/721292c))
- **pagination:** Add alignment prop
  ([#745](https://github.com/bootstrap-vue/bootstrap-vue/issues/745))
  ([a8e83a7](https://github.com/bootstrap-vue/bootstrap-vue/commit/a8e83a7))
- **readme:** add david dep badge
  ([#724](https://github.com/bootstrap-vue/bootstrap-vue/issues/724))
  ([435a857](https://github.com/bootstrap-vue/bootstrap-vue/commit/435a857))
- **table:** add field data formatter prop
  ([#739](https://github.com/bootstrap-vue/bootstrap-vue/issues/739))
  ([9da94a6](https://github.com/bootstrap-vue/bootstrap-vue/commit/9da94a6))
- **table:** Add syncable sort-by and sort-desc props
  ([#742](https://github.com/bootstrap-vue/bootstrap-vue/issues/742))
  ([c8ad5a3](https://github.com/bootstrap-vue/bootstrap-vue/commit/c8ad5a3))
- **table:** Emit event when local filtering changes number of result items - issue
  [#650](https://github.com/bootstrap-vue/bootstrap-vue/issues/650)
  ([#652](https://github.com/bootstrap-vue/bootstrap-vue/issues/652))
  ([1b2a36a](https://github.com/bootstrap-vue/bootstrap-vue/commit/1b2a36a))
- **toggle directives:** allow simple elements to use directive
  ([#651](https://github.com/bootstrap-vue/bootstrap-vue/issues/651))
  ([3361911](https://github.com/bootstrap-vue/bootstrap-vue/commit/3361911))
- **utils:** transpiler friendly polyfills and methods
  ([#658](https://github.com/bootstrap-vue/bootstrap-vue/issues/658))
  ([2ee9ed6](https://github.com/bootstrap-vue/bootstrap-vue/commit/2ee9ed6))
- **utils:** wrap-up as ES6 module
  ([#656](https://github.com/bootstrap-vue/bootstrap-vue/issues/656))
  ([b5f7cfc](https://github.com/bootstrap-vue/bootstrap-vue/commit/b5f7cfc))

## [v0.18.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.17.1...v0.18.0)

Released: 2017-07-04

### Bug Fixes v0.18.0

- **docs:** Collapse meta.jso typo fix
  ([6191bed](https://github.com/bootstrap-vue/bootstrap-vue/commit/6191bed))
- Remove usage of es2015 Array.prototype.includes
  ([#589](https://github.com/bootstrap-vue/bootstrap-vue/issues/589))
  ([b3fc095](https://github.com/bootstrap-vue/bootstrap-vue/commit/b3fc095))
- **button-toolbar:** keynav better element visibility test
  ([5c33b8e](https://github.com/bootstrap-vue/bootstrap-vue/commit/5c33b8e))
- **button-toolbar:** Typo on property `keyNav`
  ([#600](https://github.com/bootstrap-vue/bootstrap-vue/issues/600))
  ([60b1fd8](https://github.com/bootstrap-vue/bootstrap-vue/commit/60b1fd8))
- **docs:** add root wrapper to templates
  ([ff6432d](https://github.com/bootstrap-vue/bootstrap-vue/commit/ff6432d))
- **docs:** Fix ScrollSpy example
  ([0365208](https://github.com/bootstrap-vue/bootstrap-vue/commit/0365208))
- **docs:** form-radio typo fix
  ([db6d5d7](https://github.com/bootstrap-vue/bootstrap-vue/commit/db6d5d7))
- **docs:** form-select docs typo fix
  ([630e02f](https://github.com/bootstrap-vue/bootstrap-vue/commit/630e02f))
- **docs:** table example markup
  ([d3d7437](https://github.com/bootstrap-vue/bootstrap-vue/commit/d3d7437))
- **form:** Emit native submit on component
  ([#636](https://github.com/bootstrap-vue/bootstrap-vue/issues/636))
  ([0ba6f94](https://github.com/bootstrap-vue/bootstrap-vue/commit/0ba6f94)), closes
  [#588](https://github.com/bootstrap-vue/bootstrap-vue/issues/588)
- **form controls:** Apply only required props & classes
  ([#609](https://github.com/bootstrap-vue/bootstrap-vue/issues/609))
  ([c773f79](https://github.com/bootstrap-vue/bootstrap-vue/commit/c773f79))
- **form-checkbox:** Remove duplicate computed prop
  ([f47ab79](https://github.com/bootstrap-vue/bootstrap-vue/commit/f47ab79))
- **form-file:** remove inputClass
  ([2415617](https://github.com/bootstrap-vue/bootstrap-vue/commit/2415617))
- **form-options:** pull out custom text field for object notation
  ([#625](https://github.com/bootstrap-vue/bootstrap-vue/issues/625))
  ([83cec54](https://github.com/bootstrap-vue/bootstrap-vue/commit/83cec54)), closes
  [#622](https://github.com/bootstrap-vue/bootstrap-vue/issues/622)
- **form-radio:** isChecked to work with arrays & non-arrays.
  ([#629](https://github.com/bootstrap-vue/bootstrap-vue/issues/629))
  ([578d451](https://github.com/bootstrap-vue/bootstrap-vue/commit/578d451)), closes
  [#623](https://github.com/bootstrap-vue/bootstrap-vue/issues/623)
- **form-radio, form-checkbox:** Set autocomplete off
  ([#616](https://github.com/bootstrap-vue/bootstrap-vue/issues/616))
  ([e127313](https://github.com/bootstrap-vue/bootstrap-vue/commit/e127313))
- **modal:** use listenOnRoot mixin
  ([#593](https://github.com/bootstrap-vue/bootstrap-vue/issues/593))
  ([531a6ab](https://github.com/bootstrap-vue/bootstrap-vue/commit/531a6ab))
- **nav-toggle:** typo in method name
  ([5e0bb2a](https://github.com/bootstrap-vue/bootstrap-vue/commit/5e0bb2a))
- **table demo.html:** remove deprecated fieldset prop
  ([#630](https://github.com/bootstrap-vue/bootstrap-vue/issues/630))
  ([18e8547](https://github.com/bootstrap-vue/bootstrap-vue/commit/18e8547))

### Features v0.18.0

- **docs:** live demo ([#602](https://github.com/bootstrap-vue/bootstrap-vue/issues/602))
  ([843057e](https://github.com/bootstrap-vue/bootstrap-vue/commit/843057e))
- **docs:** Native event capturing docs
  ([#605](https://github.com/bootstrap-vue/bootstrap-vue/issues/605))
  ([c2c200b](https://github.com/bootstrap-vue/bootstrap-vue/commit/c2c200b))
- **dropdowns:** Various optimizations for dropdown components
  ([#627](https://github.com/bootstrap-vue/bootstrap-vue/issues/627))
  ([56d29b0](https://github.com/bootstrap-vue/bootstrap-vue/commit/56d29b0))
- **form controls:** Add required attribute and related ARIA support
  ([#613](https://github.com/bootstrap-vue/bootstrap-vue/issues/613))
  ([3db70a4](https://github.com/bootstrap-vue/bootstrap-vue/commit/3db70a4))
- **form controls:** Optimize props
  ([#604](https://github.com/bootstrap-vue/bootstrap-vue/issues/604))
  ([35a5db6](https://github.com/bootstrap-vue/bootstrap-vue/commit/35a5db6))
- **form-fieldset:** Add alias of b-form-group
  ([eebe36d](https://github.com/bootstrap-vue/bootstrap-vue/commit/eebe36d))
- **form-fieldset:** label, description, and feedback slots, deprecate label-size
  ([#598](https://github.com/bootstrap-vue/bootstrap-vue/issues/598))
  ([e253dae](https://github.com/bootstrap-vue/bootstrap-vue/commit/e253dae))
- **form-input:** support aria-invalid attribute
  ([#610](https://github.com/bootstrap-vue/bootstrap-vue/issues/610))
  ([d676d8f](https://github.com/bootstrap-vue/bootstrap-vue/commit/d676d8f))
- **form-radio:** Add support for aria-invalid
  ([#612](https://github.com/bootstrap-vue/bootstrap-vue/issues/612))
  ([69e449f](https://github.com/bootstrap-vue/bootstrap-vue/commit/69e449f))
- **form-select:** Add aria-invalid support
  ([#611](https://github.com/bootstrap-vue/bootstrap-vue/issues/611))
  ([1d20f8a](https://github.com/bootstrap-vue/bootstrap-vue/commit/1d20f8a))
- **mixin:** Automate event registration & removal on root vm
  ([#581](https://github.com/bootstrap-vue/bootstrap-vue/issues/581))
  ([be5f834](https://github.com/bootstrap-vue/bootstrap-vue/commit/be5f834))

## [v0.17.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v0.17.0...v0.17.1)

Released: 2017-06-30

### Bug Fixes v0.17.1

- **tooltip:** inline-block element for wrappers
  ([#572](https://github.com/bootstrap-vue/bootstrap-vue/issues/572))
  ([4b680ee](https://github.com/bootstrap-vue/bootstrap-vue/commit/4b680ee))
