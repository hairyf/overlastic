# 外部控制流程

如果把控制权都交给 Component，在特殊的使用场景将会受到到限制，转换后的组件允许用户在外部控制组件的流程

`Model` 的返回值的功能不仅仅包括 `Promise` 在此基础还有 `resolve` 和 `reject`

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

> 由于等待渲染的关系， instance 中的 `reject` 与 `resolve` 建议在回调函数内部中使用。
