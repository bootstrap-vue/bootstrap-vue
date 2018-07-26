'use strict';

var __assign = Object.assign || function (e) {
  for (var a, s = 1, t = arguments.length; s < t; s++) {
    for (var r in a = arguments[s]) {
      Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
  }return e;
};function mergeData() {
  for (var e, a, s = {}, t = arguments.length; t--;) {
    for (var r = 0, c = Object.keys(arguments[t]); r < c.length; r++) {
      switch (e = c[r]) {case "class":case "style":case "directives":
          Array.isArray(s[e]) || (s[e] = []), s[e] = s[e].concat(arguments[t][e]);break;case "staticClass":
          if (!arguments[t][e]) break;void 0 === s[e] && (s[e] = ""), s[e] && (s[e] += " "), s[e] += arguments[t][e].trim();break;case "on":case "nativeOn":
          s[e] || (s[e] = {});for (var o = 0, n = Object.keys(arguments[t][e] || {}); o < n.length; o++) {
            a = n[o], s[e][a] ? s[e][a] = [].concat(s[e][a], arguments[t][e][a]) : s[e][a] = arguments[t][e][a];
          }break;case "attrs":case "props":case "domProps":case "scopedSlots":case "staticStyle":case "hook":case "transition":
          s[e] || (s[e] = {}), s[e] = __assign({}, arguments[t][e], s[e]);break;case "slot":case "key":case "ref":case "tag":case "show":case "keepAlive":default:
          s[e] || (s[e] = arguments[t][e]);}
    }
  }return s;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var props = {
  disabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Close'
  },
  textVariant: {
    type: String,
    default: null
  }
};

var bBtnClose = {
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        slots = _ref.slots;

    var componentData = {
      staticClass: 'close',
      class: defineProperty({}, 'text-' + props.textVariant, props.textVariant),
      attrs: {
        type: 'button',
        disabled: props.disabled,
        'aria-label': props.ariaLabel ? String(props.ariaLabel) : null
      },
      on: {
        click: function click(e) {
          // Ensure click on button HTML content is also disabled
          if (props.disabled && e instanceof Event) {
            e.stopPropagation();
            e.preventDefault();
          }
        }
      }
      // Careful not to override the slot with innerHTML
    };if (!slots().default) {
      componentData.domProps = { innerHTML: '&times;' };
    }
    return h('button', mergeData(data, componentData), slots().default);
  }
};

var bAlert = {
  components: { bButtonClose: bBtnClose },
  render: function render(h) {
    if (!this.localShow) {
      // If not showing, render placeholder
      return h(false);
    }
    var dismissBtn = h(false);
    if (this.dismissible) {
      // Add dismiss button
      dismissBtn = h('b-button-close', { attrs: { 'aria-label': this.dismissLabel }, on: { click: this.dismiss } }, [this.$slots.dismiss]);
    }
    var alert = h('div', { class: this.classObject, attrs: { role: 'alert', 'aria-live': 'polite', 'aria-atomic': true } }, [dismissBtn, this.$slots.default]);
    return !this.fade ? alert : h('transition', { props: { name: 'fade', appear: true } }, [alert]);
  },

  model: {
    prop: 'show',
    event: 'input'
  },
  data: function data() {
    return {
      countDownTimerId: null,
      dismissed: false
    };
  },

  computed: {
    classObject: function classObject() {
      return ['alert', this.alertVariant, this.dismissible ? 'alert-dismissible' : ''];
    },
    alertVariant: function alertVariant() {
      var variant = this.variant;
      return 'alert-' + variant;
    },
    localShow: function localShow() {
      return !this.dismissed && (this.countDownTimerId || this.show);
    }
  },
  props: {
    variant: {
      type: String,
      default: 'info'
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    dismissLabel: {
      type: String,
      default: 'Close'
    },
    show: {
      type: [Boolean, Number],
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function show() {
      this.showChanged();
    }
  },
  mounted: function mounted() {
    this.showChanged();
  },
  destroyed /* istanbul ignore next */: function destroyed() {
    this.clearCounter();
  },

  methods: {
    dismiss: function dismiss() {
      this.clearCounter();
      this.dismissed = true;
      this.$emit('dismissed');
      this.$emit('input', false);
      if (typeof this.show === 'number') {
        this.$emit('dismiss-count-down', 0);
        this.$emit('input', 0);
      } else {
        this.$emit('input', false);
      }
    },
    clearCounter: function clearCounter() {
      if (this.countDownTimerId) {
        clearInterval(this.countDownTimerId);
        this.countDownTimerId = null;
      }
    },
    showChanged: function showChanged() {
      var _this = this;

      // Reset counter status
      this.clearCounter();
      // Reset dismiss status
      this.dismissed = false;
      // No timer for boolean values
      if (this.show === true || this.show === false || this.show === null || this.show === 0) {
        return;
      }
      // Start counter
      var dismissCountDown = this.show;
      this.countDownTimerId = setInterval(function () {
        if (dismissCountDown < 1) {
          _this.dismiss();
          return;
        }
        dismissCountDown--;
        _this.$emit('dismiss-count-down', dismissCountDown);
        _this.$emit('input', dismissCountDown);
      }, 1000);
    }
  }
};

/**
 * Register a component plugin as being loaded. returns true if compoent plugin already registered
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */
function registerComponent(Vue, name, def) {
  Vue._bootstrap_vue_components_ = Vue._bootstrap_vue_components_ || {};
  var loaded = Vue._bootstrap_vue_components_[name];
  if (!loaded && def && name) {
    Vue._bootstrap_vue_components_[name] = true;
    Vue.component(name, def);
  }
  return loaded;
}

/**
 * Register a group of components as being loaded.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */
function registerComponents(Vue, components) {
  for (var component in components) {
    registerComponent(Vue, component, components[component]);
  }
}

/**
 * Register a directive as being loaded. returns true if directive plugin already registered
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */
function registerDirective(Vue, name, def) {
  Vue._bootstrap_vue_directives_ = Vue._bootstrap_vue_directives_ || {};
  var loaded = Vue._bootstrap_vue_directives_[name];
  if (!loaded && def && name) {
    Vue._bootstrap_vue_directives_[name] = true;
    Vue.directive(name, def);
  }
  return loaded;
}

/**
 * Register a group of directives as being loaded.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */
function registerDirectives(Vue, directives) {
  for (var directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
}

/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */
function vueUse(VuePlugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
  }
}

var components = {
  bAlert: bAlert
};

var VuePlugin = {
  install: function install(Vue) {
    registerComponents(Vue, components);
  }
};

vueUse(VuePlugin);

/**
 * Aliasing Object[method] allows the minifier to shorten methods to a single character variable,
 * as well as giving BV a chance to inject polyfills.
 * As long as we avoid
 * - import * as Object from "utils/object"
 * all unused exports should be removed by tree-shaking.
 */

// @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  Object.assign = function (target, varArgs) {
    // .length of function is 2

    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Polyfill
if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      // eslint-disable-next-line no-self-compare
      return x !== x && y !== y;
    }
  };
}

var assign = Object.assign;
var keys = Object.keys;
var defineProperties = Object.defineProperties;
var defineProperty$1 = Object.defineProperty;
var create = Object.create;

function readonlyDescriptor() {
  return { enumerable: true, configurable: false, writable: false };
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// es6-ified by @alexsasharegan
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      return Math.min(Math.max(toInteger(value), 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T = void 0;

      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue = void 0;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
// Needed for IE support
if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'find', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Static
var from = Array.from;
var isArray = Array.isArray;

// Instance
var arrayIncludes = function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
};
function concat() {
  return Array.prototype.concat.apply([], arguments);
}

function identity(x) {
  return x;
}

/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object.
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */
function pluckProps(keysToPluck, objToPluck) {
  var transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;

  return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce(function (memo, prop) {
    // eslint-disable-next-line no-sequences
    return memo[transformFn(prop)] = objToPluck[prop], memo;
  }, {});
}

/**
 * The Link component is used in many other BV components.
 * As such, sharing its props makes supporting all its features easier.
 * However, some components need to modify the defaults for their own purpose.
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props.
 *
 * https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 * @return {{}}
 */
function propsFactory() {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    append: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String,
      default: 'active'
    },
    replace: {
      type: Boolean,
      default: false
    },
    routerTag: {
      type: String,
      default: 'a'
    },
    to: {
      type: [String, Object],
      default: null
    }
  };
}

function pickLinkProps(propsToPick) {
  var freshLinkProps = propsFactory();
  // Normalize everything to array.
  propsToPick = concat(propsToPick);

  return keys(freshLinkProps).reduce(function (memo, prop) {
    if (arrayIncludes(propsToPick, prop)) {
      memo[prop] = freshLinkProps[prop];
    }

    return memo;
  }, {});
}

function computeTag(props, parent) {
  return Boolean(parent.$router) && props.to && !props.disabled ? 'router-link' : 'a';
}

function computeHref(_ref, tag) {
  var disabled = _ref.disabled,
      href = _ref.href,
      to = _ref.to;

  // We've already checked the parent.$router in computeTag,
  // so router-link means live router.
  // When deferring to Vue Router's router-link,
  // don't use the href attr at all.
  // Must return undefined for router-link to populate href.
  if (tag === 'router-link') return void 0;
  // If href explicitly provided
  if (href) return href;
  // Reconstruct href when `to` used, but no router
  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (typeof to === 'string') return to;
    // Fallback to `to.path` prop (if `to` is an object)
    if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && typeof to.path === 'string') return to.path;
  }
  // If nothing is provided use '#'
  return '#';
}

function computeRel(_ref2) {
  var target = _ref2.target,
      rel = _ref2.rel;

  if (target === '_blank' && rel === null) {
    return 'noopener';
  }
  return rel || null;
}

function clickHandlerFactory(_ref3) {
  var disabled = _ref3.disabled,
      tag = _ref3.tag,
      href = _ref3.href,
      suppliedHandler = _ref3.suppliedHandler,
      parent = _ref3.parent;

  var isRouterLink = tag === 'router-link';

  return function onClick(e) {
    if (disabled && e instanceof Event) {
      // Stop event from bubbling up.
      e.stopPropagation();
      // Kill the event loop attached to this specific EventTarget.
      e.stopImmediatePropagation();
    } else {
      parent.$root.$emit('clicked::link', e);

      if (isRouterLink && e.target.__vue__) {
        e.target.__vue__.$emit('click', e);
      }
      if (typeof suppliedHandler === 'function') {
        suppliedHandler.apply(undefined, arguments);
      }
    }

    if (!isRouterLink && href === '#' || disabled) {
      // Stop scroll-to-top behavior or navigation.
      e.preventDefault();
    }
  };
}

var bLink = {
  functional: true,
  props: propsFactory(),
  render: function render(h, _ref4) {
    var props = _ref4.props,
        data = _ref4.data,
        parent = _ref4.parent,
        children = _ref4.children;

    var tag = computeTag(props, parent);
    var rel = computeRel(props);
    var href = computeHref(props, tag);
    var eventType = tag === 'router-link' ? 'nativeOn' : 'on';
    var suppliedHandler = (data[eventType] || {}).click;
    var handlers = { click: clickHandlerFactory({ tag: tag, href: href, disabled: props.disabled, suppliedHandler: suppliedHandler, parent: parent }) };

    var componentData = mergeData(data, {
      class: [props.active ? props.exact ? props.exactActiveClass : props.activeClass : null, { disabled: props.disabled }],
      attrs: {
        rel: rel,
        href: href,
        target: props.target,
        tabindex: props.disabled ? '-1' : data.attrs ? data.attrs.tabindex : null,
        'aria-disabled': tag === 'a' && props.disabled ? 'true' : null
      },
      props: assign(props, { tag: props.routerTag })
    });

    // If href prop exists on router-link (even undefined or null) it fails working on SSR
    if (!componentData.attrs.href) {
      delete componentData.attrs.href;
    }

    // We want to overwrite any click handler since our callback
    // will invoke the supplied handler if !props.disabled
    componentData[eventType] = assign(componentData[eventType] || {}, handlers);

    return h(tag, componentData, children);
  }
};

var linkProps = propsFactory();
delete linkProps.href.default;
delete linkProps.to.default;

var props$2 = assign(linkProps, {
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: 'secondary'
  },
  pill: {
    type: Boolean,
    default: false
  }
});

var bBadge = {
  functional: true,
  props: props$2,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var tag = !props.href && !props.to ? props.tag : bLink;

    var componentData = {
      staticClass: 'badge',
      class: [!props.variant ? 'badge-secondary' : 'badge-' + props.variant, {
        'badge-pill': Boolean(props.pill),
        active: props.active,
        disabled: props.disabled
      }],
      props: pluckProps(linkProps, props)
    };

    return h(tag, mergeData(data, componentData), children);
  }
};

var components$1 = {
  bBadge: bBadge
};

var VuePlugin$1 = {
  install: function install(Vue) {
    registerComponents(Vue, components$1);
  }
};

vueUse(VuePlugin$1);

var props$3 = assign(propsFactory(), {
  text: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: '#'
  },
  ariaCurrent: {
    type: String,
    default: 'location'
  }
});

var BreadcrumbLink = {
  functional: true,
  props: props$3,
  render: function render(h, _ref) {
    var suppliedProps = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var tag = suppliedProps.active ? 'span' : bLink;

    var componentData = { props: pluckProps(props$3, suppliedProps) };
    if (suppliedProps.active) {
      componentData.attrs = { 'aria-current': suppliedProps.ariaCurrent };
    } else {
      componentData.attrs = { href: suppliedProps.href };
    }

    return h(tag, mergeData(data, componentData), children || suppliedProps.text);
  }
};

var props$4 = assign({}, props$3, {
  text: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  }
});

var BreadcrumbItem = {
  functional: true,
  props: props$4,
  render: function render(h, _ref) {
    var props$$1 = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h('li', mergeData(data, {
      staticClass: 'breadcrumb-item',
      class: { active: props$$1.active },
      attrs: { role: 'presentation' }
    }), [h(BreadcrumbLink, { props: props$$1 }, children)]);
  }
};

var props$5 = {
  items: {
    type: Array,
    default: null
  }
};

var bBreadcrumb = {
  functional: true,
  props: props$5,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var childNodes = children;
    // Build child nodes from items if given.
    if (isArray(props.items)) {
      var activeDefined = false;
      childNodes = props.items.map(function (item, idx) {
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
          item = { text: item };
        }
        // Copy the value here so we can normalize it.
        var active = item.active;
        if (active) {
          activeDefined = true;
        }
        if (!active && !activeDefined) {
          // Auto-detect active by position in list.
          active = idx + 1 === props.items.length;
        }

        return h(BreadcrumbItem, { props: assign({}, item, { active: active }) });
      });
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childNodes);
  }
};

var components$2 = {
  bBreadcrumb: bBreadcrumb,
  bBreadcrumbItem: BreadcrumbItem,
  bBreadcrumbLink: BreadcrumbLink
};

var VuePlugin$2 = {
  install: function install(Vue) {
    registerComponents(Vue, components$2);
  }
};

vueUse(VuePlugin$2);

// Determine if an element is an HTML Element
var isElement = function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
};

// Determine if an HTML element is visible - Faster than CSS check
var isVisible = function isVisible(el) {
  return isElement(el) && document.body.contains(el) && el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().width > 0;
};

// Determine if an element is disabled
var isDisabled = function isDisabled(el) {
  return !isElement(el) || el.disabled || el.classList.contains('disabled') || Boolean(el.getAttribute('disabled'));
};

// Cause/wait-for an element to reflow it's content (adjusting it's height/width)
var reflow = function reflow(el) {
  // requsting an elements offsetHight will trigger a reflow of the element content
  return isElement(el) && el.offsetHeight;
};

// Select all elements matching selector. Returns [] if none found
var selectAll = function selectAll(selector, root) {
  if (!isElement(root)) {
    root = document;
  }
  return from(root.querySelectorAll(selector));
};

// Select a single element, returns null if not found
var select = function select(selector, root) {
  if (!isElement(root)) {
    root = document;
  }
  return root.querySelector(selector) || null;
};

// Determine if an element matches a selector
var matches = function matches(el, selector) {
  if (!isElement(el)) {
    return false;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  // Prefer native implementations over polyfill function
  var proto = Element.prototype;
  var Matches = proto.matches || proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector ||
  /* istanbul ignore next */
  function (sel) {
    var element = this;
    var m = selectAll(sel, element.document || element.ownerDocument);
    var i = m.length;
    // eslint-disable-next-line no-empty
    while (--i >= 0 && m.item(i) !== element) {}
    return i > -1;
  };

  return Matches.call(el, selector);
};

// Finds closest element matching selector. Returns null if not found
var closest = function closest(selector, root) {
  if (!isElement(root)) {
    return null;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  // Since we dont support IE < 10, we can use the "Matches" version of the polyfill for speed
  // Prefer native implementation over polyfill function
  var Closest = Element.prototype.closest ||
  /* istanbul ignore next */
  function (sel) {
    var element = this;
    if (!document.documentElement.contains(element)) {
      return null;
    }
    do {
      // Use our "patched" matches function
      if (matches(element, sel)) {
        return element;
      }
      element = element.parentElement;
    } while (element !== null);
    return null;
  };

  var el = Closest.call(root, selector);
  // Emulate jQuery closest and return null if match is the passed in element (root)
  return el === root ? null : el;
};

// Get an element given an ID
var getById = function getById(id) {
  return document.getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
};

// Add a class to an element
var addClass = function addClass(el, className) {
  if (className && isElement(el)) {
    el.classList.add(className);
  }
};

// Remove a class from an element
var removeClass = function removeClass(el, className) {
  if (className && isElement(el)) {
    el.classList.remove(className);
  }
};

// Test if an element has a class
var hasClass = function hasClass(el, className) {
  if (className && isElement(el)) {
    return el.classList.contains(className);
  }
  return false;
};

// Set an attribute on an element
var setAttr = function setAttr(el, attr, value) {
  if (attr && isElement(el)) {
    el.setAttribute(attr, value);
  }
};

// Remove an attribute from an element
var removeAttr = function removeAttr(el, attr) {
  if (attr && isElement(el)) {
    el.removeAttribute(attr);
  }
};

// Get an attribute value from an element (returns null if not found)
var getAttr = function getAttr(el, attr) {
  if (attr && isElement(el)) {
    return el.getAttribute(attr);
  }
  return null;
};

// Determine if an attribute exists on an element (returns true or false, or null if element not found)
var hasAttr = function hasAttr(el, attr) {
  if (attr && isElement(el)) {
    return el.hasAttribute(attr);
  }
  return null;
};

// Return the Bounding Client Rec of an element. Retruns null if not an element
var getBCR = function getBCR(el) {
  return isElement(el) ? el.getBoundingClientRect() : null;
};

// Get computed style object for an element
var getCS = function getCS(el) {
  return isElement(el) ? window.getComputedStyle(el) : {};
};

// Return an element's offset wrt document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset
var offset = function offset(el) {
  if (isElement(el)) {
    if (!el.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    var bcr = getBCR(el);
    var win = el.ownerDocument.defaultView;
    return {
      top: bcr.top + win.pageYOffset,
      left: bcr.left + win.pageXOffset
    };
  }
};

// Return an element's offset wrt to it's offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position
var position = function position(el) {
  if (!isElement(el)) {
    return;
  }
  var parentOffset = { top: 0, left: 0 };
  var offsetSelf = void 0;
  var offsetParent = void 0;
  if (getCS(el).position === 'fixed') {
    offsetSelf = getBCR(el);
  } else {
    offsetSelf = offset(el);
    var doc = el.ownerDocument;
    offsetParent = el.offsetParent || doc.documentElement;
    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && getCS(offsetParent).position === 'static') {
      offsetParent = offsetParent.parentNode;
    }
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = offset(offsetParent);
      parentOffset.top += parseFloat(getCS(offsetParent).borderTopWidth);
      parentOffset.left += parseFloat(getCS(offsetParent).borderLeftWidth);
    }
  }
  return {
    top: offsetSelf.top - parentOffset.top - parseFloat(getCS(el).marginTop),
    left: offsetSelf.left - parentOffset.left - parseFloat(getCS(el).marginLeft)
  };
};

// Attach an event listener to an element
var eventOn = function eventOn(el, evtName, handler) {
  if (el && el.addEventListener) {
    el.addEventListener(evtName, handler);
  }
};

// Remove an event listener from an element
var eventOff = function eventOff(el, evtName, handler) {
  if (el && el.removeEventListener) {
    el.removeEventListener(evtName, handler);
  }
};

var btnProps = {
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: null
  },
  variant: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  pressed: {
    // tri-state prop: true, false or null
    // => on, off, not a toggle
    type: Boolean,
    default: null
  }
};

var linkProps$1 = propsFactory();
delete linkProps$1.href.default;
delete linkProps$1.to.default;
var linkPropKeys = keys(linkProps$1);

var props$6 = assign(linkProps$1, btnProps);

function handleFocus(evt) {
  if (evt.type === 'focusin') {
    addClass(evt.target, 'focus');
  } else if (evt.type === 'focusout') {
    removeClass(evt.target, 'focus');
  }
}

var bBtn = {
  functional: true,
  props: props$6,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners,
        children = _ref.children;

    var isLink = Boolean(props.href || props.to);
    var isToggle = typeof props.pressed === 'boolean';
    var on = {
      click: function click(e) {
        if (props.disabled && e instanceof Event) {
          e.stopPropagation();
          e.preventDefault();
        } else if (isToggle) {
          // Concat will normalize the value to an array
          // without double wrapping an array value in an array.
          concat(listeners['update:pressed']).forEach(function (fn) {
            if (typeof fn === 'function') {
              fn(!props.pressed);
            }
          });
        }
      }
    };

    if (isToggle) {
      on.focusin = handleFocus;
      on.focusout = handleFocus;
    }

    var componentData = {
      staticClass: 'btn',
      class: [props.variant ? 'btn-' + props.variant : 'btn-secondary', (_ref2 = {}, defineProperty(_ref2, 'btn-' + props.size, Boolean(props.size)), defineProperty(_ref2, 'btn-block', props.block), defineProperty(_ref2, 'disabled', props.disabled), defineProperty(_ref2, 'active', props.pressed), _ref2)],
      props: isLink ? pluckProps(linkPropKeys, props) : null,
      attrs: {
        type: isLink ? null : props.type,
        disabled: isLink ? null : props.disabled,
        // Data attribute not used for js logic,
        // but only for BS4 style selectors.
        'data-toggle': isToggle ? 'button' : null,
        'aria-pressed': isToggle ? String(props.pressed) : null,
        // Tab index is used when the component becomes a link.
        // Links are tabable, but don't allow disabled,
        // so we mimic that functionality by disabling tabbing.
        tabindex: props.disabled && isLink ? '-1' : data.attrs ? data.attrs['tabindex'] : null
      },
      on: on
    };

    return h(isLink ? bLink : 'button', mergeData(data, componentData), children);
  }
};

var components$3 = {
  bButton: bBtn,
  bBtn: bBtn,
  bButtonClose: bBtnClose,
  bBtnClose: bBtnClose
};

var VuePlugin$3 = {
  install: function install(Vue) {
    registerComponents(Vue, components$3);
  }
};

vueUse(VuePlugin$3);

var props$7 = {
  vertical: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: null,
    validator: function validator(size) {
      return arrayIncludes(['sm', '', 'lg'], size);
    }
  },
  tag: {
    type: String,
    default: 'div'
  },
  ariaRole: {
    type: String,
    default: 'group'
  }
};

var bButtonGroup = {
  functional: true,
  props: props$7,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      class: defineProperty({
        'btn-group': !props.vertical,
        'btn-group-vertical': props.vertical
      }, 'btn-group-' + props.size, Boolean(props.size)),
      attrs: { 'role': props.ariaRole }
    }), children);
  }
};

var components$4 = {
  bButtonGroup: bButtonGroup,
  bBtnGroup: bButtonGroup
};

var VuePlugin$4 = {
  install: function install(Vue) {
    registerComponents(Vue, components$4);
  }
};

vueUse(VuePlugin$4);

/*
 * Key Codes (events)
 */

var KeyCodes = {
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PAGEUP: 33,
  PAGEDOWN: 34,
  HOME: 36,
  END: 35
};

var ITEM_SELECTOR = ['.btn:not(.disabled):not([disabled]):not(.dropdown-item)', '.form-control:not(.disabled):not([disabled])', 'select:not(.disabled):not([disabled])', 'input[type="checkbox"]:not(.disabled)', 'input[type="radio"]:not(.disabled)'].join(',');

var bButtonToolbar = {
  render: function render(h) {
    return h('div', {
      class: this.classObject,
      attrs: {
        role: 'toolbar',
        tabindex: this.keyNav ? '0' : null
      },
      on: {
        focusin: this.onFocusin,
        keydown: this.onKeydown
      }
    }, [this.$slots.default]);
  },

  computed: {
    classObject: function classObject() {
      return ['btn-toolbar', this.justify && !this.vertical ? 'justify-content-between' : ''];
    }
  },
  props: {
    justify: {
      type: Boolean,
      default: false
    },
    keyNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onFocusin: function onFocusin(evt) {
      if (evt.target === this.$el) {
        evt.preventDefault();
        evt.stopPropagation();
        this.focusFirst(evt);
      }
    },
    onKeydown: function onKeydown(evt) {
      if (!this.keyNav) {
        return;
      }
      var key = evt.keyCode;
      var shift = evt.shiftKey;
      if (key === KeyCodes.UP || key === KeyCodes.LEFT) {
        evt.preventDefault();
        evt.stopPropagation();
        if (shift) {
          this.focusFirst(evt);
        } else {
          this.focusNext(evt, true);
        }
      } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT) {
        evt.preventDefault();
        evt.stopPropagation();
        if (shift) {
          this.focusLast(evt);
        } else {
          this.focusNext(evt, false);
        }
      }
    },
    setItemFocus: function setItemFocus(item) {
      this.$nextTick(function () {
        item.focus();
      });
    },
    focusNext: function focusNext(evt, prev) {
      var items = this.getItems();
      if (items.length < 1) {
        return;
      }
      var index = items.indexOf(evt.target);
      if (prev && index > 0) {
        index--;
      } else if (!prev && index < items.length - 1) {
        index++;
      }
      if (index < 0) {
        index = 0;
      }
      this.setItemFocus(items[index]);
    },
    focusFirst: function focusFirst(evt) {
      var items = this.getItems();
      if (items.length > 0) {
        this.setItemFocus(items[0]);
      }
    },
    focusLast: function focusLast(evt) {
      var items = this.getItems();
      if (items.length > 0) {
        this.setItemFocus([items.length - 1]);
      }
    },
    getItems: function getItems() {
      var items = selectAll(ITEM_SELECTOR, this.$el);
      items.forEach(function (item) {
        // Ensure tabfocus is -1 on any new elements
        item.tabIndex = -1;
      });
      return items.filter(function (el) {
        return isVisible(el);
      });
    }
  },
  mounted: function mounted() {
    if (this.keyNav) {
      // Pre-set the tabindexes if the markup does not include tabindex="-1" on the toolbar items
      this.getItems();
    }
  }
};

var components$5 = {
  bButtonToolbar: bButtonToolbar,
  bBtnToolbar: bButtonToolbar
};

var VuePlugin$5 = {
  install: function install(Vue) {
    registerComponents(Vue, components$5);
  }
};

vueUse(VuePlugin$5);

var props$8 = {
  tag: {
    type: String,
    default: 'div'
  }
};

var InputGroupText = {
  props: props$8,
  functional: true,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'input-group-text'
    }), children);
  }
};

var propsFactory$1 = function propsFactory(append) {
  return {
    id: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'div'
    },
    append: {
      type: Boolean,
      default: append
    },
    isText: {
      type: Boolean,
      default: false
    }
  };
};

var InputGroupAddon = {
  functional: true,
  props: propsFactory$1(false),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'input-group-' + (props.append ? 'append' : 'prepend'),
      attrs: {
        id: props.id
      }
    }), props.isText ? [h(InputGroupText, children)] : children);
  }
};

var InputGroupPrepend = {
  functional: true,
  props: propsFactory$1(false),
  render: InputGroupAddon.render
};

var InputGroupAppend = {
  functional: true,
  props: propsFactory$1(true),
  render: InputGroupAddon.render
};

var props$9 = {
  id: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  prepend: {
    type: String,
    default: null
  },
  append: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  }
};

var bInputGroup = {
  functional: true,
  props: props$9,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    var $slots = slots();

    var childNodes = [];

    // Prepend prop
    if (props.prepend) {
      childNodes.push(h(InputGroupPrepend, [h(InputGroupText, { domProps: { innerHTML: props.prepend } })]));
    }

    // Prepend slot
    if ($slots.prepend) {
      childNodes.push(h(InputGroupPrepend, $slots.prepend));
    }

    // Default slot
    childNodes.push($slots.default);

    // Append prop
    if (props.append) {
      childNodes.push(h(InputGroupAppend, [h(InputGroupText, { domProps: { innerHTML: props.append } })]));
    }

    // Append slot
    if ($slots.append) {
      childNodes.push(h(InputGroupAppend, $slots.append));
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'input-group',
      class: defineProperty({}, 'input-group-' + props.size, Boolean(props.size)),
      attrs: {
        id: props.id || null,
        role: 'group'
      }
    }), childNodes);
  }
};

var components$6 = {
  bInputGroup: bInputGroup,
  bInputGroupAddon: InputGroupAddon,
  bInputGroupPrepend: InputGroupPrepend,
  bInputGroupAppend: InputGroupAppend,
  bInputGroupText: InputGroupText
};

var VuePlugin$6 = {
  install: function install(Vue) {
    registerComponents(Vue, components$6);
  }
};

vueUse(VuePlugin$6);

/**
 * @param {string} str
 */
function upperFirst(str) {
  if (typeof str !== 'string') {
    str = String(str);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @param {string} prefix
 * @param {string} value
 */
function prefixPropName(prefix, value) {
  return prefix + upperFirst(value);
}

/**
 * @param {string} str
 */
function lowerFirst(str) {
  if (typeof str !== 'string') {
    str = String(str);
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * @param {string} prefix
 * @param {string} value
 */
function unPrefixPropName(prefix, value) {
  return lowerFirst(value.replace(prefix, ''));
}

/**
 * @param {[]|{}} props
 * @param {Function} transformFn
 */
function copyProps(props) {
  var transformFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

  if (isArray(props)) {
    return props.map(transformFn);
  }
  // Props as an object.
  var copied = {};

  for (var prop in props) {
    if (props.hasOwnProperty(prop)) {
      if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
        copied[transformFn(prop)] = assign({}, props[prop]);
      } else {
        copied[transformFn(prop)] = props[prop];
      }
    }
  }

  return copied;
}

var cardMixin = {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    bgVariant: {
      type: String,
      default: null
    },
    borderVariant: {
      type: String,
      default: null
    },
    textVariant: {
      type: String,
      default: null
    }
  }
};

var props$a = assign({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'body')), {
  bodyClass: {
    type: [String, Object, Array],
    default: null
  },
  title: {
    type: String,
    default: null
  },
  titleTag: {
    type: String,
    default: 'h4'
  },
  subTitle: {
    type: String,
    default: null
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  overlay: {
    type: Boolean,
    default: false
  }
});

var CardBody = {
  functional: true,
  props: props$a,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    var cardBodyChildren = [];
    if (props.title) {
      cardBodyChildren.push(h(props.titleTag, {
        staticClass: 'card-title',
        domProps: { innerHTML: props.title }
      }));
    }
    if (props.subTitle) {
      cardBodyChildren.push(h(props.subTitleTag, {
        staticClass: 'card-subtitle mb-2 text-muted',
        domProps: { innerHTML: props.subTitle }
      }));
    }
    cardBodyChildren.push(slots().default);

    return h(props.bodyTag, mergeData(data, {
      staticClass: 'card-body',
      class: [(_ref2 = {
        'card-img-overlay': props.overlay
      }, defineProperty(_ref2, 'bg-' + props.bodyBgVariant, Boolean(props.bodyBgVariant)), defineProperty(_ref2, 'border-' + props.bodyBorderVariant, Boolean(props.bodyBorderVariant)), defineProperty(_ref2, 'text-' + props.bodyTextVariant, Boolean(props.bodyTextVariant)), _ref2), props.bodyClass || {}]
    }), cardBodyChildren);
  }
};

var props$b = assign({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'header')), {
  header: {
    type: String,
    default: null
  },
  headerClass: {
    type: [String, Object, Array],
    default: null
  }
});

var CardHeader = {
  functional: true,
  props: props$b,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        children = _ref.children;

    return h(props.headerTag, mergeData(data, {
      staticClass: 'card-header',
      class: [props.headerClass, (_ref2 = {}, defineProperty(_ref2, 'bg-' + props.headerBgVariant, Boolean(props.headerBgVariant)), defineProperty(_ref2, 'border-' + props.headerBorderVariant, Boolean(props.headerBorderVariant)), defineProperty(_ref2, 'text-' + props.headerTextVariant, Boolean(props.headerTextVariant)), _ref2)]
    }), children || [h('div', { domProps: { innerHTML: props.header } })]);
  }
};

var props$c = assign({}, copyProps(cardMixin.props, prefixPropName.bind(null, 'footer')), {
  footer: {
    type: String,
    default: null
  },
  footerClass: {
    type: [String, Object, Array],
    default: null
  }
});

var CardFooter = {
  functional: true,
  props: props$c,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        children = _ref.children;

    return h(props.footerTag, mergeData(data, {
      staticClass: 'card-footer',
      class: [props.footerClass, (_ref2 = {}, defineProperty(_ref2, 'bg-' + props.footerBgVariant, Boolean(props.footerBgVariant)), defineProperty(_ref2, 'border-' + props.footerBorderVariant, Boolean(props.footerBorderVariant)), defineProperty(_ref2, 'text-' + props.footerTextVariant, Boolean(props.footerTextVariant)), _ref2)]
    }), children || [h('div', { domProps: { innerHTML: props.footer } })]);
  }
};

var props$d = {
  src: {
    type: String,
    default: null,
    required: true
  },
  alt: {
    type: String,
    default: null
  },
  top: {
    type: Boolean,
    default: false
  },
  bottom: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: false
  }
};

var CardImg = {
  functional: true,
  props: props$d,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    var staticClass = 'card-img';
    if (props.top) {
      staticClass += '-top';
    } else if (props.bottom) {
      staticClass += '-bottom';
    }

    return h('img', mergeData(data, {
      staticClass: staticClass,
      class: { 'img-fluid': props.fluid },
      attrs: { src: props.src, alt: props.alt }
    }));
  }
};

var cardImgProps = copyProps(props$d, prefixPropName.bind(null, 'img'));
cardImgProps.imgSrc.required = false;

var props$e = assign({}, props$a, props$b, props$c, cardImgProps, copyProps(cardMixin.props), {
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  }
});

var bCard = {
  functional: true,
  props: props$e,
  render: function render(h, _ref) {
    var _class;

    var props$$1 = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        children = _ref.children;

    // The order of the conditionals matter.
    // We are building the component markup in order.
    var childNodes = [];
    var $slots = slots();
    var img = props$$1.imgSrc ? h(CardImg, {
      props: pluckProps(cardImgProps, props$$1, unPrefixPropName.bind(null, 'img'))
    }) : null;

    if (img) {
      // Above the header placement.
      if (props$$1.imgTop || !props$$1.imgBottom) {
        childNodes.push(img);
      }
    }
    if (props$$1.header || $slots.header) {
      childNodes.push(h(CardHeader, { props: pluckProps(props$b, props$$1) }, $slots.header));
    }
    if (props$$1.noBody) {
      childNodes.push($slots.default);
    } else {
      childNodes.push(h(CardBody, { props: pluckProps(props$a, props$$1) }, $slots.default));
    }
    if (props$$1.footer || $slots.footer) {
      childNodes.push(h(CardFooter, { props: pluckProps(props$c, props$$1) }, $slots.footer));
    }
    if (img && props$$1.imgBottom) {
      // Below the footer placement.
      childNodes.push(img);
    }

    return h(props$$1.tag, mergeData(data, {
      staticClass: 'card',
      class: (_class = {}, defineProperty(_class, 'text-' + props$$1.align, Boolean(props$$1.align)), defineProperty(_class, 'bg-' + props$$1.bgVariant, Boolean(props$$1.bgVariant)), defineProperty(_class, 'border-' + props$$1.borderVariant, Boolean(props$$1.borderVariant)), defineProperty(_class, 'text-' + props$$1.textVariant, Boolean(props$$1.textVariant)), _class)
    }), childNodes);
  }
};

