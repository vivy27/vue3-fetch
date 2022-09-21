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
import Vue3Fetch from './components/Vue3Fetch.vue'
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