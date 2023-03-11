# ⌨️ Typescript

If you want the component to have the correct type declaration when called in the callback, you need to extract the props into a separate file, simple case:

- Step.1: Externally defined parameter type

```ts
export interface Params {
  title?: string
}
export type Resolved = string
```

- Step.2: Components use parameter types

```vue
<!-- index.vue -->
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
import type { Params, Resolved } from './props'
const props = defineProps<Params>()
const { visible, confirm, cancel } = useOverlayMeta<Resolved>({
  animation: 1000
})
</script>
```

- Step.3: 在使用 `createOverlay` 或 `renderOverlay` 时传入类型

```ts
import { createOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'
import type { Params, Resolved } from './define.ts'

const callback = createOverlay<Params, Resolved>(OverlayComponent)
```

> If you have requirements for vue's props runtime validation, you can define it like this: 

- Step.1: Externally defined parameter type

```ts
import type { ExtractInferTypes } from 'vue-demi'
// define.ts
export const overlayProps = {
  title: String
}
export type Params = ExtractInferTypes<typeof overlayProps>
export type Resolved = string
```

- Step.2: Components use parameter types

```vue
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from '@unoverlays/vue'
import type { Resolved } from './props'
import { overlayProps } from './props'
const props = defineProps(overlayProps)
const { visible, confirm, cancel } = useOverlayMeta<Resolved>({
  animation: 1000
})
</script>
```

- Step.3: Consistent with the above, it is not described