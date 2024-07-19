# 继承上下文

您可以全局注册 overlays, 这将为所有的弹出层继承应用上下文。

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlastic/vue'

const app = createApp({})
app.use(unoverlay)
```

你也可以通过在 setup 中使用来更细致的控制上下文。

```ts
import { getCurrentInstance } from 'vue-demi'
import Component from './overlay.vue'

// 在你的 setup 中
const { appContext } = getCurrentInstance()!
renderOverlay(Component, props, {
  appContext
})
```
