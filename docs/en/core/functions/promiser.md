# Promiser

`promiser` is a variation of `promise`. It is different from `promise` in that it also adds `resolve` and `reject` methods, which make it easy to control the flow of the `promise` externally.

> Typically, you don't need to use it, as `promiser` is defined by default in the constructor to control the entire overlays flow.

```ts
const promiser = createPromiser<string>()

promiser.then((value) => {
  // value: yes!
})

promiser.resolve('yes!')

await promiser // yes!
```