var props$f = {
  tag: {
    type: String,
    default: 'div'
  },
  deck: {
    type: Boolean,
    default: false
  },
  columns: {
    type: Boolean,
    default: false
  }
};

var bCardGroup = {
  functional: true,
  props: props$f,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var staticClass = 'card-group';
    if (props.columns) {
      staticClass = 'card-columns';
    }
    if (props.deck) {
      staticClass = 'card-deck';
    }

    return h(props.tag, mergeData(data, { staticClass: staticClass }), children);
  }
};

var components$7 = {
  bCard: bCard,
  bCardHeader: CardHeader,
  bCardBody: CardBody,
  bCardFooter: CardFooter,
  bCardImg: CardImg,
  bCardGroup: bCardGroup
};

var VuePlugin$7 = {
  install: function install(Vue) {
    registerComponents(Vue, components$7);
  }
};

vueUse(VuePlugin$7);

/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [opts={childList: true, subtree: true}] observe options
 * @see http://stackoverflow.com/questions/3219758
 */
function observeDOM(el, callback, opts) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  var eventListenerSupported = window.addEventListener;

  // Handle case where we might be passed a vue instance
  el = el ? el.$el || el : null;
  /* istanbul ignore next: dificult to test in JSDOM */
  if (!isElement(el)) {
    // We can't observe somthing that isn't an element
    return null;
  }

  var obs = null;

  /* istanbul ignore next: dificult to test in JSDOM */
  if (MutationObserver) {
    // Define a new observer
    obs = new MutationObserver(function (mutations) {
      var changed = false;
      // A Mutation can contain several change records, so we loop through them to see what has changed.
      // We break out of the loop early if any "significant" change has been detected
      for (var i = 0; i < mutations.length && !changed; i++) {
        // The muttion record
        var mutation = mutations[i];
        // Mutation Type
        var type = mutation.type;
        // DOM Node (could be any DOM Node type - HTMLElement, Text, comment, etc)
        var target = mutation.target;
        if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
          // We ignore nodes that are not TEXt (i.e. comments, etc) as they don't change layout
          changed = true;
        } else if (type === 'attributes') {
          changed = true;
        } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          // This includes HTMLElement and Text Nodes being added/removed/re-arranged
          changed = true;
        }
      }
      if (changed) {
        // We only call the callback if a change that could affect layout/size truely happened.
        callback();
      }
    });

    // Have the observer observe foo for changes in children, etc
    obs.observe(el, assign({ childList: true, subtree: true }, opts));
  } else if (eventListenerSupported) {
    // Legacy interface. most likely not used in modern browsers
    el.addEventListener('DOMNodeInserted', callback, false);
    el.addEventListener('DOMNodeRemoved', callback, false);
  }

  // We return a reference to the observer so that obs.disconnect() can be called if necessary
  // To reduce overhead when the root element is hiiden
  return obs;
}

/*
 * SSR Safe Client Side ID attribute generation
 *
 */

var idMixin = {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  methods: {
    safeId: function safeId() {
      var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var id = this.id || this.localId_ || null;
      if (!id) {
        return null;
      }
      suffix = String(suffix).replace(/\s+/g, '_');
      return suffix ? id + '_' + suffix : id;
    }
  },
  computed: {
    localId_: function localId_() {
      if (!this.$isServer && !this.id && typeof this._uid !== 'undefined') {
        return '__BVID__' + this._uid;
      }
    }
  }
};

// Slide directional classes
var DIRECTION = {
  next: {
    dirClass: 'carousel-item-left',
    overlayClass: 'carousel-item-next'
  },
  prev: {
    dirClass: 'carousel-item-right',
    overlayClass: 'carousel-item-prev'
  }

  // Fallback Transition duration (with a little buffer) in ms
};var TRANS_DURATION = 600 + 50;

// Transition Event names
var TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend'

  // Return the browser specific transitionEnd event name
};function getTransisionEndEvent(el) {
  for (var name in TransitionEndEvents) {
    if (el.style[name] !== undefined) {
      return TransitionEndEvents[name];
    }
  }
  // fallback
  return null;
}

var bCarousel = {
  mixins: [idMixin],
  render: function render(h) {
    var _this = this;

    // Wrapper for slides
    var inner = h('div', {
      ref: 'inner',
      class: ['carousel-inner'],
      attrs: {
        id: this.safeId('__BV_inner_'),
        role: 'list'
      }
    }, [this.$slots.default]);

    // Prev and Next Controls
    var controls = h(false);
    if (this.controls) {
      controls = [h('a', {
        class: ['carousel-control-prev'],
        attrs: { href: '#', role: 'button', 'aria-controls': this.safeId('__BV_inner_') },
        on: {
          click: function click(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            _this.prev();
          },
          keydown: function keydown(evt) {
            var keyCode = evt.keyCode;
            if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
              evt.preventDefault();
              evt.stopPropagation();
              _this.prev();
            }
          }
        }
      }, [h('span', { class: ['carousel-control-prev-icon'], attrs: { 'aria-hidden': 'true' } }), h('span', { class: ['sr-only'] }, [this.labelPrev])]), h('a', {
        class: ['carousel-control-next'],
        attrs: { href: '#', role: 'button', 'aria-controls': this.safeId('__BV_inner_') },
        on: {
          click: function click(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            _this.next();
          },
          keydown: function keydown(evt) {
            var keyCode = evt.keyCode;
            if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
              evt.preventDefault();
              evt.stopPropagation();
              _this.next();
            }
          }
        }
      }, [h('span', { class: ['carousel-control-next-icon'], attrs: { 'aria-hidden': 'true' } }), h('span', { class: ['sr-only'] }, [this.labelNext])])];
    }

    // Indicators
    var indicators = h('ol', {
      class: ['carousel-indicators'],
      directives: [{ name: 'show', rawName: 'v-show', value: this.indicators, expression: 'indicators' }],
      attrs: {
        id: this.safeId('__BV_indicators_'),
        'aria-hidden': this.indicators ? 'false' : 'true',
        'aria-label': this.labelIndicators,
        'aria-owns': this.safeId('__BV_inner_')
      }
    }, this.slides.map(function (slide, n) {
      return h('li', {
        key: 'slide_' + n,
        class: { active: n === _this.index },
        attrs: {
          role: 'button',
          id: _this.safeId('__BV_indicator_' + (n + 1) + '_'),
          tabindex: _this.indicators ? '0' : '-1',
          'aria-current': n === _this.index ? 'true' : 'false',
          'aria-label': _this.labelGotoSlide + ' ' + (n + 1),
          'aria-describedby': _this.slides[n].id || null,
          'aria-controls': _this.safeId('__BV_inner_')
        },
        on: {
          click: function click(evt) {
            _this.setSlide(n);
          },
          keydown: function keydown(evt) {
            var keyCode = evt.keyCode;
            if (keyCode === KeyCodes.SPACE || keyCode === KeyCodes.ENTER) {
              evt.preventDefault();
              evt.stopPropagation();
              _this.setSlide(n);
            }
          }
        }
      });
    }));

    // Return the carousel
    return h('div', {
      class: ['carousel', 'slide'],
      style: { background: this.background },
      attrs: {
        role: 'region',
        id: this.safeId(),
        'aria-busy': this.isSliding ? 'true' : 'false'
      },
      on: {
        mouseenter: this.pause,
        mouseleave: this.restart,
        focusin: this.pause,
        focusout: this.restart,
        keydown: function keydown(evt) {
          var keyCode = evt.keyCode;
          if (keyCode === KeyCodes.LEFT || keyCode === KeyCodes.RIGHT) {
            evt.preventDefault();
            evt.stopPropagation();
            _this[keyCode === KeyCodes.LEFT ? 'prev' : 'next']();
          }
        }
      }
    }, [inner, controls, indicators]);
  },
  data: function data() {
    return {
      index: this.value || 0,
      isSliding: false,
      intervalId: null,
      transitionEndEvent: null,
      slides: [],
      direction: null
    };
  },

  props: {
    labelPrev: {
      type: String,
      default: 'Previous Slide'
    },
    labelNext: {
      type: String,
      default: 'Next Slide'
    },
    labelGotoSlide: {
      type: String,
      default: 'Goto Slide'
    },
    labelIndicators: {
      type: String,
      default: 'Select a slide to display'
    },
    interval: {
      type: Number,
      default: 5000
    },
    indicators: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false
    },
    imgWidth: {
      // Sniffed by carousel-slide
      type: [Number, String]
    },
    imgHeight: {
      // Sniffed by carousel-slide
      type: [Number, String]
    },
    background: {
      type: String
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isCycling: function isCycling() {
      return Boolean(this.intervalId);
    }
  },
  methods: {
    // Set slide
    setSlide: function setSlide(slide) {
      var _this2 = this;

      // Don't animate when page is not visible
      if (typeof document !== 'undefined' && document.visibilityState && document.hidden) {
        return;
      }
      var len = this.slides.length;
      // Don't do anything if nothing to slide to
      if (len === 0) {
        return;
      }
      // Don't change slide while transitioning, wait until transition is done
      if (this.isSliding) {
        // Schedule slide after sliding complete
        this.$once('sliding-end', function () {
          return _this2.setSlide(slide);
        });
        return;
      }
      // Make sure we have an integer (you never know!)
      slide = Math.floor(slide);
      // Set new slide index. Wrap around if necessary
      this.index = slide >= len ? 0 : slide >= 0 ? slide : len - 1;
    },

    // Previous slide
    prev: function prev() {
      this.direction = 'prev';
      this.setSlide(this.index - 1);
    },

    // Next slide
    next: function next() {
      this.direction = 'next';
      this.setSlide(this.index + 1);
    },

    // Pause auto rotation
    pause: function pause() {
      if (this.isCycling) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        if (this.slides[this.index]) {
          // Make current slide focusable for screen readers
          this.slides[this.index].tabIndex = 0;
        }
      }
    },

    // Start auto rotate slides
    start: function start() {
      var _this3 = this;

      // Don't start if no interval, or if we are already running
      if (!this.interval || this.isCycling) {
        return;
      }
      this.slides.forEach(function (slide) {
        slide.tabIndex = -1;
      });
      this.intervalId = setInterval(function () {
        _this3.next();
      }, Math.max(1000, this.interval));
    },

    // Re-Start auto rotate slides when focus/hover leaves the carousel
    restart: function restart(evt) {
      if (!this.$el.contains(document.activeElement)) {
        this.start();
      }
    },

    // Update slide list
    updateSlides: function updateSlides() {
      this.pause();
      // Get all slides as DOM elements
      this.slides = selectAll('.carousel-item', this.$refs.inner);
      var numSlides = this.slides.length;
      // Keep slide number in range
      var index = Math.max(0, Math.min(Math.floor(this.index), numSlides - 1));
      this.slides.forEach(function (slide, idx) {
        var n = idx + 1;
        if (idx === index) {
          addClass(slide, 'active');
        } else {
          removeClass(slide, 'active');
        }
        setAttr(slide, 'aria-current', idx === index ? 'true' : 'false');
        setAttr(slide, 'aria-posinset', String(n));
        setAttr(slide, 'aria-setsize', String(numSlides));
        slide.tabIndex = -1;
      });
      // Set slide as active
      this.setSlide(index);
      this.start();
    },
    calcDirection: function calcDirection() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var curIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var nextIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!direction) {
        return nextIndex > curIndex ? DIRECTION.next : DIRECTION.prev;
      }
      return DIRECTION[direction];
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSlide(newVal);
      }
    },
    interval: function interval(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      if (!newVal) {
        // Pausing slide show
        this.pause();
      } else {
        // Restarting or Changing interval
        this.pause();
        this.start();
      }
    },
    index: function index(val, oldVal) {
      var _this4 = this;

      if (val === oldVal || this.isSliding) {
        return;
      }
      // Determine sliding direction
      var direction = this.calcDirection(this.direction, oldVal, val);
      // Determine current and next slides
      var currentSlide = this.slides[oldVal];
      var nextSlide = this.slides[val];
      // Don't do anything if there aren't any slides to slide to
      if (!currentSlide || !nextSlide) {
        return;
      }
      // Start animating
      this.isSliding = true;
      this.$emit('sliding-start', val);
      // Update v-model
      this.$emit('input', this.index);
      nextSlide.classList.add(direction.overlayClass);
      // Trigger a reflow of next slide
      reflow(nextSlide);
      addClass(currentSlide, direction.dirClass);
      addClass(nextSlide, direction.dirClass);
      // Transition End handler
      var called = false;
      /* istanbul ignore next: dificult to test */
      var onceTransEnd = function onceTransEnd(evt) {
        if (called) {
          return;
        }
        called = true;
        if (_this4.transitionEndEvent) {
          var events = _this4.transitionEndEvent.split(/\s+/);
          events.forEach(function (event) {
            eventOff(currentSlide, event, onceTransEnd);
          });
        }
        _this4._animationTimeout = null;
        removeClass(nextSlide, direction.dirClass);
        removeClass(nextSlide, direction.overlayClass);
        addClass(nextSlide, 'active');
        removeClass(currentSlide, 'active');
        removeClass(currentSlide, direction.dirClass);
        removeClass(currentSlide, direction.overlayClass);
        setAttr(currentSlide, 'aria-current', 'false');
        setAttr(nextSlide, 'aria-current', 'true');
        setAttr(currentSlide, 'aria-hidden', 'true');
        setAttr(nextSlide, 'aria-hidden', 'false');
        currentSlide.tabIndex = -1;
        nextSlide.tabIndex = -1;
        if (!_this4.isCycling) {
          // Focus the next slide for screen readers if not in play mode
          nextSlide.tabIndex = 0;
          _this4.$nextTick(function () {
            nextSlide.focus();
          });
        }
        _this4.isSliding = false;
        _this4.direction = null;
        // Notify ourselves that we're done sliding (slid)
        _this4.$nextTick(function () {
          return _this4.$emit('sliding-end', val);
        });
      };
      // Clear transition classes after transition ends
      if (this.transitionEndEvent) {
        var events = this.transitionEndEvent.split(/\s+/);
        events.forEach(function (event) {
          eventOn(currentSlide, event, onceTransEnd);
        });
      }
      // Fallback to setTimeout
      this._animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION);
    }
  },
  created: function created() {
    // Create private non-reactive props
    this._animationTimeout = null;
  },
  mounted: function mounted() {
    // Cache current browser transitionend event name
    this.transitionEndEvent = getTransisionEndEvent(this.$el) || null;
    // Get all slides
    this.updateSlides();
    // Observe child changes so we can update slide list
    observeDOM(this.$refs.inner, this.updateSlides.bind(this), {
      subtree: false,
      childList: true,
      attributes: true,
      attributeFilter: ['id']
    });
  },

  /* istanbul ignore next: dificult to test */
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.intervalId);
    clearTimeout(this._animationTimeout);
    this.intervalId = null;
    this._animationTimeout = null;
  }
};

// Blank image with fill template
var BLANK_TEMPLATE = '<svg width="%{w}" height="%{h}" ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">' + '<rect width="100%" height="100%" style="fill:%{f};"></rect>' + '</svg>';

function makeBlankImgSrc(width, height, color) {
  var src = encodeURIComponent(BLANK_TEMPLATE.replace('%{w}', String(width)).replace('%{h}', String(height)).replace('%{f}', color));
  return 'data:image/svg+xml;charset=UTF-8,' + src;
}

var props$g = {
  src: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: false
  },
  fluidGrow: {
    // Gives fluid images class `w-100` to make them grow to fit container
    type: Boolean,
    default: false
  },
  rounded: {
    // rounded can be:
    //   false: no rounding of corners
    //   true: slightly rounded corners
    //   'top': top corners rounded
    //   'right': right corners rounded
    //   'bottom': bottom corners rounded
    //   'left': left corners rounded
    //   'circle': circle/oval
    //   '0': force rounding off
    type: [Boolean, String],
    default: false
  },
  thumbnail: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  blank: {
    type: Boolean,
    default: false
  },
  blankColor: {
    type: String,
    default: 'transparent'
  }
};

var bImg = {
  functional: true,
  props: props$g,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data;

    var src = props.src;
    var width = parseInt(props.width, 10) ? parseInt(props.width, 10) : null;
    var height = parseInt(props.height, 10) ? parseInt(props.height, 10) : null;
    var align = null;
    var block = props.block;
    if (props.blank) {
      if (!height && Boolean(width)) {
        height = width;
      } else if (!width && Boolean(height)) {
        width = height;
      }
      if (!width && !height) {
        width = 1;
        height = 1;
      }
      // Make a blank SVG image
      src = makeBlankImgSrc(width, height, props.blankColor || 'transparent');
    }
    if (props.left) {
      align = 'float-left';
    } else if (props.right) {
      align = 'float-right';
    } else if (props.center) {
      align = 'mx-auto';
      block = true;
    }
    return h('img', mergeData(data, {
      attrs: {
        'src': src,
        'alt': props.alt,
        'width': width ? String(width) : null,
        'height': height ? String(height) : null
      },
      class: (_class = {
        'img-thumbnail': props.thumbnail,
        'img-fluid': props.fluid || props.fluidGrow,
        'w-100': props.fluidGrow,
        'rounded': props.rounded === '' || props.rounded === true
      }, defineProperty(_class, 'rounded-' + props.rounded, typeof props.rounded === 'string' && props.rounded !== ''), defineProperty(_class, align, Boolean(align)), defineProperty(_class, 'd-block', block), _class)
    }));
  }
};

/**
 * Log a warning message to the console with bootstrap-vue formatting sugar.
 * @param {string} message
 */
/* istanbul ignore next */
function warn(message) {
  console.warn("[Bootstrap-Vue warn]: " + message);
}

var bCarouselSlide = {
  components: { bImg: bImg },
  mixins: [idMixin],
  render: function render(h) {
    var $slots = this.$slots;

    var img = $slots.img;
    if (!img && (this.imgSrc || this.imgBlank)) {
      img = h('b-img', {
        props: {
          fluidGrow: true,
          block: true,
          src: this.imgSrc,
          blank: this.imgBlank,
          blankColor: this.imgBlankColor,
          width: this.computedWidth,
          height: this.computedHeight,
          alt: this.imgAlt
        }
      });
    }

    var content = h(this.contentTag, { class: this.contentClasses }, [this.caption ? h(this.captionTag, { domProps: { innerHTML: this.caption } }) : h(false), this.text ? h(this.textTag, { domProps: { innerHTML: this.text } }) : h(false), $slots.default]);

    return h('div', {
      class: ['carousel-item'],
      style: { background: this.background },
      attrs: { id: this.safeId(), role: 'listitem' }
    }, [img, content]);
  },

  props: {
    imgSrc: {
      type: String,
      default: function _default() {
        if (this && this.src) {
          // Deprecate src
          warn("b-carousel-slide: prop 'src' has been deprecated. Use 'img-src' instead");
          return this.src;
        }
        return null;
      }
    },
    src: {
      // Deprecated: use img-src instead
      type: String
    },
    imgAlt: {
      type: String
    },
    imgWidth: {
      type: [Number, String]
    },
    imgHeight: {
      type: [Number, String]
    },
    imgBlank: {
      type: Boolean,
      default: false
    },
    imgBlankColor: {
      type: String,
      default: 'transparent'
    },
    contentVisibleUp: {
      type: String
    },
    contentTag: {
      type: String,
      default: 'div'
    },
    caption: {
      type: String
    },
    captionTag: {
      type: String,
      default: 'h3'
    },
    text: {
      type: String
    },
    textTag: {
      type: String,
      default: 'p'
    },
    background: {
      type: String
    }
  },
  computed: {
    contentClasses: function contentClasses() {
      return ['carousel-caption', this.contentVisibleUp ? 'd-none' : '', this.contentVisibleUp ? 'd-' + this.contentVisibleUp + '-block' : ''];
    },
    computedWidth: function computedWidth() {
      // Use local width, or try parent width
      return this.imgWidth || this.$parent.imgWidth;
    },
    computedHeight: function computedHeight() {
      // Use local height, or try parent height
      return this.imgHeight || this.$parent.imgHeight;
    }
  }
};

var components$8 = {
  bCarousel: bCarousel,
  bCarouselSlide: bCarouselSlide
};

var VuePlugin$8 = {
  install: function install(Vue) {
    registerComponents(Vue, components$8);
  }
};

vueUse(VuePlugin$8);

var props$h = {
  tag: {
    type: String,
    default: 'div'
  },
  fluid: {
    type: Boolean,
    default: false
  }
};

var Container = {
  functional: true,
  props: props$h,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      class: {
        'container': !props.fluid,
        'container-fluid': props.fluid
      }
    }), children);
  }
};

var COMMON_ALIGNMENT = ['start', 'end', 'center'];

var props$i = {
  tag: {
    type: String,
    default: 'div'
  },
  noGutters: {
    type: Boolean,
    default: false
  },
  alignV: {
    type: String,
    default: null,
    validator: function validator(str) {
      return arrayIncludes(COMMON_ALIGNMENT.concat(['baseline', 'stretch']), str);
    }
  },
  alignH: {
    type: String,
    default: null,
    validator: function validator(str) {
      return arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around']), str);
    }
  },
  alignContent: {
    type: String,
    default: null,
    validator: function validator(str) {
      return arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around', 'stretch']), str);
    }
  }
};

var bRow = {
  functional: true,
  props: props$i,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'row',
      class: (_class = {
        'no-gutters': props.noGutters
      }, defineProperty(_class, 'align-items-' + props.alignV, props.alignV), defineProperty(_class, 'justify-content-' + props.alignH, props.alignH), defineProperty(_class, 'align-content-' + props.alignContent, props.alignContent), _class)
    }), children);
  }
};

function memoize(fn) {
  var cache = create(null);

  return function memoizedFn() {
    var args = JSON.stringify(arguments);
    return cache[args] = cache[args] || fn.apply(null, arguments);
  };
}

/**
 * Suffix can be a falsey value so nothing is appended to string.
 * (helps when looping over props & some shouldn't change)
 * Use data last parameters to allow for currying.
 * @param {string} suffix
 * @param {string} str
 */
function suffixPropName(suffix, str) {
  return str + (suffix ? upperFirst(suffix) : '');
}

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  };
}

/**
 * Generates a prop object with a type of
 * [String, Number]
 */
function strNum() {
  return {
    type: [String, Number],
    default: null
  };
}

var computeBkPtClass = memoize(function computeBkPt(type, breakpoint, val) {
  var className = type;
  if (val === false || val === null || val === undefined) {
    return undefined;
  }
  if (breakpoint) {
    className += '-' + breakpoint;
  }
  // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm /> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.
  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  }
  // .order-md-6
  className += '-' + val;
  return className.toLowerCase();
});

var BREAKPOINTS = ['sm', 'md', 'lg', 'xl'];
// Supports classes like: .col-sm, .col-md-6, .col-lg-auto
var breakpointCol = BREAKPOINTS.reduce(
// eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[breakpoint] = boolStrNum(), propMap;
}, create(null));
// Supports classes like: .offset-md-1, .offset-lg-12
var breakpointOffset = BREAKPOINTS.reduce(
// eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[suffixPropName(breakpoint, 'offset')] = strNum(), propMap;
}, create(null));
// Supports classes like: .order-md-1, .order-lg-12
var breakpointOrder = BREAKPOINTS.reduce(
// eslint-disable-next-line no-sequences
function (propMap, breakpoint) {
  return propMap[suffixPropName(breakpoint, 'order')] = strNum(), propMap;
}, create(null));

// For loop doesn't need to check hasOwnProperty
// when using an object created from null
var breakpointPropMap = assign(create(null), {
  col: keys(breakpointCol),
  offset: keys(breakpointOffset),
  order: keys(breakpointOrder)
});

var props$j = assign({}, breakpointCol, breakpointOffset, breakpointOrder, {
  tag: {
    type: String,
    default: 'div'
  },
  // Generic flexbox .col
  col: {
    type: Boolean,
    default: false
  },
  // .col-[1-12]|auto
  cols: strNum(),
  // .offset-[1-12]
  offset: strNum(),
  // Flex ordering utility .order-[1-12]
  order: strNum(),
  alignSelf: {
    type: String,
    default: null,
    validator: function validator(str) {
      return arrayIncludes(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
    }
  }
});

/**
 * We need ".col" to default in when no other props are passed,
 * but always render when col=true.
 */
var bCol = {
  functional: true,
  props: props$j,
  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var classList = [];
    // Loop through `col`, `offset`, `order` breakpoint props
    for (var type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      var _keys = breakpointPropMap[type];
      for (var i = 0; i < _keys.length; i++) {
        // computeBkPt(col, colSm => Sm, value=[String, Number, Boolean])
        var c = computeBkPtClass(type, _keys[i].replace(type, ''), props[_keys[i]]);
        // If a class is returned, push it onto the array.
        if (c) {
          classList.push(c);
        }
      }
    }

    classList.push((_classList$push = {
      // Default to .col if no other classes generated nor `cols` specified.
      col: props.col || classList.length === 0 && !props.cols
    }, defineProperty(_classList$push, 'col-' + props.cols, props.cols), defineProperty(_classList$push, 'offset-' + props.offset, props.offset), defineProperty(_classList$push, 'order-' + props.order, props.order), defineProperty(_classList$push, 'align-self-' + props.alignSelf, props.alignSelf), _classList$push));

    return h(props.tag, mergeData(data, { class: classList }), children);
  }
};

var props$k = {
  tag: {
    type: String,
    default: 'div'
  }
};

var bFormRow = {
  functional: true,
  props: props$k,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'form-row'
    }), children);
  }
};

var components$9 = {
  bContainer: Container,
  bRow: bRow,
  bCol: bCol,
  bFormRow: bFormRow
};

var VuePlugin$9 = {
  install: function install(Vue) {
    registerComponents(Vue, components$9);
  }
};

vueUse(VuePlugin$9);

/**
 * Issue #569: collapse::toggle::state triggered too many times
 * @link https://github.com/bootstrap-vue/bootstrap-vue/issues/569
 */

var BVRL = '__BV_root_listeners__';

var listenOnRootMixin = {
  methods: {
    /**
         * Safely register event listeners on the root Vue node.
         * While Vue automatically removes listeners for individual components,
         * when a component registers a listener on root and is destroyed,
         * this orphans a callback because the node is gone,
         * but the root does not clear the callback.
         *
         * This adds a non-reactive prop to a vm on the fly
         * in order to avoid object observation and its performance costs
         * to something that needs no reactivity.
         * It should be highly unlikely there are any naming collisions.
         * @param {string} event
         * @param {function} callback
         * @chainable
         */
    listenOnRoot: function listenOnRoot(event, callback) {
      if (!this[BVRL] || !isArray(this[BVRL])) {
        this[BVRL] = [];
      }
      this[BVRL].push({ event: event, callback: callback });
      this.$root.$on(event, callback);
      return this;
    },


    /**
         * Convenience method for calling vm.$emit on vm.$root.
         * @param {string} event
         * @param {*} args
         * @chainable
         */
    emitOnRoot: function emitOnRoot(event) {
      var _$root;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_$root = this.$root).$emit.apply(_$root, [event].concat(toConsumableArray(args)));
      return this;
    }
  },

  beforeDestroy: function beforeDestroy() {
    if (this[BVRL] && isArray(this[BVRL])) {
      while (this[BVRL].length > 0) {
        // shift to process in order
        var _BVRL$shift = this[BVRL].shift(),
            event = _BVRL$shift.event,
            callback = _BVRL$shift.callback;

        this.$root.$off(event, callback);
      }
    }
  }
};

// Events we emit on $root
var EVENT_STATE = 'bv::collapse::state';
var EVENT_ACCORDION = 'bv::collapse::accordion';
// Events we listen to on $root
var EVENT_TOGGLE = 'bv::toggle::collapse';

var bCollapse = {
  mixins: [listenOnRootMixin],
  render: function render(h) {
    var content = h(this.tag, {
      class: this.classObject,
      directives: [{ name: 'show', value: this.show }],
      attrs: { id: this.id || null },
      on: { click: this.clickHandler }
    }, [this.$slots.default]);
    return h('transition', {
      props: {
        enterClass: '',
        enterActiveClass: 'collapsing',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: 'collapsing',
        leaveToClass: ''
      },
      on: {
        enter: this.onEnter,
        afterEnter: this.onAfterEnter,
        leave: this.onLeave,
        afterLeave: this.onAfterLeave
      }
    }, [content]);
  },
  data: function data() {
    return {
      show: this.visible,
      transitioning: false
    };
  },

  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isNav: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    visible: function visible(newVal) {
      if (newVal !== this.show) {
        this.show = newVal;
      }
    },
    show: function show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState();
      }
    }
  },
  computed: {
    classObject: function classObject() {
      return {
        'navbar-collapse': this.isNav,
        'collapse': !this.transitioning,
        'show': this.show && !this.transitioning
      };
    }
  },
  methods: {
    toggle: function toggle() {
      this.show = !this.show;
    },
    onEnter: function onEnter(el) {
      el.style.height = 0;
      reflow(el);
      el.style.height = el.scrollHeight + 'px';
      this.transitioning = true;
      // This should be moved out so we can add cancellable events
      this.$emit('show');
    },
    onAfterEnter: function onAfterEnter(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('shown');
    },
    onLeave: function onLeave(el) {
      el.style.height = 'auto';
      el.style.display = 'block';
      el.style.height = el.getBoundingClientRect().height + 'px';
      reflow(el);
      this.transitioning = true;
      el.style.height = 0;
      // This should be moved out so we can add cancellable events
      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('hidden');
    },
    emitState: function emitState() {
      this.$emit('input', this.show);
      // Let v-b-toggle know the state of this collapse
      this.$root.$emit(EVENT_STATE, this.id, this.show);
      if (this.accordion && this.show) {
        // Tell the other collapses in this accordion to close
        this.$root.$emit(EVENT_ACCORDION, this.id, this.accordion);
      }
    },
    clickHandler: function clickHandler(evt) {
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      var el = evt.target;
      if (!this.isNav || !el || getComputedStyle(this.$el).display !== 'block') {
        return;
      }
      if (hasClass(el, 'nav-link') || hasClass(el, 'dropdown-item')) {
        this.show = false;
      }
    },
    handleToggleEvt: function handleToggleEvt(target) {
      if (target !== this.id) {
        return;
      }
      this.toggle();
    },
    handleAccordionEvt: function handleAccordionEvt(openedId, accordion) {
      if (!this.accordion || accordion !== this.accordion) {
        return;
      }
      if (openedId === this.id) {
        // Open this collapse if not shown
        if (!this.show) {
          this.toggle();
        }
      } else {
        // Close this collapse if shown
        if (this.show) {
          this.toggle();
        }
      }
    },
    handleResize: function handleResize() {
      // Handler for orientation/resize to set collapsed state in nav/navbar
      this.show = getComputedStyle(this.$el).display === 'block';
    }
  },
  created: function created() {
    // Listen for toggle events to open/close us
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt);
    // Listen to otehr collapses for accordion events
    this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt);
  },
  mounted: function mounted() {
    if (this.isNav && typeof document !== 'undefined') {
      // Set up handlers
      window.addEventListener('resize', this.handleResize, false);
      window.addEventListener('orientationchange', this.handleResize, false);
      this.handleResize();
    }
    this.emitState();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isNav && typeof document !== 'undefined') {
      window.removeEventListener('resize', this.handleResize, false);
      window.removeEventListener('orientationchange', this.handleResize, false);
    }
  }
};

var allListenTypes = { hover: true, click: true, focus: true };

var BVBoundListeners = '__BV_boundEventListeners__';

var bindTargets = function bindTargets(vnode, binding, listenTypes, fn) {
  var targets = keys(binding.modifiers || {}).filter(function (t) {
    return !allListenTypes[t];
  });

  if (binding.value) {
    targets.push(binding.value);
  }

  var listener = function listener() {
    fn({ targets: targets, vnode: vnode });
  };

  keys(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      vnode.elm.addEventListener(type, listener);
      var boundListeners = vnode.elm[BVBoundListeners] || {};
      boundListeners[type] = boundListeners[type] || [];
      boundListeners[type].push(listener);
      vnode.elm[BVBoundListeners] = boundListeners;
    }
  });

  // Return the list of targets
  return targets;
};

var unbindTargets = function unbindTargets(vnode, binding, listenTypes) {
  keys(allListenTypes).forEach(function (type) {
    if (listenTypes[type] || binding.modifiers[type]) {
      var boundListeners = vnode.elm[BVBoundListeners] && vnode.elm[BVBoundListeners][type];
      if (boundListeners) {
        boundListeners.forEach(function (listener) {
          return vnode.elm.removeEventListener(type, listener);
        });
        delete vnode.elm[BVBoundListeners][type];
      }
    }
  });
};

// Are we client side?
var inBrowser = typeof window !== 'undefined';

// target listen types
var listenTypes = { click: true

  // Property key for handler storage
};var BVT = '__BV_toggle__';

// Emitted Control Event for collapse (emitted to collapse)
var EVENT_TOGGLE$1 = 'bv::toggle::collapse';

// Listen to Event for toggle state update (Emited by collapse)
var EVENT_STATE$1 = 'bv::collapse::state';

var bToggle = {
  bind: function bind(el, binding, vnode) {
    var targets = bindTargets(vnode, binding, listenTypes, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;

      targets.forEach(function (target) {
        vnode.context.$root.$emit(EVENT_TOGGLE$1, target);
      });
    });

    if (inBrowser && vnode.context && targets.length > 0) {
      // Add aria attributes to element
      setAttr(el, 'aria-controls', targets.join(' '));
      setAttr(el, 'aria-expanded', 'false');
      if (el.tagName !== 'BUTTON') {
        // If element is not a button, we add `role="button"` for accessibility
        setAttr(el, 'role', 'button');
      }

      // Toggle state hadnler, stored on element
      el[BVT] = function toggleDirectiveHandler(id, state) {
        if (targets.indexOf(id) !== -1) {
          // Set aria-expanded state
          setAttr(el, 'aria-expanded', state ? 'true' : 'false');
          // Set/Clear 'collapsed' class state
          if (state) {
            removeClass(el, 'collapsed');
          } else {
            addClass(el, 'collapsed');
          }
        }
      };

      // Listen for toggle state changes
      vnode.context.$root.$on(EVENT_STATE$1, el[BVT]);
    }
  },
  unbind: function unbind(el, binding, vnode) {
    if (el[BVT]) {
      // Remove our $root listener
      vnode.context.$root.$off(EVENT_STATE$1, el[BVT]);
      el[BVT] = null;
    }
  }
};

var directives = {
  bToggle: bToggle
};

var VuePlugin$a = {
  install: function install(Vue) {
    registerDirectives(Vue, directives);
  }
};

vueUse(VuePlugin$a);

var components$a = {
  bCollapse: bCollapse
};

var VuePlugin$b = {
  install: function install(Vue) {
    registerComponents(Vue, components$a);
    Vue.use(VuePlugin$a);
  }
};

