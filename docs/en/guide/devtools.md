# Component devtools

When using `createOverlay`, a Vue sub-application will be created. This application is different from the main application, which can be found in [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=).

![html](/html.png)

---

![devtools](/devtools.png)

The ID of the generated root element and the application name use the same ID. When creating a component, the ID will be automatically processed with 'PascalCase'.

You can change the generation ID name through the rendering options.

```ts
const callback = createOverlay(OverlayComponent)
callback({}, {
  id: 'custom-overlay',
  // Close ID auto increment
  autoIncrement: false
})
```

![html](/html-2.png)

---

![devtools](/devtools-2.png)