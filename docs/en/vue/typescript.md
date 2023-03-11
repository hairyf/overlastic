# ⌨️ Typescript

If you want your component to have the correct type declaration when called in a callback, you need to extract props to a separate file. Here's a simple example:

- Step 1: Define the parameter type externally.

```ts
export interface Params {
  title?: string
}
export type Resolved = string
```

- Step 2: Use the parameter type in the component.

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

- Step 3: Pass in the types when using `createOverlay` or `renderOverlay`.

```ts
import { createOverlay } from '@unoverlays/vue'
import OverlayComponent from './overlay.vue'
import type { Params, Resolved } from './define.ts'

const callback = createOverlay<Params, Resolved>(OverlayComponent)
```

> If you have a runtime validation requirement for vue props, you can do the following:

- Step 1: Define the parameter type externally.

```ts
import type { ExtractInferTypes } from 'vue-demi'
// define.ts
export const overlayProps = {
  title: String
}
export type Params = ExtractInferTypes<typeof overlayProps>
export type Resolved = string
```

- Step 2: Use the parameter type in the component.

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

- Step 3: Same as above, so I won't explain it again.