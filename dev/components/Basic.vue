<script>
export default {
  name: "basic",
};
</script>

<template>
  <vue3-fetch
    fetchId="get-users"
    url="https://vj-simple-crud.herokuapp.com/users"
  >
    <template #default="{ isLoading, data }">
      <div v-if="isLoading">Loading...</div>
      <div v-else v-for="(user, index) in data" :key="`user-${index}`">
        <div>Name: {{ user.name }}</div>
        <div>Department {{ user.department }}</div>
        <div>Phone {{ user.phone }}</div>
      </div>
    </template>
  </vue3-fetch>
</template>