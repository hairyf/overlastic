## Injection Holder

除了使用 `defineOverlay` 与 `renderOverlay` 创建使用弹出层组件外，还支持使用 `useOverlayHolder` 创建在组件内部的弹出层组件，并继承应用的当前上下文。

```vue
<script setup>
import { useOverlayHolder } from "@overlastic/vue";
import { OverlayComponent } from "./overlay";

// 通过 useOverlayHolder(Component) 创建支持当前 context 的组件持有者
const [holder, openOverlay] = useOverlayHolder(OverlayComponent);
const onClick = () => {
  // 打开弹出层
  openOverlay().then((result) => {});
};
</script>

<template>
  <!-- 挂载 holder -->
  <holder />
  <button @click="onClick">open</button>
</template>
```