vueUse(VuePlugin$b);

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.3
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck$1 = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty$2 = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && parent.nodeName === 'HTML') {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // Avoid blurry text by using full pixel integers.
  // For pixel-perfect positioning, top/bottom prefers rounded
  // values, while left/right prefers floored values.
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.round(popper.top),
    bottom: Math.round(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$2(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$2(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset$1(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty$2({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty$2({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty$2({}, side, reference[side]),
      end: defineProperty$2({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset$1,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck$1(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$1({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass$1(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var clickoutMixin = {
  mounted: function mounted() {
    if (typeof document !== 'undefined') {
      document.documentElement.addEventListener('click', this._clickOutListener);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof document !== 'undefined') {
      document.documentElement.removeEventListener('click', this._clickOutListener);
    }
  },

  methods: {
    _clickOutListener: function _clickOutListener(e) {
      if (!this.$el.contains(e.target)) {
        if (this.clickOutListener) {
          this.clickOutListener();
        }
      }
    }
  }
};

var BvEvent = function () {
  function BvEvent(type) {
    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, BvEvent);

    // Start by emulating native Event constructor.
    if (!type) {
      throw new TypeError('Failed to construct \'' + this.constructor.name + '\'. 1 argument required, ' + arguments.length + ' given.');
    }
    // Assign defaults first, the eventInit,
    // and the type last so it can't be overwritten.
    assign(this, BvEvent.defaults(), eventInit, { type: type });
    // Freeze some props as readonly, but leave them enumerable.
    defineProperties(this, {
      type: readonlyDescriptor(),
      cancelable: readonlyDescriptor(),
      nativeEvent: readonlyDescriptor(),
      target: readonlyDescriptor(),
      relatedTarget: readonlyDescriptor(),
      vueTarget: readonlyDescriptor()
    });
    // Create a private variable using closure scoping.
    var defaultPrevented = false;
    // Recreate preventDefault method. One way setter.
    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true;
      }
    };
    // Create 'defaultPrevented' publicly accessible prop
    // that can only be altered by the preventDefault method.
    defineProperty$1(this, 'defaultPrevented', {
      enumerable: true,
      get: function get$$1() {
        return defaultPrevented;
      }
    });
  }

  createClass(BvEvent, null, [{
    key: 'defaults',
    value: function defaults$$1() {
      return {
        type: '',
        cancelable: true,
        nativeEvent: null,
        target: null,
        relatedTarget: null,
        vueTarget: null
      };
    }
  }]);
  return BvEvent;
}();

// Return an Array of visible items
function filterVisible(els) {
  return (els || []).filter(isVisible);
}

// Dropdown item CSS selectors
// TODO: .dropdown-form handling
var ITEM_SELECTOR$1 = '.dropdown-item:not(.disabled):not([disabled])';

// Popper attachment positions
var AttachmentMap = {
  // DropUp Left Align
  TOP: 'top-start',
  // DropUp Right Align
  TOPEND: 'top-end',
  // Dropdown left Align
  BOTTOM: 'bottom-start',
  // Dropdown Right Align
  BOTTOMEND: 'bottom-end'
};

var dropdownMixin = {
  mixins: [clickoutMixin, listenOnRootMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      // Button label
      type: String,
      default: ''
    },
    dropup: {
      // place on top if possible
      type: Boolean,
      default: false
    },
    right: {
      // Right align menu (default is left align)
      type: Boolean,
      default: false
    },
    offset: {
      // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
      type: [Number, String],
      default: 0
    },
    noFlip: {
      // Disable auto-flipping of menu from bottom<=>top
      type: Boolean,
      default: false
    },
    popperOpts: {
      type: Object,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      visible: false,
      inNavbar: null,
      visibleChangePrevented: false
    };
  },
  created: function created() {
    // Create non-reactive property
    this._popper = null;
  },
  mounted: function mounted() {
    // To keep one dropdown opened on page
    this.listenOnRoot('bv::dropdown::shown', this.rootCloseListener);
    // Hide when clicked on links
    this.listenOnRoot('clicked::link', this.rootCloseListener);
    // Use new namespaced events
    this.listenOnRoot('bv::link::clicked', this.rootCloseListener);
  },

  /* istanbul ignore next: not easy to test */
  deactivated: function deactivated() {
    // In case we are inside a `<keep-alive>`
    this.visible = false;
    this.setTouchStart(false);
    this.removePopper();
  },

  /* istanbul ignore next: not easy to test */
  beforeDestroy: function beforeDestroy() {
    this.visible = false;
    this.setTouchStart(false);
    this.removePopper();
  },

  watch: {
    visible: function visible(newValue, oldValue) {
      if (this.visibleChangePrevented) {
        this.visibleChangePrevented = false;
        return;
      }

      if (newValue !== oldValue) {
        var evtName = newValue ? 'show' : 'hide';
        var bvEvt = new BvEvent(evtName, {
          cancelable: true,
          vueTarget: this,
          target: this.$refs.menu,
          relatedTarget: null
        });
        this.emitEvent(bvEvt);
        if (bvEvt.defaultPrevented) {
          // Reset value and exit if canceled
          this.visibleChangePrevented = true;
          this.visible = oldValue;
          return;
        }
        if (evtName === 'show') {
          this.showMenu();
        } else {
          this.hideMenu();
        }
      }
    },
    disabled: function disabled(newValue, oldValue) {
      if (newValue !== oldValue && newValue && this.visible) {
        // Hide dropdown if disabled changes to true
        this.visible = false;
      }
    }
  },
  computed: {
    toggler: function toggler() {
      return this.$refs.toggle.$el || this.$refs.toggle;
    }
  },
  methods: {
    // Event emitter
    emitEvent: function emitEvent(bvEvt) {
      var type = bvEvt.type;
      this.$emit(type, bvEvt);
      this.emitOnRoot('bv::dropdown::' + type, bvEvt);
    },
    showMenu: function showMenu() {
      if (this.disabled) {
        return;
      }
      // Ensure other menus are closed
      this.emitOnRoot('bv::dropdown::shown', this);

      // Are we in a navbar ?
      if (this.inNavbar === null && this.isNav) {
        this.inNavbar = Boolean(closest('.navbar', this.$el));
      }

      // Disable totally Popper.js for Dropdown in Navbar
      /* istnbul ignore next: can't test popper in JSDOM */
      if (!this.inNavbar) {
        if (typeof Popper === 'undefined') {
          warn('b-dropdown: Popper.js not found. Falling back to CSS positioning.');
        } else {
          // for dropup with alignment we use the parent element as popper container
          var element = this.dropup && this.right || this.split ? this.$el : this.$refs.toggle;
          // Make sure we have a reference to an element, not a component!
          element = element.$el || element;
          // Instantiate popper.js
          this.createPopper(element);
        }
      }

      this.setTouchStart(true);
      this.$emit('shown');

      // Focus on the first item on show
      // this.$nextTick(this.focusFirstItem)
    },
    hideMenu: function hideMenu() {
      this.setTouchStart(false);
      this.emitOnRoot('bv::dropdown::hidden', this);
      this.$emit('hidden');
      this.removePopper();
    },
    createPopper: function createPopper(element) {
      this.removePopper();
      this._popper = new Popper(element, this.$refs.menu, this.getPopperConfig());
    },
    removePopper: function removePopper() {
      if (this._popper) {
        // Ensure popper event listeners are removed cleanly
        this._popper.destroy();
      }
      this._popper = null;
    },
    getPopperConfig /* istanbul ignore next: can't test popper in JSDOM */: function getPopperConfig() {
      var placement = AttachmentMap.BOTTOM;
      if (this.dropup && this.right) {
        // dropup + right
        placement = AttachmentMap.TOPEND;
      } else if (this.dropup) {
        // dropup + left
        placement = AttachmentMap.TOP;
      } else if (this.right) {
        // dropdown + right
        placement = AttachmentMap.BOTTOMEND;
      }
      var popperConfig = {
        placement: placement,
        modifiers: {
          offset: {
            offset: this.offset || 0
          },
          flip: {
            enabled: !this.noFlip
          }
        }
      };
      if (this.boundary) {
        popperConfig.modifiers.preventOverflow = {
          boundariesElement: this.boundary
        };
      }
      return assign(popperConfig, this.popperOpts || {});
    },
    setTouchStart: function setTouchStart(on) {
      var _this = this;

      /*
       * If this is a touch-enabled device we add extra
       * empty mouseover listeners to the body's immediate children;
       * only needed because of broken event delegation on iOS
       * https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
       */
      if ('ontouchstart' in document.documentElement) {
        var children = from(document.body.children);
        children.forEach(function (el) {
          if (on) {
            eventOn('mouseover', _this._noop);
          } else {
            eventOff('mouseover', _this._noop);
          }
        });
      }
    },

    /* istanbul ignore next: not easy to test */
    _noop: function _noop() {
      // Do nothing event handler (used in touchstart event handler)
    },
    rootCloseListener: function rootCloseListener(vm) {
      if (vm !== this) {
        this.visible = false;
      }
    },
    clickOutListener: function clickOutListener() {
      this.visible = false;
    },
    show: function show() {
      // Public method to show dropdown
      if (this.disabled) {
        return;
      }
      this.visible = true;
    },
    hide: function hide() {
      // Public method to hide dropdown
      if (this.disabled) {
        return;
      }
      this.visible = false;
    },
    toggle: function toggle(evt) {
      // Called only by a button that toggles the menu
      evt = evt || {};
      var type = evt.type;
      var key = evt.keyCode;
      if (type !== 'click' && !(type === 'keydown' && (key === KeyCodes.ENTER || key === KeyCodes.SPACE || key === KeyCodes.DOWN))) {
        // We only toggle on Click, Enter, Space, and Arrow Down
        return;
      }
      if (this.disabled) {
        this.visible = false;
        return;
      }
      this.$emit('toggle', evt);
      if (evt.defaultPrevented) {
        // Exit if canceled
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      // Toggle visibility
      this.visible = !this.visible;
    },
    click: function click(evt) {
      // Calle only in split button mode, for the split button
      if (this.disabled) {
        this.visible = false;
        return;
      }
      this.$emit('click', evt);
    },

    /* istanbul ignore next: not easy to test */
    onKeydown: function onKeydown(evt) {
      // Called from dropdown menu context
      var key = evt.keyCode;
      if (key === KeyCodes.ESC) {
        // Close on ESC
        this.onEsc(evt);
      } else if (key === KeyCodes.TAB) {
        // Close on tab out
        this.onTab(evt);
      } else if (key === KeyCodes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false);
      } else if (key === KeyCodes.UP) {
        // Up Arrow
        this.focusNext(evt, true);
      }
    },

    /* istanbul ignore next: not easy to test */
    onEsc: function onEsc(evt) {
      if (this.visible) {
        this.visible = false;
        evt.preventDefault();
        evt.stopPropagation();
        // Return focus to original trigger button
        this.$nextTick(this.focusToggler);
      }
    },

    /* istanbul ignore next: not easy to test */
    onTab: function onTab(evt) {
      if (this.visible) {
        // TODO: Need special handler for dealing with form inputs
        // Tab, if in a text-like input, we should just focus next item in the dropdown
        // Note: Inputs are in a special .dropdown-form container
        this.visible = false;
      }
    },
    onFocusOut: function onFocusOut(evt) {
      if (this.$refs.menu.contains(evt.relatedTarget)) {
        return;
      }
      this.visible = false;
    },

    /* istanbul ignore next: not easy to test */
    onMouseOver: function onMouseOver(evt) {
      // Focus the item on hover
      // TODO: Special handling for inputs? Inputs are in a special .dropdown-form container
      var item = evt.target;
      if (item.classList.contains('dropdown-item') && !item.disabled && !item.classList.contains('disabled') && item.focus) {
        item.focus();
      }
    },
    focusNext: function focusNext(evt, up) {
      var _this2 = this;

      if (!this.visible) {
        return;
      }
      evt.preventDefault();
      evt.stopPropagation();
      this.$nextTick(function () {
        var items = _this2.getItems();
        if (items.length < 1) {
          return;
        }
        var index = items.indexOf(evt.target);
        if (up && index > 0) {
          index--;
        } else if (!up && index < items.length - 1) {
          index++;
        }
        if (index < 0) {
          index = 0;
        }
        _this2.focusItem(index, items);
      });
    },
    focusItem: function focusItem(idx, items) {
      var el = items.find(function (el, i) {
        return i === idx;
      });
      if (el && getAttr(el, 'tabindex') !== '-1') {
        el.focus();
      }
    },
    getItems: function getItems() {
      // Get all items
      return filterVisible(selectAll(ITEM_SELECTOR$1, this.$refs.menu));
    },
    getFirstItem: function getFirstItem() {
      // Get the first non-disabled item
      var item = this.getItems()[0];
      return item || null;
    },
    focusFirstItem: function focusFirstItem() {
      var item = this.getFirstItem();
      if (item) {
        this.focusItem(0, [item]);
      }
    },
    focusToggler: function focusToggler() {
      var toggler = this.toggler;
      if (toggler && toggler.focus) {
        toggler.focus();
      }
    }
  }
};

var bDropdown = {
  mixins: [idMixin, dropdownMixin],
  components: { bButton: bBtn },
  render: function render(h) {
    var split = h(false);
    if (this.split) {
      split = h('b-button', {
        ref: 'button',
        props: {
          disabled: this.disabled,
          variant: this.variant,
          size: this.size
        },
        attrs: {
          id: this.safeId('_BV_button_')
        },
        on: {
          click: this.click
        }
      }, [this.$slots['button-content'] || this.$slots.text || this.text]);
    }
    var toggle = h('b-button', {
      ref: 'toggle',
      class: this.toggleClasses,
      props: {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled
      },
      attrs: {
        id: this.safeId('_BV_toggle_'),
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle, // click
        keydown: this.toggle // enter, space, down
      }
    }, [this.split ? h('span', { class: ['sr-only'] }, [this.toggleText]) : this.$slots['button-content'] || this.$slots.text || this.text]);
    var menu = h('div', {
      ref: 'menu',
      class: this.menuClasses,
      attrs: {
        role: this.role,
        'aria-labelledby': this.safeId(this.split ? '_BV_button_' : '_BV_toggle_')
      },
      on: {
        mouseover: this.onMouseOver,
        keydown: this.onKeydown // tab, up, down, esc
      }
    }, [this.$slots.default]);
    return h('div', { attrs: { id: this.safeId() }, class: this.dropdownClasses }, [split, toggle, menu]);
  },

  props: {
    split: {
      type: Boolean,
      default: false
    },
    toggleText: {
      type: String,
      default: 'Toggle Dropdown'
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    menuClass: {
      type: [String, Array],
      default: null
    },
    toggleClass: {
      type: [String, Array],
      default: null
    },
    noCaret: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'menu'
    },
    boundary: {
      // String: `scrollParent`, `window` or `viewport`
      // Object: HTML Element reference
      type: [String, Object],
      default: 'scrollParent'
    }
  },
  computed: {
    dropdownClasses: function dropdownClasses() {
      var position = '';
      // Position `static` is needed to allow menu to "breakout" of the scrollParent boundaries
      // when boundary is anything other than `scrollParent`
      // See https://github.com/twbs/bootstrap/issues/24251#issuecomment-341413786
      if (this.boundary !== 'scrollParent' || !this.boundary) {
        position = 'position-static';
      }
      return ['btn-group', 'b-dropdown', 'dropdown', this.dropup ? 'dropup' : '', this.visible ? 'show' : '', position];
    },
    menuClasses: function menuClasses() {
      return ['dropdown-menu', {
        'dropdown-menu-right': this.right,
        'show': this.visible
      }, this.menuClass];
    },
    toggleClasses: function toggleClasses() {
      return [{
        'dropdown-toggle': !this.noCaret || this.split,
        'dropdown-toggle-split': this.split
      }, this.toggleClass];
    }
  }
};

var props$l = propsFactory();

var bDropdownItem = {
  functional: true,
  props: props$l,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(bLink, mergeData(data, {
      props: props,
      staticClass: 'dropdown-item',
      attrs: { role: 'menuitem' }
    }), children);
  }
};

var props$m = {
  disabled: {
    type: Boolean,
    default: false
  }
};

var bDropdownItemButton = {
  functional: true,
  props: props$m,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        parent = _ref.parent,
        children = _ref.children;

    return h('button', mergeData(data, {
      props: props,
      staticClass: 'dropdown-item',
      attrs: { role: 'menuitem', type: 'button', disabled: props.disabled },
      on: {
        click: function click(e) {
          parent.$root.$emit('clicked::link', e);
        }
      }
    }), children);
  }
};

var props$n = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'h6'
  }
};

var bDropdownHeader = {
  functional: true,
  props: props$n,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'dropdown-header',
      attrs: { id: props.id || null }
    }), children);
  }
};

var props$o = {
  tag: {
    type: String,
    default: 'div'
  }
};

var bDropdownDivider = {
  functional: true,
  props: props$o,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;

    return h(props.tag, mergeData(data, {
      staticClass: 'dropdown-divider',
      attrs: { role: 'separator' }
    }));
  }
};

var components$b = {
  bDropdown: bDropdown,
  bDd: bDropdown,
  bDropdownItem: bDropdownItem,
  bDdItem: bDropdownItem,
  bDropdownItemButton: bDropdownItemButton,
  bDropdownItemBtn: bDropdownItemButton,
  bDdItemButton: bDropdownItemButton,
  bDdItemBtn: bDropdownItemButton,
  bDropdownHeader: bDropdownHeader,
  bDdHeader: bDropdownHeader,
  bDropdownDivider: bDropdownDivider,
  bDdDivider: bDropdownDivider
};

var VuePlugin$c = {
  install: function install(Vue) {
    registerComponents(Vue, components$b);
  }
};

vueUse(VuePlugin$c);

var props$p = {
  type: {
    type: String,
    default: 'iframe',
    validator: function validator(str) {
      return arrayIncludes(['iframe', 'embed', 'video', 'object', 'img', 'b-img', 'b-img-lazy'], str);
    }
  },
  tag: {
    type: String,
    default: 'div'
  },
  aspect: {
    type: String,
    default: '16by9'
  }
};

var bEmbed = {
  functional: true,
  props: props$p,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, {
      ref: data.ref,
      staticClass: 'embed-responsive',
      class: defineProperty({}, 'embed-responsive-' + props.aspect, Boolean(props.aspect))
    }, [h(props.type, mergeData(data, { ref: '', staticClass: 'embed-responsive-item' }), children)]);
  }
};

var components$c = {
  bEmbed: bEmbed
};

var VuePlugin$d = {
  install: function install(Vue) {
    registerComponents(Vue, components$c);
  }
};

vueUse(VuePlugin$d);

var props$q = {
  id: {
    type: String,
    default: null
  },
  inline: {
    type: Boolean,
    default: false
  },
  novalidate: {
    type: Boolean,
    default: false
  },
  validated: {
    type: Boolean,
    default: false
  }
};

var Form = {
  functional: true,
  props: props$q,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h('form', mergeData(data, {
      class: {
        'form-inline': props.inline,
        'was-validated': props.validated
      },
      attrs: {
        id: props.id,
        novalidate: props.novalidate
      }
    }), children);
  }
};

var props$r = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'small'
  },
  textVariant: {
    type: String,
    default: 'muted'
  },
  inline: {
    type: Boolean,
    default: false
  }
};

var bFormText = {
  functional: true,
  props: props$r,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      class: defineProperty({
        'form-text': !props.inline
      }, 'text-' + props.textVariant, Boolean(props.textVariant)),
      attrs: {
        id: props.id
      }
    }), children);
  }
};

var props$s = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  forceShow: {
    type: Boolean,
    default: false
  }
};

var bFormInvalidFeedback = {
  functional: true,
  props: props$s,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'invalid-feedback',
      class: { 'd-block': props.forceShow },
      attrs: { id: props.id }
    }), children);
  }
};

var props$t = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  forceShow: {
    type: Boolean,
    default: false
  }
};

var bFormValidFeedback = {
  functional: true,
  props: props$t,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'valid-feedback',
      class: { 'd-block': props.forceShow },
      attrs: { id: props.id }
    }), children);
  }
};

var components$d = {
  bForm: Form,
  bFormRow: bFormRow,
  bFormText: bFormText,
  bFormInvalidFeedback: bFormInvalidFeedback,
  bFormFeedback: bFormInvalidFeedback,
  bFormValidFeedback: bFormValidFeedback
};

var VuePlugin$e = {
  install: function install(Vue) {
    registerComponents(Vue, components$d);
  }
};

vueUse(VuePlugin$e);

/* Form control contextual state class computation
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true or 'valid' for is-valid
 *  - false or 'invalid' for is-invalid
 *  - null (or empty string) for no contextual state
 */

var formStateMixin = {
  props: {
    state: {
      // true/'valid', false/'invalid', '',null
      type: [Boolean, String],
      default: null
    }
  },
  computed: {
    computedState: function computedState() {
      var state = this.state;
      if (state === true || state === 'valid') {
        return true;
      } else if (state === false || state === 'invalid') {
        return false;
      }
      return null;
    },
    stateClass: function stateClass() {
      var state = this.computedState;
      if (state === true) {
        return 'is-valid';
      } else if (state === false) {
        return 'is-invalid';
      }
      return null;
    }
  }
};

// Selector for finding firt input in the form-group
var SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)';

var bFormGroup = {
  mixins: [idMixin, formStateMixin],
  components: { bFormRow: bFormRow, bFormText: bFormText, bFormInvalidFeedback: bFormInvalidFeedback, bFormValidFeedback: bFormValidFeedback },
  render: function render(h) {
    var $slots = this.$slots;

    // Label / Legend
    var legend = h(false);
    if (this.hasLabel) {
      var children = $slots['label'];
      var legendTag = this.labelFor ? 'label' : 'legend';
      var legendDomProps = children ? {} : { innerHTML: this.label };
      var legendAttrs = { id: this.labelId, for: this.labelFor || null };
      var legendClick = this.labelFor || this.labelSrOnly ? {} : { click: this.legendClick };
      if (this.horizontal) {
        // Horizontal layout with label
        if (this.labelSrOnly) {
          // SR Only we wrap label/legend in a div to preserve layout
          children = h(legendTag, { class: ['sr-only'], attrs: legendAttrs, domProps: legendDomProps }, children);
          legend = h('div', { class: this.labelLayoutClasses }, [children]);
        } else {
          legend = h(legendTag, {
            class: [this.labelLayoutClasses, this.labelClasses],
            attrs: legendAttrs,
            domProps: legendDomProps,
            on: legendClick
          }, children);
        }
      } else {
        // Vertical layout with label
        legend = h(legendTag, {
          class: this.labelSrOnly ? ['sr-only'] : this.labelClasses,
          attrs: legendAttrs,
          domProps: legendDomProps,
          on: legendClick
        }, children);
      }
    } else if (this.horizontal) {
      // No label but has horizontal layout, so we need a spacer element for layout
      legend = h('div', { class: this.labelLayoutClasses });
    }

    // Invalid feeback text (explicitly hidden if state is valid)
    var invalidFeedback = h(false);
    if (this.hasInvalidFeedback) {
      var domProps = {};
      if (!$slots['invalid-feedback'] && !$slots['feedback']) {
        domProps = { innerHTML: this.invalidFeedback || this.feedback || '' };
      }
      invalidFeedback = h('b-form-invalid-feedback', {
        props: {
          id: this.invalidFeedbackId,
          forceShow: this.computedState === false
        },
        attrs: {
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        },
        domProps: domProps
      }, $slots['invalid-feedback'] || $slots['feedback']);
    }

    // Valid feeback text (explicitly hidden if state is invalid)
    var validFeedback = h(false);
    if (this.hasValidFeedback) {
      var _domProps = $slots['valid-feedback'] ? {} : { innerHTML: this.validFeedback || '' };
      validFeedback = h('b-form-valid-feedback', {
        props: {
          id: this.validFeedbackId,
          forceShow: this.computedState === true
        },
        attrs: {
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        },
        domProps: _domProps
      }, $slots['valid-feedback']);
    }

    // Form help text (description)
    var description = h(false);
    if (this.hasDescription) {
      var _domProps2 = $slots['description'] ? {} : { innerHTML: this.description || '' };
      description = h('b-form-text', { attrs: { id: this.descriptionId }, domProps: _domProps2 }, $slots['description']);
    }

    // Build content layout
    var content = h('div', {
      ref: 'content',
      class: this.inputLayoutClasses,
      attrs: this.labelFor ? {} : { role: 'group', 'aria-labelledby': this.labelId }
    }, [$slots['default'], invalidFeedback, validFeedback, description]);

    // Generate main form-group wrapper
    return h(this.labelFor ? 'div' : 'fieldset', {
      class: this.groupClasses,
      attrs: {
        id: this.safeId(),
        disabled: this.disabled,
        role: 'group',
        'aria-invalid': this.computedState === false ? 'true' : null,
        'aria-labelledby': this.labelId,
        'aria-describedby': this.labelFor ? null : this.describedByIds
      }
    }, this.horizontal ? [h('b-form-row', {}, [legend, content])] : [legend, content]);
  },

  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    labelCols: {
      type: [Number, String],
      default: 3,
      validator: function validator(value) {
        if (Number(value) >= 1 && Number(value) <= 11) {
          return true;
        }
        warn('b-form-group: label-cols must be a value between 1 and 11');
        return false;
      }
    },
    breakpoint: {
      type: String,
      default: 'sm'
    },
    labelTextAlign: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: [String, Array],
      default: null
    },
    description: {
      type: String,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: null
    },
    feedback: {
      // Deprecated in favor of invalid-feedback
      type: String,
      default: null
    },
    validFeedback: {
      type: String,
      default: null
    },
    validated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    groupClasses: function groupClasses() {
      return ['b-form-group', 'form-group', this.validated ? 'was-validated' : null, this.stateClass];
    },
    labelClasses: function labelClasses() {
      return ['col-form-label', this.labelSize ? 'col-form-label-' + this.labelSize : null, this.labelTextAlign ? 'text-' + this.labelTextAlign : null, this.horizontal ? null : 'pt-0', this.labelClass];
    },
    labelLayoutClasses: function labelLayoutClasses() {
      return [this.horizontal ? 'col-' + this.breakpoint + '-' + this.labelCols : null];
    },
    inputLayoutClasses: function inputLayoutClasses() {
      return [this.horizontal ? 'col-' + this.breakpoint + '-' + (12 - Number(this.labelCols)) : null];
    },
    hasLabel: function hasLabel() {
      return this.label || this.$slots['label'];
    },
    hasDescription: function hasDescription() {
      return this.description || this.$slots['description'];
    },
    hasInvalidFeedback: function hasInvalidFeedback() {
      if (this.computedState === true) {
        // If the form-group state is explicityly valid, we return false
        return false;
      }
      return this.invalidFeedback || this.feedback || this.$slots['invalid-feedback'] || this.$slots['feedback'];
    },
    hasValidFeedback: function hasValidFeedback() {
      if (this.computedState === false) {
        // If the form-group state is explicityly invalid, we return false
        return false;
      }
      return this.validFeedback || this.$slots['valid-feedback'];
    },
    labelId: function labelId() {
      return this.hasLabel ? this.safeId('_BV_label_') : null;
    },
    descriptionId: function descriptionId() {
      return this.hasDescription ? this.safeId('_BV_description_') : null;
    },
    invalidFeedbackId: function invalidFeedbackId() {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null;
    },
    validFeedbackId: function validFeedbackId() {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null;
    },
    describedByIds: function describedByIds() {
      return [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId].filter(function (i) {
        return i;
      }).join(' ') || null;
    }
  },
  watch: {
    describedByIds: function describedByIds(add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove);
      }
    }
  },
  methods: {
    legendClick: function legendClick(evt) {
      var tagName = evt.target ? evt.target.tagName : '';
      if (/^(input|select|textarea|label)$/i.test(tagName)) {
        // If clicked an input inside legend, we just let the default happen
        return;
      }
      // Focus the first non-disabled visible input when the legend element is clicked
      var inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible);
      if (inputs[0] && inputs[0].focus) {
        inputs[0].focus();
      }
    },
    setInputDescribedBy: function setInputDescribedBy(add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter
      if (this.labelFor && typeof document !== 'undefined') {
        var input = select('#' + this.labelFor, this.$refs.content);
        if (input) {
          var adb = 'aria-describedby';
          var ids = (getAttr(input, adb) || '').split(/\s+/);
          remove = (remove || '').split(/\s+/);
          // Update ID list, preserving any original IDs
          ids = ids.filter(function (id) {
            return remove.indexOf(id) === -1;
          }).concat(add || '').join(' ').trim();
          if (ids) {
            setAttr(input, adb, ids);
          } else {
            removeAttr(input, adb);
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      // Set the adia-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      _this.setInputDescribedBy(_this.describedByIds);
    });
  }
};

var components$e = {
  bFormGroup: bFormGroup,
  bFormFieldset: bFormGroup
};

var VuePlugin$f = {
  install: function install(Vue) {
    registerComponents(Vue, components$e);
  }
};

vueUse(VuePlugin$f);

/*
 * form-radio & form-check mixin
 *
 */

var formRadioCheckMixin = {
  data: function data() {
    return {
      localChecked: this.checked,
      hasFocus: false
    };
  },

  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {},
    checked: {
      // This is the model, except when in group mode
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: null
    }
  },
  computed: {
    computedLocalChecked: {
      get: function get() {
        if (this.is_Child) {
          return this.$parent.localChecked;
        } else {
          return this.localChecked;
        }
      },
      set: function set(val) {
        if (this.is_Child) {
          this.$parent.localChecked = val;
        } else {
          this.localChecked = val;
        }
      }
    },
    is_Child: function is_Child() {
      return Boolean(this.$parent && this.$parent.is_RadioCheckGroup);
    },
    is_Disabled: function is_Disabled() {
      // Child can be disabled while parent isn't
      return Boolean(this.is_Child ? this.$parent.disabled || this.disabled : this.disabled);
    },
    is_Required: function is_Required() {
      return Boolean(this.is_Child ? this.$parent.required : this.required);
    },
    is_Plain: function is_Plain() {
      return Boolean(this.is_Child ? this.$parent.plain : this.plain);
    },
    is_Custom: function is_Custom() {
      return !this.is_Plain;
    },
    get_Size: function get_Size() {
      return this.is_Child ? this.$parent.size : this.size;
    },
    get_State: function get_State() {
      // This is a tri-state prop (true, false, null)
      if (this.is_Child && typeof this.$parent.get_State === 'boolean') {
        return this.$parent.get_State;
      }
      return this.computedState;
    },
    get_StateClass: function get_StateClass() {
      // This is a tri-state prop (true, false, null)
      return typeof this.get_State === 'boolean' ? this.get_State ? 'is-valid' : 'is-invalid' : '';
    },
    is_Stacked: function is_Stacked() {
      return Boolean(this.is_Child && this.$parent.stacked);
    },
    is_Inline: function is_Inline() {
      return !this.is_Stacked;
    },
    is_ButtonMode: function is_ButtonMode() {
      return Boolean(this.is_Child && this.$parent.buttons);
    },
    get_ButtonVariant: function get_ButtonVariant() {
      // Local variant trumps parent variant
      return this.buttonVariant || (this.is_Child ? this.$parent.buttonVariant : null) || 'secondary';
    },
    get_Name: function get_Name() {
      return (this.is_Child ? this.$parent.name || this.$parent.safeId() : this.name) || null;
    },
    buttonClasses: function buttonClasses() {
      // Same for radio & check
      return ['btn', 'btn-' + this.get_ButtonVariant, this.get_Size ? 'btn-' + this.get_Size : '',
      // 'disabled' class makes "button" look disabled
      this.is_Disabled ? 'disabled' : '',
      // 'active' class makes "button" look pressed
      this.is_Checked ? 'active' : '',
      // Focus class makes button look focused
      this.hasFocus ? 'focus' : ''];
    }
  },
  methods: {
    handleFocus: function handleFocus(evt) {
      // When in buttons mode, we need to add 'focus' class to label when radio focused
      if (this.is_ButtonMode && evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true;
        } else if (evt.type === 'blur') {
          this.hasFocus = false;
        }
      }
    }
  }
};

var formMixin = {
  props: {
    name: {
      type: String
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};

var formSizeMixin = {
  props: {
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    sizeFormClass: function sizeFormClass() {
      return [this.size ? "form-control-" + this.size : null];
    },
    sizeBtnClass: function sizeBtnClass() {
      return [this.size ? "btn-" + this.size : null];
    }
  }
};

var formCustomMixin = {
  computed: {
    custom: function custom() {
      return !this.plain;
    }
  },
  props: {
    plain: {
      type: Boolean,
      default: false
    }
  }
};

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */
function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a);
      var isArrayB = isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = keys(a);
        var keysB = keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

var bFormCheckbox = {
  mixins: [idMixin, formRadioCheckMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin],
  render: function render(h) {
    var _this = this;

    var input = h('input', {
      ref: 'check',
      class: [this.is_ButtonMode ? '' : this.is_Plain ? 'form-check-input' : 'custom-control-input', this.get_StateClass],
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.computedLocalChecked,
        expression: 'computedLocalChecked'
      }],
      attrs: {
        id: this.safeId(),
        type: 'checkbox',
        name: this.get_Name,
        disabled: this.is_Disabled,
        required: this.is_Required,
        autocomplete: 'off',
        'true-value': this.value,
        'false-value': this.uncheckedValue,
        'aria-required': this.is_Required ? 'true' : null
      },
      domProps: { value: this.value, checked: this.is_Checked },
      on: {
        focus: this.handleFocus,
        blur: this.handleFocus,
        change: this.emitChange,
        __c: function __c(evt) {
          var $$a = _this.computedLocalChecked;
          var $$el = evt.target;
          if (isArray($$a)) {
            // Multiple checkbox
            var $$v = _this.value;
            var $$i = _this._i($$a, $$v); // Vue's 'loose' Array.indexOf
            if ($$el.checked) {
              // Append value to array
              $$i < 0 && (_this.computedLocalChecked = $$a.concat([$$v]));
            } else {
              // Remove value from array
              $$i > -1 && (_this.computedLocalChecked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            // Single checkbox
            _this.computedLocalChecked = $$el.checked ? _this.value : _this.uncheckedValue;
          }
        }
      }
    });

    var description = h(this.is_ButtonMode ? 'span' : 'label', {
      class: this.is_ButtonMode ? null : this.is_Plain ? 'form-check-label' : 'custom-control-label',
      attrs: { for: this.is_ButtonMode ? null : this.safeId() }
    }, [this.$slots.default]);

    if (!this.is_ButtonMode) {
      return h('div', {
        class: [this.is_Plain ? 'form-check' : this.labelClasses, { 'form-check-inline': this.is_Plain && !this.is_Stacked }, { 'custom-control-inline': !this.is_Plain && !this.is_Stacked }]
      }, [input, description]);
    } else {
      return h('label', { class: [this.buttonClasses] }, [input, description]);
    }
  },

  props: {
    value: {
      default: true
    },
    uncheckedValue: {
      // Not applicable in multi-check mode
      default: false
    },
    indeterminate: {
      // Not applicable in multi-check mode
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClasses: function labelClasses() {
      return ['custom-control', 'custom-checkbox', this.get_Size ? 'form-control-' + this.get_Size : '', this.get_StateClass];
    },
    is_Checked: function is_Checked() {
      var checked = this.computedLocalChecked;
      if (isArray(checked)) {
        for (var i = 0; i < checked.length; i++) {
          if (looseEqual(checked[i], this.value)) {
            return true;
          }
        }
        return false;
      } else {
        return looseEqual(checked, this.value);
      }
    }
  },
  watch: {
    computedLocalChecked: function computedLocalChecked(newVal, oldVal) {
      if (looseEqual(newVal, oldVal)) {
        return;
      }
      this.$emit('input', newVal);
      this.$emit('update:indeterminate', this.$refs.check.indeterminate);
    },
    checked: function checked(newVal, oldVal) {
      if (this.is_Child || looseEqual(newVal, oldVal)) {
        return;
      }
      this.computedLocalChecked = newVal;
    },
    indeterminate: function indeterminate(newVal, oldVal) {
      this.setIndeterminate(newVal);
    }
  },
  methods: {
    emitChange: function emitChange(_ref) {
      var checked = _ref.target.checked;

      // Change event is only fired via user interaction
      // And we only emit the value of this checkbox
      if (this.is_Child || isArray(this.computedLocalChecked)) {
        this.$emit('change', checked ? this.value : null);
        if (this.is_Child) {
          // If we are a child of form-checkbbox-group, emit change on parent
          this.$parent.$emit('change', this.computedLocalChecked);
        }
      } else {
        // Single radio mode supports unchecked value
        this.$emit('change', checked ? this.value : this.uncheckedValue);
      }
      this.$emit('update:indeterminate', this.$refs.check.indeterminate);
    },
    setIndeterminate: function setIndeterminate(state) {
      // Indeterminate only supported in single checkbox mode
      if (this.is_Child || isArray(this.computedLocalChecked)) {
        return;
      }
      this.$refs.check.indeterminate = state;
      // Emit update event to prop
      this.$emit('update:indeterminate', this.$refs.check.indeterminate);
    }
  },
  mounted: function mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate);
  }
};

function isObject$1(obj) {
  return obj && {}.toString.call(obj) === '[object Object]';
}

var formOptionsMixin = {

  props: {
    options: {
      type: [Array, Object],
      default: function _default() {
        return [];
      }
    },
    valueField: {
      type: String,
      default: 'value'
    },
    textField: {
      type: String,
      default: 'text'
    },
    disabledField: {
      type: String,
      default: 'disabled'
    }
  },
  computed: {
    formOptions: function formOptions() {
      var options = this.options;

      var valueField = this.valueField;
      var textField = this.textField;
      var disabledField = this.disabledField;

      if (isArray(options)) {
        // Normalize flat-ish arrays to Array of Objects
        return options.map(function (option) {
          if (isObject$1(option)) {
            return {
              value: option[valueField],
              text: String(option[textField]),
              disabled: option[disabledField] || false
            };
          }
          return {
            value: option,
            text: String(option),
            disabled: false
          };
        });
      } else {
        // options is Object
        // Normalize Objects to Array of Objects
        return keys(options).map(function (key) {
          var option = options[key] || {};
          if (isObject$1(option)) {
            var value = option[valueField];
            var text = option[textField];
            return {
              value: typeof value === 'undefined' ? key : value,
              text: typeof text === 'undefined' ? key : String(text),
              disabled: option[disabledField] || false
            };
          }
          return {
            value: key,
            text: String(option),
            disabled: false
          };
        });
      }
    }
  }
};

