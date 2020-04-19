# Changelog

> All notable changes to this project will be documented in this file.

<a name="2.12.0"></a>

## [v2.12.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.11.0...v2.12.0)

Released: 2020-04-20

### Features v2.12.0

- **b-avatar:** add support for badges on avatars
  ([#5124](https://github.com/bootstrap-vue/bootstrap-vue/issues/5124))
  ([a2e465b](https://github.com/bootstrap-vue/bootstrap-vue/commit/a2e465b6457cabb88e42bcefd86a86e36c4602de))
- **b-avatar:** if `variant` is empty string, then remove spacing around image (closes
  [#5154](https://github.com/bootstrap-vue/bootstrap-vue/issues/5154))
  ([#5156](https://github.com/bootstrap-vue/bootstrap-vue/issues/5156))
  ([7ff87fc](https://github.com/bootstrap-vue/bootstrap-vue/commit/7ff87fc560a2ad005bdca394cccf1fafa9d5e696))
- **b-calendar, b-form-datepicker:** add prop `weekday-header-format` to specify weekday header
  length (closes [#5171](https://github.com/bootstrap-vue/bootstrap-vue/issues/5171))
  ([#5175](https://github.com/bootstrap-vue/bootstrap-vue/issues/5175))
  ([8241644](https://github.com/bootstrap-vue/bootstrap-vue/commit/8241644477b174042bb163ba1741c3066165d9f9))
- **b-calendar, b-form-datepicker:** add scoped slots for date navigation buttons (closes
  [#5117](https://github.com/bootstrap-vue/bootstrap-vue/issues/5117))
  ([#5147](https://github.com/bootstrap-vue/bootstrap-vue/issues/5147))
  ([5f69864](https://github.com/bootstrap-vue/bootstrap-vue/commit/5f69864497a13a9b18a96b508af6b9ba89a43add))
- **b-form-datepicker:** add pass through prop `date-info-fn` (closes
  [#4826](https://github.com/bootstrap-vue/bootstrap-vue/issues/4826))
  ([#5150](https://github.com/bootstrap-vue/bootstrap-vue/issues/5150))
  ([bf35f80](https://github.com/bootstrap-vue/bootstrap-vue/commit/bf35f80d1c4619cf4494dc8a6256d093140d4052))
- **b-form-rating:** new `b-form-rating` custom component
  ([#5132](https://github.com/bootstrap-vue/bootstrap-vue/issues/5132))
  ([30ad7fe](https://github.com/bootstrap-vue/bootstrap-vue/commit/30ad7fe746cd6187311c86319abf6e9519b81f15))
- **b-sidebar:** add optional backdrop support
  ([#5182](https://github.com/bootstrap-vue/bootstrap-vue/issues/5182))
  ([c6375e5](https://github.com/bootstrap-vue/bootstrap-vue/commit/c6375e5513cb0ec33a9bc9fc894a123d74cf7768))
- **custom components:** avoid using padding/margin utility classes where possible (closes
  [#5117](https://github.com/bootstrap-vue/bootstrap-vue/issues/5117))
  ([#5121](https://github.com/bootstrap-vue/bootstrap-vue/issues/5121))
  ([8c6cfe0](https://github.com/bootstrap-vue/bootstrap-vue/commit/8c6cfe0af919a4e54667bcb4b29d2ba6b6576b67))
- **icons:** new `throb` and `fade` animations
  ([#5122](https://github.com/bootstrap-vue/bootstrap-vue/issues/5122))
  ([bc0117c](https://github.com/bootstrap-vue/bootstrap-vue/commit/bc0117cc794c948b202daf2e17f22eb4c36235cc))

### Bug Fixes v2.12.0

- **b-alert:** fix memory leak by using the correct method to clear the countdown timeout
  ([#5158](https://github.com/bootstrap-vue/bootstrap-vue/issues/5158))
  ([7a7f33d](https://github.com/bootstrap-vue/bootstrap-vue/commit/7a7f33d74f906e5feecf2bf177636c7f85bc4537))
- **b-avatar:** fix button type font size inheritance
  ([#5177](https://github.com/bootstrap-vue/bootstrap-vue/issues/5177))
  ([441ebdc](https://github.com/bootstrap-vue/bootstrap-vue/commit/441ebdc8a262c6c6ed494ddc6a6c0c06604045ef))
- **b-calendar:** use `Intl.NumberFormat` for formatting the number in the date buttons (closes
  [#5171](https://github.com/bootstrap-vue/bootstrap-vue/issues/5171))
  ([#5179](https://github.com/bootstrap-vue/bootstrap-vue/issues/5179))
  ([cbf2cd0](https://github.com/bootstrap-vue/bootstrap-vue/commit/cbf2cd007cce81a5f664fa649b08af6735fe16e4))
- **b-form-datepicker:** make datepicker respect `no-highlight-today` prop
  ([#5159](https://github.com/bootstrap-vue/bootstrap-vue/issues/5159))
  ([c4ead33](https://github.com/bootstrap-vue/bootstrap-vue/commit/c4ead3302b176e4a90fbfcfe6380de0edc22640f))

### Other v2.12.0

- documentation updates
- dev dependency updates

<a name="2.11.0"></a>

## [v2.11.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.10.1...v2.11.0)

Released: 2020-04-07

### Features v2.11.0

- **b-avatar:** if image `src` fails to load, then show icon, text or fallback icon
  ([#5079](https://github.com/bootstrap-vue/bootstrap-vue/issues/5079))
  ([ed6704d](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed6704d0971ade485393b7f711f05d93ca42ebc3))
- **b-calendar, b-form-datepicker:** add optional decade navigation buttons (addresses
  [#4976](https://github.com/bootstrap-vue/bootstrap-vue/issues/4976))
  ([#5112](https://github.com/bootstrap-vue/bootstrap-vue/issues/5112))
  ([b1f74a8](https://github.com/bootstrap-vue/bootstrap-vue/commit/b1f74a84f4021022e606360ee6824c6645b6fbd0))

### Bug Fixes v2.11.0

- **b-calendar, b-form-datepicker:** handle keyboard navigation when selected date is out of range
  (fixes [#5057](https://github.com/bootstrap-vue/bootstrap-vue/issues/5057))
  ([#5108](https://github.com/bootstrap-vue/bootstrap-vue/issues/5108))
  ([6ed09f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/6ed09f40ae1594c7ad96dedc8c3d7c2a54d4d9c7))
- **b-link:** don't render `target` or `rel` attrs when `router-tag` other than `a` or `area`
  provided ([#5107](https://github.com/bootstrap-vue/bootstrap-vue/issues/5107))
  ([33c6cef](https://github.com/bootstrap-vue/bootstrap-vue/commit/33c6cefc2f46ab8110e39f110d984f230d525c86))
- **tooltip, popover:** handle `'click blur'` trigger on iOS webkit browsers (fixes
  [#5099](https://github.com/bootstrap-vue/bootstrap-vue/issues/5099))
  ([#5103](https://github.com/bootstrap-vue/bootstrap-vue/issues/5103))
  ([27da76c](https://github.com/bootstrap-vue/bootstrap-vue/commit/27da76cdc70449b0564e31f5733df97d758652ea))

### Other v2.11.0

- additional unit testing
- dev dependencies updates
- minor documentation updates

<a name="2.10.1"></a>

## [v2.10.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.10.0...v2.10.1)

Released: 2020-04-02

### Bug Fixes v2.10.1

- **b-avatar:** remove default padding when in button mode (fixes
  [#5073](https://github.com/bootstrap-vue/bootstrap-vue/issues/5073))
  ([#5076](https://github.com/bootstrap-vue/bootstrap-vue/issues/5076))
  ([26377b3](https://github.com/bootstrap-vue/bootstrap-vue/commit/26377b3479f323baa2d702fab7f5200949ed680d))
- **b-table:** fix context object `currentPage` issue introduced in v2.10.0 (fixes
  [#5065](https://github.com/bootstrap-vue/bootstrap-vue/issues/5065))
  ([#5067](https://github.com/bootstrap-vue/bootstrap-vue/issues/5067))
  ([874dca2](https://github.com/bootstrap-vue/bootstrap-vue/commit/874dca2c8c385fecf7cec76e6cfa44eda9fcabf4))

### Other v2.10.1

- dev dependency updates

<a name="2.10.0"></a>

## [v2.10.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.9.0...v2.10.0)

Released: 2020-04-01

### Features v2.10.0

- **b-sidebar:** new custom component `<b-sidebar>` (closes
  [#3324](https://github.com/bootstrap-vue/bootstrap-vue/issues/3324),
  [#3210](https://github.com/bootstrap-vue/bootstrap-vue/issues/3210),
  [#1702](https://github.com/bootstrap-vue/bootstrap-vue/issues/1702))
  ([#5021](https://github.com/bootstrap-vue/bootstrap-vue/issues/5021))
  ([a77866f](https://github.com/bootstrap-vue/bootstrap-vue/commit/a77866f6d032f1a5a22be2d12d60be507825769c))

### Bug Fixes v2.10.0

- **b-avatar:** remove duplicate button variant class
  ([#5056](https://github.com/bootstrap-vue/bootstrap-vue/issues/5056))
  ([9f78f32](https://github.com/bootstrap-vue/bootstrap-vue/commit/9f78f32d964b187f35a1feffb7aa4bc264587923))
- **b-card:** handle `header-html` and `footer-html` props correctly (fixes
  [#5038](https://github.com/bootstrap-vue/bootstrap-vue/issues/5038))
  ([#5039](https://github.com/bootstrap-vue/bootstrap-vue/issues/5039))
  ([f378aef](https://github.com/bootstrap-vue/bootstrap-vue/commit/f378aeffdebdc7922f6ad4c5d513642dfb93cf1d))
- **types:** add missing declaration for `b-form-timepicker` (closes
  [#5035](https://github.com/bootstrap-vue/bootstrap-vue/issues/5035))
  ([#5036](https://github.com/bootstrap-vue/bootstrap-vue/issues/5036))
  ([ae84118](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae841184dc3037b5d6f365311cc668bccb0e85da))

### Other v2.10.0

- documentation site improvements and updates
- dev dependency updates

<a name="2.9.0"></a>

## [v2.9.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.8.0...v2.9.0)

Released: 2020-03-25

### Features v2.9.0

- **b-aspect:** new custom component `<b-aspect>`
  ([#5008](https://github.com/bootstrap-vue/bootstrap-vue/issues/5008))
  ([662c8e0](https://github.com/bootstrap-vue/bootstrap-vue/commit/662c8e0709c8c73fb2119976d1906943cfe6daad))
- **b-avatar:** add `alt` prop for adding alt attribute to image and icon avatars (closes
  [#4990](https://github.com/bootstrap-vue/bootstrap-vue/issues/4990))
  ([#4991](https://github.com/bootstrap-vue/bootstrap-vue/issues/4991))
  ([d1474f2](https://github.com/bootstrap-vue/bootstrap-vue/commit/d1474f28729e4e13ad97b75a87d56f85543d4c96))
- **b-drodpown-item-button, b-drodpown-item-button:** add `button-class` and `link-class` prop
  ([#5014](https://github.com/bootstrap-vue/bootstrap-vue/issues/5014))
  ([b39d31c](https://github.com/bootstrap-vue/bootstrap-vue/commit/b39d31cede76b594b5608fa472d53e3dac525e2b))
- **b-form-datepicker, b-form-timepicker:** emit `shown` and `hidden` events
  ([#5004](https://github.com/bootstrap-vue/bootstrap-vue/issues/5004))
  ([eb259b9](https://github.com/bootstrap-vue/bootstrap-vue/commit/eb259b998dfd3e88a1b04ed8d3f4c97560f69dbb))
- **b-navbar-toggle:** make default slot scoped
  ([#4995](https://github.com/bootstrap-vue/bootstrap-vue/issues/4995))
  ([144d45f](https://github.com/bootstrap-vue/bootstrap-vue/commit/144d45fb0e4d66bbf243b4a4df39d7f3b9b5c7cc))

### Docs v2.9.0

- Ensure that the `IconsPlugin` is imported when exporting from playground to CodePen, CodeSandbox,
  and JsFiddle ([#5003](https://github.com/bootstrap-vue/bootstrap-vue/issues/5003))

### Other v2.9.0

- dev dependency updates

<a name="2.8.0"></a>

## [v2.8.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.7.0...v2.8.0)

Released: 2020-03-22

### Features v2.8.0

- **icons:** upgrade to Bootstrap Icons `1.0.0.alpha3`
  ([#4966](https://github.com/bootstrap-vue/bootstrap-vue/issues/4966))
  ([d481365](https://github.com/bootstrap-vue/bootstrap-vue/commit/d481365c9f8014e1573026881c3588f2d51999ee))
  - 200+ new icons
  - `skip-*` icon names fixed (closes [#4733](https://github.com/bootstrap-vue/bootstrap-vue/4733))
  - `document-*` icons renamed to `file-*`
  - `alert-*` icons renamed to `exclamation-*`
  - `columns-gutters` icon renamed to `columns-gap`
  - `diamond` icon renamed to `gem` because of new `diamond-*` shape icons
- **b-avatar:** new `<b-avatar>` component
  ([#4974](https://github.com/bootstrap-vue/bootstrap-vue/issues/4974))
  ([b2325a3](https://github.com/bootstrap-vue/bootstrap-vue/commit/b2325a3f87a58207603be0bad41afb3059a575a1))
- **b-form-spinbutton:** add slots for increment and decrement button content (closes
  [#4958](https://github.com/bootstrap-vue/bootstrap-vue/issues/4958))
  ([#4963](https://github.com/bootstrap-vue/bootstrap-vue/issues/4963))
  ([5684405](https://github.com/bootstrap-vue/bootstrap-vue/commit/5684405197c8dd03b0711b0efc11ab6d76fb7714))

### Other v2.8.0

- docs updates
- dev dependencies updates

<a name="2.7.0"></a>

## [v2.7.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.6.1...v2.7.0)

Released: 2020-03-14

### Features v2.7.0

- **b-overlay:** new component `b-overlay`
  ([#4907](https://github.com/bootstrap-vue/bootstrap-vue/issues/4907))
  ([134d64d](https://github.com/bootstrap-vue/bootstrap-vue/commit/134d64d073bb64fecd74ffc521476bfd97a99fc0))
- **b-calendar, b-form-datepicker:** add new `initial-date` prop, and constrain today/current month
  buttons between `min` and `max` (closes
  [#4899](https://github.com/bootstrap-vue/bootstrap-vue/issues/4899))
  ([#4906](https://github.com/bootstrap-vue/bootstrap-vue/issues/4906))
  ([1d957eb](https://github.com/bootstrap-vue/bootstrap-vue/commit/1d957ebd78a8693e91a8116d12c28fe24bd7c19c))
- **b-form-datepicker, b-form-timepicker:** add support for icon button only mode (closes
  [#4888](https://github.com/bootstrap-vue/bootstrap-vue/issues/4888))
  ([#4915](https://github.com/bootstrap-vue/bootstrap-vue/issues/4915))
  ([13660c3](https://github.com/bootstrap-vue/bootstrap-vue/commit/13660c3ad02f6c692d306ec95f0d2b19212f9423))
- **b-icon:** add animated icon options (closes
  [#4720](https://github.com/bootstrap-vue/bootstrap-vue/issues/4720))
  ([#4934](https://github.com/bootstrap-vue/bootstrap-vue/issues/4934),
  [#4945](https://github.com/bootstrap-vue/bootstrap-vue/issues/4945),
  [#4948](https://github.com/bootstrap-vue/bootstrap-vue/issues/4948))
  ([7c781fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/7c781faea78315a753b2db903b12c500d6547ae1),
  [b786f67](https://github.com/bootstrap-vue/bootstrap-vue/commit/b786f671c3d69bbf9dbfb088840a332d4a066b14),
  [927c234](https://github.com/bootstrap-vue/bootstrap-vue/commit/927c234a6b5d68e23e86f7d1782b179b1ccb8786))

### Bug Fixes v2.7.0

- **b-form-file:** fix value prop validation when using directory mode (fixes
  [#4912](https://github.com/bootstrap-vue/bootstrap-vue/issues/4912))
  ([#4913](https://github.com/bootstrap-vue/bootstrap-vue/issues/4913))
  ([498a262](https://github.com/bootstrap-vue/bootstrap-vue/commit/498a26219571bb6108aaa7134dc25c8e1ff6c98f))
- **b-form-file:** make sure to catch all errors when resetting the input
  ([#4936](https://github.com/bootstrap-vue/bootstrap-vue/issues/4936))
  ([682bc46](https://github.com/bootstrap-vue/bootstrap-vue/commit/682bc46028cacfdb570fe416a051160ee9789fe2))

### Other v2.7.0

- `deps`: update devDependency rollup to 2.0.x
- minor docs updates

<a name="2.6.1"></a>

## [v2.6.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.6.0...v2.6.1)

Released: 2020-03-06

### Bug Fixes v2.6.1

- **b-form-spinbutton:** respect step value for initial decrement when `wrap` enabled (closes
  [#4884](https://github.com/bootstrap-vue/bootstrap-vue/issues/4884))
  ([#4885](https://github.com/bootstrap-vue/bootstrap-vue/issues/4885))
  ([28e7245](https://github.com/bootstrap-vue/bootstrap-vue/commit/28e724536be4762382328648f203bd46d8f52fdc))

### Other v2.6.1

- documentation updates and fixes
- dev dependency updates

<a name="2.6.0"></a>

## [v2.6.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.5.0...v2.6.0)

Released: 2020-03-05

### Features v2.6.0

- **b-calendar, b-form-datepicker:** allow customization of in-component displayed date format
  (closes [#4797](https://github.com/bootstrap-vue/bootstrap-vue/issues/4797))
  ([#4835](https://github.com/bootstrap-vue/bootstrap-vue/issues/4835))
  ([85c7e75](https://github.com/bootstrap-vue/bootstrap-vue/commit/85c7e759bc78d2ffb5b026cb5ee484b2567136aa))
- **b-form-datepicker:** add `button-content` optionally scoped slot for calendar icon
  ([#4795](https://github.com/bootstrap-vue/bootstrap-vue/issues/4795))
  ([7a00910](https://github.com/bootstrap-vue/bootstrap-vue/commit/7a0091099025d8bdcf953b00d8619726b54fa937))
- **b-form-datepicker:** add `calendar-width` prop (closes
  [#4817](https://github.com/bootstrap-vue/bootstrap-vue/issues/4817))
  ([#4822](https://github.com/bootstrap-vue/bootstrap-vue/issues/4822))
  ([91b77bc](https://github.com/bootstrap-vue/bootstrap-vue/commit/91b77bc9a6b1a4796698ce3185c0b354156ce563))
- **b-pagination, b-pagination-nav:** improve aria accessibility - changes to inner structure and
  aria attributes (closes: [#4811](https://github.com/bootstrap-vue/bootstrap-vue/issues/4811),
  [#4160](https://github.com/bootstrap-vue/bootstrap-vue/issues/4160))
  ([#4810](https://github.com/bootstrap-vue/bootstrap-vue/issues/4810))
  ([7ee4baa](https://github.com/bootstrap-vue/bootstrap-vue/commit/7ee4baa9a843411cd30a3ee499fc7272b7cf48f2))
- **b-tabs:** add ability to provide custom tab button attributes (closes:
  [#4803](https://github.com/bootstrap-vue/bootstrap-vue/issues/4803))
  ([#4806](https://github.com/bootstrap-vue/bootstrap-vue/issues/4806))
  ([c541d3d](https://github.com/bootstrap-vue/bootstrap-vue/commit/c541d3d89ae88f3193305b61ae8ddc735aa6ec03))
- **b-time, b-form-timepicker:** new components `b-time` and `b-form-timepicker`
  ([#4783](https://github.com/bootstrap-vue/bootstrap-vue/issues/4783))
  ([417ef8f](https://github.com/bootstrap-vue/bootstrap-vue/commit/417ef8f2165e68d182e942219d847511b0fd6e9c))

### Bug Fixes v2.6.0

- **b-form-datepicker:** menu focus handling for Firefox and Safari on MacOS, and fix v-model update
  issue (closes [#4814](https://github.com/bootstrap-vue/bootstrap-vue/issues/4814),
  [#4827](https://github.com/bootstrap-vue/bootstrap-vue/issues/4827))
  ([#4824](https://github.com/bootstrap-vue/bootstrap-vue/issues/4824))
  ([09fa920](https://github.com/bootstrap-vue/bootstrap-vue/commit/09fa920e4a904c6340c60586b40451dce94efc44))
- **b-form-spinbutton:** prevent buttons from re-ordering when parent element is RTL
  ([#4802](https://github.com/bootstrap-vue/bootstrap-vue/issues/4802))
  ([ae2cce9](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae2cce9d593bd310b3d2256ade41df0243447970))
- **b-form-spinbutton:** prevent double increment/decrement on mobile (fixes
  [#4838](https://github.com/bootstrap-vue/bootstrap-vue/issues/4838))
  ([#4842](https://github.com/bootstrap-vue/bootstrap-vue/issues/4842))
  ([9c2c700](https://github.com/bootstrap-vue/bootstrap-vue/commit/9c2c700a91d7a6e57572f579f68996eaceda5c00))

### Other v2.6.0

- documentation updates
- dev dependency updates

<a name="2.5.0"></a>

## [v2.5.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.4.2...v2.5.0)

Released: 2020-02-18

### Features v2.5.0

- **b-calendar, b-form-datepicker:** new components `b-calendar` and `b-form-datepicker` (closes
  [#3676](https://github.com/bootstrap-vue/bootstrap-vue/issues/3676),
  [#1428](https://github.com/bootstrap-vue/bootstrap-vue/issues/1428))
  ([#4712](https://github.com/bootstrap-vue/bootstrap-vue/issues/4712))
  ([af0ded0](https://github.com/bootstrap-vue/bootstrap-vue/commit/af0ded0a3bdc9d69653e9c55f874d550e4909662))
- **b-form-spinbutton:** new form control component `b-form-spinbutton`
  ([#4744](https://github.com/bootstrap-vue/bootstrap-vue/issues/4744))
  ([da5e473](https://github.com/bootstrap-vue/bootstrap-vue/commit/da5e473bee8866f2940e027e5e7e87e3a2ff8f11))
- **v-b-hover:** new directive for reacting to hover changes
  ([#4771](https://github.com/bootstrap-vue/bootstrap-vue/issues/4771))
  ([b7adc6d](https://github.com/bootstrap-vue/bootstrap-vue/commit/b7adc6dc726f75c0578b3de5208f112bef58b4ad))

### Bug Fixes v2.5.0

- **b-form-tags:** improve accessibility for screen reader users
  ([#4775](https://github.com/bootstrap-vue/bootstrap-vue/issues/4775))
  ([2328630](https://github.com/bootstrap-vue/bootstrap-vue/commit/2328630542defc395912165a964a95107f8a4ba9))
- **b-modal:** additional fixes for show transition behaviour (closes
  [#4761](https://github.com/bootstrap-vue/bootstrap-vue/issues/4761))
  ([#4777](https://github.com/bootstrap-vue/bootstrap-vue/issues/4777))
  ([1113c6f](https://github.com/bootstrap-vue/bootstrap-vue/commit/1113c6f951d86b7e6e6ba2161f935d2b6e0b5ce8))

### Other v2.5.0

- documentation updates
- documentation accessibility improvements
- dev dependency updates

<a name="2.4.2"></a>

## [v2.4.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.4.1...v2.4.2)

Released: 2020-02-15

### Bug Fixes v2.4.2

- **b-button:** when `href` is "#" add `role=button` and appropriate keydown handlers for A11Y
  ([#4768](https://github.com/bootstrap-vue/bootstrap-vue/issues/4768))
  ([087a128](https://github.com/bootstrap-vue/bootstrap-vue/commit/087a1283977061c44d5b059c203f13d2326dabae))
- **b-modal:** fix transition show enter timing (closes
  [#4761](https://github.com/bootstrap-vue/bootstrap-vue/issues/4761))
  ([#4766](https://github.com/bootstrap-vue/bootstrap-vue/issues/4766))
  ([968c957](https://github.com/bootstrap-vue/bootstrap-vue/commit/968c95758e45610a8c002507790c79d87d8fe956))

### Other v2.4.2

- documentation updates
- dev dependency updates

<a name="2.4.1"></a>

## [v2.4.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.4.0...v2.4.1)

Released: 2020-02-12

### Bug Fixes v2.4.1

- **b-form-input, b-form-textarea:** handle change event for all mobile device keyboards (closes
  [#4724](https://github.com/bootstrap-vue/bootstrap-vue/issues/4724))
  ([#4739](https://github.com/bootstrap-vue/bootstrap-vue/issues/4739))
  ([166a932](https://github.com/bootstrap-vue/bootstrap-vue/commit/166a932fb11fa552714aba7df67992e1265b9047))
- **b-tooltip, v-b-tooltip:** fix arrow margin
  ([#4727](https://github.com/bootstrap-vue/bootstrap-vue/issues/4727))
  ([865a655](https://github.com/bootstrap-vue/bootstrap-vue/commit/865a6557fbf49115c05326f9a96c4f9fdf135e96))

### Other v2.4.1

- dev dependency updates
- minor docs updates

<a name="2.4.0"></a>

## [v2.4.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.3.0...v2.4.0)

Released: 2020-02-01

### Features v2.4.0

- **b-modal:** add `ignore-enforce-focus-selector` prop (closes
  [#4537](https://github.com/bootstrap-vue/bootstrap-vue/issues/4537))
  ([#4702](https://github.com/bootstrap-vue/bootstrap-vue/issues/4702))
  ([c3ac992](https://github.com/bootstrap-vue/bootstrap-vue/commit/c3ac99283927b5261d1df05d3c479c534011d7c5))
- **b-nav-item-dropdown:** add `boundary` prop, applicable when not in `b-navbar` (closes
  [#4684](https://github.com/bootstrap-vue/bootstrap-vue/issues/4684))
  ([#4691](https://github.com/bootstrap-vue/bootstrap-vue/issues/4691))
  ([3a50ad8](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a50ad85e85e1c6dc55a36665062180687078708))

### Bug Fixes v2.4.0

- **b-dropdown:** focus-in handling for Safari and Firefox on macOS/iOS (closes
  [#4328](https://github.com/bootstrap-vue/bootstrap-vue/issues/4328))
  ([#4426](https://github.com/bootstrap-vue/bootstrap-vue/issues/4426))
  ([2eab55b](https://github.com/bootstrap-vue/bootstrap-vue/commit/2eab55b4672a35a487b30f0f64c63b887b361473))
- **b-form-input, b-form-textarea:** properly handle out-of-sync values (closes
  [#4695](https://github.com/bootstrap-vue/bootstrap-vue/issues/4695))
  ([#4701](https://github.com/bootstrap-vue/bootstrap-vue/issues/4701))
  ([954176d](https://github.com/bootstrap-vue/bootstrap-vue/commit/954176d733dccdd074f5b6cb31c4041081a3b206))

<a name="2.3.0"></a>

## [v2.3.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.2.2...v2.3.0)

Released: 2020-01-24

### Features v2.3.0

- **b-button-close:** add `content` prop
  ([#4574](https://github.com/bootstrap-vue/bootstrap-vue/issues/4574))
  ([7379c6d](https://github.com/bootstrap-vue/bootstrap-vue/commit/7379c6dd0bac76307720645080741b3b0ed7ed99))
- **b-form-tags:** new option to specify input type (closes
  [#4644](https://github.com/bootstrap-vue/bootstrap-vue/issues/4644))
  ([#4645](https://github.com/bootstrap-vue/bootstrap-vue/issues/4645))
  ([b899fac](https://github.com/bootstrap-vue/bootstrap-vue/commit/b899faceb4c1fd8562454fa93432e70d7113401b))
- **b-pagination, b-pagination-nav:** add page button class props and option to show first/last page
  numbers (closes [#4597](https://github.com/bootstrap-vue/bootstrap-vue/issues/4597),
  [#4533](https://github.com/bootstrap-vue/bootstrap-vue/issues/4533))
  ([#4622](https://github.com/bootstrap-vue/bootstrap-vue/issues/4622))
  ([3a3ee1d](https://github.com/bootstrap-vue/bootstrap-vue/commit/3a3ee1dc9312a1a8c530a5ea42d1d239d5a24351))
- **icons:** add stacking support
  ([#4658](https://github.com/bootstrap-vue/bootstrap-vue/issues/4658))
  ([b185cdb](https://github.com/bootstrap-vue/bootstrap-vue/commit/b185cdb686ddddcde1b98585b1fbc48859fc541a))

### Bug Fixes v2.3.0

- **v-b-modal:** only unbind/rebind during componentUpdated hook if trigger element or modal ID
  changes (closes [#4669](https://github.com/bootstrap-vue/bootstrap-vue/issues/4669))
  ([#4672](https://github.com/bootstrap-vue/bootstrap-vue/issues/4672))
  ([e53a05d](https://github.com/bootstrap-vue/bootstrap-vue/commit/e53a05d960a9de0ca9636ee31e0197e7e554ddbc))
- **utils:** pass all Array/Object util shortcuts as functions, for handling late loaded polyfills
  ([#4647](https://github.com/bootstrap-vue/bootstrap-vue/issues/4647))
  ([f584425](https://github.com/bootstrap-vue/bootstrap-vue/commit/f5844256a03d2f4b8006900419acfa2c5e3803c3))

<a name="2.2.2"></a>

## [v2.2.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.2.1...v2.2.2)

Released: 2020-01-15

### Bug Fixes v2.2.2

- **nuxt module:** remove unnecessary export statements
  ([#4624](https://github.com/bootstrap-vue/bootstrap-vue/issues/4624))
  ([27f066c](https://github.com/bootstrap-vue/bootstrap-vue/commit/27f066cfa07ee311fe1e312d9a9ebd0eb76750c7))

### Other v2.2.2

- dev dependencies updates
- minor docs updates

<a name="2.2.1"></a>

## [v2.2.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.2.0...v2.2.1)

Released: 2020-01-13

### Bug Fixes v2.2.1

- **icons:** make icon transform props work with IE 11 (closes
  [#4607](https://github.com/bootstrap-vue/bootstrap-vue/issues/4607))
  ([#4608](https://github.com/bootstrap-vue/bootstrap-vue/issues/4608))
  ([899779f](https://github.com/bootstrap-vue/bootstrap-vue/commit/899779f20015f719198a763136137eea01aa11ea))
- **types:** add missing declarations for `b-form-select-option` & `b-form-select-option-group`
  ([#4595](https://github.com/bootstrap-vue/bootstrap-vue/issues/4595))
  ([8d60832](https://github.com/bootstrap-vue/bootstrap-vue/commit/8d60832d38e74231a4bda15aa045b84aae97d2ed))
- **types:** include named export BootstrapVue in declaration file
  ([#4590](https://github.com/bootstrap-vue/bootstrap-vue/issues/4590))
  ([603307a](https://github.com/bootstrap-vue/bootstrap-vue/commit/603307aeccf6141b94eff2186baee4ec43439033))
- **modal, tooltips, popovers**: remove `nextTick` delay when updating content in transporter portal
  (closes [#4589](https://github.com/bootstrap-vue/bootstrap-vue/issues/4589))
  ([#4604](https://github.com/bootstrap-vue/bootstrap-vue/issues/4604))
  ([0e3e7e0](https://github.com/bootstrap-vue/bootstrap-vue/commit/0e3e7e03370685367ac69949e596c9fff5c68163))
- **utils:** correct `identity` spelling error
  ([#4579](https://github.com/bootstrap-vue/bootstrap-vue/issues/4579))
  ([7fed191](https://github.com/bootstrap-vue/bootstrap-vue/commit/7fed1911d6d9f7eae81526010483c71e1679e770))

### Docs v2.2.1

- add live validation examples in validation reference section
  ([#4584](https://github.com/bootstrap-vue/bootstrap-vue/issues/4584))
  ([aca4a5c](https://github.com/bootstrap-vue/bootstrap-vue/commit/aca4a5c8f9a9ed0d7526de396ff072f0c1f4ebdf))

### Other v2.2.1

- dev dependencies updates

<a name="2.2.0"></a>

## [v2.2.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.1.0...v2.2.0)

Released: 2020-01-08

### Overview v2.2.0

- New optional icon components based on `BootstrapIcons v1.0.0-alpha2`
- New tagged input component `<b-form-tags>`
- Support for `Bootstrap v4.4.1` CSS/SCSS

### Features v2.2.0

- **icons:** new optional icon components
  ([#4489](https://github.com/bootstrap-vue/bootstrap-vue/issues/4489))
  ([d2bef17](https://github.com/bootstrap-vue/bootstrap-vue/commit/d2bef1715636fcb83de6d51808683e6feda671d0))
- **b-collapse:** add new prop `appear` to animate an initially visible collapse
  ([#4317](https://github.com/bootstrap-vue/bootstrap-vue/issues/4317))
  ([136a72b](https://github.com/bootstrap-vue/bootstrap-vue/commit/136a72b0352d4bb1339ab31f791087cbcda42fa5))
- **b-collapse:** add optional scoping to default slot
  ([#4405](https://github.com/bootstrap-vue/bootstrap-vue/issues/4405))
  ([8e95bac](https://github.com/bootstrap-vue/bootstrap-vue/commit/8e95bacf9d00562f2676689d067ae0db009cbbb6))
- **b-container:** add support for Bootstrap v4.4.x new responsive containers
  ([0e318f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/0e318f4755e65eb569dcc579938d0d72c02abd62))
- **b-dropdown:** add splitClass property to dropdown component
  ([#4394](https://github.com/bootstrap-vue/bootstrap-vue/issues/4394))
  ([a5f342e](https://github.com/bootstrap-vue/bootstrap-vue/commit/a5f342e0e4de2186259e36e42cecda8c20e1c8ab))
- **b-dropdown-form:** new `form-class` prop for adding classes to the form element (closes
  [#4474](https://github.com/bootstrap-vue/bootstrap-vue/issues/4474))
  ([#4475](https://github.com/bootstrap-vue/bootstrap-vue/issues/4475))
  ([eef4200](https://github.com/bootstrap-vue/bootstrap-vue/commit/eef4200976f7921b1bb03f50c0ece8ee7c41ed0e))
- **b-form-select:** add group/tree support and dedicated option and option-group components (closes
  [#3222](https://github.com/bootstrap-vue/bootstrap-vue/issues/3222))
  ([#4267](https://github.com/bootstrap-vue/bootstrap-vue/issues/4267))
  ([f1ed017](https://github.com/bootstrap-vue/bootstrap-vue/commit/f1ed0177c20f9d7e7e340a8815d1b6bc66f7cb76))
- **b-form-select:** support paths for `valueField`, `textField`, `htmlField` and `disabledField`
  props ([#4386](https://github.com/bootstrap-vue/bootstrap-vue/issues/4386))
  ([ed3b736](https://github.com/bootstrap-vue/bootstrap-vue/commit/ed3b7360af415dc3cc56f0b6662c9d48cc165781))
- **b-form-tags:** new tagged input component
  ([#4409](https://github.com/bootstrap-vue/bootstrap-vue/issues/4409))
  ([00eb9d9](https://github.com/bootstrap-vue/bootstrap-vue/commit/00eb9d9fd460adca8227b3b344284b5cc49a734f))
- **b-row:** add Bootstrap v4.4 row columns support
  ([#4439](https://github.com/bootstrap-vue/bootstrap-vue/issues/4439))
  ([833b028](https://github.com/bootstrap-vue/bootstrap-vue/commit/833b028a2d6101d01b7012a7378359db1c801695))
- **b-table:** better sort labeling for screen readers (closes
  [#4487](https://github.com/bootstrap-vue/bootstrap-vue/issues/4487))
  ([#4488](https://github.com/bootstrap-vue/bootstrap-vue/issues/4488))
  ([d4e66fa](https://github.com/bootstrap-vue/bootstrap-vue/commit/d4e66fa48fdd1cd7fd4b93907fe999de3fc577f8))
- **b-table, b-table-lite:** new `tbody-tr-attr` prop for arbitrary row attributes (closes
  [#1864](https://github.com/bootstrap-vue/bootstrap-vue/issues/1864))
  ([#4481](https://github.com/bootstrap-vue/bootstrap-vue/issues/4481))
  ([4acf6ed](https://github.com/bootstrap-vue/bootstrap-vue/commit/4acf6ed863dd5edd85897a01b099c42322097d1b))
- **b-tooltip:** add `noninteractive` prop (closes
  [#4556](https://github.com/bootstrap-vue/bootstrap-vue/issues/4556))
  ([#4563](https://github.com/bootstrap-vue/bootstrap-vue/issues/4563))
  ([b3ad726](https://github.com/bootstrap-vue/bootstrap-vue/commit/b3ad7264d9b10fb1b8dfba70c62eed11a56519d6))
- **build:** configure pre-commit hook (closes
  [#4532](https://github.com/bootstrap-vue/bootstrap-vue/issues/4532))
  ([#4552](https://github.com/bootstrap-vue/bootstrap-vue/issues/4552))
  ([1bf9e59](https://github.com/bootstrap-vue/bootstrap-vue/commit/1bf9e59e8888a7a2cd6f135665103419f603a32d))

### Bug Fixes v2.2.0

- **b-table, b-table-lite:** handle edge case with row events when table is removed from dom.
  instantiate row event handlers only when listeners are registered (fixes
  [#4384](https://github.com/bootstrap-vue/bootstrap-vue/issues/4384))
  ([#4388](https://github.com/bootstrap-vue/bootstrap-vue/issues/4388))
  ([9a81cd4](https://github.com/bootstrap-vue/bootstrap-vue/commit/9a81cd414a2c534b96de0d82c3d00d94651e5a7b))
- **b-toast:** fix internal `ensureToaster` method call when toaster name changes
  ([#4468](https://github.com/bootstrap-vue/bootstrap-vue/issues/4468))
  ([744bb7a](https://github.com/bootstrap-vue/bootstrap-vue/commit/744bb7a77092a04184af31bf285e432110e1ab44))
- **tooltips, popovers:** fix memory leak (closes
  [#4400](https://github.com/bootstrap-vue/bootstrap-vue/issues/4400))
  ([#4401](https://github.com/bootstrap-vue/bootstrap-vue/issues/4401))
  ([c71352d](https://github.com/bootstrap-vue/bootstrap-vue/commit/c71352d674347e5e2d72fe8b82334fc87a4ffd8c))
- **docs:** handle undocumented breaking changes in babel-standalone for IE 11
  ([#4484](https://github.com/bootstrap-vue/bootstrap-vue/issues/4484))
  ([56f8bb5](https://github.com/bootstrap-vue/bootstrap-vue/commit/56f8bb5af7fb7188da035210e8be28d7ae1c7bc1))

<a name="2.1.0"></a>

## [v2.1.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.4...v2.1.0)

Released: 2019-11-12

### Features v2.1.0

- auto-generate file `web-types.json` for WebStorm, and files `vetur-tags.json` and
  `vetur-attributes.json` for Vetur (closes
  [#4107](https://github.com/bootstrap-vue/bootstrap-vue/issues/4107))
  ([#4110](https://github.com/bootstrap-vue/bootstrap-vue/issues/4110))
  ([1a3e6a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/1a3e6a5))
- **b-dropdown:** add `block` support to toggle button (closes
  [#4266](https://github.com/bootstrap-vue/bootstrap-vue/issues/4266))
  ([#4269](https://github.com/bootstrap-vue/bootstrap-vue/issues/4269))
  ([30029e3](https://github.com/bootstrap-vue/bootstrap-vue/commit/30029e3))
- **b-form-group:** allow setting label cols props to `auto` (closes
  [#4217](https://github.com/bootstrap-vue/bootstrap-vue/issues/4217))
  ([#4218](https://github.com/bootstrap-vue/bootstrap-vue/issues/4218))
  ([21a822b](https://github.com/bootstrap-vue/bootstrap-vue/commit/21a822b))
- **b-form-input, b-form-textarea:** add `lazy` modifier prop to update v-model on change/blur event
  ([#4169](https://github.com/bootstrap-vue/bootstrap-vue/issues/4169))
  ([55787dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/55787dd))
- **b-form-input, b-form-textarea:** add `v-model` debouncing feature, and deprecate `<b-table>`
  prop `filter-debounce` (closes
  [#4150](https://github.com/bootstrap-vue/bootstrap-vue/issues/4150))
  ([#4314](https://github.com/bootstrap-vue/bootstrap-vue/issues/4314))
  ([3ecdfa2](https://github.com/bootstrap-vue/bootstrap-vue/commit/3ecdfa2))
- **b-img, b-img-lazy:** add support for `srcset` and `sizes` props (closes
  [#4348](https://github.com/bootstrap-vue/bootstrap-vue/issues/4348))
  ([#4350](https://github.com/bootstrap-vue/bootstrap-vue/issues/4350))
  ([f419cb4](https://github.com/bootstrap-vue/bootstrap-vue/commit/f419cb4))
- **b-pagination, b-pagination-nav:** add `pills` style option
  ([#4236](https://github.com/bootstrap-vue/bootstrap-vue/issues/4236))
  ([605d4c4](https://github.com/bootstrap-vue/bootstrap-vue/commit/605d4c4))
- **b-table:** add `selectRow()` and `unselectRow()` methods to cell and row-details slot scopes,
  and new prop `no-select-on-click`
  ([#4283](https://github.com/bootstrap-vue/bootstrap-vue/issues/4283))
  ([64b881f](https://github.com/bootstrap-vue/bootstrap-vue/commit/64b881f))
- **b-table:** default the row select feature `selected-variant` to the `active` variant
  ([#4128](https://github.com/bootstrap-vue/bootstrap-vue/issues/4128))
  ([af372b0](https://github.com/bootstrap-vue/bootstrap-vue/commit/af372b0))
- **b-table, b-table-lite:** add in head/foot row variant prop (addresses
  [#4215](https://github.com/bootstrap-vue/bootstrap-vue/issues/4215))
  ([#4216](https://github.com/bootstrap-vue/bootstrap-vue/issues/4216))
  ([b222c7c](https://github.com/bootstrap-vue/bootstrap-vue/commit/b222c7c))
- **b-table, b-table-lite:** add prop `details-td-class` for applying classes to the details row
  `<td>` ([#4276](https://github.com/bootstrap-vue/bootstrap-vue/issues/4276))
  ([702a1ef](https://github.com/bootstrap-vue/bootstrap-vue/commit/702a1ef))
- **b-tabs:** emit cancelable BvEvent before changing tabs via new `activate-tab` event (closes
  [#4273](https://github.com/bootstrap-vue/bootstrap-vue/issues/4273))
  ([#4274](https://github.com/bootstrap-vue/bootstrap-vue/issues/4274))
  ([9b195dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/9b195dd))
- **v-b-visible:** make `v-b-visible` directive available for public use
  ([#4318](https://github.com/bootstrap-vue/bootstrap-vue/issues/4318))
  ([5fa7e22](https://github.com/bootstrap-vue/bootstrap-vue/commit/5fa7e22))

### Bug Fixes v2.1.0

- **b-dropdown:** handle issue with touch devices on MacOS using Safari/Firefox (Fixes
  [#4328](https://github.com/bootstrap-vue/bootstrap-vue/issues/4328),
  [#4344](https://github.com/bootstrap-vue/bootstrap-vue/issues/4344))
  ([#4329](https://github.com/bootstrap-vue/bootstrap-vue/issues/4329))
  ([2779a0a](https://github.com/bootstrap-vue/bootstrap-vue/commit/2779a0a))
- **b-nav-form, b-nav-text:** ensure these sub-components have `<li>` as root element for
  accessibility ([#4100](https://github.com/bootstrap-vue/bootstrap-vue/issues/4100))
  ([6774800](https://github.com/bootstrap-vue/bootstrap-vue/commit/6774800))
- **b-pagination, b-pagination-nav:** add UP/DOWN keyboard navigation support for JAWS (fixes
  [#4322](https://github.com/bootstrap-vue/bootstrap-vue/issues/4322))
  ([#4325](https://github.com/bootstrap-vue/bootstrap-vue/issues/4325))
  ([c686088](https://github.com/bootstrap-vue/bootstrap-vue/commit/c686088))
- **b-table, b-table-lite, b-table-simple:** fix issue with sticky columns when table is not
  responsive but has sticky headers (fixes
  [#4354](https://github.com/bootstrap-vue/bootstrap-vue/issues/4354))
  ([#4356](https://github.com/bootstrap-vue/bootstrap-vue/issues/4356))
  ([56b3958](https://github.com/bootstrap-vue/bootstrap-vue/commit/56b3958))
- **b-table, b-table-lite, b-tbody:** fix delegated event handlers when transition + minor
  adjustment to row `key` generation (fixes
  [#4370](https://github.com/bootstrap-vue/bootstrap-vue/issues/4370),
  [#4360](https://github.com/bootstrap-vue/bootstrap-vue/issues/4360))
  ([#4372](https://github.com/bootstrap-vue/bootstrap-vue/issues/4372))
  ([030a3d8](https://github.com/bootstrap-vue/bootstrap-vue/commit/030a3d8))
- **b-tabs:** allow space to trigger tab activation when `no-key-nav` is enabled (fixes
  [#4323](https://github.com/bootstrap-vue/bootstrap-vue/issues/4323))
  ([#4326](https://github.com/bootstrap-vue/bootstrap-vue/issues/4326))
  ([731365b](https://github.com/bootstrap-vue/bootstrap-vue/commit/731365b))
- **v-b-modal:** ensure trigger element is keyboard accessible if not a link or button, for A11Y
  ([#4365](https://github.com/bootstrap-vue/bootstrap-vue/issues/4365))
  ([f54ca29](https://github.com/bootstrap-vue/bootstrap-vue/commit/f54ca29))
- **v-b-modal:** open modal using `ENTER` key on non-button elements for A11Y
  ([#4364](https://github.com/bootstrap-vue/bootstrap-vue/issues/4364))
  ([0d27d7b](https://github.com/bootstrap-vue/bootstrap-vue/commit/0d27d7b))
- **v-b-tooltip, v-b-popover:** ensure reference to trigger element is passed to title/content
  function (fixes [#4331](https://github.com/bootstrap-vue/bootstrap-vue/issues/4331))
  ([#4332](https://github.com/bootstrap-vue/bootstrap-vue/issues/4332))
  ([ea0cbda](https://github.com/bootstrap-vue/bootstrap-vue/commit/ea0cbda))
- **v-b-visible:** fix type error in `componentUpdated` hook + minor docs update/fixes
  ([#4327](https://github.com/bootstrap-vue/bootstrap-vue/issues/4327))
  ([5f3ba9e](https://github.com/bootstrap-vue/bootstrap-vue/commit/5f3ba9e))
- **web-types:** update web-types code generation to match latest schema
  ([#4271](https://github.com/bootstrap-vue/bootstrap-vue/issues/4271))
  ([009431e](https://github.com/bootstrap-vue/bootstrap-vue/commit/009431e))

### Other v2.1.0

- **b-table:** deprecate prop `filter-debounce` in favour of `b-form-input` debouncing
- documentation updates and fixes

<a name="2.0.4"></a>

## [v2.0.4](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.3...v2.0.4)

Released: 2019-10-11

### Bug Fixes v2.0.4

- **b-carousel:** disable the next/prev controls when the carousel is sliding (closes
  [#4210](https://github.com/bootstrap-vue/bootstrap-vue/issues/4210))
  ([#4212](https://github.com/bootstrap-vue/bootstrap-vue/issues/4212))
  ([64d556d](https://github.com/bootstrap-vue/bootstrap-vue/commit/64d556d))
- **b-dropdown-form:** fix SCSS styling when placed in a nav dropdown (fixes
  [#4220](https://github.com/bootstrap-vue/bootstrap-vue/issues/4220))
  ([#4223](https://github.com/bootstrap-vue/bootstrap-vue/issues/4223))
  ([b852bba](https://github.com/bootstrap-vue/bootstrap-vue/commit/b852bba))
- **types:** correct the declared export name for `BCardSubTitle` component
  ([#4229](https://github.com/bootstrap-vue/bootstrap-vue/issues/4229))
  ([9f216df](https://github.com/bootstrap-vue/bootstrap-vue/commit/9f216df))

### Performance v2.0.4

- **b-table, b-table-lite:** improve render performance for large tables (closes
  [#4211](https://github.com/bootstrap-vue/bootstrap-vue/issues/4211),
  [#4155](https://github.com/bootstrap-vue/bootstrap-vue/issues/4155))
  ([#4213](https://github.com/bootstrap-vue/bootstrap-vue/issues/4213))
  ([f3f42f2](https://github.com/bootstrap-vue/bootstrap-vue/commit/f3f42f2))

### Other v2.0.4

- add `"sass"` entry in `package.json`
- minor docs fixes and updates

<a name="2.0.3"></a>

## [v2.0.3](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.2...v2.0.3)

Released: 2019-10-05

### Bug Fixes v2.0.3

- **b-form-file:** fix prop type checking for `value` prop
  ([#4168](https://github.com/bootstrap-vue/bootstrap-vue/issues/4168))
  ([a8e2e56](https://github.com/bootstrap-vue/bootstrap-vue/commit/a8e2e56))
- **b-nav-item-dropdown:** focus-out handling when new focus comes from another `dropdown-toggle`
  (closes [#4113](https://github.com/bootstrap-vue/bootstrap-vue/issues/4113))
  ([#4139](https://github.com/bootstrap-vue/bootstrap-vue/issues/4139))
  ([9c37875](https://github.com/bootstrap-vue/bootstrap-vue/commit/9c37875))
- **b-table:** minor code optimizations to filter debouncing
  ([#4167](https://github.com/bootstrap-vue/bootstrap-vue/issues/4167))
  ([018eef1](https://github.com/bootstrap-vue/bootstrap-vue/commit/018eef1))
- **b-table, b-table-lite, b-table-simple:** disable sticky header max-height on printers / print
  media ([#4147](https://github.com/bootstrap-vue/bootstrap-vue/issues/4147))
  ([24c62c5](https://github.com/bootstrap-vue/bootstrap-vue/commit/24c62c5))
- **b-tooltip, b-popover:** add `SVGElement` as acceptable prop type (closes
  [#4173](https://github.com/bootstrap-vue/bootstrap-vue/issues/4173))
  ([#4174](https://github.com/bootstrap-vue/bootstrap-vue/issues/4174))
  ([fab7fea](https://github.com/bootstrap-vue/bootstrap-vue/commit/fab7fea))
- **v-b-modal:** bind to inner link or button for dropdown items or nav items (fixes
  [#4149](https://github.com/bootstrap-vue/bootstrap-vue/issues/4149))
  ([#4187](https://github.com/bootstrap-vue/bootstrap-vue/issues/4187))
  ([5c28bd2](https://github.com/bootstrap-vue/bootstrap-vue/commit/5c28bd2))

### Performance v2.0.3

- **b-table, b-table-lite:** delegate row event handlers to the tbody element
  ([#4192](https://github.com/bootstrap-vue/bootstrap-vue/issues/4192))
  ([3f0d46a](https://github.com/bootstrap-vue/bootstrap-vue/commit/3f0d46a))
- **tables:** make `b-th` extend `b-td` instead of using functional wrappers
  ([#4156](https://github.com/bootstrap-vue/bootstrap-vue/issues/4156))
  ([c9715a8](https://github.com/bootstrap-vue/bootstrap-vue/commit/c9715a8))
- **tables:** improve provide/inject performance (addresses
  [#4155](https://github.com/bootstrap-vue/bootstrap-vue/issues/4155))
  ([#4164](https://github.com/bootstrap-vue/bootstrap-vue/issues/4164))
  ([152fefc](https://github.com/bootstrap-vue/bootstrap-vue/commit/152fefc))

### Docs v2.0.3

- add prop descriptions to component reference tables (closes
  [#3647](https://github.com/bootstrap-vue/bootstrap-vue/issues/3647))
  ([#4161](https://github.com/bootstrap-vue/bootstrap-vue/issues/4161))
  ([fdd2a83](https://github.com/bootstrap-vue/bootstrap-vue/commit/fdd2a83))
- add quick links (page table of contents) to docs pages for small screens, and add table of
  contents to section index pages (instead of a redirect to first child page)
  ([#4145](https://github.com/bootstrap-vue/bootstrap-vue/issues/4145))
  ([22268aa](https://github.com/bootstrap-vue/bootstrap-vue/commit/22268aa))

<a name="2.0.2"></a>

## [v2.0.2](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.1...v2.0.2)

Released: 2019-09-20

This patch release includes a few minor bug fixes and documentation updates.

### Bug Fixes v2.0.2

- **b-popover, b-tooltip:** ensure prop `boundary-padding` is passed to popper instance (fixes
  [#4131](https://github.com/bootstrap-vue/bootstrap-vue/issues/4131))
  ([#4133](https://github.com/bootstrap-vue/bootstrap-vue/issues/4133))
  ([a54a647](https://github.com/bootstrap-vue/bootstrap-vue/commit/a54a647))
- **b-collapse:** make `id` prop not required
  ([#4109](https://github.com/bootstrap-vue/bootstrap-vue/issues/4109))
  ([4f935ce](https://github.com/bootstrap-vue/bootstrap-vue/commit/4f935ce))
- **tables:** add in missing Bootstrap variant class `bg-active` for dark tables
  ([#4098](https://github.com/bootstrap-vue/bootstrap-vue/issues/4098))
  ([d9900ab](https://github.com/bootstrap-vue/bootstrap-vue/commit/d9900ab))
- **tables:** ensure row variant `active` (class `table-active`) takes precedence over other row
  variants (addresses [#3008](https://github.com/bootstrap-vue/bootstrap-vue/issues/3008))
  ([#4127](https://github.com/bootstrap-vue/bootstrap-vue/issues/4127))
  ([fdb8bb6](https://github.com/bootstrap-vue/bootstrap-vue/commit/fdb8bb6))
- **tooltips, popovers:** hide trigger element `title` attribute during show delay (fixes
  [#4114](https://github.com/bootstrap-vue/bootstrap-vue/issues/4114))
  ([#4120](https://github.com/bootstrap-vue/bootstrap-vue/issues/4120))
  ([2dd8d5a](https://github.com/bootstrap-vue/bootstrap-vue/commit/2dd8d5a))

<a name="2.0.1"></a>

## [v2.0.1](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0...v2.0.1)

Released: 2019-09-13

This patch release includes a few minor bug fixes and documentation updates.

### Bug Fixes v2.0.1

- **b-media:** fix vertical align class when `top` or `bottom` selected (fixes
  [#4052](https://github.com/bootstrap-vue/bootstrap-vue/issues/4052))
  ([#4055](https://github.com/bootstrap-vue/bootstrap-vue/issues/4055))
  ([9ccfe4c](https://github.com/bootstrap-vue/bootstrap-vue/commit/9ccfe4c))
- **b-table:** handle filter as an object when using items provider, and prevent duplicate provider
  calls on mount (fixes [#4065](https://github.com/bootstrap-vue/bootstrap-vue/issues/4065))
  ([#4068](https://github.com/bootstrap-vue/bootstrap-vue/issues/4068))
  ([9ddd115](https://github.com/bootstrap-vue/bootstrap-vue/commit/9ddd115))
- **b-table:** remove extra slashes in mixins imports
  ([#4087](https://github.com/bootstrap-vue/bootstrap-vue/issues/4087))
  ([77f5be1](https://github.com/bootstrap-vue/bootstrap-vue/commit/77f5be1))
- **tooltips, popovers:** check `document.body` instead of `document` for IE 11 support (fixes
  [#4074](https://github.com/bootstrap-vue/bootstrap-vue/issues/4074))
  ([#4075](https://github.com/bootstrap-vue/bootstrap-vue/issues/4075))
  ([1eda4fe](https://github.com/bootstrap-vue/bootstrap-vue/commit/1eda4fe))
- **v-b-tooltip, v-b-popover:** add missing `disabled` config option
  ([#4057](https://github.com/bootstrap-vue/bootstrap-vue/issues/4057))
  ([f488dc1](https://github.com/bootstrap-vue/bootstrap-vue/commit/f488dc1))
- **v-b-tooltip, v-b-popover:** don't show if no title/content provided (closes
  [#4064](https://github.com/bootstrap-vue/bootstrap-vue/issues/4064))
  ([#4076](https://github.com/bootstrap-vue/bootstrap-vue/issues/4076))
  ([0b7de29](https://github.com/bootstrap-vue/bootstrap-vue/commit/0b7de29))

<a name="2.0.0"></a>

## [v2.0.0](https://github.com/bootstrap-vue/bootstrap-vue/compare/v2.0.0-rc.28...v2.0.0)

Released: 2019-09-06

> **BootstrapVue 2.0.0 stable** introduces several new features and bug fixes. Please note that this
> release also _includes several breaking changes_.

**Notable improvements:**

- Tooltips and popovers have been completely re-written for better reactivity and stability. The
  directive versions are now reactive to trigger element `title` attribute changes and configuration
  changes. The component versions now perform better when quickly hovering/un-hovering the trigger
  element. Component and directive versions now have a default delay of `50`ms (affects `'hover'`
  and `'focus'` triggers only). They can now have a trigger of `'manual'` (when used by itself) of
  which they can only be opened or closed programmatically. Users can now optionally specify the ID
  that the tooltip or popover uses. For accessibility reasons, the `title` attribute is removed from
  the trigger element (target) only when the tooltip or popover is showing, and is restored when
  hidden.
- Modals, tooltips, popovers, and toasts now work with scoped style classes (requires the use of
  vue-loader's `/deep/`, `::v-deep` or `>>>`
  [deep selectors](https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements)
  for targeting inner elements, just like with any other component).
- New SVG background image based sorting indicator icons for `<b-table>`, with the ability to place
  them on either the right (default) or left of the table cell headers (via a new prop).
- Programmatic selection of `<b-table>` selectable rows.
- Ability to provide your own custom footer structure for `<b-table>` and `<b-table-lite>`.

### Breaking changes and deprecated features removal v2.0.0

**Please carefully read the following before upgrading to v2.0.0 stable!**

- Vue `2.6`+ is now **required** at a minimum, `2.6.10`+ is recommended. Some components will fail
  to work as expected if using Vue `2.5` (notably tooltips and popovers, but other components may be
  affected as well).
- All **deprecated features** have been removed in v2.0.0 stable in order to reduce bundle size and
  simplify code.

**Two notable breaking changes are:**

- **changes to the table slot naming syntax:** the table slot syntax introduced in rc.28 has been
  modified in v2.0.0 stable for better compatibility with the new Vue `v-slot` syntax and its
  limitations (which currently are not documented in the Vue.JS docs).
- **the removal of the deprecated `/es` build directory:** Users should now be importing the new
  top-level named exports when importing individual components, directives, and plugins.

Read the following migration guide for more details.

### Migration guide v2.0.0

- **Removal of the deprecated `/es` build directory**. Users should now be using the new simplified
  import syntax introduced in v2.0.0-rc.22. Users should be importing the top-level _named exports_
  instead.
- `b-dropdown`: removal of deprecated `text` slot. Use the `button-content` slot instead.
- `b-form-*` controls, `b-form-group`, `b-form-invalid-feedback` and `b-form-valid-feedback`:
  validation prop `state` now only accepts `true`, `false`, or `null` values. Passing the strings
  `'invalid'` or `'valid'` will no longer work.
- `b-form-group`: removal of the deprecated `horizontal` and `breakpoint` props. Use props
  `label-cols{-{breakpoint}}` instead.
- `b-img-lazy`, `b-card-img-lazy`: now rely only on `IntersectionObserver` support (native or via a
  polyfill) to determine when to show the image. If `IntersectionObserver` support is not detected,
  then the image will _always_ be shown. Use a polyfill if you need to support older browsers (e.g.
  IE 11)
- `b-modal`: the deprecated `BvModalEvent` method `cancel()` has been removed. Use the method
  `preventDefault()` instead.
- `b-modal`: the deprecated `BvModalEvent` property `modalId` has been removed. Use the property
  `componentId` instead.
- `b-nav`: removal of the deprecated `is-nav` prop. Use `b-navbar-nav` component instead when
  placing navs in `b-navbar`.
- `b-nav-item-dropdown`: deprecated props `extra-menu-classes` and `extra-toggle-classes` have been
  removed. Used props `menu-class` and `toggle-class` (respectively) instead.
- `b-table` and `b-table-lite`: **table cell field, header and footer scoped slot naming convention
  has changed**. Users should be using the new table round bracketed slot naming syntax: use slot
  `cell(field)` instead of `field` or `[field]`, use slot `head(field)` instead of `HEAD_field` or
  `HEAD[field]`, use `foot(field)` instead of `FOOT_field` or `FOOT[field]`. This change was
  _required_ for better compatibility with the new Vue `v-slot` syntax. The square bracket syntax
  introduced in `2.0.0-rc.28` has been replaced with the round bracket syntax to reduce possible
  confusion and potential future issues with Vue 2.6's new
  [dynamic slot name](https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names) syntax.
- `b-table`: the `filter` prop will no longer accept a function reference (previously deprecated).
  Instead, pass a function to the `filter-function` prop when using a custom filter function. The
  prop `filter` is only to be used for the filter's _criteria_ (i.e. the search value, search
  `RegExpr`, etc).
- `b-table`: passing an object as a `fields` definition will no longer work. Use the _array of
  strings_ or _array of objects_ (or a combination of the two) fields definition format instead.
- `b-table`: sorting icon SASS variables have been changed to handle the new SVG backgrounds. If you
  previously had custom CSS styling/icons, they will not work as expected - but sorting will still
  work. the SVG backgrounds can be controlled via SASS variables.
- `b-tab`: removal of deprecated `href` prop. Use `<b-nav>` for controlling panes that change with
  URL changes.
- `b-tabs`: removal of deprecated `tabs` slot. Use slot `tabs-end` instead.
- `b-tabs`: removal of deprecated `bottom` prop. Use the `end` prop instead.
- Tooltip SCSS: deprecated variable `$bv-tooltip-bg-level` has been removed. Use variable
  `$b-tooltip-bg-level` instead.
- Popover SCSS: deprecated variables `$bv-popover-bg-level`, `$bv-popover-border-level`, and
  `$bv-popover-color-level` have been removed. Use variables `$b-popover-bg-level`,
  `$b-popover-border-level`, and `$b-popover-color-level` (respectively) instead.

Please refer to the [documentation](https://bootstrap-vue.org/) for the latest usage and examples,
and below for a list of fixes and new features.

### Bug Fixes v2.0.0

- **b-dropdown-\*:** ensure class bindings are placed on root element for all dropdown
  sub-components (closes [#4022](https://github.com/bootstrap-vue/bootstrap-vue/issues/4022))
  ([#4024](https://github.com/bootstrap-vue/bootstrap-vue/issues/4024))
  ([81efb89](https://github.com/bootstrap-vue/bootstrap-vue/commit/81efb89))
- **b-form-textarea:** handle initial auto-height when in modal, tabs, or other component with
  transition or which uses `v-show` (fixes
  [#3936](https://github.com/bootstrap-vue/bootstrap-vue/issues/3936),
  [#3702](https://github.com/bootstrap-vue/bootstrap-vue/issues/3702))
  ([#3937](https://github.com/bootstrap-vue/bootstrap-vue/issues/3937))
  ([be3ac62](https://github.com/bootstrap-vue/bootstrap-vue/commit/be3ac62))
- **b-link:** only add the `nativeOn` property to componentData when rendering a router link
  ([#3976](https://github.com/bootstrap-vue/bootstrap-vue/issues/3976))
  ([62fb0b6](https://github.com/bootstrap-vue/bootstrap-vue/commit/62fb0b6))
- **b-modal:** ensure non-prop attributes are transferred to the modal outer wrapper `div` (closes
  [#3896](https://github.com/bootstrap-vue/bootstrap-vue/issues/3896))
  ([#3921](https://github.com/bootstrap-vue/bootstrap-vue/issues/3921))
  ([8bf3a55](https://github.com/bootstrap-vue/bootstrap-vue/commit/8bf3a55))
- **b-modal:** fix scroll to top issue when modal has `no-fade` set
  ([#4004](https://github.com/bootstrap-vue/bootstrap-vue/issues/4004))
  ([332b79f](https://github.com/bootstrap-vue/bootstrap-vue/commit/332b79f))
- **b-table, b-table-lite:** handle edge case where field slot returns no vNodes (fixes
  [#3919](https://github.com/bootstrap-vue/bootstrap-vue/issues/3919))
  ([#3920](https://github.com/bootstrap-vue/bootstrap-vue/issues/3920))
  ([a392059](https://github.com/bootstrap-vue/bootstrap-vue/commit/a392059))
- **b-table, b-table-lite:** render header when not always stacked mode (fixes
  [#3886](https://github.com/bootstrap-vue/bootstrap-vue/issues/3886))
  ([#3887](https://github.com/bootstrap-vue/bootstrap-vue/issues/3887))
  ([2302b31](https://github.com/bootstrap-vue/bootstrap-vue/commit/2302b31))
- **b-table, b-table-lite:** generate `:key` for `row-details` row based on the `primary-key` field
  value if available ([#4025](https://github.com/bootstrap-vue/bootstrap-vue/issues/4025))
  ([c7cb16f](https://github.com/bootstrap-vue/bootstrap-vue/commit/c7cb16f))
- **v-b-toggle:** don't override `role` if element has a `role` assigned
  ([#3889](https://github.com/bootstrap-vue/bootstrap-vue/issues/3889))
  ([5d155ba](https://github.com/bootstrap-vue/bootstrap-vue/commit/5d155ba))
- **tooltip, popover:** overall code refactor for better reactivity and performance (fixes:
  [#1990](https://github.com/bootstrap-vue/bootstrap-vue/issues/1990),
  [#2937](https://github.com/bootstrap-vue/bootstrap-vue/issues/2937),
  [#3480](https://github.com/bootstrap-vue/bootstrap-vue/issues/3480),
  [#3717](https://github.com/bootstrap-vue/bootstrap-vue/issues/3717),
  [#3854](https://github.com/bootstrap-vue/bootstrap-vue/issues/3854), closes
  [#3451](https://github.com/bootstrap-vue/bootstrap-vue/issues/3451))
  ([#3908](https://github.com/bootstrap-vue/bootstrap-vue/issues/3908))
  ([eebab43](https://github.com/bootstrap-vue/bootstrap-vue/commit/eebab43))

### Features v2.0.0

- **b-carousel:** add prop `no-wrap` for disabling wrapping to start/end (closes
  [#3902](https://github.com/bootstrap-vue/bootstrap-vue/issues/3902))
  ([#3905](https://github.com/bootstrap-vue/bootstrap-vue/issues/3905))
  ([2c8bd23](https://github.com/bootstrap-vue/bootstrap-vue/commit/2c8bd23))
- **b-dropdown:** add `role=presentation` to `<li>` elements for improved a11y
  ([#3996](https://github.com/bootstrap-vue/bootstrap-vue/issues/3996))
  ([464d257](https://github.com/bootstrap-vue/bootstrap-vue/commit/464d257))
- **b-img-lazy:** switch IntersectionObserver to use private `v-b-visible` directive
  ([#3977](https://github.com/bootstrap-vue/bootstrap-vue/issues/3977))
  ([249ccfa](https://github.com/bootstrap-vue/bootstrap-vue/commit/249ccfa))
- **b-modal:** add scoped style support when portalled (non-static modal)
  ([#3962](https://github.com/bootstrap-vue/bootstrap-vue/issues/3962))
  ([77ad6b9](https://github.com/bootstrap-vue/bootstrap-vue/commit/77ad6b9))
- **b-nav:** add card header support
  ([#3883](https://github.com/bootstrap-vue/bootstrap-vue/issues/3883))
  ([4046a53](https://github.com/bootstrap-vue/bootstrap-vue/commit/4046a53))
- **b-pagination:** if number of pages changes, try and keep current page active (closes
  [#3716](https://github.com/bootstrap-vue/bootstrap-vue/issues/3716))
  ([#3990](https://github.com/bootstrap-vue/bootstrap-vue/issues/3990))
  ([ae8ce78](https://github.com/bootstrap-vue/bootstrap-vue/commit/ae8ce78))
- **b-modal:** add prop for auto focusing one of the built in-buttons once `shown` (closes
  [#3945](https://github.com/bootstrap-vue/bootstrap-vue/issues/3945))
  ([#3979](https://github.com/bootstrap-vue/bootstrap-vue/issues/3979))
  ([6f2827e](https://github.com/bootstrap-vue/bootstrap-vue/commit/6f2827e))
- **b-table:** allow field definition properties `filterByFormatted` and `sortByFormatted` to accept
  a formatter function reference (closes
  [#3892](https://github.com/bootstrap-vue/bootstrap-vue/issues/3892))
  ([#3898](https://github.com/bootstrap-vue/bootstrap-vue/issues/3898))
  ([5492b38](https://github.com/bootstrap-vue/bootstrap-vue/commit/5492b38))
- **b-table:** new sorting icons using SVG, plus option to place icon on left of header cell (closes
  [#3687](https://github.com/bootstrap-vue/bootstrap-vue/issues/3687),
  [#3696](https://github.com/bootstrap-vue/bootstrap-vue/issues/3696),
  [#3918](https://github.com/bootstrap-vue/bootstrap-vue/issues/3918),
  [#3966](https://github.com/bootstrap-vue/bootstrap-vue/issues/3966))
  ([#3968](https://github.com/bootstrap-vue/bootstrap-vue/issues/3968))
  ([c4442f4](https://github.com/bootstrap-vue/bootstrap-vue/commit/c4442f4))
- **b-table:** add `filter-debounce` prop for debouncing filter updates
  ([#3891](https://github.com/bootstrap-vue/bootstrap-vue/issues/3891))
  ([03536a5](https://github.com/bootstrap-vue/bootstrap-vue/commit/03536a5))
- **b-table:** add `selectAllRows()` and `clearSelected()` to thead/tfoot slot scopes (addresses
  [#3901](https://github.com/bootstrap-vue/bootstrap-vue/issues/3901))
  ([#3907](https://github.com/bootstrap-vue/bootstrap-vue/issues/3907))
  ([86c53dd](https://github.com/bootstrap-vue/bootstrap-vue/commit/86c53dd))
- **b-table, b-table-lite:** switch slot name syntax to use round brackets instead of square
  brackets ([#3986](https://github.com/bootstrap-vue/bootstrap-vue/issues/3986))
  ([fca7bd5](https://github.com/bootstrap-vue/bootstrap-vue/commit/fca7bd5))
- **b-table, b-table-lite:** remove deprecated slot names, introduce new slot names
  ([#3866](https://github.com/bootstrap-vue/bootstrap-vue/issues/3866))
  ([249efd9](https://github.com/bootstrap-vue/bootstrap-vue/commit/249efd9))
- **b-table, b-table-lite:** use `aria-details` rather than `aria-describedby` when details row
  showing (addresses [#3801](https://github.com/bootstrap-vue/bootstrap-vue/issues/3801))
  ([#3992](https://github.com/bootstrap-vue/bootstrap-vue/issues/3992))
  ([f6f73c7](https://github.com/bootstrap-vue/bootstrap-vue/commit/f6f73c7))
- **b-table, b-table-lite:** add support for custom header attributes (closes
  [#2244](https://github.com/bootstrap-vue/bootstrap-vue/issues/2244))
  ([#3876](https://github.com/bootstrap-vue/bootstrap-vue/issues/3876))
  ([8784f31](https://github.com/bootstrap-vue/bootstrap-vue/commit/8784f31))
- **b-table, b-table-lite:** add new scoped slot `custom-foot` to allow user to create their own
  table footer (closes [#3960](https://github.com/bootstrap-vue/bootstrap-vue/issues/3960))
  ([#4027](https://github.com/bootstrap-vue/bootstrap-vue/issues/4027))
  ([cbeeef9](https://github.com/bootstrap-vue/bootstrap-vue/commit/cbeeef9))
- **b-table, b-table-lite, b-table-simple:** add `no-border-collapse` prop and SCSS
  ([#3987](https://github.com/bootstrap-vue/bootstrap-vue/issues/3987))
  ([253b4f6](https://github.com/bootstrap-vue/bootstrap-vue/commit/253b4f6))
- **b-toast:** add support for scoped styles
  ([#3963](https://github.com/bootstrap-vue/bootstrap-vue/issues/3963))
  ([ca1b5de](https://github.com/bootstrap-vue/bootstrap-vue/commit/ca1b5de))
- **tooltip, popover:** overall code refactor for better reactivity and performance (fixes:
  [#1990](https://github.com/bootstrap-vue/bootstrap-vue/issues/1990),
  [#2937](https://github.com/bootstrap-vue/bootstrap-vue/issues/2937),
  [#3480](https://github.com/bootstrap-vue/bootstrap-vue/issues/3480),
  [#3717](https://github.com/bootstrap-vue/bootstrap-vue/issues/3717),
  [#3854](https://github.com/bootstrap-vue/bootstrap-vue/issues/3854), closes
  [#3451](https://github.com/bootstrap-vue/bootstrap-vue/issues/3451))
  ([#3908](https://github.com/bootstrap-vue/bootstrap-vue/issues/3908))
  ([eebab43](https://github.com/bootstrap-vue/bootstrap-vue/commit/eebab43))

### Deprecation removals v2.0.0

- **b-dropdown:** remove deprecated slot `text`
  ([#3868](https://github.com/bootstrap-vue/bootstrap-vue/issues/3868))
  ([29eb8b1](https://github.com/bootstrap-vue/bootstrap-vue/commit/29eb8b1))
- **b-form-group:** remove deprecated prop `horizontal` and `breakpoint`
  ([#3879](https://github.com/bootstrap-vue/bootstrap-vue/issues/3879))
  ([b301822](https://github.com/bootstrap-vue/bootstrap-vue/commit/b301822))
- **b-nav, b-nav-item-dropdown:** remove deprecated slot and props
  ([#3867](https://github.com/bootstrap-vue/bootstrap-vue/issues/3867))
  ([21fab35](https://github.com/bootstrap-vue/bootstrap-vue/commit/21fab35))
- **b-modal:** remove `BvModalEvent` deprecations
  ([#3864](https://github.com/bootstrap-vue/bootstrap-vue/issues/3864))
  ([90c299c](https://github.com/bootstrap-vue/bootstrap-vue/commit/90c299c))
- **b-table, b-table-lite:** switch slot name syntax to use round brackets instead of square
  brackets ([#3986](https://github.com/bootstrap-vue/bootstrap-vue/issues/3986))
  ([fca7bd5](https://github.com/bootstrap-vue/bootstrap-vue/commit/fca7bd5))
- **b-table, b-table-lite:** remove deprecated slot names, introduce new slot names
  ([#3866](https://github.com/bootstrap-vue/bootstrap-vue/issues/3866))
  ([249efd9](https://github.com/bootstrap-vue/bootstrap-vue/commit/249efd9))
- **b-tabs:** remove deprecations
  ([#3863](https://github.com/bootstrap-vue/bootstrap-vue/issues/3863))
  ([0edac49](https://github.com/bootstrap-vue/bootstrap-vue/commit/0edac49))
- **tooltip/popover:** remove SCSS deprecations
  ([#3869](https://github.com/bootstrap-vue/bootstrap-vue/issues/3869))
  ([bea49d4](https://github.com/bootstrap-vue/bootstrap-vue/commit/bea49d4))
- **build:** remove deprecated `es/` build
  ([#3604](https://github.com/bootstrap-vue/bootstrap-vue/issues/3604))
  ([3828f59](https://github.com/bootstrap-vue/bootstrap-vue/commit/3828f59))

<br>
<hr>

## Older releases

For prior release notes and commits, please refer to the
[CHANGELOG-OLD](https://github.com/bootstrap-vue/bootstrap-vue/blob/master/CHANGELOG-OLD.md) file.
