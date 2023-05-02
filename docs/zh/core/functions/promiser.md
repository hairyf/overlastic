# Promiser

`promiser` 是 `promise` 的变体，它不同于 `promise` 在于它还添加的 `resolve` 与 `reject` 方法，方便在外部控制 `promise` 的流程。

> 通常您不需要使用它，`constructor` 中会默认定义 `promiser` 用于控制整个 `overlays` 的流程。

```ts
const promiser = createPromiser<string>()

promiser.then((value) => {
  // value: yes!
})

promiser.resolve('yes!')

await promiser // yes!
```
