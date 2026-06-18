# Props

These are accepted both as `<vue3-fetch>` props and as the options object passed to `useFetch()`.

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

## Slot Props

The default slot (and the object returned by `useFetch()`) exposes this reactive state:

```js
{
    // true while a request is in flight
    isLoading: Boolean,

    // true once a request resolves successfully, null beforehand
    isSuccess: Boolean,

    // true once a request fails, null beforehand
    isError: Boolean,

    // parsed JSON response, or the stub value
    data: Object,

    // the error message, when isError is true
    error: String
}
```
