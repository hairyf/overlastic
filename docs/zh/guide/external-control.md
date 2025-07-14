# 外部控制流程

Overlastic 允许在调用模态框的同时，通过 `confirm` 和 `cancel` 在外部进行控制流程，

```ts
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

> 由于渲染等待的关系，`cancel` 与 `confirm` 建议在回调函数内部中使用。