var bFormCheckboxGroup = {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  components: { bFormCheckbox: bFormCheckbox },
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;

    var checks = this.formOptions.map(function (option, idx) {
      return h('b-form-checkbox', {
        key: 'check_' + idx + '_opt',
        props: {
          id: _this.safeId('_BV_check_' + idx + '_opt_'),
          name: _this.name,
          value: option.value,
          required: _this.name && _this.required,
          disabled: option.disabled
        }
      }, [h('span', { domProps: { innerHTML: option.text } })]);
    });
    return h('div', {
      class: this.groupClasses,
      attrs: {
        id: this.safeId(),
        role: 'group',
        tabindex: '-1',
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    }, [$slots.first, checks, $slots.default]);
  },
  data: function data() {
    return {
      localChecked: this.checked || [],
      // Flag for children
      is_RadioCheckGroup: true
    };
  },

  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      type: [String, Number, Object, Array, Boolean],
      default: null
    },
    validated: {
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: 'secondary'
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.localChecked = this.checked;
    },
    localChecked: function localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  computed: {
    groupClasses: function groupClasses() {
      if (this.buttons) {
        return ['btn-group-toggle', this.stacked ? 'btn-group-vertical' : 'btn-group', this.size ? 'btn-group-' + this.size : '', this.validated ? 'was-validated' : ''];
      }
      return [this.sizeFormClass, this.stacked && this.custom ? 'custom-controls-stacked' : '', this.validated ? 'was-validated' : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true' || this.ariaInvalid === '') {
        return 'true';
      }
      return this.get_State === false ? 'true' : null;
    },
    get_State: function get_State() {
      // Child radios sniff this value
      return this.computedState;
    }
  }
};

var components$f = {
  bFormCheckbox: bFormCheckbox,
  bCheckbox: bFormCheckbox,
  bCheck: bFormCheckbox,
  bFormCheckboxGroup: bFormCheckboxGroup,
  bCheckboxGroup: bFormCheckboxGroup,
  bCheckGroup: bFormCheckboxGroup
};

var VuePlugin$g = {
  install: function install(Vue) {
    registerComponents(Vue, components$f);
  }
};

vueUse(VuePlugin$g);

var bFormRadio = {
  mixins: [idMixin, formRadioCheckMixin, formMixin, formStateMixin],
  render: function render(h) {
    var _this = this;

    var input = h('input', {
      ref: 'radio',
      class: [this.is_ButtonMode ? '' : this.is_Plain ? 'form-check-input' : 'custom-control-input', this.get_StateClass],
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.computedLocalChecked,
        expression: 'computedLocalChecked'
      }],
      attrs: {
        id: this.safeId(),
        type: 'radio',
        name: this.get_Name,
        required: this.get_Name && this.is_Required,
        disabled: this.is_Disabled,
        autocomplete: 'off'
      },
      domProps: {
        value: this.value,
        checked: looseEqual(this.computedLocalChecked, this.value)
      },
      on: {
        focus: this.handleFocus,
        blur: this.handleFocus,
        change: this.emitChange,
        __c: function __c(evt) {
          _this.computedLocalChecked = _this.value;
        }
      }
    });

    var description = h(this.is_ButtonMode ? 'span' : 'label', {
      class: this.is_ButtonMode ? null : this.is_Plain ? 'form-check-label' : 'custom-control-label',
      attrs: { for: this.is_ButtonMode ? null : this.safeId() }
    }, [this.$slots.default]);

    if (!this.is_ButtonMode) {
      return h('div', {
        class: [this.is_Plain ? 'form-check' : this.labelClasses, { 'form-check-inline': this.is_Plain && !this.is_Stacked }, { 'custom-control-inline': !this.is_Plain && !this.is_Stacked }]
      }, [input, description]);
    } else {
      return h('label', { class: [this.buttonClasses] }, [input, description]);
    }
  },

  watch: {
    // Radio Groups can only have a single value, so our watchers are simple
    checked: function checked(newVal, oldVal) {
      this.computedLocalChecked = newVal;
    },
    computedLocalChceked: function computedLocalChceked(newVal, oldVal) {
      this.$emit('input', this.computedLocalChceked);
    }
  },
  computed: {
    is_Checked: function is_Checked() {
      return looseEqual(this.value, this.computedLocalChecked);
    },
    labelClasses: function labelClasses() {
      // Specific to radio
      return [this.get_Size ? 'form-control-' + this.get_Size : '', 'custom-control', 'custom-radio', this.get_StateClass];
    }
  },
  methods: {
    emitChange: function emitChange(_ref) {
      var checked = _ref.target.checked;

      // Change is only emitted on user interaction
      this.$emit('change', checked ? this.value : null);
      // If this is a child of form-radio-group, we emit a change event on it as well
      if (this.is_Child) {
        this.$parent.$emit('change', this.computedLocalChecked);
      }
    }
  }
};

var bFormRadioGroup = {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  components: { bFormRadio: bFormRadio },
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;

    var radios = this.formOptions.map(function (option, idx) {
      return h('b-form-radio', {
        key: 'radio_' + idx + '_opt',
        props: {
          id: _this.safeId('_BV_radio_' + idx + '_opt_'),
          name: _this.name,
          value: option.value,
          required: Boolean(_this.name && _this.required),
          disabled: option.disabled
        }
      }, [h('span', { domProps: { innerHTML: option.text } })]);
    });
    return h('div', {
      class: this.groupClasses,
      attrs: {
        id: this.safeId(),
        role: 'radiogroup',
        tabindex: '-1',
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      }
    }, [$slots.first, radios, $slots.default]);
  },
  data: function data() {
    return {
      localChecked: this.checked,
      // Flag for children
      is_RadioCheckGroup: true
    };
  },

  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    },
    validated: {
      // Used for applying hte `was-validated` class to the group
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: 'secondary'
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.localChecked = this.checked;
    },
    localChecked: function localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  computed: {
    groupClasses: function groupClasses() {
      if (this.buttons) {
        return ['btn-group-toggle', this.stacked ? 'btn-group-vertical' : 'btn-group', this.size ? 'btn-group-' + this.size : '', this.validated ? 'was-validated' : ''];
      }
      return [this.sizeFormClass, this.stacked && this.custom ? 'custom-controls-stacked' : '', this.validated ? 'was-validated' : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true' || this.ariaInvalid === '') {
        return 'true';
      }
      return this.get_State === false ? 'true' : null;
    },
    get_State: function get_State() {
      // Required by child radios
      return this.computedState;
    }
  }
};

var components$g = {
  bFormRadio: bFormRadio,
  bRadio: bFormRadio,
  bFormRadioGroup: bFormRadioGroup,
  bRadioGroup: bFormRadioGroup
};

var VuePlugin$h = {
  install: function install(Vue) {
    registerComponents(Vue, components$g);
  }
};

vueUse(VuePlugin$h);

// Valid supported input types
var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week'];

var bFormInput = {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render: function render(h) {
    return h('input', {
      ref: 'input',
      class: this.inputClass,
      attrs: {
        id: this.safeId(),
        name: this.name,
        type: this.localType,
        disabled: this.disabled,
        required: this.required,
        readonly: this.readonly || this.plaintext,
        placeholder: this.placeholder,
        autocomplete: this.autocomplete || null,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid,
        value: this.value
      },
      on: {
        input: this.onInput,
        change: this.onChange
      }
    });
  },

  props: {
    value: {
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: function validator(type) {
        return arrayIncludes(TYPES, type);
      }
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    formatter: {
      type: Function
    },
    lazyFormatter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localType: function localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text';
    },
    inputClass: function inputClass() {
      return [this.plaintext ? 'form-control-plaintext' : 'form-control', this.sizeFormClass, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null;
      }
      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true';
      }
      // Most likely a string value (which could be 'true')
      return this.ariaInvalid;
    }
  },
  mounted: function mounted() {
    if (this.value) {
      var fValue = this.format(this.value, null);
      this.setValue(fValue);
    }
  },

  watch: {
    value: function value(newVal) {
      if (this.lazyFormatter) {
        this.setValue(newVal);
      } else {
        var fValue = this.format(newVal, null);
        this.setValue(fValue);
      }
    }
  },
  methods: {
    format: function format(value, e) {
      if (this.formatter) {
        return this.formatter(value, e);
      }
      return value;
    },
    setValue: function setValue(value) {
      this.$emit('input', value);
      // When formatter removes last typed character, value of text input should update to formatted value
      this.$refs.input.value = value;
    },
    onInput: function onInput(evt) {
      var value = evt.target.value;

      if (this.lazyFormatter) {
        this.setValue(value);
      } else {
        var fValue = this.format(value, evt);
        this.setValue(fValue);
      }
    },
    onChange: function onChange(evt) {
      var fValue = this.format(evt.target.value, evt);
      this.setValue(fValue);
      this.$emit('change', fValue);
    },
    focus: function focus() {
      if (!this.disabled) {
        this.$el.focus();
      }
    }
  }
};

var components$h = {
  bFormInput: bFormInput,
  bInput: bFormInput
};

var VuePlugin$i = {
  install: function install(Vue) {
    registerComponents(Vue, components$h);
  }
};

vueUse(VuePlugin$i);

var bFormTextarea = {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render: function render(h) {
    var _this = this;

    return h('textarea', {
      ref: 'input',
      class: this.inputClass,
      style: this.inputStyle,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.localValue,
        expression: 'localValue'
      }],
      domProps: { value: this.value },
      attrs: {
        id: this.safeId(),
        name: this.name,
        disabled: this.disabled,
        placeholder: this.placeholder,
        required: this.required,
        autocomplete: this.autocomplete || null,
        readonly: this.readonly || this.plaintext,
        rows: this.rowsCount,
        wrap: this.wrap || null,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      },
      on: {
        input: function input(evt) {
          _this.localValue = evt.target.value;
        }
      }
    });
  },
  data: function data() {
    return {
      localValue: this.value
    };
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    rows: {
      type: [Number, String],
      default: null
    },
    maxRows: {
      type: [Number, String],
      default: null
    },
    wrap: {
      // 'soft', 'hard' or 'off'. Browser default is 'soft'
      type: String,
      default: 'soft'
    },
    noResize: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rowsCount: function rowsCount() {
      // A better option could be based on https://codepen.io/vsync/pen/frudD
      // As linebreaks aren't added until the input is submitted
      var rows = parseInt(this.rows, 10) || 1;
      var maxRows = parseInt(this.maxRows, 10) || 0;
      var lines = (this.localValue || '').toString().split('\n').length;
      return maxRows ? Math.min(maxRows, Math.max(rows, lines)) : Math.max(rows, lines);
    },
    inputClass: function inputClass() {
      return [this.plaintext ? 'form-control-plaintext' : 'form-control', this.sizeFormClass, this.stateClass];
    },
    inputStyle: function inputStyle() {
      // We set width 100% in plaintext mode to get around a shortcoming in bootstrap CSS
      // setting noResize to true will disable the ability for the user to resize the textarea
      return {
        width: this.plaintext ? '100%' : null,
        resize: this.noResize ? 'none' : null
      };
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null;
      }
      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true';
      }
      // Most likely a string value (which could be the string 'true')
      return this.ariaInvalid;
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      // Update our localValue
      if (newVal !== oldVal) {
        this.localValue = newVal;
      }
    },
    localValue: function localValue(newVal, oldVal) {
      // update Parent value
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    focus: function focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus();
      }
    }
  }
};

var components$i = {
  bFormTextarea: bFormTextarea,
  bTextarea: bFormTextarea
};

var VuePlugin$j = {
  install: function install(Vue) {
    registerComponents(Vue, components$i);
  }
};

vueUse(VuePlugin$j);

var bFormFile = {
  mixins: [idMixin, formMixin, formStateMixin, formCustomMixin],
  render: function render(h) {
    // Form Input
    var input = h('input', {
      ref: 'input',
      class: [{
        'form-control-file': this.plain,
        'custom-file-input': this.custom,
        focus: this.custom && this.hasFocus
      }, this.stateClass],
      attrs: {
        type: 'file',
        id: this.safeId(),
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        capture: this.capture || null,
        accept: this.accept || null,
        multiple: this.multiple,
        webkitdirectory: this.directory,
        'aria-required': this.required ? 'true' : null,
        'aria-describedby': this.plain ? null : this.safeId('_BV_file_control_')
      },
      on: {
        change: this.onFileChange,
        focusin: this.focusHandler,
        focusout: this.focusHandler
      }
    });

    if (this.plain) {
      return input;
    }

    // Overlay Labels
    var label = h('label', {
      class: ['custom-file-label', this.dragging ? 'dragging' : null],
      attrs: {
        id: this.safeId('_BV_file_control_')
      }
    }, this.selectLabel);

    // Return rendered custom file input
    return h('div', {
      class: ['custom-file', 'b-form-file', this.stateClass],
      attrs: { id: this.safeId('_BV_file_outer_') },
      on: { dragover: this.dragover }
    }, [input, label]);
  },
  data: function data() {
    return {
      selectedFile: null,
      dragging: false,
      hasFocus: false
    };
  },

  props: {
    accept: {
      type: String,
      default: ''
    },
    // Instruct input to capture from camera
    capture: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    directory: {
      type: Boolean,
      default: false
    },
    noTraverse: {
      type: Boolean,
      default: false
    },
    noDrop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectLabel: function selectLabel() {
      // No file choosen
      if (!this.selectedFile || this.selectedFile.length === 0) {
        return this.placeholder;
      }

      // Multiple files
      if (this.multiple) {
        if (this.selectedFile.length === 1) {
          return this.selectedFile[0].name;
        }
        return this.selectedFile.map(function (file) {
          return file.name;
        }).join(', ');
      }

      // Single file
      return this.selectedFile.name;
    }
  },
  watch: {
    selectedFile: function selectedFile(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      if (!newVal && this.multiple) {
        this.$emit('input', []);
      } else {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    focusHandler: function focusHandler(evt) {
      // Boostrap v4.beta doesn't have focus styling for custom file input
      // Firefox has a borked '[type=file]:focus ~ sibling' selector issue,
      // So we add a 'focus' class to get around these "bugs"
      if (this.plain || evt.type === 'focusout') {
        this.hasFocus = false;
      } else {
        // Add focus styling for custom file input
        this.hasFocus = true;
      }
    },
    reset: function reset() {
      try {
        // Wrapped in try in case IE < 11 craps out
        this.$refs.input.value = '';
      } catch (e) {}
      // IE < 11 doesn't support setting input.value to '' or null
      // So we use this little extra hack to reset the value, just in case
      // This also appears to work on modern browsers as well.
      this.$refs.input.type = '';
      this.$refs.input.type = 'file';
      this.selectedFile = this.multiple ? [] : null;
    },
    onFileChange: function onFileChange(evt) {
      var _this = this;

      // Always emit original event
      this.$emit('change', evt);
      // Check if special `items` prop is available on event (drop mode)
      // Can be disabled by setting no-traverse
      var items = evt.dataTransfer && evt.dataTransfer.items;
      if (items && !this.noTraverse) {
        var queue = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i].webkitGetAsEntry();
          if (item) {
            queue.push(this.traverseFileTree(item));
          }
        }
        Promise.all(queue).then(function (filesArr) {
          _this.setFiles(from(filesArr));
        });
        return;
      }
      // Normal handling
      this.setFiles(evt.target.files || evt.dataTransfer.files);
    },
    setFiles: function setFiles(files) {
      if (!files) {
        this.selectedFile = null;
        return;
      }
      if (!this.multiple) {
        this.selectedFile = files[0];
        return;
      }
      // Convert files to array
      var filesArray = [];
      for (var i = 0; i < files.length; i++) {
        if (files[i].type.match(this.accept)) {
          filesArray.push(files[i]);
        }
      }
      this.selectedFile = filesArray;
    },
    dragover: function dragover(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (this.noDrop || !this.custom) {
        return;
      }
      this.dragging = true;
      evt.dataTransfer.dropEffect = 'copy';
    },
    dragleave: function dragleave(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.dragging = false;
    },
    drop: function drop(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (this.noDrop) {
        return;
      }
      this.dragging = false;
      if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
        this.onFileChange(evt);
      }
    },
    traverseFileTree: function traverseFileTree(item, path) {
      var _this2 = this;

      // Based on http://stackoverflow.com/questions/3590058
      return new Promise(function (resolve) {
        path = path || '';
        if (item.isFile) {
          // Get file
          item.file(function (file) {
            file.$path = path; // Inject $path to file obj
            resolve(file);
          });
        } else if (item.isDirectory) {
          // Get folder contents
          item.createReader().readEntries(function (entries) {
            var queue = [];
            for (var i = 0; i < entries.length; i++) {
              queue.push(_this2.traverseFileTree(entries[i], path + item.name + '/'));
            }
            Promise.all(queue).then(function (filesArr) {
              resolve(from(filesArr));
            });
          });
        }
      });
    }
  }
};

var components$j = {
  bFormFile: bFormFile,
  bFile: bFormFile
};

var VuePlugin$k = {
  install: function install(Vue) {
    registerComponents(Vue, components$j);
  }
};

vueUse(VuePlugin$k);

var bFormSelect = {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;
    var options = this.formOptions.map(function (option, index) {
      return h('option', {
        key: 'option_' + index + '_opt',
        attrs: { disabled: Boolean(option.disabled) },
        domProps: { innerHTML: option.text, value: option.value }
      });
    });
    return h('select', {
      ref: 'input',
      class: this.inputClass,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: this.safeId(),
        name: this.name,
        multiple: this.multiple || null,
        size: this.computedSelectSize,
        disabled: this.disabled,
        required: this.required,
        'aria-required': this.required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      },
      on: {
        change: function change(evt) {
          var target = evt.target;
          var selectedVal = from(target.options).filter(function (o) {
            return o.selected;
          }).map(function (o) {
            return '_value' in o ? o._value : o.value;
          });
          _this.localValue = target.multiple ? selectedVal : selectedVal[0];
          _this.$emit('change', _this.localValue);
        }
      }
    }, [$slots.first, options, $slots.default]);
  },
  data: function data() {
    return {
      localValue: this.value
    };
  },

  watch: {
    value: function value(newVal, oldVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal, oldVal) {
      this.$emit('input', this.localValue);
    }
  },
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: false
    },
    selectSize: {
      // Browsers default size to 0, which shows 4 rows in most browsers in multiple mode
      // Size of 1 can bork out firefox
      type: Number,
      default: 0
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    computedSelectSize: function computedSelectSize() {
      // Custom selects with a size of zero causes the arrows to be hidden,
      // so dont render the size attribute in this case
      return !this.plain && this.selectSize === 0 ? null : this.selectSize;
    },
    inputClass: function inputClass() {
      return ['form-control', this.stateClass, this.sizeFormClass,
      // Awaiting for https://github.com/twbs/bootstrap/issues/23058
      this.plain ? null : 'custom-select', this.plain || !this.size ? null : 'custom-select-' + this.size];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true') {
        return 'true';
      }
      return this.stateClass === 'is-invalid' ? 'true' : null;
    }
  }
};

var components$k = {
  bFormSelect: bFormSelect,
  bSelect: bFormSelect
};

var VuePlugin$l = {
  install: function install(Vue) {
    registerComponents(Vue, components$k);
  }
};

vueUse(VuePlugin$l);

var THROTTLE = 100;

var bImgLazy = {
  components: { bImg: bImg },
  render: function render(h) {
    return h('b-img', {
      props: {
        src: this.computedSrc,
        alt: this.alt,
        blank: this.computedBlank,
        blankColor: this.blankColor,
        width: this.computedWidth,
        height: this.computedHeight,
        fluid: this.fluid,
        fluidGrow: this.fluidGrow,
        block: this.block,
        thumbnail: this.thumbnail,
        rounded: this.rounded,
        left: this.left,
        right: this.right,
        center: this.center
      }
    });
  },
  data: function data() {
    return {
      isShown: false,
      scrollTimeout: null
    };
  },

  props: {
    src: {
      type: String,
      default: null,
      required: true
    },
    alt: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    blankSrc: {
      // If null, a blank image is generated
      type: String,
      default: null
    },
    blankColor: {
      type: String,
      default: 'transparent'
    },
    blankWidth: {
      type: [Number, String],
      default: null
    },
    blankHeight: {
      type: [Number, String],
      default: null
    },
    fluid: {
      type: Boolean,
      default: false
    },
    fluidGrow: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: [Boolean, String],
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 360
    },
    throttle: {
      type: [Number, String],
      default: THROTTLE
    }
  },
  computed: {
    computedSrc: function computedSrc() {
      return !this.blankSrc || this.isShown ? this.src : this.blankSrc;
    },
    computedBlank: function computedBlank() {
      return !(this.isShown || this.blankSrc);
    },
    computedWidth: function computedWidth() {
      return this.isShown ? this.width : this.blankWidth || this.width;
    },
    computedHeight: function computedHeight() {
      return this.isShown ? this.height : this.blankHeight || this.height;
    }
  },
  mounted: function mounted() {
    this.setListeners(true);
    this.checkView();
  },
  activated: function activated() {
    this.setListeners(true);
    this.checkView();
  },
  deactivated: function deactivated() {
    this.setListeners(false);
  },
  beforeDdestroy: function beforeDdestroy() {
    this.setListeners(false);
  },

  methods: {
    setListeners: function setListeners(on) {
      clearTimeout(this.scrollTimer);
      this.scrollTimeout = null;
      var root = window;
      if (on) {
        eventOn(root, 'scroll', this.onScroll);
        eventOn(root, 'resize', this.onScroll);
        eventOn(root, 'orientationchange', this.onScroll);
      } else {
        eventOff(root, 'scroll', this.onScroll);
        eventOff(root, 'resize', this.onScroll);
        eventOff(root, 'orientationchange', this.onScroll);
      }
    },
    checkView: function checkView() {
      // check bounding box + offset to see if we should show
      if (!isVisible(this.$el)) {
        // Element is hidden, so skip for now
        return;
      }
      var offset$$1 = parseInt(this.offset, 10) || 0;
      var docElement = document.documentElement;
      var view = {
        l: 0 - offset$$1,
        t: 0 - offset$$1,
        b: docElement.clientHeight + offset$$1,
        r: docElement.clientWidth + offset$$1
      };
      var box = getBCR(this.$el);
      if (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b) {
        // image is in view (or about to be in view)
        this.isShown = true;
        this.setListeners(false);
      }
    },
    onScroll: function onScroll() {
      if (this.isShown) {
        this.setListeners(false);
      } else {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(this.checkView, parseInt(this.throttle, 10) || THROTTLE);
      }
    }
  }
};

var components$l = {
  bImg: bImg,
  bImgLazy: bImgLazy
};

var VuePlugin$m = {
  install: function install(Vue) {
    registerComponents(Vue, components$l);
  }
};

vueUse(VuePlugin$m);

var props$u = {
  fluid: {
    type: Boolean,
    default: false
  },
  containerFluid: {
    type: Boolean,
    default: false
  },
  header: {
    type: String,
    default: null
  },
  headerTag: {
    type: String,
    default: 'h1'
  },
  headerLevel: {
    type: [Number, String],
    default: '3'
  },
  lead: {
    type: String,
    default: null
  },
  leadTag: {
    type: String,
    default: 'p'
  },
  tag: {
    type: String,
    default: 'div'
  },
  bgVariant: {
    type: String,
    default: null
  },
  borderVariant: {
    type: String,
    default: null
  },
  textVariant: {
    type: String,
    default: null
  }
};

var bJumbotron = {
  functional: true,
  props: props$u,
  render: function render(h, _ref) {
    var _class2;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    // The order of the conditionals matter.
    // We are building the component markup in order.
    var childNodes = [];
    var $slots = slots();

    // Header
    if (props.header || $slots.header) {
      childNodes.push(h(props.headerTag, {
        class: defineProperty({}, 'display-' + props.headerLevel, Boolean(props.headerLevel))
      }, $slots.header || props.header));
    }

    // Lead
    if (props.lead || $slots.lead) {
      childNodes.push(h(props.leadTag, { staticClass: 'lead' }, $slots.lead || props.lead));
    }

    // Default slot
    if ($slots.default) {
      childNodes.push($slots.default);
    }

    // If fluid, wrap content in a container/container-fluid
    if (props.fluid) {
      // Children become a child of a container
      childNodes = [h(Container, { props: { 'fluid': props.containerFluid } }, childNodes)];
    }
    // Return the jumbotron
    return h(props.tag, mergeData(data, {
      staticClass: 'jumbotron',
      class: (_class2 = {
        'jumbotron-fluid': props.fluid
      }, defineProperty(_class2, 'text-' + props.textVariant, Boolean(props.textVariant)), defineProperty(_class2, 'bg-' + props.bgVariant, Boolean(props.bgVariant)), defineProperty(_class2, 'border-' + props.borderVariant, Boolean(props.borderVariant)), defineProperty(_class2, 'border', Boolean(props.borderVariant)), _class2)
    }), childNodes);
  }
};

var components$m = {
  bJumbotron: bJumbotron
};

var VuePlugin$n = {
  install: function install(Vue) {
    registerComponents(Vue, components$m);
  }
};

vueUse(VuePlugin$n);

var components$n = {
  bLink: bLink
};

var VuePlugin$o = {
  install: function install(Vue) {
    registerComponents(Vue, components$n);
  }
};

vueUse(VuePlugin$o);

var props$v = {
  tag: {
    type: String,
    default: 'div'
  },
  flush: {
    type: Boolean,
    default: false
  }
};

var bListGroup = {
  functional: true,
  props: props$v,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var componentData = {
      staticClass: 'list-group',
      class: { 'list-group-flush': props.flush }
    };

    return h(props.tag, mergeData(data, componentData), children);
  }
};

var actionTags = ['a', 'router-link', 'button', 'b-link'];
var linkProps$2 = propsFactory();
delete linkProps$2.href.default;
delete linkProps$2.to.default;

var props$w = assign({
  tag: {
    type: String,
    default: 'div'
  },
  action: {
    type: Boolean,
    default: null
  },
  button: {
    type: Boolean,
    default: null
  },
  variant: {
    type: String,
    default: null
  }
}, linkProps$2);

var bListGroupItem = {
  functional: true,
  props: props$w,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var tag = props.button ? 'button' : !props.href && !props.to ? props.tag : bLink;
    var isAction = Boolean(props.href || props.to || props.action || props.button || arrayIncludes(actionTags, props.tag));
    var componentData = {
      staticClass: 'list-group-item',
      class: (_class = {}, defineProperty(_class, 'list-group-item-' + props.variant, Boolean(props.variant)), defineProperty(_class, 'list-group-item-action', isAction), defineProperty(_class, 'active', props.active), defineProperty(_class, 'disabled', props.disabled), _class),
      attrs: tag === 'button' && props.disabled ? { disabled: true } : {},
      props: props.button ? {} : pluckProps(linkProps$2, props)
    };

    return h(tag, mergeData(data, componentData), children);
  }
};

var components$o = {
  bListGroup: bListGroup,
  bListGroupItem: bListGroupItem
};

var VuePlugin$p = {
  install: function install(Vue) {
    registerComponents(Vue, components$o);
  }
};

vueUse(VuePlugin$p);

var props$x = {
  tag: {
    type: String,
    default: 'div'
  }
};

var MediaBody = {
  functional: true,
  props: props$x,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'media-body'
    }), children);
  }
};

var props$y = {
  tag: {
    type: String,
    default: 'div'
  },
  verticalAlign: {
    type: String,
    default: 'top'
  }
};

var MediaAside = {
  functional: true,
  props: props$y,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'd-flex',
      class: defineProperty({}, 'align-self-' + props.verticalAlign, props.verticalAlign)
    }), children);
  }
};

var props$z = {
  tag: {
    type: String,
    default: 'div'
  },
  rightAlign: {
    type: Boolean,
    default: false
  },
  verticalAlign: {
    type: String,
    default: 'top'
  },
  noBody: {
    type: Boolean,
    default: false
  }
};

var bMedia = {
  functional: true,
  props: props$z,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots,
        children = _ref.children;

    var childNodes = props.noBody ? children : [];
    var $slots = slots();

    if (!props.noBody) {
      if ($slots.aside && !props.rightAlign) {
        childNodes.push(h(MediaAside, { staticClass: 'mr-3', props: { verticalAlign: props.verticalAlign } }, $slots.aside));
      }

      childNodes.push(h(MediaBody, $slots.default));

      if ($slots.aside && props.rightAlign) {
        childNodes.push(h(MediaAside, { staticClass: 'ml-3', props: { verticalAlign: props.verticalAlign } }, $slots.aside));
      }
    }

    return h(props.tag, mergeData(data, { staticClass: 'media' }), childNodes);
  }
};

var components$p = {
  bMedia: bMedia,
  bMediaAside: MediaAside,
  bMediaBody: MediaBody
};

var VuePlugin$q = {
  install: function install(Vue) {
    registerComponents(Vue, components$p);
  }
};

vueUse(VuePlugin$q);

// Selectors for padding/margin adjustments
var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'

  // ObserveDom config
};var OBSERVER_CONFIG = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['style', 'class']
};

