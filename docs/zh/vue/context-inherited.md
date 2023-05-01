# 👆 继承上下文

如果你全局注册了 overlays，它会自动继承你的应用上下文，你也可以通过更细致的控制来传入上下文。

```ts
import { getCurrentInstance } from 'vue-demi'
import Component from './overlay.vue'

// 在你的 setup 中
const { appContext } = getCurrentInstance()!
renderOverlay(Component, {
  props: {},
  appContext
})
```