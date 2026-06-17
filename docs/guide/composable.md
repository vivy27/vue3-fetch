# Composable Usage

If you'd rather not use the wrapper component (e.g. you don't need the template slot, or you want to compose fetch state with other logic), use the `useFetch` composable directly. It accepts the same options as the component's [props](../reference/props) and returns the same reactive state.

```html
<script setup>
import { useFetch } from 'vue3-fetch'

const { isLoading, isSuccess, isError, response, execute } = useFetch({
  url: 'https://vj-simple-crud.herokuapp.com/users',
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else v-for="(user, index) in response.data" :key="`user-${index}`">
    <div>{{ user.name }}</div>
    <div>{{ user.department }}</div>
    <div>{{ user.phone }}</div>
  </div>
</template>
```

Like the component, requests with `method: 'get'` (the default) fire automatically on mount; other methods are triggered manually via `execute({ body, query })`.