var bModal = {
  mixins: [idMixin, listenOnRootMixin],
  components: { bBtn: bBtn, bBtnClose: bBtnClose },
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;
    // Modal Header
    var header = h(false);
    if (!this.hideHeader) {
      var modalHeader = $slots['modal-header'];
      if (!modalHeader) {
        var closeButton = h(false);
        if (!this.hideHeaderClose) {
          closeButton = h('b-btn-close', {
            props: {
              disabled: this.is_transitioning,
              ariaLabel: this.headerCloseLabel,
              textVariant: this.headerTextVariant
            },
            on: {
              click: function click(evt) {
                _this.hide('header-close');
              }
            }
          }, [$slots['modal-header-close']]);
        }
        modalHeader = [h(this.titleTag, { class: ['modal-title'] }, [$slots['modal-title'] || this.title]), closeButton];
      }
      header = h('header', {
        ref: 'header',
        class: this.headerClasses,
        attrs: { id: this.safeId('__BV_modal_header_') }
      }, [modalHeader]);
    }
    // Modal Body
    var body = h('div', {
      ref: 'body',
      class: this.bodyClasses,
      attrs: { id: this.safeId('__BV_modal_body_') }
    }, [$slots.default]);
    // Modal Footer
    var footer = h(false);
    if (!this.hideFooter) {
      var modalFooter = $slots['modal-footer'];
      if (!modalFooter) {
        var cancelButton = h(false);
        if (!this.okOnly) {
          cancelButton = h('b-btn', {
            props: {
              variant: this.cancelVariant,
              size: this.buttonSize,
              disabled: this.cancelDisabled || this.busy || this.is_transitioning
            },
            on: {
              click: function click(evt) {
                _this.hide('cancel');
              }
            }
          }, [$slots['modal-cancel'] || this.cancelTitle]);
        }
        var okButton = h('b-btn', {
          props: {
            variant: this.okVariant,
            size: this.buttonSize,
            disabled: this.okDisabled || this.busy || this.is_transitioning
          },
          on: {
            click: function click(evt) {
              _this.hide('ok');
            }
          }
        }, [$slots['modal-ok'] || this.okTitle]);
        modalFooter = [cancelButton, okButton];
      }
      footer = h('footer', {
        ref: 'footer',
        class: this.footerClasses,
        attrs: { id: this.safeId('__BV_modal_footer_') }
      }, [modalFooter]);
    }
    // Assemble Modal Content
    var modalContent = h('div', {
      ref: 'content',
      class: ['modal-content'],
      attrs: {
        tabindex: '-1',
        role: 'document',
        'aria-labelledby': this.hideHeader ? null : this.safeId('__BV_modal_header_'),
        'aria-describedby': this.safeId('__BV_modal_body_')
      },
      on: {
        focusout: this.onFocusout,
        click: function click(evt) {
          evt.stopPropagation();
          // https://github.com/bootstrap-vue/bootstrap-vue/issues/1528
          _this.$root.$emit('bv::dropdown::shown');
        }
      }
    }, [header, body, footer]);
    // Modal Dialog wrapper
    var modalDialog = h('div', { class: this.dialogClasses }, [modalContent]);
    // Modal
    var modal = h('div', {
      ref: 'modal',
      class: this.modalClasses,
      directives: [{
        name: 'show',
        rawName: 'v-show',
        value: this.is_visible,
        expression: 'is_visible'
      }],
      attrs: {
        id: this.safeId(),
        role: 'dialog',
        'aria-hidden': this.is_visible ? null : 'true'
      },
      on: {
        click: this.onClickOut,
        keydown: this.onEsc
      }
    }, [modalDialog]);
    // Wrap modal in transition
    modal = h('transition', {
      props: {
        enterClass: '',
        enterToClass: '',
        enterActiveClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      },
      on: {
        'before-enter': this.onBeforeEnter,
        enter: this.onEnter,
        'after-enter': this.onAfterEnter,
        'before-leave': this.onBeforeLeave,
        leave: this.onLeave,
        'after-leave': this.onAfterLeave
      }
    }, [modal]);
    // Modal Backdrop
    var backdrop = h(false);
    if (!this.hideBackdrop && (this.is_visible || this.is_transitioning)) {
      backdrop = h('div', {
        class: this.backdropClasses,
        attrs: { id: this.safeId('__BV_modal_backdrop_') }
      });
    }
    // Assemble modal and backdrop
    var outer = h(false);
    if (!this.is_hidden) {
      outer = h('div', { attrs: { id: this.safeId('__BV_modal_outer_') } }, [modal, backdrop]);
    }
    // Wrap in DIV to maintain thi.$el reference for hide/show method aceess
    return h('div', {}, [outer]);
  },
  data: function data() {
    return {
      is_hidden: this.lazy || false,
      is_visible: false,
      is_transitioning: false,
      is_show: false,
      is_block: false,
      scrollbarWidth: 0,
      isBodyOverflowing: false,
      return_focus: this.returnFocus || null
    };
  },

  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleTag: {
      type: String,
      default: 'h5'
    },
    size: {
      type: String,
      default: 'md'
    },
    centered: {
      type: Boolean,
      default: false
    },
    buttonSize: {
      type: String,
      default: ''
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noCloseOnBackdrop: {
      type: Boolean,
      default: false
    },
    noCloseOnEsc: {
      type: Boolean,
      default: false
    },
    noEnforceFocus: {
      type: Boolean,
      default: false
    },
    headerBgVariant: {
      type: String,
      default: null
    },
    headerBorderVariant: {
      type: String,
      default: null
    },
    headerTextVariant: {
      type: String,
      default: null
    },
    headerClass: {
      type: [String, Array],
      default: null
    },
    bodyBgVariant: {
      type: String,
      default: null
    },
    bodyTextVariant: {
      type: String,
      default: null
    },
    modalClass: {
      type: [String, Array],
      default: null
    },
    bodyClass: {
      type: [String, Array],
      default: null
    },
    footerBgVariant: {
      type: String,
      default: null
    },
    footerBorderVariant: {
      type: String,
      default: null
    },
    footerTextVariant: {
      type: String,
      default: null
    },
    footerClass: {
      type: [String, Array],
      default: null
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideHeaderClose: {
      type: Boolean,
      default: false
    },
    hideBackdrop: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    returnFocus: {
      default: null
    },
    headerCloseLabel: {
      type: String,
      default: 'Close'
    },
    cancelTitle: {
      type: String,
      default: 'Cancel'
    },
    okTitle: {
      type: String,
      default: 'OK'
    },
    cancelVariant: {
      type: String,
      default: 'secondary'
    },
    okVariant: {
      type: String,
      default: 'primary'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalClasses: function modalClasses() {
      return ['modal', {
        fade: !this.noFade,
        show: this.is_show,
        'd-block': this.is_block
      }, this.modalClass];
    },
    dialogClasses: function dialogClasses() {
      var _ref;

      return ['modal-dialog', (_ref = {}, defineProperty(_ref, 'modal-' + this.size, Boolean(this.size)), defineProperty(_ref, 'modal-dialog-centered', this.centered), _ref)];
    },
    backdropClasses: function backdropClasses() {
      return ['modal-backdrop', {
        fade: !this.noFade,
        show: this.is_show || this.noFade
      }];
    },
    headerClasses: function headerClasses() {
      var _ref2;

      return ['modal-header', (_ref2 = {}, defineProperty(_ref2, 'bg-' + this.headerBgVariant, Boolean(this.headerBgVariant)), defineProperty(_ref2, 'text-' + this.headerTextVariant, Boolean(this.headerTextVariant)), defineProperty(_ref2, 'border-' + this.headerBorderVariant, Boolean(this.headerBorderVariant)), _ref2), this.headerClass];
    },
    bodyClasses: function bodyClasses() {
      var _ref3;

      return ['modal-body', (_ref3 = {}, defineProperty(_ref3, 'bg-' + this.bodyBgVariant, Boolean(this.bodyBgVariant)), defineProperty(_ref3, 'text-' + this.bodyTextVariant, Boolean(this.bodyTextVariant)), _ref3), this.bodyClass];
    },
    footerClasses: function footerClasses() {
      var _ref4;

      return ['modal-footer', (_ref4 = {}, defineProperty(_ref4, 'bg-' + this.footerBgVariant, Boolean(this.footerBgVariant)), defineProperty(_ref4, 'text-' + this.footerTextVariant, Boolean(this.footerTextVariant)), defineProperty(_ref4, 'border-' + this.footerBorderVariant, Boolean(this.footerBorderVariant)), _ref4), this.footerClass];
    }
  },
  watch: {
    visible: function visible(newVal, oldVal) {
      if (newVal === oldVal) {
        return;
      }
      this[newVal ? 'show' : 'hide']();
    }
  },
  methods: {
    // Public Methods
    show: function show() {
      if (this.is_visible) {
        return;
      }
      var showEvt = new BvEvent('show', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        relatedTarget: null
      });
      this.emitEvent(showEvt);
      if (showEvt.defaultPrevented || this.is_visible) {
        // Don't show if canceled
        return;
      }
      if (hasClass(document.body, 'modal-open')) {
        // If another modal is already open, wait for it to close
        this.$root.$once('bv::modal::hidden', this.doShow);
      } else {
        // Show the modal
        this.doShow();
      }
    },
    hide: function hide(trigger) {
      if (!this.is_visible) {
        return;
      }
      var hideEvt = new BvEvent('hide', {
        cancelable: true,
        vueTarget: this,
        target: this.$refs.modal,
        // this could be the trigger element/component reference
        relatedTarget: null,
        isOK: trigger || null,
        trigger: trigger || null,
        cancel: function cancel() {
          // Backwards compatibility
          warn('b-modal: evt.cancel() is deprecated. Please use evt.preventDefault().');
          this.preventDefault();
        }
      });
      if (trigger === 'ok') {
        this.$emit('ok', hideEvt);
      } else if (trigger === 'cancel') {
        this.$emit('cancel', hideEvt);
      }
      this.emitEvent(hideEvt);
      // Hide if not canceled
      if (hideEvt.defaultPrevented || !this.is_visible) {
        return;
      }
      // stop observing for content changes
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      this.is_visible = false;
      this.$emit('change', false);
    },

    // Private method to finish showing modal
    doShow: function doShow() {
      var _this2 = this;

      // Plce modal in DOM if lazy
      this.is_hidden = false;
      this.$nextTick(function () {
        // We do this in nextTick to ensure the modal is in DOM first before we show it
        _this2.is_visible = true;
        _this2.$emit('change', true);
        // Observe changes in modal content and adjust if necessary
        _this2._observer = observeDOM(_this2.$refs.content, _this2.adjustDialog.bind(_this2), OBSERVER_CONFIG);
      });
    },

    // Transition Handlers
    onBeforeEnter: function onBeforeEnter() {
      this.is_transitioning = true;
      this.checkScrollbar();
      this.setScrollbar();
      this.adjustDialog();
      addClass(document.body, 'modal-open');
      this.setResizeEvent(true);
    },
    onEnter: function onEnter() {
      this.is_block = true;
      this.$refs.modal.scrollTop = 0;
    },
    onAfterEnter: function onAfterEnter() {
      var _this3 = this;

      this.is_show = true;
      this.is_transitioning = false;
      this.$nextTick(function () {
        _this3.focusFirst();
        var shownEvt = new BvEvent('shown', {
          cancelable: false,
          vueTarget: _this3,
          target: _this3.$refs.modal,
          relatedTarget: null
        });
        _this3.emitEvent(shownEvt);
      });
    },
    onBeforeLeave: function onBeforeLeave() {
      this.is_transitioning = true;
      this.setResizeEvent(false);
    },
    onLeave: function onLeave() {
      // Remove the 'show' class
      this.is_show = false;
    },
    onAfterLeave: function onAfterLeave() {
      var _this4 = this;

      this.is_block = false;
      this.resetAdjustments();
      this.resetScrollbar();
      this.is_transitioning = false;
      removeClass(document.body, 'modal-open');
      this.$nextTick(function () {
        _this4.is_hidden = _this4.lazy || false;
        _this4.returnFocusTo();
        var hiddenEvt = new BvEvent('hidden', {
          cancelable: false,
          vueTarget: _this4,
          target: _this4.lazy ? null : _this4.$refs.modal,
          relatedTarget: null
        });
        _this4.emitEvent(hiddenEvt);
      });
    },

    // Event emitter
    emitEvent: function emitEvent(bvEvt) {
      var type = bvEvt.type;
      this.$emit(type, bvEvt);
      this.$root.$emit('bv::modal::' + type, bvEvt);
    },

    // UI Event Handlers
    onClickOut: function onClickOut(evt) {
      // If backdrop clicked, hide modal
      if (this.is_visible && !this.noCloseOnBackdrop) {
        this.hide('backdrop');
      }
    },
    onEsc: function onEsc(evt) {
      // If ESC pressed, hide modal
      if (evt.keyCode === KeyCodes.ESC && this.is_visible && !this.noCloseOnEsc) {
        this.hide('esc');
      }
    },
    onFocusout: function onFocusout(evt) {
      // If focus leaves modal, bring it back
      // 'focusout' Event Listener bound on content
      var content = this.$refs.content;
      if (!this.noEnforceFocus && this.is_visible && content && !content.contains(evt.relatedTarget)) {
        content.focus();
      }
    },

    // Resize Listener
    setResizeEvent: function setResizeEvent(on) {
      var _this5 = this;
['resize', 'orientationchange'].forEach(function (evtName) {
        if (on) {
          eventOn(window, evtName, _this5.adjustDialog);
        } else {
          eventOff(window, evtName, _this5.adjustDialog);
        }
      });
    },

    // Root Listener handlers
    showHandler: function showHandler(id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || null;
        this.show();
      }
    },
    hideHandler: function hideHandler(id) {
      if (id === this.id) {
        this.hide();
      }
    },
    modalListener: function modalListener(bvEvt) {
      // If another modal opens, close this one
      if (bvEvt.vueTarget !== this) {
        this.hide();
      }
    },

    // Focus control handlers
    focusFirst: function focusFirst() {
      // Don't try and focus if we are SSR
      if (typeof document === 'undefined') {
        return;
      }
      var content = this.$refs.content;
      var modal = this.$refs.modal;
      var activeElement = document.activeElement;
      if (activeElement && content && content.contains(activeElement)) ; else if (content) {
        if (modal) {
          modal.scrollTop = 0;
        }
        // Focus the modal content wrapper
        content.focus();
      }
    },
    returnFocusTo: function returnFocusTo() {
      // Prefer returnFocus prop over event specified return_focus value
      var el = this.returnFocus || this.return_focus || null;
      if (typeof el === 'string') {
        // CSS Selector
        el = select(el);
      }
      if (el) {
        el = el.$el || el;
        if (isVisible(el)) {
          el.focus();
        }
      }
    },

    // Utility methods
    getScrollbarWidth: function getScrollbarWidth() {
      var scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure';
      document.body.appendChild(scrollDiv);
      this.scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    },
    adjustDialog: function adjustDialog() {
      if (!this.is_visible) {
        return;
      }
      var modal = this.$refs.modal;
      var isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight;
      if (!this.isBodyOverflowing && isModalOverflowing) {
        modal.style.paddingLeft = this.scrollbarWidth + 'px';
      }
      if (this.isBodyOverflowing && !isModalOverflowing) {
        modal.style.paddingRight = this.scrollbarWidth + 'px';
      }
    },
    resetAdjustments: function resetAdjustments() {
      var modal = this.$refs.modal;
      if (modal) {
        modal.style.paddingLeft = '';
        modal.style.paddingRight = '';
      }
    },
    checkScrollbar: function checkScrollbar() {
      var rect = getBCR(document.body);
      this.isBodyOverflowing = rect.left + rect.right < window.innerWidth;
    },
    setScrollbar: function setScrollbar() {
      if (this.isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var computedStyle = window.getComputedStyle;
        var body = document.body;
        var scrollbarWidth = this.scrollbarWidth;
        // Adjust fixed content padding
        selectAll(Selector.FIXED_CONTENT).forEach(function (el) {
          var actualPadding = el.style.paddingRight;
          var calculatedPadding = computedStyle(el).paddingRight || 0;
          setAttr(el, 'data-padding-right', actualPadding);
          el.style.paddingRight = parseFloat(calculatedPadding) + scrollbarWidth + 'px';
        });
        // Adjust sticky content margin
        selectAll(Selector.STICKY_CONTENT).forEach(function (el) {
          var actualMargin = el.style.marginRight;
          var calculatedMargin = computedStyle(el).marginRight || 0;
          setAttr(el, 'data-margin-right', actualMargin);
          el.style.marginRight = parseFloat(calculatedMargin) - scrollbarWidth + 'px';
        });
        // Adjust navbar-toggler margin
        selectAll(Selector.NAVBAR_TOGGLER).forEach(function (el) {
          var actualMargin = el.style.marginRight;
          var calculatedMargin = computedStyle(el).marginRight || 0;
          setAttr(el, 'data-margin-right', actualMargin);
          el.style.marginRight = parseFloat(calculatedMargin) + scrollbarWidth + 'px';
        });
        // Adjust body padding
        var actualPadding = body.style.paddingRight;
        var calculatedPadding = computedStyle(body).paddingRight;
        setAttr(body, 'data-padding-right', actualPadding);
        body.style.paddingRight = parseFloat(calculatedPadding) + scrollbarWidth + 'px';
      }
    },
    resetScrollbar: function resetScrollbar() {
      // Restore fixed content padding
      selectAll(Selector.FIXED_CONTENT).forEach(function (el) {
        if (hasAttr(el, 'data-padding-right')) {
          el.style.paddingRight = getAttr(el, 'data-padding-right') || '';
          removeAttr(el, 'data-padding-right');
        }
      });
      // Restore sticky content and navbar-toggler margin
      selectAll(Selector.STICKY_CONTENT + ', ' + Selector.NAVBAR_TOGGLER).forEach(function (el) {
        if (hasAttr(el, 'data-margin-right')) {
          el.style.marginRight = getAttr(el, 'data-margin-right') || '';
          removeAttr(el, 'data-margin-right');
        }
      });
      // Restore body padding
      var body = document.body;
      if (hasAttr(body, 'data-padding-right')) {
        body.style.paddingRight = getAttr(body, 'data-padding-right') || '';
        removeAttr(body, 'data-padding-right');
      }
    }
  },
  created: function created() {
    // create non-reactive property
    this._observer = null;
  },
  mounted: function mounted() {
    // Measure scrollbar
    this.getScrollbarWidth();
    // Listen for events from others to either open or close ourselves
    this.listenOnRoot('bv::show::modal', this.showHandler);
    this.listenOnRoot('bv::hide::modal', this.hideHandler);
    // Listen for bv:modal::show events, and close ourselves if the opening modal not us
    this.listenOnRoot('bv::modal::show', this.modalListener);
    // Initially show modal?
    if (this.visible === true) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Ensure everything is back to normal
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    this.setResizeEvent(false);
    // Re-adjust body/navbar/fixed padding/margins (if needed)
    removeClass(document.body, 'modal-open');
    this.resetAdjustments();
    this.resetScrollbar();
  }
};

var listenTypes$1 = { click: true };

var bModal$1 = {
  // eslint-disable-next-line no-shadow-restricted-names
  bind: function bind(el, binding, vnode) {
    bindTargets(vnode, binding, listenTypes$1, function (_ref) {
      var targets = _ref.targets,
          vnode = _ref.vnode;

      targets.forEach(function (target) {
        vnode.context.$root.$emit('bv::show::modal', target, vnode.elm);
      });
    });
    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      setAttr(el, 'role', 'button');
    }
  },
  unbind: function unbind(el, binding, vnode) {
    unbindTargets(vnode, binding, listenTypes$1);
    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      removeAttr(el, 'role', 'button');
    }
  }
};

var directives$1 = {
  bModal: bModal$1
};

var VuePlugin$r = {
  install: function install(Vue) {
    registerDirectives(Vue, directives$1);
  }
};

vueUse(VuePlugin$r);

var components$q = {
  bModal: bModal
};

var VuePlugin$s = {
  install: function install(Vue) {
    registerComponents(Vue, components$q);
    Vue.use(VuePlugin$r);
  }
};

vueUse(VuePlugin$s);

var props$A = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  },
  tabs: {
    type: Boolean,
    default: false
  },
  pills: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  isNavBar: {
    type: Boolean,
    default: false
  }
};

var bNav = {
  functional: true,
  props: props$A,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    if (props.isNavBar) {
      warn("b-nav: Prop 'is-nav-bar' is deprecated. Please use component '<b-navbar-nav>' instead.");
    }
    return h(props.tag, mergeData(data, {
      class: {
        'nav': !props.isNavBar,
        'navbar-nav': props.isNavBar,
        'nav-tabs': props.tabs && !props.isNavBar,
        'nav-pills': props.pills && !props.isNavBar,
        'flex-column': props.vertical && !props.isNavBar,
        'nav-fill': props.fill,
        'nav-justified': props.justified
      }
    }), children);
  }
};

var props$B = propsFactory();

var bNavItem = {
  functional: true,
  props: props$B,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h('li', mergeData(data, {
      staticClass: 'nav-item'
    }), [h(bLink, { staticClass: 'nav-link', props: props }, children)]);
  }
};

var props$C = {
  tag: {
    type: String,
    default: 'span'
  }
};

var bNavText = {
  functional: true,
  props: props$C,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, { staticClass: 'navbar-text' }), children);
  }
};

var bNavForm = {
  functional: true,
  props: {
    id: {
      type: String,
      default: null
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(Form, mergeData(data, { attrs: { id: props.id }, props: { inline: true } }), children);
  }
};

var bNavItemDropdown = {
  mixins: [idMixin, dropdownMixin],
  render: function render(h) {
    var button = h('a', {
      class: this.toggleClasses,
      ref: 'toggle',
      attrs: {
        href: '#',
        id: this.safeId('_BV_button_'),
        disabled: this.disabled,
        'aria-haspopup': 'true',
        'aria-expanded': this.visible ? 'true' : 'false'
      },
      on: {
        click: this.toggle,
        keydown: this.toggle // space, enter, down
      }
    }, [this.$slots['button-content'] || this.$slots.text || h('span', { domProps: { innerHTML: this.text } })]);
    var menu = h('div', {
      class: this.menuClasses,
      ref: 'menu',
      attrs: { 'aria-labelledby': this.safeId('_BV_button_') },
      on: {
        mouseover: this.onMouseOver,
        keydown: this.onKeydown // tab, up, down, esc
      }
    }, [this.$slots.default]);
    return h('li', { attrs: { id: this.safeId() }, class: this.dropdownClasses }, [button, menu]);
  },

  computed: {
    isNav: function isNav() {
      // Signal to dropdown mixin that we are in a navbar
      return true;
    },
    dropdownClasses: function dropdownClasses() {
      return ['nav-item', 'b-nav-dropdown', 'dropdown', this.dropup ? 'dropup' : '', this.visible ? 'show' : ''];
    },
    toggleClasses: function toggleClasses() {
      return ['nav-link', this.noCaret ? '' : 'dropdown-toggle', this.disabled ? 'disabled' : '', this.extraToggleClasses ? this.extraToggleClasses : ''];
    },
    menuClasses: function menuClasses() {
      return ['dropdown-menu', this.right ? 'dropdown-menu-right' : 'dropdown-menu-left', this.visible ? 'show' : '', this.extraMenuClasses ? this.extraMenuClasses : ''];
    }
  },
  props: {
    noCaret: {
      type: Boolean,
      default: false
    },
    extraToggleClasses: {
      // Extra Toggle classes
      type: String,
      default: ''
    },
    extraMenuClasses: {
      // Extra Menu classes
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'menu'
    }
  }
};

var components$r = {
  bNav: bNav,
  bNavItem: bNavItem,
  bNavText: bNavText,
  bNavForm: bNavForm,
  bNavItemDropdown: bNavItemDropdown,
  bNavItemDd: bNavItemDropdown,
  bNavDropdown: bNavItemDropdown,
  bNavDd: bNavItemDropdown
};

var VuePlugin$t = {
  install: function install(Vue) {
    registerComponents(Vue, components$r);
    Vue.use(VuePlugin$c);
  }
};

vueUse(VuePlugin$t);

var props$D = {
  tag: {
    type: String,
    default: 'nav'
  },
  type: {
    type: String,
    default: 'light'
  },
  variant: {
    type: String
  },
  toggleable: {
    type: [Boolean, String],
    default: false
  },
  toggleBreakpoint: {
    // Deprecated.  Set toggleable to a string breakpoint
    type: String,
    default: null
  },
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  }
};

var bNavbar = {
  functional: true,
  props: props$D,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var breakpoint = props.toggleBreakpoint || (props.toggleable === true ? 'sm' : props.toggleable) || 'sm';
    return h(props.tag, mergeData(data, {
      staticClass: 'navbar',
      class: (_class = {}, defineProperty(_class, 'navbar-' + props.type, Boolean(props.type)), defineProperty(_class, 'bg-' + props.variant, Boolean(props.variant)), defineProperty(_class, 'fixed-' + props.fixed, Boolean(props.fixed)), defineProperty(_class, 'sticky-top', props.sticky), defineProperty(_class, 'navbar-expand-' + breakpoint, props.toggleable !== false), _class)
    }), children);
  }
};

var props$E = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  }
};

var bNavbarNav = {
  functional: true,
  props: props$E,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      staticClass: 'navbar-nav',
      class: {
        'nav-fill': props.fill,
        'nav-justified': props.justified
      }
    }), children);
  }
};

var linkProps$3 = propsFactory();
linkProps$3.href.default = undefined;
linkProps$3.to.default = undefined;

var props$F = assign(linkProps$3, {
  tag: {
    type: String,
    default: 'div'
  }
});

var bNavbarBrand = {
  functional: true,
  props: props$F,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var isLink = Boolean(props.to || props.href);
    var tag = isLink ? bLink : props.tag;

    return h(tag, mergeData(data, {
      staticClass: 'navbar-brand',
      props: isLink ? pluckProps(linkProps$3, props) : {}
    }), children);
  }
};

var bNavbarToggle = {
  mixins: [listenOnRootMixin],
  render: function render(h) {
    return h('button', {
      class: ['navbar-toggler'],
      attrs: {
        type: 'button',
        'aria-label': this.label,
        'aria-controls': this.target,
        'aria-expanded': this.toggleState ? 'true' : 'false'
      },
      on: { click: this.onClick }
    }, [this.$slots.default || h('span', { class: ['navbar-toggler-icon'] })]);
  },
  data: function data() {
    return {
      toggleState: false
    };
  },

  props: {
    label: {
      type: String,
      default: 'Toggle navigation'
    },
    target: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick: function onClick() {
      this.$root.$emit('bv::toggle::collapse', this.target);
    },
    handleStateEvt: function handleStateEvt(id, state) {
      if (id === this.target) {
        this.toggleState = state;
      }
    }
  },
  created: function created() {
    this.listenOnRoot('bv::collapse::state', this.handleStateEvt);
  }
};

var components$s = {
  bNavbar: bNavbar,
  bNavbarNav: bNavbarNav,
  bNavbarBrand: bNavbarBrand,
  bNavbarToggle: bNavbarToggle,
  bNavToggle: bNavbarToggle
};

var VuePlugin$u = {
  install: function install(Vue) {
    registerComponents(Vue, components$s);
    Vue.use(VuePlugin$t);
    Vue.use(VuePlugin$b);
    Vue.use(VuePlugin$c);
  }
};

vueUse(VuePlugin$u);

/**
 * @param {number} length
 * @return {Array}
 */
var range = (function (length) {
  return Array.apply(null, { length: length });
});

/*
 * Comon props, computed, data, render function, and methods for b-pagination and b-pagination-nav
 */

// Make an array of N to N+X
function makePageArray(startNum, numPages) {
  return range(numPages).map(function (value, index) {
    return { number: index + startNum, className: null };
  });
}

// Threshold of limit size when we start/stop showing ellipsis
var ELLIPSIS_THRESHOLD = 3;

// Props object
var props$G = {
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 5
  },
  size: {
    type: String,
    default: 'md'
  },
  align: {
    type: String,
    default: 'left'
  },
  hideGotoEndButtons: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  labelFirstPage: {
    type: String,
    default: 'Goto first page'
  },
  firstText: {
    type: String,
    default: '&laquo;'
  },
  labelPrevPage: {
    type: String,
    default: 'Goto previous page'
  },
  prevText: {
    type: String,
    default: '&lsaquo;'
  },
  labelNextPage: {
    type: String,
    default: 'Goto next page'
  },
  nextText: {
    type: String,
    default: '&rsaquo;'
  },
  labelLastPage: {
    type: String,
    default: 'Goto last page'
  },
  lastText: {
    type: String,
    default: '&raquo;'
  },
  labelPage: {
    type: String,
    default: 'Goto page'
  },
  hideEllipsis: {
    type: Boolean,
    default: false
  },
  ellipsisText: {
    type: String,
    default: '&hellip;'
  }
};

var paginationMixin = {
  components: { bLink: bLink },
  data: function data() {
    return {
      showFirstDots: false,
      showLastDots: false,
      currentPage: this.value
    };
  },

  props: props$G,
  render: function render(h) {
    var _this = this;

    var buttons = [];

    // Factory function for prev/next/first/last buttons
    var makeEndBtns = function makeEndBtns(linkTo, ariaLabel, btnText, pageTest) {
      var button = void 0;
      pageTest = pageTest || linkTo; // Page # to test against to disable
      if (_this.disabled || _this.isActive(pageTest)) {
        button = h('li', {
          class: ['page-item', 'disabled'],
          attrs: { role: 'none presentation', 'aria-hidden': 'true' }
        }, [h('span', {
          class: ['page-link'],
          domProps: { innerHTML: btnText }
        })]);
      } else {
        button = h('li', {
          class: ['page-item'],
          attrs: { role: 'none presentation' }
        }, [h('b-link', {
          class: ['page-link'],
          props: _this.linkProps(linkTo),
          attrs: {
            role: 'menuitem',
            tabindex: '-1',
            'aria-label': ariaLabel,
            'aria-controls': _this.ariaControls || null
          },
          on: {
            click: function click(evt) {
              _this.onClick(linkTo, evt);
            },
            keydown: function keydown(evt) {
              // Links don't normally respond to SPACE, so we add that functionality
              if (evt.keyCode === KeyCodes.SPACE) {
                evt.preventDefault();
                _this.onClick(linkTo, evt);
              }
            }
          }
        }, [h('span', {
          attrs: { 'aria-hidden': 'true' },
          domProps: { innerHTML: btnText }
        })])]);
      }
      return button;
    };

    // Ellipsis factory
    var makeEllipsis = function makeEllipsis() {
      return h('li', {
        class: ['page-item', 'disabled', 'd-none', 'd-sm-flex'],
        attrs: { role: 'separator' }
      }, [h('span', {
        class: ['page-link'],
        domProps: { innerHTML: _this.ellipsisText }
      })]);
    };

    // Goto First Page button
    buttons.push(this.hideGotoEndButtons ? h(false) : makeEndBtns(1, this.labelFirstPage, this.firstText));

    // Goto Previous page button
    buttons.push(makeEndBtns(this.currentPage - 1, this.labelPrevPage, this.prevText, 1));

    // First Ellipsis Bookend
    buttons.push(this.showFirstDots ? makeEllipsis() : h(false));

    // Individual Page links
    this.pageList.forEach(function (page) {
      var inner = void 0;
      var pageNum = _this.makePage(page.number);
      if (_this.disabled) {
        inner = h('span', {
          class: ['page-link'],
          domProps: { innerHTML: pageNum }
        });
      } else {
        var active = _this.isActive(page.number);
        inner = h('b-link', {
          class: _this.pageLinkClasses(page),
          props: _this.linkProps(page.number),
          attrs: {
            role: 'menuitemradio',
            tabindex: active ? '0' : '-1',
            'aria-controls': _this.ariaControls || null,
            'aria-label': _this.labelPage + ' ' + page.number,
            'aria-checked': active ? 'true' : 'false',
            'aria-posinset': page.number,
            'aria-setsize': _this.numberOfPages
          },
          domProps: { innerHTML: pageNum },
          on: {
            click: function click(evt) {
              _this.onClick(page.number, evt);
            },
            keydown: function keydown(evt) {
              if (evt.keyCode === KeyCodes.SPACE) {
                evt.preventDefault();
                _this.onClick(page.number, evt);
              }
            }
          }
        });
      }
      buttons.push(h('li', {
        key: page.number,
        class: _this.pageItemClasses(page),
        attrs: { role: 'none presentation' }
      }, [inner]));
    });

    // Last Ellipsis Bookend
    buttons.push(this.showLastDots ? makeEllipsis() : h(false));

    // Goto Next page button
    buttons.push(makeEndBtns(this.currentPage + 1, this.labelNextPage, this.nextText, this.numberOfPages));

    // Goto Last Page button
    buttons.push(this.hideGotoEndButtons ? h(false) : makeEndBtns(this.numberOfPages, this.labelLastPage, this.lastText));

    // Assemble the paginatiom buttons
    var pagination = h('ul', {
      ref: 'ul',
      class: ['pagination', 'b-pagination', this.btnSize, this.alignment],
      attrs: {
        role: 'menubar',
        'aria-disabled': this.disabled ? 'true' : 'false',
        'aria-label': this.ariaLabel || null
      },
      on: {
        keydown: function keydown(evt) {
          var keyCode = evt.keyCode;
          var shift = evt.shiftKey;
          if (keyCode === KeyCodes.LEFT) {
            evt.preventDefault();
            shift ? _this.focusFirst() : _this.focusPrev();
          } else if (keyCode === KeyCodes.RIGHT) {
            evt.preventDefault();
            shift ? _this.focusLast() : _this.focusNext();
          }
        }
      }
    }, buttons);

    // if we are pagination-nav, wrap in '<nav>' wrapper
    return this.isNav ? h('nav', {}, [pagination]) : pagination;
  },

  watch: {
    currentPage: function currentPage(newPage, oldPage) {
      if (newPage !== oldPage) {
        this.$emit('input', newPage);
      }
    },
    value: function value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentPage = newValue;
      }
    }
  },
  computed: {
    btnSize: function btnSize() {
      return this.size ? 'pagination-' + this.size : '';
    },
    alignment: function alignment() {
      if (this.align === 'center') {
        return 'justify-content-center';
      } else if (this.align === 'end' || this.align === 'right') {
        return 'justify-content-end';
      }
      return '';
    },
    pageList: function pageList() {
      // Sanity checks
      if (this.currentPage > this.numberOfPages) {
        this.currentPage = this.numberOfPages;
      } else if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      // - Hide first ellipsis marker
      this.showFirstDots = false;
      // - Hide last ellipsis marker
      this.showLastDots = false;
      var numLinks = this.limit;
      var startNum = 1;
      if (this.numberOfPages <= this.limit) {
        // Special Case: Less pages available than the limit of displayed pages
        numLinks = this.numberOfPages;
      } else if (this.currentPage < this.limit - 1 && this.limit > ELLIPSIS_THRESHOLD) {
        // We are near the beginning of the page list
        if (!this.hideEllipsis) {
          numLinks = this.limit - 1;
          this.showLastDots = true;
        }
      } else if (this.numberOfPages - this.currentPage + 2 < this.limit && this.limit > ELLIPSIS_THRESHOLD) {
        // We are near the end of the list
        if (!this.hideEllipsis) {
          this.showFirstDots = true;
          numLinks = this.limit - 1;
        }
        startNum = this.numberOfPages - numLinks + 1;
      } else {
        // We are somewhere in the middle of the page list
        if (this.limit > ELLIPSIS_THRESHOLD && !this.hideEllipsis) {
          this.showFirstDots = true;
          this.showLastDots = true;
          numLinks = this.limit - 2;
        }
        startNum = this.currentPage - Math.floor(numLinks / 2);
      }
      // Sanity checks
      if (startNum < 1) {
        startNum = 1;
      } else if (startNum > this.numberOfPages - numLinks) {
        startNum = this.numberOfPages - numLinks + 1;
      }
      // Generate list of page numbers
      var pages = makePageArray(startNum, numLinks);
      // We limit to a total of 3 page buttons on small screens
      // Ellipsis will also be hidden on small screens
      if (pages.length > 3) {
        var idx = this.currentPage - startNum;
        if (idx === 0) {
          // Keep leftmost 3 buttons visible
          for (var i = 3; i < pages.length; i++) {
            pages[i].className = 'd-none d-sm-flex';
          }
        } else if (idx === pages.length - 1) {
          // Keep rightmost 3 buttons visible
          for (var _i = 0; _i < pages.length - 3; _i++) {
            pages[_i].className = 'd-none d-sm-flex';
          }
        } else {
          // hide left button(s)
          for (var _i2 = 0; _i2 < idx - 1; _i2++) {
            pages[_i2].className = 'd-none d-sm-flex';
          }
          // hide right button(s)
          for (var _i3 = pages.length - 1; _i3 > idx + 1; _i3--) {
            pages[_i3].className = 'd-none d-sm-flex';
          }
        }
      }
      return pages;
    }
  },
  methods: {
    isActive: function isActive(pagenum) {
      return pagenum === this.currentPage;
    },
    pageItemClasses: function pageItemClasses(page) {
      return ['page-item', this.disabled ? 'disabled' : '', this.isActive(page.number) ? 'active' : '', page.className];
    },
    pageLinkClasses: function pageLinkClasses(page) {
      return ['page-link', this.disabled ? 'disabled' : '',
      // Interim workaround to get better focus styling of active button
      // See https://github.com/twbs/bootstrap/issues/24838
      this.isActive(page.number) ? 'btn-primary' : ''];
    },
    getButtons: function getButtons() {
      // Return only buttons that are visible
      return selectAll('a.page-link', this.$el).filter(function (btn) {
        return isVisible(btn);
      });
    },
    setBtnFocus: function setBtnFocus(btn) {
      this.$nextTick(function () {
        btn.focus();
      });
    },
    focusCurrent: function focusCurrent() {
      var _this2 = this;

      var btn = this.getButtons().find(function (el) {
        return parseInt(getAttr(el, 'aria-posinset'), 10) === _this2.currentPage;
      });
      if (btn && btn.focus) {
        this.setBtnFocus(btn);
      } else {
        // Fallback if current page is not in button list
        this.focusFirst();
      }
    },
    focusFirst: function focusFirst() {
      var btn = this.getButtons().find(function (el) {
        return !isDisabled(el);
      });
      if (btn && btn.focus && btn !== document.activeElement) {
        this.setBtnFocus(btn);
      }
    },
    focusLast: function focusLast() {
      var btn = this.getButtons().reverse().find(function (el) {
        return !isDisabled(el);
      });
      if (btn && btn.focus && btn !== document.activeElement) {
        this.setBtnFocus(btn);
      }
    },
    focusPrev: function focusPrev() {
      var buttons = this.getButtons();
      var idx = buttons.indexOf(document.activeElement);
      if (idx > 0 && !isDisabled(buttons[idx - 1]) && buttons[idx - 1].focus) {
        this.setBtnFocus(buttons[idx - 1]);
      }
    },
    focusNext: function focusNext() {
      var buttons = this.getButtons();
      var idx = buttons.indexOf(document.activeElement);
      var cnt = buttons.length - 1;
      if (idx < cnt && !isDisabled(buttons[idx + 1]) && buttons[idx + 1].focus) {
        this.setBtnFocus(buttons[idx + 1]);
      }
    }
  }
};

var props$H = {
  perPage: {
    type: Number,
    default: 20
  },
  totalRows: {
    type: Number,
    default: 20
  },
  ariaControls: {
    type: String,
    default: null
  }

  // Our render function is brought in from the pagination mixin
};var bPagination = {
  mixins: [paginationMixin],
  props: props$H,
  computed: {
    numberOfPages: function numberOfPages() {
      var result = Math.ceil(this.totalRows / this.perPage);
      return result < 1 ? 1 : result;
    }
  },
  methods: {
    // These methods are used by the render function
    onClick: function onClick(num, evt) {
      var _this = this;

      // Handle edge cases where number of pages has changed (i.e. if perPage changes)
      if (num > this.numberOfPages) {
        num = this.numberOfPages;
      } else if (num < 1) {
        num = 1;
      }
      this.currentPage = num;
      this.$nextTick(function () {
        // Keep the current button focused if possible
        var target = evt.target;
        if (isVisible(target) && _this.$el.contains(target) && target.focus) {
          target.focus();
        } else {
          _this.focusCurrent();
        }
      });
      this.$emit('change', this.currentPage);
    },
    makePage: function makePage(pagenum) {
      return pagenum;
    },
    linkProps: function linkProps(pagenum) {
      return { href: '#' };
    }
  }
};

var components$t = {
  bPagination: bPagination
};

var VuePlugin$v = {
  install: function install(Vue) {
    registerComponents(Vue, components$t);
  }
};

vueUse(VuePlugin$v);

// Props needed for router links
var routerProps = pickLinkProps('activeClass', 'exactActiveClass', 'append', 'exact', 'replace', 'target', 'rel');

// Props object
var props$I = assign(
// pagination-nav specific props
{
  numberOfPages: {
    type: Number,
    default: 1
  },
  baseUrl: {
    type: String,
    default: '/'
  },
  useRouter: {
    type: Boolean,
    default: false
  },
  linkGen: {
    type: Function,
    default: null
  },
  pageGen: {
    type: Function,
    default: null
  }
},
// Router specific props
routerProps);
// Our render function is brought in via the pagination mixin
var bPaginationNav = {
  mixins: [paginationMixin],
  props: props$I,
  computed: {
    // Used by render function to trigger wraping in '<nav>' element
    isNav: function isNav() {
      return true;
    }
  },
  methods: {
    onClick: function onClick(pageNum, evt) {
      this.currentPage = pageNum;
    },
    makePage: function makePage(pagenum) {
      if (this.pageGen && typeof this.pageGen === 'function') {
        return this.pageGen(pagenum);
      }
      return pagenum;
    },
    makeLink: function makeLink(pagenum) {
      if (this.linkGen && typeof this.linkGen === 'function') {
        return this.linkGen(pagenum);
      }
      var link = '' + this.baseUrl + pagenum;
      return this.useRouter ? { path: link } : link;
    },
    linkProps: function linkProps(pagenum) {
      var link = this.makeLink(pagenum);
      var props = {
        href: typeof link === 'string' ? link : void 0,
        target: this.target || null,
        rel: this.rel || null,
        disabled: this.disabled
      };
      if (this.useRouter || (typeof link === 'undefined' ? 'undefined' : _typeof(link)) === 'object') {
        props = assign(props, {
          to: link,
          exact: this.exact,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          append: this.append,
          replace: this.replace
        });
      }
      return props;
    }
  }
};

var components$u = {
  bPaginationNav: bPaginationNav
};

var VuePlugin$w = {
  install: function install(Vue) {
    registerComponents(Vue, components$u);
  }
};

vueUse(VuePlugin$w);

var NAME = 'tooltip';
var CLASS_PREFIX = 'bs-tooltip';
var BSCLS_PREFIX_REGEX = new RegExp('\\b' + CLASS_PREFIX + '\\S+', 'g');

var TRANSITION_DURATION = 150;

// Modal $root hidden event
var MODAL_CLOSE_EVENT = 'bv::modal::hidden';
// Modal container for appending tip/popover
var MODAL_CLASS = '.modal-content';

var AttachmentMap$1 = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOPLEFT: 'top',
  TOPRIGHT: 'top',
  RIGHTTOP: 'right',
  RIGHTBOTTOM: 'right',
  BOTTOMLEFT: 'bottom',
  BOTTOMRIGHT: 'bottom',
  LEFTTOP: 'left',
  LEFTBOTTOM: 'left'
};

var OffsetMap = {
  AUTO: 0,
  TOPLEFT: -1,
  TOP: 0,
  TOPRIGHT: +1,
  RIGHTTOP: -1,
  RIGHT: 0,
  RIGHTBOTTOM: +1,
  BOTTOMLEFT: -1,
  BOTTOM: 0,
  BOTTOMRIGHT: +1,
  LEFTTOP: -1,
  LEFT: 0,
  LEFTBOTTOM: +1
};

var HoverState = {
  SHOW: 'show',
  OUT: 'out'
};

