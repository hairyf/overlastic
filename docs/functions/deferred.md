# Deferred

`deferred` is a variation of `promise`. It is different from `promise` in that it also adds `confirm` and `cancel` methods, which make it easy to control the flow of the `promise` externally.

> Typically, you don't need to use it, as `deferred` is defined by default in the constructor to control the entire overlays flow.

```ts
const deferred = createDeferred<string>()

deferred.then((value) => {
  // value: yes!
})

deferred.confirm('yes!')

await deferred // yes!
```
