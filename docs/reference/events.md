# Events

```html
<vue3-fetch url="https://vj-simple-crud.herokuapp.com/users" @fetch-success="onSuccess" @fetch-error="onError" />
```

```js
const onSuccess = () => {
  console.log(":::Fetch success:::");
};

const onError = () => {
  console.log(":::Fetch error:::");
};
```

**`@fetch-success()`** Triggers on fetch api's success callback

**`@fetch-error()`** Triggers on fetch api's error callback

::: tip
The composable doesn't emit events — read `isSuccess`/`isError` and `response.data`/`response.error` directly instead. See [Composable Usage](./../guide/composable).
:::