var ClassName = {
  FADE: 'fade',
  SHOW: 'show'
};

var Selector$1 = {
  TOOLTIP: '.tooltip',
  TOOLTIP_INNER: '.tooltip-inner',
  ARROW: '.arrow'

  // ESLINT: Not used
  // const Trigger = {
  //   HOVER: 'hover',
  //   FOCUS: 'focus',
  //   CLICK: 'click',
  //   BLUR: 'blur',
  //   MANUAL: 'manual'
  // }

};var Defaults$1 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  placement: 'top',
  offset: 0,
  arrowPadding: 6,
  container: false,
  fallbackPlacement: 'flip',
  callbacks: {},
  boundary: 'scrollParent'

  // Transition Event names
};var TransitionEndEvents$1 = {
  WebkitTransition: ['webkitTransitionEnd'],
  MozTransition: ['transitionend'],
  OTransition: ['otransitionend', 'oTransitionEnd'],
  transition: ['transitionend']

  // Client Side Tip ID counter for aria-describedby attribute
  // Could use Alex's uid generator util
  // Each tooltip requires a unique client side ID
};var NEXTID = 1;
/* istanbul ignore next */
function generateId(name) {
  return '__BV_' + name + '_' + NEXTID++ + '__';
}

/*
 * ToolTip Class definition
 */
/* istanbul ignore next: difficult to test in Jest/JSDOM environment */

var ToolTip = function () {
  // Main constructor
  function ToolTip(element, config, $root) {
    classCallCheck(this, ToolTip);

    // New tooltip object
    this.$isEnabled = true;
    this.$fadeTimeout = null;
    this.$hoverTimeout = null;
    this.$visibleInterval = null;
    this.$hoverState = '';
    this.$activeTrigger = {};
    this.$popper = null;
    this.$element = element;
    this.$tip = null;
    this.$id = generateId(this.constructor.NAME);
    this.$root = $root || null;
    this.$routeWatcher = null;
    // We use a bound version of the following handlers for root/modal listeners to maintain the 'this' context
    this.$forceHide = this.forceHide.bind(this);
    this.$doHide = this.doHide.bind(this);
    this.$doShow = this.doShow.bind(this);
    this.$doDisable = this.doDisable.bind(this);
    this.$doEnable = this.doEnable.bind(this);
    // Set the configuration
    this.updateConfig(config);
  }

  // NOTE: Overridden by PopOver class


  createClass(ToolTip, [{
    key: 'updateConfig',


    // Update config
    value: function updateConfig(config) {
      // Merge config into defaults. We use "this" here because PopOver overrides Default
      var updatedConfig = assign({}, this.constructor.Default, config);

      // Sanitize delay
      if (config.delay && typeof config.delay === 'number') {
        updatedConfig.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      // Title for tooltip and popover
      if (config.title && typeof config.title === 'number') {
        updatedConfig.title = config.title.toString();
      }

      // Content only for popover
      if (config.content && typeof config.content === 'number') {
        updatedConfig.content = config.content.toString();
      }

      // Hide element original title if needed
      this.fixTitle();
      // Update the config
      this.$config = updatedConfig;
      // Stop/Restart listening
      this.unListen();
      this.listen();
    }

    // Destroy this instance

  }, {
    key: 'destroy',
    value: function destroy() {
      // Stop listening to trigger events
      this.unListen();
      // Disable while open listeners/watchers
      this.setWhileOpenListeners(false);
      // Clear any timeouts
      clearTimeout(this.$hoverTimeout);
      this.$hoverTimeout = null;
      clearTimeout(this.$fadeTimeout);
      this.$fadeTimeout = null;
      // Remove popper
      if (this.$popper) {
        this.$popper.destroy();
      }
      this.$popper = null;
      // Remove tip from document
      if (this.$tip && this.$tip.parentElement) {
        this.$tip.parentElement.removeChild(this.$tip);
      }
      this.$tip = null;
      // Null out other properties
      this.$id = null;
      this.$isEnabled = null;
      this.$root = null;
      this.$element = null;
      this.$config = null;
      this.$hoverState = null;
      this.$activeTrigger = null;
      this.$forceHide = null;
      this.$doHide = null;
      this.$doShow = null;
      this.$doDisable = null;
      this.$doEnable = null;
    }
  }, {
    key: 'enable',
    value: function enable() {
      // Create a non-cancelable BvEvent
      var enabledEvt = new BvEvent('enabled', {
        cancelable: false,
        target: this.$element,
        relatedTarget: null
      });
      this.$isEnabled = true;
      this.emitEvent(enabledEvt);
    }
  }, {
    key: 'disable',
    value: function disable() {
      // Create a non-cancelable BvEvent
      var disabledEvt = new BvEvent('disabled', {
        cancelable: false,
        target: this.$element,
        relatedTarget: null
      });
      this.$isEnabled = false;
      this.emitEvent(disabledEvt);
    }

    // Click toggler

  }, {
    key: 'toggle',
    value: function toggle(event) {
      if (!this.$isEnabled) {
        return;
      }
      if (event) {
        this.$activeTrigger.click = !this.$activeTrigger.click;

        if (this.isWithActiveTrigger()) {
          this.enter(null);
        } else {
          this.leave(null);
        }
      } else {
        if (hasClass(this.getTipElement(), ClassName.SHOW)) {
          this.leave(null);
        } else {
          this.enter(null);
        }
      }
    }

    // Show tooltip

  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      if (!document.body.contains(this.$element) || !isVisible(this.$element)) {
        // If trigger element isn't in the DOM or is not visible
        return;
      }
      // Build tooltip element (also sets this.$tip)
      var tip = this.getTipElement();
      this.fixTitle();
      this.setContent(tip);
      if (!this.isWithContent(tip)) {
        // if No content, don't bother showing
        this.$tip = null;
        return;
      }

      // Set ID on tip and aria-describedby on element
      setAttr(tip, 'id', this.$id);
      this.addAriaDescribedby();

      // Set animation on or off
      if (this.$config.animation) {
        addClass(tip, ClassName.FADE);
      } else {
        removeClass(tip, ClassName.FADE);
      }

      var placement = this.getPlacement();
      var attachment = this.constructor.getAttachment(placement);
      this.addAttachmentClass(attachment);

      // Create a cancelable BvEvent
      var showEvt = new BvEvent('show', {
        cancelable: true,
        target: this.$element,
        relatedTarget: tip
      });
      this.emitEvent(showEvt);
      if (showEvt.defaultPrevented) {
        // Don't show if event cancelled
        this.$tip = null;
        return;
      }

      // Insert tooltip if needed
      var container = this.getContainer();
      if (!document.body.contains(tip)) {
        container.appendChild(tip);
      }

      // Refresh popper
      this.removePopper();
      this.$popper = new Popper(this.$element, tip, this.getPopperConfig(placement, tip));

      // Transitionend Callback
      var complete = function complete() {
        if (_this.$config.animation) {
          _this.fixTransition(tip);
        }
        var prevHoverState = _this.$hoverState;
        _this.$hoverState = null;
        if (prevHoverState === HoverState.OUT) {
          _this.leave(null);
        }
        // Create a non-cancelable BvEvent
        var shownEvt = new BvEvent('shown', {
          cancelable: false,
          target: _this.$element,
          relatedTarget: tip
        });
        _this.emitEvent(shownEvt);
      };

      // Enable while open listeners/watchers
      this.setWhileOpenListeners(true);

      // Show tip
      addClass(tip, ClassName.SHOW);

      // Start the transition/animation
      this.transitionOnce(tip, complete);
    }

    // handler for periodic visibility check

  }, {
    key: 'visibleCheck',
    value: function visibleCheck(on) {
      var _this2 = this;

      clearInterval(this.$visibleInterval);
      this.$visibleInterval = null;
      if (on) {
        this.$visibleInterval = setInterval(function () {
          var tip = _this2.getTipElement();
          if (tip && !isVisible(_this2.$element) && hasClass(tip, ClassName.SHOW)) {
            // Element is no longer visible, so force-hide the tooltip
            _this2.forceHide();
          }
        }, 100);
      }
    }
  }, {
    key: 'setWhileOpenListeners',
    value: function setWhileOpenListeners(on) {
      // Modal close events
      this.setModalListener(on);
      // Periodic $element visibility check
      // For handling when tip is in <keepalive>, tabs, carousel, etc
      this.visibleCheck(on);
      // Route change events
      this.setRouteWatcher(on);
      // Ontouch start listeners
      this.setOnTouchStartListener(on);
      if (on && /(focus|blur)/.test(this.$config.trigger)) {
        // If focus moves between trigger element and tip container, dont close
        eventOn(this.$tip, 'focusout', this);
      } else {
        eventOff(this.$tip, 'focusout', this);
      }
    }

    // force hide of tip (internal method)

  }, {
    key: 'forceHide',
    value: function forceHide() {
      if (!this.$tip || !hasClass(this.$tip, ClassName.SHOW)) {
        return;
      }
      // Disable while open listeners/watchers
      this.setWhileOpenListeners(false);
      // Clear any hover enter/leave event
      clearTimeout(this.$hoverTimeout);
      this.$hoverTimeout = null;
      this.$hoverState = '';
      // Hide the tip
      this.hide(null, true);
    }

    // Hide tooltip

  }, {
    key: 'hide',
    value: function hide(callback, force) {
      var _this3 = this;

      var tip = this.$tip;
      if (!tip) {
        return;
      }

      // Create a canelable BvEvent
      var hideEvt = new BvEvent('hide', {
        // We disable cancelling if force is true
        cancelable: !force,
        target: this.$element,
        relatedTarget: tip
      });
      this.emitEvent(hideEvt);
      if (hideEvt.defaultPrevented) {
        // Don't hide if event cancelled
        return;
      }

      // Transitionend Callback
      /* istanbul ignore next */
      var complete = function complete() {
        if (_this3.$hoverState !== HoverState.SHOW && tip.parentNode) {
          // Remove tip from dom, and force recompile on next show
          tip.parentNode.removeChild(tip);
          _this3.removeAriaDescribedby();
          _this3.removePopper();
          _this3.$tip = null;
        }
        if (callback) {
          callback();
        }
        // Create a non-cancelable BvEvent
        var hiddenEvt = new BvEvent('hidden', {
          cancelable: false,
          target: _this3.$element,
          relatedTarget: null
        });
        _this3.emitEvent(hiddenEvt);
      };

      // Disable while open listeners/watchers
      this.setWhileOpenListeners(false);

      // If forced close, disable animation
      if (force) {
        removeClass(tip, ClassName.FADE);
      }
      // Hide tip
      removeClass(tip, ClassName.SHOW);

      this.$activeTrigger.click = false;
      this.$activeTrigger.focus = false;
      this.$activeTrigger.hover = false;

      // Start the hide transition
      this.transitionOnce(tip, complete);

      this.$hoverState = '';
    }
  }, {
    key: 'emitEvent',
    value: function emitEvent(evt) {
      var evtName = evt.type;
      if (this.$root && this.$root.$emit) {
        // Emit an event on $root
        this.$root.$emit('bv::' + this.constructor.NAME + '::' + evtName, evt);
      }
      var callbacks = this.$config.callbacks || {};
      if (typeof callbacks[evtName] === 'function') {
        callbacks[evtName](evt);
      }
    }
  }, {
    key: 'getContainer',
    value: function getContainer() {
      var container = this.$config.container;
      var body = document.body;
      // If we are in a modal, we append to the modal instead of body, unless a container is specified
      return container === false ? closest(MODAL_CLASS, this.$element) || body : select(container, body) || body;
    }

    // Will be overritten by popover if needed

  }, {
    key: 'addAriaDescribedby',
    value: function addAriaDescribedby() {
      // Add aria-describedby on trigger element, without removing any other IDs
      var desc = getAttr(this.$element, 'aria-describedby') || '';
      desc = desc.split(/\s+/).concat(this.$id).join(' ').trim();
      setAttr(this.$element, 'aria-describedby', desc);
    }

    // Will be overritten by popover if needed

  }, {
    key: 'removeAriaDescribedby',
    value: function removeAriaDescribedby() {
      var _this4 = this;

      var desc = getAttr(this.$element, 'aria-describedby') || '';
      desc = desc.split(/\s+/).filter(function (d) {
        return d !== _this4.$id;
      }).join(' ').trim();
      if (desc) {
        setAttr(this.$element, 'aria-describedby', desc);
      } else {
        removeAttr(this.$element, 'aria-describedby');
      }
    }
  }, {
    key: 'removePopper',
    value: function removePopper() {
      if (this.$popper) {
        this.$popper.destroy();
      }
      this.$popper = null;
    }

    /* istanbul ignore next */

  }, {
    key: 'transitionOnce',
    value: function transitionOnce(tip, complete) {
      var _this5 = this;

      var transEvents = this.getTransitionEndEvents();
      var called = false;
      clearTimeout(this.$fadeTimeout);
      this.$fadeTimeout = null;
      var fnOnce = function fnOnce() {
        if (called) {
          return;
        }
        called = true;
        clearTimeout(_this5.$fadeTimeout);
        _this5.$fadeTimeout = null;
        transEvents.forEach(function (evtName) {
          eventOff(tip, evtName, fnOnce);
        });
        // Call complete callback
        complete();
      };
      if (hasClass(tip, ClassName.FADE)) {
        transEvents.forEach(function (evtName) {
          eventOn(tip, evtName, fnOnce);
        });
        // Fallback to setTimeout
        this.$fadeTimeout = setTimeout(fnOnce, TRANSITION_DURATION);
      } else {
        fnOnce();
      }
    }

    // What transitionend event(s) to use? (returns array of event names)

  }, {
    key: 'getTransitionEndEvents',
    value: function getTransitionEndEvents() {
      for (var name in TransitionEndEvents$1) {
        if (this.$element.style[name] !== undefined) {
          return TransitionEndEvents$1[name];
        }
      }
      // fallback
      return [];
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.$popper !== null) {
        this.$popper.scheduleUpdate();
      }
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'isWithContent',
    value: function isWithContent(tip) {
      tip = tip || this.$tip;
      if (!tip) {
        return false;
      }
      return Boolean((select(Selector$1.TOOLTIP_INNER, tip) || {}).innerHTML);
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'addAttachmentClass',
    value: function addAttachmentClass(attachment) {
      addClass(this.getTipElement(), CLASS_PREFIX + '-' + attachment);
    }
  }, {
    key: 'getTipElement',
    value: function getTipElement() {
      if (!this.$tip) {
        // Try and compile user supplied template, or fallback to default template
        this.$tip = this.compileTemplate(this.$config.template) || this.compileTemplate(this.constructor.Default.template);
      }
      // Add tab index so tip can be focused, and to allow it to be set as relatedTargt in focusin/out events
      this.$tip.tabIndex = -1;
      return this.$tip;
    }
  }, {
    key: 'compileTemplate',
    value: function compileTemplate(html) {
      if (!html || typeof html !== 'string') {
        return null;
      }
      var div = document.createElement('div');
      div.innerHTML = html.trim();
      var node = div.firstElementChild ? div.removeChild(div.firstElementChild) : null;
      div = null;
      return node;
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'setContent',
    value: function setContent(tip) {
      this.setElementContent(select(Selector$1.TOOLTIP_INNER, tip), this.getTitle());
      removeClass(tip, ClassName.FADE);
      removeClass(tip, ClassName.SHOW);
    }
  }, {
    key: 'setElementContent',
    value: function setElementContent(container, content) {
      if (!container) {
        // If container element doesn't exist, just return
        return;
      }
      var allowHtml = this.$config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && content.nodeType) {
        // content is a DOM node
        if (allowHtml) {
          if (content.parentElement !== container) {
            container.innerHtml = '';
            container.appendChild(content);
          }
        } else {
          container.innerText = content.innerText;
        }
      } else {
        // We have a plain HTML string or Text
        container[allowHtml ? 'innerHTML' : 'innerText'] = content;
      }
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'getTitle',
    value: function getTitle() {
      var title = this.$config.title || '';
      if (typeof title === 'function') {
        // Call the function to get the title value
        title = title(this.$element);
      }
      if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object' && title.nodeType && !title.innerHTML.trim()) {
        // We have a DOM node, but without inner content, so just return empty string
        title = '';
      }
      if (typeof title === 'string') {
        title = title.trim();
      }
      if (!title) {
        // If an explicit title is not given, try element's title atributes
        title = getAttr(this.$element, 'title') || getAttr(this.$element, 'data-original-title') || '';
        title = title.trim();
      }

      return title;
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this6 = this;

      var triggers = this.$config.trigger.trim().split(/\s+/);
      var el = this.$element;

      // Listen for global show/hide events
      this.setRootListener(true);

      // Using 'this' as the handler will get automagically directed to this.handleEvent
      // And maintain our binding to 'this'
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          eventOn(el, 'click', _this6);
        } else if (trigger === 'focus') {
          eventOn(el, 'focusin', _this6);
          eventOn(el, 'focusout', _this6);
        } else if (trigger === 'blur') {
          // Used to close $tip when element looses focus
          eventOn(el, 'focusout', _this6);
        } else if (trigger === 'hover') {
          eventOn(el, 'mouseenter', _this6);
          eventOn(el, 'mouseleave', _this6);
        }
      }, this);
    }
  }, {
    key: 'unListen',
    value: function unListen() {
      var _this7 = this;

      var events = ['click', 'focusin', 'focusout', 'mouseenter', 'mouseleave'];
      // Using "this" as the handler will get automagically directed to this.handleEvent
      events.forEach(function (evt) {
        eventOff(_this7.$element, evt, _this7);
      }, this);

      // Stop listening for global show/hide/enable/disable events
      this.setRootListener(false);
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      // This special method allows us to use "this" as the event handlers
      if (isDisabled(this.$element)) {
        // If disabled, don't do anything. Note: if tip is shown before element gets
        // disabled, then tip not close until no longer disabled or forcefully closed.
        return;
      }
      if (!this.$isEnabled) {
        // If not enable
        return;
      }
      var type = e.type;
      var target = e.target;
      var relatedTarget = e.relatedTarget;
      var $element = this.$element;
      var $tip = this.$tip;
      if (type === 'click') {
        this.toggle(e);
      } else if (type === 'focusin' || type === 'mouseenter') {
        this.enter(e);
      } else if (type === 'focusout') {
        // target is the element which is loosing focus
        // And relatedTarget is the element gaining focus
        if ($tip && $element && $element.contains(target) && $tip.contains(relatedTarget)) {
          // If focus moves from $element to $tip, don't trigger a leave
          return;
        }
        if ($tip && $element && $tip.contains(target) && $element.contains(relatedTarget)) {
          // If focus moves from $tip to $element, don't trigger a leave
          return;
        }
        if ($tip && $tip.contains(target) && $tip.contains(relatedTarget)) {
          // If focus moves within $tip, don't trigger a leave
          return;
        }
        if ($element && $element.contains(target) && $element.contains(relatedTarget)) {
          // If focus moves within $element, don't trigger a leave
          return;
        }
        // Otherwise trigger a leave
        this.leave(e);
      } else if (type === 'mouseleave') {
        this.leave(e);
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'setRouteWatcher',
    value: function setRouteWatcher(on) {
      var _this8 = this;

      if (on) {
        this.setRouteWatcher(false);
        if (this.$root && Boolean(this.$root.$route)) {
          this.$routeWatcher = this.$root.$watch('$route', function (newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            // If route has changed, we force hide the tooltip/popover
            _this8.forceHide();
          });
        }
      } else {
        if (this.$routeWatcher) {
          // cancel the route watcher by calling hte stored reference
          this.$routeWatcher();
          this.$routeWatcher = null;
        }
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'setModalListener',
    value: function setModalListener(on) {
      var modal = closest(MODAL_CLASS, this.$element);
      if (!modal) {
        // If we are not in a modal, don't worry. be happy
        return;
      }
      // We can listen for modal hidden events on $root
      if (this.$root) {
        this.$root[on ? '$on' : '$off'](MODAL_CLOSE_EVENT, this.$forceHide);
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'setRootListener',
    value: function setRootListener(on) {
      // Listen for global 'bv::{hide|show}::{tooltip|popover}' hide request event
      if (this.$root) {
        this.$root[on ? '$on' : '$off']('bv::hide::' + this.constructor.NAME, this.$doHide);
        this.$root[on ? '$on' : '$off']('bv::show::' + this.constructor.NAME, this.$doShow);
        this.$root[on ? '$on' : '$off']('bv::disable::' + this.constructor.NAME, this.$doDisable);
        this.$root[on ? '$on' : '$off']('bv::enable::' + this.constructor.NAME, this.$doEnable);
      }
    }
  }, {
    key: 'doHide',
    value: function doHide(id) {
      // Programmatically hide tooltip or popover
      if (!id) {
        // Close all tooltips or popovers
        this.forceHide();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Close this specific tooltip or popover
        this.hide();
      }
    }
  }, {
    key: 'doShow',
    value: function doShow(id) {
      // Programmatically show tooltip or popover
      if (!id) {
        // Open all tooltips or popovers
        this.show();
      } else if (id && this.$element && this.$element.id && this.$element.id === id) {
        // Show this specific tooltip or popover
        this.show();
      }
    }
  }, {
    key: 'doDisable',
    value: function doDisable(id) {
      // Programmatically disable tooltip or popover
      if (!id) {
        // Disable all tooltips or popovers
        this.disable();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Disable this specific tooltip or popover
        this.disable();
      }
    }
  }, {
    key: 'doEnable',
    value: function doEnable(id) {
      // Programmatically enable tooltip or popover
      if (!id) {
        // Enable all tooltips or popovers
        this.enable();
      } else if (this.$element && this.$element.id && this.$element.id === id) {
        // Enable this specific tooltip or popover
        this.enable();
      }
    }

    /* istanbul ignore next */

  }, {
    key: 'setOnTouchStartListener',
    value: function setOnTouchStartListener(on) {
      var _this9 = this;

      // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        from(document.body.children).forEach(function (el) {
          if (on) {
            eventOn(el, 'mouseover', _this9._noop);
          } else {
            eventOff(el, 'mouseover', _this9._noop);
          }
        });
      }
    }

    /* istanbul ignore next */

  }, {
    key: '_noop',
    value: function _noop() {
      // Empty noop handler for ontouchstart devices
    }
  }, {
    key: 'fixTitle',
    value: function fixTitle() {
      var el = this.$element;
      var titleType = _typeof(getAttr(el, 'data-original-title'));
      if (getAttr(el, 'title') || titleType !== 'string') {
        setAttr(el, 'data-original-title', getAttr(el, 'title') || '');
        setAttr(el, 'title', '');
      }
    }

    // Enter handler
    /* istanbul ignore next */

  }, {
    key: 'enter',
    value: function enter(e) {
      var _this10 = this;

      if (e) {
        this.$activeTrigger[e.type === 'focusin' ? 'focus' : 'hover'] = true;
      }
      if (hasClass(this.getTipElement(), ClassName.SHOW) || this.$hoverState === HoverState.SHOW) {
        this.$hoverState = HoverState.SHOW;
        return;
      }
      clearTimeout(this.$hoverTimeout);
      this.$hoverState = HoverState.SHOW;
      if (!this.$config.delay || !this.$config.delay.show) {
        this.show();
        return;
      }
      this.$hoverTimeout = setTimeout(function () {
        if (_this10.$hoverState === HoverState.SHOW) {
          _this10.show();
        }
      }, this.$config.delay.show);
    }

    // Leave handler
    /* istanbul ignore next */

  }, {
    key: 'leave',
    value: function leave(e) {
      var _this11 = this;

      if (e) {
        this.$activeTrigger[e.type === 'focusout' ? 'focus' : 'hover'] = false;
        if (e.type === 'focusout' && /blur/.test(this.$config.trigger)) {
          // Special case for `blur`: we clear out the other triggers
          this.$activeTrigger.click = false;
          this.$activeTrigger.hover = false;
        }
      }
      if (this.isWithActiveTrigger()) {
        return;
      }
      clearTimeout(this.$hoverTimeout);
      this.$hoverState = HoverState.OUT;
      if (!this.$config.delay || !this.$config.delay.hide) {
        this.hide();
        return;
      }
      this.$hoverTimeout = setTimeout(function () {
        if (_this11.$hoverState === HoverState.OUT) {
          _this11.hide();
        }
      }, this.$config.delay.hide);
    }
  }, {
    key: 'getPopperConfig',
    value: function getPopperConfig(placement, tip) {
      var _this12 = this;

      return {
        placement: this.constructor.getAttachment(placement),
        modifiers: {
          offset: { offset: this.getOffset(placement, tip) },
          flip: { behavior: this.$config.fallbackPlacement },
          arrow: { element: '.arrow' },
          preventOverflow: { boundariesElement: this.$config.boundary }
        },
        onCreate: function onCreate(data) {
          // Handle flipping arrow classes
          if (data.originalPlacement !== data.placement) {
            _this12.handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          // Handle flipping arrow classes
          _this12.handlePopperPlacementChange(data);
        }
      };
    }
  }, {
    key: 'getOffset',
    value: function getOffset(placement, tip) {
      if (!this.$config.offset) {
        var arrow = select(Selector$1.ARROW, tip);
        var arrowOffset = parseFloat(getCS(arrow).width) + parseFloat(this.$config.arrowPadding);
        switch (OffsetMap[placement.toUpperCase()]) {
          case +1:
            return '+50%p - ' + arrowOffset + 'px';
          case -1:
            return '-50%p + ' + arrowOffset + 'px';
          default:
            return 0;
        }
      }
      return this.$config.offset;
    }
  }, {
    key: 'getPlacement',
    value: function getPlacement() {
      var placement = this.$config.placement;
      if (typeof placement === 'function') {
        return placement.call(this, this.$tip, this.$element);
      }
      return placement;
    }
  }, {
    key: 'isWithActiveTrigger',
    value: function isWithActiveTrigger() {
      for (var trigger in this.$activeTrigger) {
        if (this.$activeTrigger[trigger]) {
          return true;
        }
      }
      return false;
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'cleanTipClass',
    value: function cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.className.match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        tabClass.forEach(function (cls) {
          removeClass(tip, cls);
        });
      }
    }
  }, {
    key: 'handlePopperPlacementChange',
    value: function handlePopperPlacementChange(data) {
      this.cleanTipClass();
      this.addAttachmentClass(this.constructor.getAttachment(data.placement));
    }
  }, {
    key: 'fixTransition',
    value: function fixTransition(tip) {
      var initConfigAnimation = this.$config.animation || false;
      if (getAttr(tip, 'x-placement') !== null) {
        return;
      }
      removeClass(tip, ClassName.FADE);
      this.$config.animation = false;
      this.hide();
      this.show();
      this.$config.animation = initConfigAnimation;
    }
  }], [{
    key: 'getAttachment',
    value: function getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    }
  }, {
    key: 'Default',
    get: function get$$1() {
      return Defaults$1;
    }

    // NOTE: Overridden by PopOver class

  }, {
    key: 'NAME',
    get: function get$$1() {
      return NAME;
    }
  }]);
  return ToolTip;
}();

var NAME$1 = 'popover';
var CLASS_PREFIX$1 = 'bs-popover';
var BSCLS_PREFIX_REGEX$1 = new RegExp('\\b' + CLASS_PREFIX$1 + '\\S+', 'g');

var Defaults$2 = assign({}, ToolTip.Default, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var ClassName$1 = {
  FADE: 'fade',
  SHOW: 'show'
};

var Selector$2 = {
  TITLE: '.popover-header',
  CONTENT: '.popover-body'

  /* istanbul ignore next: dificult to test in Jest/JSDOM environment */
};
var PopOver = function (_ToolTip) {
  inherits(PopOver, _ToolTip);

  function PopOver() {
    classCallCheck(this, PopOver);
    return possibleConstructorReturn(this, (PopOver.__proto__ || Object.getPrototypeOf(PopOver)).apply(this, arguments));
  }

  createClass(PopOver, [{
    key: 'isWithContent',


    // Method overrides

    value: function isWithContent(tip) {
      tip = tip || this.$tip;
      if (!tip) {
        return false;
      }
      var hasTitle = Boolean((select(Selector$2.TITLE, tip) || {}).innerHTML);
      var hasContent = Boolean((select(Selector$2.CONTENT, tip) || {}).innerHTML);
      return hasTitle || hasContent;
    }
  }, {
    key: 'addAttachmentClass',
    value: function addAttachmentClass(attachment) {
      addClass(this.getTipElement(), CLASS_PREFIX$1 + '-' + attachment);
    }
  }, {
    key: 'setContent',
    value: function setContent(tip) {
      // we use append for html objects to maintain js events/components
      this.setElementContent(select(Selector$2.TITLE, tip), this.getTitle());
      this.setElementContent(select(Selector$2.CONTENT, tip), this.getContent());

      removeClass(tip, ClassName$1.FADE);
      removeClass(tip, ClassName$1.SHOW);
    }

    // This method may look identical to ToolTip version, but it uses a different RegEx defined above

  }, {
    key: 'cleanTipClass',
    value: function cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.className.match(BSCLS_PREFIX_REGEX$1);
      if (tabClass !== null && tabClass.length > 0) {
        tabClass.forEach(function (cls) {
          removeClass(tip, cls);
        });
      }
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      var title = this.$config.title || '';
      if (typeof title === 'function') {
        title = title(this.$element);
      }
      if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object' && title.nodeType && !title.innerHTML.trim()) {
        // We have a dom node, but without inner content, so just return an empty string
        title = '';
      }
      if (typeof title === 'string') {
        title = title.trim();
      }
      if (!title) {
        // Try and grab element's title attribute
        title = getAttr(this.$element, 'title') || getAttr(this.$element, 'data-original-title') || '';
        title = title.trim();
      }
      return title;
    }

    // New methods

  }, {
    key: 'getContent',
    value: function getContent() {
      var content = this.$config.content || '';
      if (typeof content === 'function') {
        content = content(this.$element);
      }
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && content.nodeType && !content.innerHTML.trim()) {
        // We have a dom node, but without inner content, so just return an empty string
        content = '';
      }
      if (typeof content === 'string') {
        content = content.trim();
      }
      return content;
    }
  }], [{
    key: 'Default',

    // Getter overrides

    get: function get$$1() {
      return Defaults$2;
    }
  }, {
    key: 'NAME',
    get: function get$$1() {
      return NAME$1;
    }
  }]);
  return PopOver;
}(ToolTip);

// Polyfills for SSR

var isSSR = typeof window === 'undefined';

var HTMLElement = isSSR ? Object : window.HTMLElement;

/*
 * Tooltip/Popover component mixin
 * Common props
 */

var PLACEMENTS = {
  top: 'top',
  topleft: 'topleft',
  topright: 'topright',
  right: 'right',
  righttop: 'righttop',
  rightbottom: 'rightbottom',
  bottom: 'bottom',
  bottomleft: 'bottomleft',
  bottomright: 'bottomright',
  left: 'left',
  lefttop: 'lefttop',
  leftbottom: 'leftbottom',
  auto: 'auto'
};

var OBSERVER_CONFIG$1 = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['class', 'style']
};

var toolpopMixin = {
  props: {
    target: {
      // String ID of element, or element/component reference
      type: [String, Object, HTMLElement, Function]
    },
    delay: {
      type: [Number, Object, String],
      default: 0
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    noFade: {
      type: Boolean,
      default: false
    },
    container: {
      // String ID of container, if null body is used (default)
      type: String,
      default: null
    },
    boundary: {
      // String: scrollParent, window, or viewport
      // Element: element reference
      type: [String, Object],
      default: 'scrollParent'
    },
    show: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function show(_show, old) {
      if (_show === old) {
        return;
      }
      _show ? this.onOpen() : this.onClose();
    },
    disabled: function disabled(_disabled, old) {
      if (_disabled === old) {
        return;
      }
      _disabled ? this.onDisable() : this.onEnable();
    }
  },
  created: function created() {
    // Create non-reactive property
    this._toolpop = null;
    this._obs_title = null;
    this._obs_content = null;
  },
  mounted: function mounted() {
    var _this = this;

    // We do this in a next tick to ensure DOM has rendered first
    this.$nextTick(function () {
      // Instantiate ToolTip/PopOver on target
      // The createToolpop method must exist in main component
      if (_this.createToolpop()) {
        if (_this.disabled) {
          // Initially disabled
          _this.onDisable();
        }
        // Listen to open signals from others
        _this.$on('open', _this.onOpen);
        // Listen to close signals from others
        _this.$on('close', _this.onClose);
        // Listen to disable signals from others
        _this.$on('disable', _this.onDisable);
        // Listen to disable signals from others
        _this.$on('enable', _this.onEnable);
        // Observe content Child changes so we can notify popper of possible size change
        _this.setObservers(true);
        // Set intially open state
        if (_this.show) {
          _this.onOpen();
        }
      }
    });
  },
  updated: function updated() {
    // If content/props changes, etc
    if (this._toolpop) {
      this._toolpop.updateConfig(this.getConfig());
    }
  },

  /* istanbul ignore next: not easy to test */
  activated: function activated() {
    // Called when component is inside a <keep-alive> and component brought offline
    this.setObservers(true);
  },

  /* istanbul ignore next: not easy to test */
  deactivated: function deactivated() {
    // Called when component is inside a <keep-alive> and component taken offline
    if (this._toolpop) {
      this.setObservers(false);
      this._toolpop.hide();
    }
  },

  /* istanbul ignore next: not easy to test */
  beforeDestroy: function beforeDestroy() {
    // Shutdown our local event listeners
    this.$off('open', this.onOpen);
    this.$off('close', this.onClose);
    this.$off('disable', this.onDisable);
    this.$off('enable', this.onEnable);
    this.setObservers(false);
    // bring our content back if needed
    this.bringItBack();
    if (this._toolpop) {
      this._toolpop.destroy();
      this._toolpop = null;
    }
  },

  computed: {
    baseConfig: function baseConfig() {
      var cont = this.container;
      var delay = _typeof(this.delay) === 'object' ? this.delay : parseInt(this.delay, 10) || 0;
      return {
        // Title prop
        title: (this.title || '').trim() || '',
        // Contnt prop (if popover)
        content: (this.content || '').trim() || '',
        // Tooltip/Popover placement
        placement: PLACEMENTS[this.placement] || 'auto',
        // Container curently needs to be an ID with '#' prepended, if null then body is used
        container: cont ? /^#/.test(cont) ? cont : '#' + cont : false,
        // boundariesElement passed to popper
        boundary: this.boundary,
        // Show/Hide delay
        delay: delay || 0,
        // Offset can be css distance. if no units, pixels are assumed
        offset: this.offset || 0,
        // Disable fade Animation?
        animation: !this.noFade,
        // Open/Close Trigger(s)
        trigger: isArray(this.triggers) ? this.triggers.join(' ') : this.triggers,
        // Callbacks so we can trigger events on component
        callbacks: {
          show: this.onShow,
          shown: this.onShown,
          hide: this.onHide,
          hidden: this.onHidden,
          enabled: this.onEnabled,
          disabled: this.onDisabled
        }
      };
    }
  },
  methods: {
    getConfig: function getConfig() {
      var cfg = assign({}, this.baseConfig);
      if (this.$refs.title && this.$refs.title.innerHTML.trim()) {
        // If slot has content, it overrides 'title' prop
        // We use the DOM node as content to allow components!
        cfg.title = this.$refs.title;
        cfg.html = true;
      }
      if (this.$refs.content && this.$refs.content.innerHTML.trim()) {
        // If slot has content, it overrides 'content' prop
        // We use the DOM node as content to allow components!
        cfg.content = this.$refs.content;
        cfg.html = true;
      }
      return cfg;
    },
    onOpen: function onOpen() {
      if (this._toolpop) {
        this._toolpop.show();
      }
    },
    onClose: function onClose(callback) {
      if (this._toolpop) {
        this._toolpop.hide(callback);
      } else if (typeof callback === 'function') {
        callback();
      }
    },
    onDisable: function onDisable() {
      if (this._toolpop) {
        this._toolpop.disable();
      }
    },
    onEnable: function onEnable() {
      if (this._toolpop) {
        this._toolpop.enable();
      }
    },
    updatePosition: function updatePosition() {
      if (this._toolpop) {
        // Instruct popper to reposition popover if necessary
        this._toolpop.update();
      }
    },
    getTarget: function getTarget() {
      var target = this.target;
      if (typeof target === 'function') {
        target = target();
      }
      if (typeof target === 'string') {
        // Assume ID of element
        return getById(target);
      } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && isElement(target.$el)) {
        // Component reference
        return target.$el;
      } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && isElement(target)) {
        // Element reference
        return target;
      }
      return null;
    },
    onShow: function onShow(evt) {
      this.$emit('show', evt);
    },
    onShown: function onShown(evt) {
      this.setObservers(true);
      this.$emit('update:show', true);
      this.$emit('shown', evt);
    },
    onHide: function onHide(evt) {
      this.$emit('hide', evt);
    },
    onHidden: function onHidden(evt) {
      this.setObservers(false);
      // bring our content back if needed to keep Vue happy
      // Tooltip class will move it back to tip when shown again
      this.bringItBack();
      this.$emit('update:show', false);
      this.$emit('hidden', evt);
    },
    onEnabled: function onEnabled(evt) {
      if (!evt || evt.type !== 'enabled') {
        // Prevent possible endless loop if user mistakienly fires enabled instead of enable
        return;
      }
      this.$emit('update:disabled', false);
      this.$emit('disabled');
    },
    onDisabled: function onDisabled(evt) {
      if (!evt || evt.type !== 'disabled') {
        // Prevent possible endless loop if user mistakienly fires disabled instead of disable
        return;
      }
      this.$emit('update:disabled', true);
      this.$emit('enabled');
    },
    bringItBack: function bringItBack() {
      // bring our content back if needed to keep Vue happy
      if (this.$el && this.$refs.title) {
        this.$el.appendChild(this.$refs.title);
      }
      if (this.$el && this.$refs.content) {
        this.$el.appendChild(this.$refs.content);
      }
    },

    /* istanbul ignore next: not easy to test */
    setObservers: function setObservers(on) {
      if (on) {
        if (this.$refs.title) {
          this._obs_title = observeDOM(this.$refs.title, this.updatePosition.bind(this), OBSERVER_CONFIG$1);
        }
        if (this.$refs.content) {
          this._obs_content = observeDOM(this.$refs.content, this.updatePosition.bind(this), OBSERVER_CONFIG$1);
        }
      } else {
        if (this._obs_title) {
          this._obs_title.disconnect();
          this._obs_title = null;
        }
        if (this._obs_content) {
          this._obs_content.disconnect();
          this._obs_content = null;
        }
      }
    }
  }
};

