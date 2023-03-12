# 🤏 外部控制流程

如果把控制权都交给 Component，在一些使用场景时会受到到限制，Unoverlays 转换的组件允许用户在外部控制组件的流程

`Model` 的返回值的功能不仅仅包括 `Promise` 在此基础还有 `confirm` 和 `cancel`

```ts
const Model = createOverlay(MyComponent)
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

> 由于渲染需要等待， promiser 中的 `cancel / confirm` 不能立即调用，一般建议在回调函数内部中使用。