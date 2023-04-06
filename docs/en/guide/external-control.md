# 🤏 Controlled Externally

If you give all control to Component, you will be limited in some usage scenarios. The components converted by Unoverlays allow users to control the flow of components externally.

The function of the return value of `Model` includes not only `Promise`, but also `resolve` and `reject` based on this

```ts
const Model = defineOverlay(MyComponent)
const instance = Model({/* you props */})

function close() {
  instance.reject('no')
  instance.catch((value) => {
    // log: no
    console.log(value)
  })
}
function yes() {
  instance.resolve('yes')
  instance.then((value) => {
    // log: yes
    console.log(value)
  })
}
```

> Since rendering needs to wait, `reject / resolve` in promiser cannot be called immediately, and it is generally recommended to use it inside the callback function.