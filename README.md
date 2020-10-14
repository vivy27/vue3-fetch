# vue3-fetch
vue3-fetch component uses the native browser's promised based fetch method. Making network request has become easy now through template.

> This fetch component is based on Vue3.

# Installation
```
npm i vue3-fetch --save
```

## how to use

### Import
```
import { Vue3Fetch } from 'vue3-fetch';
...
const app = createApp(App);
app.component('vue3-fetch', Vue3Fetch);
```

### Component template
```
<template>
    <vue3-fetch
      ref="fetchref"
      id="get-users"
      url="https://vj-simple-crud.herokuapp.com/users"
    >
        <template #default="{ isLoading, data }">
            <div v-if="isLoading">Loading...</div>
            <div v-else v-for="(user, index) in data" :key="`user-${index}`">
            <div>{{ user.name }}</div>
            <div>{{ user.department }}</div>
            <div>{{ user.phone }}</div>
            </div>
        </template>
    </vue3-fetch>
</template>
```

### Component script(helpful for refetching)
```
import { ref } from 'vue';

export default {
  name: "App",
  setup() {
    const fetchref = ref(null);

    const refetch = () => {
      fetchref.value.execute();
    };

    return {
      fetchref,
      refetch,
    };
  },
};
```