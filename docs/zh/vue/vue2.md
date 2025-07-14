# Vue2 Support

如果您使用的是 Vue2，您可以安装 `@overlastic/vue2` 并使用 `mixin` 将属性传递给组件。下面是一个例子：

```ts
import { useDisclosure } from '@overlastic/vue2'
export default {
  mixins: [useDisclosure({ duration: 1000 })],
  methods: {
    onClick() {
      // use this.$visible
      // use this.$confirm or this.$cancel
    }
  }
}
```
