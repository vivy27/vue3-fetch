import { createApp } from 'vue'
import Dev from './serve.vue';
import { Vue3Fetch } from "@/entry";

const app = createApp(Dev);
app.component('vue3-fetch', Vue3Fetch)
app.mount('#app')