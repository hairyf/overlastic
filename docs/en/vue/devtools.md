# Component devtools

When using defineOverlay, a Vue sub-application is created, which is different from the main application and can be viewed and debugged in [Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN).


You can also use [useInjectHolder](/en/vue/holder) to create pop-ups inside components and inherit the current context of the application.

![html](/html.png)

---

![devtools](/devtools.png)

The ID of the generated root element is the same as the application name, and the ID is automatically converted to PascalCase when creating components.

You can change the generated ID name through rendering options.

```ts
const callback = defineOverlay(OverlayComponent)
callback({}, {
  id: 'custom-overlay',
  // Turn off automatic increment of ID
  autoIncrement: false
})
```

![html](/html-2.png)

---

![devtools](/devtools-2.png)