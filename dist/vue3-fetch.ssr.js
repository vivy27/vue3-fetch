'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vue=require('vue');function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
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
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function useFetch(url, options) {
  var isLoading = vue.ref(false);
  var isSuccess = vue.ref(false);
  var isError = vue.ref(false);
  var data = vue.ref(null);
  var error = vue.ref(null);

  var execute = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isLoading.value = true;
              _context.prev = 1;
              _context.next = 4;
              return fetch(url, options).then(function (res) {
                return res.json();
              });

            case 4:
              data.value = _context.sent;
              isSuccess.value = true;
              isError.value = false;
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              error.value = _context.t0;
              isSuccess.value = false;
              isError.value = true;

            case 14:
              _context.prev = 14;
              isLoading.value = false;
              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9, 14, 17]]);
    }));

    return function execute() {
      return _ref.apply(this, arguments);
    };
  }();

  vue.onMounted(function () {
    if (options.method === 'get') {
      execute();
    }
  });
  return {
    isLoading: isLoading,
    isSuccess: isSuccess,
    isError: isError,
    data: data,
    error: error,
    execute: execute
  };
}var script = {
  name: "vue3-fetch",
  props: {
    id: String,
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: function _default() {}
    },
    method: {
      type: String,
      validator: function validator(value) {
        return ["get", "post", "put", "delete"].includes(value);
      },
      default: "get"
    },
    headers: Object,
    payload: Object,
    referrer: String,
    referrerPolicy: {
      type: String,
      validator: function validator(value) {
        return ["no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"].includes(value);
      }
    },
    mode: {
      type: String,
      validator: function validator(value) {
        return ["cors", "same-origin", "no-cors"].includes(value);
      }
    },
    credentials: {
      type: String,
      validator: function validator(value) {
        return ["same-origin", "omit", "include"].includes(value);
      }
    },
    cache: {
      type: String,
      validator: function validator(value) {
        return ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"].includes(value);
      }
    },
    redirect: {
      type: String,
      validator: function validator(value) {
        return ["follow", "manual", "error"].includes(value);
      }
    },
    integrity: String,
    keepAlive: Boolean,
    signal: [String, Number, Boolean, Array, Object, Function, Promise],
    stub: Object,
    save: {
      type: Boolean,
      default: false
    }
  },
  setup: function setup(_ref, _ref2) {
    var id = _ref.id,
        url = _ref.url,
        params = _ref.params,
        method = _ref.method,
        headers = _ref.headers,
        payload = _ref.payload,
        referrer = _ref.referrer,
        referrerPolicy = _ref.referrerPolicy,
        mode = _ref.mode,
        credentials = _ref.credentials,
        cache = _ref.cache,
        redirect = _ref.redirect,
        integrity = _ref.integrity,
        keepAlive = _ref.keepAlive,
        signal = _ref.signal,
        save = _ref.save;
    var emit = _ref2.emit;

    var fetchOptions = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
      method: method
    }, headers && {
      headers: headers
    }), payload && {
      body: payload
    }), referrer && {
      referrer: referrer
    }), referrerPolicy && {
      referrerPolicy: referrerPolicy
    }), mode && {
      mode: mode
    }), credentials && {
      credentials: credentials
    }), cache && {
      cache: cache
    }), redirect && {
      redirect: redirect
    }), integrity && {
      integrity: integrity
    }), keepAlive && {
      keepAlive: keepAlive
    }), signal && {
      signal: signal
    });

    var qs = params && Object.keys(params).map(function (key) {
      return key + "=" + params[key];
    }).join("&");
    var endpoint = params ? "".concat(url, "?").concat(qs) : url;

    var _useFetch = useFetch(endpoint, fetchOptions),
        isLoading = _useFetch.isLoading,
        isSuccess = _useFetch.isSuccess,
        isError = _useFetch.isError,
        data = _useFetch.data,
        error = _useFetch.error,
        execute = _useFetch.execute;

    var moduleName = vue.computed(function () {
      return id || url.toString().replace(/\//g, "-");
    });
    vue.watch([data, error], function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          _isSuccess = _ref4[0],
          _isError = _ref4[1];

      _isSuccess && emit("fetch-success");
      _isError && emit("fetch-error");
    });
    vue.watch(function () {
      return fetchOptions;
    }, execute);
    return {
      isLoading: isLoading,
      isSuccess: isSuccess,
      isError: isError,
      data: data,
      error: error,
      execute: execute
    };
  }
};function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: ["vue-fetch", {'is-stubbed': !!$props.stub}]
  }, [
    vue.renderSlot(_ctx.$slots, "default", { isLoading: $setup.isLoading, isSuccess: $setup.isSuccess, isError: $setup.isError, data: $setup.data, error: $setup.error })
  ], 2))
}script.render = render;/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Vue3Fetch: script});var install = function installVue3Fetch(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.Vue3Fetch=script;exports.default=plugin;