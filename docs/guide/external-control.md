# Controlled Externally

If you give all control to Component, you will be limited in some usage scenarios. The components converted by overlays allow users to control the flow of components externally.

The function of the return value of `Model` includes not only `Promise`, but also `confirm` and `cancel` based on this

```ts
const Model = defineOverlay(MyComponent)
const instance = Model({/* you props */})

function close() {
  instance.cancel('no')
  instance.catch((value) => {
    // log: no
    console.log(value)
  })
}
function yes() {
  instance.confirm('yes')
  instance.then((value) => {
    // log: yes
    console.log(value)
  })
}
```

> Since rendering needs to wait, `cancel / confirm` in deferred cannot be called immediately, and it is generally recommended to use it inside the callback function.
