import { ref, onMounted, computed, watch, openBlock, createBlock, renderSlot } from 'vue';

function useFetch(url, options, stub = {}) {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const data = ref(null);
  const error = ref(null);

  const stubExits = () => Object.keys(stub).length > 0;

  const execute = async () => {
    isLoading.value = true;

    try {
      data.value = stubExits() ? stub : await fetch(url, options).then(res => res.json());
      isSuccess.value = true;
      isError.value = false;
    } catch (e) {
      error.value = e;
      isSuccess.value = false;
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (options.method === 'get') {
      execute();
    }
  });
  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    execute
  };
}

var script = {
  name: "vue3-fetch",
  props: {
    fetchId: String,
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => {}
    },
    method: {
      type: String,
      validator: value => ["get", "post", "put", "delete"].includes(value),
      default: "get"
    },
    headers: Object,
    payload: Object,
    referrer: String,
    referrerPolicy: {
      type: String,
      validator: value => ["no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"].includes(value)
    },
    mode: {
      type: String,
      validator: value => ["cors", "same-origin", "no-cors"].includes(value)
    },
    credentials: {
      type: String,
      validator: value => ["same-origin", "omit", "include"].includes(value)
    },
    cache: {
      type: String,
      validator: value => ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"].includes(value)
    },
    redirect: {
      type: String,
      validator: value => ["follow", "manual", "error"].includes(value)
    },
    integrity: String,
    keepAlive: Boolean,
    signal: [String, Number, Boolean, Array, Object, Function, Promise],
    stub: [Array, Object]
  },

  setup({
    fetchId,
    url,
    params,
    method,
    headers,
    payload,
    referrer,
    referrerPolicy,
    mode,
    credentials,
    cache,
    redirect,
    integrity,
    keepAlive,
    signal,
    stub
  }, {
    emit
  }) {
    const fetchOptions = {
      method,
      ...(headers && {
        headers
      }),
      ...(payload && {
        body: payload
      }),
      ...(referrer && {
        referrer
      }),
      ...(referrerPolicy && {
        referrerPolicy
      }),
      ...(mode && {
        mode
      }),
      ...(credentials && {
        credentials
      }),
      ...(cache && {
        cache
      }),
      ...(redirect && {
        redirect
      }),
      ...(integrity && {
        integrity
      }),
      ...(keepAlive && {
        keepAlive
      }),
      ...(signal && {
        signal
      })
    };
    const qs = params && Object.keys(params).map(key => key + "=" + params[key]).join("&");
    const endpoint = params ? `${url}?${qs}` : url;
    const {
      isLoading,
      isSuccess,
      isError,
      data,
      error,
      execute
    } = useFetch(endpoint, fetchOptions, stub);
    const moduleName = computed(() => fetchId || url.toString().replace(/\//g, "-"));
    watch([data, error], ([_isSuccess, _isError]) => {
      _isSuccess && emit("fetch-success");
      _isError && emit("fetch-error");
    });
    watch(() => fetchOptions, execute);
    return {
      isLoading,
      isSuccess,
      isError,
      data,
      error,
      execute
    };
  }

};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    id: $props.fetchId,
    class: ["vue-fetch", {'is-stubbed': !!$props.stub}]
  }, [
    renderSlot(_ctx.$slots, "default", { isLoading: $setup.isLoading, isSuccess: $setup.isSuccess, isError: $setup.isError, data: $setup.data, error: $setup.error })
  ], 10, ["id"]))
}

script.render = render;

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Vue3Fetch: script
});

// Import vue components

const install = function installVue3Fetch(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { script as Vue3Fetch };
