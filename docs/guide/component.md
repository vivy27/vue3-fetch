# Component Usage

## Basic

This is the original `#default` scoped slot. It receives all the [slot props](../reference/props#slot-props) together, and you branch on `isLoading`/`isError` yourself. If you've used this component before, this pattern is unchanged and keeps working exactly as is.

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

## Named Slots

As an alternative to branching on `isLoading`/`isError` inside a single `#default` slot, you can use the `#loading`, `#error`, and `#data` named slots instead. vue3-fetch shows whichever one matches the current state:

```html
<template>
  <vue3-fetch fetchId="get-users" url="https://vj-simple-crud.herokuapp.com/users">
    <template #loading>
      <div>Loading...</div>
    </template>
    <template #error="{ error }">
      <div>Something went wrong: {{ error }}</div>
    </template>
    <template #data="{ data }">
      <div v-for="(user, index) in data" :key="`user-${index}`">
        <div>{{ user.name }}</div>
        <div>{{ user.department }}</div>
        <div>{{ user.phone }}</div>
      </div>
    </template>
  </vue3-fetch>
</template>
```

You don't have to provide all three — any named slot you omit falls back to the `#default` slot for that state, so the two patterns can be mixed.

## Advanced

```html
<template>
  <vue3-fetch ref="fetchref" fetchId="get-users" url="https://vj-simple-crud.herokuapp.com/users"
    @fetch-success="onSuccess" @fetch-error="onError">
    <template #default="{ isLoading, data, error }">
      <div v-if="isLoading">Loading...</div>
      <div v-else v-for="(user, index) in data" :key="`user-${index}`">
        <div>{{ user.name }}</div>
        <div>{{ user.department }}</div>
        <div>{{ user.phone }}</div>
      </div>
    </template>
  </vue3-fetch>
  <section>
    <button @click="refetch">Re-fetch</button>
  </section>
</template>

<script setup>
import { ref } from 'vue';

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
</script>
```

## Form submission

```html
<template>
  <vue3-fetch ref="postref" fetchId="post-user" method="post" url="https://vj-simple-crud.herokuapp.com/user"
    @fetch-success="onSuccess" @fetch-error="onError">
    <template #default>
      <form @submit="onSubmit">
        <p>
          <label for="name">Name</label>
          <input id="name" v-model="payload.name" type="text" name="name" required />
        </p>
        <p>
          <label for="department">Department</label>
          <input id="department" v-model="payload.department" type="text" name="department" required />
        </p>
        <p>
          <label for="phone">Phone</label>
          <input id="phone" v-model="payload.phone" type="phone" name="phone" required />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </template>
  </vue3-fetch>
</template>
<script setup>
import { ref, reactive } from "vue";

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
</script>
```

See [Props](../reference/props) and [Events](../reference/events) for the full reference.
