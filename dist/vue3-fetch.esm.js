import { ref, reactive, onMounted, watch, openBlock, createBlock, renderSlot } from 'vue';

function useFetch({
  url,
  method,
  query,
  body,
  headers,
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
}) {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const response = reactive({
    data: null,
    error: null
  });

  const endpoint = query => {
    const qs = new URLSearchParams(query).toString();
    return qs ? `${url}?${qs}` : url;
  };

  const fetchOptions = {
    method,
    ...(body && {
      body
    }),
    ...(headers && {
      headers
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

  const execute = async ({
    query,
    body
  } = {}) => {
    isSuccess.value = null;
    isError.value = null;
    isLoading.value = true;
    const options = { ...fetchOptions,
      ...(body && {
        body: JSON.stringify(body)
      })
    };

    try {
      response.data = stub || (await fetch(endpoint(query), options).then(res => res.json()));
      isSuccess.value = true;
      isError.value = false;
    } catch (e) {
      response.error = e.message;
      isSuccess.value = false;
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (method === 'get') {
      execute({
        query,
        body
      });
    }
  });
  return {
    isLoading,
    isSuccess,
    isError,
    response,
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
    method: {
      type: String,
      validator: value => ["get", "post", "put", "delete"].includes(value),
      default: "get"
    },
    query: {
      type: Object,

      default() {
        return {};
      }

    },
    body: {
      type: [Object, Array]
    },
    headers: {
      type: Object,

      default() {
        return {
          "Content-Type": "application/json"
        };
      }

    },
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

  setup(props, {
    emit
  }) {
    const fetchOptions = { ...props
    };
    const {
      isLoading,
      isSuccess,
      isError,
      response,
      execute
    } = useFetch(fetchOptions);
    watch([isSuccess, isError], ([success, error]) => {
      if (success) emit("fetch-success", response.data);
      if (error) emit("fetch-error", response.error);
    });
    watch(() => [props.query, props.body], ([query, body]) => {
      execute({ ...(query && {
          query
        }),
        ...(body && {
          body
        })
      });
    });
    return {
      isLoading,
      isSuccess,
      isError,
      response,
      execute
    };
  }

};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    id: $props.fetchId,
    class: ["vue-fetch", { 'is-stubbed': !!$props.stub }]
  }, [
    renderSlot(_ctx.$slots, "default", {
        isLoading: $setup.isLoading,
        isSuccess: $setup.isSuccess,
        isError: $setup.isError,
        data: $setup.response.data,
        error: $setup.response.error,
      })
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
