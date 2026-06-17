# Installation

```sh
npm i vue3-fetch --save
```

```sh
yarn add vue3-fetch
```

## Register globally

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { Vue3Fetch } from 'vue3-fetch'

const app = createApp(App)
app.component('vue3-fetch', Vue3Fetch)
app.mount('#app')
```

## Or import locally

```js
// App.vue
import { Vue3Fetch } from 'vue3-fetch'
```

Styles are bundled into the component automatically — no separate CSS import needed.

Next: [Component Usage](./component) or [Composable Usage](./composable).
