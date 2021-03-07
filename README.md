# vue3-fetch
vue3-fetch component uses the browser's native promised based fetch api. Making network requests to server have become easy now through template. This component gives only the json responses.

> This fetch component is based on Vue3.

## Installation
```
npm i vue3-fetch --save

or

yarn add vue3-fetch
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

## Form Usage

```html
<template>
  <vue3-fetch
    ref="postref"
    fetchId="post-user"
    method="post"
    url="https://vj-simple-crud.herokuapp.com/user"
    @fetch-success="onSuccess"
    @fetch-error="onError"
  >
    <template #default>
      <form @submit="onSubmit">
        <p>
          <label for="name">Name</label>
          <input
            id="name"
            v-model="payload.name"
            type="text"
            name="name"
            required
          />
        </p>
        <p>
          <label for="department">Department</label>
          <input
            id="department"
            v-model="payload.department"
            type="text"
            name="department"
            required
          />
        </p>
        <p>
          <label for="phone">Phone</label>
          <input
            id="phone"
            v-model="payload.phone"
            type="phone"
            name="phone"
            required
          />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </template>
  </vue3-fetch>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  name: "form-post",
  setup() {
    const postref = ref(null);
    const payload = reactive({
      name: null,
      department: null,
      phone: null,
    });
    const onSubmit = (e) => {
      e.preventDefault();
      postref.value.execute({ body: payload });
    };

    const onSuccess = () => {
      console.log("Form posted successfully");
    };

    const onError = (e) => {
      console.log("Form post failed!", e);
    };

    return {
      postref,
      payload,
      onSubmit,
      onSuccess,
      onError,
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

    // fetch url query params eg. {'username':'John', 'password': 'doe'}
    query: Object,

    // fetch request body eg. {'username':'John', 'password': 'doe'}
    body: Object,

    // fetch header default. { 'Content-Type': 'application/json' }
    headers: Object,

    // fetch referrer
    referrer: String,

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