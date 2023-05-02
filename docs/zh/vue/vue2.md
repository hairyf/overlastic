# Vue2 Support

如果您使用的是 Vue2，您可以安装 `@overlays/vue2` 并使用 `mixin` 将属性传递给组件。下面是一个例子：

```ts
import { useOverlay } from '@overlays/vue2'
export default {
  mixins: [useOverlay({ duration: 1000 })],
  methods: {
    onClick() {
      // use this.$visible
      // use this.$resolve or this.$reject
    }
  }
}
```
