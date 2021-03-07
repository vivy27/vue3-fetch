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