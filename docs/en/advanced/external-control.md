# 🤏 Controlled Externally

If you give all control to Component, you will be limited in some usage scenarios. The components converted by Unoverlay Vue allow users to control the flow of components externally.

The function of the return value of `Model` includes not only `Promise`, but also `confirm` and `cancel` based on this

```ts
const Model = createOverlay(MyComponent)
const promiser = Model({/* you props */})

function close() {
  promiser.cancel()
}
function yes() {
  promiser.confirm({/* you resolved value */})
}
```

> Since rendering needs to wait, `cancel / confirm` in promiser cannot be called immediately, and it is generally recommended to use it inside the callback function.