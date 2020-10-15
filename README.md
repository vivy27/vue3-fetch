# vue3-fetch
vue3-fetch component uses the browser's native promised based fetch api. Making network requests to server have become easy now through template. This component gives only the json responses.

> This fetch component is based on Vue3.

## Installation
```
npm i vue3-fetch --save
```

Install the plugin globally.

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import { Vue3Fetch } from 'vue3-fetch'
import 'vue3-fetch/dist/vue3-fetch.css'

const app = createApp(App)
app.component('vue3-fetch', Vue3Fetch)
app.mount('#app')
```

Or import the component locally.

```js
//App.vue
import { Vue3Fetch } from 'vue3-fetch'
import 'vue3-fetch/dist/vue3-fetch.css'

export default {
  components: {
    Vue3Fetch
  }
}
```

## Basic Usage

```html
<template>
  <vue3-fetch
      ref="fetchref"
      fetchId="get-users"
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

## Advanced Usage

```html
<template>
  <vue3-fetch
      ref="fetchref"
      fetchId="get-users"
      url="https://vj-simple-crud.herokuapp.com/users"
      @fetch-success="onSuccess" 
      @fetch-error="onError"
    >
        <template #default="{ isLoading, data, error }">
            <div v-if="isLoading">Loading...</div>
            <div v-else v-for="(user, index) in data" :key="`user-${index}`">
            <div>{{ user.name }}</div>
            <div>{{ user.department }}</div>
            <div>{{ user.phone }}</div>
            </div>
        </template>
        <section>
          <button @click="refetch">Re-fetch</button>
        </section>
    </vue3-fetch>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "App",
  setup() {
    const fetchref = ref(null);

    const onSuccess = () => {
      console.log(":::Fetch success:::");
    };

    const onError = () => {
      console.log(":::Fetch error:::");
    };

    const refetch = () => {
      fetchref.value.execute();
    };

    return {
      onSuccess,
      onError,
      fetchref,
      refetch,
    };
  },
};
</script>
```

### Props

```js
props: {
    //  ID to wrapper div
    fetchId: String,
    
    // REST endpoint eg. https://vj-simple-crud.herokuapp.com/users
    url: {
      type: String,
      required: true
    },

    // methods eg. one of ['GET', 'POST', 'PUT', 'DELETE'] 
    method: {
      type: String,
      default: "get"
    },

    // fetch header eg. { 'Content-Type': 'application/json' }
    headers: Object

    // fetch request body eg. {'username':'John', 'password': 'doe'}
    // body data type must match "Content-Type" header
    payload: Object

    // fetch referrer
    referrer: String

    // fetch referrerPolicy
    referrerPolicy: {
      type: String
    },

    // fetch mode eg. one of ['cors', 'same-origin', 'no-cors']
    mode: {
      type: String
    },

    // fetch credentials eg. one of ['same-origin', 'omit', 'include']
    credentials: {
      type: String
    },

    //fetch cache
    cache: {
      type: String
    },

    // fetch redirect eg. one of ['follow', 'manual', 'error']
    redirect: {
      type: String
    },

    // fetch integrity
    integrity: String,

    // fetch keepAlive
    keepAlive: Boolean,

    // fetch signal
    signal: [String, Number, Boolean, Array, Object, Function, Promise],
    
    // mock fetch response with an object
    stub: Object
}
```

### Events

```html
<vue3-fetch url="https://vj-simple-crud.herokuapp.com/users" @fetch-success="onSuccess" @fetch-error="onError" />
...
setup() {

  const onSuccess = () => {
    console.log(":::Fetch success:::");
  };

  const onError = () => {
    console.log(":::Fetch error:::");
  };

  return {
    onSuccess,
    onError
  };
}
...
```

__@fetch-success()__ Triggers on fetch api's success callback

__@fetch-error()__ Triggers on fetch api's error callback