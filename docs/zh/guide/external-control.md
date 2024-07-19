# 外部控制流程

Overlastic 允许在调用模态框的同时，通过 `resolve` 和 `reject` 在外部进行控制流程，

```ts
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

> 由于渲染等待的关系，`reject` 与 `resolve` 建议在回调函数内部中使用。
