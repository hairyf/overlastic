# Template Support

Components created with `unoverlay vue` support not only the use of imperative method calls, but also the use of `<template>`.

> It supports the components used in `<template>`, and also supports the use of callback calls, which will not affect each other's functions. This is an option.

### Step.1: Define Component

When used in `<template>`, you need to explicitly define `module` and `event`.

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
  // To use in Template, you need to define the fields used by v-modal (the default to visible)
  visible: Boolean
})

// Define the event type used in the component (default: cancel, confirm)
defineEmits(['cancel', 'confirm'])

const { visible, confirm, cancel } = useOverlayMeta({
  // If you use template rendering, animation can be defined without
  // animation: 1000,
})
</script>
```

If you want to replace with other fields and event names, you can pass in the corresponding configuration through `useOverlayMeta`.

```vue
<!-- overlay.vue -->
<script setup>
import { defineEmits, defineProps } from 'vue-demi'
import { useOverlayMeta } from 'unoverlay-vue'
const props = defineProps({
  title: String,
  modalValue: Boolean
})

defineEmits(['nook', 'ok'])

const { visible, confirm, cancel } = useOverlayMeta({
  event: { confirm: 'ok', cancel: 'nook' },
  modal: 'modalValue',
})
</script>

<template>
  ...
</template>
```

### Step.2: In Template

After defining `module` and `event`, you can use pop-up layer components in `<template>`.

```vue
<!-- overlay.vue -->
<script setup>
import OverlayComponent from './overlay.vue'
const visible = ref(false)

const confirm = () => {
  // ...
}
const cancel = () => {
  // ...
}
</script>

<template>
  <OverlayComponent
    v-model:visible="visible"
    @confirm="confirm"
    @cancel="cancel"
  />
</template>
```