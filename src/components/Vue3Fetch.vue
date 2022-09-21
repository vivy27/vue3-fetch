<template>
  <div :id="fetchId" class="vue-fetch" :class="{ 'is-stubbed': !!stub }">
    <slot v-bind="{
      isLoading,
      isSuccess,
      isError,
      data: response.data,
      error: response.error,
    }" />
  </div>
</template>
  
<script setup>
import { watch } from "vue";
import useFetch from "../hooks/useFetch";

const props = defineProps({
  fetchId: String,
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    validator: (value) => ["get", "post", "put", "delete"].includes(value),
    default: "get",
  },
  query: {
    type: Object,
    default() {
      return {};
    },
  },
  body: {
    type: [Object, Array],
  },
  headers: {
    type: Object,
    default() {
      return { "Content-Type": "application/json" };
    },
  },
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
  stub: [Array, Object],
});

const emit = defineEmits(['fetch-success', 'fetch-error']);

const { isLoading, isSuccess, isError, response, execute } = useFetch(
  props
);

watch([isSuccess, isError], ([success, error]) => {
  if (success) emit("fetch-success", response.data);
  if (error) emit("fetch-error", response.error);
});

watch(
  () => [props.query, props.body],
  ([query, body]) => {
    execute({ ...(query && { query }), ...(body && { body }) });
  }
);

defineExpose({ execute });
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
  
  