var bPopover = {
  mixins: [toolpopMixin],
  render: function render(h) {
    return h('div', {
      class: ['d-none'],
      style: { display: 'none' },
      attrs: { 'aria-hidden': true }
    }, [h('div', { ref: 'title' }, this.$slots.title), h('div', { ref: 'content' }, this.$slots.default)]);
  },
  data: function data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'click'
    },
    placement: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      if (target) {
        this._toolpop = new PopOver(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        warn("b-popover: 'target' element not found!");
      }
      return this._toolpop;
    }
  }
};

var components$v = {
  bPopover: bPopover
};

var VuePlugin$x = {
  install: function install(Vue) {
    registerComponents(Vue, components$v);
  }
};

vueUse(VuePlugin$x);

var bProgressBar = {
  render: function render(h) {
    var childNodes = h(false);
    if (this.$slots.default) {
      childNodes = this.$slots.default;
    } else if (this.label) {
      childNodes = h('span', { domProps: { innerHTML: this.label } });
    } else if (this.computedShowProgress) {
      childNodes = this.progress.toFixed(this.computedPrecision);
    } else if (this.computedShowValue) {
      childNodes = this.value.toFixed(this.computedPrecision);
    }
    return h('div', {
      class: this.progressBarClasses,
      style: this.progressBarStyles,
      attrs: {
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': this.computedMax.toString(),
        'aria-valuenow': this.value.toFixed(this.computedPrecision)
      }
    }, [childNodes]);
  },

  computed: {
    progressBarClasses: function progressBarClasses() {
      return ['progress-bar', this.computedVariant ? 'bg-' + this.computedVariant : '', this.computedStriped || this.computedAnimated ? 'progress-bar-striped' : '', this.computedAnimated ? 'progress-bar-animated' : ''];
    },
    progressBarStyles: function progressBarStyles() {
      return {
        width: 100 * (this.value / this.computedMax) + '%'
      };
    },
    progress: function progress() {
      var p = Math.pow(10, this.computedPrecision);
      return Math.round(100 * p * this.value / this.computedMax) / p;
    },
    computedMax: function computedMax() {
      // Prefer our max over parent setting
      return typeof this.max === 'number' ? this.max : this.$parent.max || 100;
    },
    computedVariant: function computedVariant() {
      // Prefer our variant over parent setting
      return this.variant || this.$parent.variant;
    },
    computedPrecision: function computedPrecision() {
      // Prefer our precision over parent setting
      return typeof this.precision === 'number' ? this.precision : this.$parent.precision || 0;
    },
    computedStriped: function computedStriped() {
      // Prefer our striped over parent setting
      return typeof this.striped === 'boolean' ? this.striped : this.$parent.striped || false;
    },
    computedAnimated: function computedAnimated() {
      // Prefer our animated over parent setting
      return typeof this.animated === 'boolean' ? this.animated : this.$parent.animated || false;
    },
    computedShowProgress: function computedShowProgress() {
      // Prefer our showProgress over parent setting
      return typeof this.showProgress === 'boolean' ? this.showProgress : this.$parent.showProgress || false;
    },
    computedShowValue: function computedShowValue() {
      // Prefer our showValue over parent setting
      return typeof this.showValue === 'boolean' ? this.showValue : this.$parent.showValue || false;
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: null
    },
    // $parent prop values take precedence over the following props
    // Which is why they are defaulted to null
    max: {
      type: Number,
      default: null
    },
    precision: {
      type: Number,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: null
    },
    animated: {
      type: Boolean,
      default: null
    },
    showProgress: {
      type: Boolean,
      default: null
    },
    showValue: {
      type: Boolean,
      default: null
    }
  }
};

var bProgress = {
  components: { bProgressBar: bProgressBar },
  render: function render(h) {
    var childNodes = this.$slots.default;
    if (!childNodes) {
      childNodes = h('b-progress-bar', {
        props: {
          value: this.value,
          max: this.max,
          precision: this.precision,
          variant: this.variant,
          animated: this.animated,
          striped: this.striped,
          showProgress: this.showProgress,
          showValue: this.showValue
        }
      });
    }
    return h('div', { class: ['progress'], style: this.progressHeight }, [childNodes]);
  },

  props: {
    // These props can be inherited via the child b-progress-bar(s)
    variant: {
      type: String,
      default: null
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    precision: {
      type: Number,
      default: 0
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    },
    // This prop is not inherited by child b-progress-bar(s)
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressHeight: function progressHeight() {
      return { height: this.height || null };
    }
  }
};

var components$w = {
  bProgress: bProgress,
  bProgressBar: bProgressBar
};

var VuePlugin$y = {
  install: function install(Vue) {
    registerComponents(Vue, components$w);
  }
};

vueUse(VuePlugin$y);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = '[\'\u2019]',
    rsAstral = '[' + rsAstralRange + ']',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')', rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr, rsUpper + '+' + rsOptUpperContr, rsDigits, rsEmoji].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C', '\xe7': 'c',
  '\xd0': 'D', '\xf0': 'd',
  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N', '\xf1': 'n',
  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C', '\u0108': 'C', '\u010A': 'C', '\u010C': 'C',
  '\u0107': 'c', '\u0109': 'c', '\u010B': 'c', '\u010D': 'c',
  '\u010E': 'D', '\u0110': 'D', '\u010F': 'd', '\u0111': 'd',
  '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011A': 'E',
  '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011B': 'e',
  '\u011C': 'G', '\u011E': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011D': 'g', '\u011F': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I', '\u012A': 'I', '\u012C': 'I', '\u012E': 'I', '\u0130': 'I',
  '\u0129': 'i', '\u012B': 'i', '\u012D': 'i', '\u012F': 'i', '\u0131': 'i',
  '\u0134': 'J', '\u0135': 'j',
  '\u0136': 'K', '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L', '\u013B': 'L', '\u013D': 'L', '\u013F': 'L', '\u0141': 'L',
  '\u013A': 'l', '\u013C': 'l', '\u013E': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014A': 'N',
  '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014B': 'n',
  '\u014C': 'O', '\u014E': 'O', '\u0150': 'O',
  '\u014D': 'o', '\u014F': 'o', '\u0151': 'o',
  '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
  '\u015A': 'S', '\u015C': 'S', '\u015E': 'S', '\u0160': 'S',
  '\u015B': 's', '\u015D': 's', '\u015F': 's', '\u0161': 's',
  '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't', '\u0165': 't', '\u0167': 't',
  '\u0168': 'U', '\u016A': 'U', '\u016C': 'U', '\u016E': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u', '\u016B': 'u', '\u016D': 'u', '\u016F': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W', '\u0175': 'w',
  '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z', '\u017B': 'Z', '\u017D': 'Z',
  '\u017A': 'z', '\u017C': 'z', '\u017E': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017F': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function (string) {
    string = toString(string);

    var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;

    var chr = strSymbols ? strSymbols[0] : string.charAt(0);

    var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = createCompounder(function (result, word, index) {
  return result + (index ? ' ' : '') + upperFirst$1(word);
});

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst$1 = createCaseFirst('toUpperCase');

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var lodash_startcase = startCase;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag$1 = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol$1 = root$1.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root$1, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol$1 ? _Symbol$1.prototype : undefined,
    symbolToString$1 = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol$1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray$1(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize$1(function (string) {
  string = toString$1(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize$1.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$2(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$2(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString$1(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var lodash_get = get$1;

/*
 * Consitant and stable sort function across JavsaScript platforms
 *
 * Inconsistant sorts can cause SSR problems between client and server
 * such as in <b-table> if sortBy is applied to the data on server side render.
 * Chrome and V8 native sorts are inconsistant/unstable
 *
 * This function uses native sort with fallback to index compare when the a and b
 * compare returns 0
 *
 * Algorithm bsaed on:
 * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
 *
 * @param {array} array to sort
 * @param {function} sortcompare function
 * @return {array}
 */

function stableSort(array, compareFn) {
  // Using `.bind(compareFn)` on the wrapped anonymous function improves
  // performance by avoiding the function call setup. We don't use an arrow
  // function here as it binds `this` to the `stableSort` context rather than
  // the `compareFn` context, which wouldn't give us the performance increase.
  return array.map(function (a, index) {
    return [index, a];
  }).sort(function (a, b) {
    return this(a[1], b[1]) || a[0] - b[0];
  }.bind(compareFn)).map(function (e) {
    return e[1];
  });
}

function toString$2(v) {
  if (!v) {
    return '';
  }
  if (v instanceof Object) {
    return keys(v).map(function (k) {
      return toString$2(v[k]);
    }).join(' ');
  }
  return String(v);
}

function recToString(obj) {
  if (!(obj instanceof Object)) {
    return '';
  }
  return toString$2(keys(obj).reduce(function (o, k) {
    // Ignore fields that start with _
    if (!/^_/.test(k)) {
      o[k] = obj[k];
    }
    return o;
  }, {}));
}

function defaultSortCompare(a, b, sortBy) {
  if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
    return a[sortBy] < b[sortBy] && -1 || a[sortBy] > b[sortBy] && 1 || 0;
  }
  return toString$2(a[sortBy]).localeCompare(toString$2(b[sortBy]), undefined, {
    numeric: true
  });
}

function processField(key, value) {
  var field = null;
  if (typeof value === 'string') {
    // Label shortcut
    field = { key: key, label: value };
  } else if (typeof value === 'function') {
    // Formatter shortcut
    field = { key: key, formatter: value };
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    field = assign({}, value);
    field.key = field.key || key;
  } else if (value !== false) {
    // Fallback to just key
    field = { key: key };
  }
  return field;
}

var bTable = {
  mixins: [idMixin, listenOnRootMixin],
  render: function render(h) {
    var _this = this;

    var $slots = this.$slots;
    var $scoped = this.$scopedSlots;
    var fields = this.computedFields;
    var items = this.computedItems;

    // Build the caption
    var caption = h(false);
    if (this.caption || $slots['table-caption']) {
      var data = { style: this.captionStyles };
      if (!$slots['table-caption']) {
        data.domProps = { innerHTML: this.caption };
      }
      caption = h('caption', data, $slots['table-caption']);
    }

    // Build the colgroup
    var colgroup = $slots['table-colgroup'] ? h('colgroup', {}, $slots['table-colgroup']) : h(false);

    // factory function for thead and tfoot cells (th's)
    var makeHeadCells = function makeHeadCells() {
      var isFoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      return fields.map(function (field, colIndex) {
        var data = {
          key: field.key,
          class: _this.fieldClasses(field),
          style: field.thStyle || {},
          attrs: {
            tabindex: field.sortable ? '0' : null,
            abbr: field.headerAbbr || null,
            title: field.headerTitle || null,
            'aria-colindex': String(colIndex + 1),
            'aria-label': field.sortable ? _this.localSortDesc && _this.localSortBy === field.key ? _this.labelSortAsc : _this.labelSortDesc : null,
            'aria-sort': field.sortable && _this.localSortBy === field.key ? _this.localSortDesc ? 'descending' : 'ascending' : null
          },
          on: {
            click: function click(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              _this.headClicked(evt, field);
            },
            keydown: function keydown(evt) {
              var keyCode = evt.keyCode;
              if (keyCode === KeyCodes.ENTER || keyCode === KeyCodes.SPACE) {
                evt.stopPropagation();
                evt.preventDefault();
                _this.headClicked(evt, field);
              }
            }
          }
        };
        var slot = isFoot && $scoped['FOOT_' + field.key] ? $scoped['FOOT_' + field.key] : $scoped['HEAD_' + field.key];
        if (slot) {
          slot = [slot({ label: field.label, column: field.key, field: field })];
        } else {
          data.domProps = { innerHTML: field.label };
        }
        return h('th', data, slot);
      });
    };

    // Build the thead
    var thead = h(false);
    if (this.isStacked !== true) {
      // If in always stacked mode (this.isStacked === true), then we don't bother rendering the thead
      thead = h('thead', { class: this.headClasses }, [h('tr', { class: this.theadTrClass }, makeHeadCells(false))]);
    }

    // Build the tfoot
    var tfoot = h(false);
    if (this.footClone && this.isStacked !== true) {
      // If in always stacked mode (this.isStacked === true), then we don't bother rendering the tfoot
      tfoot = h('tfoot', { class: this.footClasses }, [h('tr', { class: this.tfootTrClass }, makeHeadCells(true))]);
    }

    // Prepare the tbody rows
    var rows = [];

    // Add static Top Row slot (hidden in visibly stacked mode as we can't control the data-label)
    // If in always stacked mode, we don't bother rendering the row
    if ($scoped['top-row'] && this.isStacked !== true) {
      rows.push(h('tr', { key: 'top-row', class: ['b-table-top-row', this.tbodyTrClass] }, [$scoped['top-row']({ columns: fields.length, fields: fields })]));
    } else {
      rows.push(h(false));
    }

    // Add the item data rows
    items.forEach(function (item, rowIndex) {
      var detailsSlot = $scoped['row-details'];
      var rowShowDetails = Boolean(item._showDetails && detailsSlot);
      var detailsId = rowShowDetails ? _this.safeId('_details_' + rowIndex + '_') : null;
      var toggleDetailsFn = function toggleDetailsFn() {
        if (detailsSlot) {
          _this.$set(item, '_showDetails', !item._showDetails);
        }
      };
      // For each item data field in row
      var tds = fields.map(function (field, colIndex) {
        var data = {
          key: 'row-' + rowIndex + '-cell-' + colIndex,
          class: _this.tdClasses(field, item),
          attrs: _this.tdAttrs(field, item, colIndex),
          domProps: {}
        };
        var childNodes = void 0;
        if ($scoped[field.key]) {
          childNodes = [$scoped[field.key]({
            item: item,
            index: rowIndex,
            field: field,
            unformatted: lodash_get(item, field.key),
            value: _this.getFormattedValue(item, field),
            toggleDetails: toggleDetailsFn,
            detailsShowing: Boolean(item._showDetails)
          })];
          if (_this.isStacked) {
            // We wrap in a DIV to ensure rendered as a single cell when visually stacked!
            childNodes = [h('div', {}, [childNodes])];
          }
        } else {
          var formatted = _this.getFormattedValue(item, field);
          if (_this.isStacked) {
            // We innerHTML a DIV to ensure rendered as a single cell when visually stacked!
            childNodes = [h('div', formatted)];
          } else {
            // Non stacked
            childNodes = formatted;
          }
        }
        // Render either a td or th cell
        return h(field.isRowHeader ? 'th' : 'td', data, childNodes);
      });
      // Calculate the row number in the dataset (indexed from 1)
      var ariaRowIndex = null;
      if (_this.currentPage && _this.perPage && _this.perPage > 0) {
        ariaRowIndex = (_this.currentPage - 1) * _this.perPage + rowIndex + 1;
      }
      // Assemble and add the row
      rows.push(h('tr', {
        key: 'row-' + rowIndex,
        class: [_this.rowClasses(item), { 'b-table-has-details': rowShowDetails }],
        attrs: {
          'aria-describedby': detailsId,
          'aria-rowindex': ariaRowIndex,
          role: _this.isStacked ? 'row' : null
        },
        on: {
          click: function click(evt) {
            _this.rowClicked(evt, item, rowIndex);
          },
          dblclick: function dblclick(evt) {
            _this.rowDblClicked(evt, item, rowIndex);
          },
          mouseenter: function mouseenter(evt) {
            _this.rowHovered(evt, item, rowIndex);
          }
        }
      }, tds));
      // Row Details slot
      if (rowShowDetails) {
        var tdAttrs = { colspan: String(fields.length) };
        var trAttrs = { id: detailsId };
        if (_this.isStacked) {
          tdAttrs['role'] = 'cell';
          trAttrs['role'] = 'row';
        }
        var details = h('td', { attrs: tdAttrs }, [detailsSlot({
          item: item,
          index: rowIndex,
          fields: fields,
          toggleDetails: toggleDetailsFn
        })]);
        rows.push(h('tr', {
          key: 'details-' + rowIndex,
          class: ['b-table-details', _this.tbodyTrClass],
          attrs: trAttrs
        }, [details]));
      } else if (detailsSlot) {
        // Only add the placeholder if a the table has a row-details slot defined (but not shown)
        rows.push(h(false));
      }
    });

    // Empty Items / Empty Filtered Row slot
    if (this.showEmpty && (!items || items.length === 0)) {
      var empty = this.filter ? $slots['emptyfiltered'] : $slots['empty'];
      if (!empty) {
        empty = h('div', {
          class: ['text-center', 'my-2'],
          domProps: { innerHTML: this.filter ? this.emptyFilteredText : this.emptyText }
        });
      }
      empty = h('td', {
        attrs: {
          colspan: String(fields.length),
          role: this.isStacked ? 'cell' : null
        }
      }, [h('div', { attrs: { role: 'alert', 'aria-live': 'polite' } }, [empty])]);
      rows.push(h('tr', {
        key: 'empty-row',
        class: ['b-table-empty-row', this.tbodyTrClass],
        attrs: this.isStacked ? { role: 'row' } : {}
      }, [empty]));
    } else {
      rows.push(h(false));
    }

    // Static bottom row slot (hidden in visibly stacked mode as we can't control the data-label)
    // If in always stacked mode, we don't bother rendering the row
    if ($scoped['bottom-row'] && this.isStacked !== true) {
      rows.push(h('tr', { key: 'bottom-row', class: ['b-table-bottom-row', this.tbodyTrClass] }, [$scoped['bottom-row']({ columns: fields.length, fields: fields })]));
    } else {
      rows.push(h(false));
    }

    // Assemble the rows into the tbody
    var tbody = h('tbody', { class: this.bodyClasses, attrs: this.isStacked ? { role: 'rowgroup' } : {} }, rows);

    // Assemble table
    var table = h('table', {
      class: this.tableClasses,
      attrs: {
        id: this.safeId(),
        role: this.isStacked ? 'table' : null,
        'aria-busy': this.computedBusy ? 'true' : 'false',
        'aria-colcount': String(fields.length),
        'aria-rowcount': this.$attrs['aria-rowcount'] || this.items.length > this.perPage ? this.items.length : null
      }
    }, [caption, colgroup, thead, tfoot, tbody]);

    // Add responsive wrapper if needed and return table
    return this.isResponsive ? h('div', { class: this.responsiveClass }, [table]) : table;
  },
  data: function data() {
    return {
      localSortBy: this.sortBy || '',
      localSortDesc: this.sortDesc || false,
      localItems: [],
      // Note: filteredItems only used to determine if # of items changed
      filteredItems: [],
      localBusy: false
    };
  },

  props: {
    items: {
      type: [Array, Function],
      default: function _default() {
        return [];
      }
    },
    fields: {
      type: [Object, Array],
      default: null
    },
    sortBy: {
      type: String,
      default: null
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc',
      validator: function validator(direction) {
        return arrayIncludes(['asc', 'desc', 'last'], direction);
      }
    },
    caption: {
      type: String,
      default: null
    },
    captionTop: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: function _default() {
        if (this && typeof this.inverse === 'boolean') {
          // Deprecate inverse
          warn("b-table: prop 'inverse' has been deprecated. Use 'dark' instead");
          return this.dark;
        }
        return false;
      }
    },
    inverse: {
      // Deprecated in v1.0.0 in favor of `dark`
      type: Boolean,
      default: null
    },
    hover: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    footClone: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: [Boolean, String],
      default: false
    },
    headVariant: {
      type: String,
      default: ''
    },
    footVariant: {
      type: String,
      default: ''
    },
    theadClass: {
      type: [String, Array],
      default: null
    },
    theadTrClass: {
      type: [String, Array],
      default: null
    },
    tbodyClass: {
      type: [String, Array],
      default: null
    },
    tbodyTrClass: {
      type: [String, Array],
      default: null
    },
    tfootClass: {
      type: [String, Array],
      default: null
    },
    tfootTrClass: {
      type: [String, Array],
      default: null
    },
    perPage: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    filter: {
      type: [String, RegExp, Function],
      default: null
    },
    sortCompare: {
      type: Function,
      default: null
    },
    noLocalSorting: {
      type: Boolean,
      default: false
    },
    noProviderPaging: {
      type: Boolean,
      default: false
    },
    noProviderSorting: {
      type: Boolean,
      default: false
    },
    noProviderFiltering: {
      type: Boolean,
      default: false
    },
    noSortReset: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    labelSortAsc: {
      type: String,
      default: 'Click to sort Ascending'
    },
    labelSortDesc: {
      type: String,
      default: 'Click to sort Descending'
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'There are no records to show'
    },
    emptyFilteredText: {
      type: String,
      default: 'There are no records matching your request'
    },
    apiUrl: {
      // Passthrough prop. Passed to the context object. Not used by b-table directly
      type: String,
      default: ''
    }
  },
  watch: {
    items: function items(newVal, oldVal) {
      if (oldVal !== newVal) {
        this._providerUpdate();
      }
    },
    context: function context(newVal, oldVal) {
      if (!looseEqual(newVal, oldVal)) {
        this.$emit('context-changed', newVal);
      }
    },
    filteredItems: function filteredItems(newVal, oldVal) {
      if (this.localFiltering && newVal.length !== oldVal.length) {
        // Emit a filtered notification event, as number of filtered items has changed
        this.$emit('filtered', newVal);
      }
    },
    sortDesc: function sortDesc(newVal, oldVal) {
      if (newVal === this.localSortDesc) {
        return;
      }
      this.localSortDesc = newVal || false;
    },
    localSortDesc: function localSortDesc(newVal, oldVal) {
      // Emit update to sort-desc.sync
      if (newVal !== oldVal) {
        this.$emit('update:sortDesc', newVal);
        if (!this.noProviderSorting) {
          this._providerUpdate();
        }
      }
    },
    sortBy: function sortBy(newVal, oldVal) {
      if (newVal === this.localSortBy) {
        return;
      }
      this.localSortBy = newVal || null;
    },
    localSortBy: function localSortBy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:sortBy', newVal);
        if (!this.noProviderSorting) {
          this._providerUpdate();
        }
      }
    },
    perPage: function perPage(newVal, oldVal) {
      if (oldVal !== newVal && !this.noProviderPaging) {
        this._providerUpdate();
      }
    },
    currentPage: function currentPage(newVal, oldVal) {
      if (oldVal !== newVal && !this.noProviderPaging) {
        this._providerUpdate();
      }
    },
    filter: function filter(newVal, oldVal) {
      if (oldVal !== newVal && !this.noProviderFiltering) {
        this._providerUpdate();
      }
    },
    localBusy: function localBusy(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('update:busy', newVal);
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.localSortBy = this.sortBy;
    this.localSortDesc = this.sortDesc;
    if (this.hasProvider) {
      this._providerUpdate();
    }
    this.listenOnRoot('bv::refresh::table', function (id) {
      if (id === _this2.id || id === _this2) {
        _this2._providerUpdate();
      }
    });
  },

  computed: {
    isStacked: function isStacked() {
      return this.stacked === '' ? true : this.stacked;
    },
    isResponsive: function isResponsive() {
      var responsive = this.responsive === '' ? true : this.responsive;
      return this.isStacked ? false : responsive;
    },
    responsiveClass: function responsiveClass() {
      return this.isResponsive === true ? 'table-responsive' : this.isResponsive ? 'table-responsive-' + this.responsive : '';
    },
    tableClasses: function tableClasses() {
      return ['table', 'b-table', this.striped ? 'table-striped' : '', this.hover ? 'table-hover' : '', this.dark ? 'table-dark' : '', this.bordered ? 'table-bordered' : '', this.small ? 'table-sm' : '', this.outlined ? 'border' : '', this.fixed ? 'b-table-fixed' : '', this.isStacked === true ? 'b-table-stacked' : this.isStacked ? 'b-table-stacked-' + this.stacked : ''];
    },
    headClasses: function headClasses() {
      return [this.headVariant ? 'thead-' + this.headVariant : '', this.theadClass];
    },
    bodyClasses: function bodyClasses() {
      return [this.tbodyClass];
    },
    footClasses: function footClasses() {
      var variant = this.footVariant || this.headVariant || null;
      return [variant ? 'thead-' + variant : '', this.tfootClass];
    },
    captionStyles: function captionStyles() {
      // Move caption to top
      return this.captionTop ? { captionSide: 'top' } : {};
    },
    hasProvider: function hasProvider() {
      return this.items instanceof Function;
    },
    localFiltering: function localFiltering() {
      return this.hasProvider ? this.noProviderFiltering : true;
    },
    localSorting: function localSorting() {
      return this.hasProvider ? this.noProviderSorting : !this.noLocalSorting;
    },
    localPaging: function localPaging() {
      return this.hasProvider ? this.noProviderPaging : true;
    },
    context: function context() {
      return {
        perPage: this.perPage,
        currentPage: this.currentPage,
        filter: this.filter,
        sortBy: this.localSortBy,
        sortDesc: this.localSortDesc,
        apiUrl: this.apiUrl
      };
    },
    computedFields: function computedFields() {
      var _this3 = this;

      // We normalize fields into an array of objects
      // [ { key:..., label:..., ...}, {...}, ..., {..}]
      var fields = [];
      if (isArray(this.fields)) {
        // Normalize array Form
        this.fields.filter(function (f) {
          return f;
        }).forEach(function (f) {
          if (typeof f === 'string') {
            fields.push({ key: f, label: lodash_startcase(f) });
          } else if ((typeof f === 'undefined' ? 'undefined' : _typeof(f)) === 'object' && f.key && typeof f.key === 'string') {
            // Full object definition. We use assign so that we don't mutate the original
            fields.push(assign({}, f));
          } else if ((typeof f === 'undefined' ? 'undefined' : _typeof(f)) === 'object' && keys(f).length === 1) {
            // Shortcut object (i.e. { 'foo_bar': 'This is Foo Bar' }
            var key = keys(f)[0];
            var field = processField(key, f[key]);
            if (field) {
              fields.push(field);
            }
          }
        });
      } else if (this.fields && _typeof(this.fields) === 'object' && keys(this.fields).length > 0) {
        // Normalize object Form
        keys(this.fields).forEach(function (key) {
          var field = processField(key, _this3.fields[key]);
          if (field) {
            fields.push(field);
          }
        });
      }
      // If no field provided, take a sample from first record (if exits)
      if (fields.length === 0 && this.computedItems.length > 0) {
        var sample = this.computedItems[0];
        var ignoredKeys = ['_rowVariant', '_cellVariants', '_showDetails'];
        keys(sample).forEach(function (k) {
          if (!ignoredKeys.includes(k)) {
            fields.push({ key: k, label: lodash_startcase(k) });
          }
        });
      }
      // Ensure we have a unique array of fields and that they have String labels
      var memo = {};
      return fields.filter(function (f) {
        if (!memo[f.key]) {
          memo[f.key] = true;
          f.label = typeof f.label === 'string' ? f.label : lodash_startcase(f.key);
          return true;
        }
        return false;
      });
    },
    computedItems: function computedItems() {
      // Grab some props/data to ensure reactivity
      var perPage = this.perPage;
      var currentPage = this.currentPage;
      var filter = this.filter;
      var sortBy = this.localSortBy;
      var sortDesc = this.localSortDesc;
      var sortCompare = this.sortCompare;
      var localFiltering = this.localFiltering;
      var localSorting = this.localSorting;
      var localPaging = this.localPaging;
      var items = this.hasProvider ? this.localItems : this.items;
      if (!items) {
        this.$nextTick(this._providerUpdate);
        return [];
      }
      // Array copy for sorting, filtering, etc.
      items = items.slice();
      // Apply local filter
      if (filter && localFiltering) {
        if (filter instanceof Function) {
          items = items.filter(filter);
        } else {
          var regex = void 0;
          if (filter instanceof RegExp) {
            regex = filter;
          } else {
            regex = new RegExp('.*' + filter + '.*', 'ig');
          }
          items = items.filter(function (item) {
            var test = regex.test(recToString(item));
            regex.lastIndex = 0;
            return test;
          });
        }
      }
      if (localFiltering) {
        // Make a local copy of filtered items to trigger filtered event
        this.filteredItems = items.slice();
      }
      // Apply local Sort
      if (sortBy && localSorting) {
        items = stableSort(items, function (a, b) {
          var ret = null;
          if (typeof sortCompare === 'function') {
            // Call user provided sortCompare routine
            ret = sortCompare(a, b, sortBy);
          }
          if (ret === null || ret === undefined) {
            // Fallback to defaultSortCompare if sortCompare not defined or returns null
            ret = defaultSortCompare(a, b, sortBy);
          }
          // Handle sorting direction
          return (ret || 0) * (sortDesc ? -1 : 1);
        });
      }
      // Apply local pagination
      if (Boolean(perPage) && localPaging) {
        // Grab the current page of data (which may be past filtered items)
        items = items.slice((currentPage - 1) * perPage, currentPage * perPage);
      }
      // Update the value model with the filtered/sorted/paginated data set
      this.$emit('input', items);
      return items;
    },
    computedBusy: function computedBusy() {
      return this.busy || this.localBusy;
    }
  },
  methods: {
    keys: keys,
    fieldClasses: function fieldClasses(field) {
      return [field.sortable ? 'sorting' : '', field.sortable && this.localSortBy === field.key ? 'sorting_' + (this.localSortDesc ? 'desc' : 'asc') : '', field.variant ? 'table-' + field.variant : '', field.class ? field.class : '', field.thClass ? field.thClass : ''];
    },
    tdClasses: function tdClasses(field, item) {
      var cellVariant = '';
      if (item._cellVariants && item._cellVariants[field.key]) {
        cellVariant = (this.dark ? 'bg' : 'table') + '-' + item._cellVariants[field.key];
      }
      return [field.variant && !cellVariant ? (this.dark ? 'bg' : 'table') + '-' + field.variant : '', cellVariant, field.class ? field.class : '', this.getTdValues(item, field.key, field.tdClass, '')];
    },
    tdAttrs: function tdAttrs(field, item, colIndex) {
      var attrs = {};
      attrs['aria-colindex'] = String(colIndex + 1);
      if (this.isStacked) {
        // Generate the "header cell" label content in stacked mode
        attrs['data-label'] = field.label;
        if (field.isRowHeader) {
          attrs['role'] = 'rowheader';
        } else {
          attrs['role'] = 'cell';
        }
      }
      return assign({}, attrs, this.getTdValues(item, field.key, field.tdAttr, {}));
    },
    rowClasses: function rowClasses(item) {
      return [item._rowVariant ? (this.dark ? 'bg' : 'table') + '-' + item._rowVariant : '', this.tbodyTrClass];
    },
    rowClicked: function rowClicked(e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }
      this.$emit('row-clicked', item, index, e);
    },
    rowDblClicked: function rowDblClicked(e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }
      this.$emit('row-dblclicked', item, index, e);
    },
    rowHovered: function rowHovered(e, item, index) {
      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }
      this.$emit('row-hovered', item, index, e);
    },
    headClicked: function headClicked(e, field) {
      var _this4 = this;

      if (this.stopIfBusy(e)) {
        // If table is busy (via provider) then don't propagate
        return;
      }
      var sortChanged = false;
      var toggleLocalSortDesc = function toggleLocalSortDesc() {
        var sortDirection = field.sortDirection || _this4.sortDirection;
        if (sortDirection === 'asc') {
          _this4.localSortDesc = false;
        } else if (sortDirection === 'desc') {
          _this4.localSortDesc = true;
        }
      };
      if (field.sortable) {
        if (field.key === this.localSortBy) {
          // Change sorting direction on current column
          this.localSortDesc = !this.localSortDesc;
        } else {
          // Start sorting this column ascending
          this.localSortBy = field.key;
          toggleLocalSortDesc();
        }
        sortChanged = true;
      } else if (this.localSortBy && !this.noSortReset) {
        this.localSortBy = null;
        toggleLocalSortDesc();
        sortChanged = true;
      }
      this.$emit('head-clicked', field.key, field, e);
      if (sortChanged) {
        // Sorting parameters changed
        this.$emit('sort-changed', this.context);
      }
    },
    stopIfBusy: function stopIfBusy(evt) {
      if (this.computedBusy) {
        // If table is busy (via provider) then don't propagate
        evt.preventDefault();
        evt.stopPropagation();
        return true;
      }
      return false;
    },
    refresh: function refresh() {
      // Expose refresh method
      if (this.hasProvider) {
        this._providerUpdate();
      }
    },
    _providerSetLocal: function _providerSetLocal(items) {
      this.localItems = items && items.length > 0 ? items.slice() : [];
      this.localBusy = false;
      this.$emit('refreshed');
      // Deprecated root emit
      this.emitOnRoot('table::refreshed', this.id);
      // New root emit
      if (this.id) {
        this.emitOnRoot('bv::table::refreshed', this.id);
      }
    },
    _providerUpdate: function _providerUpdate() {
      var _this5 = this;

      // Refresh the provider items
      if (this.computedBusy || !this.hasProvider) {
        // Don't refresh remote data if we are 'busy' or if no provider
        return;
      }
      // Set internal busy state
      this.localBusy = true;
      // Call provider function with context and optional callback
      var data = this.items(this.context, this._providerSetLocal);
      if (data && data.then && typeof data.then === 'function') {
        // Provider returned Promise
        data.then(function (items) {
          _this5._providerSetLocal(items);
        });
      } else {
        // Provider returned Array data
        this._providerSetLocal(data);
      }
    },
    getTdValues: function getTdValues(item, key, tdValue, defValue) {
      var parent = this.$parent;
      if (tdValue) {
        if (typeof tdValue === 'function') {
          var value = lodash_get(item, key);
          return tdValue(value, key, item);
        } else if (typeof tdValue === 'string' && typeof parent[tdValue] === 'function') {
          var _value = lodash_get(item, key);
          return parent[tdValue](_value, key, item);
        }
        return tdValue;
      }
      return defValue;
    },
    getFormattedValue: function getFormattedValue(item, field) {
      var key = field.key;
      var formatter = field.formatter;
      var parent = this.$parent;
      var value = lodash_get(item, key);
      if (formatter) {
        if (typeof formatter === 'function') {
          value = formatter(value, key, item);
        } else if (typeof formatter === 'string' && typeof parent[formatter] === 'function') {
          value = parent[formatter](value, key, item);
        }
      }
      return value;
    }
  }
};

var components$x = {
  bTable: bTable
};

var VuePlugin$z = {
  install: function install(Vue) {
    registerComponents(Vue, components$x);
  }
};

vueUse(VuePlugin$z);

