# unoverlays

> [中文](./README_CN.md) | English or see [unoverlays-docs](https://unoverlays.vercel.app/zh/)

Unoverlays is a unified plugin for building overlayss. It allows for the creation of callback (imperative) methods and the use of Template/JSX (declarative) in Vue Template or React Jsx.

it can achieve: 

- Create Message or Dialog similar to `element-plus/antd...` Supports both callback (imperative) and Template/JSX (declarative) methods.
- Integration and customization of existing component libraries, such as `element-plus` and `antd`.
- Supports component inheritance of global application context.
- Supports frontend progressive frameworks such as `vue2|3` and `react`.
- More stable!!, **99.54%** unit test coverage(Vue)

## Packages

- [@unoverlays/vue](https://unoverlays.vercel.app/en/vue/) - Use Unified Overlays to create overlays in Vue app.
- [@unoverlays/react](https://unoverlays.vercel.app/en/react/) - Use Unified Overlays to create overlays in React app.

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks (React, Vue).

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` inserts a holder into the corresponding component, making it available in the virtual DOM.
- `child-app` creates a separate application that can be recognized by devtools.

## Why?

In today's increasingly complex business scenarios, we are often troubled by the repetitive work of defining Model classes. This means that once we encounter a Model class component, we need to repeatedly define common fields such as cancel, confirm, and visible. When saving component state, we often need to control the Model process (`open model` -> `edit data` -> `onConfirm` -> `save data`). This greatly increases the workload and produces a lot of redundant code when components are reused(For example, a frequently used image selector)

Therefore, it is necessary to commandize Modal (using a callback approach). Unified Overlays unifies the redundant processes and state management, and the use of Unified Overlays to create components remains effective when declaratively used (in Vue Template or React Jsx).

## Install

```
pnpm add @unoverlays/vue
# Or React
pnpm add @unoverlays/react
```

## Usage

Use the `useOverlayMeta` Hook provided by unoverlays to create overlays components (Vue, React).

```ts
// In your Vue, React overlays component,
// use useOverlayMeta to obtain overlays metadata.
const { visible, confirm, cancel } = useOverlayMeta({
  // The duration of the overlays animation prevents
  // the component from being destroyed too early.
  animation: 1000
})
```

Use `createOverlay|renderOverlay` to convert to a callback (imperative) method.

```ts
const callback = createOverlay(OverlayComponent)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(OverlayComponent, {
  props
})
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
