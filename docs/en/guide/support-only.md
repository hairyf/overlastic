# Only Render Overlay(>0.6.0)

Starting from version 0.6.0, the defineOverlay function supports the "only" property, which enables rendering only one pop-up layer. 

Please note that renderOverlay function does not support the "only" property and cannot maintain independent instances. 

Here is an example using the defineOverlay function with the "only" property:

```ts
const myModal = defineOverlay(Comp, { only: true })

// Only one instance will be displayed and returned
myModal()
myModal()
myModal()
myModal()
```