# Inherited context 

You can register overlays globally, which will inherit the application context for all popups.

```ts
// main.js
import { createApp } from 'vue'
import unoverlay from '@overlastic/vue'

const app = createApp({})
app.use(unoverlay)
```

and you can also pass in the context with finer control.

```ts
import { getCurrentInstance } from 'vue-demi'
import Component from './overlay.vue'

// in your setup method
const { appContext } = getCurrentInstance()!
renderOverlay(Component, props, {
  appContext
})
```