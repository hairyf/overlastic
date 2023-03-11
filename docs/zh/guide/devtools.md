# Component devtools

在使用 `createOverlay` 时会创建一个 Vue 子应用，这个应用区别与主应用，可在 [Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN) 中查看与调试组件。 

![html](/html.png)

---

![devtools](/devtools.png)

生成根元素的 ID 与应用名称使用同一 ID，在创建组件时，会自动对 ID 进行 `PascalCase` 处理。

可以通过渲染选项，更改生成 ID 名称。

```ts
const callback = createOverlay(OverlayComponent)
callback({}, {
  id: 'custom-overlay',
  // 关闭 ID 后续自增长
  autoIncrement: false
})
```

![html](/html-2.png)

---

![devtools](/devtools-2.png)