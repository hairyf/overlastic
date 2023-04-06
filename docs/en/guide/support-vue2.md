# Support Vue2

If you are using Vue2, you can install the "package" and use mixins to pass properties to components. Here's an example:

```ts
import { useOverlayMeta } from '@unoverlays/vue-v2'
export default {
  mixins: [useOverlayMeta({ animation: 1000 })],
  methods: {
    onClick() {
      // use this.$visible
      // use this.$resolve or this.$reject
    }
  }
}
```
