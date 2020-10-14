<script>
import Vue from "vue";
import { Vue3Fetch } from "@/entry";

export default {
  name: "ServeDev",
  components: {
    Vue3Fetch,
  },
};
</script>

<template>
  <div id="app">
    <vue3-fetch
      ref="fetchref"
      id="get-users"
      url="https://vj-simple-crud.herokuapp.com/users"
      :stub="{}"
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
  </div>
</template>
