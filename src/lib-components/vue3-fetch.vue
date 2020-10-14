<template>
  <div class="vue-fetch" :class="{'is-stubbed': !!stub}">
    <slot v-bind="{ isLoading, isSuccess, isError, data, error }" />
  </div>
</template>

<script>
import { computed, watch } from "vue";
import useFetch from "../hooks/useFetch";

export default {
  name: "vue3-fetch",
  props: {
    id: String,
    url: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => {},
    },
    method: {
      type: String,
      validator: (value) => ["get", "post", "put", "delete"].includes(value),
      default: "get",
    },
    headers: Object,
    payload: Object,
    referrer: String,
    referrerPolicy: {
      type: String,
      validator: (value) =>
        [
          "no-referrer",
          "no-referrer-when-downgrade",
          "origin",
          "origin-when-cross-origin",
          "same-origin",
          "strict-origin",
          "strict-origin-when-cross-origin",
          "unsafe-url",
        ].includes(value),
    },
    mode: {
      type: String,
      validator: (value) => ["cors", "same-origin", "no-cors"].includes(value),
    },
    credentials: {
      type: String,
      validator: (value) => ["same-origin", "omit", "include"].includes(value),
    },
    cache: {
      type: String,
      validator: (value) =>
        [
          "default",
          "no-store",
          "reload",
          "no-cache",
          "force-cache",
          "only-if-cached",
        ].includes(value),
    },
    redirect: {
      type: String,
      validator: (value) => ["follow", "manual", "error"].includes(value),
    },
    integrity: String,
    keepAlive: Boolean,
    signal: [String, Number, Boolean, Array, Object, Function, Promise],
    stub: Object,
    save: {
      type: Boolean,
      default: false,
    },
  },
  setup(
    {
      id,
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
      save,
    },
    { emit }
  ) {
    const fetchOptions = {
      method,
      ...(headers && { headers }),
      ...(payload && { body: payload }),
      ...(referrer && { referrer }),
      ...(referrerPolicy && { referrerPolicy }),
      ...(mode && { mode }),
      ...(credentials && { credentials }),
      ...(cache && { cache }),
      ...(redirect && { redirect }),
      ...(integrity && { integrity }),
      ...(keepAlive && { keepAlive }),
      ...(signal && { signal }),
    };
    const qs =
      params &&
      Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");
    const endpoint = params ? `${url}?${qs}` : url;
    const { isLoading, isSuccess, isError, data, error, execute } = useFetch(
      endpoint,
      fetchOptions
    );
    const moduleName = computed(() => id || url.toString().replace(/\//g, "-"));

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
      execute,
    };
  },
};
</script>
<style>
.vue-fetch.is-stubbed {
	position: relative;
	border: 2px dashed orange;
	padding: 2px;
}
 .vue-fetch.is-stubbed::after {
	content: "Stub";
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: -15px;
	background: orange;
	color: white;
	padding: 5px;
	border-radius: 5px;
}
 .vue-fetch .vue-fetch.is-stubbed {
	border: 0;
	padding: 0;
}
 .vue-fetch .vue-fetch::after {
	display: none;
}
</style>