// Helper component
var bTabButtonHelper = {
  name: 'bTabButtonHelper',
  props: {
    content: { type: [String, Array], default: '' },
    href: { type: String, default: '#' },
    posInSet: { type: Number, default: null },
    setSize: { type: Number, default: null },
    controls: { type: String, default: null },
    id: { type: String, default: null },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    linkClass: { default: null },
    itemClass: { default: null },
    noKeyNav: { type: Boolean, default: false }
  },
  render: function render(h) {
    var link = h('a', {
      class: ['nav-link', { active: this.active, disabled: this.disabled }, this.linkClass],
      attrs: {
        role: 'tab',
        tabindex: this.noKeyNav ? null : '-1',
        href: this.href,
        id: this.id,
        disabled: this.disabled,
        'aria-selected': this.active ? 'true' : 'false',
        'aria-setsize': this.setSize,
        'aria-posinset': this.posInSet,
        'aria-controls': this.controls
      },
      on: {
        click: this.handleClick,
        keydown: this.handleClick
      }
    }, this.content);
    return h('li', { class: ['nav-item', this.itemClass], attrs: { role: 'presentation' } }, [link]);
  },

  methods: {
    handleClick: function handleClick(evt) {
      function stop() {
        evt.preventDefault();
        evt.stopPropagation();
      }
      if (evt.type !== 'click' && this.noKeyNav) {
        return;
      }
      if (this.disabled) {
        stop();
        return;
      }
      if (evt.type === 'click' || evt.keyCode === KeyCodes.ENTER || evt.keyCode === KeyCodes.SPACE) {
        stop();
        this.$emit('click', evt);
      }
    }
  }
};

var bTabs = {
  mixins: [idMixin],
  render: function render(h) {
    var _this = this,
        _ref;

    var tabs = this.tabs;
    // Navigation 'buttons'
    var buttons = tabs.map(function (tab, index) {
      return h(bTabButtonHelper, {
        key: index,
        props: {
          content: tab.$slots.title || tab.title,
          href: tab.href,
          id: tab.controlledBy || _this.safeId('_BV_tab_' + (index + 1) + '_'),
          active: tab.localActive,
          disabled: tab.disabled,
          setSize: tabs.length,
          posInSet: index + 1,
          controls: _this.safeId('_BV_tab_container_'),
          linkClass: tab.titleLinkClass,
          itemClass: tab.titleItemClass,
          noKeyNav: _this.noKeyNav
        },
        on: {
          click: function click(evt) {
            _this.setTab(index);
          }
        }
      });
    });

    // Nav 'button' wrapper
    var navs = h('ul', {
      class: ['nav', (_ref = {}, defineProperty(_ref, 'nav-' + this.navStyle, !this.noNavStyle), defineProperty(_ref, 'card-header-' + this.navStyle, this.card && !this.vertical), defineProperty(_ref, 'card-header', this.card && this.vertical), defineProperty(_ref, 'h-100', this.card && this.vertical), defineProperty(_ref, 'flex-column', this.vertical), defineProperty(_ref, 'border-bottom-0', this.vertical), defineProperty(_ref, 'rounded-0', this.vertical), defineProperty(_ref, 'small', this.small), _ref), this.navClass],
      attrs: {
        role: 'tablist',
        tabindex: this.noKeyNav ? null : '0',
        id: this.safeId('_BV_tab_controls_')
      },
      on: { keydown: this.onKeynav }
    }, [buttons, this.$slots.tabs]);
    navs = h('div', {
      class: [{
        'card-header': this.card && !this.vertical && !(this.end || this.bottom),
        'card-footer': this.card && !this.vertical && (this.end || this.bottom),
        'col-auto': this.vertical
      }, this.navWrapperClass]
    }, [navs]);

    var empty = void 0;
    if (tabs && tabs.length) {
      empty = h(false);
    } else {
      empty = h('div', { class: ['tab-pane', 'active', { 'card-body': this.card }] }, this.$slots.empty);
    }

    // Main content section
    var content = h('div', {
      ref: 'tabsContainer',
      class: ['tab-content', { col: this.vertical }, this.contentClass],
      attrs: { id: this.safeId('_BV_tab_container_') }
    }, [this.$slots.default, empty]);

    // Render final output
    return h(this.tag, {
      class: ['tabs', { row: this.vertical, 'no-gutters': this.vertical && this.card }],
      attrs: { id: this.safeId() }
    }, [this.end || this.bottom ? content : h(false), [navs], this.end || this.bottom ? h(false) : content]);
  },
  data: function data() {
    return {
      currentTab: this.value,
      tabs: []
    };
  },

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    card: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: null
    },
    pills: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noNavStyle: {
      type: Boolean,
      default: false
    },
    noKeyNav: {
      type: Boolean,
      default: false
    },
    lazy: {
      // This prop is sniffed by the tab child
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    navClass: {
      type: [String, Array, Object],
      default: null
    },
    navWrapperClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  watch: {
    currentTab: function currentTab(val, old) {
      if (val === old) {
        return;
      }
      this.$root.$emit('changed::tab', this, val, this.tabs[val]);
      this.$emit('input', val);
      this.tabs[val].$emit('click');
    },
    value: function value(val, old) {
      if (val === old) {
        return;
      }
      if (typeof old !== 'number') {
        old = 0;
      }
      // Moving left or right?
      var direction = val < old ? -1 : 1;
      this.setTab(val, false, direction);
    }
  },
  computed: {
    fade: function fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade;
    },
    navStyle: function navStyle() {
      return this.pills ? 'pills' : 'tabs';
    }
  },
  methods: {
    /**
     * Util: Return the sign of a number (as -1, 0, or 1)
     */
    sign: function sign(x) {
      return x === 0 ? 0 : x > 0 ? 1 : -1;
    },

    /*
         * handle keyboard navigation
         */
    onKeynav: function onKeynav(evt) {
      if (this.noKeyNav) {
        return;
      }
      var key = evt.keyCode;
      var shift = evt.shiftKey;
      function stop() {
        evt.preventDefault();
        evt.stopPropagation();
      }
      if (key === KeyCodes.UP || key === KeyCodes.LEFT) {
        stop();
        if (shift) {
          this.setTab(0, false, 1);
        } else {
          this.previousTab();
        }
      } else if (key === KeyCodes.DOWN || key === KeyCodes.RIGHT) {
        stop();
        if (shift) {
          this.setTab(this.tabs.length - 1, false, -1);
        } else {
          this.nextTab();
        }
      }
    },

    /**
     * Move to next tab
     */
    nextTab: function nextTab() {
      this.setTab(this.currentTab + 1, false, 1);
    },

    /**
     * Move to previous tab
     */
    previousTab: function previousTab() {
      this.setTab(this.currentTab - 1, false, -1);
    },

    /**
     * Set active tab on the tabs collection and the child 'tab' component
     * Index is the tab we want to activate. Direction is the direction we are moving
     * so if the tab we requested is disabled, we can skip over it.
     * Force is used by updateTabs to ensure we have cleared any previous active tabs.
     */
    setTab: function setTab(index, force, direction) {
      var _this2 = this;

      direction = this.sign(direction || 0);
      index = index || 0;
      // Prevent setting same tab and infinite loops!
      if (!force && index === this.currentTab) {
        return;
      }
      var tab = this.tabs[index];
      // Don't go beyond indexes!
      if (!tab) {
        // Reset the v-model to the current Tab
        this.$emit('input', this.currentTab);
        return;
      }
      // Ignore or Skip disabled
      if (tab.disabled) {
        if (direction) {
          // Skip to next non disabled tab in specified direction (recursive)
          this.setTab(index + direction, force, direction);
        }
        return;
      }
      // Activate requested current tab, and deactivte any old tabs
      this.tabs.forEach(function (t) {
        if (t === tab) {
          // Set new tab as active
          _this2.$set(t, 'localActive', true);
        } else {
          // Ensure non current tabs are not active
          _this2.$set(t, 'localActive', false);
        }
      });
      // Update currentTab
      this.currentTab = index;
    },

    /**
     * Dynamically update tabs list
     */
    updateTabs: function updateTabs() {
      // Probe tabs
      this.tabs = this.$children.filter(function (child) {
        return child._isTab;
      });
      // Set initial active tab
      var tabIndex = null;
      // Find *last* active non-dsabled tab in current tabs
      // We trust tab state over currentTab
      this.tabs.forEach(function (tab, index) {
        if (tab.localActive && !tab.disabled) {
          tabIndex = index;
        }
      });
      // Else try setting to currentTab
      if (tabIndex === null) {
        if (this.currentTab >= this.tabs.length) {
          // Handle last tab being removed
          this.setTab(this.tabs.length - 1, true, -1);
          return;
        } else if (this.tabs[this.currentTab] && !this.tabs[this.currentTab].disabled) {
          tabIndex = this.currentTab;
        }
      }
      // Else find *first* non-disabled tab in current tabs
      if (tabIndex === null) {
        this.tabs.forEach(function (tab, index) {
          if (!tab.disabled && tabIndex === null) {
            tabIndex = index;
          }
        });
      }
      this.setTab(tabIndex || 0, true, 0);
    }
  },
  mounted: function mounted() {
    this.updateTabs();
    // Observe Child changes so we can notify tabs change
    observeDOM(this.$refs.tabsContainer, this.updateTabs.bind(this), {
      subtree: false
    });
  }
};

var bTab = {
  mixins: [idMixin],
  render: function render(h) {
    var content = h(false);
    if (this.localActive || !this.computedLazy) {
      content = h(this.tag, {
        ref: 'panel',
        class: this.tabClasses,
        directives: [{ name: 'show', value: this.localActive }],
        attrs: {
          role: 'tabpanel',
          id: this.safeId(),
          'aria-hidden': this.localActive ? 'false' : 'true',
          'aria-expanded': this.localActive ? 'true' : 'false',
          'aria-lablelledby': this.controlledBy || null
        }
      }, [this.$slots.default]);
    }
    return h('transition', {
      props: { mode: 'out-in' },
      on: {
        beforeEnter: this.beforeEnter,
        beforeLeave: this.beforeLeave
      }
    }, [content]);
  },

  methods: {
    beforeEnter: function beforeEnter() {
      var _this = this;

      // change opacity 1 frame after display
      // otherwise css transition won't happen
      window.requestAnimationFrame(function () {
        _this.show = true;
      });
    },
    beforeLeave: function beforeLeave() {
      this.show = false;
    }
  },
  data: function data() {
    return {
      localActive: this.active && !this.disabled,
      show: false
    };
  },
  mounted: function mounted() {
    this.show = this.localActive;
  },

  computed: {
    tabClasses: function tabClasses() {
      return ['tab-pane', this.$parent && this.$parent.card && !this.noBody ? 'card-body' : '', this.show ? 'show' : '', this.computedFade ? 'fade' : '', this.disabled ? 'disabled' : '', this.localActive ? 'active' : ''];
    },
    controlledBy: function controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__');
    },
    computedFade: function computedFade() {
      return this.$parent.fade;
    },
    computedLazy: function computedLazy() {
      return this.$parent.lazy;
    },
    _isTab: function _isTab() {
      // For parent sniffing of child
      return true;
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.vue and added to nav 'li.nav-item'
      type: [String, Array, Object],
      default: null
    },
    titleLinkClass: {
      // Sniffed by tabs.vue and added to nav 'a.nav-link'
      type: [String, Array, Object],
      default: null
    },
    headHtml: {
      // Is this actually ever used?
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: '#'
    }
  }
};

var components$y = {
  bTabs: bTabs,
  bTab: bTab
};

var VuePlugin$A = {
  install: function install(Vue) {
    registerComponents(Vue, components$y);
  }
};

vueUse(VuePlugin$A);

var bTooltip = {
  mixins: [toolpopMixin],
  render: function render(h) {
    return h('div', { class: ['d-none'], style: { display: 'none' }, attrs: { 'aria-hidden': true } }, [h('div', { ref: 'title' }, this.$slots.default)]);
  },
  data: function data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    triggers: {
      type: [String, Array],
      default: 'hover focus'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  methods: {
    createToolpop: function createToolpop() {
      // getTarget is in toolpop mixin
      var target = this.getTarget();
      if (target) {
        this._toolpop = new ToolTip(target, this.getConfig(), this.$root);
      } else {
        this._toolpop = null;
        warn("b-tooltip: 'target' element not found!");
      }
      return this._toolpop;
    }
  }
};

var components$z = {
  bTooltip: bTooltip
};

var VuePlugin$B = {
  install: function install(Vue) {
    registerComponents(Vue, components$z);
  }
};

vueUse(VuePlugin$B);



var components$A = /*#__PURE__*/Object.freeze({
  Alert: VuePlugin,
  Badge: VuePlugin$1,
  Breadcrumb: VuePlugin$2,
  Button: VuePlugin$3,
  ButtonToolbar: VuePlugin$5,
  ButtonGroup: VuePlugin$4,
  Card: VuePlugin$7,
  Carousel: VuePlugin$8,
  Collapse: VuePlugin$b,
  Dropdown: VuePlugin$c,
  Embed: VuePlugin$d,
  Form: VuePlugin$e,
  FormGroup: VuePlugin$f,
  FormInput: VuePlugin$i,
  FormTextarea: VuePlugin$j,
  FormFile: VuePlugin$k,
  FormCheckbox: VuePlugin$g,
  FormRadio: VuePlugin$h,
  FormSelect: VuePlugin$l,
  Image: VuePlugin$m,
  InputGroup: VuePlugin$6,
  Jumbotron: VuePlugin$n,
  Layout: VuePlugin$9,
  Link: VuePlugin$o,
  ListGroup: VuePlugin$p,
  Media: VuePlugin$q,
  Modal: VuePlugin$s,
  Nav: VuePlugin$t,
  Navbar: VuePlugin$u,
  Pagination: VuePlugin$v,
  PaginationNav: VuePlugin$w,
  Popover: VuePlugin$x,
  Progress: VuePlugin$y,
  Table: VuePlugin$z,
  Tabs: VuePlugin$A,
  Tooltip: VuePlugin$B
});

/*
 * ScrollSpy class definition
 */

/*
 * Constants / Defaults
 */

var NAME$2 = 'v-b-scrollspy';
var ACTIVATE_EVENT = 'bv::scrollspy::activate';

var Default = {
  element: 'body',
  offset: 10,
  method: 'auto',
  throttle: 75
};

var DefaultType = {
  element: '(string|element|component)',
  offset: 'number',
  method: 'string',
  throttle: 'number'
};

var ClassName$2 = {
  DROPDOWN_ITEM: 'dropdown-item',
  ACTIVE: 'active'
};

var Selector$3 = {
  ACTIVE: '.active',
  NAV_LIST_GROUP: '.nav, .list-group',
  NAV_LINKS: '.nav-link',
  NAV_ITEMS: '.nav-item',
  LIST_ITEMS: '.list-group-item',
  DROPDOWN: '.dropdown, .dropup',
  DROPDOWN_ITEMS: '.dropdown-item',
  DROPDOWN_TOGGLE: '.dropdown-toggle'
};

var OffsetMethod = {
  OFFSET: 'offset',
  POSITION: 'position'

  // HREFs must start with # but can be === '#', or start with '#/' or '#!' (which can be router links)
};var HREF_REGEX = /^#[^/!]+/;

// Transition Events
var TransitionEndEvents$2 = ['webkitTransitionEnd', 'transitionend', 'otransitionend', 'oTransitionEnd'];

/*
 * Utility Methods
 */

// Better var type detection
/* istanbul ignore next: not easy to test */
function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// Check config properties for expected types
/* istanbul ignore next: not easy to test */
function typeCheckConfig(componentName, config, configTypes) {
  for (var property in configTypes) {
    if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);
      // handle Vue instances
      valueType = value && value._isVue ? 'component' : valueType;

      if (!new RegExp(expectedTypes).test(valueType)) {
        warn(componentName + ': Option "' + property + '" provided type "' + valueType + '", but expected type "' + expectedTypes + '"');
      }
    }
  }
}

/*
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

/* istanbul ignore next: not easy to test */

var ScrollSpy = function () {
  function ScrollSpy(element, config, $root) {
    classCallCheck(this, ScrollSpy);

    // The element we activate links in
    this.$el = element;
    this.$scroller = null;
    this.$selector = [Selector$3.NAV_LINKS, Selector$3.LIST_ITEMS, Selector$3.DROPDOWN_ITEMS].join(',');
    this.$offsets = [];
    this.$targets = [];
    this.$activeTarget = null;
    this.$scrollHeight = 0;
    this.$resizeTimeout = null;
    this.$obs_scroller = null;
    this.$obs_targets = null;
    this.$root = $root || null;
    this.$config = null;

    this.updateConfig(config);
  }

  createClass(ScrollSpy, [{
    key: 'updateConfig',
    value: function updateConfig(config, $root) {
      if (this.$scroller) {
        // Just in case out scroll element has changed
        this.unlisten();
        this.$scroller = null;
      }
      var cfg = assign({}, this.constructor.Default, config);
      if ($root) {
        this.$root = $root;
      }
      typeCheckConfig(this.constructor.Name, cfg, this.constructor.DefaultType);
      this.$config = cfg;

      if (this.$root) {
        var self = this;
        this.$root.$nextTick(function () {
          self.listen();
        });
      } else {
        this.listen();
      }
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.unlisten();
      clearTimeout(this.$resizeTimeout);
      this.$resizeTimeout = null;
      this.$el = null;
      this.$config = null;
      this.$scroller = null;
      this.$selector = null;
      this.$offsets = null;
      this.$targets = null;
      this.$activeTarget = null;
      this.$scrollHeight = null;
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this = this;

      var scroller = this.getScroller();
      if (scroller && scroller.tagName !== 'BODY') {
        eventOn(scroller, 'scroll', this);
      }
      eventOn(window, 'scroll', this);
      eventOn(window, 'resize', this);
      eventOn(window, 'orientationchange', this);
      TransitionEndEvents$2.forEach(function (evtName) {
        eventOn(window, evtName, _this);
      });
      this.setObservers(true);
      // Scedule a refresh
      this.handleEvent('refresh');
    }
  }, {
    key: 'unlisten',
    value: function unlisten() {
      var _this2 = this;

      var scroller = this.getScroller();
      this.setObservers(false);
      if (scroller && scroller.tagName !== 'BODY') {
        eventOff(scroller, 'scroll', this);
      }
      eventOff(window, 'scroll', this);
      eventOff(window, 'resize', this);
      eventOff(window, 'orientationchange', this);
      TransitionEndEvents$2.forEach(function (evtName) {
        eventOff(window, evtName, _this2);
      });
    }
  }, {
    key: 'setObservers',
    value: function setObservers(on) {
      var _this3 = this;

      // We observe both the scroller for content changes, and the target links
      if (this.$obs_scroller) {
        this.$obs_scroller.disconnect();
        this.$obs_scroller = null;
      }
      if (this.$obs_targets) {
        this.$obs_targets.disconnect();
        this.$obs_targets = null;
      }
      if (on) {
        this.$obs_targets = observeDOM(this.$el, function () {
          _this3.handleEvent('mutation');
        }, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['href']
        });
        this.$obs_scroller = observeDOM(this.getScroller(), function () {
          _this3.handleEvent('mutation');
        }, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ['id', 'style', 'class']
        });
      }
    }

    // general event handler

  }, {
    key: 'handleEvent',
    value: function handleEvent(evt) {
      var type = typeof evt === 'string' ? evt : evt.type;

      var self = this;
      function resizeThrottle() {
        if (!self.$resizeTimeout) {
          self.$resizeTimeout = setTimeout(function () {
            self.refresh();
            self.process();
            self.$resizeTimeout = null;
          }, self.$config.throttle);
        }
      }

      if (type === 'scroll') {
        if (!this.$obs_scroller) {
          // Just in case we are added to the DOM before the scroll target is
          // We re-instantiate our listeners, just in case
          this.listen();
        }
        this.process();
      } else if (/(resize|orientationchange|mutation|refresh)/.test(type)) {
        // Postpone these events by throttle time
        resizeThrottle();
      }
    }

    // Refresh the list of target links on the element we are applied to

  }, {
    key: 'refresh',
    value: function refresh() {
      var _this4 = this;

      var scroller = this.getScroller();
      if (!scroller) {
        return;
      }
      var autoMethod = scroller !== scroller.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;
      var method = this.$config.method === 'auto' ? autoMethod : this.$config.method;
      var methodFn = method === OffsetMethod.POSITION ? position : offset;
      var offsetBase = method === OffsetMethod.POSITION ? this.getScrollTop() : 0;

      this.$offsets = [];
      this.$targets = [];

      this.$scrollHeight = this.getScrollHeight();

      // Find all the unique link href's
      selectAll(this.$selector, this.$el).map(function (link) {
        return getAttr(link, 'href');
      }).filter(function (href) {
        return HREF_REGEX.test(href || '');
      }).map(function (href) {
        var el = select(href, scroller);
        if (isVisible(el)) {
          return {
            offset: parseInt(methodFn(el).top, 10) + offsetBase,
            target: href
          };
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a.offset - b.offset;
      }).reduce(function (memo, item) {
        // record only unique targets/offfsets
        if (!memo[item.target]) {
          _this4.$offsets.push(item.offset);
          _this4.$targets.push(item.target);
          memo[item.target] = true;
        }
        return memo;
      }, {});

      return this;
    }

    // Handle activating/clearing

  }, {
    key: 'process',
    value: function process() {
      var scrollTop = this.getScrollTop() + this.$config.offset;
      var scrollHeight = this.getScrollHeight();
      var maxScroll = this.$config.offset + scrollHeight - this.getOffsetHeight();

      if (this.$scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this.$targets[this.$targets.length - 1];
        if (this.$activeTarget !== target) {
          this.activate(target);
        }
        return;
      }

      if (this.$activeTarget && scrollTop < this.$offsets[0] && this.$offsets[0] > 0) {
        this.$activeTarget = null;
        this.clear();
        return;
      }

      for (var i = this.$offsets.length; i--;) {
        var isActiveTarget = this.$activeTarget !== this.$targets[i] && scrollTop >= this.$offsets[i] && (typeof this.$offsets[i + 1] === 'undefined' || scrollTop < this.$offsets[i + 1]);

        if (isActiveTarget) {
          this.activate(this.$targets[i]);
        }
      }
    }
  }, {
    key: 'getScroller',
    value: function getScroller() {
      if (this.$scroller) {
        return this.$scroller;
      }
      var scroller = this.$config.element;
      if (!scroller) {
        return null;
      } else if (isElement(scroller.$el)) {
        scroller = scroller.$el;
      } else if (typeof scroller === 'string') {
        scroller = select(scroller);
      }
      if (!scroller) {
        return null;
      }
      this.$scroller = scroller.tagName === 'BODY' ? window : scroller;
      return this.$scroller;
    }
  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      var scroller = this.getScroller();
      return scroller === window ? scroller.pageYOffset : scroller.scrollTop;
    }
  }, {
    key: 'getScrollHeight',
    value: function getScrollHeight() {
      return this.getScroller().scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }, {
    key: 'getOffsetHeight',
    value: function getOffsetHeight() {
      var scroller = this.getScroller();
      return scroller === window ? window.innerHeight : getBCR(scroller).height;
    }
  }, {
    key: 'activate',
    value: function activate(target) {
      var _this5 = this;

      this.$activeTarget = target;
      this.clear();

      // Grab the list of target links (<a href="{$target}">)
      var links = selectAll(this.$selector.split(',').map(function (selector) {
        return selector + '[href="' + target + '"]';
      }).join(','), this.$el);

      links.forEach(function (link) {
        if (hasClass(link, ClassName$2.DROPDOWN_ITEM)) {
          // This is a dropdown item, so find the .dropdown-toggle and set it's state
          var dropdown = closest(Selector$3.DROPDOWN, link);
          if (dropdown) {
            _this5.setActiveState(select(Selector$3.DROPDOWN_TOGGLE, dropdown), true);
          }
          // Also set this link's state
          _this5.setActiveState(link, true);
        } else {
          // Set triggered link as active
          _this5.setActiveState(link, true);
          if (matches(link.parentElement, Selector$3.NAV_ITEMS)) {
            // Handle nav-link inside nav-item, and set nav-item active
            _this5.setActiveState(link.parentElement, true);
          }
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          var el = link;
          while (el) {
            el = closest(Selector$3.NAV_LIST_GROUP, el);
            var sibling = el ? el.previousElementSibling : null;
            if (matches(sibling, Selector$3.NAV_LINKS + ', ' + Selector$3.LIST_ITEMS)) {
              _this5.setActiveState(sibling, true);
            }
            // Handle special case where nav-link is inside a nav-item
            if (matches(sibling, Selector$3.NAV_ITEMS)) {
              _this5.setActiveState(select(Selector$3.NAV_LINKS, sibling), true);
              // Add active state to nav-item as well
              _this5.setActiveState(sibling, true);
            }
          }
        }
      });

      // Signal event to via $root, passing ID of activaed target and reference to array of links
      if (links && links.length > 0 && this.$root) {
        this.$root.$emit(ACTIVATE_EVENT, target, links);
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this6 = this;

      selectAll(this.$selector + ', ' + Selector$3.NAV_ITEMS, this.$el).filter(function (el) {
        return hasClass(el, ClassName$2.ACTIVE);
      }).forEach(function (el) {
        return _this6.setActiveState(el, false);
      });
    }
  }, {
    key: 'setActiveState',
    value: function setActiveState(el, active) {
      if (!el) {
        return;
      }
      if (active) {
        addClass(el, ClassName$2.ACTIVE);
      } else {
        removeClass(el, ClassName$2.ACTIVE);
      }
    }
  }], [{
    key: 'Name',
    get: function get$$1() {
      return NAME$2;
    }
  }, {
    key: 'Default',
    get: function get$$1() {
      return Default;
    }
  }, {
    key: 'DefaultType',
    get: function get$$1() {
      return DefaultType;
    }
  }]);
  return ScrollSpy;
}();

/*
 * ScrollSpy directive v-b-scrollspy
 */

var inBrowser$1 = typeof window !== 'undefined';
var isServer = !inBrowser$1;

// Key we use to store our Instance
var BVSS = '__BV_ScrollSpy__';

// Generate config from bindings
/* istanbul ignore next: not easy to test */
function makeConfig(binding) {
  var config = {};

  // If Argument, assume element ID
  if (binding.arg) {
    // Element ID specified as arg. We must pre-pend #
    config.element = '#' + binding.arg;
  }

  // Process modifiers
  keys(binding.modifiers).forEach(function (mod) {
    if (/^\d+$/.test(mod)) {
      // Offest value
      config.offset = parseInt(mod, 10);
    } else if (/^(auto|position|offset)$/.test(mod)) {
      // Offset method
      config.method = mod;
    }
  });

  // Process value
  if (typeof binding.value === 'string') {
    // Value is a CSS ID or selector
    config.element = binding.value;
  } else if (typeof binding.value === 'number') {
    // Value is offset
    config.offset = Math.round(binding.value);
  } else if (_typeof(binding.value) === 'object') {
    // Value is config object
    // Filter the object based on our supported config options
    keys(binding.value).filter(function (k) {
      return Boolean(ScrollSpy.DefaultType[k]);
    }).forEach(function (k) {
      config[k] = binding.value[k];
    });
  }

  return config;
}

/* istanbul ignore next: not easy to test */
function addBVSS(el, binding, vnode) {
  if (isServer) {
    return;
  }
  var cfg = makeConfig(binding);
  if (!el[BVSS]) {
    el[BVSS] = new ScrollSpy(el, cfg, vnode.context.$root);
  } else {
    el[BVSS].updateConfig(cfg, vnode.context.$root);
  }
  return el[BVSS];
}

/* istanbul ignore next: not easy to test */
function removeBVSS(el) {
  if (el[BVSS]) {
    el[BVSS].dispose();
    el[BVSS] = null;
  }
}

/*
 * Export our directive
 */

/* istanbul ignore next: not easy to test */
var bScrollspy = {
  bind: function bind(el, binding, vnode) {
    addBVSS(el, binding, vnode);
  },
  inserted: function inserted(el, binding, vnode) {
    addBVSS(el, binding, vnode);
  },
  update: function update(el, binding, vnode) {
    addBVSS(el, binding, vnode);
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    addBVSS(el, binding, vnode);
  },
  unbind: function unbind(el) {
    if (isServer) {
      return;
    }
    // Remove scroll event listener on scrollElId
    removeBVSS(el);
  }
};

var directives$2 = {
  bScrollspy: bScrollspy
};

var VuePlugin$C = {
  install: function install(Vue) {
    registerDirectives(Vue, directives$2);
  }
};

vueUse(VuePlugin$C);

var inBrowser$2 = typeof window !== 'undefined' && typeof document !== 'undefined';

// Key which we use to store tooltip object on element
var BVTT = '__BV_ToolTip__';

// Valid event triggers
var validTriggers = {
  'focus': true,
  'hover': true,
  'click': true,
  'blur': true

  // Build a ToolTip config based on bindings (if any)
  // Arguments and modifiers take precedence over passed value config object
  /* istanbul ignore next: not easy to test */
};function parseBindings(bindings) {
  // We start out with a blank config
  var config = {};

  // Process bindings.value
  if (typeof bindings.value === 'string') {
    // Value is tooltip content (html optionally supported)
    config.title = bindings.value;
  } else if (typeof bindings.value === 'function') {
    // Title generator function
    config.title = bindings.value;
  } else if (_typeof(bindings.value) === 'object') {
    // Value is config object, so merge
    config = assign(bindings.value);
  }

  // If Argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg. We must prepend '#' to become a CSS selector
    config.container = '#' + bindings.arg;
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(function (mod) {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // placement of tooltip
      config.placement = mod;
    } else if (/^(window|viewport)$/.test(mod)) {
      // bounday of tooltip
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // delay value
      var delay = parseInt(mod.slice(1), 10) || 0;
      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // offset value. Negative allowed
      var offset = parseInt(mod.slice(1), 10) || 0;
      if (offset) {
        config.offset = offset;
      }
    }
  });

  // Special handling of event trigger modifiers Trigger is a space separated list
  var selectedTriggers = {};

  // parse current config object trigger
  var triggers = typeof config.trigger === 'string' ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  });

  // Parse Modifiers for triggers
  keys(validTriggers).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  });

  // Sanitize triggers
  config.trigger = keys(selectedTriggers).join(' ');
  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to 'focus'
    config.trigger = 'focus';
  }
  if (!config.trigger) {
    // remove trigger config
    delete config.trigger;
  }

  return config;
}

//
// Add or Update tooltip on our element
//
/* istanbul ignore next: not easy to test */
function applyBVTT(el, bindings, vnode) {
  if (!inBrowser$2) {
    return;
  }
  if (!Popper) {
    // Popper is required for tooltips to work
    warn('v-b-tooltip: Popper.js is required for tooltips to work');
    return;
  }
  if (el[BVTT]) {
    el[BVTT].updateConfig(parseBindings(bindings));
  } else {
    el[BVTT] = new ToolTip(el, parseBindings(bindings), vnode.context.$root);
  }
}

//
// Remove tooltip on our element
//
/* istanbul ignore next: not easy to test */
function removeBVTT(el) {
  if (!inBrowser$2) {
    return;
  }
  if (el[BVTT]) {
    el[BVTT].destroy();
    el[BVTT] = null;
    delete el[BVTT];
  }
}

/*
 * Export our directive
 */
/* istanbul ignore next: not easy to test */
var bTooltip$1 = {
  bind: function bind(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyBVTT(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVTT(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removeBVTT(el);
  }
};

var directives$3 = {
  bTooltip: bTooltip$1
};

var VuePlugin$D = {
  install: function install(Vue) {
    registerDirectives(Vue, directives$3);
  }
};

vueUse(VuePlugin$D);

var inBrowser$3 = typeof window !== 'undefined' && typeof document !== 'undefined';

// Key which we use to store tooltip object on element
var BVPO = '__BV_PopOver__';

// Valid event triggers
var validTriggers$1 = {
  'focus': true,
  'hover': true,
  'click': true,
  'blur': true

  // Build a PopOver config based on bindings (if any)
  // Arguments and modifiers take precedence over pased value config object
  /* istanbul ignore next: not easy to test */
};function parseBindings$1(bindings) {
  // We start out with a blank config
  var config = {};

  // Process bindings.value
  if (typeof bindings.value === 'string') {
    // Value is popover content (html optionally supported)
    config.content = bindings.value;
  } else if (typeof bindings.value === 'function') {
    // Content generator function
    config.content = bindings.value;
  } else if (_typeof(bindings.value) === 'object') {
    // Value is config object, so merge
    config = assign(bindings.value);
  }

  // If Argument, assume element ID of container element
  if (bindings.arg) {
    // Element ID specified as arg. We must prepend '#' to become a CSS selector
    config.container = '#' + bindings.arg;
  }

  // Process modifiers
  keys(bindings.modifiers).forEach(function (mod) {
    if (/^html$/.test(mod)) {
      // Title allows HTML
      config.html = true;
    } else if (/^nofade$/.test(mod)) {
      // no animation
      config.animation = false;
    } else if (/^(auto|top(left|right)?|bottom(left|right)?|left(top|bottom)?|right(top|bottom)?)$/.test(mod)) {
      // placement of popover
      config.placement = mod;
    } else if (/^(window|viewport)$/.test(mod)) {
      // bounday of popover
      config.boundary = mod;
    } else if (/^d\d+$/.test(mod)) {
      // delay value
      var delay = parseInt(mod.slice(1), 10) || 0;
      if (delay) {
        config.delay = delay;
      }
    } else if (/^o-?\d+$/.test(mod)) {
      // offset value (negative allowed)
      var offset = parseInt(mod.slice(1), 10) || 0;
      if (offset) {
        config.offset = offset;
      }
    }
  });

  // Special handling of event trigger modifiers Trigger is a space separated list
  var selectedTriggers = {};

  // parse current config object trigger
  var triggers = typeof config.trigger === 'string' ? config.trigger.trim().split(/\s+/) : [];
  triggers.forEach(function (trigger) {
    if (validTriggers$1[trigger]) {
      selectedTriggers[trigger] = true;
    }
  });

  // Parse Modifiers for triggers
  keys(validTriggers$1).forEach(function (trigger) {
    if (bindings.modifiers[trigger]) {
      selectedTriggers[trigger] = true;
    }
  });

  // Sanitize triggers
  config.trigger = keys(selectedTriggers).join(' ');
  if (config.trigger === 'blur') {
    // Blur by itself is useless, so convert it to focus
    config.trigger = 'focus';
  }
  if (!config.trigger) {
    // remove trigger config
    delete config.trigger;
  }

  return config;
}

//
// Add or Update popover on our element
//
/* istanbul ignore next: not easy to test */
function applyBVPO(el, bindings, vnode) {
  if (!inBrowser$3) {
    return;
  }
  if (!Popper) {
    // Popper is required for tooltips to work
    warn('v-b-popover: Popper.js is required for popovers to work');
    return;
  }
  if (el[BVPO]) {
    el[BVPO].updateConfig(parseBindings$1(bindings));
  } else {
    el[BVPO] = new PopOver(el, parseBindings$1(bindings), vnode.context.$root);
  }
}
//
// Remove popover on our element
//
/* istanbul ignore next */
function removeBVPO(el) {
  if (!inBrowser$3) {
    return;
  }
  if (el[BVPO]) {
    el[BVPO].destroy();
    el[BVPO] = null;
    delete el[BVPO];
  }
}

/*
 * Export our directive
 */
/* istanbul ignore next: not easy to test */
var bPopover$1 = {
  bind: function bind(el, bindings, vnode) {
    applyBVPO(el, bindings, vnode);
  },
  inserted: function inserted(el, bindings, vnode) {
    applyBVPO(el, bindings, vnode);
  },
  update: function update(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVPO(el, bindings, vnode);
    }
  },
  componentUpdated: function componentUpdated(el, bindings, vnode) {
    if (bindings.value !== bindings.oldValue) {
      applyBVPO(el, bindings, vnode);
    }
  },
  unbind: function unbind(el) {
    removeBVPO(el);
  }
};

var directives$4 = {
  bPopover: bPopover$1
};

var VuePlugin$E = {
  install: function install(Vue) {
    registerDirectives(Vue, directives$4);
  }
};

vueUse(VuePlugin$E);



var directives$5 = /*#__PURE__*/Object.freeze({
  Toggle: VuePlugin$a,
  Modal: VuePlugin$r,
  Scrollspy: VuePlugin$C,
  Tooltip: VuePlugin$D,
  Popover: VuePlugin$E
});

var VuePlugin$F = {
  install: function install(Vue) {
    if (Vue._bootstrap_vue_installed) {
      return;
    }

    Vue._bootstrap_vue_installed = true;

    // Register component plugins
    for (var plugin in components$A) {
      Vue.use(components$A[plugin]);
    }

    // Register directive plugins
    for (var _plugin in directives$5) {
      Vue.use(directives$5[_plugin]);
    }
  }
};

vueUse(VuePlugin$F);

module.exports = VuePlugin$F;
//# sourceMappingURL=bootstrap-vue.common.js.map
